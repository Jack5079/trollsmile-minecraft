import { Bot, Message } from '../../utils/types'

export async function run (this: Bot, message: Message, args: string[]): Promise<string | void> {
  this.pvp.stop()
  const times = Number(args.join('').replace(/\D/g, '')) || 1
  await new Promise(resolve => this.collectBlock.collect(this.findBlocks({
    matching: block => block.name === args.filter(string => !Number(string)).join('_').replace(/\d/g, '').toLowerCase() && block.diggable,
    maxDistance: Infinity,
    count: times
  }).map(vec => this.blockAt(vec)).filter((block): block is any => block !== null), {
    chestLocations: this.findBlocks({
      matching: block => block.name === 'chest',
      maxDistance: 1000,
      count: 1000
    }),
    append: true
  }, resolve))

  return 'done you lazy ass'
}
export const help = 'steals an item'
export const aliases = ['get']
