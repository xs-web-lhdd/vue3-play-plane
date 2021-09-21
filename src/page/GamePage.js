import {
  h,
  defineComponent,
  reactive
} from '@vue/runtime-core'
// map：
import Map from '../components/Map'
import Plane from '../components/Plane'


function useCreatePlane() {
  // 响应式对象：
  const planeInfo = reactive({
    x: 150,
    y: 150
  })
  // 速度
  const speed = 15
  // 键盘控制飞机移动：
  window.addEventListener('keydown', function (e) {
    switch (e.code) {
      case 'ArrowUp':
        planeInfo.y -= speed
        break;
      case 'ArrowDown':
        planeInfo.y += speed
        break;
      case 'ArrowLeft':
        planeInfo.x -= speed
        break;
      case 'ArrowRight':
        planeInfo.x += speed
        break;
      default:
        break;
    }
  })
  return {
    planeInfo
  }
}

export default defineComponent({
  setup() {
    const {
      planeInfo
    } = useCreatePlane()
    return {
      planeInfo
    }
  },
  render(context) {
    // 地图，飞机
    return h('Container', [h(Map), h(Plane, {
      x: context.planeInfo.x,
      y: context.planeInfo.y
    })])
    return
  }
})