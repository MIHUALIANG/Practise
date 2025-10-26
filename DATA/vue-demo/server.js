const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

// 表关联关系管理功能
// 获取用户定义的表间关联关系
function getTableRelations() {
  return new Promise((resolve, reject) => {
    try {
      // 从数据库中获取用户定义的表间关联关系
      const relations = {};

      // 查询表关联关系表
      db.all("SELECT * FROM table_relations", [], (err, rows) => {
        if (err) {
          console.error("获取表关联关系失败:", err.message);
          reject(err);
          return;
        }

        rows.forEach((row) => {
          const key = `${row.left_table}-${row.right_table}`;
          relations[key] = {
            key: key,
            leftTable: row.left_table,
            rightTable: row.right_table,
            leftColumn: row.left_column,
            rightColumn: row.right_column,
            joinType: row.join_type || "INNER JOIN",
          };
        });

        resolve(relations);
      });
    } catch (error) {
      console.error("获取表关联关系出错:", error);
      reject(error);
    }
  });
}

// 保存用户定义的表间关联关系
function saveTableRelation(
  leftTable,
  rightTable,
  leftColumn,
  rightColumn,
  joinType = "INNER JOIN"
) {
  return new Promise((resolve, reject) => {
    try {
      // 确保表关联关系表存在
      db.run(
        `CREATE TABLE IF NOT EXISTS table_relations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      left_table TEXT NOT NULL,
      right_table TEXT NOT NULL,
      left_column TEXT NOT NULL,
      right_column TEXT NOT NULL,
      join_type TEXT DEFAULT 'INNER JOIN',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
        (err) => {
          if (err) {
            console.error("创建表关联关系表失败:", err.message);
            reject(err);
            return;
          }
        }
      );

      const sql = `
      INSERT OR REPLACE INTO table_relations 
      (left_table, right_table, left_column, right_column, join_type) 
      VALUES (?, ?, ?, ?, ?)
    `;

      db.run(
        sql,
        [leftTable, rightTable, leftColumn, rightColumn, joinType],
        function (err) {
          if (err) {
            console.error("保存表关联关系失败:", err.message);
            reject(err);
            return;
          }
          console.log(
            `成功保存表关联关系: ${leftTable}.${leftColumn} = ${rightTable}.${rightColumn}`
          );
          resolve(true);
        }
      );
    } catch (error) {
      console.error("保存表关联关系出错:", error);
      reject(error);
    }
  });
}

// 删除表间关联关系
function deleteTableRelation(leftTable, rightTable) {
  return new Promise((resolve, reject) => {
    try {
      const sql = `DELETE FROM table_relations WHERE 
      (left_table = ? AND right_table = ?) OR 
      (left_table = ? AND right_table = ?)`;

      db.run(
        sql,
        [leftTable, rightTable, rightTable, leftTable],
        function (err) {
          if (err) {
            console.error("删除表关联关系失败:", err.message);
            reject(err);
            return;
          }
          console.log(`成功删除表关联关系: ${leftTable} - ${rightTable}`);
          resolve(true);
        }
      );
    } catch (error) {
      console.error("删除表关联关系出错:", error);
      reject(error);
    }
  });
}

// 获取所有表关联关系（用于前端显示）
function getAllTableRelations() {
  return new Promise((resolve, reject) => {
    try {
      // 确保表关联关系表存在
      db.run(
        `CREATE TABLE IF NOT EXISTS table_relations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        left_table TEXT NOT NULL,
        right_table TEXT NOT NULL,
        left_column TEXT NOT NULL,
        right_column TEXT NOT NULL,
        join_type TEXT DEFAULT 'INNER JOIN',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
        (err) => {
          if (err) {
            console.error("创建表关联关系表失败:", err.message);
            reject(err);
            return;
          }

          // 查询所有关联关系
          db.all(
            "SELECT * FROM table_relations ORDER BY created_at DESC",
            [],
            (err, rows) => {
              if (err) {
                console.error("获取表关联关系失败:", err.message);
                reject(err);
                return;
              }

              resolve(rows);
            }
          );
        }
      );
    } catch (error) {
      console.error("获取表关联关系出错:", error);
      reject(error);
    }
  });
}

const app = express();
const PORT = 3000;

// 使用中间件
app.use(cors());
app.use(bodyParser.json());

// 创建/连接数据库
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("数据库连接失败:", err.message);
    process.exit(1);
  } else {
    console.log("数据库连接成功 ✅");
  }
});

// 创建表接口
app.post("/api/createTable", (req, res) => {
  const { tableName, fields } = req.body;

  if (!tableName || !fields || fields.length === 0) {
    return res.status(400).json({ error: "表名或字段定义不完整" });
  }

  const fieldDefs = fields
    .map((f) => `${f.name} ${f.type}${f.primaryKey ? " PRIMARY KEY" : ""}`)
    .join(", ");

  const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${fieldDefs});`;

  db.run(sql, (err) => {
    if (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ error: "创建表失败", details: err.message });
    }
    res.json({ message: `表 ${tableName} 创建成功` });
  });
});

// 获取所有表列表
app.get("/api/tables", (req, res) => {
  console.log("📋 收到获取表列表请求");
  db.all(
    `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`,
    [],
    (err, rows) => {
      if (err) {
        console.error("❌ 获取表列表失败:", err.message);
        return res.status(500).json({ error: err.message });
      }
      const tables = rows.map((r) => r.name);
      console.log("✅ 返回表列表:", tables);
      res.json(tables);
    }
  );
});

// 获取表结构
app.get("/api/tableStructure/:name", (req, res) => {
  const { name } = req.params;
  db.all(`PRAGMA table_info(${name})`, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// 插入数据接口
app.post("/api/insertData/:tableName", (req, res) => {
  const { tableName } = req.params;
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ error: "数据不能为空" });
  }

  const columns = Object.keys(data).join(", ");
  const placeholders = Object.keys(data)
    .map(() => "?")
    .join(", ");
  const values = Object.values(data);

  const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

  db.run(sql, values, function (err) {
    if (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ error: "插入数据失败", details: err.message });
    }
    res.json({
      message: "数据插入成功",
      id: this.lastID,
    });
  });
});

// 查询数据接口
app.get("/api/getData/:tableName", (req, res) => {
  const { tableName } = req.params;
  console.log(`📊 收到获取表数据请求: ${tableName}`);
  const sql = `SELECT * FROM ${tableName}`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(`❌ 获取表 ${tableName} 数据失败:`, err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log(`✅ 返回表 ${tableName} 数据: ${rows.length} 条记录`);
    res.json(rows);
  });
});

// 更新数据接口
app.put("/api/updateData/:tableName/:id", (req, res) => {
  const { tableName, id } = req.params;
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ error: "更新数据不能为空" });
  }

  const setClause = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = [...Object.values(data), id];

  const sql = `UPDATE ${tableName} SET ${setClause} WHERE rowid = ?`;

  db.run(sql, values, function (err) {
    if (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ error: "更新数据失败", details: err.message });
    }
    res.json({
      message: "数据更新成功",
      changes: this.changes,
    });
  });
});

// 删除数据接口
app.delete("/api/deleteData/:tableName/:id", (req, res) => {
  const { tableName, id } = req.params;
  const sql = `DELETE FROM ${tableName} WHERE rowid = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ error: "删除数据失败", details: err.message });
    }
    res.json({
      message: "数据删除成功",
      changes: this.changes,
    });
  });
});

