import {
  createRenderer
} from '@vue/runtime-core'
import {
  Graphics,
  Text
} from 'pixi.js'

const renderer = createRenderer({

  createElement(type) {
    console.log(type);
    // 绘制一个 矩形
    // pixi.js
    let element
    if (type === 'rect') {
      // 创制一个矩形
      element = new Graphics()
      element.beginFill(0xff0000)
      element.drawRect(0, 0, 500, 500)
      element.endFill()
    } else if (type === 'circle') {
      // 创建一个圆
      element = new Graphics()
      element.beginFill(0xffff00)
      element.drawCircle(0, 0, 50)
      element.endFill()
    }
    return element
  },
  setElementText(node, text) {
    const cText = new Text(text)
    node.addChild(cText)
  },
  createText(text) {
    return new Text(text)
  },
  patchProp(el, key, prevValue, nextValue) {
    // pixi设置元素坐标：
    el[key] = nextValue
  },
  insert(el, parent) {
    console.log(el);
    console.log(parent);
    parent.addChild(el);
  },
  // 处理注释：
  createComment() {},
  // 获取父节点：
  parentNode() {},
  // 获取兄弟节点：
  nextSibling() {},
  // 删除节点时调用：
  remove(el) {
    const parent = el.parent
    if (parent) {
      parent.removeChild(el)
    }
  }
})



export function createApp(rootComponent) {
  return renderer.createApp(rootComponent)
}