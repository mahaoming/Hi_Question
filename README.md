# 小桃答题 | 新拟物 答题小程序

## 📑 介绍

- 新拟物风格
- 主要面向答题,考研,测试,排行
- 无须服务器, 无须域名

### 微信小程序

> 目前仅适配开放微信小程序, 后续适配其他平台小程序

### 扫描下面二维码可体验 👇

![小程序图片](http://cdn.sunway.xyz/uPic/gh_854c604dd8f8_258.jpg)

## 💡 软件架构

- 后端: 知晓云(https://cloud.minapp.com/)
- 前端: uni-app(https://uniapp.dcloud.io/)

## 🕹 应用截图

| 功能                         | 对应界面                                               |
| ---------------------------- | ------------------------------------------------------ |
| 首页                         | ![首页](http://cdn.sunway.xyz/uPic/image5.png)         |
| 选择目标 (真机流畅,gif 卡顿) | ![选择目标](http://cdn.sunway.xyz/uPic/target.gif)     |
| 答题页面                     | ![答题页面](http://cdn.sunway.xyz/uPic/image2.png)     |
| 答题流程                     | ![答题流程](http://cdn.sunway.xyz/uPic/answer.gif)     |
| 选择课程分类                 | ![选择课程分类](http://cdn.sunway.xyz/uPic/image1.png) |
| 排行榜                       | ![排行榜](http://cdn.sunway.xyz/uPic/image3.png)       |
| 收藏列表为空                 | ![收藏列表为空](http://cdn.sunway.xyz/uPic/image4.png) |

## 🚀 安装教程

### 应用注册

1. 先注册[微信小程序](https://mp.weixin.qq.com/), 将项目中 src/manifest.json 的 appid 更改自己的 appid(在[微信后台](https://mp.weixin.qq.com/)开发/开发设置中)
2. 在[知晓云](https://cloud.minapp.com/dashboard)注册账号后, 按指引流程接入后获取 key, 替换项目 App.vue 中 wx.BaaS.init("xxxxxxxxxxxxx")[位置](http://cdn.sunway.xyz/uPic/image8.png)!;
   > 为什么没有用云开发, 单纯是因为知晓云的后台操作起来方便些, 当然个人觉得目前云开发功能在微信小程序上是比知晓云强大
3. [导入](https://i1.100024.xyz/i/2020/06/24/fhdtwz.jpg) data/structure 内的 json 文件 生成[数据结构](http://cdn.sunway.xyz/uPic/image7.png)(点击可以看操作图片哦!)
4. (可选) 可导入 data/mock 内的 json 文件作为初始数据[导入 mock 数据](http://cdn.sunway.xyz/uPic/WX20200628-224504@2x.png)

### 安装环境

#### 第一步: node 安装

> 用于编译 javascript 代码
> [node 安装地址](https://nodejs.org/zh-cn/download/)
>
> > - windows 选择 msi
> > - mac 选择 pkg
> >   > 一键安装环境啥的最适合我了

#### 第二步: 执行编译命令

> 在项目目录下执行
>
> > `npm install -g @vue/cli`  
> > `npm install`  
> > `npm run dev:mp-weixin`

## 🧰 懒人模式

> 这个就是让小桃帮你部署, 给她买条裙子 👗 的费用部署(199), 当然如果后面有新版本更新的话也有优先推送, 有少量需求也可以满足下. 下面是小桃的微信 👇

![名片](http://cdn.sunway.xyz/uPic/image6.png)

## ❤️ 最后

> 如果这个项目对你学习, 工作或是其他需求有帮助的, 点个赞呗 💃💃💃
