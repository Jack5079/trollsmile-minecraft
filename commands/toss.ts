import { Bot } from '../utils/types'
export async function run (this: Bot): Promise<void> {
  for (const item of this.inventory.slots.filter(Boolean)) {
    if (item) {
      await this.tossStack(item)
    }
  }
}
export const help = 'put everything down'
export const aliases = ['throwup', 'throwUp']
