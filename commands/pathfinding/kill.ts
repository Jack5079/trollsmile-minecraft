import { Bot, Message } from '../../utils/types'
export async function run (this: Bot, message: Message, args: string[]): Promise<string | void> {
  // @ts-expect-error Not in typescript definition, yet.
  pathfinder.setGoal(null);
  if (!this.pathfinder.isMoving()) {
    // this.entity.position = message.author.entity.position.offset(0, 255, 0)
    // const p = message.author.entity.position
    // await this.creative.flyTo(p)
    // this.attack(message.author.entity)
    if (args.join('').length) {
      if (this.players[args.join('_')] && this.players[args.join('_')].entity) {
        this.pvp.attack(this.players[args.join('_')].entity)
      }
      // Object.values(this.entities).filter(ent => ent.name === )
    } else {
      this.pvp.attack(message.author.entity)
    }
  } else return "Already performing a task!"
}
export const help = 'die!'
export const aliases = ['killme', 'die']
