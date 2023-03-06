<template>
  <div class="pos-rel full over-hidden login-page">
    <p class="text-center fs32 login-page-title">{{ title }}</p>
    <div class="login-page-bg pos-abs full"></div>
    <div class="pos-abs login-page-panel">
      <p class="fs20 login-page-panel__title">注册登录</p>
      <div class="login-page-panel__body">
        <p class="bold fs18 text-center">
          {{formType === FormTypes.PHONE ? '手机验证码' : '账号密码'}}登录
        </p>
        <a-form
          class="form"
          v-if="formType===FormTypes.PHONE"
          ref="formRef"
          :model="formState"
          :rules="phoneFormRules">
          <a-form-item name="phone">
            <a-input
              class="default-input"
              placeholder="请输入手机号码"
              v-model:value="formState.phone"></a-input>
          </a-form-item>
          <a-form-item name="code">
            <a-input
              class="default-input code-input"
              :placeholder="beforeGetCode ? '请输入验证码' : '控制台打印的验证码'"
              v-model:value="formState.code">
              <template #suffix>
                <span class="text-link get-code" v-show="beforeGetCode" @click="getCode" :class="!validatePhone ? 'disabled-code' : ''">获取验证码</span>
                <span class="reget-code" v-show="!beforeGetCode">重新获取({{second}})s</span>
              </template>
            </a-input>
          </a-form-item>
        </a-form>
        <a-form
          class="form"
          v-else
          ref="formRef"
          :model="formState"
          :rules="accountFormRules">
          <a-form-item name="username">
            <a-input
              class="default-input"
              placeholder="请输入用户名"
              v-model:value="formState.username">
            </a-input>
          </a-form-item>
          <a-form-item name="password">
            <div class="pw-line">
              <a-input-password
                v-if="pwType"
                class="default-input"
                style="max-width: 60%;"
                :visibilityToggle="false"
                placeholder="请输入密码"
                v-model:value="formState.password">
              </a-input-password>
              <span class="text-link get-code" @click="forgetPw">忘记密码</span>
            </div>
          </a-form-item>
        </a-form>
        <div class="policy">
          <a-tooltip :visible="!policyChecked">
            <template #title>请勾选同意用户隐私政策</template>
            <a-checkbox class="fs13 privite-policy" v-model:checked="policyChecked">我已阅读并同意
              <span class="text-link fs13" @click="$router.push('/privitepolicy')">《用户隐私政策》</span>
            </a-checkbox>
          </a-tooltip>
          <span class="check-warning fs13" ></span>
        </div>
        <a-button type="primary" class=" btn btn-blue fs15 block login-btn" @click="submit">登录</a-button>
        <div class="text-center text-link">
          <span v-show="formType === FormTypes.ACCOUNT" @click="changeType(FormTypes.PHONE)">手机号验证码登录</span>
          <span v-show="formType === FormTypes.PHONE" @click="changeType(FormTypes.ACCOUNT)">账号密码登录</span>
        </div>
      </div>
    </div>
    <Vcode :show="showVerifylider" @success="sendVCode" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { queryUserInfo, sendVerifycode, userLogin } from '@/api/userCenter'
import { phoneReg, vcodeReg, nameReg, pwReg } from '@/utils/Regexp'
import { formatPw } from '@/utils/format'
import { useUserStore } from '@/stores/useUserStore'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import config from '@/config'
import ls from '@/localStore'
import Vcode from "vue3-puzzle-vcode";

const $router = useRouter()
const $route = useRoute()
const title = config.title


const userStore = useUserStore()

// 处理返回的用户信息，returnToken表示需要返回token（登录接口）
const handleLoginRes = (res:any, returnToken:boolean = false) => {
  const { code, data, msg } = res.data
  if (code === 0) {
    let page = $route.query?.from
    const { permission, user_name, user_id, role_id, role_name, token } = data
    if (returnToken && !token) {
      return
    }
    returnToken && ls.set('token', token, 60 * 60 * 24 * 1000)
    try {
      const parsePermission = JSON.parse(permission)
      userStore.permission = parsePermission
      if (!page || page && !parsePermission[page as string]) {
        page = Object.keys(parsePermission).find(key => parsePermission[key]) || null
      }
      if (!page) {
        return message.error('暂无页面权限')
      }
      $router.push({
        name: page as string
      })
      userStore.userInfo = {
        userName: user_name,
        userId: user_id,
        roleId: role_id,
        roleName: role_name
      }
    } catch {
      message.error('获取用户权限失败')
    }
  } else {
    message.error(msg)
    console.log('处理用户信息失败', code, msg);
    userStore.clearUserInfo()
  }
}

// 进来先检查一下权限
const checkAuth = () => {
  queryUserInfo().then(res => {
    handleLoginRes(res)
  }).catch(err => {
    console.log('checkAuth获取用户信息失败', err);
    userStore.clearUserInfo()
  })
}
checkAuth()


