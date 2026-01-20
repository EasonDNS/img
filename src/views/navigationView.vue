<template>
  <div class="label-navigation">
    <draggable
      v-model="list"
      item-key="id"
      grop="grop"
      ghost-class="ghost-class"
      drag-class="drag-class"
      @end="onEnd"
      @start="onStart"
      @change="onChange"
      class="label-page"
      v-bind="draggableOption"
    >
      <template #item="{ element }">
        <label-item :name="element.name" :img-url="String(element.imgUrl)" :url="element.url">
          {{ element.name }}
        </label-item>
      </template>
      <template #footer>
        <div class="footer" @click="onAdd">
          <el-icon size="80"><Plus /></el-icon>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
// import--------------------------------------------------------------------------------------
import {onMounted, ref} from 'vue'
import LabelItem from '@/components/LabelItemComponent.vue'
import {useNavigationStore} from '@/stores'
import draggable from 'vuedraggable'
import {localCache} from '@/utils'
import type {INavigation} from './Type.ts'
import type {INavigationMenuType} from '@/stores/IStoreType.ts'
import {nAxios} from '@/services' // import--------------------------------------------------------------------------------------
// import--------------------------------------------------------------------------------------
// import--------------------------------------------------------------------------------------
// onMounted ----------------------------------------------------------------------------------
const navigationStore = useNavigationStore()
const draggableOption = ref({
  animation: 200,
  disabled: false
})
onMounted(async () => {
  // 去后端 更新 菜单
  await navigationStore.getMenuList()
  // 更新或存入local
  localCache.removeItem('navigationMenuList')
  localCache.set('navigationMenuList', navigationStore.navigationMenu)
})
let list = ref(navigationStore.navigationMenu)
let originArray = ref(navigationStore.navigationMenu)
let newArray = ref(navigationStore.navigationMenu)

// handle------------------------------------------------------------------------------------
const onEnd = async (e: any) => {
  newArray.value = list.value
  const changeItem = selectItem(originArray.value, newArray.value)
  await navigationStore.updateMenuList(list.value)
  originArray.value = list.value
  console.log('change============>', changeItem)

  await executeSql(changeItem)
}
const onStart = (e: any) => {
  console.log('start')
  // console.log(e)
}
const onChange = (e: any) => {
  console.log('change')
}
const onAdd = () => {
  console.log('onAdd')
}
// tools--------------------------------------------------------------------------------------
const executeSql = async (changeItem: INavigation[]) => {
  for (const item of changeItem) {
    const res = await nAxios.patch(`/patch/${item.id}`, {
      id: item.id,
      ids: item.index + 1,
      name: item.name
    })
  }
  // const res = await nAxios.patch(`/patch/${item.id}`, item.data)
}
// 这个函数把改变位置了的item 筛选出来 其实这里应该是要限制一下传入的数组类型 必须要有id,ids, name
const selectItem = (originArray: INavigationMenuType[], newArray: INavigationMenuType[]) => {
  let changeItem: INavigation[] = []
  originArray.forEach((item, index) => {
    if (item.id != newArray[index]?.id) {
      changeItem.push({
        name: newArray[index]?.name,
        ids: newArray[index]?.ids || null,
        id: newArray[index]!.id,
        index
      })
    }
  })
  return changeItem
}
</script>
<style lang="less" scoped>
.label-navigation {
  background-color: rebeccapurple;

  .label-page {
    display: grid;
    align-items: center;
    justify-items: center;
    justify-content: center;
    align-content: center;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
    grid-template-rows: repeat(auto-fill, 1fr);
    background-color: #8b1111;
    padding: 10px;
    //min-width: 1900px;
    //max-width: ;
  }
  .ghost-class {
    border: 8px solid rgba(16, 16, 16, 0.8);
  }
  .drag-class {
    border: 10px solid rgb(139, 17, 17);
    cursor: move;
  }
  .footer {
    width: 150px;
    height: 150px;
    cursor: pointer;
    border-radius: 5px;
    background-color: rebeccapurple;
    display: flex;
    align-content: center;
    justify-content: center;
    justify-items: center;
    align-items: center;
  }
}
</style>
