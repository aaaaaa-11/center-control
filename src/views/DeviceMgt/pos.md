1. 打开弹框，更新formstate为当前marker的坐标
  2. 如果当前marker有坐标，则在地图上显示，并flyto位置
  3. 此时，位置选择状态为true

2. 关闭弹框，位置选择为false

3. 当位置选择为true是，获取到位置数据就会保存到当前坐标字段上