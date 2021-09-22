import {
  game
} from '../runtime-canvas/game';
import {
  ref,
  onMounted,
  onUnmounted
} from '@vue/runtime-core';

/**
 * 键盘移动
 * @param x 初始化 x 坐标值
 * @param y 初始化 y 坐标值
 * @param speed 移动速度
 */

const commandType = {
  upAndDown: "upAndDown",
  leftAndRight: "leftAndRight",
};

export const useKeyboardMove = ({
  x,
  y,
  speed
}) => {
  const moveX = ref(x);
  const moveY = ref(y);

  // 初始化存放指令的数组:
  const moveCommands = [];

  // 自定义的四种按键类型：下、上、左、右
  const downCommand = {
    type: commandType.upAndDown,
    dir: 1,
    id: 1,
  };

  const upCommand = {
    type: commandType.upAndDown,
    dir: -1,
    id: 2,
  };

  const leftCommand = {
    type: commandType.leftAndRight,
    dir: -1,
    id: 3,
  };

  const rightCommand = {
    type: commandType.leftAndRight,
    dir: 1,
    id: 4,
  };

  // 去数组中找上下指令：
  const findUpAndDownCommand = () =>
    moveCommands.find((command) => command.type === commandType.upAndDown);
  // 去数组中找左右指令:
  const findLeftAndRightCommand = () =>
    moveCommands.find((command) => command.type === commandType.leftAndRight);

  // 判断传入指令是否在存放指令的数组里面：
  const isExistCommand = (command) => {
    const id = command.id;
    const result = moveCommands.find((c) => c.id === id);
    if (result) return true;
    return false;
  };

  // 删除指令：
  const removeCommand = (command) => {
    const id = command.id;
    const index = moveCommands.findIndex((c) => c.id === id);
    moveCommands.splice(index, 1);
  };

  const handleTicker = () => {
    // 找上下指令： --- 如果能找到就执行
    const upAndDownCommand = findUpAndDownCommand();
    if (upAndDownCommand) {
      // 找到之后就用找到指令的方向（向左是 -1，向右是 1）
      moveY.value += speed * upAndDownCommand.dir;
    }
    // 找左右指令： --- 如果能找到就执行
    const leftAndRightCommand = findLeftAndRightCommand();
    if (leftAndRightCommand) {
      // 找到之后就用找到指令的方向（向上是 -1，向下是 1）
      moveX.value += speed * leftAndRightCommand.dir;
    }
  };

  // 四种案件指令和自定义按键指令的映射：--- 这样就不需要写很多的 if 语句
  const commandMap = {
    ArrowLeft: leftCommand,
    ArrowRight: rightCommand,
    ArrowUp: upCommand,
    ArrowDown: downCommand,
  };

  const handleKeydown = (e) => {
    // 拿到按下键盘的类型（映射到自定义按键类型上面）
    const command = commandMap[e.code];
    if (command && !isExistCommand(command)) {
      // 如果有按键指令并且该指令在存放指令的数组中不存在才将该指令添加到存放指令的数组中 --- 防止按下一个键不放开然后一直往存放指令的数组中添加指令
      moveCommands.unshift(command);
    }
  };

  const handleKeyup = (e) => {
    const command = commandMap[e.code];
    if (command) {
      // 按键抬起的时候删除该指令：
      removeCommand(command);
    }
  };

  onMounted(() => {
    game.ticker.add(handleTicker); // 不停的执行帧循环
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);
  });

  onUnmounted(() => {
    game.ticker.remove(handleTicker);
    window.removeEventListener("keydown", handleKeydown);
    window.removeEventListener("keyup", handleKeyup);
  });

  return {
    x: moveX,
    y: moveY,
  };
};