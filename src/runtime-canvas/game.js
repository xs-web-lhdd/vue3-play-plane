import {
  Application
} from 'pixi.js'
import {
  stage
} from '../config/index'

export const game = new Application(stage)
document.body.append(game.view)

// game.stage
export default function getRootContainer() {
  return game.stage
}