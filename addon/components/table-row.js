import Ember from "ember";
import layout from "../templates/components/table-row";

export default Ember.Component.extend({
  layout : layout,

  tagName : "tr",
  columns : null,
  columnDataGroup : null,
  record : null,

  classNameBindings : ["columnDataGroup.table.additionalTableRowClass"],

  mouseInRow : false,
  mouseEnter : function() {
    this.set("mouseInRow", true);
  },
  mouseLeave : function() {
    this.set("mouseInRow", false);
  },
});
