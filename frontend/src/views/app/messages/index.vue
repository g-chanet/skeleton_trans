<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <h2>Conversations</h2>
        <div v-for="conversation in conversations" :key="conversation.id" class="conversation" @click="selectConversation(conversation)">
          {{ conversation.user }}
        </div>
      </div>
      <div class="col-md-8">
        <div v-if="selectedConversation">
          <h2>Conversation with {{ selectedConversation.user }}</h2>
          <div v-for="message in selectedConversation.messages" :key="message.id" class="message">
            <strong>{{ message.sender }}</strong>: {{ message.content }}
          </div>
          <div class="input-group mt-3">
            <input v-model="newMessage" type="text" class="form-control" placeholder="Type your message here..." @keyup.enter="sendMessage">
            <button @click="sendMessage" class="btn btn-primary">Send</button>
          </div>
        </div>
        <div v-else>
          <p>No conversation selected.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const conversations = ref([
  {
    id: 1,
    user: 'Robin',
    messages: [
      { id: 1, sender: 'Robin', content: 'Je suis fromage.' },
      { id: 2, sender: 'You', content: 'Euh lâche moi mec' },
      { id: 3, sender: 'Robin', content: 'Non non je suis reblochon!' },
    ],
  },
  {
    id: 2,
    user: 'Adel',
    messages: [
      { id: 1, sender: 'You', content: 'Hey' },
      { id: 2, sender: 'Adel', content: 'Je suis recherché par le fisc français' },
    ],
  },
]);

const selectedConversation = ref(null);
const newMessage = ref('');

const selectConversation = conversation => {
  selectedConversation.value = conversation;
};

const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    const newId = selectedConversation.value.messages.length + 1;
    selectedConversation.value.messages.push({
      id: newId,
      sender: 'You',
      content: newMessage.value.trim(),
    });
    newMessage.value = '';
  }
};
</script>

<style scoped lang="sass">
.container
  margin-top: 20px

.row
  height: calc(100vh - 40px)

.col-md-4,
.col-md-8
  border: 1px solid #ccc
  padding: 10px
  overflow-y: auto

.col-md-4
  max-height: 100%

.col-md-8
  max-height: 100%

.conversation
  cursor: pointer
  margin-bottom: 10px

.message
  margin-bottom: 10px
</style>

