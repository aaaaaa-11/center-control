cesium点击事件监听

1个参考：
给地图注册监听，给每个entity注册监听，监听方法中可以接收一个回调函数，注册监听中做一些操作，然后调用回到函数，可以传值给回调
参考代码：
```javascript
// 设置点击事件要执行的函数
const eventMap = new Map() // 存储事件以及对应处理的函数
const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas) // 处理用户输入事件
// 设置要在输入事件上执行的函数，这里对单击做操作
// 如果要对多个事件执行类似的操作，可以定义一个事件数组，遍历调用handler.setInputAction
eventMap['click'] = new Map() // 回头在这个Map对象上添加地图/entity的点击事件回调函数
handler.setInputAction(click => {
  // 做一些操作，例如获取点击位置
  // const pos = ...
  // 调用当前点击事件中存储的回调函数
  if (clickEntity) { // 点击到了实体上
    // 假设实体marker和对应回调函数以键值对形式存储在Map对象中
    callback(marker, params) // 拿到回调函数
  } else { // 点击到了地图上
    // 假设'cesiumMap'和对应回调以键值对形式存储在Map对象中
    callback('cesiumMap', params) // 拿到回调函数
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)

function callback (item, params) {
  const cbs = eventMap['click'].get(item) // 拿到回调函数
  // 遍历执行回调，并传参
  // 。。。
}


// 监听事件
on ('click', item, cb) {
  if (!eventMap['click'].get(item)) {
    eventMap['click'].get(item) = new Set() // 用一个set存储item的点击事件回调函数
  }
  const cbSet = eventMap['click'].get(item)
  // 添加监听事件
  cbSet.add(cb)
}
// 移除监听
off ('click', item, cb) {
  const cbSet = eventMap['click'].get(item)
  if (cbSet && cbSet.has(cb)) {
    cbSet.delete(cb)
  }
}
```
