function drawGraphicByStore(var1,var2,var3,var4,_sizeRange,_dateStart){
// generate some random data, quite different range

var array1 ;
var array2 ;
var array3 ;
var array4 ;
var sizeRange;

array1 = var1.slice();
array2 = var2.slice();
array3 = var3.slice();
array4 = var4.slice();
sizeRange = _sizeRange;

var arrayDateStart= _dateStart.split("-");
   
function generateChartData() {
//var dss = new Date(arrayDateStart[1]+"-"+arrayDateStart[2]+"-"+arrayDateStart[0]);
    var chartData = [];
    //var firstDate = new Date();
    //firstDate.setDate(firstDate.getDate() - 100);
    
    for (var i = 0; i < sizeRange; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        // ne naegador safari al mes de se le quita 1 yaque safari lo aumenta en el mes .
        var newDate = new Date(arrayDateStart[0],arrayDateStart[1]-1,arrayDateStart[2]);
        newDate.setDate(newDate.getDate() + i);
        
        
        chartData.push({
            date: newDate,
            visits: array1[i],
            hits: array2[i],
            views: array3[i],
            carlos: array4[i]
            
        });

    }
    return chartData;
}

function zoomChart(){
    chart.zoomToIndexes(chart.dataProvider.length - 20, chart.dataProvider.length - 1);
}

var chartData = generateChartData();
var chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "light",
    "legend": {
        "useGraphSettings": true
     },
    "dataProvider": chartData,
    "valueAxes": [{/**ventas**/
        "id":"v1",
        "axisColor": "#09B1B4",
        "axisThickness": 2,
        "gridAlpha": 0,
        "offset": 0,
        "axisAlpha": 1,
        "position": "left"
    }, {/**metas*/
        //"id":"v2",
        "axisColor": "#F84E05",
        "axisThickness": 2,/**grosor linea vertical*/
        "gridAlpha": 0,
        "offset": 60,/**ubicacion linea vertical (mas ala izquierda o mas ala derecha)*/
        "axisAlpha": 1,
        "position": "left"
    }, {/**punto equilibrio*/
        "id":"v3",
        "axisColor": "#009543",/**verde*/
        "axisThickness": 2,/**ancho linea vertical*/
        "gridAlpha": 0,
        "offset": 40,
        "axisAlpha": 1,
        "position": "right"
    }, {/**goaltotal**/
        "id":"v3",
        "axisColor": "#0052E1",
        "axisThickness": 2,
        "gridAlpha": 0,
        "offset": 1,
        "axisAlpha": 1,
        "position": "right"
    }],
    "graphs": [{/**venta**/
        //"valueAxis": "v1",
        "lineColor": "#09B1B4",/*celeste*/
        "bullet": "round",
        "bulletBorderThickness": 1,
        "hideBulletsCount": 30,
        "title": MSG_SALES(),
        "valueField": "visits",
		"fillAlphas": 0
    }, {/**meta**/
        "valueAxis": "v2",
        "lineColor": "#F84E05",/**naranja*/
        "bullet": "round",
        "bulletBorderThickness": 1,
        "hideBulletsCount": 20,
        "title": MSG_GOAL(),
        "valueField": "hits",
		"fillAlphas": 0
    }, {/***punto equilibrio*/
        
        "lineColor": "#009543",/**verde**/
        "bullet": "round",
        "bulletBorderThickness": 1,
        "hideBulletsCount": 20,
        "title": MSG_BREAKEVEN(),
        "valueField": "views",
		"fillAlphas": 0
    }, {/**meta total**/
       
        "lineColor": "#0052E1",/**azul*/
        "bullet": "round",
        "bulletBorderThickness": 1,
        "hideBulletsCount": 20,
        "title": MSG_TOTAL_GOAL(),
        "valueField": "carlos",
		"fillAlphas": 0
    }],
    "chartScrollbar": {},
    "chartCursor": {
        "cursorPosition": "mouse"
    },
    "categoryField": "date",
    "categoryAxis": {
        "parseDates": true,
        "axisColor": "#DADADA",
        "minorGridEnabled": true
    },
    "export": {
    	"enabled": true,
        "position": "bottom-right"
     }
});

chart.addListener("dataUpdated", zoomChart);
zoomChart();
}