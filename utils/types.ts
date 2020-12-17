import { Bot as mineBot, BotOptions, Player } from 'mineflayer'
import Collection from '@discordjs/collection'
import { Pathfinder } from 'mineflayer-pathfinder'
import { CollectBlock } from 'mineflayer-collectblock'

export interface Message {
  author: Player
  content: string
}


export interface CommandObj {
  run: (this: Trollsmile, message: Message, args: string[]) => string | Promise<string> | void | Promise<void>,
  help: string,
  path: string,
  aliases?: string[]
}

interface Trollsmile extends mineBot {
  commands: Collection<string, CommandObj>
  aliases: Collection<string, string>
  pathfinder: Pathfinder
  options: BotOptions
  collectBlock: CollectBlock
  pvp: any
}
export {
  Trollsmile as Bot
}
