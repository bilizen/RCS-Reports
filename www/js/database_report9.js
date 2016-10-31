$(document).ready(function(){
 document.addEventListener("deviceready", onDeviceReady, false);
 function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, true);
}
function onBackKeyDown() {
}
});

$(window).load(function(){
   onInit();    
   deteclenguage9();
   valuesGroupDate();
   downloadByRegion();
});

//rotation screem
$(window).resize(function () {
    hideComboRegion();
});
function hideComboRegion() {
    
    var windowh = $(window).height();
    var headerh = $('header').height();
    var regionh = $('#divRegion').height();
    var selectdateP = $('.select-dateP').height();
    var selectGeneral = $('.select-general').height();
    $('.list').height(windowh - headerh - selectdateP - selectGeneral -20);
}



//************** Descargar data por Region, en el array en el indice byRegion:2*********//
function downloadByRegion() {
    var xurl = "";
    var c_ip = "";
    var c_port = "";
    var c_site = "";

    //pinta el titulo del reporte9
    $('#txt_title').text("");
    
    localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ' + TABLE_URL + ' WHERE  ' + KEY_USE + ' = 1', [], function (tx, results) {
            c_ip = results.rows.item(0).ip;
            c_port = results.rows.item(0).port;
            c_site = results.rows.item(0).site;

            xurl = 'http://' + c_ip + ':' + c_port + '/' + c_site + '/Report9NewOrComp/POST';

            var option =localStorage.RCSReports_report9_valuesRangeDates;
            var day=todayreport1();
            var employeeCode=localStorage.RCSReportsEmployeeCode;
            var array= {Option: option,Day:day,EmployeeCode:employeeCode};
            $.ajax({
                url: xurl,
                type: 'POST',
                data: JSON.stringify(array),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                crossdomain: true,
                beforeSend: function () {
                    showLoading();
                },
                complete: function () {
                    hideLoading();
                },
                success: function (data) {
                    $("#items").empty();
                    if (data.quantity > 0) {
                        var Typecode;
                        var Trans;
                        var Units;
                        var LYSales;
                        var TYSales;
                        var PVAR;
                        var Discount;
                        var PDISC;
                        var UnitsSale;
                        var SSale;
                        var Margin;
                        var UnitsMD;
                        var MDSoles;
                        var PMDSoles;

                        var mostrar="";
                        mostrar += "<div id='divByRegion'>";                        
                        $(data.report).each(function (index, value) {
                            Typecode=value.Typecode;
                            Discount=value.Discount;
                            LYSales=value.LYSales;
                            MDSoles= value.MDSoles;
                            Margin=value.Margin;
                            PDISC=value.PDISC;
                            PMDSoles=value.PMDSoles;
                            PVAR=value.PVAR;
                            SSale=value.SSale;
                            TYSales=value.TYSales;
                            Trans=value.Trans;
                            Units=value.Units;
                            UnitsMD=value.UnitsMD;
                            UnitsSale=value.UnitsSale;
                            mostrar += "<div class='store waves-effect waves-light'>";
                            mostrar += "<h1>" + Typecode + "</h1>";
                            mostrar += "<table class='table'>"+
                            "<thead>"+
                            "<tr>"+
                            "<th>trans</th>"+
                            "<th>units</th>"+
                            "<th>LYsales</th>"+
                            "<th>TYsales</th>"+
                            "<th>%VAR</th>"+
                            "<th>Discount</th>"+
                            "<th>Disc%</th>"+
                            "<th>Units/sale</th>"+
                            "<th>$/sale</th>"+
                            "<th>Margin%</th>"+
                            "<th>UnitsMD</th>"+
                            "<th>MD$</th>"+
                            "<th>MD%</th>"+
                            "</tr>"+
                            "</thead>"+
                            "<tbody id='list-empleados'>";
                            mostrar +="<td>"+Trans+"</td>"; 
                            mostrar +="<td>"+Units+"</td>"; 
                            mostrar +="<td>"+LYSales+"</td>"; 
                            mostrar +="<td>"+TYSales+"</td>"; 
                            mostrar +="<td>"+PVAR+"</td>"; 
                            mostrar +="<td>"+Discount+"</td>"; 
                            mostrar +="<td>"+PDISC+"</td>";
                            mostrar +="<td>"+UnitsSale+"</td>"; 
                            mostrar +="<td>"+SSale+"</td>"; 
                            mostrar +="<td>"+Margin+"</td>";
                            mostrar +="<td>"+UnitsMD+"</td>";
                            mostrar +="<td>"+MDSoles+"</td>";
                            mostrar +="<td>"+PMDSoles+"</td></tr>"; 
                            mostrar +="</tbody>";
                            mostrar +="</table>";
                            mostrar += "</div>";                
                            });
                       
                        mostrar += "</div>";
                        $("#items").append(mostrar);   
                    }else{
                        if (current_lang == 'es'){
                            mostrarModalGeneral("No hay datos");
                        }     
                        else{
                            mostrarModalGeneral("No data");
                        }
                    }
                    hideComboRegion();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(xhr.statusText);
                    console.log(xhr.responseText);
                    if (current_lang == 'es'){
                        mostrarModalGeneral("Error de Conexión");
                    }     
                    else{
                        mostrarModalGeneral("No Connection");
                    }
                }
            });
        });
    });
}


//verifica los los switch si estan activos
function valuesGroupDate(){
    if(null==localStorage.RCSReports_report9_valuesRangeDates){
        localStorage.RCSReports_report9_valuesRangeDates=1;
    }else{
        localStorage.RCSReports_report9_valuesRangeDates=1;
    }
}


function rangeOfToday(){
    localStorage.RCSReports_report9_valuesRangeDates=1;
    downloadByRegion();
}
function rangeOfYesterday(){
    localStorage.RCSReports_report9_valuesRangeDates=2;
    downloadByRegion(); 
}

function rangeOfWeek(){
    localStorage.RCSReports_report9_valuesRangeDates=3;
    downloadByRegion();
}

function rangeOfMonth(){
    localStorage.RCSReports_report9_valuesRangeDates=4;
    downloadByRegion();
}

function rangeOfYear(){
    localStorage.RCSReports_report9_valuesRangeDates=5;
    downloadByRegion();
}

function  deteclenguage9(){
    var lang = navigator.language.split("-");
    var current_lang = (lang[0]);
    if (current_lang == 'es') {
        changeLanguage9();
    }
}