import {
  h,
  defineComponent
} from '@vue/runtime-core'
import startPageImg from '../assets/start_page.jpg'
import startBtnImg from '../assets/startBtn.png'


export default defineComponent({
  render() {
    // 背景图片：
    // <div><img src="imgPath"/></div>
    // 使用pixi.js
    return h('Container', [h('Sprite', {
        texture: startPageImg
      }),
      h('Sprite', {
        texture: startBtnImg,
        x: 227,
        y: 515
      })
    ])
    return
  }
})