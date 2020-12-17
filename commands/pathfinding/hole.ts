import { Bot } from '../../utils/types'
import { goals, Movements } from 'mineflayer-pathfinder'
import MinecraftData from 'minecraft-data'
export async function run (this: Bot): Promise<string | void> {
  const data = MinecraftData(this.version)
  // We create different movement generators for different type of activity
  const defaultMove = new Movements(this, data)
  this.pathfinder.setMovements(defaultMove)
  this.pathfinder.setGoal(new goals.GoalY(5))
}
export const help = 'dwarf'
export const aliases = ['fall']
