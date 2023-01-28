<template>
  <div class="gwin-tenant-no-entry flex flex-column flex-center flex-only-center">
    <i class="gwin-tenant-no-entry__icon"></i>
    <p class="gwin-tenant-no-entry__title">无法进入该企业</p>
    <p>可能原因：1.该企业已被解散 2.企业已将您移除或停用</p>
    <p>您可以选择这些方式：1.联系企业管理员邀请您或启用账号 2.切换其他企业 3.创建企业</p>
    <el-button class="gwin-tenant-no-entry__button" type="primary" @click="onReplaceTeam">切换企业</el-button>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { onMounted, onUnmounted } from 'vue-demi'
import { removeEntityId } from '@/utils/auth'

onMounted(() => {
  // 阻止页面后退
  onPushState()
})

onUnmounted(() => {
  window.removeEventListener('popstate', onPushState, false)
})

/**
 * 阻止浏览器页面回退操作
 */
const onPushState = () => {
  // 按需使用：A→B→C就需要页面一进来的时候，就添加一个历史记录
  window.history.pushState(null, '', document.URL)
  // 给window添加一个popstate事件，拦截返回键
  window.addEventListener('popstate', function () {
    window.history.pushState(null, '', document.URL)
  })
}

/**
 * 切换企业 replace
 */
const onReplaceTeam = async () => {
  await removeEntityId()
  router.replace('/tenant/index?replace=1')
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('no-entry') {
  height: calc(100vh - 50px);
  @include e('icon') {
    width: 68px;
    height: 68px;
    background: url('../../assets/imgs/rejected.png') no-repeat 0 0;
    background-size: 100%;
  }
  @include e('title') {
    color: #1d2129;
    font-size: 20px;
    font-weight: 600;
    margin: 20px 0;
  }
  p {
    color: #6e6e6e;
    font-size: 14px;
    line-height: 24px;
  }
  @include e('button') {
    width: 104px;
    height: 38px;
    margin-top: 30px;
    border-radius: 4px;
    background: #3c7dff;
  }
}
</style>
