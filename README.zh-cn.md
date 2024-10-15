<div align="center">
    <img alt="logo" width="180" src="src/assets/logo.svg"/>
</div>

<div align="center">
  <h1>GPA Calculator</h1>
</div>

<p align="center">
  一个纯前端的 GPA 计算器，允许用户上传成绩单，计算 GPA，并进行各种模拟计算。
</p>

<div align="center">

![Vue Version](https://img.shields.io/badge/vue-v3.4.15-blue)
![Arco Version](https://img.shields.io/badge/arco-v2.55.1-blue)
![Tailwind Version](https://img.shields.io/badge/tailwind-v3.4.3-blue)
![ExcelJs Version](https://img.shields.io/badge/exceljs-v4.4.0-blue)
![License](https://img.shields.io/github/license/jackieyyang/gpa-calculator)

</div>

<div align="center">

[English](./README.md) | 中文

</div>



---

## 主要特性

- 上传成绩单并自动计算 GPA
- 查看全科成绩
  - 算数平均分
  - 加权平均分
- 选择计算方式
  - 最好成绩
  - 全过程成绩
- 新增或删除课程以模拟不同情况
- 提供i18n支持, 支持中文和英文
- 所有数据在前端处理，保证数据安全性

## 快速开始

1. 下载项目到本地
   ```
   git clone https://github.com/jackieyyang/gpa-calculator.git
   cd gpa-calculator
   ```

2. 安装依赖
   ```
   npm install
   ```

3. 运行项目
   ```
   npm run dev
   ```

4. 上传成绩单
    - 通过教务系统导出成绩单
    - 选择上传成绩单
    - 点击"确认上传"完成上传
    - 点击文件右侧小垃圾桶清除记录（已上传文件不会被删除）


5. 使用功能
    - 查看全科算数和加权成绩
      - 最高成绩
      - 全过程成绩
    - 模拟不同成绩情况
      - 新增课程
      - 删除课程
    - 恢复原始表单
    - 下载成绩单模板

## 注意事项

- 所有数据处理均在前端进行，无需担心数据安全性问题
- 确保您的浏览器已更新到最新版本，以获得最佳体验
- 如遇到任何问题，请刷新页面或重新上传成绩单

## 贡献

如有任何问题或建议，欢迎提交 issue。如果您有兴趣为这个项目做出贡献，请提交 pull request。

## 许可证

这个项目是基于 [MIT License](LICENSE) 的。