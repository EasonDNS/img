<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    url: string
    icon?: string
  }>(),
  {
    name: 'Nas',
    url: 'http://nas.easondns.top',
    icon: '/icon/vite.svg'
  }
)
// itemRadius 用来控制这个item Radius
const itemRadius = ref('5px')
// 背景图片
const imgUrl = ref('/down.png')
const nu = ref('')
const itemData = computed(() => {
  return {
    name: props.name,
    url: props.url,
    icon: props.icon
  }
})
</script>

<template>
  <div class="label-item" :style="{ borderRadius: `${itemRadius}` }">
    <div class="top">
      <div
        class="image"
        ref="imageRef"
        :style="{ backgroundImage: `url(${imgUrl})`, borderRadius: `${itemRadius}` }"
      >
        <span>{{ props.name }}</span>
      </div>
    </div>
    <div class="bottom">
      <span>
        {{ props.name }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">
.label-item {
  font-family:
    Inter, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    '微软雅黑', Arial, sans-serif;
  font-size: 20px;
  width: 200px;
  height: 200px;
  //background-color: #ffffff;
  cursor: pointer;

  border-radius: 5px;
  overflow: hidden;

  .top {
    width: 100%;
    height: 150px;
    //background-color: rosybrown;
    .image {
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: cover;
    }
  }
  .bottom {
    width: 100%;
    height: 50px;
    //background-color: olive;
    text-align: center;
    line-height: 50px;
  }
}
</style>
