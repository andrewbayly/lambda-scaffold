import AbortController from 'abort-controller'
import fetch from 'node-fetch'

class DogsService {
  static async getDogs(abortController: AbortController): Promise<string[]> {
    const res = await fetch('https://dog.ceo/api/breeds/list/all', {
      signal: abortController.signal,
    })

    const payload = await res.json()

    const breeds = payload.message

    const result = Object.keys(breeds)
      .map((breed: string) =>
        [breed].concat(breeds[breed].map((subbreed: string) => `${subbreed} ${breed}`)),
      )
      .reduce((acc, val) => acc.concat(val), [])

    return result
  }
}

export { DogsService }
