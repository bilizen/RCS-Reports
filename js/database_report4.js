function existDataStore() {

    var storeNoInUsed = "";

    var query = "SELECT COUNT(*) AS urlBase FROM " + TABLE_STORE;
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [], function (transaction, results) {
                url = results.rows.item(0).urlBase;
                if (url > 0) {
                    console.log(" Tiendas cargadas...");
                    localDB.transaction(function (tx) {
                        tx.executeSql('SELECT * FROM ' + TABLE_STORE + " WHERE " + KEY_USEDSTORE + " = 1", [], function (tx, results) {
                            storeNoInUsed = results.rows.item(0).StoreNo;

                            var url = 0;
                            var checkData = 0;


                            localDB.transaction(function (tx) {
                                tx.executeSql('SELECT * FROM ' + TABLE_STORE, [], function (tx, results) {

                                    $("#list_store").empty();
                                    var StoreName;
                                    var StoreNo;
                                    var show = "";

                                    for (var i = 0; i < results.rows.length; i++) {
                                        StoreName = results.rows.item(i).StoreName;
                                        StoreNo = results.rows.item(i).StoreNo;

                                        if (storeNoInUsed === StoreNo) {
                                            show += "<h1 class='storeName-" + StoreNo + " active' onclick=setStoreNo('" + StoreNo + "');>" + StoreName + "</div>";
                                        } else {
                                            show += "<h1 class='storeName-" + StoreNo + "' onclick=setStoreNo('" + StoreNo + "');>" + StoreName + "</div>";
                                        }

                                    }
                                    $('#list_store').append(show);
                                });
                            });
                        });
                    });

                } else {
                    console.log("Tiendas no encontradas - Cargando Tiendas...");
                    $("#list_store").empty();
                    downloadAllStore();

                }
            }, function (transaction, error) {
                console.log("Error: " + error.code + "<br>Mensage: " + error.message);
            });
        });
    }
    catch (e) {
        console.log("Error existsData " + e + ".");
    }
}

function updateAllStoreUsedToZero() {

    var queryUpdate = " UPDATE " + TABLE_STORE + " SET "
            + KEY_USEDSTORE + " = 0";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(queryUpdate, [], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Error updateState");
                }
                else {
                    console.log("Update realizado:" + results.rowsAffected);
                }
            }, errorHandler);
        });
    } catch (e) {
        console.log("Error updateState " + e + ".");
    }

}

function updateStoreUsedTableStore(storeNo) {
    var queryStore = "UPDATE " + TABLE_STORE + " SET " + KEY_USEDSTORE + " = 1 WHERE " + KEY_STORENO + " = " + storeNo;

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(queryStore, [], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Error updateState");
                }
                else {
                    console.log("Update realizado:" + results.rowsAffected);
                }
            }, errorHandler);
        });
    } catch (e) {
        console.log("Error updateState " + e + ".");
    }

}

function showDialogStore() {
    $("#show_modalStore").modal();
    existDataStore();
}

function downloadAllStore() {
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

            xurl = "http://" + ip + ":" + port + "/" + site + "/ReportStore/";



            //xurl="http://190.12.74.148:8000/WCFSERVICE/ReportStore/";
            $.ajax({
                url: xurl,
                type: 'get',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout: 15000,
                crossdomain: true,
                async: true,
                beforeSend: function () { 
                    showLoading2();
                },
                complete: function () {
                },
                success: function (data, textStatus, XMLHttpRequest) {
                    if (data.successful > 0) {
                        var StoreName;
                        var StoreNo;
                        var use = 1;
                        var show = "";

                        $(data.report).each(function (index, value) {
                            StoreName = value.StoreName;
                            StoreNo = value.StoreNo;
                            if (StoreNo == 1)
                                show += "<h1 class='storeName-" + StoreNo + " active hide' onclick=setStoreNo('" + StoreNo + "');>" + StoreName + "</h1>";
                            else
                                show += "<h1 class='storeName-" + StoreNo + " hide' onclick=setStoreNo('" + StoreNo + "');>" + StoreName + "</h1>";
                            insertTableStore(StoreNo, StoreName, use);
                            use = 0;

                        });


                        var queryUpdate = "UPDATE " + TABLE_STORE + " SET " + KEY_USEDSTORE + "=1 WHERE " + KEY_IDSTORE + " = " + 1;
                        try {
                            localDB.transaction(function (transaction) {
                                transaction.executeSql(queryUpdate, [], function (transaction, results) {
                                }, errorHandler);
                            });
                        } catch (e) {
                            console.log("Error addData " + e + ".");
                        }
                        $('#list_store').append(show);
                    }
                    hideLoading2();
                },
                error: function (xhr, ajaxOptions, thrownError) {

                    mostrarModalGeneral("asasas");
                    console.log(xhr.status);
                    console.log(xhr.statusText);
                    console.log(xhr.responseText);
                    hideLoading();
                    if (current_lang == 'es')
                        mostrarModalGeneral("Error de Conexión");
                    else
                        mostrarModalGeneral("No Connection");

                }
            });

        });
    });

}