let timer:any = null

const pwType = ref<string>('pw')
const enum FormTypes {
  PHONE = 'p',
  ACCOUNT = 'a'
}
const formType = ref<string>(FormTypes.PHONE) // 登录类型
const policyChecked = ref<boolean>(true)
const second = ref<number>(60)
const beforeGetCode = ref<boolean>(true)
const formState = reactive({
  username: 'user01',
  password: '123hhh',
  phone: '13300000000',
  code: ''
})

// 表单规则
const phoneFormRules = {
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'change'
    },
    {
      pattern: phoneReg,
      message: '手机号格式不正确',
      trigger: 'change'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'change',
    },
    {
      message: '验证码格式不正确',
      pattern: vcodeReg,
      trigger: 'change',
    },
  ]
}
const accountFormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'change'
    },
    {
      message: '用户名为1〜20个字符，由数字和字母组成，不区分大小写',
      pattern: nameReg,
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change'
    },
    {
      message: '密码长度6〜20，由数字和字母组成，不区分大小写',
      pattern: pwReg,
      trigger: 'change'
    },
  ]
}
// 验证手机号格式
const validatePhone = computed(() => phoneReg.test(formState.phone))

const uuid = ref<string>('')
const showVerifylider = ref(false)
// 获取验证码
const getCode = () => {
  if (!validatePhone.value) {
    return message.error('请输入正确的手机号')
  }
  showVerifylider.value = true
}
// 发送验证码
const sendVCode = () => {
  showVerifylider.value = false
  sendVerifycode({
    phone: formState.phone
  }).then(res => {
    const { code, data, msg } = res.data
    if (code === 0) {
      const { verify_code, uuid: u } = data
      console.log('验证码：', verify_code, '3分钟内有效')
      uuid.value = u
      clearInterval(timer)
      beforeGetCode.value = false
      second.value = 60
      timer = setInterval(() => {
        second.value--
        if (second.value === 0) {
          clearInterval(timer)
          beforeGetCode.value = true
        }
      }, 1000)
    } else {
      message.error(msg)
    }
  }).catch(e => {
    console.log(e?.message)
    message.error(e?.message)
  })
}
const changeType = (t: FormTypes) => {
  formType.value = t
}
// 提交
const formRef = ref()
const submit = () => {
  if (formType.value === FormTypes.PHONE && !uuid.value) {
    return message.error('请发送验证码！')
  }
  if (!policyChecked.value) {
    return
  }
  formRef.value.validate().then(() => {
    const params = formType.value === FormTypes.PHONE
      ? { phone: formState.phone, uuid: uuid.value, verify_code: formState.code }
      : { username: formState.username, password: formatPw(formState.password) }
    userLogin(params).then(res => {
      handleLoginRes(res, true)
    }).catch(e => {
      console.log('登录失败', e);
      userStore.clearUserInfo()
      message.error(e?.message)
    })
  }).catch((e:Error) => {
    console.log(e)
  })
}
// 忘记密码
const forgetPw = () => {
  message.warning('请与管理员联系')
}
</script>

<style lang="less">
.login-page {
  filter: blur(0.5);
  &-bg {
    background-image: url(/src/assets/bg.png);
    filter: blur(0.5);
    /* width: 100%; */
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0.1;
    top: 0;
    left: 0;
  }
  &-title {
    padding-top: 20px;
    letter-spacing: 4px;
  }
  &-panel {
    background-color: #fff;
    border: 1px solid #ccc;
    color: #333;
    border-radius: 8px;
    width: 30%;
    max-width: 400px;
    min-height: 450px;
    height: 50%;
    max-height: 500px;
    right: 12%;
    bottom: 12%;
    &__title {
      height: 50px;
      border-bottom: 1px solid #ccc;
      line-height: 50px;
      padding-left: 20px;
    }
    &__body {
      padding: 20px 40px;
      .form {
        margin-top: 25px;
        .ant-input-suffix {
          width: 150px;
        }
        .get-code, .reget-code {
          padding-left: 10px;
          margin: 0 auto;
        }
        .reget-code {
          color: gray;
        }
        .disabled-code {
          color: rgba(0, 0, 0, 0.25);
          border-color: #d9d9d9;
          cursor: not-allowed;
        }
        .pw-line {
          width: 100%;
          display: flex;
          border: 1px solid #d9d9d9;
          align-items: center;
          .ant-input-password {
            flex: 1;
            border: none;
            &:focus {
              box-shadow: none;
            }
          }
        }
      }
      .policy {
        .privite-policy {
          color: gray;
        }
        .check-warning {
          color: gray;
          text-align: left;
          line-height: 30px;
        }
      }
      .login-btn {
        margin: 15px 0;
      }
    }
  }
}
</style>
