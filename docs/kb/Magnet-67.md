# Magnet-67

## 键盘介绍

Magnet-67 是 Keeb.pro 首个向外发布的软硬件一体研发的键盘，将会得到本站点的长久支持。

- 调整粒度单位是 xm 不是 mm 的主要原因是我们并没有对物理尺度和调整尺度进行关联，给出这个类似的单位是为了大家调整时心里有个谱。

- 本版本 PCB 是磁轴键盘首次探索，没能做到游标卡尺级别的精度，配置界面提供 0.02 xm 粒度进行调整是为了放开自由度给到诸位进行探索，并不是表示该分辨粒度在所有轴位上都能做到，建议按 0.1 xm 区间进行调整。

- 每个磁轴的按键类型虽然全面放开，但如果全局都使用类似 RT 那种极限的按键设定，大部分磁轴键盘是很难都使用较为极限的参数的，个别键盘设置限制了某些按键功能的使用范围。建议大部分轴位使用全局 2 xm 的设置，这样个别重点键位能更好地为您服务。

- 主打性价比和功能的客制化套件，请予以包涵谅解，有任何疑问或功能需求，欢迎向我们反馈。

## 客服

为保证顾客权益，请各位收藏本页面，如果客户群被恶意举报，本页面能确保各位重新与客服取得联系.

- 售后群：xxx，必要时将展示最新号码。

- 团购群：xxx，必要时将展示最新号码。

## 功能

### 已有功能

- QMK 主要基础特性，8 个层，组合键，NKRO 等；
- 在线配置；
- RGB 灯效，在线开关灯，设置灯效；
- 轴体校准；
- RT 键，顶部和底部可调死区；
- SignalRGB 神光同步；
- Win 键开关，在线设置或按键设置；
- 多达 8 个磁轴配置层并可实时切换或和 QMK 层绑定切换；
- 动态零位校准。

### 计划功能

- DKS；
- 电磁摇杆（demo 代码已通过，正在优化代码 20240302）；
- QMK 键盘宏（键盘内已完成，缺驱动配置界面）；

## 开源（OSHW）

- Firmware:正在梳理。
- VIA json:磁轴键盘有很多调整值，VIA 无法满足。
- Plate:[plate-Magnet67.dwg](/OSHW_files/KeebPro_magnet67/plate-Magnet67.dwg ':ignore')。

## 全键无冲

支持全键无冲，从`0x2024014`后的固件默认开启，请阅读 [NKRO 科普](/nkro.md)。

## 固件升级

1. 拔出键盘。
2. 按住键盘左上角（一般为 ESC 键）的同时，将键盘插上 USB（接入电脑）。
3. 电脑将会出现一个命名为`RP1-RP2`的盘符，将固件文件（`*.uf2`）复制粘贴到该磁盘，此时松开所有按键。
4. 以上磁盘将在键盘升级成功后消失，完成升级。
5. 如果升级完成后出现键盘自动乱按等情况，请重新插拔 USB，如果仍出现，请看下面 FAQ 部分。

## 固件下载

磁轴键盘固件正在开发阶段，建议一直使用最新固件。

- 0x20240302: [magnet67_20240302.uf2](/download_firmware/KeebPro_magnet67/keebpro_magnet67_202403021515.uf2 ':ignore')
  - 加入自动零位校准，降低温漂原因带来的断触等问题的出现概率
- 0x20240215: [magnet67_20240215.uf2](/download_firmware/KeebPro_magnet67/keebpro_magnet67_202402151250.uf2 ':ignore')
  - 修正不能通过 `RGB_Toggle` 按键打开 RGB 灯的问题
- 0x20240121: [magnet67_20240121c.uf2](/download_firmware/KeebPro_magnet67/keebpro_magnet67_202401211703.uf2 ':ignore')
  - 修正按键层 0 与磁层设置没实时更新的问题
- 0x20240121: [magnet67_20240121b.uf2](/download_firmware/KeebPro_magnet67/keebpro_magnet67_202401211042.uf2 ':ignore')
  - 修正按键层与磁层设置没实时更新的问题
- 0x20240121: [magnet67_20240121.uf2](/download_firmware/KeebPro_magnet67/keebpro_magnet67_202401211005.uf2 ':ignore')
  - 磁轴配置可板载保存 8 个，并支持自定义命名
  - 按键层可与磁轴 8 个配置相互任意绑定并可在键盘使用时实时同步切换
  - RGB 灯效设置板载保存
- 0x20240114: [magnet67_20240114.uf2](/download_firmware/KeebPro_magnet67/keebpro_magnet67_202401141238.uf2 ':ignore')
  - 修正“迅疾触发”按键释放到顶部死区也不是释放的问题。
  - 默认开启 NKRO（全键无冲）
- 出厂自带固件: [magnet67_20240106.uf2](/download_firmware/KeebPro_magnet67/keebpro_magnet67_202401061715.uf2 ':ignore')

## 神光同步

目前支持 SignalRGB 神光同步，插件文件：[KeebPro_SignalRGB_Magnet67_v0.js](/SignalRGB/KeebPro_magnet67/KeebPro_SignalRGB_Magnet67.js ':ignore')。

## FAQ

1. 如果键盘插入后出现乱按，请检查：

   - 插入 USB 时，是否有按键被按住。
   - 参数是否调整过于极限。
   - 刚升级了固件。（大版本升级的固件，可能改变了数据的存储结构，出现配置信息错乱，一般我们会尽量避免）

2. 出现键盘乱触发时救援：

   - 请按住左边第二行第一个按键（一般为 Tab 键）时，再插入 USB。此时键盘会进入调试模式，不会发送任何按键信息到电脑，然后再使用 [keeb.pro](https://keeb.pro/configurator/) 对键盘进行配置信息的修改即可。
   - 如果上述方法仍无法解决，请随时联系我们。

-EOF-
