# 前端工具链

* jenkins
* git
* webpack
* travis
* babel
* eslint
* gulp
* create-react-app
* umi
* gitlab
* vscode
* mocha
* http-server
* ...

## 工具链主要类型

* 初始化
* 开发调试
* 测试
* 发布

## yeoman

* generator-generator 用于构建generator的工具，例如vue-cli理论上可以通过yeoman来构建出来
* 需要熟悉yeoman的class的特殊处理形式和相关api操作
* template相关处理

## 自建初始化工具

### 参考链接

* https://stackoverflow.com/questions/10585683/how-do-you-edit-existing-text-and-move-the-cursor-around-in-the-terminal/10830168
* https://github.com/heapwolf/cdir/blob/223fe0039fade4fad2bb08c2f7affac3bdcf2f89/cdir.js#L24

### 命令行操作

* 主要是通过移动光标来处理用户输入内容
* 需要熟悉相关api操作例如: stdin、stdout 等
