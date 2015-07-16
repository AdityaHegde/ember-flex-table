import getRowByPos from "./getRowByPos";

export default function(column, row, isHead) {
  return (isHead ? "th" : getRowByPos(row)) + ".ember-view[data-column-name='"+column+"']";
}
