<template>
    <div class="details-container panel-blur">
      <el-image class="avatar"></el-image>
      <div>name</div>
      <div>Channel Type: X</div>
      <div>Channel Owner: XXX</div>
      <div>Created at: XXX</div>
      <el-scrollbar class="scroll">Channel Members:
          <p v-for="item in 2" :key="item" class="members-scroll">{{ item }}</p>
      </el-scrollbar>
    </div>
</template>


<style scoped lang="sass">

.details-container
  height: 100%
  width: 75%
  border: (--el-border)
  border-radius: 20px
  display: flex
  align-items: center
  justify-content: space-evenly
  overflow: hidden
  flex-direction: column
  background-color: red //rgba(0, 0, 0, 0.5)
  backdrop-filter: blur(10px)

.avatar
  z-index: 3
  background-image: url('../../src/assets/temp.jpg')
  background-repeat: no-repeat
  width: 50%
  height: 30%
  border-radius: 50%

.scroll
  height: 30%
  width: 90%
.members-scroll
    display: flex
    flex-direction: column
    align-items: center
    min-height: 40px
    text-align: center
    border-radius: 4px
    background: var(--el-color-primary-light-9)
    color: var(--el-color-primary)
    justify-content: center

</style>