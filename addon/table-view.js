/* jshint ignore:start */
var TableView = Ember.Namespace.create();

TableView.ROW_HEIGHT = 50;
TableView.ROW_BUFFER = 25;
TableView.ROW_LOAD_DELAY = 150;

/* Table main view */
TableView.TableView = Ember.View.extend({
  init : function(){
    this._super();
    this.set("colData", this.get('columnData').sortBy("tableOrder"));
    Ember.set("ROSUI.BaseDataObj.tableViewUserType_"+this.get("elementId"), this.get("userType"));
    Ember.set("ROSUI.BaseDataObj.tableViewColumnData_"+this.get("elementId"), this.get("colData"));
  },
  userType : 0,
  lazyDisplayConfig : function() {
    return LazyDisplay.LazyDisplayConfig.create({
      passKeys : ["userType", "columnData"],
      passValuePaths : ["ROSUI.BaseDataObj.tableViewUserType_"+this.get("elementId"), "ROSUI.BaseDataObj.tableViewColumnData_"+this.get("elementId")],
      lazyDisplayMainClass : "TableView.TableBody",
    });
  }.property(),

  layout : Ember.Handlebars.compile('' +
             '<div class="head-inner">'+
             '<table class="table table-striped table-hover main-table">'+
               '<thead>{{view TableView.TableHead columnData=view.colData rows=view.rows userType=view.userType}}</thead>' +
             '</table>'+
             '</div>'+
             '{{view LazyDisplay.LazyDisplay classNameBindings=":inner-table" lazyDisplayConfig=view.lazyDisplayConfig rows=view.rows}}'),
});


/* Table head wrapper view */
TableView.TableHead = Ember.ContainerView.extend({
  init :function(){
    this._super();
    var columnData = this.get('columnData');
    for(var k = 0; k < columnData.length; k++){
      if(columnData[k].get("isTableShort") && (!columnData[k].get("isRestricted") || ROSUI.Users[this.get("userType")].get("accessList").contains(columnData[k].get("accessName")))){
        var classNames = columnData[k].customClassNames || [];
        var cellSize = columnData[k].tableCellSize || "1";
        classNames.pushObject('col-md-'+cellSize);
        this.pushObject(TableView.TypeToCellMap[columnData[k].get("headCellType")].create({
          col : columnData[k],
          classNames : classNames,
          userType : this.get("userType"),
        }));
      }
    }
  },
  userType : 0,
  tagName: "tr",
});

/* Table head cell views */
TableView.TableHeadTextCell = Ember.View.extend({
  attributeBindings : ['colName:data-column-name'],
  colName : Ember.computed.alias("col.name"),
  tagName : "th",
  template : Ember.Handlebars.compile('{{#if view.col.tableColumnName}} {{view.col.tableColumnName}} {{else}} {{view.col.label}} {{/if}}'),
});

TableView.TableHeadCheckBox = TableView.TableHeadTextCell.extend({
  template : Ember.Handlebars.compile('<div>{{input type="checkbox" checked=controller.headCheck}}<label></label></div>'),
});

/* Tabel body warapper view */
TableView.TableBody = Ember.ContainerView.extend(LazyDisplay.LazyDisplayMainMixin, {
  tagName : "tbody",
  userType : 0,
  columnData : null,

  getRowView : function(row) {
    return TableView.TableRow.create({
      row : row,
      columnData : this.get("columnData"),
      userType : this.get("userType"),
      bodyView : this,
    });
  },
  getDummyView : function(row) {
    return TableView.TableRowDummy.create({
      row : row,
      columnData : this.get("columnData"),
    });
  },
});

/* Table row wrapper view */
TableView.TableRow = Ember.ContainerView.extend(LazyDisplay.LazyDisplayRow, {
  init : function(){
    this._super();
    var row = this.get("row"), columnData = this.get("columnData");
    for(var k = 0; k < columnData.length; k++){
      if(columnData[k].get("isTableShort") && (!columnData[k].get("isRestricted") || ROSUI.Users[this.get("userType")].get("accessList").contains(columnData[k].get("accessName")))){
        var classNames = columnData[k].customClassNames||[];
        var cellSize = columnData[k].tableCellSize || "1";
        classNames.pushObject('col-md-'+cellSize);
        this.pushObject(TableView.TypeToCellMap[columnData[k].get("cellType")].create({
          col : columnData[k],
          row : row,
          classNames : classNames,
          userType : this.get("userType"),
        }));
      }
    }
  },
  tagName : "tr",

  bodyView : null,

  mouseInRow : false,
  mouseEnter : function() {
    this.rowMouseEnter();
  },
  rowMouseEnter : function() {
    var prevRow = this.get("bodyView").findBy("mouseInRow", true);
    if(prevRow && prevRow !== this) prevRow.rowMouseLeave();

    this.set("mouseInRow", true);
    this.forEach(function(childView) {
      childView.rowMouseEnter();
    });
  },
  mouseLeave : function() {
    this.rowMouseLeave();
  },
  rowMouseLeave : function() {
    this.set("mouseInRow", false);
    this.forEach(function(childView) {
      childView.rowMouseLeave();
    });
  },
});

