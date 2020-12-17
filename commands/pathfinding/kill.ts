import { Bot, Message } from '../../utils/types'
export async function run (this: Bot, message: Message): Promise<string | void> {
  this.entity.position = message.author.entity.position.offset(0, 255, 0)
  const p = message.author.entity.position
  await this.creative.flyTo(p)
  this.attack(message.author.entity)
}
export const help = 'die!'
export const aliases = ['killme', 'die']
