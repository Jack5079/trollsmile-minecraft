import { Bot } from '../utils/types'
export function run (this: Bot): string {
  this.physics.gravity *= -1
  return this.physics.gravity > 0 ? 'off' : 'on'
}
export const help = 'oh god oh fuck'
export const aliases = []
