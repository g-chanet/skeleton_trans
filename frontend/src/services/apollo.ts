import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { DefaultApolloClient } from "@vue/apollo-composable"
import type { App } from 'vue'


const getHeaders = () => {
  const headers: any = {}
  const token = localStorage.getItem(`token`)
  if (token) {
    headers[`Authorization`] = `Bearer ${token}`
  }
  headers[`Content-Type`] = `application/json`
  return headers
}

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: `/graphql`,
  fetch: (uri: RequestInfo, options: RequestInit) => {
    options.headers = getHeaders()
    return fetch(uri, options)
  },
})





// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

export const apollo = {
  install(app: App) {
    app.provide(DefaultApolloClient, apolloClient)
  },
}