// 删除表接口
app.delete("/api/deleteTable/:name", (req, res) => {
  const { name } = req.params;
  const sql = `DROP TABLE IF EXISTS ${name}`;
  db.run(sql, (err) => {
    if (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ error: "删除表失败", details: err.message });
    }
    res.json({ message: `表 ${name} 已删除` });
  });
});

// 在现有后端代码中添加以下接口：

// 修改表名
app.put("/api/renameTable", (req, res) => {
  const { oldName, newName } = req.body;

  if (!oldName || !newName) {
    return res.status(400).json({ error: "原表名和新表名不能为空" });
  }

  const sql = `ALTER TABLE ${oldName} RENAME TO ${newName}`;

  db.run(sql, function (err) {
    if (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ error: "修改表名失败", details: err.message });
    }
    res.json({ message: `表名已从 ${oldName} 修改为 ${newName}` });
  });
});

// 添加新字段
app.post("/api/addColumn", (req, res) => {
  const { tableName, columnName, dataType } = req.body;

  if (!tableName || !columnName || !dataType) {
    return res.status(400).json({ error: "表名、字段名和数据类型不能为空" });
  }

  const sql = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${dataType}`;

  db.run(sql, function (err) {
    if (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ error: "添加字段失败", details: err.message });
    }
    res.json({ message: `字段 ${columnName} 添加成功` });
  });
});

// 删除字段（SQLite 不支持直接删除字段，需要创建新表）
app.delete("/api/removeColumn", (req, res) => {
  const { tableName, columnName } = req.body;

  if (!tableName || !columnName) {
    return res.status(400).json({ error: "表名和字段名不能为空" });
  }

  // SQLite 不支持直接删除字段，需要创建新表并复制数据
  db.serialize(() => {
    // 1. 获取原表结构
    db.all(`PRAGMA table_info(${tableName})`, (err, columns) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "获取表结构失败", details: err.message });
      }

      // 2. 过滤要删除的字段
      const newColumns = columns.filter((col) => col.name !== columnName);
      if (newColumns.length === columns.length) {
        return res.status(400).json({ error: "字段不存在" });
      }

      // 3. 创建新表
      const columnDefs = newColumns
        .map((col) => `${col.name} ${col.type}${col.pk ? " PRIMARY KEY" : ""}`)
        .join(", ");

      const tempTableName = `${tableName}_temp`;
      const createSql = `CREATE TABLE ${tempTableName} (${columnDefs})`;

      db.run(createSql, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "创建临时表失败", details: err.message });
        }

        // 4. 复制数据
        const oldColumns = newColumns.map((col) => col.name).join(", ");
        const copySql = `INSERT INTO ${tempTableName} (${oldColumns}) SELECT ${oldColumns} FROM ${tableName}`;

        db.run(copySql, (err) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "复制数据失败", details: err.message });
          }

          // 5. 删除原表并重命名新表
          db.run(`DROP TABLE ${tableName}`, (err) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "删除原表失败", details: err.message });
            }

            db.run(
              `ALTER TABLE ${tempTableName} RENAME TO ${tableName}`,
              (err) => {
                if (err) {
                  return res
                    .status(500)
                    .json({ error: "重命名表失败", details: err.message });
                }

                res.json({ message: `字段 ${columnName} 删除成功` });
              }
            );
          });
        });
      });
    });
  });
});

// 修改字段名
app.put("/api/renameColumn", (req, res) => {
  const { tableName, oldName, newName } = req.body;

  if (!tableName || !oldName || !newName) {
    return res.status(400).json({ error: "表名、原字段名和新字段名不能为空" });
  }

  // SQLite 不支持直接重命名字段，需要创建新表
  db.serialize(() => {
    db.all(`PRAGMA table_info(${tableName})`, (err, columns) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "获取表结构失败", details: err.message });
      }

      const columnExists = columns.some((col) => col.name === oldName);
      if (!columnExists) {
        return res.status(400).json({ error: "原字段不存在" });
      }

      const tempTableName = `${tableName}_temp`;
      const columnDefs = columns
        .map(
          (col) =>
            `${col.name === oldName ? newName : col.name} ${col.type}${
              col.pk ? " PRIMARY KEY" : ""
            }`
        )
        .join(", ");

      // 创建新表
      const createSql = `CREATE TABLE ${tempTableName} (${columnDefs})`;

      db.run(createSql, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "创建临时表失败", details: err.message });
        }

        // 复制数据
        const oldColumns = columns.map((col) => col.name).join(", ");
        const newColumns = columns
          .map((col) => (col.name === oldName ? newName : col.name))
          .join(", ");
        const copySql = `INSERT INTO ${tempTableName} (${newColumns}) SELECT ${oldColumns} FROM ${tableName}`;

        db.run(copySql, (err) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "复制数据失败", details: err.message });
          }

          // 删除原表并重命名新表
          db.run(`DROP TABLE ${tableName}`, (err) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "删除原表失败", details: err.message });
            }

            db.run(
              `ALTER TABLE ${tempTableName} RENAME TO ${tableName}`,
              (err) => {
                if (err) {
                  return res
                    .status(500)
                    .json({ error: "重命名表失败", details: err.message });
                }

                res.json({
                  message: `字段名已从 ${oldName} 修改为 ${newName}`,
                });
              }
            );
          });
        });
      });
    });
  });
});

// 设置外键关系
app.post("/api/addForeignKey", (req, res) => {
  const { tableName, columnName, referenceTable, referenceColumn } = req.body;

  if (!tableName || !columnName || !referenceTable || !referenceColumn) {
    return res.status(400).json({ error: "所有参数都不能为空" });
  }

  // SQLite 需要在创建表时定义外键，这里提供逻辑关联
  res.json({
    message: `外键关系已记录: ${tableName}.${columnName} -> ${referenceTable}.${referenceColumn}`,
    note: "SQLite 需要在创建表时定义外键，这只是一个逻辑记录",
  });
});

// 获取表详细信息
app.get("/api/tableDetails/:name", (req, res) => {
  const { name } = req.params;

  db.serialize(() => {
    // 获取表结构
    db.all(`PRAGMA table_info(${name})`, (err, structure) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // 获取索引信息
      db.all(`PRAGMA index_list(${name})`, (err, indexes) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // 获取数据统计
        db.get(
          `SELECT COUNT(*) as rowCount FROM ${name}`,
          (err, countResult) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            res.json({
              tableName: name,
              structure: structure,
              indexes: indexes,
              rowCount: countResult.rowCount,
              createdAt: new Date().toISOString(), // 可以添加创建时间等更多信息
            });
          }
        );
      });
    });
  });
});

// 预览跨表更新API
app.post("/api/preview-cross-table-update", (req, res) => {
  const { conditions, updateField, updateValue } = req.body;

  if (!conditions || conditions.length === 0) {
    return res.status(400).json({ error: "更新条件不能为空" });
  }

  if (!updateField || updateValue === undefined) {
    return res.status(400).json({ error: "更新字段和值不能为空" });
  }

  // 构建查询SQL，找出将要被更新的记录
  const { tableName, columnName } = parseUpdateField(updateField);

  // 构建查询条件的SQL
  const whereClause = conditions
    .map((condition) => {
      const { field, operator, value } = condition;
      let conditionStr = `${field} ${operator} `;

      // 处理不同的值类型
      if (operator.toUpperCase() === "LIKE") {
        conditionStr += `'%${value}%'`;
      } else if (typeof value === "string") {
        conditionStr += `'${value}'`;
      } else {
        conditionStr += value;
      }

      return conditionStr;
    })
    .join(" AND ");

  // 尝试构建JOIN子句，处理可能的错误
  buildJoinClause(conditions)
    .then((joinClause) => {
      // 构建预览查询SQL - 只查询，不更新
      const previewSQL = `SELECT ${tableName}.*, '${updateValue}' as new_value FROM ${joinClause} WHERE ${whereClause}`;

      console.log("执行预览查询SQL:", previewSQL);

      // 执行预览查询
      db.all(previewSQL, [], (err, rows) => {
        if (err) {
          return res.status(500).json({
            error: "预览查询失败",
            details: err.message,
            sql: previewSQL,
          });
        }

        // 构建更新SQL用于显示
        let updateValueFormatted =
          typeof updateValue === "string" ? `'${updateValue}'` : updateValue;
        const updateSQL = `UPDATE ${tableName} SET ${columnName} = ${updateValueFormatted} WHERE rowid IN (
        SELECT ${tableName}.rowid FROM ${joinClause}
        WHERE ${whereClause}
      )`;

        res.json({
          message: `预览完成，将影响 ${rows.length} 条记录`,
          affectedCount: rows.length,
          previewData: rows.slice(0, 10), // 只返回前10条记录用于预览
          totalCount: rows.length,
          sql: updateSQL,
          previewSQL: previewSQL,
        });
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error: "构建预览查询失败",
        details: error.message,
      });
    });
});

// 添加跨表更新API
app.post("/api/cross-table-update", (req, res) => {
  const { conditions, updateField, updateValue } = req.body;

  if (!conditions || conditions.length === 0) {
    return res.status(400).json({ error: "更新条件不能为空" });
  }

  if (!updateField || updateValue === undefined) {
    return res.status(400).json({ error: "更新字段和值不能为空" });
  }

  // 构建查询SQL，先找出需要更新的记录
  const { tableName, columnName } = parseUpdateField(updateField);

  // 构建查询条件的SQL
  const whereClause = conditions
    .map((condition) => {
      const { field, operator, value } = condition;
      let conditionStr = `${field} ${operator} `;

      // 处理不同的值类型
      if (operator.toUpperCase() === "LIKE") {
        conditionStr += `'%${value}%'`;
      } else if (typeof value === "string") {
        conditionStr += `'${value}'`;
      } else {
        conditionStr += value;
      }

      return conditionStr;
    })
    .join(" AND ");

  // 构建更新SQL
  let updateValueFormatted =
    typeof updateValue === "string" ? `'${updateValue}'` : updateValue;

  // 尝试构建JOIN子句，处理可能的错误
  buildJoinClause(conditions).then((joinClause) => {
    // 构建更精确的跨表更新SQL
    const updateSQL = `UPDATE ${tableName} SET ${columnName} = ${updateValueFormatted} WHERE rowid IN (
        SELECT ${tableName}.rowid FROM ${joinClause}
        WHERE ${whereClause}
      )`;

    console.log("执行跨表更新SQL:", updateSQL);

    // 先查询出将要被更新的记录数
    const selectCountSQL = `SELECT COUNT(*) as count FROM ${joinClause} WHERE ${whereClause}`;

    db.get(selectCountSQL, [], async (err, countResult) => {
      if (err) {
        return res.status(500).json({
          error: "查询更新记录数失败",
          details: err.message,
        });
      }

      const recordCount = countResult.count;
      if (recordCount === 0) {
        return res.json({
          message: "没有找到符合条件的记录",
          updatedCount: 0,
          sql: updateSQL,
        });
      }

      // 在更新之前获取修改前的数据
      let beforeValues = [];
      try {
        const selectBeforeSQL = `SELECT * FROM ${joinClause} WHERE ${whereClause} LIMIT 50`;
        console.log("更新前查询完整数据SQL:", selectBeforeSQL);

        beforeValues = await new Promise((resolve, reject) => {
          db.all(selectBeforeSQL, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          });
        });

        console.log(
          "获取到的更新前完整记录数据:",
          beforeValues.length,
          "条记录"
        );
      } catch (error) {
        console.error("获取更新前数据失败:", error);
      }

      // 执行更新操作
      db.run(updateSQL, [], function (err) {
        if (err) {
          return res.status(500).json({
            error: "更新操作失败",
            details: err.message,
            sql: updateSQL,
          });
        }

        // 记录更新操作到历史表，传入修改前的数据
        recordUpdateHistoryWithBeforeValues(
          conditions,
          updateField,
          updateValue,
          this.changes,
          beforeValues
        );

        // 直接使用本地时间（假设服务器已设置为北京时间）
        const beijingTime = new Date();
        const year = beijingTime.getFullYear();
        const month = String(beijingTime.getMonth() + 1).padStart(2, "0");
        const day = String(beijingTime.getDate()).padStart(2, "0");
        const hours = String(beijingTime.getHours()).padStart(2, "0");
        const minutes = String(beijingTime.getMinutes()).padStart(2, "0");
        const seconds = String(beijingTime.getSeconds()).padStart(2, "0");
        const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        res.json({
          message: `成功更新 ${this.changes} 条记录`,
          updatedCount: this.changes,
          matchedCount: recordCount,
          sql: updateSQL,
          timestamp: timestamp,
        });
      });
    });
  });
});

// 获取更新历史记录
app.get("/api/update-history", (req, res) => {
  const { startDate, endDate, limit = 50 } = req.query;

  // 直接使用北京时间格式查询
  let sql =
    "SELECT id, conditions, update_info, update_count, timestamp, before_values FROM update_history";
  const params = [];

  if (startDate && endDate) {
    sql += " WHERE timestamp BETWEEN datetime(?) AND datetime(?)";
    params.push(startDate, endDate);
  }

  sql += " ORDER BY timestamp DESC LIMIT ?";
  params.push(parseInt(limit));

  // 执行查询获取除了时间戳外的所有数据
  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // 解析JSON格式的条件和更新信息
    const history = rows.map((row) => {
      // 直接返回时间戳，不做任何转换
      return {
        ...row,
        conditions: row.conditions ? JSON.parse(row.conditions) : {},
        updateInfo: row.update_info ? JSON.parse(row.update_info) : {},
        beforeValues: row.before_values ? JSON.parse(row.before_values) : [],
      };
    });

    res.json(history);
  });
});

// 获取更新前的详细数据
app.post("/api/get-before-values", (req, res) => {
  const { conditions, updateField } = req.body;

  if (!conditions || conditions.length === 0) {
    return res.status(400).json({ error: "更新条件不能为空" });
  }

  if (!updateField) {
    return res.status(400).json({ error: "更新字段不能为空" });
  }

  // 构建查询条件的SQL
  const whereClause = conditions
    .map((condition) => {
      const { field, operator, value } = condition;
      let conditionStr = `${field} ${operator} `;

      // 处理不同的值类型
      if (operator.toUpperCase() === "LIKE") {
        conditionStr += `'%${value}%'`;
      } else if (typeof value === "string") {
        conditionStr += `'${value}'`;
      } else {
        conditionStr += value;
      }

      return conditionStr;
    })
    .join(" AND ");

  // 尝试构建JOIN子句
  buildJoinClause(conditions)
    .then((joinClause) => {
      // 构建查询SQL - 获取所有被修改的记录
      const selectSQL = `SELECT * FROM ${joinClause} WHERE ${whereClause} LIMIT 50`;

      console.log("查询更新前数据SQL:", selectSQL);

      // 执行查询
      db.all(selectSQL, [], (err, rows) => {
        if (err) {
          return res.status(500).json({
            error: "查询更新前数据失败",
            details: err.message,
            sql: selectSQL,
          });
        }

        // 提取更新字段的值
        const beforeValues = rows.map((row) => {
          const fieldParts = updateField.split(".");
          const fieldName = fieldParts[fieldParts.length - 1];
          return {
            record: row,
            beforeValue:
              row[fieldName] || row[fieldName.toLowerCase()] || "空值",
          };
        });

        res.json({
          beforeValues: beforeValues,
          count: rows.length,
          sql: selectSQL,
        });
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error: "构建查询失败",
        details: error.message,
      });
    });
});

// 删除更新历史记录
app.delete("/api/update-history/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "记录ID不能为空" });
  }

  const sql = "DELETE FROM update_history WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "未找到指定的记录" });
    }

    console.log(`已删除历史记录，ID: ${id}`);
    res.json({ message: "删除成功", deletedId: id });
  });
});

// 获取统计数据API
app.get("/api/statistics", (req, res) => {
  const { tableName, fieldName, type, startDate, endDate } = req.query;

  // 如果是新的动态统计模式
  if (tableName && fieldName) {
    if (!type) {
      return res.status(400).json({ error: "缺少统计类型参数" });
    }

    try {
      let sql;

      if (type === "count") {
        // 统计该字段所有不同值的数量
        sql = `
          SELECT ${fieldName} as name, COUNT(*) as count 
          FROM ${tableName}
          GROUP BY ${fieldName}
          ORDER BY count DESC
        `;
      } else if (type === "time-range-count") {
        // 带时间范围的统计
        if (!startDate || !endDate) {
          return res
            .status(400)
            .json({ error: "时间范围统计需要开始时间和结束时间" });
        }
        sql = `
          SELECT ${fieldName} as name, COUNT(*) as count 
          FROM ${tableName}
          WHERE ${fieldName} BETWEEN ? AND ?
          GROUP BY ${fieldName}
          ORDER BY count DESC
        `;
        db.all(sql, [startDate, endDate], (err, rows) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({
            type,
            tableName,
            fieldName,
            data: rows,
          });
        });
        return;
      } else {
        return res.status(400).json({ error: "不支持的统计类型" });
      }

      db.all(sql, [], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json({
          type,
          tableName,
          fieldName,
          data: rows,
        });
      });
    } catch (error) {
      res.status(500).json({ error: "统计查询失败", details: error.message });
    }
    return;
  }

  // 原有的固定统计逻辑（保持兼容性）
  if (!type || !startDate || !endDate) {
    return res.status(400).json({ error: "缺少必要参数" });
  }

  try {
    let sql;

    switch (type) {
      case "top-departments":
        // 统计就诊量前5的科室
        sql = `
          SELECT 科室, COUNT(*) as count 
          FROM 诊疗记录表 
          WHERE 日期 BETWEEN ? AND ? 
          GROUP BY 科室 
          ORDER BY count DESC 
          LIMIT 5
        `;
        break;

      case "top-doctors":
        // 统计就诊量前5的医生
        sql = `
          SELECT 主治医生, COUNT(*) as count 
          FROM 诊疗记录表 
          WHERE 日期 BETWEEN ? AND ? 
          GROUP BY 主治医生 
          ORDER BY count DESC 
          LIMIT 5
        `;
        break;

      case "visit-trend":
        // 计算时间间隔
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        let dateFormat;
        if (diffDays <= 1) {
          dateFormat = "%Y-%m-%d %H:00:00"; // 按小时
        } else if (diffDays <= 31) {
          dateFormat = "%Y-%m-%d"; // 按天
        } else if (diffDays <= 365) {
          dateFormat = "%Y-%m"; // 按月
        } else {
          dateFormat = "%Y"; // 按年
        }

        // 统计就诊趋势
        sql = `
          SELECT strftime('${dateFormat}', 日期) as period, COUNT(*) as count 
          FROM 诊疗记录表 
          WHERE 日期 BETWEEN ? AND ? 
          GROUP BY period 
          ORDER BY period
        `;
        break;

      default:
        return res.status(400).json({ error: "不支持的统计类型" });
    }

    db.all(sql, [startDate, endDate], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        type,
        startDate,
        endDate,
        data: rows,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "统计查询失败", details: error.message });
  }
});

// 辅助函数
function parseUpdateField(updateField) {
  const parts = updateField.split(".");
  return {
    tableName: parts[0],
    columnName: parts[1],
  };
}

function extractTablesFromConditions(conditions) {
  const tables = new Set();
  conditions.forEach((condition) => {
    const fieldParts = condition.field.split(".");
    if (fieldParts.length > 1) {
      tables.add(fieldParts[0]);
    }
  });
  return Array.from(tables);
}

function buildJoinClause(conditions) {
  return new Promise(async (resolve, reject) => {
    try {
      const tables = extractTablesFromConditions(conditions);
      if (tables.length === 0) {
        resolve("");
        return;
      }

      // 如果只有一个表，直接返回
      if (tables.length === 1) {
        resolve(tables[0]);
        return;
      }

      // 使用第一个表作为主表
      let joinClause = tables[0];

      // 使用修改后的getTableRelations函数获取表关联关系
      const tableRelations = await getTableRelations();

      // 处理其他表，使用用户定义的关联关系
      for (let i = 1; i < tables.length; i++) {
        const currentTable = tables[i];
        const previousTable = tables[0]; // 总是与主表关联

        // 查找用户定义的关联关系
        const relationKey = `${previousTable}-${currentTable}`;
        const reverseRelationKey = `${currentTable}-${previousTable}`;
        let relation =
          tableRelations[relationKey] || tableRelations[reverseRelationKey];

        if (relation) {
          // 如果找到用户定义的关联关系，使用它
          if (relationKey === relation.key) {
            // 正向关联
            joinClause += ` ${
              relation.joinType || "INNER JOIN"
            } ${currentTable} ON ${previousTable}.${
              relation.leftColumn
            } = ${currentTable}.${relation.rightColumn}`;
          } else {
            // 反向关联
            joinClause += ` ${
              relation.joinType || "INNER JOIN"
            } ${currentTable} ON ${previousTable}.${
              relation.rightColumn
            } = ${currentTable}.${relation.leftColumn}`;
          }
        } else {
          // 如果没有找到用户定义的关联关系，尝试自动推断关联关系
          console.warn(
            `未找到表 ${previousTable} 和 ${currentTable} 之间的关联关系，尝试自动推断`
          );

          // 尝试自动推断关联关系 - 查找可能的公共字段
          return new Promise((resolveJoin) => {
            // 获取两个表的字段信息
            Promise.all([
              new Promise((resolveCols) => {
                db.all(
                  `PRAGMA table_info(${previousTable})`,
                  [],
                  (err, cols) => {
                    if (err) resolveCols([]);
                    else resolveCols(cols);
                  }
                );
              }),
              new Promise((resolveCols) => {
                db.all(
                  `PRAGMA table_info(${currentTable})`,
                  [],
                  (err, cols) => {
                    if (err) resolveCols([]);
                    else resolveCols(cols);
                  }
                );
              }),
            ]).then(([prevTableCols, currTableCols]) => {
              // 查找可能的公共字段
              let foundRelation = false;

              // 优先查找同名且类型相同的字段
              for (const prevCol of prevTableCols) {
                for (const currCol of currTableCols) {
                  if (
                    prevCol.name === currCol.name &&
                    prevCol.type === currCol.type
                  ) {
                    // 找到同名同类型字段，使用它作为关联
                    joinClause += ` INNER JOIN ${currentTable} ON ${previousTable}.${prevCol.name} = ${currentTable}.${currCol.name}`;
                    console.log(
                      `自动推断关联关系: ${previousTable}.${prevCol.name} = ${currentTable}.${currCol.name}`
                    );
                    foundRelation = true;
                    break;
                  }
                }
                if (foundRelation) break;
              }

              // 如果没有找到同名同类型字段，尝试查找包含"id"的字段
              if (!foundRelation) {
                const prevIdCol = prevTableCols.find((col) =>
                  col.name.toLowerCase().includes("id")
                );
                const currIdCol = currTableCols.find((col) =>
                  col.name.toLowerCase().includes("id")
                );

                if (prevIdCol && currIdCol) {
                  joinClause += ` INNER JOIN ${currentTable} ON ${previousTable}.${prevIdCol.name} = ${currentTable}.${currIdCol.name}`;
                  console.log(
                    `使用ID字段自动推断关联关系: ${previousTable}.${prevIdCol.name} = ${currentTable}.${currIdCol.name}`
                  );
                  foundRelation = true;
                }
              }

              // 如果还是没有找到合适的关联字段，使用rowid作为最后的手段
              if (!foundRelation) {
                joinClause += ` INNER JOIN ${currentTable} ON ${previousTable}.rowid = ${currentTable}.rowid`;
                console.warn(
                  `使用rowid作为关联字段，这可能导致结果不准确: ${previousTable}.rowid = ${currentTable}.rowid`
                );
              }

              resolveJoin();
            });
          });
        }
      }

      // 返回最终的joinClause
      resolve(joinClause);
    } catch (error) {
      reject(error);
    }
  });
}

// 记录更新历史（带修改前数据）
function recordUpdateHistoryWithBeforeValues(
  conditions,
  updateField,
  updateValue,
  count,
  beforeValues
) {
  // 直接使用本地时间（假设服务器已设置为北京时间）
  const beijingTime = new Date();
  const year = beijingTime.getFullYear();
  const month = String(beijingTime.getMonth() + 1).padStart(2, "0");
  const day = String(beijingTime.getDate()).padStart(2, "0");
  const hours = String(beijingTime.getHours()).padStart(2, "0");
  const minutes = String(beijingTime.getMinutes()).padStart(2, "0");
  const seconds = String(beijingTime.getSeconds()).padStart(2, "0");
  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const sql = `
    INSERT INTO update_history (conditions, update_info, update_count, timestamp, before_values)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      JSON.stringify(conditions),
      JSON.stringify({ field: updateField, value: updateValue }),
      count,
      timestamp,
      JSON.stringify(beforeValues),
    ],
    (err) => {
      if (err) {
        console.error("记录更新历史失败:", err.message);
      } else {
        console.log(`执行时间: ${timestamp}`);
        console.log(
          `成功记录更新历史: 字段=${updateField}, 新值=${updateValue}, 影响记录数=${count}, 修改前数据=${beforeValues.length}条`
        );
      }
    }
  );
}

