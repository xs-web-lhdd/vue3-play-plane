import {
  createRenderer
} from '@vue/runtime-core'
import {
  Text,
  Container,
  Sprite,
  Texture
} from 'pixi.js'

const renderer = createRenderer({

  createElement(type) {
    let element
    switch (type) {
      case 'Container':
        element = new Container()
        break;
      case 'Sprite':
        element = new Sprite()
        break;
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
    switch (key) {
      case 'texture':
        el.texture = Texture.from(nextValue)
        break;
      default:
        el[key] = nextValue
        break;
    }
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