import { Bot, Message } from '../utils/types'
export function run (this: Bot, message: Message, args: string[]): string {
  return `Hello, world! My name is ${this.username}, and you are named ${message.author.username}. The arguments you gave me are: ${args}`
}

export const help = 'hello world!'
export const aliases = []
