<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面未找到</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 100px;
}
.not-found h1 {
  font-size: 6rem;
  color: #ff6f61;
}
.not-found p {
  font-size: 1.5rem;
  margin: 20px 0;
}
</style>
