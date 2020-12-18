import { Player } from 'mineflayer'
import { goals } from 'mineflayer-pathfinder'
import { Bot, Message } from '../../utils/types'
async function potion (this: Bot, plr: Player) {
  const { entity: { position } } = plr
  const { x, y, z } = position
  await new Promise<void>((resolve, reject) => this.pathfinder.goto(new goals.GoalNear(x, y, z, 5), err => err ? reject(err) : resolve()))
  await this.lookAt(position.offset(0, 1, 0))
  for (const item of this.inventory.slots.filter(Boolean).filter(item => item.name === 'splash_potion')) {
    await new Promise(r => setTimeout(r, 10))
    await this.equip(item, 'hand')
    this.activateItem()
  }
}
export async function run (this: Bot, message: Message, args: string[]): Promise<string | void> {
  await new Promise(resolve => this.collectBlock.cancelTask(resolve))
  if (!this.pathfinder.isMoving()) {
    // this.entity.position = message.author.entity.position.offset(0, 255, 0)
    // const p = message.author.entity.position
    // await this.creative.flyTo(p)
    // this.attack(message.author.entity)
    if (args.join('').length) {
      if (this.players[args.join('_')] && this.players[args.join('_')].entity) {
        potion.call(this, this.players[args.join('_')])
      }
      // Object.values(this.entities).filter(ent => ent.name === )
    } else {
      potion.call(this, message.author)
    }
  } else return "Already performing a task!"
}
export const help = 'die!'
export const aliases = ['killme', 'die']
