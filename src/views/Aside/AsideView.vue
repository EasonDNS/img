<template>
  <div class="asideView">
    <div class="asideControl" @click="handleCollapse">
      <el-icon size="40px"><Menu /></el-icon>
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
    //这默认有个0.85px的边框需要去除
    border-right: none;
  }
}
</style>
