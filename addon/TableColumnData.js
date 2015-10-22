import Ember from "ember";
import EmberObjectUtils from "ember-object-utils";
import EmberColumnData from "ember-column-data";
import EmberFlexModules from "ember-flex-modules";

var TableColumnData = Ember.Object.extend(EmberFlexModules.ModuleColumnDataMixin, {
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

  moduleName : "table",
});

EmberColumnData.ColumnData.reopen({
  table : EmberObjectUtils.belongsTo(TableColumnData),
});

export default TableColumnData;
