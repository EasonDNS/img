<template>
  <div class="label-navigation">
    <draggable
      v-model="list"
      item-key="id"
      group="google"
      ghost-class="ghost-class"
      drag-class="drag-class"
      @end="onEnd"
      class="label-page"
    >
      <template #item="{ element }">
        <label-item :name="element.name" :img-url="String(element.imgUrl)" :url="element.url">
          {{ element.name }}
        </label-item>
      </template>
      <template #footer>
        <label-item>sina</label-item>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
// import--------------------------------------------------------------------------------------
import { onMounted, ref } from 'vue'
import LabelItem from '@/components/LabelItemComponent.vue'
import { useNavigationStore } from '@/stores'
import draggable from 'vuedraggable'
import { localCache } from '@/utils'
import { nAxios } from '@/services'
// import--------------------------------------------------------------------------------------
// import--------------------------------------------------------------------------------------
// onMounted ----------------------------------------------------------------------------------
const navigationStore = useNavigationStore()
onMounted(async () => {
  // 去后端 更新 菜单
  await navigationStore.getMenuList()
  // 更新或存入local
  localCache.removeItem('navigationMenuList')
  localCache.set('navigationMenuList', navigationStore.navigationMenu)
})
let list = ref(navigationStore.navigationMenu)
// handle------------------------------------------------------------------------------------
const onEnd = (e: any) => {
  const origin = localCache.get('navigationMenuList')
  const newArray = list.value
  const changeItem = selectItem(origin, newArray)
  changeItem.forEach(async (item) => {
    const res = await nAxios.patch(`/patch/${item.id}`, {
      id: item.id,
      ids: item.index,
      name: item.name
    })
  })
}
// tools--------------------------------------------------------------------------------------

// 这个函数把改变位置了的item 筛选出来
const selectItem = (originArray: [], newArray: any[]) => {
  const changeItem: any[] = []
  originArray.forEach((item, index) => {
    if (item.id != newArray[index].id) {
      console.log(item.name)
      console.log(newArray[index].name)

      changeItem.push({
        name: newArray[index].name,
        ids: newArray[index].ids,
        id: newArray[index].id,
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
    border: 5px solid red;
  }
  .drag-class {
    border: 5px solid orange;
    border-radius: 50%;
  }
}
</style>
