import fetch from 'node-fetch'
import { handler } from './breeds-get'

const mockedFetch: jest.Mock = fetch as any

jest.mock('node-fetch')

describe('breeds-get handler', () => {
  const mockMessage = {
    message: { affenpinscher: [], african: [], airedale: [], sheepdog: ['english', 'shetland'] },
    status: 'success',
  }

  const payload = [
    'affenpinscher',
    'african',
    'airedale',
    'sheepdog',
    'english sheepdog',
    'shetland sheepdog',
  ]

  beforeEach(() => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        return mockMessage
      },
    })
  })

  it('returns payload from fetch request', async () => {
    const response = await handler(1000)
    expect(response.body).toEqual(payload)
  })
})

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('breeds-get handler fail with timeout', () => {
  const mockMessage = {
    message: { affenpinscher: [], african: [], airedale: [], sheepdog: ['english', 'shetland'] },
    status: 'success',
  }

  beforeEach(() => {
    mockedFetch.mockReturnValueOnce({
      json: async () => {
        await sleep(1000)
        return mockMessage
      },
    })
  })

  it('returns error from fetch request with short timeout', async () => {
    const response = await handler(10)
    expect(response.error).toEqual('Error: The user aborted a request.')
  })
})

/*
describe('breeds-get handler no mock', () => {

  let result = ['affenpinscher', 'african', 'airedale']; 
  it('returns payload from fetch request', async () => {
    const response = await handler(1000)
    expect(response.body.slice(0, 3)).toEqual(result)
  })

  it('returns error from fetch request with short timeout', async () => {
    const response = await handler(10)
    expect(response.error).toEqual('AbortError: The user aborted a request.')
  })

})
*/
