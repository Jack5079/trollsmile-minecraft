import { Bot } from '../../utils/types'
import { Vec3 } from 'vec3'

export async function run (this: Bot): Promise<string | void> {

  await new Promise(resolve => this.collectBlock.cancelTask(resolve))
  if (!this.pathfinder.isMoving()) {
    await new Promise(resolve => this.collectBlock.collect(Object.values(this.entities).filter(ent => ent.objectType === 'Item'), {
      chestLocations: this.findBlocks({
        matching: block => block.name === 'chest',
        maxDistance: 1000,
        count: 1000
      }) as unknown as Vec3[],
      append: true
    }, resolve))
    return 'done you stupid bitch'
  } else throw "Already performing a task!"
}
export const help = 'steals items on the ground'
export const aliases = ['drops']
