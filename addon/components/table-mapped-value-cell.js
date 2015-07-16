import Ember from "ember";
import layout from "../templates/components/table-mapped-value-cell";
import TableCell from "./table-cell";

export default TableCell.extend({
  layout : layout,

  mappedValue : Ember.computed("value", {
    get : function() {
      var
      columnData = this.get("columnData"),
      tableColumnData = columnData.get("table"),
      options = columnData.get(tableColumnData.get("optionsPath")),
      value = this.get("value"),
      option = options.findBy(tableColumnData.get("valuePath"), value);
      return option.get(tableColumnData.get("mappedValuePath"));
    },
  }),
});
