import Ember from "ember";
import EmberArrayModifier from "ember-array-modifier";

var ArrayModifier = Ember.ArrayProxy.extend(EmberArrayModifier.ArrayModifierMixin, {
});

export default Ember.Route.extend({
  model : function() {
    return ArrayModifier.create({
      content : Ember.A([
        Ember.Object.create({vara : "vara0", varb : "v0"}),
        Ember.Object.create({vara : "vara1", varb : "v1"}),
        Ember.Object.create({vara : "vara2", varb : "v1"}),
        Ember.Object.create({vara : "vara3", varb : "v0"}),
        Ember.Object.create({vara : "vara4", varb : "v2"}),
      ]),
      unique_id : "test",
    });
  },
});
