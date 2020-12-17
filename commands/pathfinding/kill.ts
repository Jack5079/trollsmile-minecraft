import { Player } from 'mineflayer'
import { Bot, Message } from '../../utils/types'
function getPlayer (bot: Bot, args: string[]): Player | void {
  return Object.values(bot.players).find(plr => ( // you can tell i do roblox scripts when you see i put plr
    plr.username.toLowerCase() === args.join('_').toLowerCase()
  ))
}
export async function run (this: Bot, message: Message, args: string[]): Promise<string | void> {
  await new Promise(resolve => this.collectBlock.cancelTask(resolve))
  if (!this.pathfinder.isMoving()) {
    // this.entity.position = message.author.entity.position.offset(0, 255, 0)
    // const p = message.author.entity.position
    // await this.creative.flyTo(p)
    // this.attack(message.author.entity)
    if (args.join('').length) {
      const player = getPlayer(this, args)
      if (player && player.entity) {
        this.pvp.attack(player)
      } else {
        const ent = this.nearestEntity(ent => ent.mobType?.toLowerCase() === args.join('_').toLowerCase())
        if (ent) {
          this.pvp.attack()
        }
      }
    } else {
      this.pvp.attack(message.author.entity)
    }
  } else return "Already performing a task!"
}
export const help = 'die!'
export const aliases = ['killme', 'die']
