import { Bot, Message } from '../utils/types'
export async function run (this: Bot, message: Message, args: string[]): Promise<string | void> {
  for (const item of this.inventory.slots.filter(Boolean)) {
    await this.tossStack(item)
  }
}
export const help = 'put everything down'
export const aliases = ['throwup', 'throwUp']
