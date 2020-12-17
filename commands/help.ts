import { Bot, Message } from '../utils/types'
export async function run (this: Bot, message: Message, args: string[]): Promise<string | void> {
  return this.commands.map((cmd, name)=>`${name} ${cmd.aliases?.length ? `(AKA ${cmd.aliases.join()})`: ''} - ${cmd.help}`).join('\n')
}
export const help = 'see all da commands'
export const aliases = ['cmds', '', 'commands', 'all']
