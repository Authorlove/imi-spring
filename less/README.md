2015.07.27更新-新增ani.less动画库
================
##增加一些简单的动画效果，不产生废代码。此动画库无前缀，请配合[autoprefixer](https://github.com/postcss/autoprefixer)使用.
#使用方法：
``` less
@import "./module/ani.less";
.ani_flash;
.xxx{animation: ani_flash 2s linear;}
```
以下八个动画支持填入参数改变距离，不填默认为正负20个像素。如: .ani_fadeInUp(30px);<br />
ani_fadeInUp、ani_fadeInDown、ani_fadeInLeft、ani_fadeInRight、<br />
ani_fadeOutUp、ani_fadeOutDown、ani_fadeOutLeft、ani_fadeOutRight

    效果名     | 类名
------------- | -------------
闪光灯  | ani_flash
弹起  | ani_bounce
摇摆  | ani_shake
秋千  | ani_tada
swing | ani_swing
脉冲  | ani_pulse
x轴淡入 | ani_flipInX
x轴淡出 | ani_flipOutX
y轴淡入 | ani_flipInY
y轴淡出 | ani_flipOutY
淡入 | ani_danIn
下方淡入 | ani_fadeInUp
上方淡入 | ani_fadeInDown
左边淡入 | ani_fadeInLeft
右边淡入 | ani_fadeInRight
页面底部淡入 | ani_fadeInUpBig
页面底部淡入 | ani_fadeInDownBig
页面左边淡入 | ani_fadeInLeftBig
页面右边淡入 | ani_fadeInRightBig
淡出 | ani_danOut
向上淡出 | ani_fadeOutUp
向下淡出 | ani_fadeOutDown
向左淡出 | ani_fadeOutLeft
向右淡出 | ani_fadeOutRight
页面底部淡出 | ani_fadeOutUpBig
页面底部淡出 | ani_fadeOutDownBig
页面左边淡出 | ani_fadeOutLeftBig
页面右边淡出 | ani_fadeOutRightBig
弹跳进入 | ani_bounceIn
页面顶部弹跳进入 | ani_bounceInDown
页面底部弹跳进入 | ani_bounceInUp
页面左边弹跳进入 | ani_bounceInLeft
页面右边弹跳进入 | ani_bounceInRight
弹跳退出 | ani_bounceOut
页面底部弹跳退出 | ani_bounceOutDown
页面顶部弹跳退出 | ani_bounceOutUp
页面左边弹跳退出 | ani_bounceOutLeft
页面右边弹跳退出 | ani_bounceOutRight
旋转进入 | ani_rotateIn
左上边旋转进入 | ani_rotateInDownLeft
右上边旋转进入 | ani_rotateInDownRight
右下边旋转进入 | ani_rotateInUpLeft
左下边旋转进入 | ani_rotateInUpRight
旋转退出 | ani_rotateOut
右下边旋转退出 | ani_rotateOutDownLeft
左下边旋转退出 | ani_rotateOutDownRight
左上边旋转退出 | ani_rotateOutUpLeft
右上边旋转退出 | ani_rotateOutUpRight
左边滚动进入 | ani_rollIn
右边滚动进入 | ani_rollOut
旋转 | ani_rotate





