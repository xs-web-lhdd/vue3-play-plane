// 根组件：
import { defineComponent, h } from '@vue/runtime-core'

export default defineComponent({
  render () {
    // 创建虚拟节点：
    const vnode = h("rect")
    // console.log(vnode)
    return vnode
  }
})