<template>
    <ElButton v-bind="props" :icon="undefined" class="my-button" :class="{
        'square-icon': icon && !label,
        'selected': selected === true
    }">
        <font-awesome-icon v-if="icon && !props.loading" :icon="icon" style="width: 12px" />
        <div v-if="icon && !props.loading && label" style="margin-right:8px" />
        <span v-if="label">{{ label }}</span>
        <slot />
    </ElButton>
</template>

<script setup lang="ts">
import type { ButtonProps } from 'element-plus'

interface myButtonProps extends Partial<ButtonProps> {
    icon?: string | null
    label?: string | null,
    selected?: boolean | null
}
const props = defineProps<myButtonProps>()
</script>

<style scoped lang="sass">
.my-button.square-icon
  width: 30px
.my-button.selected
  background-color: var(--el-button-hover-bg-color)
</style>
