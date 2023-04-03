import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { DefaultApolloClient } from "@vue/apollo-composable"
import type { App } from 'vue'
import {  getHeadersGql } from './header'

// HTTP connection to the API
const link = createHttpLink({
  // You should use an absolute URL here
  uri: `/graphql`,
  fetch: (uri: RequestInfo, options: RequestInit) => {
    options.headers = getHeadersGql()
    return fetch(uri, options)
  },
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link,
  cache,
})

// Install apollo client
export const apollo = {
  install(app: App) {
    app.provide(DefaultApolloClient, apolloClient)
  },
}