// 记录更新历史（旧版本，保留兼容性）
async function recordUpdateHistory(
  conditions,
  updateField,
  updateValue,
  count
) {
  // 直接使用本地时间（假设服务器已设置为北京时间）
  const beijingTime = new Date();
  const year = beijingTime.getFullYear();
  const month = String(beijingTime.getMonth() + 1).padStart(2, "0");
  const day = String(beijingTime.getDate()).padStart(2, "0");
  const hours = String(beijingTime.getHours()).padStart(2, "0");
  const minutes = String(beijingTime.getMinutes()).padStart(2, "0");
  const seconds = String(beijingTime.getSeconds()).padStart(2, "0");
  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  // 获取更新前的完整记录数据用于对比
  let beforeValues = [];
  try {
    const whereClause = conditions
      .map((condition) => {
        const { field, operator, value } = condition;
        let conditionStr = `${field} ${operator} `;
        if (operator.toUpperCase() === "LIKE") {
          conditionStr += `'%${value}%'`;
        } else if (typeof value === "string") {
          conditionStr += `'${value}'`;
        } else {
          conditionStr += value;
        }
        return conditionStr;
      })
      .join(" AND ");

    const joinClause = await buildJoinClause(conditions);
    // 获取完整的记录数据，而不仅仅是更新字段
    const selectSQL = `SELECT * FROM ${joinClause} WHERE ${whereClause} LIMIT 50`;

    console.log("记录历史时查询更新前完整数据SQL:", selectSQL);

    const rows = await new Promise((resolve, reject) => {
      db.all(selectSQL, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    // 保存完整的记录数据
    beforeValues = rows;
    console.log("获取到的更新前完整记录数据:", beforeValues.length, "条记录");
  } catch (error) {
    console.error("获取更新前数据失败:", error);
  }

  const sql = `
    INSERT INTO update_history (conditions, update_info, update_count, timestamp, before_values)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      JSON.stringify(conditions),
      JSON.stringify({ field: updateField, value: updateValue }),
      count,
      timestamp,
      JSON.stringify(beforeValues),
    ],
    (err) => {
      if (err) {
        console.error("记录更新历史失败:", err.message);
      } else {
        console.log(`执行时间: ${timestamp}`);
        console.log(
          `成功记录更新历史: 字段=${updateField}, 新值=${updateValue}, 影响记录数=${count}`
        );
      }
    }
  );
}

// 创建更新历史表
db.run(
  `
  CREATE TABLE IF NOT EXISTS update_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conditions TEXT NOT NULL,
    update_info TEXT NOT NULL,
    update_count INTEGER NOT NULL,
    timestamp TEXT NOT NULL,
    before_values TEXT
  )
`,
  (err) => {
    if (err) {
      console.error("创建更新历史表失败:", err.message);
    } else {
      console.log("✅ 更新历史表就绪");
    }
  }
);

// 添加before_values字段（如果不存在）
db.run(`ALTER TABLE update_history ADD COLUMN before_values TEXT`, (err) => {
  if (err && !err.message.includes("duplicate column name")) {
    console.error("添加before_values字段失败:", err.message);
  }
});

// 表关联关系管理API

// 获取所有表关联关系
app.get("/api/table-relations", async (req, res) => {
  try {
    const relations = await getAllTableRelations();
    res.json(relations);
  } catch (error) {
    console.error("获取表关联关系失败:", error);
    res
      .status(500)
      .json({ error: "获取表关联关系失败", details: error.message });
  }
});

// 添加表关联关系
app.post("/api/table-relations", async (req, res) => {
  const { leftTable, rightTable, leftColumn, rightColumn, joinType } = req.body;

  if (!leftTable || !rightTable || !leftColumn || !rightColumn) {
    return res.status(400).json({ error: "表名和字段名不能为空" });
  }

  try {
    await saveTableRelation(
      leftTable,
      rightTable,
      leftColumn,
      rightColumn,
      joinType
    );
    res.json({ success: true, message: "表关联关系保存成功" });
  } catch (error) {
    console.error("保存表关联关系失败:", error);
    res
      .status(500)
      .json({ error: "保存表关联关系失败", details: error.message });
  }
});

// 删除表关联关系
app.delete("/api/table-relations", async (req, res) => {
  const { leftTable, rightTable } = req.body;

  if (!leftTable || !rightTable) {
    return res.status(400).json({ error: "表名不能为空" });
  }

  try {
    await deleteTableRelation(leftTable, rightTable);
    res.json({ success: true, message: "表关联关系删除成功" });
  } catch (error) {
    console.error("删除表关联关系失败:", error);
    res
      .status(500)
      .json({ error: "删除表关联关系失败", details: error.message });
  }
});

// 启动服务
app.listen(PORT, () => {
  console.log(`✅ 后端运行在 http://localhost:${PORT}`);
});

// ==================== 高级查询 API ====================

// 获取表的字段信息
app.get("/api/tableColumns/:tableName", (req, res) => {
  const { tableName } = req.params;
  db.all(`PRAGMA table_info(${tableName})`, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(
      rows.map((col) => ({
        name: col.name,
        type: col.type,
        pk: col.pk,
      }))
    );
  });
});

