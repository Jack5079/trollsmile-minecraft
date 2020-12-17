import { Bot, Message } from '../../utils/types'
export async function run (this: Bot, message: Message): Promise<string | void> {
  if (!this.pathfinder.isMoving()) {
    this.entity.position = message.author.entity.position.offset(0, 255, 0)
    const p = message.author.entity.position
    await this.creative.flyTo(p)
    this.attack(message.author.entity)
  } else return "Already performing a task!"
}
export const help = 'die!'
export const aliases = ['killme', 'die']
