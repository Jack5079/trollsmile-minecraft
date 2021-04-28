import { ChatMessage } from 'mineflayer'
import { Bot } from '../utils/types'
const random = <Type> (arr: Type[]): Type => arr[Math.floor(Math.random() * arr.length)]

export default function (this: Bot, msg: ChatMessage) {
  console.log(msg.toAnsi())
  if (msg.with && msg.with[1] && msg.with[1].text === this.username) {
    const victim = msg.with[0].text
    this.chat(random([
      'ez',
      'get owned',
      'you are shit',
      'get shit on shitter',
      'GET GOOD GET LMAOBOX',
      'go play fortnite bitch',
      'imagine being that bad',
      'get off the ground loser',
      'log off',
      'i hate women',
      'do the google+',
      'go to theannoyingsite.com for free minecoins',
      'stupid bitch',
      'https://roblox.com/library/6097735425', // bragle
      'https://youtu.be/RVw_c2-Xr9Y', // impact install tutorial
      `${this.username} winning`,
      `${this.username} on top`,
      `${victim} gets zero pussy`,
      'trollar face'
    ]))
  }
}
