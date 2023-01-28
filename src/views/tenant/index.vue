<template>
  <div class="tenant flex flex-column flex-center">
    <div class="content">
      <div class="title">
        <p class="bold">进入企业</p>
        <p>我们将在企业中为您提供工作台服务</p>
      </div>
      <div class="team-list">
        <div
          v-for="item in state.subjectList"
          :key="item.subjectId"
          class="team flex flex-between flex-only-center"
          @click="handleSwitchSubject(item.subjectId, item.subjectName)"
        >
          <div class="flex flex-only-center">
            <img v-if="item.avatar_uri" :src="item.avatar_uri" />
            <div v-else class="avatar">{{ item.subjectName.charAt(0) }}</div>
            <p class="name" :title="item.subjectName">{{ item.subjectName }}</p>
          </div>
          <svg-icon icon-class="mores" class="mores-icon"></svg-icon>
        </div>
      </div>
      <div class="create flex flex-only-center" @click="handleToCreateTeam">
        <div class="create-icon"></div>
        <div class="text">
          <p class="bold">创建新的企业</p>
          <p>可用于企业、组织和团队</p>
        </div>
      </div>
    </div>
    <div v-if="getEntityId()" class="close-icon" @click="handleToBack"></div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, onUnmounted, reactive } from 'vue-demi'
import { Passport, IResAccountSignInfo } from '@gwin/platform-passport-pc'
import SubjectListApi from '@/api/subjectList'
import SwitchSubjectApi from '@/api/switchSubject'
import { getUserId, getEntityId } from '@/utils/auth'
import config from '@/config'

interface subjectParam {
  avatar_uri: string
  subjectId: string
  subjectName: string
}

const state = reactive({
  subjectList: [] as Array<subjectParam>
})

const route = useRoute()
const router = useRouter()

onMounted(() => {
  // 阻止页面后退
  if (route.query.replace) {
    onPushState()
  }

  // 企业列表
  getUserRelatedSubjectListInquiry()
})

onUnmounted(() => {
  window.removeEventListener('popstate', onPushState, false)
})

/**
 * 用户企业列表
 */
const getUserRelatedSubjectListInquiry = async () => {
  const param = {
    userId: getUserId()
  }
  const res: any = await SubjectListApi.UserRelatedSubjectListInquiry(param)
  if (res.status.success) {
    state.subjectList = res.body.dataList
  }
}

/**
 * 切换企业
 */
const handleSwitchSubject = async (subjectId: string, subjectName: string) => {
  const param = {
    userId: getUserId(),
    subjectId: subjectId
  }
  const res: any = await SwitchSubjectApi.SubjectDefaultSignInMaintenance(param)
  if (res.status.success) {
    // 设置 ENTITY_ID_KEY
    const signInfo: IResAccountSignInfo = Passport.localUserSignInfo()
    signInfo.subjectId = subjectId
    signInfo.subjectName = subjectName
    Passport.updateSignInfo(signInfo)
    window.location.href = config.GWIN_URL_WORK
  }
}

/**
 * 去创建新的团队
 */
const handleToCreateTeam = () => {
  router.push('/tenant/create')
}

/**
 * 关闭按钮
 */
const handleToBack = () => {
  router.back()
}

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
</script>

<style scoped lang="scss">
.tenant {
  flex: 1 1;
  width: 100%;
  box-sizing: border-box;
  height: calc(100vh - 50px);
  position: relative;
  .content {
    width: 500px;
    margin: 0 auto;
    .title {
      color: #6e6e6e;
      font-size: 18px;
      .bold {
        font-size: 26px;
        font-weight: 600;
        color: #121212;
        padding-bottom: 10px;
      }
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        margin-top: 20px;
        margin-bottom: 30px;
        background-color: #d9d9d9;
      }
    }
    .team-list {
      max-height: 300px;
      overflow: hidden;
      overflow-y: auto;
      .team {
        cursor: pointer;
        color: #121212;
        font-size: 16px;
        margin-bottom: 20px;
        &:hover {
          color: #3c7dff;
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 4px;
          margin-right: 10px;
        }
        .avatar {
          width: 40px;
          height: 40px;
          color: #fff;
          font-size: 14px;
          line-height: 40px;
          text-align: center;
          border-radius: 4px;
          margin-right: 10px;
          background-color: #3c7dff;
        }
        .mores-icon {
          width: 25px;
          height: 25px;
          display: block;
        }
      }
    }
    .create {
      cursor: pointer;
      margin-top: 44px;
      .create-icon {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        background: url('../../assets/imgs/create.png') no-repeat 0 0;
        background-size: 100%;
      }
      .text {
        color: #999;
        font-size: 12px;
        .bold {
          color: #121212;
          font-size: 16px;
          &:hover {
            color: #3c7dff;
          }
        }
      }
    }
  }
  .close-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    background: url('../../assets/imgs/close.png') no-repeat 0 0;
    background-size: 100%;
    position: absolute;
    top: 80px;
    right: 210px;
  }
}
</style>
