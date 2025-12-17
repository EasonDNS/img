<template>
  <div class="login-card">
    <div class="login-card-body">
      <div class="top" :style="headerStyle">
        <div class="header">
          <!--          {{ header }}-->
          <h4>
            {{ header }}
          </h4>
        </div>
        <div class="header-body">
          <slot name="share" :iconColor="iconColor" :iconSize="iconSize">
            <el-icon :size="iconSize" :color="iconColor"><Camera /></el-icon>
            <el-icon :size="iconSize" :color="iconColor"><Grape /></el-icon>
            <el-icon :size="iconSize" :color="iconColor"><Handbag /></el-icon>
          </slot>
        </div>
      </div>
      <div class="body">
        <h3>{{ header }}</h3>
        <j-input v-model="userName">
          <template #leftIcon="scope">
            <el-icon :size="scope.size" :color="scope.color"><UserFilled /></el-icon>
          </template>
        </j-input>
        <!--        <j-input>-->
        <!--          <template #leftIcon="scope">-->
        <!--            <el-icon :size="scope.size" :color="scope.color"-->
        <!--              ><Message-->
        <!--            /></el-icon>-->
        <!--          </template>-->
        <!--        </j-input>-->
        <j-input :is-show-right-icon="true" :is-show-password="true" v-model="password"> </j-input>
      </div>
      <div class="footer" :style="footerStyle">
        <!--        <el-checkbox v-model="isRemember">记住密码</el-checkbox>-->
        <slot name="footer" :userName="userName" :password="password">
          <button type="submit" class="footer-button" @click="handleFooterSubmit">submit</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { JInput } from '@/base'
// import * as events from 'events'

//<!--------------------------props------------------------------>
// eslint-disable-next-line no-undef
const props = defineProps<{
  header?: string
  headerColor?: string
  iconSize?: number
  iconColor?: string
  footerColor?: string
}>()
// eslint-disable-next-line no-undef
const emit = defineEmits<{
  (e: 'submit', formData: any): void
}>()
//<!--------------------------let const ------------------------------>
let header = ref<string>(props.header ?? 'header for there~')
let headerColor = ref<string>(props.headerColor ?? `linear-gradient(60deg,#66bb6a,#43a047)`)
let iconSize = ref<number>(props.iconSize ?? 36)
let iconColor = ref<string>(props.iconColor ?? 'rgba(144,147,153,0.9)')
let footerColor = ref<string>(props.footerColor ?? `linear-gradient(60deg,#66bb6a,#43a047)`)
// let isRemember = ref<boolean>(true)
let userName = ref<string>('')
let password = ref<string>('jxls~')
//<!--------------------------default ------------------------------>
const headerStyle = reactive({
  background: `${headerColor.value}`
})
const footerStyle = reactive({
  background: `${footerColor.value}`
})
//<!------------------------------------------------------handle fn ------------------------------------------------------->
const handleFooterSubmit = () => {
  console.log('submit ', userName.value, password.value)
  emit('submit', { userName: userName.value, password: password.value })
}
</script>

<style lang="less" scoped>
.login-card {
  //background-color: rgba(255, 255, 255, 0.49);
  padding: 15px;
  box-sizing: border-box;
  background-color: transparent;
  width: 100%;

  .login-card-body {
    border-radius: 6px;
    width: 100%;
    min-width: 340px;
    background-color: rgba(255, 255, 255, 0.06);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow:
      0 16px 38px -12px rgb(0 0 0 / 56%),
      0 4px 25px 0 rgb(0 0 0 / 12%),
      0 8px 10px -5px rgb(0 0 0 / 20%);
    .top {
      //background-color: red;
      margin: -20px 15px 20px 15px;
      //min-height: 280px;
      box-shadow:
        0 16px 38px -12px rgb(0 0 0 / 56%),
        0 4px 25px 0 rgb(0 0 0 / 12%),
        0 8px 10px -5px rgb(0 0 0 / 20%);
      border-radius: 6px;
      width: 90%;
      min-width: 280px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: orangered;
      .header {
        width: 100%;
        margin-bottom: 3px;
      }
      .header-body {
        padding: 15px 0;
        //background-color: bisque;

        .el-icon {
          margin: 20px 15px;
          cursor: pointer;
          color: #fff;
        }
      }
    }
    .body {
      //background-color: indigo;
      width: 100%;
      min-width: 340px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .footer {
      background-color: orange;
      padding: 15px;
      margin: 15px 15px 15px auto;
      border-radius: 6px;
      transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;

      &:hover {
        //.footer-button {
        //  font-size: 22px;
        //}
        box-shadow:
          0 16px 38px -12px rgb(0 0 0 / 56%),
          0 4px 25px 0 rgb(0 0 0 / 12%),
          0 8px 10px -5px rgb(0 0 0 / 20%);
      }
      .el-checkbox {
        margin-left: auto;
      }
      .footer-button {
        border: none;
        background-color: transparent;
        padding: 0;
        cursor: pointer;
        &:hover {
          border: none;
        }
      }
    }
  }
}
</style>
