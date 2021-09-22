import {
  h,
  defineComponent,
  reactive,
  onUnmounted,
  onMounted,
  withCtx
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
import Bullet from '../components/Bullet'

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

// 发射我方子弹：
function useBullets() {
  const bullets = reactive([])
  const addBullet = (info) => {
    bullets.push(info)
  }
  return {
    bullets,
    addBullet
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

    // 我方发射子弹：
    const {
      bullets,
      addBullet
    } = useBullets()

    // 侦听发射子弹按钮：
    const onAttack = (bulletInfo) => {
      bulletInfo.width = 61
      bulletInfo.height = 99
      addBullet(bulletInfo)
    }

    // 飞机移动逻辑：
    const handleTicker = () => {
      // 敌方飞机移动：
      enemyPlanes.forEach(enemyPlane => {
        enemyPlane.y++
      })

      // 子弹移动：
      bullets.forEach(bullet => {
        bullet.y--
      })

      // 碰撞检测的算法： 矩形碰撞
      // 我方飞机与敌方飞机碰撞：
      enemyPlanes.forEach(enemyPlane => {
        if (hitTestObject(enemyPlane, planeInfo)) {
          console.log('完蛋了，碰到上了');
          // 游戏结束：
          context.emit('changePage', 'EndPage')
        }
      })
      // 我方子弹与敌方飞机碰撞：
      bullets.forEach((bulletInfo, bulletIndex) => {
        enemyPlanes.forEach((enemyPlane, enemyIndex) => {
          if (hitTestObject(bulletInfo, enemyPlane)) {
            console.log('击中敌方飞机');
            // 我方子弹消失-敌方飞机消失：
            bullets.splice(bulletIndex, 1)
            enemyPlanes.splice(enemyPlane, 1)
          }
        })
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
      enemyPlanes,
      bullets,
      onAttack
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


    // 我方子弹：
    const createPlaneBullet = () => {
      return context.bullets.map(bullet => {
        return h(Bullet, {
          x: bullet.x,
          y: bullet.y
        })
      })
    }


    // 地图，飞机
    return h('Container', [h(Map), h(Plane, {
      x: context.planeInfo.x,
      y: context.planeInfo.y,
      onAttack: context.onAttack
    }), ...createEnemyPlane(), ...createPlaneBullet()])
  }
})