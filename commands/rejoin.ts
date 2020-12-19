import { exec } from 'child_process'
import { Writable } from 'stream'
import { Bot } from '../utils/types'
export function run (this: Bot): void {
  this.end()
  const proc = exec('node init')
  proc.stdout?.pipe(process.stdout)
  process.stdin.pipe(proc.stdin as Writable)
  proc.stderr?.pipe(process.stderr)
}
export const help = 'stop everything'
export const aliases = ['rj']
