# center-control-demo
总控的一个demo  

[演示地址](http://www.dongpeipei.top:17890/#/login)  
首页展示点位信息
![数据展示](./public/showDeviceOnMap.png)
可以对设备、区域、账号权限等进行管理
![设备管理](./public/deviceMgt.png)

买的最便宜的一个云服务器，性能不是很好，加载cesium.js需要很久  
前端部署用nginx  
后端用nodejs+pm2进程管理  

# 技术框架
- vue3 + vite + ts  
- ant-design-vue + echarts + cesium
--------------------------------

# 运行
```
npm i
npm run dev
```
--------------------------------

# 打包

```
npm run build
```
