import Ember from "ember";
import EmberArrayModifier from "ember-array-modifier";

export default Ember.Test.registerAsyncHelper('createArray', function (app, assert) {
  Ember.run(function() {
    assert.array = Ember.ArrayProxy.createWithMixins(EmberArrayModifier.ArrayModifierMixin, {
      content : Ember.A([
        Ember.Object.create({vara : "test1", varb : true,  varc : "valA"}),
        Ember.Object.create({vara : "test5", varb : false, varc : "valC"}),
        Ember.Object.create({vara : "test2", varb : true,  varc : "valB"}),
        Ember.Object.create({vara : "test4", varb : true,  varc : "valC"}),
        Ember.Object.create({vara : "test6", varb : false, varc : "valA"}),
        Ember.Object.create({vara : "test3", varb : false, varc : "valA"}),
        Ember.Object.create({vara : "test8", varb : true,  varc : "valB"}),
        Ember.Object.create({vara : "test7", varb : true,  varc : "valA"}),
      ]),
      unique_id : "test",
    });
  });
});
