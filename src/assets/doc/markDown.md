- 使用的是自动识别 文档的语言 不需要在代码块上设置 语言.

- 默认使用主题 "" 如果 需要切换主题 只需要更改主题 **地址** 或是把主题`css` 文件 下载到公用文件夹下.然后更新**地址**

```js
const handleRefreshLeft = () => {
  console.log('handleRefreshLeft')
  const select = cropper.value?.getCropperImage()
  select?.$rotate('-90deg')
}
```

### 2.10 表格

可以使用冒号来定义表格的对齐方式，如下：

| 姓名       | 年龄 |         工作 |
| :--------- | :--: | -----------: |
| 小可爱     |  18  |     吃可爱多 |
| 小小勇敢   |  20  |   爬棵勇敢树 |
| 小小小机智 |  22  | 看一本机智书 |
