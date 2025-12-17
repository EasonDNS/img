<template>
  <div class="jxls-status-card">
    <div class="body">
      <div class="top">
        <div class="left">
          <div class="left-float" :style="defaultStyle">
            <slot name="headerIcon">
              <el-icon :size="50"><Plus /></el-icon>
            </slot>
          </div>
        </div>
        <div class="right">
          <p class="category">{{ category }}</p>
          <h2 class="title">
            <span>
              {{ title }}
            </span>
          </h2>
        </div>
      </div>

      <hr />
      <div class="bottom">
        <slot name="briefIcon">
          <el-icon><Clock /></el-icon>
        </slot>
        <span> {{ brief }} </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//<!---------------------------import-------------------------------->
import { reactive, ref } from 'vue'

//<!---------------------------props-------------------------------->

// eslint-disable-next-line no-undef
const props = defineProps<{
  category: {
    type: string
  }
  title: {
    type: string
  }
  brief: {
    type: string
  }
  background: {
    type: string
  }
}>()
//<!---------------------------emits-------------------------------->

//<!---------------------------let const -------------------------------->
let category = ref(props.category ?? 'category')
let title = ref(props.title ?? 'title')
let brief = ref(props.brief ?? 'brief')

const defaultStyle = reactive({
  background: props.background ?? `linear-gradient(60deg, #26c6da, #00acc1)`
})
//<!---------------------------fn ------------------------------->

//<!----------------------------handle fn------------------------------->

//<!----------------------------live Fn------------------------------->

//<!----------------------------tools ------------------------------->

//<!---------------------------- expose------------------------------->
</script>

<style lang="less" scoped>
.jxls-status-card {
  //background-color: orange;
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  padding: 15px;
  //margin-top: 50px;
  overflow: hidden;
  .body {
    background-color: rgba(230, 231, 236, 0.9);
    margin-top: 30px;
    border-radius: 6px;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%);
    hr {
      opacity: 0.6;
      margin: 5px 10px;
      color: #eee;
    }
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        //background-color: orangered;
        position: relative;

        width: 100px;
        height: 100px;
        .left-float {
          height: 100%;
          width: 100%;
          line-height: 100px;
          position: absolute;
          font-size: 16px;
          top: -35px;
          left: 50px;
          border-radius: 6px;
          box-shadow:
            0 12px 20px -10px rgba(76, 175, 80, 0.28),
            0 4px 20px 0 rgba(0, 0, 0, 0.12),
            0 7px 8px -5px rgba(76, 175, 80, 0.2);
          //background: linear-gradient(60deg, #26c6da, #00acc1);
          .el-icon {
            width: 100%;
            height: 100%;
          }
        }
      }
      .right {
        margin-right: 15px;
        padding-right: 15px;
        //color: #999;
        .category {
          font-size: 14px;
          color: #999999;
        }
        .title {
          color: #3c4858;
        }
      }
    }
    .bottom {
      //background-color: orchid;

      padding: 5px 20px;
      display: flex;
      justify-content: left;
      align-items: center;
      line-height: 22px;
      font-size: 16px;

      .el-icon {
        margin-right: 15px;
        color: #999;
      }
      span {
        color: #999;
      }
    }
  }
}
</style>
