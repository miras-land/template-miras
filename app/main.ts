import { initializedHono } from '@/app/hono-initializer.ts'
import { Hono } from 'hono'

export const app = new Hono()

function bootstrap()
{
    app.route('/', initializedHono)

    Deno.serve({
        key: Deno.env.get('APP_SSL_KEY') || undefined,
        cert: Deno.env.get('APP_SSL_CERT') || undefined,
        hostname: Deno.env.get('APP_HOST') || 'localhost',
        port: +Deno.env.get('APP_PORT')! || 8000,
    }, app.fetch)
}

void bootstrap()