TableView.TableRowDummy = Ember.ContainerView.extend(LazyDisplay.LazyDisplayDummyRow, {
  init : function(){
    this._super();
    var row = this.get("row"), columnData = this.get("columnData");
    //adding empty tds to prevent a bug where the layout would break when empty trs were added before populated trs
    for(var k = 0; k < columnData.length; k++){
      if(columnData[k].get("isTableShort") && (!columnData[k].get("isRestricted") || ROSUI.Users[this.get("userType")].get("accessList").contains(columnData[k].get("accessName")))){
        var classNames = columnData[k].customClassNames||[];
        var cellSize = columnData[k].tableCellSize || "1";
        classNames.pushObject('col-md-'+cellSize);
        this.pushObject(TableView.TableCell.create({
          col : columnData[k],
          row : row,
          classNames : classNames,
        }));
      }
    }
  },
  tagName : 'tr',
  //might need these later on
  rowMouseEnter : function() {
  },
  rowMouseLeave : function() {
  },
});

/* Table cell views */
TableView.TableCell = Ember.View.extend({
  attributeBindings : ['colName:data-column-name'],
  colName : Ember.computed.alias("col.name"),

  userType : 0,
  tagName : "td",

  mouseInCell : false,
  mouseEnter : function() {
    this.cellMouseEnter();
  },
  cellMouseEnter : function() {
    this.set("mouseInCell", true);
  },
  mouseLeave : function() {
    this.cellMouseLeave();
  },
  cellMouseLeave : function() {
    this.set("mouseInCell", false);
  },

  mouseInRow : false,
  rowMouseEnter : function() {
    this.set("mouseInRow", true);
  },
  rowMouseLeave : function() {
    this.set("mouseInRow", false);
  },
});

TableView.TableTextCell = TableView.TableCell.extend({
  init : function(){
    this._super();
    var row=this.get("row");
    this.rowDidChange();
  },

  tagName : "td",
  attributeBindings : ['title'],
  template : Ember.Handlebars.compile('{{view.val}}'),
  title : function(){
    if(this.get("col").get("showTitle")) return this.get("val");
  }.property('col','col.showTitle'),
  val : function(key, value) {
    var col = this.get("col"), row = this.get("row");
    row._validation = row._validation || {};
    if(arguments.length > 1) {
      this.validateValue(value);
      row.set(col.name, value);
      return value;
    }
    else {
      value = row.get(col.name);
      this.validateValue(value);
      return value;
    }
  }.property('col', 'col.disabled'),

  validateValue : function(value) {
    var col = this.get("col"), row = this.get("row");
    if(col.get("validate") && !col.get("disabled")) {
      var validVal = col.validateValue(value);
      if(validVal[0]) row._validation[col.name] = 1;
      else delete row._validation[col.name];
      this.set("invalid", validVal[0]);
      this.set("invalidReason", !Ember.isEmpty(validVal[1]) && validVal[1]);
    }
    else {
      delete row._validation[col.name];
    }
    var validationFailed = false;
    for(var c in row._validation) {
      validationFailed = true;
    }
    row.set("validationFailed", validationFailed);
  },

  notifyValChange : function(obj, val) {
    this.notifyPropertyChange("val");
  },

  prevRow : null,
  rowDidChange : function() {
    var row = this.get("row"), prevRow = this.get("prevRow"),
        col = this.get("col");
    if(prevRow) {
      Ember.removeObserver(prevRow, col.name, this, "notifyValChange");
    }
    Ember.addObserver(row, col.name, this, "notifyValChange");
    this.set("prevRow", row);
    this.notifyValChange(row,row.get(col.name));
    if(col.get("disableForCols")) {
      col.get("disableForCols").forEach(function(disableCol) {
        this.disableCheck(disableCol.colName);
      }, this);
    }
  }.observes("view.row", "row"),
});

TableView.TableTextMapCell = TableView.TableTextCell.extend({
  template : Ember.Handlebars.compile('{{view.mappedVal}}'),
  mappedVal : function() {
    var options = this.get("col.options"),
        val = this.get("val"), selected = options.findBy("val", val);
    return selected && selected.label;
  }.property("val", "view.val"),
});

TableView.TableLinkTextCell = TableView.TableTextCell.extend({
  template : Ember.Handlebars.compile('{{#multi-link-to view "col" "row"}}{{view.val}}{{/multi-link-to}}'),
});

TableView.TableCellCheckBox = TableView.TableTextCell.extend({
  template : Ember.Handlebars.compile('<div>{{input type="checkbox" checked=view.val}}<label></label></div>'),
});

TableView.TableCellTextWithTooltip = TableView.TableTextCell.extend({
  template : Ember.Handlebars.compile('<span class="table-cell-tooltip" {{bind-attr title=view.title}}>{{view.val}}</span>'),
  title : Ember.computed.alias("col.tooltip"),
  didInsertElement : function() {
    $(this.get("element")).find(".table-cell-tooltip").tooltip();
  },
});


