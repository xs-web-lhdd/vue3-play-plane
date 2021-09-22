/**
 * @description 发射子弹
 * @author 凉风有信、
 */


import {
  h,
  defineComponent,
  watch,
  reactive,
  toRefs
} from '@vue/runtime-core'
import bulletImg from '../assets/bunny-self.png'


export default defineComponent({
  props: ['x', 'y'],
  setup(props, context) {
    const {
      x,
      y
    } = toRefs(props)
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
        texture: bulletImg
      })
    ])
  }
})