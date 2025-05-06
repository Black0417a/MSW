# 个人介绍网站

一个优雅美观的个人介绍网站，包含个人信息、技能展示、项目经历、兴趣爱好等。

## 功能特点

- 响应式设计，适配各种设备
- 深色/浅色模式切换
- 技能展示与项目经历
- 兴趣爱好与生活照片展示（Masonry 布局）
- GitHub 贡献热图展示（通过 GitHub API 实时获取）
- 粒子背景动画效果

## GitHub 贡献数据

网站会通过 GitHub REST API 直接获取过去一年的贡献数据，并展示为贡献热图。

- 优点：无需服务器端脚本
- 注意：受 GitHub API 请求限制，可能会遇到请求限制问题

若要更改 GitHub 用户名，请编辑 `js/github-contributions.js` 文件中的 `username` 变量。

## 开发指南

1. 添加照片：将照片放入 `static/hobby/` 目录
2. 修改照片数据：编辑 `js/hobbies.js` 文件中的 `photos` 数组
3. 个性化内容：修改 `index.html` 中的个人信息
