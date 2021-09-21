import {
  h,
  defineComponent
} from '@vue/runtime-core'
// map：
import Map from '../components/Map'


export default defineComponent({
  render() {
    // 地图：
    return h('Container', [h(Map)])
    return
  }
})