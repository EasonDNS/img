<template>
  <div class="mark-down">
    <el-button type="success" @click="changeTheme" v-if="isShowChangeButton"> 切换主题 </el-button>
    <div class="mark-content" v-html="markdown"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { markedHighlight } from 'marked-highlight'
import { Marked } from 'marked'
import hljs from 'highlight.js' // ?raw 是 Vite 的用法，用于导入原始 .md 文件内容 ✅
import defaultMarkdown from '../../public/doc/markDown.md?raw'

const hljsCss = import('@/assets/CSS/atom-one-dark.css')
//-----------------------------------------------------
const props = withDefaults(
  defineProps<{
    codeData?: string
    isShowChangeButton?: boolean
  }>(),
  {
    codeData: defaultMarkdown,
    isShowChangeButton: false
  }
)

//-----------------------用法------------------------------
/*
  *  组件默认接受一个codeData => 就是md 文档的数据

 */
//-----------------------------------------------------
const setTheme = (themePath?: string) => {
  const id = 'hljs-theme'
  const href = themePath ?? String(hljsCss)
  const existing = document.getElementById('hljs-theme')

  if (existing) {
    ;(existing as HTMLAnchorElement).href = href
  } else {
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  }
}

const markdown = ref<string | Promise<string>>('')

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs jxls-',
    highlight(code) {
      return hljs.highlightAuto(code).value
    }
  })
)
markdown.value = marked.parse(props.codeData)

//-----------------------------------------------------
const changeTheme = async (newContent: any) => {
  console.log('changeTheme()')
  markdown.value = marked.parse(newContent)
}

onMounted(() => {
  setTheme()
})
</script>

<style lang="less" scoped>
.mark-down {
  background-color: rgba(255, 255, 255, 0.44);
  font-size: 18px;

  :deep(code) {
    transition: all 0.5s ease;
  }
  :deep(table) {
    border-collapse: collapse;
    th,
    td {
      border: 1px solid rgba(244, 244, 244, 0.58);
    }
  }
  .mark-content {
    transition: all 2s ease;
  }
}
</style>
