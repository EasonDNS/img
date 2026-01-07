<template>
  <div class="label-navigation">
    <jxls-item></jxls-item>
    <div class="test">
      <!--      <el-button type="danger" @click="test"> test </el-button>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useNavigationStore } from '@/stores'
import { JxlsItem } from '@/base'
// import--------------------------------------------------------------------------------------
// onMounted --------------------------------------------------------------------------------------
const navigationStore = useNavigationStore()
onMounted(async () => {
  await navigationStore.getMenuList()
})
// handle--------------------------------------------------------------------------------------
const test = async () => {
  const a = navigationStore.navigationMenu
  a.forEach((item) => {
    console.log('item', item.name)
  })
}
</script>
<style lang="less" scoped>
.label-navigation {
  background-color: rebeccapurple;
  .content {
    width: 80%;
    //background-color: orange;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;

    .item {
      //width: 200px;
      //height: 200px;
      //background-color: orangered;
      margin: 10px;
    }
  }
}
</style>
