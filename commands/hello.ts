import { Bot, Message } from '../utils/types'
export async function run (this: Bot, message: Message, args: string[]): Promise<string | void> {
  return `Hello, world! My name is ${this.username}, and you are named ${message.author.username}. The arguments you gave me are: ${args}`
}
export const help = 'A new command'
export const aliases = []
