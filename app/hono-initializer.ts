import { apiReference } from '@scalar/hono-api-reference'
import { Hono } from 'hono'
import { openAPISpecs } from 'hono-openapi'
import { cors } from 'hono/cors'
import { getConnInfo } from 'hono/deno'
import { ipRestriction } from 'hono/ip-restriction'
import { logger } from 'hono/logger'
import { poweredBy } from 'hono/powered-by'

export const initializedHono = new Hono()

initializedHono.use(
    poweredBy(),
    logger(),
    ipRestriction(getConnInfo, {
        denyList: [],
        allowList: [ '127.0.0.1', '::1' ],
    }),
    cors(),
)

initializedHono.get(
    '/openapi.json',
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    openAPISpecs(initializedHono, {
        documentation: {
            info: {
                title: 'Hello world',
                version: '1.0.0',
                description: 'For example',
            },
            components: {
                securitySchemes: {
                    basicAuth: {
                        type: "http",
                        scheme: "basic",
                    },
                },
            },
            servers: [
                {
                    url: `http://${ Deno.env.get('APP_HOST') || 'localhost' }:${ +Deno.env.get('APP_PORT')! || 8000 }`,
                    description: 'Local server',
                },
            ],
        },
    }),
)

initializedHono.get(
    '/docs',
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    apiReference({
        pageTitle: 'Hono API Reference Demo',
        theme: 'deepSpace',
        spec: {
            url: "/openapi.json",
        },
    }),
)

