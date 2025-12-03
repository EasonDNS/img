<template>
  <div class="main">
    <el-container class="m-el-aside">
      <el-aside :width="publicStore.isExpand ? '200px' : '64px'">
        <el-scrollbar>
          <aside-view> </aside-view>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header>
          <head-view> </head-view>
        </el-header>
        <!--        <hr />-->
        <el-main>
          <hr />
          <div class="main-content">
            <el-scrollbar>
              <router-view v-slot="{ Component }">
                <transition
                  mode="out-in"
                  enter-active-class="animate__animated animate__backInLeft"
                  leave-active-class="animate__animated animate__backOutRight"
                >
                  <component :is="Component"></component>
                </transition>
              </router-view>
            </el-scrollbar>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { usePublicStore } from '@/stores'
import AsideView from '@/views/Aside/AsideView.vue'
import HeadView from '@/views/Head/HeadView.vue'
import { onMounted } from 'vue'
//---------------------------------------------------------
const publicStore = usePublicStore()
onMounted(() => {
  publicStore.isExpand = true
})
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;

  .el-container {
    height: 100%;
    width: 100%;
    color: lightgoldenrodyellow;
    background-color: rgba(23, 23, 23, 1);
  }
  .el-header {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
    border-radius: 5px;
    //background-color: rgba(23, 23, 23, 1);
  }
  .el-aside {
    margin: 16px 5px 16px 16px;
    border-radius: 5px;
    background-color: rgba(29, 30, 31, 0.8);
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.75);
    transition: all 300ms ease;
  }

  .el-main {
    //width: 100%;
    //height: 100%;

    .main-content {
      width: 100%;
      box-sizing: border-box;
      background-color: rgba(29, 30, 31, 0.9);
      padding: 20px 20px;
      border-radius: 10px;
      box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.75);
    }
  }
}
</style>
