/**
 * @description 结束页面
 * @author 凉风有信、
 */

import {
  h,
  defineComponent
} from '@vue/runtime-core'
import endPageImg from '../assets/end_page.jpg'
import restartBtnImg from '../assets/restartBtn.png'


export default defineComponent({
  setup(props, context) {
    // 作为 vue3 入口函数：
    const onClick = () => {
      context.emit('changePage', "GamePage")
    }
    return {
      onClick
    }
  },
  render(context) {
    // 背景图片：
    // <div><img src="imgPath"/></div>
    // 使用pixi.js
    return h('Container', [h('Sprite', {
        texture: endPageImg
      }),
      h('Sprite', {
        texture: restartBtnImg,
        x: 227,
        y: 515,
        interactive: true,
        onClick: context.onClick
      })
    ])
    return
  }
})