import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
/* jshint ignore:start */
import initTable from "./initTable";
import arrayOperation from "./arrayOperation";
import createArray from "./createArray";
import verifyCheckboxes from "./verifyCheckboxes";
import clickFormElement from "./clickFormElement";
import fillFormElement from "./fillFormElement";
/* jshint ignore:end */

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