// 执行高级查询
app.post("/api/advanced-query", (req, res) => {
  const {
    tables,
    joins,
    conditions,
    limit = 100,
    page = 1,
    pageSize = 20,
  } = req.body;

  try {
    // 首先计算总记录数
    const countSql = buildAdvancedQuery(tables, joins, conditions, null, true);

    db.get(countSql, [], (err, countResult) => {
      if (err) {
        return res.status(500).json({
          error: "查询计数失败",
          details: err.message,
          sql: countSql,
        });
      }

      const totalCount = countResult.total;

      // 构建分页查询SQL
      const offset = (page - 1) * pageSize;
      const sql = buildAdvancedQuery(
        tables,
        joins,
        conditions,
        limit,
        false,
        offset,
        pageSize
      );

      console.log("执行高级查询:", sql); // 调试用

      // 执行查询
      db.all(sql, [], (err, rows) => {
        if (err) {
          return res.status(500).json({
            error: "查询执行失败",
            details: err.message,
            sql: sql,
          });
        }
        res.json({
          success: true,
          data: rows,
          count: rows.length,
          totalCount: totalCount,
          sql: sql,
          page: page,
          pageSize: pageSize,
        });
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "查询构建失败",
      details: error.message,
    });
  }
});

// 保存查询模板
app.post("/api/query-templates", (req, res) => {
  const { name, description, tables, joins, conditions } = req.body;

  const sql = `
    INSERT INTO query_templates (name, description, tables, joins, conditions, created_at)
    VALUES (?, ?, ?, ?, ?, datetime('now'))
  `;

  db.run(
    sql,
    [
      name,
      description,
      JSON.stringify(tables),
      JSON.stringify(joins),
      JSON.stringify(conditions),
    ],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({ error: "保存模板失败", details: err.message });
      }
      res.json({
        message: "模板保存成功",
        id: this.lastID,
      });
    }
  );
});

