import { createApp } from './src/runtime-canvas/index'
import App from './src/App'
import gameRootContainer from './src/runtime-canvas/game'


// 创建一个根组件：
// 根容器
// canvas => pixi.js

createApp(App).mount(gameRootContainer())
