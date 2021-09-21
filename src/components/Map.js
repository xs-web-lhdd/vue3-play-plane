import {
  h,
  defineComponent,
  ref
} from '@vue/runtime-core'
import mapImg from '../assets/map.jpg'
import {
  game
} from '../runtime-canvas/game'


export default defineComponent({
  setup(props, context) {
    // 视图高度：1080
    const viewHeight = 1080
    const mapY1 = ref(0)
    const mapY2 = ref(-viewHeight)
    // 自带事件轮询：setInterVal
    // pixi.js有更流畅的事件轮旋：
    const speed = 5
    game.ticker.add(() => {
      mapY1.value += speed
      mapY2.value += speed
      if (mapY1.value >= viewHeight) {
        mapY1.value = -viewHeight
      }
      if (mapY2.value >= viewHeight) {
        mapY2.value = -viewHeight
      }
    })
    return {
      mapY1,
      mapY2
    }
  },
  render(context) {
    return h('Container', [h('Sprite', {
        texture: mapImg,
        y: context.mapY1
      }),
      h('Sprite', {
        texture: mapImg,
        y: context.mapY2
      })
    ])
  }
})

// import {
//   h,
//   defineComponent
// } from '@vue/runtime-core'
// import startPageImg from '../assets/start_page.jpg'
// import startBtnImg from '../assets/startBtn.png'


// export default defineComponent({
//   setup(props, context) {
//     // 作为 vue3 入口函数：
//     const onClick = () => {
//       console.log('click');
//       context.emit('changePage', "GamePage")
//     }
//     return {
//       onClick
//     }
//   },
//   render(context) {
//     // 背景图片：
//     // <div><img src="imgPath"/></div>
//     // 使用pixi.js
//     return h('Container', [h('Sprite', {
//         texture: startPageImg
//       }),
//       h('Sprite', {
//         texture: startBtnImg,
//         x: 227,
//         y: 515,
//         interactive: true,
//         onClick: context.onClick
//       })
//     ])
//     return
//   }
// })