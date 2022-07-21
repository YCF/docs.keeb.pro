# 使用要求

## 基本原理介绍
[keeb.pro](https://keeb.pro) 配置程序在与键盘通信时，与我们常见的`VIA`使用的其实都是`rawhid`通信方式，没有本质上的区别，也没必要重复造轮子，所以在配置基础功能时，通信协议与VIA是兼容的。

同时随着Chrome 89 Beta在2021年1月发布，使得 [WebHID API](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API) 正式得到了实际的支持，使得抛弃软件配置键位成为了可能。

最终在用爱发电的前提下，站长在2022年1月返工隔离期间就编写出了这个在线配置工具。

## 浏览器支持情况

因为`WebHID API` 出现的时间不长，浏览器支持难免会跟不上，但幸运的时，在本文字首次撰写时（2022年7月），装机率最高的`Chrome`、`Microsoft EDGE`和`Opera`的桌面版最新版本均已支持，而且均已覆盖三大桌面操作系统。经过站长本人测试的操作系统有 `macOS X Big Sur`、`Windows 10`和`Ubuntu 21.10`。具体支持情况，可以通过 [Can I use ...](https://caniuse.com/?search=WebHID%20API) 查询最新支持情况。

## 推荐浏览器下载

- `Microsoft EDGE` 就是现在 Windows 最新的浏览器（IE 终于说拜拜），官方下载地址：[Microsoft EDGE](https://www.microsoft.com/zh-cn/edge?r=1) 。
- `Google Chrome` 熟悉的老朋友，官方下载地址：[Google Chrome](https://www.google.cn/chrome/) 。
- `Opera` 欧朋浏览器（未进行实际测试，可能会有其他兼容问题），上一时代的王者，官方下载地址：[Opera](https://www.opera.com/zh-cn) 。

-EOF-

最近更新：{docsify-updated}