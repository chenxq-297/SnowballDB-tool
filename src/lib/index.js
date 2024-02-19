"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @class snowballDb - 雪球库查询参数类
 * @time 2023.11.30
 * 2024.01.22 新增 clearOrdSortAndInit
 */
var snowballDb = exports["default"] = /*#__PURE__*/function () {
  function snowballDb(header) {
    _classCallCheck(this, snowballDb);
    // 初始化obj结构
    this.obj = _objectSpread({
      query: {
        fieldGroup: {
          fields: []
        },
        groupFields: []
      }
    }, header);
  }

  // query.selectProperties 等静态配置(不需要变动) groupFields、aggFields等
  // 静态配置queryCondition -> 配置:{pz1:123，pz2：123}
  _createClass(snowballDb, [{
    key: "addQueryParma",
    value: function addQueryParma(queryCondition) {
      this.obj.query = _objectSpread(_objectSpread({}, this.obj.query), queryCondition);
    }

    // 排序查询
    // query.ordSort 单个多个、修改、新增
  }, {
    key: "configOrdSort",
    value: function configOrdSort(name) {
      var _this$obj$query;
      var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ASC';
      var fieldsItem = (_this$obj$query = this.obj.query) === null || _this$obj$query === void 0 ? void 0 : _this$obj$query.ordSort.find(function (i) {
        return (i === null || i === void 0 ? void 0 : i.name) === name;
      });
      !fieldsItem || (fieldsItem === null || fieldsItem === void 0 ? void 0 : fieldsItem.length) === 0 ? this.obj.query.ordSort.push({
        name: name,
        order: order
      }) : fieldsItem.order = order;
      return this;
    }

    // 修改页码
    // query.pageable 单次
  }, {
    key: "configPageable",
    value: function configPageable(size, num) {
      this.obj.query.pageable = {
        pageSize: size,
        pageNum: num
      };
      return this;
    }

    // 配置分组
    // query.groupFields
  }, {
    key: "configGroupFields",
    value: function configGroupFields() {
      for (var _len = arguments.length, condition = new Array(_len), _key = 0; _key < _len; _key++) {
        condition[_key] = arguments[_key];
      }
      this.obj.query.groupFields = [].concat(condition);
      return this;
    }

    // 重新配置要返回的参数字段
    // query.selectProperties
  }, {
    key: "configSelectProperties",
    value: function configSelectProperties() {
      for (var _len2 = arguments.length, condition = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        condition[_key2] = arguments[_key2];
      }
      this.obj.query.selectProperties = [].concat(condition);
      return this;
    }

    // 清除query.fieldGroup.fields
    // query.fieldGroup.fields  
  }, {
    key: "clearFieldGroupFields",
    value: function clearFieldGroupFields() {
      this.obj.query.fieldGroup.fields = [];
      return this;
    }
    // 配置query.fieldGroup.fields
  }, {
    key: "configFieldGroupFields",
    value: function configFieldGroupFields(andOr, name, oper, value) {
      var _value$;
      // 使用场景: 添加条件为EQUAL时 不像like有%为初始值 判断如果EQUEAL时或异常 value值异常就不被添加
      if (Array.isArray(value) && ((_value$ = value[0]) === null || _value$ === void 0 ? void 0 : _value$.length) == 0 || typeof value == 'string' && value.length == 0 || !value) {
        return this;
      }
      var fieldsItem = [];
      // 如果首次为push 如果存在为修改数据
      if (Array.isArray(this.obj.query.fieldGroup.fields)) {
        fieldsItem = this.obj.query.fieldGroup.fields.find(function (i) {
          return (i === null || i === void 0 ? void 0 : i.name) == name;
        });
      }
      !fieldsItem ? this.obj.query.fieldGroup.fields.push({
        andOr: andOr,
        name: name,
        oper: oper,
        value: value
      }) : (fieldsItem.oper = oper, fieldsItem.value = value);
      return this;
    }

    // 清除排序并且初始化
  }, {
    key: "clearOrdSortAndInit",
    value: function clearOrdSortAndInit(name, order) {
      this.obj.query.ordSort = [];
      if (name && order) {
        this.configOrdSort(name, order);
      }
      return this;
    }

    // 24.1.24新增配置aggFields
  }, {
    key: "clearOrAggFieldsInit",
    value: function clearOrAggFieldsInit(arr) {
      this.obj.query.aggFields = [];
      this.obj.query.aggFields = arr;
      return this;
    }

    // aggFields配置未实现

    // query.fieldGroup.fieldGroups
    // configFieldGroup() {
    //     //...
    // }

    // 返回的最终的obj对象
    // ! 在未returnObj之前 操作的将会是同一个对象 !
  }, {
    key: "returnObj",
    value: function returnObj() {
      return JSON.parse(JSON.stringify(this.obj));
    }
  }]);
  return snowballDb;
}();