less的简要使用说明(具体请查看[这里](http://less.bootcss.com/))
================

##注释
和css不同，less可以使用行注释`// ...`，而css只能使用块注释`/* ... */`

##变量
* 定义变量：`@你定义的名字: value`; （变量只能定义一次）
``` less
@my-color: #fff;
body {
  color: @my-color;
}
```
* 变量用于选择器名
``` less
@test-class-name: classA;
#header {
  color: blue;
  .@{test-class-name} {   // 即.classA
    color: red;    
  }
}
```
* 变量用于属性名
``` less
@property-name: color;
#footer {
  @{property-name}: blue;
  background-@{property-name}: #999;
}
```
#混合(最常用得功能)
* 不带参数
``` less
.bordered {
  border: 1px solid black;
}

.mixin-class {
  color: #000;
  .bordered;
}
```
>可以混入的选择器只有类选择器和id选择器,带括号的混合不能被输出，例如
>>``` less
#output {
  color: red;
}
#not-output() { // 注意这里加了括号
  border: 1px solid black;
}
.mixined {
  #output;
  #not-output;
}
```
>>编译出来是
>>``` less
#output {
  color: red;
}
.mixined {
  color: red;
  border: 1px solid black;
}
```

*带参数
``` less
.border-radius(@radius) {
  -webkit-border-radius: @radius;
    -moz-border-radius: @radius;
      border-radius: @radius;
}
```
在混入的时候可以向这个变量传值：
``` less
#header {
  .border-radius(4px);
}
}
```
可以为@radius设置默认值，比如:
``` less
.border-radius(@radius: 4px) {
  -webkit-border-radius: @radius;
    -moz-border-radius: @radius;
      border-radius: @radius;
}
```

在调用mixin的时候，多个参数可以使用分号;或者逗号,隔开，推荐使用分号;因为逗号会和css的列表混淆：

* 当使用了逗号，但没有用分号，则逗号按mixin分隔符号来解析
* 当同时使用了逗号和分号，则分号按mixin分隔符号来解析，逗号当做css list的分隔符号，例如：
``` less
.name(1, 2, 3; something, else); // 相当于传递了2个变量，一个是"1,2,3"的值列表，一个是"something,else"的值列表
.name(1, 2, 3); // 传递了3个变量，分别是1, 2和3
.name(1, 2, 3;); // 传递了1个变量，即"1,2,3"的值列表
.name(@param1: red, blue); // 传递了1个变量
```

上面所说的css list典型的应用是用于transition这个属性：
``` less
.transition(@property: all, @time: 1s, @timing: ease-in-out) {
  -moz-transition: @property @time @timing;
  -webkit-transition: @property @time @timing;
  -o-transition: @property @time @timing;
  transition: @property @time @timing;
}

a {
  // 如果要对color和opacity这两个属性运用transition，必须这样
  .transition(color, opacity; .5s);
  
  // 如果像下面用逗号分隔会产生与期待不符的结果
  // .transtion(color, opacity, .5s);
}
```
上面编译出来的两个结果分别是：
``` less
/* 分号调用方式：*/
a {
  -moz-transition: color, opacity 0.5s ease-in-out;
  -webkit-transition: color, opacity 0.5s ease-in-out;
  -o-transition: color, opacity 0.5s ease-in-out;
  transition: color, opacity 0.5s ease-in-out;
}

/* 逗号调用方式（错误）：*/
a {
  -moz-transition: color opacity 0.5s;
  -webkit-transition: color opacity 0.5s;
  -o-transition: color opacity 0.5s;
  transition: color opacity 0.5s;
}
```

#导入Import
可以在less中导入另一个.less文件，然后这个文件中的所有变量都可用了，另外导入less文件时.less扩展名可以省略，如：
``` css
@import "library"; // library.less
@import "typo.css";
```
>扩展名
.less文件作为less文件引入
.css文件作为css导入
其他扩展名/没有扩展名均作为less文件导入
作为css文件导入时，不会对@import语句做处理，而是将该语句直接输出到最终css文件中，让浏览器去做处理（即as-is的方式）

##导入选项
为了给予开发者更多的导入选择，使用@import (<keyword>) "filename";语句导入less/css
可用的选项关键词如下：
* `reference` 导入less文件，但是不输出其样式
* `inline` 导入文件但是不处理，直接输出，一般用来导入一些less不兼容的css（不标准的，或者hacked css）
* `less` 将导入的文件当做less处理，不管扩展名是什么
* `css` 将导入的文件当做css处理，不管扩展名是什么
* `once` 只引入一次（默认行为）该文件
* `multiple` 多次引用该文件
* `optional` 当文件未找到时继续编译

reference
用法：`@import (reference) "foo.less"`
引入的less文件中的规则集不会直接输出到output，而只能作为mixin或者被继承（:extend）


使用rem布局，在device-width=320/360/375/384/400/414这几种终端设备中显示兼容效果比较好,在工作量与显示效果间取个平衡点，确定五个响应点
## 640设计稿 (实际网页宽度/320 * 62.5%)
``` css
html,body{font-size: 62.5%;}
@media screen and (min-width:360px) and (max-width:374px) {
    html,body { font-size: 70.3%; } 
}
@media screen and (min-width:375px) and (max-width:383px) {
    html { font-size: 73.24%; } 
}
@media screen and (min-width:384px) and (max-width:399px) {
    html { font-size: 75%; } 
}
@media screen and (min-width:400px) and (max-width:413px) {
    html,body { font-size: 78.125%; }
}
@media screen and (min-width:414px) and (max-width:431px) and (orientation:portrait){
    html { font-size: 80.86%; }
}
@media screen and (min-width:432px) and (max-width:479px) and (orientation:portrait){
    html { font-size: 84.375%; }
}
//下面两个是针对android pad分辨率设置
@media screen and (min-width:480px)and (max-width:639px) {
   html{ font-size:93.75%;}
}
@media screen and (min-width:640px){
   html{ font-size:125%;}
}
```

## 750设计稿 (实际网页宽度/375 * 62.5%)
``` css
@media screen and (max-width:359px) and (orientation:portrait) {
    html { font-size: 53.33%; } 
}
@media screen and (min-width:360px) and (max-width:374px) and (orientation:portrait) {
    html { font-size: 60%; } 
}
@media screen and (min-width:384px) and (max-width:399px) and (orientation:portrait) {
    html { font-size: 64%; } 
}
@media screen and (min-width:400px) and (max-width:413px) and (orientation:portrait) {
    html { font-size: 66.67%; } 
}
@media screen and (min-width:414px) and (max-width:431px) and (orientation:portrait){
    html { font-size: 69%; }
}
@media screen and (min-width:432px) and (max-width:479px) and (orientation:portrait){
    html { font-size:72%; }
}
@media screen and (min-width:480px)and (max-width:639px) and (orientation:portrait){
   html{ font-size:80%;}
} 
@media screen and (min-width:640px) and (orientation:portrait){
   html{ font-size:106.67%;}
}
```

#编译工具请移步[这里](http://koala-app.com/index-zh.html)
栗子请看此目录下的文件