// 获取查询模板列表
app.get("/api/query-templates", (req, res) => {
  db.all(
    "SELECT * FROM query_templates ORDER BY created_at DESC",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // 解析 JSON 数据
      const templates = rows.map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        created_at: row.created_at,
        tables: JSON.parse(row.tables),
        joins: JSON.parse(row.joins),
        conditions: JSON.parse(row.conditions),
      }));
      res.json(templates);
    }
  );
});

// 删除查询模板
app.delete("/api/query-templates/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM query_templates WHERE id = ?", [id], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ error: "删除模板失败", details: err.message });
    }
    res.json({ message: "模板删除成功" });
  });
});

// 导出查询结果
app.post("/api/export-query", (req, res) => {
  const { tables, joins, conditions, format = "csv" } = req.body;

  try {
    const sql = buildAdvancedQuery(tables, joins, conditions, 1000); // 导出时限制1000条

    db.all(sql, [], (err, rows) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "查询失败", details: err.message });
      }

      let content, contentType, filename;

      switch (format) {
        case "csv":
          content = convertToCSV(rows);
          contentType = "text/csv";
          filename = `query_result_${Date.now()}.csv`;
          break;
        case "json":
          content = JSON.stringify(rows, null, 2);
          contentType = "application/json";
          filename = `query_result_${Date.now()}.json`;
          break;
        default:
          return res.status(400).json({ error: "不支持的导出格式" });
      }

      res.setHeader("Content-Type", contentType);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );
      res.send(content);
    });
  } catch (error) {
    res.status(400).json({ error: "导出失败", details: error.message });
  }
});

