import { split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { DefaultApolloClient } from '@vue/apollo-composable'
import type { App } from 'vue'

const httpLink = new HttpLink({
  uri: `http://localhost:5173/graphql`
})

const wsLink = new GraphQLWsLink(createClient({
  url: `ws://localhost:5173/graphql`,
}))

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === `OperationDefinition` &&
      definition.operation === `subscription`
    )
  },
  wsLink,
  httpLink,
)

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

export const apollo = {
  install(app: App) {
    app.provide(DefaultApolloClient, apolloClient)
  },
}
