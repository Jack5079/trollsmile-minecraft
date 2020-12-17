import { Bot, Message } from '../../utils/types'
import { goals, Movements } from 'mineflayer-pathfinder'
import MinecraftData from 'minecraft-data'
import { Vec3 } from 'vec3'

export async function run (this: Bot, _: Message, args: string[]): Promise<string | void> {
  const mcData = MinecraftData(this.version)
  // We create different movement generators for different type of activity
  const defaultMove = new Movements(this, mcData)
  const [position] = this.findBlocks({
    matching: block => block.name === args.join('_').toLowerCase() && block.diggable,
    maxDistance: 1000
  }) as unknown as Vec3[]
  console.log(position)
  if (position) {
    this.pathfinder.setMovements(defaultMove)
    this.pathfinder.goto(new goals.GoalNear(position.x, position.y, position.z, 2), async () => {
      const block = this.blockAt(position) as any
      await this.dig(block)

      this.chat('done you stupid bitch')
    })
  } else return 'could not find a ' + args.join(' ')
}
export const help = 'steals an item'
export const aliases = ['get']
