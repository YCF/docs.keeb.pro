# 设置组合键
日常所说的组合键，是指 **N** 个 `修饰键`+ **1** 个 `普通键`。

其中 `修饰键` 有且仅有 `Ctrl`、`Gui`、`ALT` 和 `Shift` 共4个键，不同系统描述不同，具体如下：

| Windows | Mac OS X | Linux |
|---------|----------|-------|
| Shift   | Shift    | Shift |
| Ctrl    | Control  | Ctrl  |
| Win     | Command  | Gui   |
| Alt     | Option   | Alt   |

其中， `修饰键` 还需区分左右，这是会被操作系统区分的。在 TMK/QMK 固件中也支持修饰键的左右，只是这个左右键区别是成组的，即你一个组合键里面只能所有键都是用左或者右。

`普通键` 即除了 `修饰键` 以外的所有 `基础键`，例如 `A`、`B`、`2`、`Enter`、`Esc`、`Tab`、`F1`、`=`、`/`、`Home`、`Del`等等。

针对以上特点，本配置工具采用拟真的方式进行操作，同时自动处理 `修饰键` 的左右问题，操作步骤如下：

1. 选定想配置的键位，使其处于高亮闪烁状态。
2. 在界面下方的虚拟键盘区内，用鼠标长按设置键的其中一个 `修饰键` 约 1 秒，此时对应修饰键会处于 **虚拟按下** 状态。
3. 通过单击其他 `修饰键` 实现增加或减少多个 `修饰键` 的按下状态，如果点击不在同一测（左右测）的 `修饰键` ，会整组修饰键切换左右状态，界面上也会有所体现及反馈。
4. 最后点击组合键中的 `普通键` ，实现组合键设置到目标键位。拟真键盘上的键帽也会有所标识，可以试验多种组合键来理解键帽的标识，比较直观容易理解。
5. 如果设置错误或失败，可以重新选择键位重复上述步骤。

-EOF-

最近更新： {docsify-updated}