<template>
  <div class="create flex flex-column flex-center">
    <div class="content">
      <div class="title">
        <p class="bold">创建企业</p>
        <p>补充企业信息，获取定制化专业服务</p>
      </div>
      <el-form ref="ruleForm" :model="state.ruleForm" :rules="state.rules">
        <el-form-item prop="teamName">
          <el-input
            v-model="state.ruleForm.teamName"
            placeholder="请填写真实企业名称"
            clearable
            minlength="2"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item prop="teamType">
          <el-cascader
            v-model="state.ruleForm.teamType"
            style="width: 100%"
            placeholder="请选择行业类型"
            :options="state.industryList"
            :props="state.props"
            @change="handleChangeIndustry"
          ></el-cascader>
        </el-form-item>
        <el-form-item prop="teamScale">
          <el-select v-model="state.ruleForm.teamScale" placeholder="请选择企业规模" style="width: 100%">
            <el-option
              v-for="item in state.teamScaleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="submit-btn" type="primary" @click="submitForm">创建并切换至新企业</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="return-icon" @click="handleToReturn"></div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { reactive, ref } from 'vue-demi'
import { ElMessage } from 'element-plus'
import { Passport, IResAccountSignInfo } from '@gwin/platform-passport-pc'
import SubjectAddApi from '@/api/subjectAdd'
import { getUserId } from '@/utils/auth'
import industryList from '@/options/industry-cascade-list-inquiry'
import config from '@/config'

interface ruleFormParam {
  value: any
}

const ruleForm: ruleFormParam = ref('')

/**
 * 验证企业名称
 */
const validateTeam = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入团队名称'))
  } else if (value.length < 2) {
    callback(new Error('最小字数不得小于两个字'))
  } else if (value.length >= 50) {
    callback(new Error('最大字数不得超过50字'))
  } else if (value.indexOf(' ') !== -1) {
    callback(new Error('请输入汉字、数字、字母、符号范围以内字符'))
  } else {
    callback()
  }
}

const state = reactive({
  ruleForm: {
    teamName: '', // 企业名称
    teamType: '', // 行业类型
    teamScale: '' // 企业规模
  },
  rules: {
    // form 校验规则
    teamName: [{ required: true, validator: validateTeam, trigger: 'change' }],
    teamType: [{ required: true, message: '请选择行业类型', trigger: 'change' }],
    teamScale: [{ required: true, message: '请选择团队规模', trigger: 'change' }]
  },
  industryList: industryList, // 行业列表
  props: {
    // hover 行业多级联选
    expandTrigger: 'hover'
  },
  teamScaleList: [
    // 规模列表
    {
      label: '1-9人',
      value: 'L1'
    },
    {
      label: '10-99人',
      value: 'L2'
    },
    {
      label: '100-999人',
      value: 'L3'
    },
    {
      label: '1000-9999人',
      value: 'L4'
    },
    {
      label: '10000-99999人',
      value: 'L5'
    },
    {
      label: '100000人以上',
      value: 'L6'
    }
  ]
})

/**
 * 获取 行业列表 所选中的值
 */
const handleChangeIndustry = (value: any) => {
  state.ruleForm.teamType = value[1]
}

/**
 * 创建并切换至新企业
 */
const submitForm = () => {
  if (!ruleForm.value) return
  ruleForm.value.validate(async (valid: any) => {
    if (valid) {
      const param = {
        userId: getUserId(),
        name: state.ruleForm.teamName, // 企业名称
        industry: state.ruleForm.teamType, // 行业
        scale: state.ruleForm.teamScale // 规模
      }
      const res: any = await SubjectAddApi.SubjectAddition(param)
      if (res.status.success) {
        // 设置 ENTITY_ID_KEY
        const signInfo: IResAccountSignInfo = Passport.localUserSignInfo()
        signInfo.subjectId = res.body.subjectId
        signInfo.subjectName = state.ruleForm.teamName
        Passport.updateSignInfo(signInfo)

        ElMessage.success({
          message: '恭喜你，创建成功',
          type: 'success'
        })

        window.location.href = config.GWIN_URL_WORK
      }
    }
  })
}

/**
 * 返回
 */
const handleToReturn = () => {
  router.back()
}
</script>

<style scoped lang="scss">
.create {
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
    .submit-btn {
      width: 100%;
      font-size: 16px;
      min-height: 44px;
      margin-top: 30px;
      background: #3c7dff;
      box-shadow: 0px 2px 4px 0px rgba(39, 123, 255, 0.5);
    }
  }
  .return-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    background: url('../../assets/imgs/return.png') no-repeat 0 0;
    background-size: 100%;
    position: absolute;
    top: 80px;
    left: 210px;
  }
}
</style>
