/**
 * @description 发射子弹
 * @author 凉风有信、
 */


import {
  h,
  defineComponent,
  toRefs
} from '@vue/runtime-core'
import bunnyImagePath from '../assets/bunny-self.png'
import bunnySelfImagePath from '../assets/bunny.png'

// 我方子弹信息：
export const SelfBulletInfo = {
  width: 61,
  height: 99,
  rotation: 0,
  dir: -1,
};
// 敌方子弹信息：
export const EnemyBulletInfo = {
  width: 61,
  height: 99,
  rotation: 0,
  dir: 1,
};
export default defineComponent({
  props: ['x', 'y', 'id', 'rotation', 'dir'],
  setup(props, context) {
    const {
      x,
      y
    } = toRefs(props)
    return {
      x,
      y,
      rotation: props.rotation,
      dir: props.dir
    }
  },
  render(ctx) {
    return h("Sprite", {
      x: ctx.x,
      y: ctx.y,
      rotation: ctx.rotation,
      // 根据不同 dir 渲染出不同子弹
      texture: ctx.dir === 1 ? bunnyImagePath : bunnySelfImagePath
    });
  }
})