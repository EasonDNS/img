<template>
  <div class="label-navigation">
    <j-loader :bgc="bgc"></j-loader>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
// import { JLoader } from '@/base
import { JLoader } from '@/base/JxlsLoader/index.ts'

import { useNavigationStore } from '@/stores'

onMounted(async () => {
  console.log('navigationView')
  const navigationStore = useNavigationStore()
  const data = await navigationStore.getAll()
  console.log('data')
  console.log(data)
})

const bgc = ref('orangered')
</script>
<style lang="less" scoped>
.label-navigation {
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
      background-color: orangered;
      margin: 10px;
    }
  }
}
</style>
