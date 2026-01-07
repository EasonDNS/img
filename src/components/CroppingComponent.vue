<template>
  <div class="cropper">
    <div class="vue-cropper">
      <div class="left">
        <img class="image" :src="imgUrl" alt="" srcset="" ref="imgRef" />
        <div class="image-control">
          <div class="image-control-left">
            <el-icon @click="handleRefreshRight">
              <RefreshRight />
            </el-icon>
            <el-icon @click="handleRefreshLeft">
              <RefreshLeft />
            </el-icon>
          </div>
          <div class="image-control-right">
            <el-icon @click="handleAmplify">
              <RemoveFilled />
            </el-icon>
            <el-icon @click="handleReduce">
              <CirclePlusFilled />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="right">
        <h2 class="right-h2">预览</h2>
        <img class="right-image" :src="preUrl" alt="" />
      </div>
    </div>

    <div class="cropper-control">
      <el-button @click="handleUpdate" :dark="true" :type="typePlain" :size="elButtonSize"
        >上传
      </el-button>
      <ElButton @click="handleCancel" :dark="true" :type="typePlain" :size="elButtonSize"
        >取消
      </ElButton>
      <ElButton @click="handleReset" :dark="true" :type="typePlain" :size="elButtonSize"
        >重置
      </ElButton>
      <ElButton @click="handleSure" :dark="true" :type="typePlain" :size="elButtonSize"
        >确定
      </ElButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Cropper from 'cropperjs'
import { nextTick, onMounted, ref } from 'vue'

const imgUrl = ref('/one.jpg')
const elButtonSize = ref<'large' | 'default' | 'small'>('large')
type TypePlain = 'primary' | 'success' | 'warning' | 'danger' | 'info' | ''
const typePlain: TypePlain = 'primary'
const preUrl = ref('')
// 定义一个Cropper 实例
const cropper = ref<Cropper | null>(null)
// 记录初始 cropperImage 的transform 数据
const initTransform = ref<number | number[]>([])
// 初始Image HTML
const imgRef = ref()
//

const changePreUrl = async (e: any) => {
  const c = await e.target.$toCanvas()
  preUrl.value = c.toDataURL() ?? ''
}

const addEvent = async (cropper: Cropper) => {
  cropper.getCropperImage()?.$ready(() => {
    // cropper.getCropperImage()?.$center('cover')
    initTransform.value = cropper.getCropperImage()?.$getTransform() ?? []
  })
  const a = await cropper.getCropperSelection()?.$toCanvas({
    width: 150,
    height: 150
  })

  preUrl.value = a?.toDataURL() ?? ''

  cropper.getCropperSelection()?.addEventListener('change', changePreUrl)

  cropper.getCropperImage()?.addEventListener('transform', async () => {
    const b = await cropper.getCropperSelection()?.$toCanvas()
    preUrl.value = b?.toDataURL() ?? ''
  })
}

onMounted(() => {
  cropper.value = new Cropper(imgRef.value)
  addEvent(cropper.value)
})
//  -------------------------------------bu--------------------------

//  -------------------------------------handle--------------------------
// 上传
const handleUpdate = () => {
  console.log('handleUpdate')

  if (cropper.value) {
    cropper.value.getCropperCanvas()?.remove()
    imgUrl.value = '/two.jpg'
  }
  nextTick(() => {
    cropper.value = new Cropper(imgRef.value)
    addEvent(cropper.value)
  })
}
// 取消
const handleCancel = () => {
  console.log('handleCancel')
}
// 重置
const handleReset = () => {
  console.log('handleReset')
  console.log(cropper.value?.getCropperImage())
  console.log('------------------set-------------')
  console.log(cropper.value)

  console.log('-------------------------------')

  cropper.value?.getCropperSelection()?.$reset()
  cropper.value?.getCropperImage()?.$setTransform(initTransform.value)
}
// 确定
const handleSure = async () => {
  console.log('handleSure')
  const canvas = await cropper.value?.getCropperCanvas()?.$toCanvas()
  const dataUrl = canvas?.toDataURL()
  console.log(dataUrl)
}

//  -------------------------------------handle--------------------------
// 逆时针
const handleRefreshRight = () => {
  console.log('handleRefreshRight')
  const select = cropper.value?.getCropperImage()
  select?.$rotate('90deg')
}
// 顺时针
const handleRefreshLeft = () => {
  console.log('handleRefreshLeft')
  const select = cropper.value?.getCropperImage()
  select?.$rotate('-90deg')
}
// 放大
const handleAmplify = () => {
  console.log('handleAmplify')
  const select = cropper.value?.getCropperImage()
  select?.$zoom(-0.1)
}
// 缩小
const handleReduce = () => {
  console.log('handleReduce')
  const select = cropper.value?.getCropperImage()
  select?.$zoom(0.1)
}
</script>

<style scoped lang="less">
.cropper {
  width: 950px;
  height: 800px;
  background-color: #f6f2f2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  // 大上
  .vue-cropper {
    width: 100%;
    height: 88%;
    // background-color: rebeccapurple;
    display: flex;
    align-items: center;

    .left {
      // width: 80%;
      height: 100%;
      // background-color: royalblue;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 65%;
      // box-shadow: 0px 10px 39px 10px rgba(62, 66, 66, 0.22);
      .image {
        width: 400px;
        height: 400px;
        overflow: hidden;
        box-sizing: border-box;

        // background-color: rgb(240, 240, 235);
      }

      .image-control {
        width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // background-color: cadetblue;
        margin-bottom: 10px;
        font-size: 25px;

        .el-icon {
          // margin-left: 10px;
          // margin-right: 10px;
          margin: 0 10px;
          cursor: pointer;
          color: rgb(193, 193, 193);
        }

        .image-control-left {
          // background-color: #980e0e;
          // margin-left: 10px;
        }

        .image-control-right {
          // background-color: orange;
          // margin-right: 10px;
        }
      }
    }

    .right {
      width: 35%;
      height: 100%;
      box-sizing: border-box;
      overflow: hidden;

      // background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      // box-shadow: 0px 10px 39px 10px rgba(62, 66, 66, 0.22);
      .right-h2 {
        color: rgb(193, 193, 193);
        // border: 1px solid rgba(193, 193, 193, 0.6);
      }

      .right-image {
        width: 150px;
        height: 150px;

        // background-color: orange;
        margin-top: 10px;
        border-width: 3px;
      }
    }
  }

  //大下
  .cropper-control {
    // background-color: olive;

    width: 100%;
    height: 12%;

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    box-shadow: 0px 10px 39px 10px rgba(62, 66, 66, 0.22);

    .el-button {
      margin: 0 30px;
      padding: 0 40px;
      // font-size: 30px;
      font-size: 18px;
    }
  }
}

:deep(cropper-canvas) {
  width: 400px;
  height: 400px;
}
</style>
