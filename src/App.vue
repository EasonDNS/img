<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const size = ref<'' | 'default' | 'small' | 'large'>('small')
const zIndex = ref(3000)
</script>

<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="zhCn">
    <router-view v-slot="{ Component }">
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__backInLeft"
        leave-active-class="animate__animated animate__backOutRight"
      >
        <component :is="Component"></component>
      </transition>
    </router-view>
  </el-config-provider>
</template>

<style lang="less">
html,
body {
  height: 100%;
  width: 100%;
  //background-color: #fff;

  #app {
    display: flex;
    width: 100%;
    height: 100%;
    //background-color: rosybrown;
  }
}
</style>
