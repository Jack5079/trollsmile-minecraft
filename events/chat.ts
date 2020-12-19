import { getCommand } from '../utils/parse'
import { Bot, Message } from '../utils/types'

export default async function (this: Bot, username: string, msg: string) {
  const message: Message = {
    author: this.players[username],
    content: msg
  }

  // When a message is sent
  if (message.author?.username === this.username) return

  const prefix = '-' // bot prefix

  const name = [...this.commands.keys(), ...this.aliases.keys()].find(
    cmdname =>
      message.content.startsWith(`${prefix}${cmdname} `) || // matches any command with a space after
      message.content === `${prefix}${cmdname}` // matches any command without arguments
  ) || ''

  const command = getCommand(this, name)?.run || (() => { })

  try {
    const output = await command.call(
      this,
      message,
      // The arguments
      message.content
        .substring(prefix.length + 1 + name.length) // only the part after the command
        .split(' '), // split with spaces
    )

    if (output && message.author) this.chat(output)
  } catch (err) {
    this.chat('§4[ERROR]§r ' + err)
  }
}
