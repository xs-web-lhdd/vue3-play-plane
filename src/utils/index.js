/**
 * @description 碰撞算法：
 * @author 凉风有信、
 */


// 检测碰撞的算法：
export const hitTestObject = (objA, objB) => {
  // 找出所有没有碰撞的结果
  // 取反
  // 得出碰撞上的结果
  return (
    objA.x + objA.width >= objB.x &&
    objB.x + objB.width >= objA.x &&
    objA.y + objA.height >= objB.y &&
    objB.y + objB.height >= objA.y
  );
}