import Ember from "ember";
import EmberObjectUtils from "ember-object-utils";
import TableCellTypesMap from "./table-cell-types-map";
import TableHeadTypesMap from "./table-head-types-map";

export default Ember.Object.extend({
  /**
   * @property tableHeadType
   * @type String
   * @default "base"
   */
  tableHeadType : "base",
  
  /**
   * Component string for the component of tableHeadType. Defaults to "base" type for invalid tableHeadType.
   *
   * @property tableHeadComponent
   * @readonly
   */
  tableHeadComponent : Ember.computed("tableHeadType", {
    get : function() {
      return TableHeadTypesMap[this.get("tableHeadType")] || TableHeadTypesMap.base;
    },
  }),

  /**
   * @property tableCellType
   * @type String
   * @default "base"
   */
  tableCellType : "base",
  
  /**
   * Component string for the component of tableCellType. Defaults to "base" type for invalid tableCellType.
   *
   * @property tableCellComponent
   * @readonly
   */
  tableCellComponent : Ember.computed("tableCellType", {
    get : function() {
      return TableCellTypesMap[this.get("tableCellType")] || TableCellTypesMap.base;
    },
  }),

  /**
   * Path to options on columnData to get mapped value from.
   *
   * @property optionsPath
   * @type String
   * @default "table.options"
   */
  optionsPath : "table.options",

  /**
   * Options needed for mapped value cell.
   *
   * @property options
   * @type Array
   */
  options : EmberObjectUtils.hasMany(),

  /**
   * Path to the value on the option.
   *
   * @property valuePath
   * @type String
   * @default "value"
   */
  valuePath : "value",

  /**
   * Path to mapped value on the option.
   *
   * @property mappedValuePath
   * @type String
   * @default "label"
   */
  mappedValuePath : "label",
});