// 构建高级查询 SQL 的辅助函数
function buildAdvancedQuery(
  tables,
  joins,
  conditions,
  limit = null,
  isCount = false,
  offset = 0,
  pageSize = 20
) {
  if (!tables || tables.length === 0) {
    throw new Error("至少需要选择一张表");
  }

  // SELECT 子句 - 直接使用表名，完全避免别名
  const selectClause = isCount
    ? "SELECT COUNT(*) AS total"
    : `SELECT ${tables.map((t) => `${t.name}.*`).join(", ")}`;

  // FROM 和 JOIN 子句 - 完全不使用别名
  let fromClause = `FROM ${tables[0].name}`;

  // 处理JOIN，确保使用实际表名
  if (joins && joins.length > 0) {
    joins.forEach((join) => {
      // 获取JOIN中的左右表实际名称
      let leftTable = tables.find(
        (t) => t.name === join.leftTable || t.alias === join.leftTable
      );
      let rightTable = tables.find(
        (t) => t.name === join.rightTable || t.alias === join.rightTable
      );

      // 如果找不到，则假设提供的名称就是实际表名
      leftTable = leftTable ? leftTable : { name: join.leftTable };
      rightTable = rightTable ? rightTable : { name: join.rightTable };

      // 构建JOIN语句，确保使用实际表名
      fromClause += ` ${join.joinType || "INNER JOIN"} ${rightTable.name} ON ${
        leftTable.name
      }.${join.leftColumn} = ${rightTable.name}.${join.rightColumn}`;
    });
  } else {
    // 如果没有明确的JOIN，尝试自动推断表之间的关联关系
    for (let i = 1; i < tables.length; i++) {
      const table = tables[i];

      // 尝试找到两个表之间的公共字段
      // 这里简化处理，假设表名包含"患者"和"诊疗"的表通过"住院号"/"患者号"关联
      if (
        (tables[0].name.includes("患者") && table.name.includes("诊疗")) ||
        (tables[0].name.includes("诊疗") && table.name.includes("患者"))
      ) {
        // 使用INNER JOIN而不是逗号连接，避免笛卡尔积
        const leftField = tables[0].name.includes("患者") ? "住院号" : "患者号";
        const rightField = table.name.includes("患者") ? "住院号" : "患者号";
        fromClause += ` INNER JOIN ${table.name} ON ${tables[0].name}.${leftField} = ${table.name}.${rightField}`;
      } else {
        // 如果不是患者和诊疗表，尝试通过rowid关联
        fromClause += ` INNER JOIN ${table.name} ON ${tables[0].name}.rowid = ${table.name}.rowid`;
      }
    }
  }

  // WHERE 子句 - 处理条件中的表名
  let whereClause = "";
  if (conditions && conditions.length > 0) {
    const processedConditions = conditions.map((condition) => {
      let { field, operator, value } = condition;

      // 如果字段没有表名前缀，添加第一个表的表名
      if (!field.includes(".")) {
        field = `${tables[0].name}.${field}`;
      } else {
        // 如果字段有表名前缀，检查是否是别名，如果是则替换为实际表名
        const [tableAlias, columnName] = field.split(".");
        const table = tables.find(
          (t) => t.alias === tableAlias || t.name === tableAlias
        );
        if (table && table.name !== tableAlias) {
          field = `${table.name}.${columnName}`;
        }
      }

      let conditionStr = `${field} ${operator} `;

      // 处理不同的值类型
      if (operator.toUpperCase() === "LIKE") {
        conditionStr += `'%${value}%'`;
      } else if (typeof value === "string") {
        conditionStr += `'${value}'`;
      } else {
        conditionStr += value;
      }

      return conditionStr;
    });

    whereClause = processedConditions.join(" AND ");
  }

  // 构建完整 SQL
  let sql = `${selectClause} ${fromClause}`;
  if (whereClause) {
    sql += ` WHERE ${whereClause}`;
  }

  // 添加分页
  if (!isCount) {
    if (limit !== null) {
      sql += ` LIMIT ${limit}`;
    } else {
      sql += ` LIMIT ${pageSize} OFFSET ${offset}`;
    }
  }

  return sql;
}

