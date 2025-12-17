<template>
  <div class="jxls-chart-card">
    <div class="jxls-chart-card-body">
      <div class="header">
        <div class="header-active" ref="headerRef">
          <slot name="header">
            <jxls-bar
              :data="chartData"
              :config="chartConfig"
              ref="jxlsBarRef"
              @change-data="handleBarChangeData"
            ></jxls-bar>
          </slot>
        </div>
      </div>
      <div class="content">
        <div class="active-buttons">
          <el-button text @click="handleActiveRefresh">
            <el-icon :size="20" color="rgba(0,188,212,0.8)"><RefreshRight /></el-icon>
          </el-button>
          <el-button text @click="handleActiveEdit">
            <el-icon :size="20" color="rgb(153,153,153)"><EditPen /></el-icon>
          </el-button>
        </div>
        <div class="content-bottom">
          <h3 class="content-bottom-title">{{ headerText }}</h3>
          <span class="content-bottom-brief"> {{ headerBrief }}</span>
        </div>
      </div>
      <div class="footer">
        <div class="footer-body">
          <slot name="footer">
            <el-icon><Warning /></el-icon>
            <span> {{ explain }} </span>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//---- --------------------------- import ----------------------------->
import { computed, type PropType, ref } from 'vue'
import type { I_CardConfig } from './type'
import JxlsBar from '@/base/JxlsEcharts/src/bar/JxlsBar.vue'
import type { I_EchartsBarConfig } from '@/base/JxlsEcharts/src/type'

//<!---------------------------- emits -------------------------------->
// eslint-disable-next-line no-undef
const emit = defineEmits<{
  (e: 'activeRefresh'): void
  (e: 'activeEdit', barRef: PropType<typeof JxlsBar>): void
}>()

// eslint-disable-next-line no-undef
const props = withDefaults(
  // eslint-disable-next-line no-undef
  defineProps<{
    cardConfig: I_CardConfig
    chartConfig: I_EchartsBarConfig
    chartData: any[]
  }>(),
  {
    cardConfig: () => {
      return {
        headerText: 'headerText',
        headerBrief: 'headerBrief',
        headerHeight: 260
      }
    }
  }
)

//<!---------------------------- let const  -------------------------------->
let headerText = ref<any>(props.cardConfig?.headerText)
let headerBrief = ref<any>(props.cardConfig?.headerBrief)
let explain = ref<string>(props.cardConfig.explain ?? 'explain')
let headerHeight = ref(props.cardConfig?.headerHeight)
const headerRef = ref<HTMLDivElement>()
const jxlsBarRef = ref<InstanceType<typeof JxlsBar>>()
const chartConfig = ref<I_EchartsBarConfig>(props.chartConfig)
let chartData = computed(() => props.chartData)

chartConfig.value.height = headerHeight.value

//<!---------------------------- handle fn -------------------------------->
const handleBarChangeData = (x: string | number | undefined, y: string | number | undefined) => {
  console.log(x)
  headerText.value = y
}
//<!---------------------------- handle active button   -------------------------------->
const handleActiveRefresh = () => {
  // 添加断言
  jxlsBarRef.value!.init()
  emit('activeRefresh')
}
const handleActiveEdit = () => {
  emit('activeEdit', jxlsBarRef.value)
}
//<!-- -------------------------live fn ---------------------------- -->
</script>

<style lang="less" scoped>
.jxls-chart-card {
  padding-top: 30px;
  .jxls-chart-card-body {
    width: 100%;
    background-color: rgba(60, 72, 88, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 6px;
    margin: 20px 0;
    position: relative;
    box-sizing: border-box;

    //<!---------------------------- header -------------------------------->
    .header {
      width: calc(100% - 30px);
      z-index: 2;
      margin-top: -20px;
      min-height: 160px;
      box-sizing: border-box;
      background: linear-gradient(60deg, #66bb6a, #43a047);
      border-radius: 6px;
      box-shadow:
        0 12px 20px -10px rgb(0 188 212 / 28%),
        0 4px 20px 0 rgb(0 0 0 / 12%),
        0 7px 8px -5px rgb(0 188 212 / 20%);
      transition: all 0.3s cubic-bezier(0.34, 1.61, 0.7, 1);
    }

    //<!---------------------------- content -------------------------------->
    .content {
      width: 100%;
      box-sizing: border-box;
      //background-color: rgba(255, 255, 255, 0.52);
      position: relative;
      //<!---------------------------- action buttons  -------------------------------->
      .active-buttons {
        height: 30px;
        //background-color: lemonchiffon;
        left: 15px;
        right: 15px;
        position: absolute;
        top: -30px;
        text-align: center;
        line-height: 20px;
        //z-index: -1;
        .el-button {
          padding: 0 5px;
        }
      }
      .content-bottom {
        margin-top: 10px;
        padding: 0 20px;
        box-sizing: border-box;
        text-align: left;
        .content-bottom-title {
          margin-bottom: 3px;
          font-size: 18px;
          line-height: 25px;
          color: rgba(212, 216, 222, 0.9);
        }
        .content-bottom-brief {
          font-size: 14px;
          line-height: 25px;
          color: rgba(153, 153, 153, 0.8);
        }
      }
    }

    //<!---------------------------- footer -------------------------------->
    .footer {
      width: 100%;
      box-sizing: border-box;
      padding: 0 20px;
      margin: 10px 0;
      color: #999;

      .footer-body {
        box-sizing: border-box;
        border-top: 1px solid rgba(238, 238, 238, 0.6);
        font-size: 12px;
        display: flex;
        justify-content: left;
        align-items: center;
        padding-top: 10px;

        .el-icon {
          margin-right: 10px;
        }
      }
    }
  }
  .jxls-chart-card-body:hover {
    //margin-top: 50px;
    .header {
      transform: translateY(-30px);
    }
  }
}
</style>
