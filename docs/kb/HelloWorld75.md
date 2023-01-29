# 瀚文 aka HelloWorld 75

## 键盘介绍

瀚文 75 是稚晖君在 2022 年 7 月 24 日在 B 站上分享的一个集 FOC 电机、电子墨水屏、简易触摸条和 USB HUB 等多种电子 DIY 热门小制作于一体的全开源客制化键盘。

由于其粉丝的呼声很高，所有出现了各种开团，因为该键盘是全开源的，而且稚晖君本人也允许大家开团，所以也无所谓传统的正版和盗版一说，有自己 DIY 的，也有跟风参团的。

但遗憾的是，稚晖君本人工作饱和度很高，其注意业务精力也不在这个键盘上，各大 DIY 爱好者水平也是难以一下子掌握这个键盘硬件的开发，为了解决这个问题，我的好友大齐找了我几次，我在 2022 年 12 月突然来了兴致答应了下来。经过周末的调试，顺利适配其键盘主体部分到 QMK 上，同时瀚文 75 模块的外观设计不同于传统键盘，触摸键的配置交互界面也与传统键盘不同，使我进一步完善了 Keeb.pro 网站的各项功能，进一步提高了网站对各种键盘的适应能力，分离了网站对各型键盘的外观、交互脚本等架构设计。

目前本网站仍为站长个人独立开发完成，全过程用爱发电，祝大家玩得愉快。

---

## Bootloader

> 后续键盘固件会验证本 Bootloader 内容，请某些朋友别动坏心思，尊重劳动成果。

开发者信息： 4000，即 16K。

下载：[HelloWorld75_uf2bootloader.bin](/download_firmware/HelloWorld75/helloworld75_uf2bootloader.bin ":ignore")

> sha1:`2fc64be5ec9df5e6987e255141b3d2c22b93cca8`

刷写方法：(有风险，请谨慎操作)

[刷写-stm32-系列芯片 Bootloader](/flash_bootloader?id=刷写-stm32-系列芯片)

---

## 键盘固件

使用上方 Bootloader 后，使用 [U 盘模式](firmware_upgrade.md#u盘模式) 进行升级，后续升级可以使用 [在线进入法](firmware_upgrade.md#4-在线进入法) 进入固件升级模式。

下载：[20230128_keebpro_hw75.uf2](/download_firmware/HelloWorld75/20230128_keebpro_hw75.uf2 ":ignore")

---

## 查看当前固件版本

请看这里：[查看键盘内部正在使用的固件版本](/firmware_upgrade?id=查看键盘内部正在使用的固件版本)

---

## 固件变动历史：

- 20221221:创世提交,[20221223_keebpro_hw75.uf2](/download_firmware/HelloWorld75/20221223_keebpro_hw75.uf2 ":ignore").
- 20230125:修正电脑休眠唤醒后 RGB 失效,[20230125_keebpro_hw75.uf2](/download_firmware/HelloWorld75/20230125_keebpro_hw75.uf2 ":ignore").
- 20230128:RGB 可通过 `RGB_TOG`键 在`所有`、`仅底部氛围灯`、`关闭` 三个状态切换,[20230128_keebpro_hw75.uf2](/download_firmware/HelloWorld75/20230128_keebpro_hw75.uf2 ":ignore").
