<template>
  <div class="item">
    <div class="top">
      <img :src="imgSrc" alt="" />
    </div>
    <div class="footer">
      <span>{{ name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue' //<!------------------------------------------------------emit props ------------------------------------------------------->
//<!------------------------------------------------------emit props ------------------------------------------------------->
const name = ref('google')
const imgSrc = ref('/icon/vite.svg')

//<!------------------------------------------------------handle input fn  ------------------------------------------------------->

//<!------------------------------------------------------expose fn  ------------------------------------------------------->
</script>

<style lang="less" scoped>
.item {
  width: 200px;
  height: 200px;
  background-color: indianred;
  .top {
    img {
      width: 100%;
      height: 100px;
    }
  }
}
</style>