function showLoading2() {
    $('#show_modalStore #list_store').append(loading); // agrega el cargando <div class="loader-ios"... con toda la animacion del cargando
    $('#show_modalStore #list_store').css('background', 'rgba(0,0,0,0.23)');
    $('#show_modalStore #btnStore').attr('disabled', 'disabled');
}
function hideLoading2() {
    setTimeout(function () {
        $('#show_modalStore .loader-ios').remove();
        $('#show_modalStore #list_store').css('background', 'rgba(0,0,0,0)');
        $('#show_modalStore #list_store h1').removeClass('hide');
    }, 3200);
}

function setStoreNo(storeNo, storeName) {
    updateAllStoreUsedToZero();
    $('#list_store h1').removeClass('active');
    $('.storeName-' + storeNo).addClass('active');
    $('#show_modalStore #btnStore').removeAttr('disabled');
    updateStoreUsedTableStore(storeNo);

}


function insertTableStore(StoreNo, StoreName, use) {
    /***insertamos en la base de datos***/
    var queryInsert = "INSERT INTO " + TABLE_STORE + "(" + KEY_STORENO + ", " + KEY_STORENAME + ", " + KEY_USEDSTORE + ") VALUES (?,?,?)";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(queryInsert, [StoreNo, StoreName, use], function (transaction, results) {
            }, errorHandler);
        });
    } catch (e) {
        console.log("Error addData " + e + ".");
    }
    /*********************************/
}




function downloadReportGraphic() {
    /***Dates***/
    var storeName = "";
    var storeNo = "";
    var dateStart = "";
    var dateEnd = "";
    var array;
    var xurl = "";
    var ip = "";
    var port = "";
    var alias = "";
    var site = "";

    /*******OBTENEMOS LOS VALORES DEL SERVIDOR ACTUAL**********/

    localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ' + TABLE_URL + ' WHERE ' + KEY_USE + ' = 1', [], function (tx, results) {
            ip = results.rows.item(0).ip;
            port = results.rows.item(0).port;
            alias = results.rows.item(0).alias;
            site = results.rows.item(0).site;

            xurl = "http://" + ip + ":" + port + "/" + site + "/ReportGraphicStore/POST";


            /*****OBTENEMOS EL VALOR DE STORENO DE LA BASE DE DATOS PARA LA TIENDA USADA***/

            localDB.transaction(function (tx) {
                tx.executeSql('SELECT * FROM ' + TABLE_STORE + " WHERE " + KEY_USEDSTORE + "=" + 1, [], function (tx, results) {


                    storeName = results.rows.item(0).StoreName;
                    storeNo = results.rows.item(0).StoreNo;
                    document.getElementById('nameStore').innerHTML = storeName;


                    /**********OBTENEMOS LAS FECHAS DE LA BASE DE DATOS**************/
                    localDB.transaction(function (tx) {
                        tx.executeSql('SELECT * FROM ' + TABLE_CUSTOM_DATE_RANGE, [], function (tx, results) {

                            dateStart = results.rows.item(0).dateStart.toString();
                            dateEnd = results.rows.item(0).dateEnd.toString();

                            document.getElementById('dateStartTitle').innerHTML = dateStart;
                            document.getElementById('dateEndTitle').innerHTML = dateEnd;

                            //xurl = "http://190.12.74.148:8000/WCFSERVICE/ReportGraphicStore/POST";
                            //array = {"DateStart":"2015-08-01","DateEnd":"2015-08-20","StoreNo":3};
                            array = {DateStart: dateStart, DateEnd: dateEnd, StoreNo: storeNo};

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

                                    if (data.successful > 0) {
                                        var arraySale = [];
                                        var arrayGoal = [];
                                        var arrayBreakEven = [];
                                        var arrayTotalGoal = [];
                                        var dateStart;
                                        var dateEnd;
                                        var FixedCost= 0.00;
                                        
                                    
                                    //captura valor de punto de equilibrio
                                    var MargenValue = $('#MargenValue').val();   
                                    if(MargenValue==0){
                                        MargenValue=0.5;
                                    }else{
                                        MargenValue=MargenValue/100; 
                                    }
                                        $(data.report).each(function (index, value) {
                                            
                                            var AcumulateSale = 0.00;
                                            var AcumulateGoal = 0.00;
                                            var MonthGoalStore = 0.00;

                                            AcumulateSale = parseFloat(value.AcumulateSale);
                                            AcumulateGoal = parseFloat(value.AcumulateGoal);
                                            MonthGoalStore = parseFloat(value.MonthGoalStore);
                                            FixedCost=(parseFloat(value.FixedCost)/MargenValue);
                                            dateStart = value.dateStart;
                                            dateEnd = value.dateEnd;
                                            
                                            arraySale[index] = AcumulateSale.toFixed(2);/**sale*/
                                            arrayGoal[index] = AcumulateGoal.toFixed(2);/**goal**/
                                            arrayBreakEven[index] = FixedCost;/**breakeven**/
                                            arrayTotalGoal[index] = MonthGoalStore.toFixed(2);/**totalgoal**/
                                        });
                                        
                                    drawGraphicByStore(arraySale, arrayGoal, arrayBreakEven, arrayTotalGoal, data.successful, dateStart);
                                    }
                                }, error: function (xhr, ajaxOptions, thrownError) {
                                    console.log(xhr.status);
                                    console.log(xhr.statusText);
                                    console.log(xhr.responseText);
                                    hideLoading();
                                    if (current_lang == 'es')
                                        mostrarModalGeneral("Error de Conexión");
                                    else
                                        mostrarModalGeneral("No Connection");
                                }
                            });
                        });
                    });
                });
            });
        });
    });
}

