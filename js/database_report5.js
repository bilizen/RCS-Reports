function showDialogStore5() {
    $("#show_modalStore5").modal();
    existDataStore_report5();
}

// funcion para disminuir o aumentar la barra desplazamiendo
function henry5() {
    $('.list').height($(window).height() - $('header').height());
}
$(window).resize(function () {
    $('.list').height($(window).height() - $('header').height());
});

function existDataStore_report5() {
    try {
        var query = 'SELECT count(*) AS cant FROM ' + TABLE_STORE;
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [], function (transaction, results) {
                var store = results.rows.item(0).cant;
                if (store > 0) {
                    downloadAllstore52();
                } else {
                    downloadAllStore5();
                }
            });

        });

    } catch (e) {
        console.log("error:" + e);
    }
}

function showLoading5() {
    $('#show_modalStore5 #list_store5').append(loading); // agrega el cargando <div class="loader-ios"... con toda la animacion del cargando
    $('#show_modalStore5 #list_store5').css('background', 'rgba(0,0,0,0.23)');
    $('#show_modalStore5 #btnStore').attr('disabled', 'disabled');
}

function hideLoading5() {
//    setTimeout(function () {
    $('#show_modalStore5 .loader-ios').remove();
    $('#show_modalStore5 #list_store5').css('background', 'rgba(0,0,0,0)');
    $('#show_modalStore5 #list_store5 h1').removeClass('hide');

    setTimeout(function () {
        focusToactiveStore5();
    }, 500);

//    }, 3200);
}



function downloadAllstore52() {
    var xurl = "";
    var ip = "";
    var port = "";
    var alias = "";
    var site = "";
    var array = "";

    localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ' + TABLE_URL + ' WHERE ' + KEY_USE + ' = 1', [], function (tx, results) {
            ip = results.rows.item(0).ip;
            port = results.rows.item(0).port;
            alias = results.rows.item(0).alias;
            site = results.rows.item(0).site;

            xurl = "http://" + ip + ":" + port + "/" + site + "/ReportStore/";
            //xurl = "http://190.12.74.148:8000/WCFSERVICE/ReportStore/";

            var query1 = "SELECT * FROM " + TABLE_STORE + " WHERE UsedStore= '1'";
            var StoreNoT = "";
            localDB.transaction(function (tx) {
                tx.executeSql(query1, [], function (tx, results) {
                    StoreNoT = results.rows.item(0).StoreNo;

                    $.ajax({
                        url: xurl,
                        type: 'get',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        timeout: 15000,
                        crossdomain: true,
                        async: true,
                        beforeSend: function () {
                            showLoading5();
                        },
                        complete: function () {
                            hideLoading5();
                        },
                        success: function (data) {

                            if (data.successful > 0) {
                                var StoreName;
                                var StoreNo;
                                var show = "";
                                $("#list_store5").empty();
                                $(data.report).each(function (index, value) {
                                    StoreNo = value.StoreNo;
                                    StoreName = value.StoreName;
                                    if (StoreNo == StoreNoT) {

                                        show += "<h1 class='storeName-" + StoreNo + " hide active' data-value='" + StoreName + "'  onclick=setStoreNo5('" + StoreNo + "');>" + StoreName + "</h1>";
                                    } else {
                                        show += "<h1 class='storeName-" + StoreNo + " hide' data-value='" + StoreName + "'  onclick=setStoreNo5('" + StoreNo + "');>" + StoreName + "</h1>";
                                    }
                                });
                                $('#list_store5').append(show);
                            }
                        }, error: function (xhr, ajaxOptions, thrownError) {
                            console.log(xhr.status);
                            console.log(xhr.statusText);
                            console.log(xhr.responseText);
                            hideLoading5();
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

}


function downloadAllStore5() {
    var xurl = "";
    var ip = "";
    var port = "";
    var alias = "";
    var site = "";
    var array = "";

    localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ' + TABLE_URL + ' WHERE ' + KEY_USE + ' = 1', [], function (tx, results) {
            ip = results.rows.item(0).ip;
            port = results.rows.item(0).port;
            alias = results.rows.item(0).alias;
            site = results.rows.item(0).site;

            xurl = "http://" + ip + ":" + port + "/" + site + "/ReportStore/";
            //xurl = "http://190.12.74.148:8000/WCFSERVICE/ReportStore/";
            $.ajax({
                url: xurl,
                type: 'get',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout: 15000,
                crossdomain: true,
                async: true,
                beforeSend: function () {
                    showLoading5();
                },
                complete: function () {
                    hideLoading5();
                },
                success: function (data) {

                    if (data.successful > 0) {
                        var StoreName;
                        var StoreNo;
                        var show = "";
                        $("#list_store5").empty();
                        $(data.report).each(function (index, value) {
                            StoreNo = value.StoreNo;
                            StoreName = value.StoreName;
                            if (index == 0) {
                                insertTableStore5(StoreNo, StoreName, '1')
                                show += "<h1 class='storeName-" + StoreNo + " hide active' data-value='" + StoreName + "'  onclick=setStoreNo5('" + StoreNo + "');>" + StoreName + "</h1>";
                            } else {
                                show += "<h1 class='storeName-" + StoreNo + " hide' data-value='" + StoreName + "'  onclick=setStoreNo5('" + StoreNo + "');>" + StoreName + "</h1>";
                            }
                        });
                        $('#list_store5').append(show);
                    }//modal no hay data
                }, error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(xhr.statusText);
                    console.log(xhr.responseText);
                    hideLoading5();
                    if (current_lang == 'es')
                        mostrarModalGeneral("Error de Conexión");
                    else
                        mostrarModalGeneral("No Connection");


                }
            });
        });
    });
}

function insertTableStore5(StoreNo, StoreName, use) {
    var queryInsert = "INSERT INTO " + TABLE_STORE + "(" + KEY_STORENO + ", " + KEY_STORENAME + ", " + KEY_USEDSTORE + ") VALUES (?,?,?)";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(queryInsert, [StoreNo, StoreName, use], function (transaction, results) {
            }, errorHandler);
        });
    } catch (e) {
        console.log("Error addData " + e + ".");
    }
}

