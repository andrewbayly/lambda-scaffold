import fetch from 'node-fetch'
import AbortController from 'abort-controller'
import { Response } from './types'

interface BreedsResponse extends Response {
  body: string[]
  error: string
}

export async function handler(requestTimeout: number): Promise<BreedsResponse> {
  const controller = new AbortController()

  let timedout = false

  const timeout = setTimeout(() => {
    controller.abort()
    timedout = true
  }, requestTimeout)

  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all', { signal: controller.signal })

    const payload = await res.json()

    const breeds = payload.message

    const result = []

    const breedKeys = Object.keys(breeds)

    for (let i = 0; i < breedKeys.length; i += 1) {
      const breed = breedKeys[i]
      result.push(breed)
      const subbreeds = breeds[breed]
      for (let j = 0; j < subbreeds.length; j += 1) {
        result.push(`${subbreeds[j]} ${breed}`)
      }
    }

    if (timedout) throw new Error('The user aborted a request.')

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
