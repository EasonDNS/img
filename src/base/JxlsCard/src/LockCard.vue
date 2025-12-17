<template>
  <div class="jxls-lock-card">
    <div class="jxls-lock-card-body">
      <div class="header">
        <div class="image">
          <el-image :src="imgUrl" :fit="fit">
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture /></el-icon>
              </div>
            </template>
          </el-image>
        </div>
      </div>
      <div class="content">
        <h3 class="title">{{ title }}</h3>
        <div class="form">
          <label for="password" ref="labelRef" class="label"> Enter Password </label>
          <div class="icon" ref="iconRef" @click="handleIconClick">
            <el-icon v-if="isView">
              <Hide />
            </el-icon>
            <el-icon v-if="!isView"><View /></el-icon>
          </div>
          <input
            type="password"
            id="password"
            class="input"
            ref="inputRef"
            v-model="password"
            @focusin="handleInputFocusIn"
            @focusout="handleInputFocusout"
          />

          <span class="line" ref="lineRef"></span>
        </div>
      </div>
      <div class="footer" @click="handleFooterClick">
        <slot name="footer" :scope="password">
          <!--          <el-button>UNLOCK</el-button>-->
          <button class="submit">
            <span>{{ submit }}</span>
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<!--------------------------组件-
* props : title , imgUrl
* emit : submit(password)
* slot : footer
----------------------------->
<script setup lang="ts">
//---------------------------import-------------------------------
import { ref, watch } from 'vue'

//<!---------------------------props-------------------------------->
// eslint-disable-next-line no-undef
const props = defineProps<{
  title: string
  imgUrl: any
}>()
//<!---------------------------emits-------------------------------->
// eslint-disable-next-line no-undef
const emit = defineEmits<{
  (e: 'submit', pwd: string | number): void
}>()

//<!---------------------------let const -------------------------------->
let title = ref(props.title ?? 'title')
let submit = ref('submit')
let imgUrl = ref<string>(
  props.imgUrl ??
    'https://demos.creative-tim.com/vue-material-dashboard-pro/documentation/img/faces/avatar.jpg'
)
type I_Fit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
let fit = ref<I_Fit>('scale-down')
const inputRef = ref<HTMLInputElement>()
const labelRef = ref<HTMLLabelElement>()
const iconRef = ref<HTMLDivElement>()
const lineRef = ref<HTMLSpanElement>()
let isView = ref(true)
let password = ref<any>()

//<!---------------------------fn ------------------------------->
//<!----------------------------handle fn------------------------------->
const handleInputFocusIn = () => {
  // labelRef.value!.setAttribute('class', 'md-label')
  labelRef.value?.classList.add('md-label')
  iconRef.value?.setAttribute('style', 'opacity:1')
  // lineRef.value?.setAttribute('class', 'md-line')
  lineRef.value?.classList.add('md-line')
}

const handleInputFocusout = () => {
  if (password.value === '' || password.value === undefined || password.value === null) {
    // password 无值
    labelRef.value?.classList.remove('md-label')
    labelRef.value?.setAttribute('style', 'opacity:0.45')
    lineRef.value?.classList.remove('md-line')
    iconRef.value?.setAttribute('style', 'opacity:0.45')
  } else {
    // password 有值
    labelRef.value?.setAttribute('style', 'opacity:0')
    iconRef.value?.setAttribute('style', 'opacity:1')
  }
}
const handleIconClick = () => {
  if (inputRef.value?.getAttribute('type') === 'password') {
    inputRef.value?.setAttribute('type', 'text')
  } else {
    inputRef.value?.setAttribute('type', 'password')
  }
  isView.value = !isView.value
}

const handleFooterClick = () => {
  emit('submit', password.value)
}
//<!----------------------------live Fn------------------------------->

watch(password, (newValue) => {
  if (newValue === '') {
    labelRef.value?.classList.remove('md-label')
    console.log(1)
  }
})

//<!----------------------------tools ------------------------------->

//<!---------------------------- expose------------------------------->
</script>

<style lang="less" scoped>
.jxls-lock-card {
  position: relative;
  //background-color: #fff;
  padding: 24px;
  //overflow: hidden;
  box-sizing: border-box;
  opacity: 1;
  .jxls-lock-card-body {
    margin: 30px 0;
    background-color: rgba(108, 98, 108, 0.77);
    border-radius: 6px;

    //<!--------------------------header------------------------------>
    .header {
      //background-color: rgba(255, 69, 0, 0.51);
      padding: 12px 20px;
      position: relative;
      width: 60%;
      margin: 0 auto;
      .image {
        width: 130px;
        height: 130px;
        margin: -50px auto 0 auto;
        border-radius: 50%;
        overflow: hidden;
        box-shadow:
          0 16px 38px -12px rgba(0, 0, 0, 0.56),
          0 4px 25px 0 rgba(0, 0, 0, 0.12),
          0 8px 10px -5px rgba(0, 0, 0, 0.2);
      }
    }
    .content {
      padding: 12px;
      font-size: 14px;

      .form {
        margin: 15px 0;
        width: 100%;
        position: relative;
        box-sizing: border-box;
        text-align: center;
        overflow: hidden;
        .line {
          position: absolute;
          display: inline-block;
          width: 10px;
          height: 2px;
          opacity: 0;
          background-color: orangered;
          //transform: translateX(-50%);
          left: 0;
          right: 0;
          bottom: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .md-line {
          position: absolute;
          display: inline-block;
          width: 100%;
          opacity: 1;
        }

        .label {
          position: absolute;
          left: 10px;
          line-height: 36px;
          top: 0;
          bottom: 0;
          opacity: 0.45;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .md-label {
          //position: absolute;
          left: 0;
          top: -36px;
          opacity: 1;
        }
        .input {
          width: 100%;
          height: 36px;
          border: none;
          background-color: rgba(108, 98, 108, 0.77);
          transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          transition-property: font-size, padding-top, color;
          border-radius: 5px;
          padding: 0;
          &:focus {
            outline: none;
            border: none;
          }
        }
        .md-icon {
          opacity: 1;
        }
        .icon {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 5px;
          opacity: 0.45;
          cursor: pointer;
          transition:
            cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;

          .el-icon {
            height: 100%;
            font-size: 22px;
            //opacity: 0.45;
            //background-color: indigo;
          }
          &:hover {
            opacity: 1;
          }
        }
      }
    }
    .footer {
      //background-color: #d91c1c;

      display: flex;
      justify-content: end;

      button {
        display: inline-block;
        border-radius: 4px;
        background-color: #3d405b;
        border: none;
        color: #ffffff;
        text-align: center;
        font-size: 14px;
        padding: 10px;
        width: 80px;
        //height: 40px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
      }

      button span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
      }

      button span:after {
        content: '»';
        position: absolute;
        opacity: 0;
        top: 0;
        right: -10px;
        transition: 0.5s;
      }

      button:hover span {
        padding-right: 10px;
      }

      button:hover span:after {
        opacity: 1;
        right: 0;
      }
    }
  }
}
</style>