function setStoreNo5(storeNo) {
    //updateAllStoreUsedToZero5();
    $('#list_store5 h1').removeClass('active');
    $('.storeName-' + storeNo).addClass('active');
    var StoreName = $('.storeName-' + storeNo + '.active').attr('data-value');
    updateStore(storeNo, StoreName);
    $('#show_modalStore5 #btnStore').removeAttr('disabled');


    //updateStoreUsedTableStore5(storeNo);
}

function updateStore(storeNo, StoreName) {
    var queryStore = "UPDATE " + TABLE_STORE + " SET " + KEY_STORENO + " ='" + storeNo + "' ," + KEY_STORENAME + " = '" + StoreName + "'  WHERE " + KEY_USEDSTORE + " ='1'";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(queryStore, [], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Error updateState");
                } else {
                    console.log("Update realizado:" + results.rowsAffected);
                }
            }, errorHandler);
        });
    } catch (e) {
        console.log("Error updateState " + e + ".");
    }

}

function updateStoreUsedTableStore5(storeNo) {
    var queryStore = "UPDATE " + TABLE_STORE + " SET " + KEY_USEDSTORE + " = '1' WHERE " + KEY_STORENO + " = " + storeNo;
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(queryStore, [], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Error updateState");
                } else {
                    console.log("Update realizado:" + results.rowsAffected);
                }
            }, errorHandler);
        });
    } catch (e) {
        console.log("Error updateState " + e + ".");
    }

}

function updateAllStoreUsedToZero5() {

    var queryUpdate = " UPDATE " + TABLE_STORE + " SET "
            + KEY_USEDSTORE + " = 0";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(queryUpdate, [], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Error updateState");
                } else {
                    console.log("Update realizado:" + results.rowsAffected);
                }
            }, errorHandler);
        });
    } catch (e) {
        console.log("Error updateState " + e + ".");
    }

}

function existDataDate_report5() {
    var query1 = "SELECT * FROM  " + TABLE_CUSTOM_DATE_RANGE;
    try {
        localDB.transaction(function (tx) {
            tx.executeSql(query1, [], function (tx, results) {
                if (results.rows.length > 0) {
                    var dateStart = results.rows.item(0).dateStart;
                    var dateEnd = results.rows.item(0).dateEnd;

                    var arrayDateStart = dateStart.split("-");
                    var arraydateEnd = dateEnd.split("-");
                    document.getElementById('dateStart').innerHTML = arrayDateStart[2] + "-" + arrayDateStart[1] + "-" + arrayDateStart[0];
                    document.getElementById('dateEnd').innerHTML = arraydateEnd[2] + "-" + arraydateEnd[1] + "-" + arraydateEnd[0];



                } else {
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

                    insertFirstTimeDate_report5(dateStartMonth, dateOfToday, dateOfToday);
                    
                    
                    
                }
            });

        });

    } catch (e) {
        console.log("error:" + e);
    }
}