function existDataDate() {
    var count = 0;
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
                            document.getElementById('dateStart').innerHTML = dateStart;
                            document.getElementById('dateEnd').innerHTML = dateEnd;
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
                    var firstDayMonth = new Date(obj_date2.getFullYear(), obj_date2.getMonth(), 1);/**only day**/
                    var dateStartMonth = obj_date2.getFullYear() + '-' +
                            (('' + month).length < 2 ? '0' : '') + month + '-' +
                            (('' + firstDayMonth.getDate()).length < 2 ? '0' : '') + firstDayMonth.getDate();


                    insertFirstTimeDate(dateStartMonth, dateOfToday, dateOfToday);
                    
                }
            }, function (transaction, error) {
                console.log("Error: " + error.code + "<br>Mensage: " + error.message);
            });
        });
    }
    catch (e) {
        console.log("Error existsData " + e + ".");
    }

}

function insertFirstTimeDate(dateStart, dateEnd, dateUntil) {

    var query = "INSERT INTO " + TABLE_CUSTOM_DATE_RANGE +
            "(" + KEY_DATE_START + ", " + KEY_DATE_END + ", " + KEY_DATE_CHOOSED + ") VALUES (?,?,?)";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [dateStart, dateEnd, dateUntil], function (transaction, results) {

            }, errorHandler);

        });
    } catch (e) {
        console.log("Error addData " + e + ".");
    }
}

function updaTableCustomDate() {
    var dateStart = document.getElementById('dateStart').innerHTML;
    var dateEnd = document.getElementById('dateEnd').innerHTML;
    var arrayDateStart = dateStart.split("-");
    var arrayDateEnd = dateEnd.split("-");


    var query = "UPDATE " + TABLE_CUSTOM_DATE_RANGE + " SET "
            + KEY_DATE_START + " = '" + arrayDateStart[0] + "-" + arrayDateStart[1] + "-" + arrayDateStart[2] + "', "
            + KEY_DATE_END + " = '" + arrayDateEnd[0] + "-" + arrayDateEnd[1] + "-" + arrayDateEnd[2] + "'";

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Error updateState");
                }
                else {
                    console.log("Update realizado:" + results.rowsAffected);
                }
            }, errorHandler);
        });
    } catch (e) {
        console.log("Error updateState " + e + ".");
    }
}

//*  nueva funcion *//
function updatePointBalance(){
    try{
        var principal = $('#MargenValue').val();
        if(principal>0){
            $('#lblMargenNumber').empty();
            $('#lblMargenNumber').append(principal+"%");
        }else{
            principal=50;
            $('#lblMargenNumber').empty();
            $('#lblMargenNumber').append(principal+"%"); 
        }
        
    }catch (e){
        console.log("e: "+e);
    }
}

function deteclenguage_R4(){
    lang = navigator.language.split("-");
    current_lang = (lang[0]);
    if (current_lang == 'es') {
      MSG_LBL_RETURN_R4();
      MSG_DATE_START_R4();
      MSG_DATE_END_R4();
      MSG_TITLE_DS_R4();
      MSG_DS_OKR4();
      MSG_CHOOSE_RANGE_4();
      MSG_DATESTART_R4();
      MSG_DATEEND_R4();
      MSG_OPTIONS_4();
      MSG_BACK_4();
      MSG_CHOOSE_MARGEN_4();
      MODAL_R4();
      MODAL_ORIENTATION_R4();
    }
}    
    
