import Collection from '@discordjs/collection'
import { readdirSync, existsSync as exists, readFileSync as readFile } from 'fs'
import { BotOptions, createBot } from 'mineflayer'
import { basename } from 'path'
import { rreaddir } from './utils/rreaddir'
import { Bot, CommandObj } from './utils/types'
import { pathfinder } from 'mineflayer-pathfinder'
import { plugin as collectBlock } from 'mineflayer-collectblock'
import { plugin as pvp } from 'mineflayer-pvp'
import armorManager from 'mineflayer-armor-manager'

// dotenv support
if (exists('./.env')) {
  Object.assign(process.env,
    Object.fromEntries(
      // Overwrite the env with the .env file
      readFile('./.env', 'utf-8')
        .split('\n') // split the file into lines
        .filter(line => !line.startsWith('#') && line) // remove comments and spacing
        .map(line => line.split('=')) // split the lines into key:value pairs
    ))
}

const offline = true
const options: BotOptions = {
  username: offline ? 'trollsmile' : process.env.EMAIL || '',
  password: offline ? undefined : process.env.PASSWORD,
  host: '127.0.0.1',
  mainHand: 'left' as 'left', // trollsmile is left handed just like me
  viewDistance: 'far' as 'far',
  logErrors: true
}

const bot = createBot(options) as Bot
bot.commands = new Collection
bot.aliases = new Collection
bot.options = options
bot.setMaxListeners(Infinity)

// @ts-ignore
globalThis.trollsmile = bot // debugging

bot.once('spawn', async () => {
  await bot.waitForChunksToLoad()//chat('trollsmile loaded!')
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
  setTimeout(() => {
    bot.setControlState('sneak', true)
    setTimeout(() => {
      bot.setControlState('sneak', false)
    }, 100)
  }, 100)
}).loadPlugins([
  pathfinder,
  armorManager,
  // @ts-expect-error
  collectBlock,
  // @ts-expect-error
  pvp
])

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