function insertFirstTimeDate_report5(dateStart, dateEnd, dateUntil) {
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

function downloadAllcustomers() {
    var xurl = "";
    var ip = "";
    var port = "";
    var alias = "";
    var site = "";
    var array;
    localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ' + TABLE_URL + ' WHERE ' + KEY_USE + ' = 1', [], function (tx, results) {
            ip = results.rows.item(0).ip;
            port = results.rows.item(0).port;
            alias = results.rows.item(0).alias;
            site = results.rows.item(0).site;

            xurl = "http://" + ip + ":" + port + "/" + site + "/ReportScopeClerk/POST";

            var query = "SELECT * FROM " + TABLE_CUSTOM_DATE_RANGE;
            localDB.transaction(function (tx) {
                tx.executeSql(query, [], function (tx, results) {
                    var dateStar = results.rows.item(0).dateStart;
                    var dateEnd = results.rows.item(0).dateEnd;

                    var arrayDateStart = dateStar.split("-");
                    var arraydateEnd = dateEnd.split("-");

                    document.getElementById('dateStart').innerHTML = arrayDateStart[2] + "-" + arrayDateStart[1] + "-" + arrayDateStart[0];
                    document.getElementById('dateEnd').innerHTML = arraydateEnd[2] + "-" + arraydateEnd[1] + "-" + arraydateEnd[0];

                    var query1 = "SELECT * FROM " + TABLE_STORE + " WHERE UsedStore= '1'";

                    localDB.transaction(function (tx) {
                        tx.executeSql(query1, [], function (tx, results) {

                            var StoreNo = results.rows.item(0).StoreNo;
                            var StoreName = results.rows.item(0).StoreName;
                            document.getElementById('nameStore5').innerHTML = StoreName;
                            //var xurl = "http://190.12.74.148:8000/WCFSERVICE/ReportScopeClerk/POST";
                            array = {DateStart: dateStar, DateEnd: dateEnd, StoreNo: StoreNo};
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

                                    $("#list-empleados").empty();
                                    if (data.successful > 0) {

                                        var show = "";
                                        $(data.report).each(function (index, value) {
                                            var FirstName = value.FirstName;
                                            var Qty = parseFloat(value.Qty);
                                            var ExtRetailPriceWTax = parseFloat(value.ExtRetailPriceWTax);
                                            var TotalGoal = parseFloat(value.TotalGoal);
                                            var PercentSale = parseFloat(value.PercentSale);

                                            show += "<tr>";
                                            show += "<td>" + FirstName + "</td>";
                                            show += "<td>" + Qty + "</td>";
                                            show += "<td>" + ExtRetailPriceWTax + "</td>";
                                            show += "<td>" + TotalGoal + "</td>";
                                            show += "<td>" + PercentSale + "</td>";
                                            show += "</tr>";
                                        });
                                        $("#list-empleados").append(show);
                                        henry5();

                                    } else {

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

function updaTableCustomDate5() {
    var dateStar = document.getElementById('dateStart').innerHTML;
    var dateEnd = document.getElementById('dateEnd').innerHTML;
    
    var arrayDateStart = dateStar.split("-");
    var arrayDateEnd = dateEnd.split("-");

    var query = "UPDATE " + TABLE_CUSTOM_DATE_RANGE + " SET "
            + KEY_DATE_START + " = '" + arrayDateStart[2] + "-" + arrayDateStart[1] + "-" + arrayDateStart[0] + "', "
            + KEY_DATE_END + " = '" + arrayDateEnd[2] + "-" + arrayDateEnd[1] + "-" + arrayDateEnd[0] + "', "
            + KEY_DATE_CHOOSED + " = '" + arrayDateEnd[2] + "-" + arrayDateEnd[1] + "-" + arrayDateEnd[0] + "'";

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Error updateState");
                } else {
                    console.log("Update realizado:" + results.rowsAffected);
                }
            }, errorHandler);
        });
    } catch (e) {
        console.log("Error updateState " + e + ".");
    }

}
/***********************Language**********************************/
function changeLanguage5() {
    lang = navigator.language.split("-");
    current_lang = (lang[0]);

    if (current_lang == 'es') {

        //head
        $('#txtReturn').text('Regresar');
        $('#lblDateEnd').text('Fecha fin');
        $('#lblDateStart').text('Fecha inicio');

        //tabla head
        $('thead th:nth-child(1)').text('Empleados');
        $('thead th:nth-child(2)').text('Unidades Vendidas');
        $('thead th:nth-child(3)').text('Vental Total');
        $('thead th:nth-child(4)').text('Meta');

        //range date head
        $('.date span').text('Seleccione rango de fechas');
        $('thead th:nth-child(2)').text('Unidades Vendidas');
        $('thead th:nth-child(3)').text('Vental Total');
        $('thead th:nth-child(4)').text('Meta');

        $('#lbldateEnd').text('Fecha fin');
        $('#lbldateStart').text('Fecha inicio');

        $('.txt_options').text("Opciones");
        $('#txtBack').text("Retornar");
        $('#show_modalStore5 .modal-header').text("Seleccione su tienda");
        $('#txtOk').text("Aceptar");
        $("#list_store1").text("Por favor, Gire a la Posición Horizontal");
        $("#title_store_R5").text("Mensaje");

    }
}

function focusToactiveStore5() {

    var list5 = $('#list_store5');

    list5.animate({
        scrollTop: $('.active').offset().top - list5.offset().top + list5.scrollTop()
    });
}