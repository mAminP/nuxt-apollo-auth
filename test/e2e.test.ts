import { createPage, setupTest } from '@nuxt/test-utils'
import { ElementHandle, Page } from 'playwright'

// jest.setTimeout(60e+3)
// jest.useFakeTimers()
describe('end to end test', () => {
  let page:Page| undefined
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
    page = await createPage('/')

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const state = await page.evaluate(() => window.__NUXT__.state)
    expect(state.qAuth).toEqual({
      user: undefined,
      token: undefined
    })

    // await page.close()
  })
  it('renders page /', async () => {
    // const page = await createPage('/')
    const html = await (await page.$('.state') as ElementHandle).innerHTML()
    expect(html).toContain('No')
    // await page.close()
  })

  it('login', async () => {
    // const page = await createPage('/')
    await page.waitForFunction('!!window.$nuxt')

    const { response: { success }, loggedIn, token, user } =
            await page.evaluate(async () => {
              const response = await window.$nuxt.$qAuth.login({
                data: {
                  email: 'alice@email.com',
                  password: 'pAsSWoRd!'
                }
              })
              return {
                response,
                loggedIn: window.$nuxt.$qAuth.loggedIn,
                user: window.$nuxt.$qAuth.user,
                // TODO create a getToken fnc
                token: window.$nuxt.$apolloHelpers.getToken() // window.$nuxt.$store.state.qAuth.token
              }
            })
    const html = await page.innerHTML('.state')

    expect(success).toBeTruthy()
    expect(token).toBeDefined()
    expect(user).toBeDefined()
    expect(user.name).toBe('Alice')
    expect(loggedIn).toBe(true)
    expect(html).toContain(JSON.stringify(user, undefined, 2))

    await page.close()
  })

  it('login failed', async () => {
    page = await createPage('/')
    await page.waitForFunction('!!window.$nuxt')

    await page.evaluate(async () => {
      const res = await window.$nuxt.$qAuth.login({ data: { email: 'alice@email.com', password: 'wrongPassword' } })
      return {
        ...res,
        loggedIn: window.$nuxt.$qAuth.loggedIn
      }
    }).catch((e) => {
      console.log('e :>> ', e)
    })
    // const html = await page.innerHTML('.state')

    expect(page.evaluate).toThrowError()
    // expect(token).toBeDefined()
    // expect(user).toBeDefined()
    // expect(loggedIn).toBe(true)
    // expect(html).toContain(JSON.stringify(user,undefined,2))

    await page.close()
  })
})
