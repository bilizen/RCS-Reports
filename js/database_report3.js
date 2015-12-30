function combo() {
    var xurl = "";
    var ip = "";
    var port = "";
    var alias = "";
    var site = "";
    localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ' + TABLE_URL + ' WHERE ' + KEY_USE + ' = 1', [], function (tx, results) {
            ip = results.rows.item(0).ip;
            port = results.rows.item(0).port;
            alias = results.rows.item(0).alias;
            site = results.rows.item(0).site;
            var xurl = "http://" + ip + ":" + port + "/" + site + "/Region/";
            $.ajax({
                type: 'get',
                timeout: 15000,
                url: xurl,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                crossdomain: true,
                beforeSend: function () {
                    showLoading();
                }, complete: function () {
                    hideLoading();
                }, success: function (data, textStatus, XMLHttpRequest) {//variable docuemntacion
                    $("#select-region").empty();
                    var vacio = "";
                    if (localStorage.lang == "es") {
                        $("#select-region").append("<div class='item selected' value='" + vacio + "' onclick=refresh_report3('');>Todas las Regiones</div><hr>");
                    } else {
                        $("#select-region").append("<div class='item selected' value='" + vacio + "'  onclick=refresh_report3('');>All Regions</div><hr>");
                    }
                    var mostrar = "";
                    if (data.quantity == "1") {
                        $(data.data).each(function (index, value) {
                            mostrar += "<div class=item  value='" + value.regionCode + "'  onclick=refresh_report3('" + value.regionCode + "');>" + value.regionName + "</div><hr>";
                        });
                    }
                    $("#select-region").append(mostrar);

                }});
        });
    });


}

///cambiar tamaño de la barra de desplazamiento
function henry3() {
    $('.section.list').height($(window).height() - ($('header').height() + $('.select-region').height() + $('nav').height()) - 2);
    $(window).resize(function () {
        $('.section.list').height($(window).height() - ($('header').height() + $('.select-region').height() + $('nav').height()) - 2);
    });

    $('.heightSection').height($(window).height() - ($('header').height() + $('.section_content').height()));
    $(window).resize(function () {
        $('.heightSection').height($(window).height() - ($('header').height() + $('.section_content').height()));
    });

}


//***************** funcion muestra los datos en el campo principal    ***************//
function refresh_report3(regionCode) {
    var xurl = "";
    var ip = "";
    var port = "";
    var alias = "";
    var site = "";
    var dateStart = "";
    var dateEnd = "";
    var dateUntil = "";
    var array;
    var sumTotalGoal = 0;
    var sumPercentGoal = 0;
    var sumPercentSale = 0;
    localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ' + TABLE_URL + ' WHERE ' + KEY_USE + ' = 1', [], function (tx, results) {
            ip = results.rows.item(0).ip;
            port = results.rows.item(0).port;
            alias = results.rows.item(0).alias;
            site = results.rows.item(0).site;
            xurl = "http://" + ip + ":" + port + "/" + site + "/ReportClasification/POST";
            localDB.transaction(function (tx) {

                tx.executeSql('SELECT * FROM CRANGEDATE', [], function (tx, results) {
                    dateStart = results.rows.item(0).dateStart;
                    dateEnd = results.rows.item(0).dateEnd;
                    dateUntil = results.rows.item(0).dateChoosed;
                    array = {DateStart: dateStart, DateEnd: dateEnd, DateUntil: dateUntil, RegionCode: regionCode};
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
                        }, complete: function () {
                            hideLoading();
                        }, success: function (data) {
                            $("#contentReport3").empty();
                            if (data.successful > 0) {
                                var can = 0;
                                var show = "";
                                show += "<div id='divClasification'>";
                                $(data.report).each(function (index, value) {
                                    var StoreName = value.StoreName;
                                    var AcumulateGoal = parseFloat(value.AcumulateGoal);
                                    var AcumulateSale = parseFloat(value.AcumulateSale);
                                    var MonthGoalStore = parseFloat(value.MonthGoalStore);
                                    sumTotalGoal += MonthGoalStore;
                                    sumPercentGoal += AcumulateGoal;
                                    sumPercentSale += AcumulateSale;
                                    show += "<div class='store progressByStore'>";
                                    show += "<h1>" + StoreName + "</h1>";
                                    show += "<i class='T'>T:</i>";
                                    show += "<p class='clasification'>" + MonthGoalStore.toFixed(0) + "</p>";
                                    show += "<i class='PG'>PG:</i>";
                                    show += "<p class='clasification' id='PercentGoal'>" + AcumulateGoal.toFixed(2) + "%</p>";
                                    show += "<i class='PS'>PS:</i>";
                                    show += "<span class='percentage' id='PercentSale'>" + AcumulateSale.toFixed(2) + "%</span>";
                                    show += "</div><hr>";
                                    can = index;
                                });
                                show += "</div>";
                                sumTotalGoal = sumTotalGoal;
                                sumPercentGoal = (sumPercentGoal / (can + 1)).toFixed(2);
                                sumPercentSale = (sumPercentSale / (can + 1)).toFixed(2);
                            }
                            $('#contentReport3').append(show);
                            henry3();
                            $('#totalpromedio').empty();
                            $('#totalpromedio').append(sumTotalGoal);
                            $('#totalGoalPercentage').empty();
                            $('#totalGoalPercentage').append(sumPercentGoal + "%");
                            $('#totalSalePercentage').empty();
                            $('#totalSalePercentage').append(sumPercentSale + '%');
                        }, error: function (xhr, ajaxOptions, thrownError) {
                            console.log(xhr.status);
                            console.log(xhr.statusText);
                            console.log(xhr.responseText);
                            hideLoading();
                            if (current_lang == 'es') {
                                mostrarModalGeneral("Error de Conexión");
                            } else {
                                mostrarModalGeneral("No Connection");
                            }
                        }
                    });
                }
                );
            }
            );
        });
    });
}


