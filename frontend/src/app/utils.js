export const serverUrl = 'http://localhost:3080/'

const jsonResponse = async (response) => {
  const result = await response.json()
  if (!response.ok) {
    throw result
  }
  return result
}

export const get = async (url) => {
  const response = await window.fetch(url)
  return jsonResponse(response)
}
