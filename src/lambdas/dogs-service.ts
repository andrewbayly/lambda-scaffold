import AbortController from 'abort-controller'
import fetch from 'node-fetch'

class DogsService {
  static async getDogs(abortController: AbortController): Promise<string[]> {
    const res = await fetch('https://dog.ceo/api/breeds/list/all', {
      signal: abortController.signal,
    })

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

    return result
  }
}

export { DogsService }
