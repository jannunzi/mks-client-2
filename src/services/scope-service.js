import {SCOPE_API_BASE_URL} from "../config"

const scopeUrl = `${SCOPE_API_BASE_URL}/scope`
const scopeStreamsUrl = `${SCOPE_API_BASE_URL}/scope/streams`

export const scope = () =>
  fetch(scopeUrl)
    .then(response => response.json())

export const scopeStreamsStream = (stream) =>
  fetch(`${scopeStreamsUrl}/${stream}`)
    .then(response => response.json())

export const findAllRenders = () =>
  fetch(`${scopeUrl}/renders`)
    .then(response => response.json())

export const findAllCaptures = () =>
  fetch(`${scopeUrl}/captures`)
    .then(response => response.json())
    .then(captures => {
      const renderPromises = captures.captures.map(capture =>
      {
        return findRenderBySerial(capture['render-ids'][0])
      })
      return Promise.all(renderPromises)
        .then(renders => {
          renders.forEach((render, ndx) => {
            captures.captures[ndx]['renders'] = [render]
          })
          return captures
        })
    })

export const findRenderBySerial = (serial) =>
  fetch(`${scopeUrl}/renders/${serial}`)
    .then(response => response.json())

export const runScopeCaptureRequest = (
  scopeCaptureRequest, captureName = 'mks') =>
  fetch(`${scopeUrl}/captures/${captureName}`, {
    method: 'POST',
    body: JSON.stringify(scopeCaptureRequest),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())

export const deleteCapture = (captureName) =>
  fetch(`${scopeUrl}/captures/${captureName}`, {
    method: 'DELETE'
  })

export default {
  scope, scopeStreamsStream,

  findAllRenders, runScopeCaptureRequest,

  findAllCaptures, deleteCapture
}
