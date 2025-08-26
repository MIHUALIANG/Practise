const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors()); // 允许跨域
app.use(bodyParser.json());

// 接收数据并保存到 JSON
app.post('/save', (req, res) => {
  const data = req.body;
  fs.readFile('data.json', 'utf8', (err, fileData) => {
    let json = [];
    if (!err && fileData) json = JSON.parse(fileData);
    json.push(data);
    fs.writeFile('data.json', JSON.stringify(json, null, 2), (err) => {
      if (err) return res.status(500).send('保存失败');
      res.send('保存成功');
    });
  });
});

// 获取 JSON 文件数据
app.get('/list', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, fileData) => {
    if (err) return res.status(500).send('读取失败');
    let json = [];
    if (fileData) json = JSON.parse(fileData);
    res.json(json);
  });
});

// 清空 JSON 文件
app.post('/clear', (req, res) => {
  fs.writeFile('data.json', '[]', (err) => {
    if (err) return res.status(500).send('清空失败');
    res.send('已清空数据');
  });
});

app.listen(3000, () => {
  console.log('后端运行在 http://localhost:3000');
});
