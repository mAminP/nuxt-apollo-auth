import { createPage, setupTest } from '@nuxt/test-utils'

// jest.setTimeout(60e+3)
// jest.useFakeTimers()
describe('end to end test', () => {

    setupTest({
        browser: true,
        setupTimeout: 100e3,
        browserOptions: {
            type: 'chromium',
            launch: {
                headless: false
            }
        }
    })

    it('initial state', async () => {
        const page = await createPage('/')

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const state = await page.evaluate(() => window.__NUXT__.state)
        expect(state.qAuth).toEqual({
            user: undefined,
            token: undefined
        })

        await page.close()
    })
    it('renders page /', async () => {
        const page = await createPage('/')
        const html = await page.innerHTML('.state')
        expect(html).toContain('No')

        await page.close()
    })

    
    it('login', async () => {
        const page = await createPage('/')
        await page.waitForFunction('!!window.$nuxt')

        const { user, token, success,loggedIn } = await page.evaluate(async () => {
            const res = await window.$nuxt.$qAuth.login({
                data: {
                    email: 'alice@email.com',
                    password: 'pAsSWoRd!'
                }
            })
            return {
                ...res,
                loggedIn: window.$nuxt.$qAuth.loggedIn
            }
        })


        expect(success).toBeTruthy()
        expect(token).toBeDefined()
        expect(user).toBeDefined()
        expect(loggedIn).toBe(true)

        await page.close()
    })
})