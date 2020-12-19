import { ChatMessage } from 'mineflayer'
import { Bot } from '../utils/types'
const random = <Type> (arr: Type[]): Type => arr[Math.floor(Math.random() * arr.length)]

export default function (this: Bot, msg: ChatMessage) {
  if (msg.with && msg.with[1] && msg.with[1].text === this.username) {
    const victim = msg.with[0].text
    this.chat(random([
      'ez',
      'get owned',
      'you are shit',
      'your antideath is shit skid',
      'get gud',
      'i hate women',
      'you are Workspace.FilteringEnabled and i am roblox',
      'do the google+',
      'go to theannoyingsite.com for free minecoins',
      'stupid bitch',
      'https://roblox.com/library/6097735425',
      `${this.username} winning`,
      `${victim} gets zero pussy`
    ]))
  }
}
