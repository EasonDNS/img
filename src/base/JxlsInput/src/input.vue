<template>
  <div class="jxls-input" ref="jxlsInputRef" @click="getFocus">
    <div class="jxls-input-body" ref="bodyRef">
      <div class="left" ref="leftIconRef">
        <!-------------------------slot name------------------------------->
        <slot name="leftIcon" :size="iconSize" :color="iconColor">
          <el-icon :size="iconSize" :color="iconColor"><Unlock /></el-icon>
        </slot>
      </div>
      <div class="center" ref="centerRef">
        <input
          @focusout="handleInputOut"
          @focusin="handleInputIn"
          ref="inputRef"
          type="text"
          id="input"
          class="input"
          v-model="password"
        />
        <span class="span" ref="spanRef"></span>
        <label for="input" class="label" ref="labelRef"> {{ label }} </label>
        <span class="brief" ref="briefRef" v-if="isShowBrief">
          {{ brief }}
        </span>
        <span class="border" ref="borderRef"></span>
      </div>
      <div class="right" @click.stop="handleShowPassword" v-if="isShowRight">
        <el-icon v-if="isShowPassword"><Hide /></el-icon>
        <el-icon v-if="!isShowPassword"><View /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

//<!------------------------------------------------------emit props ------------------------------------------------------->
// eslint-disable-next-line no-undef
const props = defineProps<{
  // 是否显示 right icon
  isShowRightIcon?: boolean
  //size ==> left icon 的宽高 默认 是36px
  size?: string
  //是否切换 显示密码 默认是 false
  isShowPassword?: boolean
  // 设置外层box 的 padding 默认是 20
  outBoxPadding?: number
  // 设置input 的背景色  默认是透明
  inputColor?: string
  // 设置body 整体背景色
  bodyColor?: string
  // 是否要显示 brief
  isShowBrief?: boolean
  // 绑定password
  modelValue: string | number
  // modelValue
  // 动画颜色 和 left icon color
  animateColor?: string
}>()
// eslint-disable-next-line no-undef
const emit = defineEmits<{
  // update:moduleValue
  // (e: 'update:modelValue', newValue: any): void
  (e: `update:modelValue`, password: string | number): void
}>()
//<!------------------------------------------------------let const  ------------------------------------------------------->
const spanRef = ref<HTMLSpanElement>()
const labelRef = ref<HTMLLabelElement>()
const inputRef = ref<HTMLInputElement>()
const briefRef = ref<HTMLSpanElement>()
const centerRef = ref<HTMLDivElement>()
const leftIconRef = ref<HTMLDivElement>()
const jxlsInputRef = ref<HTMLDivElement>()
const borderRef = ref<HTMLSpanElement>()
const bodyRef = ref<HTMLDivElement>()
let password = ref<string | number>(props.modelValue)
let animateColor = ref<string>(props.animateColor ?? `rgba(144,147,153,0.9)`)
let label = ref<string>('请输入 ~~~')
let brief = ref<string>('this is brief')
// 此值 设定 外部盒子的padding
let padding = ref<number>(props.outBoxPadding ?? 20)
// 此值 保存center 中间盒子的 高度  再设定给label 的lineHeight
let lineHeight = ref<string>()
// 保存 是否显示 right 后面的ICON
let isShowRight = ref<boolean>(props.isShowRightIcon ?? false)
let isShowPassword = ref<boolean>(props.isShowPassword ?? true)
let isShowBrief = ref<boolean>(props.isShowBrief ?? false)
let size = ref<string>(props.size ?? '36px')
let bodyColor = ref<string>(props.bodyColor ?? 'transparent')
let inputColor = ref<string>(props.inputColor ?? 'transparent')

let iconSize = ref<number>(22)
let iconColor = ref<string>(animateColor.value)

