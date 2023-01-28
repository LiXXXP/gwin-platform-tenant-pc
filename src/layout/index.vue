<template>
  <div style="height: 100%">
    <div class="app-main">
      <Content class="app-content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Content from './content.vue'
import { defineComponent } from 'vue-demi'

defineComponent({
  Content
})
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  background: #fff;
  display: flex;
  position: relative;
  top: 50px;
  left: 0px;
  right: 0px;
}
.app-content {
  flex: 1;
}
</style>
