import Ember from "ember";
import layout from "../templates/components/table-cell";
import EmberColumnData from "ember-column-data";

export default Ember.Component.extend(EmberColumnData.ColumnDataValueMixin, {
  layout : layout,

  tagName : "td",

  columnData : null,
  columnDataGroup : null,
  record : null,

  attributeBindings : ['colName:data-column-name'],
  colName : Ember.computed.alias("columnData.name"),
  classNameBindings : ["columnData.table.additionalTableCellClass"],

  mouseInRow : false,
  mouseInCell : false,

  mouseEnter : function() {
    this.set("mouseInCell", true);
  },
  mouseLeave : function() {
    this.set("mouseInCell", false);
  },
});
