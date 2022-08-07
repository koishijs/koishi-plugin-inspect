import { Context, Schema } from 'koishi'

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

      return session.text('.message', session)
    })
}
