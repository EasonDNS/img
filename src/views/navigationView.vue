<template>
  <div class="label-navigation">
    <draggable
      v-model="list"
      item-key="id"
      group="google"
      ghost-class="ghost-class"
      drag-class="drag-class"
      @end="onEnd"
    >
      <template #item="{ element }">
        <div class="go">
          <label-item :name="element.name" :icon="String(element.id)">
            {{ element.name }}
          </label-item>
        </div>
      </template>
    </draggable>

    <div class="test">
      <!--      <el-button type="danger" @click="test"> test </el-button>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import LabelItem from '@/components/LabelItemComponent.vue'
import { useNavigationStore } from '@/stores'
import draggable from 'vuedraggable'
// import--------------------------------------------------------------------------------------
// onMounted --------------------------------------------------------------------------------------
const navigationStore = useNavigationStore()
onMounted(async () => {
  await navigationStore.getMenuList()
})
// const list = ref([])
const list = ref([
  { id: 1, name: '0' },
  { id: 2, name: '1' },
  { id: 3, name: '2' },
  { id: 4, name: '3' }
])
const icon = import('@/assets/vue.svg')
// handle--------------------------------------------------------------------------------------
const test = async () => {
  const a = navigationStore.navigationMenu
  a.forEach((item) => {
    console.log('item', item.name)
  })
}

const onEnd = (e: any) => {
  console.log('end')
  console.log(e)
  console.log('=-==================')
  console.log(list.value)
  const index: any[] = []
  list.value.forEach((item: any) => {
    index.push(item.id)
  })
  console.log('index')
  console.log(index)
}
</script>
<style lang="less" scoped>
.label-navigation {
  background-color: rebeccapurple;

  .go {
    width: 200px;
    height: 200px;
    background-color: chartreuse;
    margin: 5px;
  }
  .ghost-class {
    border: 5px solid red;
  }
  .drag-class {
    border: 5px solid orange;
    border-radius: 50%;
  }
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
      //background-color: orangered;
      margin: 10px;
    }
  }
}
</style>
