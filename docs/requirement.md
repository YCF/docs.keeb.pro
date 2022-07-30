# 使用要求

## 基本原理介绍
常见的键盘配置工具`VIA`与键盘通信时使用的是 `raw hid` 方式，出了需要安装 VIA 软件以外，无需再安装驱动，使用起来还算便利。

随着 Chrome 89 Beta 在2021年1月发布，新加入了 [WebHID API](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API) 特性，使得免安装软件，使用浏览器连接键盘进行键位设置提供了可能性。

在前期经过初步验证后，在2022年1月返工隔离期间最终实现了这个在线配置工具，使用 [Svelte](https://svelte.dev/) 开发框架进行开发（边学边练）。

## 浏览器支持情况

因为`WebHID API` 出现的时间不长，浏览器支持难免会跟不上，但幸运的时，在本文字首次撰写时（2022年7月），装机率最高的 `Chrome`、`Microsoft EDGE`和`Opera` 的桌面版最新版本均已支持，而且均已覆盖三大桌面操作系统。经过站长本人测试的操作系统有 `macOS X Big Sur`、`Windows 10`和`Ubuntu 21.10` 。具体支持情况，可以通过 [Can I use ...](https://caniuse.com/?search=WebHID%20API) 查询最新支持情况。

## 操作系统支持情况

- Microsoft Windows
- Mac OS X
- Linux


## 浏览器下载

- `Microsoft EDGE` 就是现在 Windows 最新的浏览器（终于和 IE 说拜拜），官方下载地址：[Microsoft EDGE](https://www.microsoft.com/zh-cn/edge?r=1) 。
- `Google Chrome` 熟悉的老朋友，官方下载地址：[Google Chrome](https://www.google.cn/chrome/) 。
- `Opera` 欧朋浏览器（未进行实际测试，可能会有其他兼容问题），上一时代的王者，官方下载地址：[Opera](https://www.opera.com/zh-cn) 。

-EOF-

最近更新： {docsify-updated}