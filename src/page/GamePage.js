import {
  h,
  defineComponent,
  reactive,
  onUnmounted,
  onMounted
} from '@vue/runtime-core'
// map：
import Map from '../components/Map'
import Plane from '../components/Plane'
import EnemyPlane from '../components/EnemyPlane'
import {
  game
} from '../runtime-canvas/game'
import {
  hitTestObject
} from '../utils/index'

// 我方飞机：
function useCreatePlane() {
  // 响应式对象：
  const planeInfo = reactive({
    x: 150,
    y: 450,
    width: 258,
    height: 364
  })
  // 速度
  const speed = 15
  // 键盘控制飞机移动：
  window.addEventListener('keydown', function (e) {
    switch (e.code) {
      case 'ArrowUp':
        if (planeInfo.y <= 0) return
        planeInfo.y -= speed
        break;
      case 'ArrowDown':
        if (planeInfo.y >= 720) return
        planeInfo.y += speed
        break;
      case 'ArrowLeft':
        if (planeInfo.x <= 0) return
        planeInfo.x -= speed
        break;
      case 'ArrowRight':
        if (planeInfo.x >= 480) return
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

// 敌方飞机：
function useEnemyPlane() {
  const enemyPlanes = reactive([{
    x: 50,
    y: 0,
    width: 308,
    height: 207
  }])
  return {
    enemyPlanes
  }
}

export default defineComponent({
  setup(props, context) {
    // 我方飞机：
    const {
      planeInfo
    } = useCreatePlane()
    // 敌方飞机：
    const {
      enemyPlanes
    } = useEnemyPlane()

    // 飞机移动逻辑：
    const handleTicker = () => {
      // 敌方飞机移动：
      enemyPlanes.forEach(enemyPlane => {
        enemyPlane.y++
      })
      // 碰撞检测的算法： 矩形碰撞
      enemyPlanes.forEach(enemyPlane => {
        if (hitTestObject(enemyPlane, planeInfo)) {
          console.log('完蛋了，碰到上了');
          // 游戏结束：
          context.emit('changePage', 'EndPage')
        }
      })
    }

    onMounted(() => {
      game.ticker.add(handleTicker)
    })
    onUnmounted(() => {
      game.ticker.remove(handleTicker)
    })
    return {
      planeInfo,
      enemyPlanes
    }
  },
  render(context) {
    // 敌方飞机：
    const createEnemyPlane = () => {
      return context.enemyPlanes.map(enemyPlane => {
        return h(EnemyPlane, {
          x: enemyPlane.x,
          y: enemyPlane.y
        })
      })
    }
    // 地图，飞机
    return h('Container', [h(Map), h(Plane, {
      x: context.planeInfo.x,
      y: context.planeInfo.y
    }), ...createEnemyPlane()])
  }
})