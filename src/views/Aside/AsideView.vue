<template>
  <div class="asideView">
    <div class="asideControl" @click="handleCollapse">
      <el-icon size="50px"><Menu /></el-icon>
      <span v-if="!isCollapse">导航</span>
    </div>

    <el-menu
      mode="vertical"
      :default-active="defaultActive"
      :default-openeds="defaultOpen"
      :router="true"
      :unique-opened="true"
      :close-on-click-outside="true"
      :collapse="isCollapse"
      active-text-color="#ffd04b"
    >
      <template v-for="item in asideConfig" :key="item.name">
        <template v-if="item.children">
          <el-sub-menu
            :index="item.url"
            :expand-open-icon="expandOpenIcon"
            :expand-close-icon="expandCloseIcon"
          >
            <template #title>
              <el-icon>
                <component :is="item.iconName"> </component>
              </el-icon>
              <span>
                {{ item.name }}
              </span>
            </template>
            <template v-for="childrenItem of item.children" :key="childrenItem.name">
              <el-menu-item :index="childrenItem.url">
                <template #title>
                  <el-icon>
                    <component :is="childrenItem.iconName"></component>
                  </el-icon>
                  <span>{{ childrenItem.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.url">
            <el-icon>
              <component :is="item.iconName"></component>
            </el-icon>
            <template #title>
              <span>
                {{ item.name }}
              </span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { asideConfig } from './config'
import { ref } from 'vue'
import { usePublicStore } from '@/stores'

const defaultActive = ref('/')
const defaultOpen = ref(['/nas'])
const isCollapse = ref(false)
const publicStore = usePublicStore()
const handleCollapse = () => {
  publicStore.isExpand = !publicStore.isExpand
  isCollapse.value = !publicStore.isExpand
}

const expandOpenIcon = 'Minus'
const expandCloseIcon = 'Plus'
</script>
<style lang="less" scoped>
.asideView {
  .asideControl {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-icon {
      //margin-right: 10px;
    }
    span {
      margin-left: 10px;
    }
  }
  .el-menu {
    // 菜单背景颜色
    //--el-menu-bg-color: rgba(29, 30, 31, 0.8);
    //--el-menu-bg-color: #409eff;
    //菜单的文字颜色

    //--el-menu-text-color: #303133;
    //--el-menu-text-color: red;
    // 活动菜单项的文本颜色
    //--el-menu-active-color: #0aa624;
    //--el-menu-active-bg-color: rgba(23, 121, 218, 0.8);
    //--el-menu-active-color: #409eff !important;
  }
}
</style>
<!--<style>-->
<!--:root {-->
<!--  &#45;&#45;el-menu-active-color: #064417;-->
<!--}-->
<!--</style>-->
