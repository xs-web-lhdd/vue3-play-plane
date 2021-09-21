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
    objA.x + objA.width > objB.x &&
    objA.x < objB.x + objB.width &&
    objA.y + objA.height > objB.y &&
    objA.y < objB.y + objB.height
  );
}