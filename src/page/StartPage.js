import {
  h,
  defineComponent
} from '@vue/runtime-core'
import startPageImg from '../assets/start_page.jpg'
import startBtnImg from '../assets/startBtn.png'


export default defineComponent({
  setup(props, context) {
    // 作为 vue3 入口函数：
    const onClick = () => {
      console.log('click');
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
        texture: startPageImg
      }),
      h('Sprite', {
        texture: startBtnImg,
        x: 227,
        y: 515,
        interactive: true,
        onClick: context.onClick
      })
    ])
    return
  }
})