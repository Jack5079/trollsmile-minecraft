import { Bot, Message } from '../../utils/types'
import { goals, Movements } from 'mineflayer-pathfinder'
import MinecraftData from 'minecraft-data'
import { Vec3 } from 'vec3'

export async function run (this: Bot, _: Message, args: string[]): Promise<string | void> {
  if (!this.pathfinder.isMoving()) {
    const times = Number(args.join('').replace(/\D/g, '')) || 1
    const mcData = MinecraftData(this.version)
    let a = 0
    for (const _ of Array(times).fill(1)) {
      // We create different movement generators for different type of activity
      const defaultMove = new Movements(this, mcData)
      const [position] = this.findBlocks({
        matching: block => block.name === args.filter(string => !Number(string)).join('_').replace(/\d/g, '').toLowerCase() && block.diggable,
        maxDistance: 1000
      }) as unknown as Vec3[]
      console.log(position)
      if (position) {
        this.pathfinder.setMovements(defaultMove)
        await new Promise(resolve => this.pathfinder.goto(new goals.GoalNear(position.x, position.y, position.z, 2), resolve))
        const block = this.blockAt(position) as any
        await this.dig(block)
        this.chat(`Mined a block! ${(++a / times) * 100}% complete.`)
      } else return this.chat('could not find a ' + args.join(' '))
    }
    this.chat('done you stupid bitch')
  } else return "Already performing a task!"
}
export const help = 'steals an item'
export const aliases = ['get']