function buildCountSelectClause() {
  return "SELECT COUNT(*) AS total";
}

function buildSelectClause(tables) {
  const columns = [];
  tables.forEach((table) => {
    const tableName = table.alias || table.name;
    // 为每个表添加所有字段
    columns.push(`${tableName}.*`);
  });
  return `SELECT ${columns.join(", ")}`;
}

function buildFromClause(tables, joins) {
  if (tables.length === 0) return "";

  const mainTable = tables[0];
  let fromClause = `FROM ${mainTable.name}`;
  if (mainTable.alias) {
    fromClause += ` AS ${mainTable.alias}`;
  }

  // 添加自定义 JOIN
  if (joins && joins.length > 0) {
    joins.forEach((join) => {
      // 处理前端传递的JOIN格式
      const leftTable = join.leftTable;
      const rightTable = join.rightTable;
      const leftColumn = join.leftColumn;
      const rightColumn = join.rightColumn;
      const joinType = join.joinType || "INNER JOIN";

      fromClause += ` ${joinType} ${rightTable} ON ${leftTable}.${leftColumn} = ${rightTable}.${rightColumn}`;
    });
  }

  // 添加其他表（如果没有 JOIN）
  // 尝试自动推断表之间的关联关系
  for (let i = 1; i < tables.length; i++) {
    const table = tables[i];

    // 尝试找到两个表之间的公共字段
    // 这里简化处理，假设表名包含"患者"和"诊疗"的表通过"住院号"/"患者号"关联
    if (
      (mainTable.name.includes("患者") && table.name.includes("诊疗")) ||
      (mainTable.name.includes("诊疗") && table.name.includes("患者"))
    ) {
      // 使用INNER JOIN而不是逗号连接，避免笛卡尔积
      fromClause += ` INNER JOIN ${table.name}`;
      if (table.alias) {
        fromClause += ` AS ${table.alias}`;
      }

      // 添加关联条件
      const leftField = mainTable.name.includes("患者") ? "住院号" : "患者号";
      const rightField = table.name.includes("患者") ? "住院号" : "患者号";
      const leftTable = mainTable.alias || mainTable.name;
      const rightTable = table.alias || table.name;
      fromClause += ` ON ${leftTable}.${leftField} = ${rightTable}.${rightField}`;
    } else {
      // 如果不是患者和诊疗表，尝试通过rowid关联
      fromClause += ` INNER JOIN ${table.name}`;
      if (table.alias) {
        fromClause += ` AS ${table.alias}`;
      }

      const leftTable = mainTable.alias || mainTable.name;
      const rightTable = table.alias || table.name;
      fromClause += ` ON ${leftTable}.rowid = ${rightTable}.rowid`;
    }
  }

  return fromClause;
}

