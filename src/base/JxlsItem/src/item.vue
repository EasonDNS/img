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
import { ref } from 'vue'
//<!------------------------------------------------------emit props ------------------------------------------------------->
const name = ref('google')
const imgSrc = ref('/vite.svg')

//<!------------------------------------------------------handle input fn  ------------------------------------------------------->

//<!------------------------------------------------------expose fn  ------------------------------------------------------->
</script>

<style lang="less" scoped></style>
