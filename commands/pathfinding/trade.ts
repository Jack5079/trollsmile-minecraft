import { Bot, Message } from '../../utils/types'
import { goals, Movements } from 'mineflayer-pathfinder'
import MinecraftData from 'minecraft-data'
export async function run (this: Bot, message: Message): Promise<string | void> {

  if (!this.pathfinder.isMoving()) {
    const villager = this.nearestEntity(ent => ent.mobType === 'Villager')
    if (villager) {
      this.chat('found da villager')
      const data = MinecraftData(this.version)

      const defaultMove = new Movements(this, data)
      this.pathfinder.setMovements(defaultMove)
      this.pathfinder.goto(new goals.GoalFollow(villager, 1), async () => {
        console.log(villager)
        if (villager.height <= 1) {
          this.chat('shit idiot baby')
          const spam = setInterval(() => this.attack(villager), 100)
          return setTimeout(() => clearInterval(spam), 1000)
        }
        const trade = await this.openVillager(villager)
        const deal = trade.trades.find((deal: any) => deal.inputItem1.name === 'emerald' && !deal.tradeDisabled && !deal.inputItem2.name)
        if (deal && villager.height >= 1) {
          const index = trade.trades.indexOf(deal)
          this.trade(trade, index).then(() => trade.close()).catch(reason => {
            if (reason.toString() === 'Not enough items to trade') {
              this.chat('villager is scamming... why would he do dat')
              // debugger

              trade.close()
              this.pvp.attack(villager)
            }
          })
        } else {
          this.chat('villager is scamming... why would he do dat')
          // debugger

          trade.close()
          this.pvp.attack(villager)
        }
      })
    } else return 'did not find villager...'
  } else return "Already performing a task!"
}
export const help = 'waste money (requires villager to be nearby and emeralds in trollsmile inv)'
export const aliases = ['wastemoney', 'wasteMoney']
