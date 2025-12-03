<template>
  <div class="asideView">
    <div class="asideControl">
      <span @click="handleCollapse">good</span>
    </div>

    <el-menu
      class="el-menu-vertical-demo"
      mode="vertical"
      :default-active="defaultActive"
      :default-openeds="defaultOpen"
      :router="true"
      :unique-opened="true"
      :close-on-click-outside="true"
      :collapse="isCollapse"
      :popper-class="test"
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

const defaultActive = ref('/')
const defaultOpen = ref(['/nas'])
const isCollapse = ref(false)

const handleCollapse = () => {
  console.log('handleCollapse')
  isCollapse.value = !isCollapse.value
}

const expandOpenIcon = 'Minus'
const expandCloseIcon = 'Plus'
// const i = ref(1)
// const b = 'share'
// const currentIconComponent = b

// const iconSize = ref('20px')
</script>
<style lang="less" scoped>
.asideView {
  .asideControl {
    height: 50px;
  }
  .el-menu-vertical-demo {
    .test {
      font-size: 100px;
    }
  }
}
</style>
