// 根组件：
import { defineComponent, h } from '@vue/runtime-core'

import Circle from './components/Circle'

export default defineComponent({
  render () {
    // 创建虚拟节点：

    // <rect x=100 y=100>我的头发是真的少！！！</rect>
    // const vnode = h("rect", { x: 100, y: 100 }, "我的头发是真的少！！！")

    // <rect x=100 y=100>我的头发是真的少！！！<circle>hello world!</circle></rect>
    // const vnode = h("rect", { x: 100, y: 100 }, ["我的头发是真的少！！！", h("circle", {x: 150, y: 150}, '我不秃，你才秃！')])
    const vnode = h("rect", { x: 100, y: 100 }, ["我的头发是真的少！！！", h(Circle)])
    // console.log(vnode)
    return vnode
  }
})