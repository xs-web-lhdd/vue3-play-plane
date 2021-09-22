import {
  h,
  defineComponent,
  watch,
  reactive,
  toRefs
} from '@vue/runtime-core'
import planeImg from '../assets/plane.png'


export default defineComponent({
  props: ['x', 'y'],
  setup(props, context) {
    // 方案一：
    const point = reactive({
      x: props.x,
      y: props.y
    })
    watch(props, (value) => {
      // props 只读的响应式对象:
      // props.x = value.x
      // props.y = value.y
      point.x = value.x;
      point.y = value.y
    })
    // return {
    //   point
    // }
    // 方案二：
    // console.log(props.x);
    //响应式丢失：解决方案 toRefs
    const {
      x,
      y
    } = toRefs(props)
    // return {
    //   x: props.x,
    //   y: props.y
    // }

    // 按下空格键发射子弹：
    window.addEventListener('keydown', function (e) {
      if (e.code === 'Space') {
        console.log('要发射子弹咯！');
        // 子弹初始坐标跟飞机当前坐标一致：
        context.emit('attack', {
          x: x.value + 100,
          y: y.value
        })
      }
    })
    return {
      x,
      y
    }
  },
  render(context) {
    return h('Container', {
      x: context.x,
      y: context.y
    }, [
      h('Sprite', {
        texture: planeImg
      })
    ])
  }
})