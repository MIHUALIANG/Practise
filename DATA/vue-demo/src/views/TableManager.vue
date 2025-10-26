<template>
  <div class="database-manager">
    <el-tabs v-model="activeTab" type="border-card">
      <!-- 表管理标签页 -->
      <el-tab-pane label="表管理" name="table-manager">
        <div class="tab-content">
          <!-- 创建新表 -->
          <el-card class="section-card">
            <template #header>
              <span>创建新表</span>
            </template>
            <el-form :model="newTable" label-width="120px">
              <el-form-item label="表名">
                <el-input
                  v-model="newTable.tableName"
                  placeholder="请输入表名"
                ></el-input>
              </el-form-item>
              <el-form-item label="字段定义">
                <el-table
                  :data="newTable.fields"
                  border
                  style="width: 600px"
                  :cell-style="{ padding: '8px', textAlign: 'center' }"
                  :header-cell-style="{
                    background: '#f5f7fa',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    padding: '12px 8px',
                  }"
                >
                  <el-table-column label="字段名">
                    <template #default="{ row }">
                      <el-input
                        v-model="row.name"
                        placeholder="字段名"
                        size="small"
                        style="width: 100%"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="数据类型" width="150">
                    <template #default="{ row }">
                      <el-select
                        v-model="row.type"
                        placeholder="选择类型"
                        size="small"
                        style="width: 100%"
                      >
                        <el-option label="INTEGER" value="INTEGER"></el-option>
                        <el-option label="TEXT" value="TEXT"></el-option>
                        <el-option label="REAL" value="REAL"></el-option>
                        <el-option label="BLOB" value="BLOB"></el-option>
                        <el-option
                          label="DATETIME"
                          value="DATETIME"
                        ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="主键" width="80">
                    <template #default="{ row }">
                      <el-switch
                        v-model="row.primaryKey"
                        size="small"
                      ></el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column label="非空" width="80">
                    <template #default="{ row }">
                      <el-switch v-model="row.notNull" size="small"></el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column label="唯一" width="80">
                    <template #default="{ row }">
                      <el-switch v-model="row.unique" size="small"></el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="100">
                    <template #default="{ $index }">
                      <el-button
                        @click="removeNewTableField($index)"
                        type="danger"
                        size="small"
                        :disabled="newTable.fields.length === 1"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addNewTableField"
                  >添加字段</el-button
                >
                <el-button type="primary" @click="createTable"
                  >创建表</el-button
                >
                <el-button @click="resetNewTableForm">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>

          <!-- 表列表和结构管理 -->
          <el-card class="section-card">
            <template #header>
              <div class="card-header">
                <span>表列表</span>
                <el-button type="primary" text @click="fetchTables"
                  >刷新</el-button
                >
              </div>
            </template>

            <el-table
              :data="tables"
              border
              v-loading="tableLoading"
              style="width: 100%"
            >
              <el-table-column label="表名" prop="name"></el-table-column>
              <el-table-column
                label="记录数"
                prop="rowCount"
                width="100"
              ></el-table-column>
              <el-table-column label="操作" width="400">
                <template #default="{ row }">
                  <el-button-group>
                    <el-button
                      @click="showTableDetails(row.name)"
                      type="primary"
                      size="small"
                      >详情</el-button
                    >
                    <el-button
                      @click="showRenameTableDialog(row.name)"
                      type="warning"
                      size="small"
                      >重命名</el-button
                    >
                    <el-button
                      @click="showAddColumnDialog(row.name)"
                      type="success"
                      size="small"
                      >添加字段</el-button
                    >
                    <el-button
                      @click="showManageColumnsDialog(row.name)"
                      type="info"
                      size="small"
                      >管理字段</el-button
                    >
                    <el-button
                      @click="deleteTable(row.name)"
                      type="danger"
                      size="small"
                      >删除</el-button
                    >
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-tab-pane>

      <!-- 数据管理标签页 -->
      <el-tab-pane label="数据管理" name="data-manager">
        <div class="tab-content">
          <!-- 表选择 -->
          <el-card class="section-card">
            <template #header>
              <span>选择数据表</span>
            </template>
            <el-select
              v-model="currentTable"
              placeholder="请选择表"
              @change="viewTableData"
              style="width: 300px"
            >
              <el-option
                v-for="table in tables"
                :key="table.name"
                :label="table.name"
                :value="table.name"
              ></el-option>
            </el-select>
            <el-button @click="fetchTables" style="margin-left: 10px"
              >刷新表列表</el-button
            >
          </el-card>

          <!-- 数据表格 -->
          <el-card v-if="currentTable" class="section-card">
            <template #header>
              <div class="card-header">
                <span>数据管理 - {{ currentTable }}</span>
                <div>
                  <el-button
                    @click="showAddDataDialog"
                    type="primary"
                    size="small"
                    >添加数据</el-button
                  >
                  <el-button
                    @click="refreshTableData"
                    type="success"
                    size="small"
                    >刷新数据</el-button
                  >
                </div>
              </div>
            </template>

            <el-table
              :key="tableKey"
              :data="tableData"
              border
              v-loading="dataLoading"
              style="width: 100%"
            >
              <el-table-column
                v-for="column in currentTableColumns"
                :key="column.name"
                :label="column.name"
                :prop="column.name"
                min-width="150"
              >
                <template #default="{ row }">
                  {{ row[column.name] }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150" fixed="right">
                <template #default="{ row }">
                  <el-button @click="editData(row)" type="warning" size="small"
                    >编辑</el-button
                  >
                  <el-button @click="deleteData(row)" type="danger" size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <div
              v-if="tableData.length === 0"
              style="text-align: center; padding: 20px"
            >
              <el-empty description="暂无数据"></el-empty>
            </div>
          </el-card>
        </div>
      </el-tab-pane>

      <!-- 关系管理标签页 -->
      <el-tab-pane label="关系管理" name="relation-manager">
        <div class="tab-content">
          <el-card class="section-card">
            <template #header>
              <span>表关系管理</span>
            </template>
            <el-form :model="newRelation" label-width="120px">
              <el-form-item label="主表">
                <el-select
                  v-model="newRelation.primaryTable"
                  placeholder="选择主表"
                  @change="loadTableColumns('primary')"
                >
                  <el-option
                    v-for="table in tables"
                    :key="table.name"
                    :label="table.name"
                    :value="table.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="主表字段">
                <el-select
                  v-model="newRelation.primaryColumn"
                  placeholder="选择字段"
                >
                  <el-option
                    v-for="column in primaryTableColumns"
                    :key="column.name"
                    :label="column.name"
                    :value="column.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="从表">
                <el-select
                  v-model="newRelation.foreignTable"
                  placeholder="选择从表"
                  @change="loadTableColumns('foreign')"
                >
                  <el-option
                    v-for="table in tables"
                    :key="table.name"
                    :label="table.name"
                    :value="table.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="从表字段">
                <el-select
                  v-model="newRelation.foreignColumn"
                  placeholder="选择字段"
                >
                  <el-option
                    v-for="column in foreignTableColumns"
                    :key="column.name"
                    :label="column.name"
                    :value="column.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="关系类型">
                <el-select
                  v-model="newRelation.relationType"
                  placeholder="选择关系类型"
                >
                  <el-option label="一对一" value="one-to-one"></el-option>
                  <el-option label="一对多" value="one-to-many"></el-option>
                  <el-option label="多对多" value="many-to-many"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="更新约束">
                <el-select
                  v-model="newRelation.onUpdateAction"
                  placeholder="选择更新约束"
                >
                  <el-option label="无操作" value="no-action"></el-option>
                  <el-option label="级联更新" value="cascade"></el-option>
                  <el-option label="限制更新" value="restrict"></el-option>
                  <el-option label="设置为NULL" value="set-null"></el-option>
                  <el-option
                    label="设置为默认值"
                    value="set-default"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="删除约束">
                <el-select
                  v-model="newRelation.onDeleteAction"
                  placeholder="选择删除约束"
                >
                  <el-option label="无操作" value="no-action"></el-option>
                  <el-option label="级联删除" value="cascade"></el-option>
                  <el-option label="限制删除" value="restrict"></el-option>
                  <el-option label="设置为NULL" value="set-null"></el-option>
                  <el-option
                    label="设置为默认值"
                    value="set-default"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="关系名称">
                <el-input
                  v-model="newRelation.relationName"
                  placeholder="可选，为关系指定一个名称"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addRelation"
                  >添加关系</el-button
                >
              </el-form-item>
            </el-form>

            <el-table
              :data="relations"
              v-loading="loading"
              border
              style="width: 100%; margin-top: 20px"
            >
              <el-table-column label="关系名称" prop="relationName">
                <template #default="{ row }">
                  {{ row.relationName || "未命名" }}
                </template>
              </el-table-column>
              <el-table-column
                label="主表"
                prop="primaryTable"
                width="150"
              ></el-table-column>
              <el-table-column
                label="主表字段"
                prop="primaryColumn"
                width="150"
              ></el-table-column>
              <el-table-column
                label="从表"
                prop="foreignTable"
                width="150"
              ></el-table-column>
              <el-table-column
                label="从表字段"
                prop="foreignColumn"
                width="150"
              ></el-table-column>
              <el-table-column label="关系类型" width="150">
                <template #default="{ row }">
                  <el-tag
                    v-if="row.relationType === 'one-to-one'"
                    type="success"
                    >一对一</el-tag
                  >
                  <el-tag
                    v-else-if="row.relationType === 'one-to-many'"
                    type="primary"
                    >一对多</el-tag
                  >
                  <el-tag
                    v-else-if="row.relationType === 'many-to-many'"
                    type="warning"
                    >多对多</el-tag
                  >
                </template>
              </el-table-column>
              <el-table-column label="更新约束" width="120">
                <template #default="{ row }">
                  <el-tag v-if="row.onUpdateAction === 'cascade'" type="danger"
                    >级联更新</el-tag
                  >
                  <el-tag
                    v-else-if="row.onUpdateAction === 'restrict'"
                    type="warning"
                    >限制更新</el-tag
                  >
                  <el-tag
                    v-else-if="row.onUpdateAction === 'set-null'"
                    type="info"
                    >设为NULL</el-tag
                  >
                  <el-tag
                    v-else-if="row.onUpdateAction === 'set-default'"
                    type="info"
                    >设为默认值</el-tag
                  >
                  <el-tag v-else type="info">无操作</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="删除约束" width="120">
                <template #default="{ row }">
                  <el-tag v-if="row.onDeleteAction === 'cascade'" type="danger"
                    >级联删除</el-tag
                  >
                  <el-tag
                    v-else-if="row.onDeleteAction === 'restrict'"
                    type="warning"
                    >限制删除</el-tag
                  >
                  <el-tag
                    v-else-if="row.onDeleteAction === 'set-null'"
                    type="info"
                    >设为NULL</el-tag
                  >
                  <el-tag
                    v-else-if="row.onDeleteAction === 'set-default'"
                    type="info"
                    >设为默认值</el-tag
                  >
                  <el-tag v-else type="info">无操作</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template #default="{ row, $index }">
                  <el-button
                    @click="editRelation($index)"
                    type="primary"
                    size="small"
                    >编辑</el-button
                  >
                  <el-button
                    @click="removeRelation($index)"
                    type="danger"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-tab-pane>

      <!-- 跨表更新标签页 -->
      <el-tab-pane label="跨表更新" name="cross-table-update">
        <div class="tab-content">
          <div class="update-section">
            <!-- 条件设置区域 -->
            <el-card class="subsection-card">
              <template #header>
                <span>设置更新条件</span>
              </template>

              <div
                v-for="(condition, index) in updateConditions"
                :key="index"
                class="condition-item"
              >
                <el-select
                  v-model="condition.table"
                  placeholder="选择表"
                  style="width: 150px"
                  @change="condition.field = ''"
                >
                  <el-option
                    v-for="table in tables"
                    :key="table.name"
                    :label="table.name"
                    :value="table.name"
                  ></el-option>
                </el-select>

                <el-select
                  v-model="condition.field"
                  placeholder="选择字段"
                  style="width: 200px; margin-left: 10px"
                  :disabled="!condition.table"
                >
                  <el-option
                    v-for="col in getTableColumns(condition.table)"
                    :key="`${condition.table}.${col.name}`"
                    :label="col.name"
                    :value="`${condition.table}.${col.name}`"
                  ></el-option>
                </el-select>

                <el-select
                  v-model="condition.operator"
                  style="width: 120px; margin-left: 10px"
                >
                  <el-option label="=" value="="></el-option>
                  <el-option label="!=" value="!="></el-option>
                  <el-option label=">" value=">"></el-option>
                  <el-option label=">=" value=">="></el-option>
                  <el-option label="<" value="<"></el-option>
                  <el-option label="<=" value="<="></el-option>
                  <el-option label="LIKE" value="LIKE"></el-option>
                </el-select>

                <el-input
                  v-model="condition.value"
                  placeholder="输入值"
                  style="width: 200px; margin-left: 10px"
                ></el-input>

                <el-button
                  @click="removeUpdateCondition(index)"
                  type="danger"
                  text
                  style="margin-left: 10px"
                  :disabled="updateConditions.length === 1"
                >
                  删除
                </el-button>
              </div>

              <el-button
                @click="addUpdateCondition"
                type="primary"
                style="margin-top: 10px"
              >
                添加条件
              </el-button>
            </el-card>

            <!-- 更新字段设置区域 -->
            <el-card class="subsection-card">
              <template #header>
                <span>设置更新字段</span>
              </template>

              <el-form
                :model="updateFieldForm"
                label-width="550px"
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <el-form-item
                  label="目标表"
                  style="width: 100%; display: flex; justify-content: center"
                >
                  <el-select
                    v-model="updateFieldForm.table"
                    placeholder="选择目标表"
                    style="width: 300px"
                    @change="updateFieldForm.field = ''"
                  >
                    <el-option
                      v-for="table in tables"
                      :key="table.name"
                      :label="table.name"
                      :value="table.name"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  label="目标字段"
                  style="width: 100%; display: flex; justify-content: center"
                >
                  <el-select
                    v-model="updateFieldForm.field"
                    placeholder="选择要更新的字段"
                    style="width: 300px"
                    :disabled="!updateFieldForm.table"
                  >
                    <el-option
                      v-for="col in getTableColumns(updateFieldForm.table)"
                      :key="`${updateFieldForm.table}.${col.name}`"
                      :label="col.name"
                      :value="`${updateFieldForm.table}.${col.name}`"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  label="新值"
                  style="width: 100%; display: flex; justify-content: center"
                >
                  <el-input
                    v-model="updateFieldForm.value"
                    placeholder="请输入新的值"
                    style="width: 300px"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  label="操作者"
                  required
                  style="width: 100%; display: flex; justify-content: center"
                >
                  <el-input
                    v-model="updateFieldForm.operator"
                    placeholder="请输入操作者姓名（必填）"
                    style="width: 300px"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-card>

            <!-- 跨表更新安全设置 -->
            <el-card class="subsection-card">
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding: 20px;
                "
              >
                <span style="margin-right: 15px; font-size: 14px"
                  >禁止未定义关系的跨表更新</span
                >
                <el-switch
                  v-model="updateSettings.strictMode"
                  active-text="已开启"
                  inactive-text="已关闭"
                >
                </el-switch>
                <el-tooltip
                  content="开启后，只有明确定义了关联关系的表之间才能进行跨表更新，避免误操作"
                  placement="top"
                >
                  <el-icon style="margin-left: 10px; cursor: pointer">
                    <QuestionFilled />
                  </el-icon>
                </el-tooltip>
              </div>
            </el-card>

            <!-- 操作按钮 -->
            <div class="action-buttons">
              <el-button
                @click="executeCrossTableUpdate"
                type="primary"
                :loading="updateLoading"
              >
                执行更新
              </el-button>
              <el-button @click="previewUpdate" type="success">
                预览影响记录
              </el-button>
              <el-button @click="resetCrossTableUpdate" type="info">
                重置表单
              </el-button>
            </div>

            <!-- 更新结果 -->
            <el-card v-if="updateResult" class="subsection-card">
              <template #header>
                <span>更新结果</span>
              </template>

              <el-alert
                :title="updateResult.message"
                :type="updateResult.updatedCount > 0 ? 'success' : 'info'"
                show-icon
                :closable="false"
              >
                <template #default>
                  <p>匹配记录数: {{ updateResult.matchedCount }}</p>
                  <p>实际更新数: {{ updateResult.updatedCount }}</p>
                  <p>
                    操作者:
                    {{ updateResult.operator || updateFieldForm.operator }}
                  </p>
                  <p>执行时间: {{ formatDateTime(updateResult.timestamp) }}</p>
                </template>
              </el-alert>

              <div class="sql-preview" v-if="updateResult.sql">
                <strong>生成的 SQL:</strong>
                <pre>{{ updateResult.sql }}</pre>
              </div>
            </el-card>
          </div>
        </div>
      </el-tab-pane>

      <!-- 更新历史标签页 -->
      <el-tab-pane label="更新历史" name="update-history">
        <div class="tab-content">
          <div class="history-section">
            <!-- 筛选条件 -->
            <el-card class="subsection-card">
              <template #header>
                <span>筛选条件</span>
              </template>

              <el-form :model="historyFilter" label-width="120px">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="开始日期">
                      <el-date-picker
                        v-model="historyFilter.startDate"
                        type="datetime"
                        placeholder="选择开始日期"
                        style="width: 100%"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="结束日期">
                      <el-date-picker
                        v-model="historyFilter.endDate"
                        type="datetime"
                        placeholder="选择结束日期"
                        style="width: 100%"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item>
                      <el-button
                        @click="fetchUpdateHistory"
                        type="primary"
                        :loading="historyLoading"
                      >
                        查询
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>

            <!-- 历史记录表格 -->
            <el-card class="subsection-card">
              <template #header>
                <div class="card-header">
                  <span>历史记录</span>
                  <el-button
                    @click="exportUpdateHistory"
                    type="success"
                    size="small"
                    :disabled="!updateHistory.length"
                  >
                    导出CSV
                  </el-button>
                </div>
              </template>

              <el-table
                :data="updateHistory"
                border
                v-loading="historyLoading"
                style="width: 100%"
              >
                <el-table-column label="时间" width="180">
                  <template #default="{ row }">
                    {{ formatDateTime(row.timestamp) }}
                  </template>
                </el-table-column>
                <el-table-column label="操作者" width="120">
                  <template #default="{ row }">
                    {{ row.operator || "未知" }}
                  </template>
                </el-table-column>
                <el-table-column label="更新字段" width="200">
                  <template #default="{ row }">
                    {{ row.updateInfo.field }}
                  </template>
                </el-table-column>
                <el-table-column label="新值" width="150">
                  <template #default="{ row }">
                    {{ row.updateInfo.value }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="更新记录数"
                  prop="update_count"
                  width="120"
                ></el-table-column>
                <el-table-column label="更新条件" min-width="300">
                  <template #default="{ row }">
                    <div
                      v-for="(condition, index) in row.conditions"
                      :key="index"
                    >
                      {{ condition.field }} {{ condition.operator }}
                      {{ condition.value }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template #default="{ row }">
                    <el-button
                      size="small"
                      type="primary"
                      @click="viewModificationDetails(row)"
                    >
                      查看详情
                    </el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="deleteHistoryRecord(row.id)"
                    >
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>

              <div
                v-if="!updateHistory.length && !historyLoading"
                style="text-align: center; padding: 20px"
              >
                <el-empty description="暂无历史记录"></el-empty>
              </div>
            </el-card>
          </div>
        </div>
      </el-tab-pane>

      <!-- 统计分析标签页 -->
      <el-tab-pane label="统计分析" name="statistics">
        <div class="tab-content">
          <div class="statistics-section">
            <!-- 统计条件 -->
            <el-card class="subsection-card">
              <template #header>
                <span>统计条件</span>
              </template>

              <el-form :model="statisticsForm" label-width="120px">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="选择表格">
                      <el-select
                        v-model="statisticsForm.tableName"
                        placeholder="请选择表格"
                        @change="onStatisticsTableChange"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="table in tables"
                          :key="table.name"
                          :label="table.name"
                          :value="table.name"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="选择字段">
                      <el-select
                        v-model="statisticsForm.fieldName"
                        placeholder="请选择要统计的字段"
                        style="width: 100%"
                        :disabled="!statisticsForm.tableName"
                      >
                        <el-option
                          v-for="field in statisticsTableFields"
                          :key="field.name"
                          :label="field.name"
                          :value="field.name"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item>
                      <el-button
                        @click="fetchStatistics"
                        type="primary"
                        :loading="statisticsLoading"
                        :disabled="
                          !statisticsForm.tableName || !statisticsForm.fieldName
                        "
                      >
                        生成统计
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>

            <!-- 统计结果 -->
            <el-card
              v-if="
                statisticsData &&
                statisticsData.data &&
                statisticsData.data.length
              "
              class="subsection-card"
            >
              <template #header>
                <span
                  >统计结果 - {{ statisticsForm.tableName }}.{{
                    statisticsForm.fieldName
                  }}</span
                >
              </template>

              <!-- 饼状图 -->
              <div class="chart-container">
                <div ref="pieChartRef" style="width: 100%; height: 500px"></div>
              </div>

              <!-- 数据表格 -->
              <el-table
                :data="statisticsData.data"
                border
                style="width: 100%; margin-top: 20px"
              >
                <el-table-column
                  :label="statisticsForm.fieldName"
                  prop="value"
                ></el-table-column>
                <el-table-column label="数量" prop="count"></el-table-column>
                <el-table-column label="占比" prop="percentage">
                  <template #default="{ row }">
                    {{ row.percentage }}%
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </div>
        </div>
      </el-tab-pane>

      <!-- 在现有的 el-tab-pane 后面添加这个新的标签页 -->
      <el-tab-pane label="高级查询" name="advanced-query">
        <div class="tab-content">
          <div class="query-section">
            <!-- 查询条件区域 -->
            <el-card class="subsection-card">
              <template #header>
                <span>设置查询条件</span>
              </template>

              <div
                v-for="(condition, index) in queryConfig.conditions"
                :key="index"
                class="condition-item"
              >
                <el-select
                  v-model="condition.table"
                  placeholder="选择表"
                  style="width: 150px"
                  @change="condition.field = ''"
                >
                  <el-option
                    v-for="table in availableTables"
                    :key="table"
                    :label="table"
                    :value="table"
                  ></el-option>
                </el-select>

                <el-select
                  v-model="condition.field"
                  placeholder="选择字段"
                  style="width: 200px; margin-left: 10px"
                  :disabled="!condition.table"
                >
                  <el-option
                    v-for="col in getTableColumns(condition.table)"
                    :key="`${condition.table}.${col.name}`"
                    :label="col.name"
                    :value="
                      condition.table ? `${condition.table}.${col.name}` : ''
                    "
                  ></el-option>
                </el-select>

                <el-select
                  v-model="condition.operator"
                  style="width: 120px; margin-left: 10px"
                >
                  <el-option label="=" value="="></el-option>
                  <el-option label="!=" value="!="></el-option>
                  <el-option label=">" value=">"></el-option>
                  <el-option label=">=" value=">="></el-option>
                  <el-option label="<" value="<"></el-option>
                  <el-option label="<=" value="<="></el-option>
                  <el-option label="LIKE" value="LIKE"></el-option>
                </el-select>

                <el-input
                  v-model="condition.value"
                  placeholder="输入值"
                  style="width: 200px; margin-left: 10px"
                ></el-input>

                <el-button
                  @click="removeCondition(index)"
                  type="danger"
                  text
                  style="margin-left: 10px"
                  >删除</el-button
                >
              </div>

              <el-button
                @click="addCondition"
                type="primary"
                style="margin-top: 10px"
                >添加条件</el-button
              >
            </el-card>

            <!-- 操作按钮 -->
            <div class="action-buttons">
              <el-button
                @click="executeQuery"
                type="primary"
                :loading="queryLoading"
                >执行查询</el-button
              >
              <el-button @click="saveAsTemplate" type="success"
                >保存为模板</el-button
              >
              <el-button @click="showTemplateManager = true" type="info"
                >模板管理</el-button
              >
              <el-button
                @click="exportResults('csv')"
                :disabled="!queryResult.data"
                >导出 CSV</el-button
              >
              <el-button
                @click="exportResults('json')"
                :disabled="!queryResult.data"
                >导出 JSON</el-button
              >
              <el-button @click="resetAdvancedQuery" type="warning">
                重置表单
              </el-button>
            </div>

            <!-- 查询结果 -->
            <el-card v-if="queryResult.data" class="subsection-card">
              <template #header>
                <span>查询结果 ({{ queryResult.count }} 条记录)</span>
              </template>

              <div class="table-container">
                <el-table
                  :data="queryResult.data"
                  border
                  height="400"
                  v-loading="queryLoading"
                  style="width: 100%"
                >
                  <el-table-column
                    v-for="column in getResultColumns()"
                    :key="column"
                    :prop="column"
                    :label="column"
                    min-width="120"
                    show-overflow-tooltip
                  ></el-table-column>
                </el-table>
              </div>

              <div class="sql-preview" v-if="queryResult.sql">
                <strong>生成的 SQL:</strong>
                <pre>{{ queryResult.sql }}</pre>
              </div>

              <!-- 分页控件 -->
              <div
                class="pagination-container"
                v-if="queryResult.data && totalRecords > 0"
              >
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="pageSizes"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalRecords"
                >
                </el-pagination>
              </div>
            </el-card>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 各种对话框 -->
    <!-- 重命名表对话框 -->
    <el-dialog
      v-model="renameTableDialogVisible"
      title="重命名表"
      width="400px"
    >
      <el-form :model="renameTableForm" label-width="80px">
        <el-form-item label="新表名">
          <el-input
            v-model="renameTableForm.newName"
            placeholder="请输入新表名"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="renameTableDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="renameTable">确定</el-button>
      </template>
    </el-dialog>

    <!-- 添加字段对话框 -->
    <el-dialog v-model="addColumnDialogVisible" title="添加字段" width="500px">
      <el-form :model="newColumn" label-width="100px">
        <el-form-item label="字段名">
          <el-input
            v-model="newColumn.name"
            placeholder="请输入字段名"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据类型">
          <el-select v-model="newColumn.type" placeholder="选择数据类型">
            <el-option label="INTEGER" value="INTEGER"></el-option>
            <el-option label="TEXT" value="TEXT"></el-option>
            <el-option label="REAL" value="REAL"></el-option>
            <el-option label="BLOB" value="BLOB"></el-option>
            <el-option label="DATETIME" value="DATETIME"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="newColumn.primaryKey">主键</el-checkbox>
          <el-checkbox v-model="newColumn.notNull">非空</el-checkbox>
          <el-checkbox v-model="newColumn.unique">唯一</el-checkbox>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addColumnDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addColumn">添加</el-button>
      </template>
    </el-dialog>

    <!-- 管理字段对话框 -->
    <el-dialog
      v-model="manageColumnsDialogVisible"
      title="管理字段"
      width="700px"
    >
      <el-table :data="tableStructure" border>
        <el-table-column label="字段名" prop="name"></el-table-column>
        <el-table-column label="数据类型" prop="type"></el-table-column>
        <el-table-column label="主键" width="80">
          <template #default="{ row }">
            <el-tag v-if="row.pk" type="success">是</el-tag>
            <el-tag v-else type="info">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="非空" width="80">
          <template #default="{ row }">
            <el-tag v-if="row.notnull" type="success">是</el-tag>
            <el-tag v-else type="info">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="{ row, $index }">
            <el-button
              @click="showRenameColumnDialog(row.name)"
              type="warning"
              size="small"
              >重命名</el-button
            >
            <el-button
              @click="removeColumn(row.name)"
              type="danger"
              size="small"
              :disabled="row.pk"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 重命名字段对话框 -->
    <el-dialog
      v-model="renameColumnDialogVisible"
      title="重命名字段"
      width="400px"
    >
      <el-form :model="renameColumnForm" label-width="80px">
        <el-form-item label="新字段名">
          <el-input
            v-model="renameColumnForm.newName"
            placeholder="请输入新字段名"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="renameColumnDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="renameColumn">确定</el-button>
      </template>
    </el-dialog>

    <!-- 表详情对话框 -->
    <el-dialog v-model="tableDetailsDialogVisible" title="表详情" width="800px">
      <div v-if="tableDetails">
        <el-descriptions title="表信息" border :column="2">
          <el-descriptions-item label="表名">{{
            tableDetails.tableName
          }}</el-descriptions-item>
          <el-descriptions-item label="记录数">{{
            tableDetails.rowCount
          }}</el-descriptions-item>
        </el-descriptions>

        <h4 style="margin-top: 20px">表结构</h4>
        <el-table :data="tableDetails.structure" border>
          <el-table-column label="字段名" prop="name"></el-table-column>
          <el-table-column label="数据类型" prop="type"></el-table-column>
          <el-table-column label="主键" width="80">
            <template #default="{ row }">
              <el-tag v-if="row.pk" type="success">是</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="非空" width="80">
            <template #default="{ row }">
              <el-tag v-if="row.notnull" type="success">是</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="默认值" prop="dflt_value"></el-table-column>
        </el-table>

        <h4 style="margin-top: 20px">索引信息</h4>
        <el-table
          :data="tableDetails.indexes"
          border
          v-if="tableDetails.indexes.length > 0"
        >
          <el-table-column label="索引名" prop="name"></el-table-column>
          <el-table-column label="唯一索引" width="100">
            <template #default="{ row }">
              <el-tag v-if="row.unique" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-empty v-else description="无索引" :image-size="80"></el-empty>
      </div>
    </el-dialog>

    <!-- 添加数据对话框 -->
    <el-dialog
      v-model="addDataDialogVisible"
      :title="`添加数据 - ${currentTable}`"
      width="600px"
    >
      <el-form :model="newData" label-width="120px">
        <el-form-item
          v-for="column in tableStructure"
          :key="column.name"
          :label="column.name"
          :required="column.notnull"
        >
          <el-input
            v-model="newData[column.name]"
            :placeholder="`请输入 ${column.name}`"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addDataDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="insertData" :loading="insertLoading"
          >添加</el-button
        >
      </template>
    </el-dialog>

    <!-- 编辑数据对话框 -->
    <el-dialog v-model="editDataDialogVisible" title="编辑数据" width="600px">
      <el-form :model="editingData" label-width="120px">
        <el-form-item
          v-for="column in tableStructure"
          :key="column.name"
          :label="column.name"
        >
          <el-input
            v-model="editingData[column.name]"
            :placeholder="`请输入 ${column.name}`"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDataDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData" :loading="updateLoading"
          >更新</el-button
        >
      </template>
    </el-dialog>

    <!-- 预览更新对话框 -->
    <el-dialog
      v-model="previewDialogVisible"
      title="更新预览"
      width="90%"
      :close-on-click-modal="false"
      class="preview-dialog"
    >
      <div v-if="previewResult">
        <!-- 预览数据表格 -->
        <div
          v-if="
            previewResult.previewData && previewResult.previewData.length > 0
          "
        >
          <!-- 调试信息 -->
          <div
            style="
              background: #f0f0f0;
              padding: 10px;
              margin-bottom: 10px;
              border-radius: 4px;
              font-size: 12px;
            "
          >
            <strong>调试:</strong> 更新字段: {{ updateFieldForm.field }} |
            字段名: {{ updateFieldForm.field?.split(".").pop() }}
          </div>

          <el-table
            :data="previewResult.previewData"
            border
            stripe
            style="width: 100%"
            max-height="400"
            class="comparison-table"
          >
            <el-table-column
              v-for="(value, key) in previewResult.previewData[0]"
              :key="key"
              :prop="key"
              :label="key === 'new_value' ? '修改后值' : `修改前-${key}`"
              min-width="120"
              show-overflow-tooltip
              :class-name="
                key === 'new_value'
                  ? 'new-value-column'
                  : key === updateFieldForm.field?.split('.').pop()
                  ? 'modified-field-column'
                  : ''
              "
            >
              <template #default="{ row }">
                <div v-if="key === 'new_value'" class="new-value-cell">
                  <div class="value-container">
                    <el-icon class="change-icon"><Edit /></el-icon>
                    <span class="new-value-text">{{ row[key] }}</span>
                    <el-tag type="success" size="small" class="change-tag"
                      >新值</el-tag
                    >
                  </div>
                </div>
                <div
                  v-else
                  class="field-cell"
                  :class="{
                    'modified-field':
                      key === updateFieldForm.field?.split('.').pop(),
                  }"
                >
                  <span class="field-value">{{ row[key] || "空值" }}</span>
                  <el-tag
                    v-if="key === updateFieldForm.field?.split('.').pop()"
                    type="warning"
                    size="small"
                    class="field-tag"
                    >原值</el-tag
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 底部基本信息 -->
        <div class="simple-info">
          <p><strong>影响记录:</strong> {{ previewResult.affectedCount }} 条</p>
          <p><strong>更新字段:</strong> {{ updateFieldForm.field }}</p>
          <p><strong>新值:</strong> {{ updateFieldForm.value }}</p>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="previewDialogVisible = false" size="large">
            <el-icon><Close /></el-icon>
            关闭
          </el-button>
          <el-button
            type="primary"
            @click="executeCrossTableUpdate"
            :disabled="!previewResult"
            size="large"
          >
            <el-icon><Check /></el-icon>
            确认执行更新
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 修改详情对话框 -->
    <el-dialog
      v-model="modificationDialogVisible"
      title="修改详情"
      width="90%"
      :close-on-click-modal="false"
    >
      <div v-if="modificationDetails">
        <!-- 修改前后对比表格 -->
        <div v-if="getDetailedComparisonData().length > 0">
          <el-table
            :data="getDetailedComparisonData()"
            border
            stripe
            style="width: 100%"
            max-height="400"
            class="comparison-table"
          >
            <!-- 显示所有原始字段 -->
            <el-table-column
              v-for="(value, key) in getDetailedComparisonData()[0]
                ?.beforeRecord || {}"
              :key="key"
              :prop="key"
              :label="`修改前-${key}`"
              min-width="120"
              show-overflow-tooltip
              :class-name="
                key === getDetailedComparisonData()[0]?.fieldName
                  ? 'modified-field-column'
                  : ''
              "
            >
              <template #default="{ row }">
                <div
                  class="field-cell"
                  :class="{ 'modified-field': key === row.fieldName }"
                >
                  <span class="field-value">{{
                    row.beforeRecord[key] || "空值"
                  }}</span>
                  <el-tag
                    v-if="key === row.fieldName"
                    type="warning"
                    size="small"
                    class="field-tag"
                    >原值</el-tag
                  >
                </div>
              </template>
            </el-table-column>

            <!-- 显示修改后的值 -->
            <el-table-column
              label="修改后值"
              min-width="140"
              class-name="new-value-column"
            >
              <template #default="{ row }">
                <div class="new-value-cell">
                  <div class="value-container">
                    <el-icon class="change-icon"><Edit /></el-icon>
                    <span class="new-value-text">{{ row.afterValue }}</span>
                    <el-tag type="success" size="small" class="change-tag"
                      >新值</el-tag
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 如果没有数据，显示提示信息 -->
        <div v-else class="no-data-message">
          <el-empty description="暂无修改详情数据" />
        </div>

        <!-- 底部基本信息 -->
        <div class="simple-info">
          <p>
            <strong>时间:</strong>
            {{ formatDateTime(modificationDetails.timestamp) }}
          </p>
          <p>
            <strong>操作者:</strong>
            {{ modificationDetails.operator || "未知" }}
          </p>
          <p>
            <strong>影响:</strong> {{ modificationDetails.update_count }} 条记录
          </p>
          <p><strong>更新条件:</strong> {{ getConditionsText() }}</p>
        </div>
      </div>

      <template #footer>
        <el-button @click="modificationDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {
  ref,
  onMounted,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  nextTick,
  watch,
} from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  Edit,
  Close,
  Check,
  Document,
  QuestionFilled,
} from "@element-plus/icons-vue";
import * as echarts from "echarts";

