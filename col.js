var jsdom = require('jsdom');


//console.log(JSON.stringify(valueTypeObject));
var self = this;
self.valueTypeObject = require('./valueType.json');

jsdom.env(
    "http://nodejs.org/dist/",
    ["http://code.jquery.com/jquery.js"],
    function (errors, window) {
        var $ = window.$;

        if (typeof $ == 'undefined') {
            console.log('jQuery has not been loaded!');
        }
        else {
            console.log('jQuery loaded!');
        }

        var _defColWidth=2;
        var _columnNames ='id__entity__count__discriminator__severity__ticket.ticketID__firstOccurence__timestamp__zen_eventid__alert__connector__state__groups__lastOccurence__lastTouched__owner__description';
        var _selectedColumns ='id__entity__count__discriminator__ticket.ticketID__severity';
        var alertData;

        if(alertData ==undefined || alertData == null || alertData == '' ){
            alertData = {
                rows : [],
                page : "1",
                total : "0",
                records : "0"
            };
        }
        var columnHeader = [];
        if(_columnNames != undefined && _columnNames != null && _columnNames.trim().length>0){
            // columnNameWithId= "id__"+_columnNames;
            columnNameWithId= _columnNames;
            columnHeader = columnNameWithId.split("__");
        }
        var checkedColumn = [];
        if(_selectedColumns != undefined && _selectedColumns != null && _selectedColumns.trim().length>0){
            checkedColumn = _selectedColumns.split("__");
        }
        //console.log(checkedColumn);


        var index,hidden;
        var i = 0;
        var alignColumn = 'left';
        var columnModel = [];
//loop to generate column model from checked column names
        for ( var columnIndex in columnHeader) {
            i++;
            //console.log(columnHeader[columnIndex]);
            //index = $.inArray(columnHeader[columnIndex],checkedColumn);

            if(index == -1){
                hidden = true;
            }else{
                hidden = false;
            }
            var colModel = {};
            var colWidth = _defColWidth;
            if(self.valueTypeObject.hasOwnProperty(columnHeader[columnIndex])){//check for key is existing
                if(self.valueTypeObject[columnHeader[columnIndex]].hasOwnProperty("colWidth")){
                    colWidth = self.valueTypeObject[columnHeader[columnIndex]]["colWidth"];
                }
                if (columnHeader[columnIndex].indexOf('.') != -1) {
                    colModel.name = columnHeader[columnIndex].split('.')[1];
                    colModel.jsonmap = columnHeader[columnIndex];
                } else {
                    colModel.name = columnHeader[columnIndex];
                }

                colModel.index = i;
                colModel.width = colWidth;
                colModel.hidden = hidden;
                colModel.sortable=true;
                if(self.valueTypeObject[columnHeader[columnIndex]]["type"].trim()=="date"){ //column model set for date type column
                    colModel.formatter='date';
                    colModel.sorttype= 'date';
                    colModel.formatoptions={srcformat: "Y-m-d H:i:s",
                        newformat: 'Y-m-d H:i:s',
                        defaultValue:null};
                }else if(self.valueTypeObject[columnHeader[columnIndex]]["type"].trim()=="number"){ //column model set for number type column
                    colModel.sorttype= 'number';
                }else{ //column model set for text type column
                    colModel.formatter='text';
                    colModel.sorttype= 'text';
                }
            }
            columnModel.push(colModel);


        }
        console.log(JSON.stringify(columnModel));

    }
);

