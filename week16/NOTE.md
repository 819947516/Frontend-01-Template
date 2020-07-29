# 手势

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
