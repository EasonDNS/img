<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    name?: string
    url?: string
    imgUrl?: string
  }>(),
  {
    name: 'Nas',
    url: 'https://nas.easondns.top',
    imgUrl: '/icon/vite.svg'
  }
)
// itemRadius 用来控制这个item Radius
const itemRadius = ref('5px')
// 背景图片
// const imgUrl = ref('/public/icon/zcy.jpg')

const imgUrl = ref('http://localhost:3000/file/uploads/one.png')
const nu = ref('')
const test = () => {
  console.log(itemData)
  itemData.value.imgUrl = imgUrl.value
}

const width = ref('150px')
const height = ref('150px')

const itemData = ref({
  name: props.name,
  url: props.url,
  imgUrl: props.imgUrl
})
</script>

<template>
  <div
    class="label-item"
    :style="{ borderRadius: `${itemRadius}`, width: `${width}`, height: `${height}` }"
  >
    <div class="top" @click="test">
      <div
        class="image"
        ref="imageRef"
        :style="{ backgroundImage: `url(${itemData.imgUrl})`, borderRadius: `${itemRadius}` }"
      >
        <!--        <span>{{ itemData.name }}</span>-->
      </div>
    </div>
    <div class="bottom">
      <span>
        {{ itemData.name }}
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
  background-color: #1081b6;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  //margin-bottom: 10px;
  //margin-left: 10px;

  .top {
    width: 100%;
    height: 120px;
    //background-color: rosybrown;
    .image {
      width: 100%;
      height: 100%;
      background-position: center;
      //background-size: cover;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .bottom {
    width: 100%;
    height: 30px;
    //background-color: olive;
    text-align: center;
    line-height: 30px;
  }
}
</style>
