<template>
  <div class="messages-container">
    <div class="convesations-container">
      <h1>Discussions</h1>
      <div class="convesations-list-container">
        <div>partie1</div>
        <div>partie2</div>
        <div>partie3</div>
      </div>
    </div>
    <div class="active-conversation-container">
      <h1>userX</h1>
      <div class="active-conversation">
        <div>message</div>
        <div>message</div>
        <div>message</div>
        <div>message</div>
        <div>message</div>
      </div>
    </div>
    <div class="active-conversation-profile-container">
      <div>profile picture</div>
      <div>name</div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
<style scoped lang="sass">
.messages-container
  width: 100%
  display: flex
  flex-direction: row
  justify-content: space-between
  border-radius:20px

.convesations-container
  background: red
  border-radius: 20px
  width: 100%
  z-index: 1

.convesations-list-container
  display: flex
  flex-direction: column
  gap:20px
  flex:1
  overflow-y: scroll
  div
    min-height: 80px
    background: red
.active-conversation-container
  width: 100%
  z-index: 0

.active-conversation

.active-conversation-profile-container
  width: 100%
  background: green

.messageBlue
  position: relative
  marginLeft: 20px
  marginBottom: 10px
  padding: 10px
  backgroundColor: #A8DDFD
  width: 60%
  textAlign: left
  border: 1px solid #97C6E3
  border-radius: 10px
    &:after
      content: ''
      position: absolute
      width: 0
      height: 0
      borderTop: 15px solid #A8DDFD
      borderLeft: 15px solid transparent
      borderRight: 15px solid transparent
      top: 0
      left: -15px
    &:before: 
      content: ''
      position: absolute
      width: 0
      height: 0
      borderTop: 17px solid #97C6E3
      borderLeft: 16px solid transparent
      borderRight: 16px solid transparent
      top: -1px
      left: -17px
</style>

