<template>
  <div id="bgCanvas" ref="jxlsCanvasRef">
    <canvas ref="bgCanvas" id="bg"></canvas>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { createBubble } from '@/utils'
// eslint-disable-next-line no-undef
const props = defineProps({
  cH: {
    type: Number,
    default: window.innerHeight
  },
  num: {
    type: Number,
    default: 100
  },
  isShow: {
    type: Boolean,
    default: false
  }
})
const bgCanvas = ref<HTMLCanvasElement>()
const jxlsCanvasRef = ref<HTMLElement>()
const timers: number[] = []
//创建汽泡函数 =>timer
const resize = () => {
  timers.forEach((item) => {
    clearInterval(item)
  })
  const timer = createBubble(bgCanvas.value!, props.num)
  timers.push(timer)
}
window.addEventListener('resize', resize)
onMounted(() => {
  timers.push(createBubble(bgCanvas.value!, 200))
})
watch(
  () => props.isShow,
  (newValue) => {
    if (newValue === false) {
      window.removeEventListener('resize', resize)
      jxlsCanvasRef.value?.remove()
    }
  }
)
// 导出这个画板
// eslint-disable-next-line no-undef
defineExpose({
  jxlsCanvasRef
})
</script>
<style lang="less" scoped>
#bgCanvas {
  z-index: -1;
  position: absolute;
  bottom: 0;
  transition: all 2s ease;
  overflow: hidden;
  height: 100%;
}
.ol {
  animation: jxlsbg 2s ease;
}
#bg {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
}
</style>
