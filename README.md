# SnowballDB-tool
SnowballDB-tool是一个基于雪球库（睿帆科技）的前端参数整合工具。它的设计初衷是将业务参数与静态配置分离，从而提高代码的复用性和灵活性。

## 基础使用

### 安装

```node
npm i snowballdb-util -D
```

### 基础使用

```javascript
import snowballDb from 'snowballdb-util'

// 独立配置文件 example.config.js
// 初始化一个某实例的最外层静态配置
export const exampleConfig = new snowballDb({
  "sourceType": "DATASET",
  "accessKey": "keyNumTest",
  "severName": "tableName",
  "dataServiceId": "keyNumTest",
  "encrypted": false,
})

//调用addQueryParma调用query同层级静态配置(也可在new时候初始化 但不推荐)
exampleConfig.addQueryParma({
  "groupFields": [],
  "aggFields": [
    {
      "name": "text",
      "alias": "textAlias",
      "aggType": "SUM",
      "distinct": false
    },
  ],
  "ordSort": [
    {
      "name": "textField",
      "order": "DESC"
    },
  ],
  "selectProperties": [
    "backtextField",
  ]
})
```

```javascript
import {exampleConfig} from './example.config'

// 业务代码动态添加或配置参数(分页，排序,清除携带的动态参数，动态传参，最后返回对象)
// 分页，排序 默认覆盖 如果需要清除也有对应方法
// returnObj()返回新对象 与配置的正操作对象没有关联 类似建副本
let exampleParma = exampleConfig
				  	.configPageable(sizePrama, pagePrama)
					.configOrdSort('sortField','DESC')
					.clearFieldGroupFields()
        			.configFieldGroupFields('AND','pramaField','LIKE',[test + '%'])
        			.returnObj();

```

