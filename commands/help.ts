import { Bot } from '../utils/types'
export function run (this: Bot): string {
  return this.commands.map((cmd, name)=>`${name} ${cmd.aliases?.length ? `(AKA ${cmd.aliases.join()})`: ''} - ${cmd.help}`).join('\n')
}
export const help = 'see all da commands'
export const aliases = ['cmds', 'commands', 'all']
