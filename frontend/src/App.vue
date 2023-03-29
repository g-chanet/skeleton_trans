

<template>
  <header>
    <div>
      <div v-for="item in items" :key="item">
        {{ item.message }}
      </div>
      <input v-model="msg" />
      <button @click="onSendMessage">SEND</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed, ref } from 'vue';

const msg = ref('')

const onSendMessage = () => {
  mutate({ createMessageInput: { message: msg.value } })
  msg.value = ''
}

const { mutate, onDone } = useMutation(gql`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(CreateMessageInput: $createMessageInput) {
      message
      uuid
    }
}`)

onDone(() => refetch())


const { result, refetch } = useQuery(gql`
  query Query {
    findAllMessages {
      message
      uuid
    }
  }
`)

const items = computed(() => result.value?.findAllMessages)

</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