/*********muestra los datos en el campo principal despues hacer click en el boton back*********/
function butttonBack3() {
    try {
        var regionCod = $('.item.selected').attr('value').toString();
        refresh_report3(regionCod);
    } catch (e) {
        console.log("Error: " + e);
    }
}

function existDataDate_report3() {
    var count = 0;
    var xurl = "";
    var ip = "";
    var port = "";
    var alias = "";
    var site = "";
    localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ' + TABLE_URL + ' WHERE ' + KEY_USE + ' = 1', [], function (tx, results) {
            ip = results.rows.item(0).ip;
            port = results.rows.item(0).port;
            alias = results.rows.item(0).alias;
            site = results.rows.item(0).site;
            xurl = "http://" + ip + ":" + port + "/" + site + "/ReportClasification/POST";
            var query = "SELECT COUNT(*) AS countRDate FROM " + TABLE_CUSTOM_DATE_RANGE;
            try {
                localDB.transaction(function (transaction) {
                    transaction.executeSql(query, [], function (transaction, results) {
                        count = results.rows.item(0).countRDate;
                        if (count > 0) {
                            localDB.transaction(function (tx) {
                                tx.executeSql('SELECT * FROM ' + TABLE_CUSTOM_DATE_RANGE, [], function (tx, results) {

                                    var dateStart = results.rows.item(0).dateStart.toString();
                                    var dateEnd = results.rows.item(0).dateEnd.toString();
                                    var dateUntil = results.rows.item(0).dateChoosed.toString();
                                    document.getElementById('dateStart').innerHTML = dateStart;
                                    document.getElementById('dateEnd').innerHTML = dateEnd;
                                    document.getElementById('dateToCompare').innerHTML = dateUntil;
                                    ////////////////////////////////// insertar data primera vez  
                                    var sumTotalGoal = 0;
                                    var sumPercentGoal = 0;
                                    var sumPercentSale = 0;
                                    //var xurl="http://190.12.74.148:8000/WCFSERVICE/ReportClasification/POST"; 
                                    var array = {DateStart: dateStart, DateEnd: dateEnd, DateUntil: dateUntil, RegionCode: ""};
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
                                        }, complete: function () {
                                            hideLoading();
                                        }, success: function (data) {
                                            $("#contentReport3").empty();
                                            if (data.successful > 0) {
                                                var can = 0;
                                                var show = "";
                                                show += "<div id='divClasification'>";
                                                $(data.report).each(function (index, value) {
                                                    var StoreName = value.StoreName;
                                                    var AcumulateGoal = parseFloat(value.AcumulateGoal);
                                                    var AcumulateSale = parseFloat(value.AcumulateSale);
                                                    var MonthGoalStore = parseFloat(value.MonthGoalStore);
                                                    sumTotalGoal += MonthGoalStore;
                                                    sumPercentGoal += AcumulateGoal;
                                                    sumPercentSale += AcumulateSale;
                                                    show += "<div class='store progressByStore'>";
                                                    show += "<h1>" + StoreName + "</h1>";
                                                    show += "<i class='T'>T:</i>";
                                                    show += "<p class='clasification'>" + MonthGoalStore.toFixed(0) + "</p>";
                                                    show += "<i class='PG'>PG:</i>";
                                                    show += "<p class='clasification' id='PercentGoal'>" + AcumulateGoal.toFixed(2) + "%</p>";
                                                    show += "<i class='PS'>PS:</i>";
                                                    show += "<span class='percentage' id='PercentSale'>" + AcumulateSale.toFixed(2) + "%</span>";
                                                    show += "</div><hr>";
                                                    can = index;
                                                });
                                                show += "</div>";
                                                sumTotalGoal = sumTotalGoal;
                                                sumPercentGoal = (sumPercentGoal / (can + 1)).toFixed(2);
                                                sumPercentSale = (sumPercentSale / (can + 1)).toFixed(2);
                                            }
                                            $('#contentReport3').append(show);
                                            henry3();
                                            $('#totalpromedio').empty();
                                            $('#totalpromedio').append(sumTotalGoal);
                                            $('#totalGoalPercentage').empty();
                                            $('#totalGoalPercentage').append(sumPercentGoal + "%");
                                            $('#totalSalePercentage').empty();
                                            $('#totalSalePercentage').append(sumPercentSale + '%');
                                        }, error: function (xhr, ajaxOptions, thrownError) {
                                            console.log(xhr.status);
                                            console.log(xhr.statusText);
                                            console.log(xhr.responseText);
                                            hideLoading();
                                            if (current_lang == 'es') {
                                                mostrarModalGeneral("Error de Conexión");
                                            } else {
                                                mostrarModalGeneral("No Connection");
                                            }
                                        }
                                    });
                                });
                            });
                        } else {
                            /***asignamos fecha por defecto la primera vez***/
                            /***date of today ***/
                            var obj_date = new Date();
                            var monthToday = obj_date.getMonth() + 1;
                            var dayToday = obj_date.getDate();
                            var dateOfToday = obj_date.getFullYear() + '-' +
                                    (('' + monthToday).length < 2 ? '0' : '') + monthToday + '-' +
                                    (('' + dayToday).length < 2 ? '0' : '') + dayToday;
                            /*** dateStart of Month ***/
                            var obj_date2 = new Date();
                            var month = obj_date2.getMonth() + 1;
                            var firstDayMonth = new Date(obj_date2.getFullYear(), obj_date2.getMonth(), 1); /**only day**/
                            var dateStartMonth = obj_date2.getFullYear() + '-' +
                                    (('' + month).length < 2 ? '0' : '') + month + '-' +
                                    (('' + firstDayMonth.getDate()).length < 2 ? '0' : '') + firstDayMonth.getDate();
                            insertFirstTimeDate_report3(dateStartMonth, dateOfToday, dateOfToday);
                            document.getElementById('dateStart').innerHTML = dateStartMonth;
                            document.getElementById('dateEnd').innerHTML = dateOfToday;
                            document.getElementById('dateToCompare').innerHTML = dateOfToday;
                            /////////////////////////////////////insertar data primera vez    

                            var sumTotalGoal = 0;
                            var sumPercentGoal = 0;
                            var sumPercentSale = 0;
                            //var xurl="http://190.12.74.148:8000/WCFSERVICE/ReportClasification/POST"; 
                            var array = {DateStart: dateStartMonth, DateEnd: dateOfToday, DateUntil: dateOfToday, RegionCode: ""};
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
                                }, complete: function () {
                                    hideLoading();
                                }, success: function (data) {
                                    $("#contentReport3").empty();
                                    if (data.successful > 0) {
                                        var can = 0;
                                        var show = "";
                                        show += "<div id='divClasification'>";
                                        $(data.report).each(function (index, value) {
                                            var StoreName = value.StoreName;
                                            var AcumulateGoal = parseFloat(value.AcumulateGoal);
                                            var AcumulateSale = parseFloat(value.AcumulateSale);
                                            var MonthGoalStore = parseFloat(value.MonthGoalStore);
                                            sumTotalGoal += MonthGoalStore;
                                            sumPercentGoal += AcumulateGoal;
                                            sumPercentSale += AcumulateSale;
                                            //console.log(StoreName+" "+PercentGoal+" "+PercentSale+" "+MonthGoalStore);
                                            show += "<div class='store progressByStore'>";
                                            show += "<h1>" + StoreName + "</h1>";
                                            show += "<i class='T'>T:</i>";
                                            show += "<p class='clasification'>" + MonthGoalStore.toFixed(0) + "</p>";
                                            show += "<i class='PG'>PG:</i>";
                                            show += "<p class='clasification' id='PercentGoal'>" + AcumulateGoal.toFixed(2) + "%</p>";
                                            show += "<i class='PS'>PS:</i>";
                                            show += "<span class='percentage' id='PercentSale'>" + AcumulateSale.toFixed(2) + "%</span>";
                                            show += "</div><hr>";
                                            can = index;
                                        });
                                        show += "</div>";
                                        sumTotalGoal = sumTotalGoal;
                                        sumPercentGoal = (sumPercentGoal / (can + 1)).toFixed(2);
                                        sumPercentSale = (sumPercentSale / (can + 1)).toFixed(2);
                                    }
                                    $('#contentReport3').append(show);
                                    henry3();
                                    $('#totalpromedio').empty();
                                    $('#totalpromedio').append(sumTotalGoal);
                                    $('#totalGoalPercentage').empty();
                                    $('#totalGoalPercentage').append(sumPercentGoal + "%");
                                    $('#totalSalePercentage').empty();
                                    $('#totalSalePercentage').append(sumPercentSale + "%");
                                }, error: function (xhr, ajaxOptions, thrownError) {
                                    console.log(xhr.status);
                                    console.log(xhr.statusText);
                                    console.log(xhr.responseText);
                                    hideLoading();
                                    if (current_lang == 'es') {
                                        mostrarModalGeneral("Error de Conexión");
                                    } else {
                                        mostrarModalGeneral("No Connection");
                                    }
                                }
                            });
                            ////////////////////////////////////////////////////        
                        }
                    }, function (transaction, error) {
                        console.log("Error: " + error.code + "<br>Mensage: " + error.message);
                    });
                });
            } catch (e) {
                console.log("Error existsData " + e + ".");
            }
        });
    });
}


