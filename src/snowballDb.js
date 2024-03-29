/**
 * @class snowballDb - 雪球库查询参数类
 * @time 2023.11.30
 * 2024.01.22 新增 clearOrdSortAndInit
 */
export default class snowballDb {
    constructor(header) {
        // 初始化obj结构
        this.obj = {
            query: {
                fieldGroup: {
                    fields: []
                },
                groupFields: []
            },
            ...header
        }
    }

    // query.selectProperties 等静态配置(不需要变动) groupFields、aggFields等
    // 静态配置queryCondition -> 配置:{pz1:123，pz2：123}
    addQueryParma(queryCondition) {
        this.obj.query = {
            ...this.obj.query,
            ...queryCondition
        }
    }

    // 排序查询
    // query.ordSort 单个多个、修改、新增
    configOrdSort(name, order = 'ASC') {
        const fieldsItem = this.obj.query?.ordSort.find((i) => i?.name === name)
        !fieldsItem || fieldsItem?.length === 0 ? this.obj.query.ordSort.push({ name: name, order: order }) : (fieldsItem.order = order)
        return this
    }

    // 修改页码
    // query.pageable 单次
    configPageable(size, num) {
        this.obj.query.pageable = {
            pageSize: size,
            pageNum: num
        }

        return this
    }

    // 配置分组
    // query.groupFields
    configGroupFields(...condition) {
        this.obj.query.groupFields = [...condition]
        return this
    }

    // 重新配置要返回的参数字段
    // query.selectProperties
    configSelectProperties(...condition) {
        this.obj.query.selectProperties = [...condition]
        return this
    }

    // 清除query.fieldGroup.fields
    // query.fieldGroup.fields  
    clearFieldGroupFields() {
        this.obj.query.fieldGroup.fields = []
        return this
    }
    // 配置query.fieldGroup.fields
    configFieldGroupFields(andOr, name, oper, value) {
        // 使用场景: 添加条件为EQUAL时 不像like有%为初始值 判断如果EQUEAL时或异常 value值异常就不被添加
        if ((Array.isArray(value) && value[0]?.length == 0) || (typeof value == 'string' && value.length == 0) || !value) {
            return this
        }

        let fieldsItem = []
        // 如果首次为push 如果存在为修改数据
        if (Array.isArray(this.obj.query.fieldGroup.fields)) {
            fieldsItem = this.obj.query.fieldGroup.fields.find((i) => i?.name == name)
        }
        !fieldsItem
            ? this.obj.query.fieldGroup.fields.push({ andOr, name, oper, value })
            : ((fieldsItem.oper = oper), (fieldsItem.value = value))

        return this
    }

    // 清除排序并且初始化
    clearOrdSortAndInit(name, order) {
        this.obj.query.ordSort = []
        if (name && order) {
            this.configOrdSort(name, order)
        }
        return this
    }

    // 24.1.24新增配置aggFields
    clearOrAggFieldsInit(arr) {
        this.obj.query.aggFields = []
        this.obj.query.aggFields = arr
        return this
    }

    // aggFields配置未实现

    // query.fieldGroup.fieldGroups
    // configFieldGroup() {
    //     //...
    // }

    // 返回的最终的obj对象
    // ! 在未returnObj之前 操作的将会是同一个对象 !
    returnObj() {
        return JSON.parse(JSON.stringify(this.obj))
    }
}
