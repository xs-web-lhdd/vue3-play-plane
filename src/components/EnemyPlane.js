import {
  h,
  defineComponent,
  watch,
  reactive,
  toRefs,
  onMounted,
  onUnmounted
} from '@vue/runtime-core'
import enemyPlaneImg from '../assets/enemy.png'

export const EnemyPlaneInfo = {
  width: 308,
  height: 207,
  life: 3,
};
export default defineComponent({
  props: ['x', 'y'],
  setup(props, context) {
    const {
      x,
      y
    } = toRefs(props)
    useAttack(context, x, y)
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

const useAttack = (ctx, x, y) => {
  // 发射子弹
  const attackInterval = 2000;
  let intervalId;
  onMounted(() => {
    intervalId = setInterval(() => {
      ctx.emit("attack", {
        x: x.value + 105,
        y: y.value + 200,
      });
    }, attackInterval);
  });

  onUnmounted(() => {
    clearInterval(intervalId);
  });
};