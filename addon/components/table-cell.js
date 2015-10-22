import Ember from "ember";
//import EmberColumnData from "ember-column-data";
import EmberFlexModules from "ember-flex-modules";

export default EmberFlexModules.BaseText.extend({
  tagName : "td",

  attributeBindings : ['colName:data-column-name'],
  colName : Ember.computed.alias("columnData.name"),

  mouseInRow : false,
  mouseInCell : false,

  mouseEnter : function() {
    this.set("mouseInCell", true);
  },
  mouseLeave : function() {
    this.set("mouseInCell", false);
  },
});
