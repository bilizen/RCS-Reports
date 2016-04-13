$(document).ready(function () {
    onInit();
    graphicReport6(4);
    
     //////
    if (window.orientation == 0) {
                document.getElementById('content').style.display = 'none';
                $('#miModal6').modal({backdrop: 'static', keyboard: false});
            }
            if (window.orientation == 90 || window.orientation == -90) {
                $('#miModal6').modal('hide');
                document.getElementById('content').style.display = 'block';
            }
            if (window.orientation == 180) {

                document.getElementById('content').style.display = 'none';
                $('#miModal6').modal({backdrop: 'static', keyboard: false});
            }
            $(window).on("orientationchange", function (event) {
                if (window.orientation == 90 || window.orientation == -90) {
                    $('#miModal6').modal('hide');
                    document.getElementById('content').style.display = 'block';
                }
                if (window.orientation == 180 || window.orientation == 0) {
                    document.getElementById('content').style.display = 'none';
                    $('#miModal6').modal({backdrop: 'static', keyboard: false});
                }
            });
    
    
    
    
    
});

$(window).load(function () {
    deteclenguage();
});

function refresh() {

}

function graphicReport6(option) {
    var xurl = "";
    var ip = "";
    var port = "";
    var site = "";
    var array;
    
    var query1 = "SELECT * FROM " + TABLE_URL + " WHERE " + KEY_USE + " = 1 ";
    localDB.transaction(function (tx) {
        tx.executeSql(query1, [], function (tx, results) {
            ip = results.rows.item(0).ip;
            port = results.rows.item(0).port;
            site = results.rows.item(0).site;
            xurl = "http://" + ip + ":" + port + "/" + site + "/ReportAdvancedByStore/POST";

            var query2 = "SELECT * FROM " + TABLE_STORE + " WHERE UsedStore= '1'";
            var StoreNoT = "";

            localDB.transaction(function (tx) {
                tx.executeSql(query1, [], function (tx, results) {
                    StoreNoT = results.rows.item(0).StoreNo;

                    array = {Option: option,StoreNo: StoreNoT};
                    $.ajax({
                        url: xurl,
                        type: 'POST',
                        data: JSON.stringify(array),
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        timeout: 15000,
                        crossdomain: true,
                        async: true,
                        beforeSend: function () {    
                        showLoading();
                        },
                        complete: function () {
                        hideLoading();
                        },
                        success: function (data) {

                            if (data.successful > 0) {
                                var DayNo=[];
                                var MonthNo=[];
                                var PaytotalA=[];
                                var PaytotalP=[];
                                var StoreName;
                                var StoreNo;
                                
                                $(data.report).each(function (index, value) {
                                   DayNo[index] = value.DayNo;
                                   MonthNo[index]=value.MonthNo;
                                   PaytotalA[index]=value.PaytotalA;
                                   PaytotalP[index]=value.PaytotalP;
                                   StoreName=value.StoreName;
                                });
                                //dia,mes,actual,pasado
                                drawGraphicByStore6(DayNo,MonthNo,PaytotalA,PaytotalP);
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
}


function showDialogStore() {
    $("#show_modalStore").modal();
    downloadStore6();
}

function downloadStore6(){
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
                            showLoading6();
                        },
                        complete: function () {
                            hideLoading6();
                        },
                        success: function (data) {

                            if (data.successful > 0) {
                                var StoreName;
                                var StoreNo;
                                var show = "";
                                $(".list_r6").empty();
                                $(data.report).each(function (index, value) {
                                    StoreNo = value.StoreNo;
                                    StoreName = value.StoreName;
                                    if (StoreNo == StoreNoT) {
                                        show += "<h1 class='storeName-" + StoreNo + " active' data-value='" + StoreName + "'  onclick=setStoreNo6('" + StoreNo + "') >" + StoreName + "</h1>";
                                    } else {
                                        show += "<h1 class='storeName-" + StoreNo + "' data-value='" + StoreName + "'  onclick=setStoreNo6('" + StoreNo + "') >" + StoreName + "</h1>";
                                    }
                                });
                                $('.list_r6').append(show);
                            }
                        }, error: function (xhr, ajaxOptions, thrownError) {
                            console.log(xhr.status);
                            console.log(xhr.statusText);
                            console.log(xhr.responseText);
                            hideLoading6();
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


function setStoreNo6(storeNo) {
    $('.list_r6 h1').removeClass('active');
    $('.storeName-' + storeNo).addClass('active');
    var StoreName = $('.storeName-' + storeNo + '.active').attr('data-value');
    updateStore(storeNo, StoreName);
    $('#show_modalStore #btnStore').show();

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