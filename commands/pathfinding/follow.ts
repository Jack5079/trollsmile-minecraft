import { Bot, Message } from '../../utils/types'
import { goals, Movements } from 'mineflayer-pathfinder'
import MinecraftData from 'minecraft-data'
export async function run (this: Bot, message: Message): Promise<string | void> {
  // @ts-expect-error Not in typescript definition, yet.
  this.pathfinder.setGoal(null)
  if (!this.pathfinder.isMoving()) {
    const data = MinecraftData(this.version)
    // We create different movement generators for different type of activity
    const defaultMove = new Movements(this, data)
    this.pathfinder.setMovements(defaultMove)
    this.pathfinder.setGoal(new goals.GoalFollow(message.author.entity, 1), true)
  } else return "Already performing a task!"
}
export const help = 'hello!'
export const aliases = ['come', 'bring', 'max']
