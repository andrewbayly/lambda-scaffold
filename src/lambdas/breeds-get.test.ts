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

describe('breeds-get handler fail with timeout', () => {
  beforeEach(() => {
    mockedFetch.mockImplementationOnce(() => {
      throw new Error('The user aborted a request.')
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
