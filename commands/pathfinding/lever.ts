import MinecraftData from 'minecraft-data'
import { goals, Movements } from 'mineflayer-pathfinder'
import { Vec3 } from 'vec3'
import { Bot } from '../../utils/types'
export async function run (this: Bot): Promise<string | void> {
  await new Promise(resolve => this.collectBlock.cancelTask(resolve))
  this.pvp.stop()
  this.pathfinder.setGoal(null as unknown as goals.Goal)
  const data = MinecraftData(this.version)
  const defaultMove = new Movements(this, data)
  this.pathfinder.setMovements(defaultMove)
  const lever = this.findBlock({
    matching: block => block.name === 'lever',
    maxDistance: 1000,
    count: 1
  }) as unknown as Vec3
  if (lever) {
    await new Promise(resolve => this.pathfinder.goto(new goals.GoalGetToBlock(lever.x, lever.y, lever.z), resolve))
    const block = this.blockAt(lever)
    if (block) {
      await new Promise<void>((resolve, reject) => this.activateBlock(block, err => err ? reject(err) : resolve()))
      return 'flicked da lever'
    } else return 'could not find the fucking block somehow did you fucking get rid of it you stupid bitch'
  } else return 'fuck you no lever'

}
export const help = 'Walks up to the nearest lever and flicks it'
export const aliases = []
