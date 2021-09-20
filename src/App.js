// 根组件：
import {
  defineComponent,
  h,
  computed,
  ref
} from '@vue/runtime-core'

import startPage from './page/StartPage'
import gamePage from './page/GamePage'

// import Circle from './components/Circle'

export default defineComponent({
  // render() {
  //   // 创建虚拟节点：

  //   // <rect x=100 y=100>我的头发是真的少！！！</rect>
  //   // const vnode = h("rect", { x: 100, y: 100 }, "我的头发是真的少！！！")

  //   // <rect x=100 y=100>我的头发是真的少！！！<circle>hello world!</circle></rect>
  //   // const vnode = h("rect", { x: 100, y: 100 }, ["我的头发是真的少！！！", h("circle", {x: 150, y: 150}, '我不秃，你才秃！')])
  //   const vnode = h("rect", {
  //     x: 100,
  //     y: 100
  //   }, ["我的头发是真的少！！！", h(Circle)])
  //   // console.log(vnode)
  //   return vnode
  // }
  setup() {
    const currentPageName = ref('StartPage')
    // 改变 string 切换组件：
    // 一个依赖别的属性的属性：
    // 计算属性：
    const currentPage = computed(() => {
      if (currentPageName.value === 'StartPage') {
        return startPage
      } else if (currentPageName.value === 'GamePage') {
        return gamePage
      }
    })
    return {
      currentPageName,
      currentPage
    }
  },
  render(context) {
    return h('Container', [h(context.currentPage, {
      onChangePage(page) {
        context.currentPageName = page
      }
    })])
  }
})