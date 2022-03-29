import { get } from './utils'
jest.unmock('./utils')

describe('utils', () => {
  it('get ok', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ result: 'test' })
    })

    const data = await get('test')
    expect(data).toStrictEqual({ result: 'test' })
  })

  it('get ko', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ result: 'test' })
    })

    await expect(get('test')).rejects.toEqual({ result: 'test' })
  })
})
