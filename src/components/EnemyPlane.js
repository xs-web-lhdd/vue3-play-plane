import {
  h,
  defineComponent,
  watch,
  reactive,
  toRefs
} from '@vue/runtime-core'
import enemyPlaneImg from '../assets/enemy.png'


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
        texture: enemyPlaneImg
      })
    ])
  }
})