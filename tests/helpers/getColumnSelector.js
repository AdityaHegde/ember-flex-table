export default function(column, inputType) {
  return ".ember-view[data-column-name='"+column+"'] " + inputType;
}
