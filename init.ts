import Collection from '@discordjs/collection'
import { readdirSync } from 'fs'
import { BotOptions, createBot } from 'mineflayer'
import { basename } from 'path'
import { rreaddir } from './utils/rreaddir'
import { Bot, CommandObj } from './utils/types'
import { pathfinder } from 'mineflayer-pathfinder'

const local = true
const options: BotOptions = {
  username: 'trollsmile',
  host: local ? '127.0.0.1' : 'Jack5079.aternos.me',
  port: local ? 25565 : 17397,
  mainHand: 'left' as 'left', // trollsmile is left handed just like me
  viewDistance: 'far' as 'far',
  logErrors: true
}

const bot = createBot(options) as Bot

bot.commands = new Collection
bot.aliases = new Collection
bot.options = options
bot.setMaxListeners(Infinity)

bot.once('spawn', async () => {
  const files = await rreaddir('./commands/')
  const entries: [string, CommandObj][] = await Promise.all(
    files // get the file names of every command in the commands folder
      .filter(filename => filename.endsWith('.js')) // only ones with `.js` at the end
      .map(async (file): Promise<[string, CommandObj]> => [
        basename(file, '.js'), // Remove folders from the path and .js, leaving only the command name
        {
          help: 'A command without a description', // this will be overwritten by the real description if it is there
          ...(await import(`${process.cwd()}/${file}`)),
          path: require.resolve(`${process.cwd()}/${file}`)
        }
      ]) // convert filenames to commands
  )

  entries.forEach(([name, command]) => {
    bot.commands.set(name, command)
    command.aliases?.forEach(alias => {
      bot.aliases.set(alias, name)
    })
  })
  bot.chat('trollsmile loaded!')
}).loadPlugin(pathfinder)
// Load in events
readdirSync('./events/')
  .filter(name => name.endsWith('.js'))
  .map(name => name.replace('.js', ''))
  .forEach(async (filename: any) => {
    const ev = (await import('./events/' + filename)).default
    bot.on(filename, (...stuff: any[]) => {
      ev.call(bot, ...stuff)
    })
  })