//<!------------------------------------------------------handle fn  ------------------------------------------------------->
// 监听外层点击 直接去获取 input focus
const getFocus = (_event: Event) => {
  inputRef.value?.focus()
  // console.log('==========> ', $event.target)
}
//<!------------------------------------------------------Live fn  ------------------------------------------------------->
onMounted(() => {
  // 1, 加载 的时候去拿 到props 中size的值 设置到left icon
  leftIconRef.value?.setAttribute('style', `height:${size.value}; width:${size.value};`)
  jxlsInputRef.value?.setAttribute('style', `padding:${padding.value}px 0;`)
  // 去拿到 center 的高度
  const bodyHeight = window.getComputedStyle(bodyRef.value!, null).height
  centerRef.value?.setAttribute('style', `height:${bodyHeight};`)

  lineHeight.value = window.getComputedStyle(centerRef.value!, null).height
  // 去设置 label 和 brief 的line height
  labelRef.value?.setAttribute('style', `line-height: ${lineHeight.value};`)
  briefRef.value?.setAttribute('style', `line-height:${lineHeight.value};`)

  inputRef.value?.setAttribute(
    'style',
    `height:${lineHeight.value}; background:${inputColor.value};`
  )
  // 设置背景颜色
  bodyRef.value?.setAttribute('style', `background:${bodyColor.value}`)
})
//<!------------------------------------------------------handle input fn  ------------------------------------------------------->
// 在focus 的时候执行函数
const handleInputIn = () => {
  labelRef.value?.classList.add('md-label')
  briefRef.value?.classList.add('md-brief')
  spanRef.value?.classList.add('md-span')
  borderRef.value?.classList.add('md-border')
  changeLeftColor()
}
// 在 取消focus 的时候 执行的函数
const handleInputOut = () => {
  if (password.value === '' || password.value == undefined) {
    labelRef.value?.setAttribute('style', 'opacity:0.45')
    labelRef.value?.classList.remove('md-label')
    briefRef.value?.classList.remove('md-brief')
  } else {
    labelRef.value?.removeAttribute('style')
    labelRef.value?.setAttribute('style', 'opacity:0')

    briefRef.value?.removeAttribute('style')
    briefRef.value?.setAttribute('style', 'opacity:0')
  }
  spanRef.value?.classList.remove('md-span')
  // leftIconRef.value?.setAttribute('style',`color`)
  leftIconRef.value?.removeAttribute('style')
  borderRef.value?.classList.remove('md-border')
  changeLeftSize()
}
//<!------------------------------------------------------handle right fn  ------------------------------------------------------->
const handleShowPassword = () => {
  if (inputRef.value?.type === 'password') {
    isShowPassword.value = false
    inputRef.value!.type = 'text'
  } else {
    isShowPassword.value = true
    inputRef.value!.type = 'password'
  }
}
//<!------------------------------------------------------watch  ------------------------------------------------------->
watch(password, (newValue) => {
  emit('update:modelValue', newValue)
  // update:modelValue
})
//<!------------------------------------------------------expose fn  ------------------------------------------------------->
const changeIconSize = (size: number) => {
  iconSize.value = size
}
const changeIconColor = (color: string) => {
  iconColor.value = color
}
const changeLeftColor = (color?: string) => {
  const leftColor = color ?? animateColor.value
  leftIconRef.value?.setAttribute(
    'style',
    `color:${leftColor};height:${size.value};width:${size.value};`
  )
}
const changeLeftSize = (sizes?: string) => {
  const s = sizes ?? size.value
  leftIconRef.value?.setAttribute('style', `height:${s}; width:${s};`)
}
// eslint-disable-next-line no-undef
defineExpose({
  changeIconSize,
  changeIconColor
})
</script>

<style lang="less" scoped>
@p: '200px';
.jxls-input {
  padding: 20px 0;
  box-sizing: border-box;
  width: 100%;
  //overflow: hidden;
  margin: 0 15px;
  position: relative;
  .jxls-input-body {
    background-color: rgba(194, 180, 193, 0.62);
    //background-color: rgba(194, 180, 193, 0.62);
    border-radius: 6px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 0 15px;
    .left {
      color: #495057;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      cursor: pointer;

      transition: all 2s cubic-bezier(0.25, 0.8, 0.25, 1);
      .el-icon {
        cursor: pointer;
      }
    }

    //<!--------------------------center------------------------------>
    .center {
      width: 100%;
      box-sizing: border-box;
      border-radius: 6px;
      position: relative;
      font-size: 14px;
      //background-color: rebeccapurple;
      //<!--------------------------动画元素------------------------------>
      .span {
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0;
        background-color: #9c27b0;
        transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
        transform: scaleX(0.12);
      }
      .md-span {
        opacity: 1;
        transform: scaleX(1);
      }
      .label {
        position: absolute;
        left: 35px;
        top: 0;
        bottom: 0;
        opacity: 0.45;
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      .md-label {
        transform: translateY(-100%);
        opacity: 0.8;
      }

      .input {
        width: 100%;
        border: none;
        background: none;
        &:focus {
          border: none;
          outline: none;
        }
      }
      .brief {
        position: absolute;
        bottom: 0;
        top: 0;
        left: 50px;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      .md-brief {
        transform: translateY(100%);
        opacity: 0.8;
        z-index: 2;
      }

      .border {
        position: absolute;
        color: rgba(0, 0, 0, 0.87);
        background-color: rgba(210, 210, 210, 0.8);
        width: 100%;
        height: 1px;
        left: 0;
        bottom: 0;
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        transform: scaleX(1);
      }
      .md-border {
        transform: scaleX(0);
      }
    }
    .right {
      //background-color: gold;
      position: absolute;
      right: 15px;
      cursor: pointer;
      //background-color: transparent;
      color: rgba(239, 232, 238);
      opacity: 0.45;
      .el-icon {
        width: 100%;
        height: 100%;
        //background-color: #fff;
        //display: inline-block;
        //line-height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
