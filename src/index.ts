import { Context, Schema, segment } from 'koishi'

export const name = 'inspect'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.i18n.define('zh', require('./locales/zh'))

  ctx.command('inspect')
    .action(({ session }, target) => {
      if (session.quote) {
        return session.text('.message', {
          ...session.quote,
          selfId: session.selfId,
        })
      }

      if (target) {
        const { type, data } = segment.parse(target)[0]
        if (type === 'at') {
          return session.text('.user', data)
        } else if (type === 'sharp') {
          return session.text('.channel', data)
        } else {
          return session.text('.invalid')
        }
      }

      return session.text('.message', session)
    })
}
