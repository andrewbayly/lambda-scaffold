import AbortController from 'abort-controller'
import { Response } from './types'
import { DogsService } from './dogs-service'

interface BreedsResponse extends Response {
  body: string[]
  error: string
}

export async function handler(requestTimeout: number): Promise<BreedsResponse> {
  const controller = new AbortController()

  const timeout = setTimeout(() => {
    controller.abort()
  }, requestTimeout)

  try {
    const result = await DogsService.getDogs(controller)

    return {
      statusCode: 200,
      body: result,
      error: '',
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: [],
      error: error.toString(),
    }
  } finally {
    clearTimeout(timeout)
  }
}