/*****************actualizar_fecha*******************************/
function updaTableCustomDate3() {
    var dateStar = document.getElementById('dateStart').innerHTML;
    var dateEnd = document.getElementById('dateEnd').innerHTML;
    var dateToCompare = document.getElementById('dateToCompare').innerHTML;
    localDB.transaction(function (tx) {
        tx.executeSql("UPDATE " + TABLE_CUSTOM_DATE_RANGE + " SET " + KEY_DATE_START + "='" + dateStar
                + "' , " + KEY_DATE_END + "='" + dateEnd + "' , " + KEY_DATE_CHOOSED + "='" + dateToCompare + "'");
    });
}

function deteclenguage3() {
    lang = navigator.language.split("-");
    current_lang = (lang[0]);
    if (current_lang == 'es') {
        MSG_LBL_PROGRESS_BY_STORE_3();
        MSG_RETURN_3();
        MSG_BACK_3();
        MSG_CHOOSE_RANGE_3();
        MSG_DATE_START_3();
        MSG_ALL_REGION();
        MSG_DATE_END_3();
        MSG_CHOOSE_DATE_COMPARE_3();
        MSG_DICTIONARY_3();
        MSG_TOTALMONTHGOAL_3();
        MSG_TOTALGOALSTORE_3();
        MSG_TEXT_OPTIONS_3();
        MSG_TEXT_OK_3();
        MSG_TEXT_CHOOSE_REGION_3();
        MSG_TEXT_ACUMULATE_PECENT_SALE_3();
        MSG_TEXT_ACUMULATE_PERCENT_GOAL_3();
        MSG_DATE_COMPARE_3();
    }
}