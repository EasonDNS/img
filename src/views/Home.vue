<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('this is home')
</script>

<template>
  <div class="home">
    <span> home</span>
    <span> {{ msg }}</span>
  </div>
</template>

<style scoped></style>
