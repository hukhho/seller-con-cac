import axios from "axios"

let baseURL = "https://admin.sneakerss.net1"

// deprecated
if (process.env.GATSBY_STORE_URL) {
  baseURL = process.env.GATSBY_STORE_URL
}

// takes precedence over GATSBY_STORE_URL
if (process.env.GATSBY_MEDUSA_BACKEND_URL) {
  baseURL = process.env.GATSBY_MEDUSA_BACKEND_URL
}

const client = axios.create({ baseURL })

export default function medusaRequest(method, path = "", payload = {}) {
  const options = {
    method,
    withCredentials: true,
    url: path,
    data: payload,
    json: true,
    headers: { Cac: "cac" },
  }
  console.log("medusaRequest: method", method, " options: ", options)
  return client(options)
}

export const multipartRequest = (path, payload) => {
  const options = {
    withCredentials: true,
    headers: {
      "content-type": "multipart/form-data",
    },
  }

  return client.post(path, payload, options)
}
