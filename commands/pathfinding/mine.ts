import { Bot, Message } from '../../utils/types'
import { Vec3 } from 'vec3'

export async function run (this: Bot, message: Message, args: string[]): Promise<string | void> {
  if (!this.pathfinder.isMoving()) {
    const times = Number(args.join('').replace(/\D/g, '')) || 1
    await new Promise(resolve => this.collectBlock.collect(this.findBlocks({
      matching: block => block.name === args.filter(string => !Number(string)).join('_').replace(/\d/g, '').toLowerCase() && block.diggable,
      maxDistance: 1000,
      count: times
    }).map(vec => this.blockAt(vec as unknown as Vec3)).filter((block): block is any => block !== null), resolve))
    return 'done you stupid bitch'
  } else throw "Already performing a task!"
}
export const help = 'steals an item'
export const aliases = ['get']