export default {
  name: "DatabaseManager",
  setup() {
    // 在 setup() 函数中添加这些变量和方法

    // 高级查询相关
    const availableTables = ref([]);
    const tableColumns = ref({});
    const queryLoading = ref(false);

    const queryConfig = ref({
      joins: [],
      conditions: [{ table: "", field: "", operator: "=", value: "" }],
    });

    const queryResult = ref({ data: null, count: 0, sql: "", totalCount: 0 });
    const saveTemplateDialogVisible = ref(false);
    const showTemplateManager = ref(false);
    const queryTemplates = ref([]);

    // 分页相关
    const currentPage = ref(1);
    const pageSize = ref(20);
    const totalRecords = ref(0);
    const pageSizes = [10, 20, 50, 100];

    const templateForm = ref({
      name: "",
      description: "",
    });

    // 高级查询方法
    const fetchTablesForQuery = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tables");
        availableTables.value = response.data;
      } catch (error) {
        ElMessage.error("获取表列表失败");
      }
    };

    const fetchTableColumns = async (tableName) => {
      if (tableColumns.value[tableName]) return tableColumns.value[tableName];

      try {
        const response = await axios.get(
          `http://localhost:3000/api/tableColumns/${tableName}`
        );
        tableColumns.value[tableName] = response.data;
        return response.data;
      } catch (error) {
        ElMessage.error(`获取表 ${tableName} 的字段失败`);
        return [];
      }
    };

    const getTableColumns = (tableName) => {
      // 如果表名为空，直接返回空数组
      if (!tableName) return [];

      // 如果本地缓存中没有，则尝试从服务器获取
      if (!tableColumns.value[tableName]) {
        fetchTableColumns(tableName);
      }
      return tableColumns.value[tableName] || [];
    };

    const addCondition = () => {
      queryConfig.value.conditions.push({
        table: "",
        field: "",
        operator: "=",
        value: "",
      });
    };

    const removeCondition = (index) => {
      queryConfig.value.conditions.splice(index, 1);
    };

    const resetAdvancedQuery = () => {
      // 重置查询配置
      queryConfig.value = {
        joins: [],
        conditions: [{ table: "", field: "", operator: "=", value: "" }],
      };

      // 重置查询结果
      queryResult.value = { data: null, count: 0, sql: "", totalCount: 0 };

      // 重置分页
      currentPage.value = 1;
      pageSize.value = 20;
      totalRecords.value = 0;

      ElMessage.success("查询表单已重置");
    };

    const executeQuery = async () => {
      // 验证条件是否完整
      if (
        queryConfig.value.conditions.some(
          (c) => !c.table || !c.field || !c.value
        )
      ) {
        ElMessage.warning("请填写完整的查询条件（表、字段和值）");
        return;
      }

      // 从条件中提取所有涉及的表
      const involvedTables = new Set();
      queryConfig.value.conditions.forEach((condition) => {
        if (condition.table) {
          involvedTables.add(condition.table);
        }
      });

      // 如果有多个表，检查是否存在关系
      if (involvedTables.size > 1) {
        const hasJoins =
          queryConfig.value.joins && queryConfig.value.joins.length > 0;

        // 如果没有显式的JOIN，尝试根据关系自动创建
        if (!hasJoins) {
          const autoJoins = generateAutoJoins();
          if (autoJoins.length > 0) {
            queryConfig.value.joins = autoJoins;
            ElMessage.info(`已根据表关系自动生成${autoJoins.length}个连接条件`);
          } else {
            const confirmResult = await ElMessageBox.confirm(
              "所选的表之间没有明确定义关系，系统将尝试自动推断关联关系。这可能导致查询结果不完整或不准确。建议您在关系管理中先定义表之间的关系。是否继续？",
              "关联关系提示",
              {
                confirmButtonText: "继续执行",
                cancelButtonText: "取消",
                type: "warning",
              }
            ).catch(() => false);

            if (!confirmResult) {
              return;
            }
          }
        }
      }

      queryLoading.value = true;
      try {
        // 准备分页参数
        const queryParams = {
          tables: extractTablesFromConditions(),
          joins: queryConfig.value.joins || [],
          conditions: queryConfig.value.conditions || [],
          page: currentPage.value,
          pageSize: pageSize.value,
        };

        const response = await axios.post(
          "http://localhost:3000/api/advanced-query",
          queryParams
        );
        queryResult.value = response.data;
        totalRecords.value = response.data.totalCount || response.data.count;
        ElMessage.success(`查询成功，找到 ${totalRecords.value} 条记录`);
      } catch (error) {
        ElMessage.error(
          `查询失败: ${error.response?.data?.details || error.message}`
        );
      } finally {
        queryLoading.value = false;
      }
    };

    // 根据表间关系自动生成JOIN条件
    const generateAutoJoins = () => {
      const autoJoins = [];

      // 从条件中提取所有涉及的表
      const selectedTables = new Set();
      queryConfig.value.conditions.forEach((condition) => {
        if (condition.table) {
          selectedTables.add(condition.table);
        }
      });
      const selectedTablesArray = Array.from(selectedTables);

      // 遍历所有关系，找出与所选表相关的
      relations.value.forEach((relation) => {
        const primaryTableIndex = selectedTablesArray.indexOf(
          relation.primaryTable
        );
        const foreignTableIndex = selectedTablesArray.indexOf(
          relation.foreignTable
        );

        // 如果两个表都被选中，则创建JOIN条件
        if (primaryTableIndex !== -1 && foreignTableIndex !== -1) {
          // 根据关系类型确定JOIN类型
          let joinType = "INNER JOIN";
          if (relation.relationType === "one-to-one") {
            // 一对一关系通常使用INNER JOIN
            joinType = "INNER JOIN";
          } else if (relation.relationType === "one-to-many") {
            // 一对多关系可以使用LEFT JOIN，以保留主表的所有记录
            joinType = "LEFT JOIN";
          } else if (relation.relationType === "many-to-many") {
            // 多对多关系需要通过中间表，这里简化处理
            joinType = "INNER JOIN";
            ElMessage.warning(
              "多对多关系需要通过中间表连接，当前自动生成的JOIN可能不完整"
            );
          }

          autoJoins.push({
            leftTable: relation.primaryTable,
            rightTable: relation.foreignTable,
            leftColumn: relation.primaryColumn,
            rightColumn: relation.foreignColumn,
            joinType: joinType,
            relationName:
              relation.relationName ||
              `${relation.primaryTable}_${relation.foreignTable}`,
          });
        }
      });

      return autoJoins;
    };

    const getResultColumns = () => {
      if (!queryResult.value.data || queryResult.value.data.length === 0)
        return [];
      return Object.keys(queryResult.value.data[0]);
    };

    const saveAsTemplate = () => {
      saveTemplateDialogVisible.value = true;
    };

    // 从条件中提取表并转换为后端格式
    const extractTablesFromConditions = () => {
      const involvedTables = new Set();
      queryConfig.value.conditions.forEach((condition) => {
        if (condition.table) {
          involvedTables.add(condition.table);
        }
      });
      return Array.from(involvedTables).map((tableName) => ({
        name: tableName,
      }));
    };

    const saveTemplate = async () => {
      if (!templateForm.value.name) {
        ElMessage.warning("请输入模板名称");
        return;
      }

      try {
        await axios.post("http://localhost:3000/api/query-templates", {
          ...templateForm.value,
          tables: extractTablesFromConditions(),
          joins: queryConfig.value.joins || [],
          conditions: queryConfig.value.conditions || [],
        });
        ElMessage.success("模板保存成功");
        saveTemplateDialogVisible.value = false;
        templateForm.value = { name: "", description: "" };
        fetchTemplates();
      } catch (error) {
        ElMessage.error("保存模板失败");
      }
    };

    const fetchTemplates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/query-templates"
        );
        queryTemplates.value = response.data;
      } catch (error) {
        console.error("获取模板失败:", error);
      }
    };

    const loadTemplate = (template) => {
      queryConfig.value = {
        tables: template.tables,
        joins: template.joins || [],
        conditions: template.conditions || [],
      };
      showTemplateManager.value = false;
      ElMessage.success("模板加载成功");
    };

    const deleteTemplate = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/query-templates/${id}`);
        ElMessage.success("模板删除成功");
        fetchTemplates();
      } catch (error) {
        ElMessage.error("删除模板失败");
      }
    };

    const exportResults = async (format) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/export-query",
          {
            tables: extractTablesFromConditions(),
            joins: queryConfig.value.joins || [],
            conditions: queryConfig.value.conditions || [],
            format,
          },
          { responseType: "blob" }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        const filename = `query_result_${Date.now()}.${format}`;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        ElMessage.success("导出成功");
      } catch (error) {
        ElMessage.error("导出失败");
      }
    };

    // 分页处理函数
    const handleSizeChange = (val) => {
      pageSize.value = val;
      currentPage.value = 1; // 重置到第一页
      executeQuery();
    };

    const handleCurrentChange = (val) => {
      currentPage.value = val;
      executeQuery();
    };

    // 表关系对话框相关
    const showRelationDialog = ref(false);
    const relationForm = ref({
      leftTable: "",
      rightTable: "",
      leftColumn: "",
      rightColumn: "",
      joinType: "INNER JOIN",
    });

    const addJoin = () => {
      if (
        !relationForm.value.leftTable ||
        !relationForm.value.rightTable ||
        !relationForm.value.leftColumn ||
        !relationForm.value.rightColumn
      ) {
        ElMessage.warning("请填写完整的连接条件");
        return;
      }

      if (!queryConfig.value.joins) {
        queryConfig.value.joins = [];
      }

      queryConfig.value.joins.push({
        ...relationForm.value,
      });

      // 重置表单
      relationForm.value = {
        leftTable: "",
        rightTable: "",
        leftColumn: "",
        rightColumn: "",
        joinType: "INNER JOIN",
      };

      ElMessage.success("连接条件添加成功");
    };

    const removeJoin = (index) => {
      queryConfig.value.joins.splice(index, 1);
    };

    // 获取后端保存的关系
    const fetchRelations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/table-relations"
        );
        // 转换后端格式到前端格式
        relations.value = response.data.map((relation) => ({
          primaryTable: relation.left_table,
          primaryColumn: relation.left_column,
          foreignTable: relation.right_table,
          foreignColumn: relation.right_column,
          relationType: "one-to-many", // 默认关系类型
          onUpdateAction: relation.on_update_action || "no-action",
          onDeleteAction: relation.on_delete_action || "no-action",
          relationName: relation.relation_name || "",
        }));
      } catch (error) {
        console.error("获取关系失败:", error);
        ElMessage.error("获取表关联关系失败");
      }
    };

    // 简单的防抖函数
    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    // 在 onMounted 中添加
    onMounted(() => {
      fetchTables();
      fetchTablesForQuery(); // 新增
      fetchTemplates(); // 新增
      fetchRelations(); // 获取表关联关系
    });

    const activeTab = ref("table-manager");

    // 表管理相关
    const newTable = ref({
      tableName: "",
      fields: [
        {
          name: "id",
          type: "INTEGER",
          primaryKey: true,
          notNull: true,
          unique: false,
        },
      ],
    });

    const tables = ref([]);
    const tableLoading = ref(false);

    // 数据管理相关
    const currentTable = ref("");
    const tableData = ref([]);
    const tableStructure = ref([]);
    const currentTableColumns = ref([]);
    const tableKey = ref(0);
    const dataLoading = ref(false);
    const insertLoading = ref(false);
    const updateLoading = ref(false);

    // 关系管理相关
    const newRelation = ref({
      primaryTable: "",
      primaryColumn: "",
      foreignTable: "",
      foreignColumn: "",
      relationType: "one-to-many", // one-to-one, one-to-many, many-to-many
      onUpdateAction: "no-action", // no-action, cascade, restrict, set-null, set-default
      onDeleteAction: "no-action", // no-action, cascade, restrict, set-null, set-default
      relationName: "", // 关系名称
    });
    const relations = ref([]);
    const primaryTableColumns = ref([]);
    const foreignTableColumns = ref([]);

    // 对话框相关
    const renameTableDialogVisible = ref(false);
    const addColumnDialogVisible = ref(false);
    const manageColumnsDialogVisible = ref(false);
    const renameColumnDialogVisible = ref(false);
    const tableDetailsDialogVisible = ref(false);
    const addDataDialogVisible = ref(false);
    const editDataDialogVisible = ref(false);

    // 表单数据
    const renameTableForm = ref({ oldName: "", newName: "" });
    const newColumn = ref({
      name: "",
      type: "TEXT",
      primaryKey: false,
      notNull: false,
      unique: false,
    });
    const renameColumnForm = ref({ oldName: "", newName: "" });
    const tableDetails = ref(null);
    const newData = ref({});
    const editingData = ref({});
    const originalEditingData = ref({}); // 保存编辑前的原始数据

    // 字段值域验证配置
    const fieldValidationRules = {
      // 性别字段：只能是 "男" 或 "女"
      gender: {
        allowedValues: ["男", "女"],
        message: "性别字段只能是 '男' 或 '女'",
      },
      // 状态字段：只能是 "启用" 或 "禁用"
      status: {
        allowedValues: ["启用", "禁用"],
        message: "状态字段只能是 '启用' 或 '禁用'",
      },
      // 可以添加更多字段验证规则
    };

    // 字段值域验证函数
    const validateFieldValue = (fieldName, value) => {
      // 将字段名转换为小写，以支持不同的大小写变体
      const lowerFieldName = fieldName.toLowerCase();

      // 检查是否有匹配的验证规则
      for (const [ruleField, rule] of Object.entries(fieldValidationRules)) {
        if (lowerFieldName.includes(ruleField.toLowerCase())) {
          if (!rule.allowedValues.includes(value)) {
            return {
              valid: false,
              message: rule.message,
              allowedValues: rule.allowedValues,
            };
          }
        }
      }

      return { valid: true };
    };

    // 表管理方法
    const fetchTables = async () => {
      console.log("🚀 前端开始调用fetchTables");
      tableLoading.value = true;
      try {
        await nextTick();
        console.log("📡 发送API请求到后端...");
        const response = await axios.get("http://localhost:3000/api/tables");
        console.log("获取表列表响应:", response.data);

        // 获取每个表的记录数
        const tablesWithCount = await Promise.all(
          response.data.map(async (tableName) => {
            try {
              console.log(`📊 获取表 ${tableName} 的数据...`);
              const dataResponse = await axios.get(
                `http://localhost:3000/api/getData/${tableName}`
              );
              return { name: tableName, rowCount: dataResponse.data.length };
            } catch (error) {
              console.warn(`获取表 ${tableName} 数据失败:`, error);
              return { name: tableName, rowCount: 0 };
            }
          })
        );
        tables.value = tablesWithCount;
        console.log("处理后的表列表:", tables.value);
        await nextTick();
      } catch (error) {
        console.error("获取表列表失败:", error);
        ElMessage.error("获取表列表失败！");
      } finally {
        tableLoading.value = false;
      }
    };

    const createTable = async () => {
      if (!newTable.value.tableName) {
        ElMessage.error("请输入表名！");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/createTable",
          newTable.value
        );
        ElMessage.success(response.data.message);
        resetNewTableForm();
        fetchTables();
      } catch (error) {
        ElMessage.error(
          `创建表失败: ${error.response?.data?.details || error.message}`
        );
      }
    };

    const addNewTableField = () => {
      newTable.value.fields.push({
        name: "",
        type: "TEXT",
        primaryKey: false,
        notNull: false,
        unique: false,
      });
    };

    const removeNewTableField = (index) => {
      if (newTable.value.fields.length > 1) {
        newTable.value.fields.splice(index, 1);
      }
    };

    const resetNewTableForm = () => {
      newTable.value = {
        tableName: "",
        fields: [
          {
            name: "id",
            type: "INTEGER",
            primaryKey: true,
            notNull: true,
            unique: false,
          },
        ],
      };
    };

    // 表结构管理方法
    const showRenameTableDialog = (tableName) => {
      renameTableForm.value = { oldName: tableName, newName: "" };
      renameTableDialogVisible.value = true;
    };

    const renameTable = async () => {
      try {
        const response = await axios.put(
          "http://localhost:3000/api/renameTable",
          renameTableForm.value
        );
        ElMessage.success(response.data.message);
        renameTableDialogVisible.value = false;
        fetchTables();
      } catch (error) {
        ElMessage.error(
          `重命名表失败: ${error.response?.data?.details || error.message}`
        );
      }
    };

    const showAddColumnDialog = async (tableName) => {
      newColumn.value.tableName = tableName;
      addColumnDialogVisible.value = true;
    };

    const addColumn = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/addColumn",
          newColumn.value
        );
        ElMessage.success(response.data.message);
        addColumnDialogVisible.value = false;
        newColumn.value = {
          name: "",
          type: "TEXT",
          primaryKey: false,
          notNull: false,
          unique: false,
        };
        fetchTables();
      } catch (error) {
        ElMessage.error(
          `添加字段失败: ${error.response?.data?.details || error.message}`
        );
      }
    };

    const showManageColumnsDialog = async (tableName) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/tableStructure/${tableName}`
        );
        tableStructure.value = response.data;
        manageColumnsDialogVisible.value = true;
      } catch (error) {
        ElMessage.error("获取表结构失败！");
      }
    };

    const showRenameColumnDialog = (columnName) => {
      renameColumnForm.value = {
        oldName: columnName,
        newName: "",
        tableName: currentTable.value,
      };
      renameColumnDialogVisible.value = true;
    };

    const renameColumn = async () => {
      try {
        const response = await axios.put(
          "http://localhost:3000/api/renameColumn",
          renameColumnForm.value
        );
        ElMessage.success(response.data.message);
        renameColumnDialogVisible.value = false;
        fetchTables();
        if (currentTable.value) {
          viewTableData(currentTable.value);
        }
      } catch (error) {
        ElMessage.error(
          `重命名字段失败: ${error.response?.data?.details || error.message}`
        );
      }
    };

    const removeColumn = async (columnName) => {
      try {
        await ElMessageBox.confirm(
          `确定要删除字段 "${columnName}" 吗？此操作不可恢复！`,
          "警告",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        );

        const response = await axios.delete(
          "http://localhost:3000/api/removeColumn",
          {
            data: { tableName: currentTable.value, columnName },
          }
        );
        ElMessage.success(response.data.message);
        fetchTables();
        if (currentTable.value) {
          viewTableData(currentTable.value);
        }
      } catch (error) {
        if (error !== "cancel") {
          ElMessage.error("删除字段失败！");
        }
      }
    };

    const showTableDetails = async (tableName) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/tableDetails/${tableName}`
        );
        tableDetails.value = response.data;
        tableDetailsDialogVisible.value = true;
      } catch (error) {
        ElMessage.error("获取表详情失败！");
      }
    };

    // 数据管理方法
    const viewTableData = async (tableName) => {
      if (!tableName) return;

      currentTable.value = tableName;
      dataLoading.value = true;

      try {
        // 获取表结构
        const structureResponse = await axios.get(
          `http://localhost:3000/api/tableStructure/${tableName}`
        );
        console.log("表结构数据:", structureResponse.data);
        tableStructure.value = structureResponse.data;
        currentTableColumns.value = structureResponse.data.map((col) => ({
          name: col.name,
          type: col.type,
          primaryKey: col.pk > 0, // SQLite使用pk字段表示主键
        }));

        // 获取表数据
        await refreshTableData();

        // 强制重新渲染表格
        tableKey.value++;
      } catch (error) {
        ElMessage.error("获取数据失败！");
      } finally {
        dataLoading.value = false;
      }
    };

    const refreshTableData = async () => {
      if (!currentTable.value) return;

      console.log("🔄 前端开始刷新表数据:", currentTable.value);
      dataLoading.value = true;
      try {
        await nextTick();
        console.log("📡 发送刷新数据请求到后端...");
        const dataResponse = await axios.get(
          `http://localhost:3000/api/getData/${currentTable.value}`
        );
        tableData.value = dataResponse.data;
        console.log("获取到的表数据:", tableData.value);
        await nextTick();
      } catch (error) {
        console.error("刷新数据失败:", error);
        ElMessage.error("刷新数据失败！");
      } finally {
        dataLoading.value = false;
      }
    };

    // 获取表的主键字段
    const getPrimaryKey = (tableName) => {
      console.log("获取主键，表名:", tableName);
      console.log("表结构:", tableStructure.value);

      if (!tableName || !tableStructure.value) {
        console.log("无法获取主键：表名为空或表结构为空");
        return null;
      }

      // 尝试找到主键列 - SQLite使用pk字段表示主键
      let primaryKeyColumn = tableStructure.value.find((col) => col.pk > 0);

      // 如果没有找到，尝试查找名为 "id" 的列
      if (!primaryKeyColumn) {
        console.log("没有找到标记为主键的列，尝试查找名为 'id' 的列");
        primaryKeyColumn = tableStructure.value.find(
          (col) => col.name.toLowerCase() === "id"
        );
      }

      // 如果还是没有找到，尝试查找包含 "id" 的列
      if (!primaryKeyColumn) {
        console.log("没有找到名为 'id' 的列，尝试查找包含 'id' 的列");
        primaryKeyColumn = tableStructure.value.find((col) =>
          col.name.toLowerCase().includes("id")
        );
      }

      console.log("找到的主键列:", primaryKeyColumn);
      return primaryKeyColumn ? primaryKeyColumn.name : null;
    };

    const showAddDataDialog = () => {
      newData.value = {};
      tableStructure.value.forEach((column) => {
        newData.value[column.name] = "";
      });
      addDataDialogVisible.value = true;
    };

    const insertData = async () => {
      insertLoading.value = true;
      try {
        const dataToInsert = {};
        Object.keys(newData.value).forEach((key) => {
          if (newData.value[key] !== "") {
            dataToInsert[key] = newData.value[key];
          }
        });

        await axios.post(
          `http://localhost:3000/api/insertData/${currentTable.value}`,
          dataToInsert
        );
        ElMessage.success("数据添加成功！");
        addDataDialogVisible.value = false;
        refreshTableData();
      } catch (error) {
        ElMessage.error(
          `添加数据失败: ${error.response?.data?.details || error.message}`
        );
      } finally {
        insertLoading.value = false;
      }
    };

    const editData = (row) => {
      editingData.value = { ...row };
      originalEditingData.value = { ...row }; // 保存原始数据
      editDataDialogVisible.value = true;
    };

    const updateData = async () => {
      updateLoading.value = true;
      try {
        // 获取主键字段
        const primaryKey = getPrimaryKey(currentTable.value);
        if (!primaryKey) {
          ElMessage.error("无法确定表的主键，更新操作失败");
          updateLoading.value = false;
          return;
        }

        // 检查主键字段是否被修改
        const originalPrimaryKeyValue = originalEditingData.value[primaryKey];
        const newPrimaryKeyValue = editingData.value[primaryKey];

        if (originalPrimaryKeyValue !== newPrimaryKeyValue) {
          // 主键值被修改，需要二次确认
          const firstConfirm = await ElMessageBox.confirm(
            `警告：您正在修改主键字段 "${primaryKey}" 的值！\n\n` +
              `原值: ${originalPrimaryKeyValue}\n` +
              `新值: ${newPrimaryKeyValue}\n\n` +
              `修改主键可能导致以下问题：\n` +
              `1. 破坏与其他表的关联关系\n` +
              `2. 数据完整性受损\n` +
              `3. 应用程序出错\n\n` +
              `请确认是否继续此操作？`,
            "主键修改警告",
            {
              confirmButtonText: "确定修改",
              cancelButtonText: "取消",
              type: "warning",
            }
          ).catch(() => false);

          if (!firstConfirm) {
            ElMessage.info("已取消主键修改操作");
            updateLoading.value = false;
            return;
          }

          // 二次确认
          const secondConfirm = await ElMessageBox.confirm(
            `这是最后一次确认！\n\n` +
              `您确定要将主键 "${primaryKey}" 从 "${originalPrimaryKeyValue}" 修改为 "${newPrimaryKeyValue}" 吗？\n\n` +
              `此操作一旦执行将无法撤销！`,
            "二次确认 - 主键修改",
            {
              confirmButtonText: "确认修改",
              cancelButtonText: "取消",
              type: "error",
            }
          ).catch(() => false);

          if (!secondConfirm) {
            ElMessage.info("已取消主键修改操作");
            updateLoading.value = false;
            return;
          }
        }

        // 验证每个字段的值
        for (const [fieldName, value] of Object.entries(editingData.value)) {
          // 跳过主键字段的值验证
          if (fieldName === primaryKey) {
            continue;
          }

          // 对每个字段进行值域验证
          const fieldValidation = validateFieldValue(fieldName, value);
          if (!fieldValidation.valid) {
            ElMessageBox.alert(
              `字段 "${fieldName}" 的值不符合要求。\n${
                fieldValidation.message
              }\n允许的值: ${fieldValidation.allowedValues.join(", ")}`,
              "字段值验证失败",
              {
                confirmButtonText: "确定",
                type: "error",
              }
            );
            updateLoading.value = false;
            return;
          }
        }

        // 使用原始主键值作为更新条件
        await axios.put(
          `http://localhost:3000/api/updateData/${currentTable.value}/${originalPrimaryKeyValue}`,
          editingData.value
        );
        ElMessage.success("数据更新成功！");
        editDataDialogVisible.value = false;
        refreshTableData();
      } catch (error) {
        ElMessage.error(
          `更新数据失败: ${error.response?.data?.details || error.message}`
        );
      } finally {
        updateLoading.value = false;
      }
    };

    const deleteData = async (row) => {
      try {
        await ElMessageBox.confirm("确定要删除这条数据吗？", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });

        // 获取主键字段
        const primaryKey = getPrimaryKey(currentTable.value);
        if (!primaryKey) {
          ElMessage.error("无法确定表的主键，删除操作失败");
          return;
        }

        // 使用主键值作为删除条件
        const response = await axios.delete(
          `http://localhost:3000/api/deleteData/${currentTable.value}/${row[primaryKey]}`
        );

        // 显示详细的操作结果
        let message = response.data.message || "数据删除成功！";

        // 如果有级联操作或设置NULL的操作，使用MessageBox显示详细信息
        if (
          (response.data.cascadeMessages &&
            response.data.cascadeMessages.length > 0) ||
          (response.data.setNullMessages &&
            response.data.setNullMessages.length > 0)
        ) {
          await ElMessageBox.alert(message, "删除成功", {
            confirmButtonText: "确定",
            type: "success",
          });
        } else {
          ElMessage.success(message);
        }

        refreshTableData();
      } catch (error) {
        if (error !== "cancel") {
          // 显示详细的错误信息
          const errorMessage =
            error.response?.data?.details ||
            error.response?.data?.error ||
            "删除数据失败！";
          await ElMessageBox.alert(errorMessage, "删除失败", {
            confirmButtonText: "确定",
            type: "error",
            dangerouslyUseHTMLString: false,
          });
        }
      }
    };

    const deleteTable = async (tableName) => {
      try {
        await ElMessageBox.confirm(
          `确定要删除表 "${tableName}" 吗？此操作不可恢复！`,
          "警告",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        );

        await axios.delete(
          `http://localhost:3000/api/deleteTable/${tableName}`
        );
        ElMessage.success("表删除成功！");
        fetchTables();
        if (currentTable.value === tableName) {
          currentTable.value = "";
          tableData.value = [];
        }
      } catch (error) {
        if (error !== "cancel") {
          ElMessage.error("删除表失败！");
        }
      }
    };

    // 关系管理方法
    const loadTableColumns = async (type) => {
      const tableName =
        type === "primary"
          ? newRelation.value.primaryTable
          : newRelation.value.foreignTable;
      if (!tableName) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/api/tableStructure/${tableName}`
        );
        const columns = response.data.map((col) => ({
          name: col.name,
          type: col.type,
        }));

        if (type === "primary") {
          primaryTableColumns.value = columns;
        } else {
          foreignTableColumns.value = columns;
        }
      } catch (error) {
        ElMessage.error("获取表结构失败！");
      }
    };

    const addRelation = () => {
      if (
        !newRelation.value.primaryTable ||
        !newRelation.value.primaryColumn ||
        !newRelation.value.foreignTable ||
        !newRelation.value.foreignColumn
      ) {
        ElMessage.error("请填写完整的关系信息！");
        return;
      }

      // 检查是否已存在相同的关系
      const isDuplicate = relations.value.some(
        (r) =>
          r.primaryTable === newRelation.value.primaryTable &&
          r.primaryColumn === newRelation.value.primaryColumn &&
          r.foreignTable === newRelation.value.foreignTable &&
          r.foreignColumn === newRelation.value.foreignColumn
      );

      if (isDuplicate) {
        ElMessage.error("该关系已存在！");
        return;
      }

      // 如果是一对多关系，检查主表字段是否是主键
      if (newRelation.value.relationType === "one-to-many") {
        const primaryTable = tables.value.find(
          (t) => t.name === newRelation.value.primaryTable
        );
        if (primaryTable) {
          const isPrimaryKey = primaryTableColumns.value.some(
            (col) =>
              col.name === newRelation.value.primaryColumn && col.primaryKey
          );

          if (!isPrimaryKey) {
            ElMessage.warning(
              "一对多关系通常需要主表字段是主键，请确认是否继续"
            );
          }
        }
      }

      // 如果是多对多关系，提示需要创建中间表
      if (newRelation.value.relationType === "many-to-many") {
        ElMessage.info(
          "多对多关系通常需要创建中间表来实现，请确保已创建相应的中间表"
        );
      }

      // 将关系保存到后端数据库
      saveRelationToBackend();
    };

    // 保存关系到后端数据库
    const saveRelationToBackend = async () => {
      try {
        // 转换前端格式到后端格式
        await axios.post("http://localhost:3000/api/table-relations", {
          leftTable: newRelation.value.primaryTable,
          rightTable: newRelation.value.foreignTable,
          leftColumn: newRelation.value.primaryColumn,
          rightColumn: newRelation.value.foreignColumn,
          joinType: "INNER JOIN", // 默认使用内连接
          relationName: newRelation.value.relationName || "",
          onUpdateAction: newRelation.value.onUpdateAction || "no-action",
          onDeleteAction: newRelation.value.onDeleteAction || "no-action",
        });

        // 添加到本地关系列表
        relations.value.push({ ...newRelation.value });
        ElMessage.success("关系添加成功！");

        // 重置表单
        newRelation.value = {
          primaryTable: "",
          primaryColumn: "",
          foreignTable: "",
          foreignColumn: "",
          relationType: "one-to-many",
          onUpdateAction: "no-action",
          onDeleteAction: "no-action",
          relationName: "",
        };
        primaryTableColumns.value = [];
        foreignTableColumns.value = [];
      } catch (error) {
        ElMessage.error(
          `保存关系失败: ${error.response?.data?.details || error.message}`
        );
      }
    };

    const removeRelation = (index) => {
      ElMessageBox.confirm("确定要删除这个关系吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            // 获取要删除的关系
            const relationToDelete = relations.value[index];

            // 从后端数据库中删除关系
            await axios.delete("http://localhost:3000/api/table-relations", {
              data: {
                leftTable: relationToDelete.primaryTable,
                rightTable: relationToDelete.foreignTable,
              },
            });

            // 从本地关系列表中删除
            relations.value.splice(index, 1);
            ElMessage.success("关系删除成功！");
          } catch (error) {
            ElMessage.error(
              `删除关系失败: ${error.response?.data?.details || error.message}`
            );
          }
        })
        .catch(() => {});
    };

    const editRelation = (index) => {
      const relation = relations.value[index];
      newRelation.value = { ...relation };

      // 加载主表和从表的字段
      if (relation.primaryTable) {
        loadTableColumns("primary");
      }
      if (relation.foreignTable) {
        loadTableColumns("foreign");
      }

      // 删除旧关系
      relations.value.splice(index, 1);

      ElMessage.info("请在上方表单中编辑关系信息");
    };

    // 跨表更新相关
    const updateConditions = ref([
      {
        table: "",
        field: "",
        operator: "=",
        value: "",
      },
    ]);

    const updateFieldForm = ref({
      table: "",
      field: "",
      value: "",
      operator: "",
    });

    // 跨表更新安全设置
    const updateSettings = ref({
      strictMode: false, // 默认关闭，允许未定义关系的跨表更新
    });

    const updateResult = ref(null);
    const previewResult = ref(null);
    const previewDialogVisible = ref(false);
    const activeSqlTab = ref("preview");
    const modificationDetails = ref(null);
    const modificationDialogVisible = ref(false);
    const comparisonData = ref([]);
    const loadingComparison = ref(false);
    const detailedComparisonData = ref([]);

    // 更新历史相关
    const updateHistory = ref([]);
    const historyLoading = ref(false);
    const historyFilter = ref({
      startDate: null,
      endDate: null,
    });

    // 统计分析相关
    const statisticsForm = ref({
      tableName: "",
      fieldName: "",
    });

    const statisticsData = ref(null);
    const statisticsLoading = ref(false);
    const statisticsTableFields = ref([]);
    const pieChartRef = ref(null);
    let pieChartInstance = null;

    // 跨表更新方法
    const addUpdateCondition = () => {
      updateConditions.value.push({
        table: "",
        field: "",
        operator: "=",
        value: "",
      });
    };

    const removeUpdateCondition = (index) => {
      if (updateConditions.value.length > 1) {
        updateConditions.value.splice(index, 1);
      }
    };

    const resetCrossTableUpdate = () => {
      // 重置更新条件
      updateConditions.value = [
        {
          table: "",
          field: "",
          operator: "=",
          value: "",
        },
      ];

      // 重置更新字段表单
      updateFieldForm.value = {
        table: "",
        field: "",
        value: "",
        operator: "",
      };

      // 清空更新结果
      updateResult.value = null;
      previewResult.value = null;

      ElMessage.success("表单已重置");
    };

    const executeCrossTableUpdate = async () => {
      // 验证操作者
      if (
        !updateFieldForm.value.operator ||
        updateFieldForm.value.operator.trim() === ""
      ) {
        ElMessage.error("请填写操作者姓名");
        return;
      }

      // 验证条件
      if (
        updateConditions.value.some((c) => !c.table || !c.field || !c.value)
      ) {
        ElMessage.warning("请填写完整的更新条件（表、字段和值）");
        return;
      }

      // 验证更新字段
      if (
        !updateFieldForm.value.table ||
        !updateFieldForm.value.field ||
        updateFieldForm.value.value === ""
      ) {
        ElMessage.warning("请指定要更新的表、字段和新值");
        return;
      }

      // 解析更新字段
      const [tableName, fieldName] = updateFieldForm.value.field.split(".");
      if (!tableName || !fieldName) {
        ElMessage.error("字段格式不正确，应为 表名.字段名");
        return;
      }

      // 验证字段是否存在
      const columns = await fetchTableColumns(tableName);
      const targetColumn = columns.find((col) => col.name === fieldName);
      if (!targetColumn) {
        ElMessage.error(`表 ${tableName} 中不存在字段 ${fieldName}`);
        return;
      }

      // 检查是否尝试更新主键
      // SQLite使用pk字段表示主键，pk > 0表示是主键
      // 同时也检查 pk 字段是否存在
      const isPrimaryKey = targetColumn.pk && targetColumn.pk > 0;

      if (isPrimaryKey) {
        // 第一次确认：主键修改警告
        const firstConfirm = await ElMessageBox.confirm(
          `警告：您正在尝试更新主键字段 ${tableName}.${fieldName}！\n\n` +
            `修改主键可能导致以下问题：\n` +
            `1. 破坏与其他表的关联关系\n` +
            `2. 数据完整性受损\n` +
            `3. 导致外键约束失败\n` +
            `4. 应用程序可能出错\n\n` +
            `请确认是否继续此操作？`,
          "主键修改警告",
          {
            confirmButtonText: "确定修改",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).catch(() => false);

        if (!firstConfirm) {
          ElMessage.info("已取消主键修改操作");
          return;
        }

        // 第二次确认：强调风险
        const secondConfirm = await ElMessageBox.confirm(
          `这是最后一次确认！\n\n` +
            `您确定要更新主键字段 ${tableName}.${fieldName} 为 "${updateFieldForm.value.value}" 吗？\n\n` +
            `此操作一旦执行将无法撤销，可能会导致：\n` +
            `• 与其他表的数据关联被破坏\n` +
            `• 引用此主键的外键关系失效\n` +
            `• 严重影响数据完整性\n\n` +
            `请谨慎操作！`,
          "二次确认 - 主键修改",
          {
            confirmButtonText: "确认修改",
            cancelButtonText: "取消",
            type: "error",
          }
        ).catch(() => false);

        if (!secondConfirm) {
          ElMessage.info("已取消主键修改操作");
          return;
        }

        // 用户两次确认后，继续执行更新流程
      }

      // 验证字段类型是否匹配（简单验证）
      if (
        targetColumn.type === "INTEGER" &&
        !/^\d+$/.test(updateFieldForm.value.value)
      ) {
        ElMessage.warning(`字段 ${fieldName} 是整数类型，但输入的值不是整数`);
        return;
      }

      // 添加字段值域验证
      const fieldValidation = validateFieldValue(
        fieldName,
        updateFieldForm.value.value
      );
      if (!fieldValidation.valid) {
        ElMessageBox.alert(
          `${
            fieldValidation.message
          }\n允许的值: ${fieldValidation.allowedValues.join(", ")}`,
          "字段值验证失败",
          {
            confirmButtonText: "确定",
            type: "error",
          }
        );
        return;
      }

      // 检查是否涉及多个表
      const tablesInConditions = new Set();
      updateConditions.value.forEach((condition) => {
        const parts = condition.field.split(".");
        if (parts.length > 1) {
          tablesInConditions.add(parts[0]);
        }
      });

      // 添加更新字段所在的表
      tablesInConditions.add(tableName);

      // 如果涉及多个表，检查是否定义了关联关系
      if (tablesInConditions.size > 1) {
        // 检查这些表之间是否有定义的关系
        let hasDefinedRelations = false;
        const tableArray = Array.from(tablesInConditions);

        for (let i = 0; i < tableArray.length; i++) {
          for (let j = i + 1; j < tableArray.length; j++) {
            const table1 = tableArray[i];
            const table2 = tableArray[j];

            // 检查是否有定义的关系
            const hasRelation = relations.value.some(
              (relation) =>
                (relation.primaryTable === table1 &&
                  relation.foreignTable === table2) ||
                (relation.primaryTable === table2 &&
                  relation.foreignTable === table1)
            );

            if (hasRelation) {
              hasDefinedRelations = true;
              break;
            }
          }
          if (hasDefinedRelations) break;
        }

        // 如果没有定义的关系，根据设置决定是否允许操作
        if (!hasDefinedRelations) {
          // 如果开启了严格模式，直接禁止操作
          if (updateSettings.value.strictMode) {
            ElMessageBox.alert(
              `❌ 跨表更新被禁止！\n\n涉及的表（${Array.from(
                tablesInConditions
              ).join(
                "、"
              )}）之间没有明确定义关联关系。\n\n请在"关系管理"标签页中先定义表之间的关联关系，或关闭"禁止未定义关系的跨表更新"设置。`,
              "跨表更新被禁止",
              {
                confirmButtonText: "我知道了",
                type: "error",
              }
            );
            return;
          }

          // 如果没有开启严格模式，给出警告提示
          const confirmResult = await ElMessageBox.confirm(
            "您正在进行跨表更新操作，但涉及的表之间没有明确定义关系。系统将尝试自动推断关联关系，但这可能导致更新了错误的记录。建议您先在关系管理中定义表之间的关系。是否继续？",
            "跨表更新警告",
            {
              confirmButtonText: "继续执行",
              cancelButtonText: "取消",
              type: "warning",
            }
          ).catch(() => false);

          if (!confirmResult) {
            return;
          }
        }
      }

      // 执行更新
      performUpdate();
    };

    const performUpdate = async () => {
      updateLoading.value = true;
      try {
        const response = await axios.post(
          "http://localhost:3000/api/cross-table-update",
          {
            conditions: updateConditions.value,
            updateField: updateFieldForm.value.field,
            updateValue: updateFieldForm.value.value,
            operator: updateFieldForm.value.operator,
          }
        );

        updateResult.value = response.data;
        ElMessage.success(response.data.message);

        // 刷新历史记录
        await fetchUpdateHistory();
      } catch (error) {
        ElMessage.error(
          `更新失败: ${error.response?.data?.details || error.message}`
        );
      } finally {
        updateLoading.value = false;
      }
    };

    const previewUpdate = async () => {
      // 验证条件
      if (
        updateConditions.value.some((c) => !c.table || !c.field || !c.value)
      ) {
        ElMessage.warning("请填写完整的更新条件（表、字段和值）");
        return;
      }

      // 验证更新字段
      if (!updateFieldForm.value.table || !updateFieldForm.value.field) {
        ElMessage.warning("请指定要更新的表和字段");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/preview-cross-table-update",
          {
            conditions: updateConditions.value,
            updateField: updateFieldForm.value.field,
            updateValue: updateFieldForm.value.value,
          }
        );

        previewResult.value = response.data;
        previewDialogVisible.value = true;
        ElMessage.success(
          `预览完成，将影响 ${response.data.affectedCount} 条记录`
        );
      } catch (error) {
        ElMessage.error(
          `预览失败: ${error.response?.data?.details || error.message}`
        );
      }
    };

    // 调试函数，用于检查时间转换
    const debugTimeConversion = (timestamp) => {
      console.log("原始时间戳:", timestamp);
      console.log("原始时间戳类型:", typeof timestamp);

      let date;
      if (typeof timestamp === "string") {
        if (
          timestamp.includes("-") &&
          timestamp.includes(":") &&
          !timestamp.includes("T")
        ) {
          console.log("识别为SQLite格式时间");
          const utcDate = new Date(timestamp + "Z");
          console.log("UTC时间:", utcDate.toISOString());
          date = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);
          console.log("北京时间:", date);
        } else if (timestamp.includes("T")) {
          console.log("识别为ISO格式时间");
          if (timestamp.includes("Z")) {
            console.log("检测到Z后缀，确认为UTC时间");
          } else {
            console.log("未检测到Z后缀，按UTC时间处理");
          }
          const utcDate = timestamp.includes("Z")
            ? new Date(timestamp)
            : new Date(timestamp + "Z");
          console.log("UTC时间:", utcDate.toISOString());
          date = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);
          console.log("北京时间:", date);
        } else {
          console.log("识别为其他格式时间");
          date = new Date(timestamp);
          console.log("直接转换:", date);
        }
      } else {
        console.log("识别为Date对象");
        date = new Date(timestamp.getTime() + 8 * 60 * 60 * 1000);
        console.log("UTC时间:", timestamp);
        console.log("北京时间:", date);
      }

      // const result = formatDateTime(timestamp);
      // console.log("格式化结果:", result);
      // return result;
      return timestamp; // 直接返回原始时间戳
    };

    // 格式化日期时间
    const formatDateTime = (timestamp) => {
      if (!timestamp) return "";

      // 如果已经是格式化的时间字符串，直接返回
      if (
        typeof timestamp === "string" &&
        timestamp.includes("-") &&
        timestamp.includes(":")
      ) {
        return timestamp;
      }

      // 其他情况，尝试转换为Date对象并格式化
      let date;
      if (typeof timestamp === "string") {
        date = new Date(timestamp);
      } else {
        date = timestamp;
      }

      // 检查是否是有效的日期
      if (isNaN(date.getTime())) return "无效日期";

      // 格式化为 YYYY-MM-DD HH:mm:ss
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // 更新历史方法
    const fetchUpdateHistory = async () => {
      historyLoading.value = true;
      try {
        const params = {};

        if (historyFilter.value.startDate) {
          // 转换为SQLite格式的日期字符串 (YYYY-MM-DD HH:MM:SS)，直接使用本地时间
          const startDate = new Date(historyFilter.value.startDate);
          const year = startDate.getFullYear();
          const month = String(startDate.getMonth() + 1).padStart(2, "0");
          const day = String(startDate.getDate()).padStart(2, "0");
          const hours = String(startDate.getHours()).padStart(2, "0");
          const minutes = String(startDate.getMinutes()).padStart(2, "0");
          const seconds = String(startDate.getSeconds()).padStart(2, "0");
          params.startDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

        if (historyFilter.value.endDate) {
          // 转换为SQLite格式的日期字符串 (YYYY-MM-DD HH:MM:SS)，直接使用本地时间
          const endDate = new Date(historyFilter.value.endDate);
          const year = endDate.getFullYear();
          const month = String(endDate.getMonth() + 1).padStart(2, "0");
          const day = String(endDate.getDate()).padStart(2, "0");
          const hours = String(endDate.getHours()).padStart(2, "0");
          const minutes = String(endDate.getMinutes()).padStart(2, "0");
          const seconds = String(endDate.getSeconds()).padStart(2, "0");
          params.endDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

        const response = await axios.get(
          "http://localhost:3000/api/update-history",
          { params }
        );

        console.log("后端返回的原始数据:", response.data);
        if (response.data.length > 0) {
          console.log("第一条记录的时间戳:", response.data[0].timestamp);
          console.log("时间戳类型:", typeof response.data[0].timestamp);
        }

        // 确保数据正确处理
        updateHistory.value = response.data.map((item) => {
          // 确保updateInfo字段存在
          if (!item.updateInfo && item.update_info) {
            item.updateInfo = item.update_info;
          }
          return item;
        });
      } catch (error) {
        ElMessage.error("获取更新历史失败");
      } finally {
        historyLoading.value = false;
      }
    };

    const exportUpdateHistory = async () => {
      try {
        // 这里应该实现导出逻辑，暂时模拟
        ElMessage.info("导出功能开发中...");
      } catch (error) {
        ElMessage.error("导出失败");
      }
    };

    // 查看修改详情
    const viewModificationDetails = (row) => {
      modificationDetails.value = row;
      modificationDialogVisible.value = true;

      // 使用历史记录中存储的完整before_values数据
      const beforeValues = row.beforeValues || [];
      const fieldName = row.updateInfo.field.split(".").pop();

      // 生成详细的对比数据
      detailedComparisonData.value = beforeValues.map((record, index) => {
        // 创建修改后的记录副本
        const afterRecord = { ...record };
        afterRecord[fieldName] = row.updateInfo.value;

        return {
          fieldName: fieldName,
          beforeValue: record[fieldName] || "空值",
          afterValue: row.updateInfo.value,
          beforeRecord: record, // 完整的修改前记录
          afterRecord: afterRecord, // 完整的修改后记录
        };
      });
    };

    // 生成详细的对比数据
    const getDetailedComparisonData = () => {
      return detailedComparisonData.value;
    };

    // 获取更新条件文本
    const getConditionsText = () => {
      if (!modificationDetails.value || !modificationDetails.value.conditions)
        return "";

      return modificationDetails.value.conditions
        .map(
          (condition) =>
            `${condition.field} ${condition.operator} ${condition.value}`
        )
        .join(" AND ");
    };

    // 获取修改详情表格列（动态生成）
    const getModificationTableColumns = () => {
      if (
        !detailedComparisonData.value ||
        detailedComparisonData.value.length === 0
      )
        return [];

      const firstRecord = detailedComparisonData.value[0].beforeRecord;
      const columns = Object.keys(firstRecord).map((key) => ({
        prop: key,
        label: key,
        minWidth: 120,
      }));

      // 添加new_value列
      columns.push({
        prop: "new_value",
        label: "new_value",
        minWidth: 120,
      });

      return columns;
    };

    // 删除历史记录
    const deleteHistoryRecord = async (id) => {
      try {
        await ElMessageBox.confirm(
          "确定要删除这条记录吗？此操作不可撤销。",
          "警告",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        );

        await axios.delete(`http://localhost:3000/api/update-history/${id}`);
        ElMessage.success("删除成功");

        // 刷新历史记录
        await fetchUpdateHistory();
      } catch (error) {
        if (error !== "cancel") {
          ElMessage.error(
            `删除失败: ${error.response?.data?.error || error.message}`
          );
        }
      }
    };

    // 清理图表的统一函数
    const cleanupPieChart = () => {
      if (pieChartInstance) {
        try {
          pieChartInstance.dispose();
        } catch (error) {
          console.warn("清理图表实例时出错:", error);
        }
        pieChartInstance = null;
      }
    };

    // 统计分析方法
    const onStatisticsTableChange = async () => {
      if (!statisticsForm.value.tableName) {
        statisticsTableFields.value = [];
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/tableStructure/${statisticsForm.value.tableName}`
        );
        statisticsTableFields.value = response.data;
        statisticsForm.value.fieldName = ""; // 重置字段选择
      } catch (error) {
        ElMessage.error("获取表字段失败");
      }
    };

    const fetchStatistics = async () => {
      if (!statisticsForm.value.tableName || !statisticsForm.value.fieldName) {
        ElMessage.warning("请选择表格和字段");
        return;
      }

      statisticsLoading.value = true;
      try {
        const response = await axios.get(
          "http://localhost:3000/api/statistics",
          {
            params: {
              tableName: statisticsForm.value.tableName,
              fieldName: statisticsForm.value.fieldName,
            },
          }
        );

        statisticsData.value = response.data;

        // 渲染饼状图
        await renderPieChart();

        ElMessage.success("统计查询成功");
      } catch (error) {
        ElMessage.error(
          `统计查询失败: ${error.response?.data?.details || error.message}`
        );
      } finally {
        statisticsLoading.value = false;
      }
    };

    const renderPieChart = async () => {
      // 等待 DOM 更新完成
      await nextTick();

      if (
        !pieChartRef.value ||
        !statisticsData.value ||
        !statisticsData.value.data
      ) {
        return;
      }

      // 先清理旧的实例（如果存在）
      cleanupPieChart();

      // 添加短暂延迟，确保 DOM 完全渲染
      setTimeout(() => {
        try {
          // 检查容器是否还存在
          if (!pieChartRef.value) {
            return;
          }

          // 初始化图表，禁用自动 resize
          pieChartInstance = echarts.init(pieChartRef.value, null, {
            renderer: "canvas",
            useDirtyRect: false, // 禁用脏矩形优化，避免 ResizeObserver 问题
          });

          // 准备数据
          const chartData = statisticsData.value.data.map((item) => ({
            value: item.count,
            name: item.value || "空值",
          }));

          // 配置选项
          const option = {
            title: {
              text: `${statisticsForm.value.tableName}.${statisticsForm.value.fieldName} 统计`,
              left: "center",
              textStyle: {
                fontSize: 18,
                fontWeight: "bold",
              },
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b}: {c} ({d}%)",
            },
            legend: {
              orient: "vertical",
              left: "left",
              type: "scroll",
            },
            series: [
              {
                name: "统计数量",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: "#fff",
                  borderWidth: 2,
                },
                label: {
                  show: true,
                  formatter: "{b}: {c}\n({d}%)",
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 16,
                    fontWeight: "bold",
                  },
                },
                data: chartData,
              },
            ],
          };

          // 设置配置项并渲染
          pieChartInstance.setOption(option, true); // 使用 notMerge: true 确保完全替换

          // 禁用自动 resize 监听，避免 ResizeObserver 错误
          window.removeEventListener("resize", pieChartInstance.resize);
        } catch (error) {
          console.error("渲染图表失败:", error);
        }
      }, 150);
    };

    const exportStatistics = async () => {
      try {
        // 这里应该实现导出统计结果的逻辑
        ElMessage.info("导出功能开发中...");
      } catch (error) {
        ElMessage.error("导出失败");
      }
    };

    onMounted(() => {
      // 抑制所有 ResizeObserver 相关的错误
      const originalError = window.console.error;
      window.console.error = function (...args) {
        const message = args.join(" ");
        if (
          message.includes("ResizeObserver") ||
          message.includes("ResizeObserver loop") ||
          message.includes("ResizeObserver loop completed")
        ) {
          return; // 完全忽略 ResizeObserver 错误
        }
        originalError.apply(window.console, args);
      };

      // 捕获所有可能的错误
      const originalOnError = window.onerror;
      window.onerror = function (message, source, lineno, colno, error) {
        if (
          typeof message === "string" &&
          (message.includes("ResizeObserver") ||
            message.includes("ResizeObserver loop"))
        ) {
          return true; // 阻止错误
        }
        if (originalOnError) {
          return originalOnError(message, source, lineno, colno, error);
        }
        return false;
      };

      // 捕获 Promise rejection
      window.addEventListener("unhandledrejection", function (event) {
        if (
          event.reason &&
          typeof event.reason === "object" &&
          event.reason.message &&
          event.reason.message.includes("ResizeObserver")
        ) {
          event.preventDefault();
          return;
        }
      });

      fetchTables();
      fetchUpdateHistory(); // 加载更新历史

      // 吸顶效果 - 滚动监听（用于动态样式调整）
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const tabsContainer = document.querySelector(".el-tabs");
            const scrollTop =
              window.pageYOffset || document.documentElement.scrollTop;

            if (tabsContainer) {
              if (scrollTop > 50) {
                // 滚动超过50px时，增强吸顶效果
                tabsContainer.style.boxShadow =
                  "0 4px 16px rgba(0, 0, 0, 0.12)";
              } else {
                // 回到顶部时，恢复原始样式
                tabsContainer.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
              }
            }
            ticking = false;
          });
          ticking = true;
        }
      };

      // 添加滚动监听
      window.addEventListener("scroll", handleScroll, { passive: true });

      // 存储清理函数
      window.tabsScrollHandler = handleScroll;
    });

    // 组件卸载前清理 ECharts 实例
    onBeforeUnmount(() => {
      cleanupPieChart();

      // 清理滚动监听器
      if (window.tabsScrollHandler) {
        window.removeEventListener("scroll", window.tabsScrollHandler);
        delete window.tabsScrollHandler;
      }
    });

    // 组件激活时（从其他路由返回）
    onActivated(() => {
      // 确保图表容器正确渲染
      if (
        statisticsData.value &&
        statisticsData.value.data &&
        pieChartRef.value
      ) {
        nextTick(() => {
          setTimeout(() => {
            renderPieChart();
          }, 200);
        });
      }
    });

    // 组件失活时（切换到其他路由）
    onDeactivated(() => {
      cleanupPieChart();
    });

    return {
      activeTab,
      // 原有的变量...

      // 高级查询相关
      availableTables,
      queryLoading,
      queryConfig,
      queryResult,
      saveTemplateDialogVisible,
      showTemplateManager,
      queryTemplates,
      templateForm,

      // 原有的方法...

      // 高级查询方法
      getTableColumns,
      addCondition,
      removeCondition,
      executeQuery,
      resetAdvancedQuery,
      generateAutoJoins,
      getResultColumns,
      saveAsTemplate,
      saveTemplate,
      loadTemplate,
      deleteTemplate,
      exportResults,
      handleSizeChange,
      handleCurrentChange,
      addJoin,
      removeJoin,
      getTableNameByAlias: (alias) => {
        const table = queryConfig.value.tables.find(
          (t) => (t.alias || t.name) === alias
        );
        return table ? table.name : alias;
      },

      activeTab,
      // 表管理
      newTable,
      tables,
      tableLoading,
      // 数据管理
      currentTable,
      tableData,
      tableStructure,
      currentTableColumns,
      tableKey,
      dataLoading,
      insertLoading,
      updateLoading,
      // 关系管理
      newRelation,
      relations,
      primaryTableColumns,
      foreignTableColumns,
      // 对话框
      renameTableDialogVisible,
      addColumnDialogVisible,
      manageColumnsDialogVisible,
      renameColumnDialogVisible,
      tableDetailsDialogVisible,
      addDataDialogVisible,
      editDataDialogVisible,
      // 表单数据
      renameTableForm,
      newColumn,
      renameColumnForm,
      tableDetails,
      newData,
      editingData,
      originalEditingData,
      // 方法
      fetchTables,
      createTable,
      addNewTableField,
      removeNewTableField,
      resetNewTableForm,
      showRenameTableDialog,
      renameTable,
      showAddColumnDialog,
      addColumn,
      showManageColumnsDialog,
      showRenameColumnDialog,
      renameColumn,
      removeColumn,
      showTableDetails,
      viewTableData,
      refreshTableData,
      getPrimaryKey,
      showAddDataDialog,
      insertData,
      editData,
      updateData,
      deleteData,
      deleteTable,
      loadTableColumns,
      addRelation,
      removeRelation,
      editRelation,
      fetchRelations,

      // 跨表更新相关
      updateConditions,
      updateFieldForm,
      updateSettings,
      updateResult,
      updateLoading,
      addUpdateCondition,
      removeUpdateCondition,
      executeCrossTableUpdate,
      performUpdate,
      previewUpdate,
      resetCrossTableUpdate,
      previewResult,
      previewDialogVisible,
      activeSqlTab,
      modificationDetails,
      modificationDialogVisible,
      viewModificationDetails,
      getDetailedComparisonData,
      getConditionsText,
      getModificationTableColumns,
      loadingComparison,

      // 更新历史相关
      updateHistory,
      historyLoading,
      historyFilter,
      fetchUpdateHistory,
      exportUpdateHistory,
      deleteHistoryRecord,
      formatDateTime,
      debugTimeConversion,

      // 统计分析相关
      statisticsForm,
      statisticsData,
      statisticsLoading,
      statisticsTableFields,
      pieChartRef,
      onStatisticsTableChange,
      fetchStatistics,
      exportStatistics,

      // 字段值域验证相关
      fieldValidationRules,
      validateFieldValue,
    };
  },
};
</script>

<style scoped>
.database-manager {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  overflow: visible;
}

/* 标签页样式美化 - 简洁专业风格，支持吸顶效果 */
:deep(.el-tabs) {
  border-radius: 8px;
  overflow: visible;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  background: #ffffff;
  border: 1px solid #e4e7ed;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.el-tabs__header) {
  margin: 0;
  background: #fafbfc;
  border-bottom: 1px solid #e4e7ed;
  padding: 8px 12px 0 12px;
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(8px);
  background: rgba(250, 251, 252, 0.95);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px 8px 0 0;
}

:deep(.el-tabs__nav-wrap) {
  background: transparent;
}

:deep(.el-tabs__item) {
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  border-radius: 6px 6px 0 0;
  margin-right: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  position: relative;
  cursor: pointer;
}

:deep(.el-tabs__item:hover) {
  color: #303133;
  background-color: #f5f7fa;
  transform: translateY(-1px);
}

:deep(.el-tabs__item.is-active) {
  color: #409eff;
  background: #ffffff;
  font-weight: 600;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
}

:deep(.el-tabs__item.is-active::after) {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background: #409eff;
  border-radius: 3px 3px 0 0;
  box-shadow: 0 2px 4px rgba(64, 158, 255, 0.3);
}

:deep(.el-tabs__content) {
  padding: 20px;
  background: #ffffff;
  overflow: visible;
  min-height: calc(100vh - 40px);
  border-radius: 0 0 8px 8px;
  border: 1px solid #e4e7ed;
  border-top: none;
  margin-top: -1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.el-card {
  max-width: 1400px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  border: 1px solid #e4e7ed;
}

.el-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

:deep(.el-card__header) {
  background: #fafbfc;
  border-bottom: 1px solid #e4e7ed;
  padding: 16px 20px;
  font-weight: 600;
  color: #303133;
}

.tab-content {
  padding: 0;
  overflow: visible;
  min-height: 100%;
}

.action-buttons {
  width: 1400px;
  clear: both !important;
  padding-top: 20px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

/* 按钮样式优化 - 简洁风格 */
:deep(.el-button) {
  border-radius: 4px;
  transition: all 0.2s ease;
  font-weight: 500;
}

:deep(.el-button:hover) {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.el-button.is-loading) {
  box-shadow: none;
}

.query-section {
  margin-bottom: 20px;
  clear: both;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.el-table) {
  width: 100%;
}

/* 查询结果表格样式 */
.table-container {
  width: 100%;
}

.table-container :deep(.el-table) {
  width: 100% !important;
  table-layout: auto;
}

.table-container :deep(.el-table__body-wrapper) {
  overflow-x: auto;
}

.pagination-container {
  margin-top: 20px;
  text-align: center;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
  border-top: 1px solid #ebeef5;
}

.sql-preview {
  margin-top: 15px;
  background-color: #f5f7fa;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 12px;
  max-height: 200px;
  overflow-y: auto;
}

.sql-preview pre {
  margin: 0;
  font-family: "Courier New", Courier, monospace;
  font-size: 13px;
  color: #606266;
  white-space: pre-wrap;
  word-break: break-all;
}

.query-section .subsection-card {
  margin-bottom: 20px;
}

/* 子卡片样式 */
.subsection-card {
  border-radius: 6px;
  transition: all 0.2s ease;
}

.subsection-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

:deep(.subsection-card .el-card__header) {
  background: #fafbfc;
  border-bottom: 1px solid #e4e7ed;
}

.query-section .el-card__header {
  background-color: #f5f7fa;
  border-bottom: 1px solid #ebeef5;
}

.table-container {
  margin-top: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
}

.relation-table {
  margin-top: 15px;
}

.relation-table .el-table th {
  background-color: #f5f7fa;
}

.relation-dialog .el-form-item {
  margin-bottom: 20px;
}

/* 预览对话框样式 */
.preview-dialog {
  .el-dialog__body {
    padding: 20px;
  }
}

.preview-container {
  .stats-row {
    margin-bottom: 20px;
  }

  .stat-card {
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    .stat-content {
      display: flex;
      align-items: center;
      padding: 20px;
    }

    .stat-icon {
      font-size: 32px;
      margin-right: 16px;
    }

    .stat-info {
      .stat-number {
        font-size: 28px;
        font-weight: bold;
        color: #303133;
        line-height: 1;
      }

      .stat-label {
        font-size: 14px;
        color: #909399;
        margin-top: 4px;
      }
    }

    &.total-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;

      .stat-number,
      .stat-label {
        color: white;
      }
    }

    &.success-card {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;

      .stat-number,
      .stat-label {
        color: white;
      }
    }

    &.warning-card {
      background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
      color: white;

      .stat-number,
      .stat-label {
        color: white;
      }
    }
  }

  .update-info-card {
    margin-bottom: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .update-info {
      .info-item {
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        .info-label {
          font-weight: 600;
          color: #606266;
          margin-right: 12px;
          min-width: 80px;
        }
      }
    }
  }

  .preview-data-card {
    margin-bottom: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .table-container {
      .preview-table {
        .new-value-column {
          background-color: #f0f9ff;
        }

        .new-value-cell {
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-weight: bold;

          .el-icon {
            margin-right: 6px;
          }

          .new-value-text {
            font-size: 14px;
          }
        }

        .original-value {
          color: #606266;
        }
      }
    }
  }

  .sql-preview-card {
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .sql-code-block {
      background: #2d3748;
      border-radius: 8px;
      padding: 16px;
      margin: 0;

      pre {
        margin: 0;
        color: #e2e8f0;
        font-family: "Fira Code", "Monaco", "Consolas", monospace;
        font-size: 13px;
        line-height: 1.6;
        overflow-x: auto;

        code {
          color: inherit;
        }
      }
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 0 0 0;
  border-top: 1px solid #ebeef5;
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: #303133;
}

/* 简洁的修改详情样式 */
.simple-info {
  margin-top: 20px;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 6px;

  p {
    margin: 5px 0;
    color: #606266;
  }
}

/* 其他字段标签样式 */
.other-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  .field-tag {
    margin: 2px;
    font-size: 12px;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

/* 修改详情表格样式 - 优化版 */

.comparison-table {
  width: 100%;
  table-layout: fixed;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.comparison-table .new-value-column {
  background-color: #f0f9ff;
  border-left: 3px solid #67c23a;
}

.comparison-table .modified-field-column {
  background-color: #fff7e6;
  border-left: 3px solid #e6a23c;
}

.comparison-table .new-value-cell {
  padding: 12px;
  background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
  border-radius: 6px;
  margin: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.comparison-table .value-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  width: 100%;
}

.comparison-table .change-icon {
  color: white;
  font-size: 16px;
}

.comparison-table .new-value-text {
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.comparison-table .change-tag {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.comparison-table .field-cell {
  padding: 8px 12px;
  position: relative;
  transition: all 0.3s ease;
}

.comparison-table .field-cell.modified-field {
  background: linear-gradient(135deg, #fff7e6 0%, #fdf6ec 100%);
  border-radius: 4px;
  border-left: 3px solid #e6a23c;
  margin: 2px;
}

.comparison-table .field-value {
  color: #606266;
  font-size: 14px;
  display: block;
  margin-bottom: 4px;
}

.comparison-table .field-tag {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 10px;
  padding: 2px 6px;
}

/* 修复ResizeObserver错误 */
.no-data-message {
  text-align: center;
  padding: 40px 0;
}

.simple-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
  border: 1px solid #ebeef5;
}

.simple-info p {
  margin: 8px 0;
  color: #606266;
}

/* 基本表格样式优化 */
:deep(.el-table) {
  table-layout: fixed;
}

/* 预览对话框样式 - 修复ResizeObserver错误 */
.preview-dialog .comparison-table {
  width: 100%;
  table-layout: fixed;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.preview-dialog .comparison-table .new-value-column {
  background-color: #f0f9ff;
  border-left: 3px solid #67c23a;
}

.preview-dialog .comparison-table .new-value-cell {
  padding: 12px;
  background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
  border-radius: 6px;
  margin: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
}

.preview-dialog .comparison-table .value-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  width: 100%;
}

.preview-dialog .comparison-table .change-icon {
  color: white;
  font-size: 16px;
  flex-shrink: 0;
}

.preview-dialog .comparison-table .new-value-text {
  color: white;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
}

.preview-dialog .comparison-table .change-tag {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.preview-dialog .comparison-table .field-cell {
  padding: 8px 12px;
  position: relative;
  min-height: 40px;
  display: flex;
  align-items: center;
}

.preview-dialog .comparison-table .field-value {
  color: #606266;
  font-size: 14px;
  display: block;
  width: 100%;
}

.preview-dialog .comparison-table .modified-field-column {
  background-color: #fff7e6;
  border-left: 3px solid #e6a23c;
}

.preview-dialog .comparison-table .field-cell.modified-field {
  background: linear-gradient(135deg, #fff7e6 0%, #fdf6ec 100%);
  border-radius: 4px;
  border-left: 3px solid #e6a23c;
  margin: 2px;
}

.preview-dialog .comparison-table .field-tag {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 10px;
  padding: 2px 6px;
}

/* 字段定义表格样式优化 */
.database-manager .el-table {
  table-layout: fixed;
}

.database-manager .el-table th,
.database-manager .el-table td {
  padding: 8px;
  text-align: center;
}

.database-manager .el-table .el-input {
  width: 100%;
}

.database-manager .el-table .el-select {
  width: 100%;
}

/* 跨表更新样式优化 */
.update-section .condition-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.update-section .action-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.update-section .el-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.update-section .el-form-item {
  width: 100%;
  display: flex;
  justify-content: center;
}

.update-section .el-form-item__content {
  display: flex;
  justify-content: center;
}

.database-manager .el-form-item.init {
  /* padding-left: 220px !important; */
  padding-right: 450px !important;
}

/* 图表容器样式 */
.chart-container {
  margin: 20px 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  min-height: 500px;
}

.chart-container > div {
  min-height: 500px;
}

/* 修复 ResizeObserver 错误 */
.database-manager {
  position: relative;
}

.database-manager * {
  box-sizing: border-box;
}

/* 确保整个页面布局正常 */
html,
body {
  overflow-x: hidden;
  scroll-behavior: smooth;
}

/* 确保卡片内容不被裁剪 */
.section-card,
.subsection-card {
  overflow: visible !important;
}

/* 吸顶效果优化 */
:deep(.el-tabs__nav-scroll) {
  overflow: visible !important;
}

:deep(.el-tabs__nav) {
  overflow: visible !important;
}

/* 确保sticky定位正常工作 */
:deep(.el-tabs__header) {
  position: sticky !important;
  top: 0 !important;
  z-index: 1000 !important;
}

/* 调试样式 - 可以在开发者工具中查看效果 */
.tabs-sticky-debug {
  position: sticky;
  top: 0;
  background: yellow;
  padding: 10px;
  z-index: 9999;
}

/* 表格容器滚动优化 */
.el-table {
  overflow: visible !important;
}

.el-table__body-wrapper {
  overflow-x: auto;
  overflow-y: auto;
}
</style>
