import { createRenderer } from '@vue/runtime-core'
import { Graphics } from 'pixi.js'

const renderer = createRenderer({

  createElement (type) {
    console.log(type);
    // 绘制一个 矩形
    // pixi.js
    let element
    if (type === 'rect') {
      element = new Graphics()
      element.beginFill(0xff0000)
      element.drawRect(0, 0, 500, 500)
      element.endFill()
    }
    return element
  },
  insert (el, parent) {
    console.log(el);
    console.log(parent);
    parent.addChild(el);
  }
})



export function createApp (rootComponent) {
  return renderer.createApp(rootComponent)
}