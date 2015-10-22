//import Ember from "ember";
import layout from "../templates/components/table-head";
import EmberFlexModules from "ember-flex-modules";

export default EmberFlexModules.MultiComponent.extend({
  layout : layout,

  tagName : "thead",
});
