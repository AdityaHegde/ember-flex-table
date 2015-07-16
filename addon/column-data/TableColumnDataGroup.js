import Ember from "ember";
import TableRowTypesMap from "./table-row-types-map";

export default Ember.Object.extend({
  /**
   * @property tableRowType
   * @type String
   * @default "base"
   */
  tableRowType : "base",
  
  /**
   * Component string for the component of tableRowType. Defaults to "base" type for invalid tableRowType.
   *
   * @property tableRowComponent
   * @readonly
   */
  tableRowComponent : Ember.computed("tableRowType", {
    get : function() {
      return TableRowTypesMap[this.get("tableRowType")] || TableRowTypesMap.base;
    },
  }),
});
