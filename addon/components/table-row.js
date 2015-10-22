//import Ember from "ember";
import layout from "../templates/components/table-row";
import EmberFlexModules from "ember-flex-modules";

export default EmberFlexModules.MultiComponent.extend({
  layout : layout,

  tagName : "tr",

  mouseInRow : false,
  mouseEnter : function() {
    this.set("mouseInRow", true);
  },
  mouseLeave : function() {
    this.set("mouseInRow", false);
  },
});
