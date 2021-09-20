import {
  h,
  defineComponent
} from '@vue/runtime-core'
import mapImg from '../assets/map.jpg'


export default defineComponent({
  render() {
    // 地图：
    return h('Container', [h('Sprite', {
      texture: mapImg
    })])
    return
  }
})