function buildWhereClause(conditions) {
  if (!conditions || conditions.length === 0) return "";

  return conditions
    .map((condition) => {
      const { field, operator, value } = condition;

      let conditionStr = `${field} ${operator} `;

      // 处理不同的值类型
      if (operator.toUpperCase() === "LIKE") {
        conditionStr += `'%${value}%'`;
      } else if (typeof value === "string") {
        conditionStr += `'${value}'`;
      } else {
        conditionStr += value;
      }

      return conditionStr;
    })
    .join(" AND ");
}

// CSV 转换函数
function convertToCSV(data) {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(",")];

  data.forEach((row) => {
    const values = headers.map((header) => {
      const value = row[header];
      if (value === null || value === undefined) return "";
      // 处理包含逗号或引号的值
      const stringValue = String(value);
      if (stringValue.includes(",") || stringValue.includes('"')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    });
    csvRows.push(values.join(","));
  });

  return csvRows.join("\n");
}

// 创建查询模板表
db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS query_templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      tables TEXT NOT NULL,
      joins TEXT,
      conditions TEXT,
      created_at TEXT
    )
  `,
    (err) => {
      if (err) {
        console.error("创建查询模板表失败:", err.message);
      } else {
        console.log("✅ 查询模板表就绪");
      }
    }
  );
});
