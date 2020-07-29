# 手势 \ 完善Carousel

* Tap
* Pan
* Flick
* Press

## 事件

* Touch
* Mouse (区分左右键)
* PointErevent

## 行为抽象

* start
* move
* end
* cancel

## 判断手势

start ----(end)---> Tap

start ----(移动10px)---> PanStart ----(move+)----> PanMove ---- (end) --->PanEnd
start ----(移动10px)---> PanStart ----(move+)----> PanMove ---- (end且速度 > x) --->Flick

start ----(长按>0.5s)---> PressStart ----(移动10px)----> PanStart
start ----(长按>0.5s)---> PressStart ----(end)----> PressEnd

## 完善Carousel

### 优化动画库

* 用到Set数据结构提升性能
* 通过Map绑定各个animation的addtime
* 添加finishedAnimations用于完善restart、reset方法

### 添加手势

* 关键点在于offset，计算捡起时的偏移量 offset = currentTransformValue + 500 * currentPosition // 计算当前的偏移量
* 通过当前元素偏移量计算出其他元素位置，从而赋值产生拖动效果
