# 刷写键盘 Bootloader

## 什么是 Bootloader

不用纠结太多，喜欢可以去网上搜`bootloader`这个关键字，简单来说就是这东西决定我盟更新键盘固件时的便利程度，这是产品体验不可或缺的一环，所以本站还是比较上心的。一般键盘都会自带有 Bootloader，但可能由于在发售时欠考虑或者技术力问题，选定的方案都可能不太好用（在本站的理念中），所以本站会根据各键盘的特点用爱给他们开发一个好用的 Bootloader。就目前客制化键盘使用的主控来说，一般是 ATMEL 公司的 32u4 系列和 ST 公司的 STM32 系列，本站用的方案不用讨论，都是做好的哈。

## 刷写 STM32 系列芯片

> 刷写有一定风险，主要是正负极接反，请胆大心细

### 前提条件

1.键盘 PCB 上有明确的 SWD 烧录口标志或者通过其他途径知道。特别是正负极（一般 GND-VCC、GND-5V 或者 GND-3V3），根据实践（嗯）,接错了至少会烧掉电平转换的 LDO 元件。一个完整的 SWD 接口需要 4 个接口，分别是 GND,VCC,DIO,CLK。写法可能各不相同，多问一下团长，如果 PCB 做得不好就是他亏欠你的。

2.你需要一个 ST-Link 或者其他硬件。我用的是 [PWLink2](https://m.tb.cn/h.U8COq81?tk=i0o4dV8s2QM)，没恰饭，请店铺联系我打赏一下。

#### 安装烧录线客户端

如果你用的不是我同款，我相信你知道怎么用，我目前手上只有这个，后续我再补充常规 st-link 的方法，或者请哪位兄弟帮我写一下。

1.去[官网页面](https://www.powerwriter.com/index/index/products.html?p=5)下载，或者直接点[直接下载](https://www.powerwriter.com/uploads/20221124/3c31e8e390cba2085c469968d6c3bdec.zip)。

2.双击安装包进行安装，然后启动软件，此时不用插上 PWLink2。

3.直接插上 PWLink2 到电脑的 USB 口，不要连接到键盘的 SWD 接口，刷写客户端可能会更新 PWLink2 里面的固件，点确认就行。
![升级PWLink2固件](#/img/PWLink2/Pwlink2_1.png "升级PWLink2固件")

4.选择芯片。这里以韩文 75 使用的 STM32F103CB 系列为例，选择完后点击一下“应用设置”。界面上的擦除方式建议用默认的“全片擦除”，接口电平一般就是 3.3V。基本默认就可以了。
![选择芯片](#/img/PWLink2/Pwlink2_2.png "选择芯片")

5.选择 Bootloader 固件。一路点确认即可，起始位置就是 `0x08000000`，因为这是 Bootloader，芯片启动后运行的第一个程序,最后别忘了点一下“应用固件”。
![选择bootloader固件](#/img/PWLink2/Pwlink2_3.png "选择bootloader固件")

![选择bootloader固件](#/img/PWLink2/Pwlink2_4.png "选择bootloader固件")

6.连接 PWLink2 的 VCC 到键盘（确认好 VCC 和 GND 就可以接上去 DIO 和 CLK 接反就是烧录不成功，VCC 和 GND 接反就是烧键盘，键盘 USB 不要连，如果还是有点怕，就把 PWLink2 从电脑下拔下来，先体验一下，不紧张就好了）。每个键盘对于这 4 个引脚的顺序会有所不同，建议红色线用于接 VDD,黑色线接 GND，养成良好习惯。
如果你用的是我的同款，PWLink2 自带的线插入后（有防差错设计），红线和黑线对应就是 VDD 和 GND，你核对一下。然后 SWDIO 和 SWCLK 是挨在一起的蓝色和白色。

| PWLink2 | 键盘 |
| :-----: | :--: |
|   VDD   | VCC  |
|   GND   | GND  |
|  SWDIO  | DIO  |
|  SWCLK  | CLK  |

![连接SWD](#/img/PWLink2/Pwlink2_5.png "连接SWD")

7.当连接好后，PWLink2 客户端右下角会告诉你芯片连接成功（我截图上没有，请有的朋友给我补一下这张图）。然后依次点击软件上方菜单“执行”，“Program Memory 自动编程”。手稳住等一下就好，只要几秒。提示成功后就可以了，这是带自动验证的。烧录成功后，没有刷入键盘 UF2 固件的情况下，键盘 USB 加入电脑就是会提示一个 U 盘。

![烧录](#/img/PWLink2/Pwlink2_6.png "烧录")
