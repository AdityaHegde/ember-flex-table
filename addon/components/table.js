import Ember from "ember";
import layout from "../templates/components/table";

export default Ember.Component.extend({
  layout : layout,

  /**
   * ColumnDataGroup for the component
   *
   * @property columnDataGroup
   */
  columnDataGroup : null,

  /**
   * The actual list of columns to display
   *
   * @property columns
   * @readonly
   */
  columns : Ember.computed("columnDataGroup.columns.@each", {
    get : function() {
      var
      columns = this.get("columnDataGroup.columns");
      columns = Ember.A(columns.filter(function(columnData) {
        return !Ember.isEmpty(columnData.get("table"));
      }));
      columns = Ember.A(columns.sortBy("tableOrder"));
      return columns;
    },
  }),

  /**
   * The master record which has details for the rows.
   * This should have ArrayModifierMixin if has to support array modifiers.
   * "arrangedContent" of this is used for rows.
   *
   * @property record
   */
  record : null,
});