TableView.TableCellTextWithMultipleTooltip = TableView.TableCellTextWithTooltip.extend({
  title : function() {
    var val = this.get("val"), col = this.get("col"),
        opt = col.get("options").findBy("val", val);
    return opt && (opt.tooltip || opt.label);
  }.property("val", "view.val", "col", "view.col"),
});

TableView.TableCellImageWithTooltip = TableView.TableCellTextWithMultipleTooltip.extend({
  init : function(){
    this._super();
    this.iconClass();
  },
  iconClassName : "defaultValue",
  iconClass : function(){ 
    var icon = this.get("col.iconMap").findBy("val",this.get("val"));
    this.set("iconClassName",icon.icon);
  }.observes('view.val','val'),
  template : Ember.Handlebars.compile('<span {{bind-attr class=":table-cell-tooltip :myglyph view.iconClassName" title=view.title}}></span>'),
});

TableView.TableCellExtWrapper = TableView.TableTextCell.extend({
  init : function() {
    this._super();
    var extViews = [], row = this.get("row"),
        col = this.get("col"), exts = col.get("exts");
    for(var i = 0; i < exts.length; i++) {
      if(!exts[i].get("isRestricted") || ROSUI.Users[this.get("userType")].get("accessList").contains(exts[i].get("accessName"))) {
        extViews.pushObject({
          viewClass : TableView.TypeToCellMap[exts[i].get("extType")],
          extData : exts[i],
          row : row,
        });
      }
    }
    this.set("extViews", extViews);
  },

  extViews : [],

  template : Ember.Handlebars.compile('<div {{bind-attr class="view.mouseInRow::hidden"}}>{{#each view.extViews}}{{view this.viewClass extData=this.extData row=this.row}}{{/each}}</div>'),
});

/* Table extension views */
TableView.TableExtCell = Ember.View.extend({
  extData : null,
  row : null,
 // classNameBindings : [':col-md-1', ':col-tmpl'],
  classNameBindings : [':col-tmpl'],
});

TableView.TableExtOpenWindowCell = TableView.TableExtCell.extend({
  tagName : "span",
  layout : Ember.Handlebars.compile('<a type="button" data-toggle="modal" {{action view.extData.eventName view.row}} {{bind-attr data-target=view.extData.targetWindow}}>'+
                                      '{{#view Tooltip.Tooltip titleup=view.extData.toolTip datacontainer="false"}}' +
                                        '<span {{bind-attr class=":myglyph extData.glyphicon"}}></span>' +
                                      '{{/view}}' +
                                    '</a>'),
});

TableView.TableExtFireEvent = TableView.TableExtCell.extend({
  tagName : "span",
  layout : Ember.Handlebars.compile('<a type="button" {{action view.extData.eventName view.row}}>'+
                                      '{{#view Tooltip.Tooltip titleup=view.extData.toolTip datacontainer="false"}}' +
                                        '<span {{bind-attr class=":myglyph extData.glyphicon"}}></span>' +
                                      '{{/view}}' +
                                    '</a>'),
});

TableView.TableExtLinkTo = TableView.TableExtCell.extend({
  tagName : "span",
  layout : Ember.Handlebars.compile('{{#multi-link-to view "extData" "row"}}' +
                                      '{{#view Tooltip.Tooltip titleup=view.extData.toolTip datacontainer="false"}}' +
                                        '<span {{bind-attr class=":myglyph extData.glyphicon"}}></span>' +
                                      '{{/view}}' +
                                    '{{/multi-link-to}}'),
});


TableView.TypeToCellMap = {
  headTextLabel : TableView.TableHeadTextCell,
  headCheckBox : TableView.TableHeadCheckBox,

  textLabel : TableView.TableTextCell,
  textMappedLabel : TableView.TableTextMapCell,
  linkTextLabel : TableView.TableLinkTextCell,
  cellCheckBox : TableView.TableCellCheckBox,
  tooltipLabel : TableView.TableCellTextWithTooltip,
  multiTooltipLabel : TableView.TableCellTextWithMultipleTooltip,
  multiTooltipImageLabel : TableView.TableCellImageWithTooltip, 
  extWrapper : TableView.TableCellExtWrapper,
  openWindow : TableView.TableExtOpenWindowCell,
  fireEvent : TableView.TableExtFireEvent,
  linkTo : TableView.TableExtLinkTo,
};

Ember.Handlebars.registerHelper('multi-link-to', function(view, colAttr, rowAttr, options) {
  var view = options.data.view, args = [],
      col = view.get(colAttr), row = view.get(rowAttr);
  options.types = [];
  options.contexts = [];
  col.get("linkVars").forEach(function(linkVar) {
    this.args.push("view."+rowAttr+"."+linkVar);
    this.options.types.push("ID");
    this.options.contexts.push(this.that);
  }, {args : args, options : options, that : this});
  args.unshift(col.get("linkPath"));
  options.types.unshift("STRING");
  options.contexts.unshift(row);
  args.push(options);
  return Ember.Handlebars.helpers['link-to'].apply(this,args);
});
/* jshint ignore:end */
