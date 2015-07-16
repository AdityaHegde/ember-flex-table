import Ember from "ember";

export default Ember.Test.registerAsyncHelper('verifyCheckboxes', function (app, assert, selector, result) {
  var
  eles = $(selector),
  checkedStatus = [];
  for(var i = 0; i < eles.length; i++) {
    checkedStatus.push(eles[i].checked);
  }
  assert.deepEqual(checkedStatus, result);
});
