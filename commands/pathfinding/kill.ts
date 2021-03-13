import { Player } from 'mineflayer'
import { Bot, Message } from '../../utils/types'
function kill (this: Bot, ent: Player['entity']) {
  // maybe make it teleport to the entity?
  this.pvp.attack(ent)
}
export async function run (this: Bot, message: Message, args: string[]): Promise<string | void> {
  await new Promise(resolve => this.collectBlock.cancelTask(resolve))
  this.pvp.stop()
  if (!this.pathfinder.isMoving()) {
    // this.entity.position = message.author.entity.position.offset(0, 255, 0)
    // const p = message.author.entity.position
    // await this.creative.flyTo(p)
    // this.attack(message.author.entity)
    if (args.join('').length && args.join('') !== this.username) {
      if (this.players[args.join('_')] && this.players[args.join('_')].entity) {
        kill.call(this, this.players[args.join('_')].entity)
      }
      // Object.values(this.entities).filter(ent => ent.name === )
    } else {
      kill.call(this, message.author.entity)
    }
  } else return "Already performing a task!"
}
export const help = 'die!'
export const aliases = ['killme', 'die']
