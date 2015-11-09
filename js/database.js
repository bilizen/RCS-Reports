
//DATABASE NAME
var localDB = 'RCS';

//DEFINE OUR TABLES
var TABLE_URL = "URLSTORE";
var TABLE_CONFIGURATION = "CONFIGURATION";


//DEFINE OUR FIELDS
var KEY_ID = "id";
var KEY_IP = "ip";
var KEY_PORT = "port";
var KEY_URLBASE = "urlBase";
var KEY_ALIAS = "alias";
var KEY_USE = "use";
var KEY_SITE = "site";
var KEY_REMEMBER = "site";
var passed_variable = "-1";

var lang = "";
var current_lang = "";

//******Custom Report _ Table_Clasification******//
var TABLE_CLASIFICATION = "CLASIFICATION";
var KEY_MUY_BUENA = "MUYBUENA";
var KEY_LIMIT_INF_BUENA = "INF_BUENA";
var KEY_LIMIT_SUP_BUENA = "SUP_BUENA";
var KEY_LIMIT_INF_ACEPTABLE = "INF_ACEPTABLE";
var KEY_LIMIT_SUP_ACEPTABLE = "SUP_ACEPTABLE";
var KEY_LIMIT_INF_DEFICIENTE = "INF_DEFICIENTE";
var KEY_LIMIT_SUP_DEFICIENTE = "SUP_DEFICIENTE";
var KEY_LIMIT_INF_CRITICO = "INF_CRITICO";
var KEY_LIMIT_SUP_CRITICO = "SUP_CRITICO";
var KEY_MUY_CRITICO = "MUYCRITICO";
//*******************************************//

//*****Table CDateRange********//
var TABLE_CUSTOM_DATE_RANGE = "CRANGEDATE";
var KEY_DATE_START = "dateStart";
var KEY_DATE_END = "dateEnd";
var KEY_DATE_CHOOSED = "dateChoosed";
//***********Table Store*****************//
var TABLE_STORE = "STORE";
var KEY_IDSTORE = "ID";
var KEY_STORENO = "StoreNo";
var KEY_STORENAME = "StoreName";
var KEY_USEDSTORE = "UsedStore";
//************************************//


function initDB() {
    var shortName = 'RCS';
    var version = '2.0';
    var displayName = 'RCS Reports';
    var maxSize = 10240; // Em bytes
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
}

function createTables() {//creo mis 4 tablas

    var tableURL = "CREATE TABLE " + TABLE_URL + " ( "
            + KEY_ID + " INTEGER PRIMARY KEY, " + KEY_IP + " TEXT, " + KEY_PORT + " TEXT, " + KEY_URLBASE + " TEXT, "
            + KEY_ALIAS + " TEXT, " + KEY_USE + " TEXT, " + KEY_SITE + " TEXT ) ";

    var tableConfiguration = "CREATE TABLE " + TABLE_CONFIGURATION + " (" + KEY_REMEMBER + " TEXT)";


    var tableClasification = "CREATE TABLE " + TABLE_CLASIFICATION + " ( " +
            KEY_MUY_BUENA + " TEXT, " + KEY_LIMIT_INF_BUENA + " TEXT, " + KEY_LIMIT_SUP_BUENA + " TEXT, " + KEY_LIMIT_INF_ACEPTABLE + " TEXT, " +
            KEY_LIMIT_SUP_ACEPTABLE + " TEXT, " + KEY_LIMIT_INF_DEFICIENTE + " TEXT, " + KEY_LIMIT_SUP_DEFICIENTE + " TEXT, " + KEY_LIMIT_INF_CRITICO + " TEXT, " +
            KEY_LIMIT_SUP_CRITICO + " TEXT, " + KEY_MUY_CRITICO + " TEXT)";

    var tableCDateRange = "CREATE TABLE " + TABLE_CUSTOM_DATE_RANGE + "(" + KEY_DATE_START + " TEXT," + KEY_DATE_END + " TEXT," + KEY_DATE_CHOOSED + " TEXT)";

    var tableStore = "CREATE TABLE " + TABLE_STORE + "(" + KEY_IDSTORE + " INTEGER PRIMARY KEY, " + KEY_STORENO + " TEXT, " + KEY_STORENAME + " TEXT, "
            + KEY_USEDSTORE + " TEXT)";

    var tableRegion = "CREATE TABLE REGION( regionCode TEXT, regionName TEXT)";

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(tableURL, [], nullDataHandler, errorHandler);
            console.log("Tabla URL status: OK.");
        });
    }
    catch (e) {
        console.log("Error creando Tabla URL " + e + ".");
        return;
    }

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(tableConfiguration, [], nullDataHandler, errorHandler);
            console.log("Tabla CONFIGURATION status: OK.");
        });
    }
    catch (e) {
        console.log("Error creando Tabla CONFIGURATION " + e + ".");
        return;
    }

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(tableClasification, [], nullDataHandler, errorHandler);
            console.log("Tabla CLASIFICATION status: OK.");
        });
    }
    catch (e) {
        console.log("Error creando Tabla CLASIFICATION " + e + ".");
        return;
    }

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(tableCDateRange, [], nullDataHandler, errorHandler);
            console.log("Tabla CRANGEDATE status: OK.");
        });
    }
    catch (e) {
        console.log("Error creando Tabla CRANGEDATE " + e + ".");
        return;
    }

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(tableStore, [], nullDataHandler, errorHandler);
            console.log("Tabla STORE status: OK.");
        });
    }
    catch (e) {
        console.log("Error creando Tabla STORE " + e + ".");
        return;
    }


    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(tableRegion, [], nullDataHandler, errorHandler);
            console.log("Tabla URL status: OK.");
        });
    }
    catch (e) {
        console.log("Error creando Tabla URL " + e + ".");
        return;
    }

}

function onInit() {
    try {
        if (!window.openDatabase) {
            console.log("No soporta BD");
        }
        else {
            initDB();
            createTables();
        }
    }
    catch (e) {
        if (e == 2) {
            console.log("Versión de base de datos invalida");
        }
        else {
            console.log("Error de desconexión: " + e + ".");
        }
        return;
    }
}

errorHandler = function (transaction, error) {//THIS VARIABLE IS FOR OUR TRANSACTION.EXECUTESQL IN OUR METHOD CREATETABLE
    console.log("Error: " + error.message);
    return true;
}

nullDataHandler = function (transaction, results) {//THIS VARIABLE IS FOR OUR TRANSACTION.EXECUTESQL IN OUR METHOD CREATETABLE
}


//***************************************//
function henry1() {
    if ($('#divRegion').css('display') == 'none')
        $('.list').height($(window).height() - $('header').height() - $('#divRegion').height() - $('.select-dateP').height() - $('.select-general').height() + 20);
    else
        $('.list').height($(window).height() - $('header').height() - $('#divRegion').height() - $('.select-dateP').height() - $('.select-general').height() - 24);
}
$(window).resize(function () {
    if ($('#divRegion').css('display') == 'none')
        $('.list').height($(window).height() - $('header').height() - $('#divRegion').height() - $('.select-dateP').height() - $('.select-general').height() + 20);
    else
        $('.list').height($(window).height() - $('header').height() - $('#divRegion').height() - $('.select-dateP').height() - $('.select-general').height() - 24);
});
//**********************************************//




//***limpiar tablas a la hora de cambiar o entrar a otro servidor**//
function delTables(){
    try {
        var queryDelete = "DELETE FROM " + TABLE_STORE;
        localDB.transaction(function (transaction) {

            transaction.executeSql(queryDelete, [], function (transaction, results) {
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

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql("DELETE FROM REGION", [], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Error updateState");
                }
                else {
                    console.log("Update realizado:" + results.rowsAffected);
                }
            }, errorHandler);
        });

    } catch (e) {
        console.log("error: " + e);
    }


}

function checkNetConnection() {
    var status = navigator.onLine;
    if (status) {
        return true;
    } else {
        return false;
    }
}

/************************ funcion valida IP ********************************************/
/*esta funcion es muy importante para no tener problemas de no poder ingresar a datos de servidores*/
function validIP(ip, port, _url, alias, use, site, variable) {
    var xurl = 'http://' + ip + ':' + port + '/' + site + '/Country/';
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
        },
        complete: function () {
            hideLoading();
        },
        success: function (data, textStatus, XMLHttpRequest) {
            console.log('Error: ' + textStatus);
            console.log('url ' + _url + " - xurl: " + xurl);
            console.log("COMPLETADO ... COMPLETADO");
            if (variable == -1) {
                firstServer(ip, port, xurl, alias, use, site, variable);
            } else {
                newServer(ip, port, xurl, alias, use, site, variable);
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {

            console.log(xhr.status);
            console.log(xhr.statusText);
            console.log(xhr.responseText);
            hideLoading();
            if (current_lang == 'es')
                mostrarModalGeneral("Error de Conexión");
            else
                mostrarModalGeneral("Connection Fail");
        }
    });

}

function firstServer(ip, port, urlbase, alias, activo, site, variable) {
    window.location.href = "data/login.html?" +
            "ip=" + ip +
            "&port=" + port +
            "&urlbase=" + urlbase +
            "&alias=" + alias +
            "&activo=1" +
            "&site=" + site +
            "&variable=" + variable;

}

function newServer(ip, port, urlbase, alias, activo, site, variable) {
    window.location.href = "data/login.html?" +
            "ip=" + ip +
            "&port=" + port +
            "&urlbase=" + urlbase +
            "&alias=" + alias +
            "&activo=1" +
            "&site=" + site +
            "&variable=" + variable;

}

function obtenerVariables(name) {/*esta funcion obtiene los valores de las variables que aparecen en la url*/
    var regexS = "[\\?&]" + name + "=([^&#]*)"; /*expresion generica captura de toda la url la parte de la variable ?=variable=1 o quizas &=variable =1*/
    var regex = new RegExp(regexS);
    var tmpURL = window.location.href;/*te indica la ubicacion actual URL del navegador*/
    console.log("tempURL..." + tmpURL);
    var results = regex.exec(tmpURL);
    console.log("results..." + results);
    //console.log("results..." + results[1]);
    if (results == null) {
        return "-1";
    } else {
        return results[1];/*de mi valor capturado que puede ser variable=1 , obtengo 1 si hay conincidencia entre la cadena y la url en este caso  devuelve 1*/
    }
}

function validData(pin, check) {
    var ip = getIp_Parameter();
    var port = getPort_Parameter();
    var site = getSite_Parameter();
    var variable_ = getVariable_Parameter();

    var yurl = 'http://' + ip + ':' + port + '/' + site + '/login/session/post';
    var array = {Pin: pin};

    if (variable_ == "1") {//si es que es un servidor nuevo y estamos en la pantalla de login

        $.ajax({
            url: yurl,
            timeout: 15000,
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
            success: function (data, textStatus, XMLHttpRequest) {

                if (data.successful == 1) {
                    getExistData_Carlos(check);

                } else {
                    if (current_lang == 'es')
                        mostrarModalGeneral("PIN Invalido");
                    else
                        mostrarModalGeneral("Invalid PIN");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {

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
    } else { //si es que es nuestro primer servidor(primera vez) ,entra aqui cuandonos pide colocar el pin porque no pusimos que lo recuerde      

        existsData_Login(pin, check);
    }
}


//*funcion solo para cuando ingresamos por primera vez nuestros datos*//
function getExistData_Carlos(check) {

    var url = "";
    var query = "SELECT COUNT(*) AS urlBase FROM " + TABLE_URL;
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [], function (transaction, results) {
                url = results.rows.item(0).urlBase;


                if (url > 0) {

                    var ob = obtenerVariables("variable");
                    //el ob = -1 --- todavia no hay nuevo servidor solo es lo que se recordo
                    if (ob == "-1") {
                        deleteConfiguration();
                        addConfiguration(check);

                    } else {

                        var varrrrrrrr = getVariable_Parameter();

                        if (varrrrrrrr == 1) {
                            var ip = getIp_Parameter();
                            var port = getPort_Parameter();
                            var urlbase = getUrlBase_Parameter();
                            var alias = getAlias_Parameter();
                            var activo = getActivo_Parameter();
                            var site = getSite_Parameter();

                            updateState();
                            addData(ip, port, urlbase, alias, activo, site);
                        }

                        deleteConfiguration();
                        addConfiguration(check);

                    }


                } else {
                    var ip = getIp_Parameter();
                    var port = getPort_Parameter();
                    var urlbase = getUrlBase_Parameter();
                    var alias = getAlias_Parameter();
                    var activo = getActivo_Parameter();
                    var site = getSite_Parameter();

                    addData(ip, port, urlbase, alias, activo, site);
                    addConfiguration(check);


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


//*funcion que verifica si hay o no hay data para decidir donde mandar menu o store*//
function existsData() {
    var url = "";
    var query = "SELECT COUNT(" + KEY_URLBASE + ") AS urlBase FROM " + TABLE_URL + " WHERE " + KEY_USE + " = '1';";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [], function (transaction, results) {
                url = results.rows.item(0).urlBase;
                if (url > 0) {
                    getConfiguration(url);
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

//***************************** verificamos que este lleno la tabla de URL ***********************************//
function existsData_Login(pin, check) {

    var url = "";
    var query = "SELECT COUNT(" + KEY_URLBASE + ") AS urlBase FROM " + TABLE_URL + " WHERE " + KEY_USE + " = '1';";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [], function (transaction, results) {
                url = results.rows.item(0).urlBase;
                if (url > 0) {//AQUI TENEMOS YA EN NUESTRA BASE DE DATOS ,solo tenemos nuestro primer servidor y nos manda a menu y no añade nada al base de datos

                    var yurl = "";
                    var c_ip = "";
                    var c_port = "";
                    var c_site = "";

                    localDB.transaction(function (tx) {
                        tx.executeSql('SELECT * FROM ' + TABLE_URL + ' WHERE  ' + KEY_USE + ' = 1', [], function (tx, results) {


                            c_ip = results.rows.item(0).ip;
                            c_port = results.rows.item(0).port;
                            c_site = results.rows.item(0).site;
                            yurl = 'http://' + c_ip + ':' + c_port + '/' + c_site + '/login/session/post';

                            var array = {Pin: pin};
                            $.ajax({
                                url: yurl,
                                timeout: 15000,
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
                                success: function (data, textStatus, XMLHttpRequest) {

                                    if (data.successful == 1) {
                                        getExistData_Carlos(check);

                                    } else {
                                        if (current_lang == 'es')
                                            mostrarModalGeneral("PIN Invalido");
                                        else
                                            mostrarModalGeneral("Invalid PIN");
                                    }
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
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



                } else {//NO TENEMOS NADA EN LA BASE DE DATOS,PRIMERA VEZ QUE INSERTAMOS NUESTRO SERVIDOR CHAPAMOS VALORES DE LA URL


                    var ip = getIp_Parameter();
                    var port = getPort_Parameter();
                    var site = getSite_Parameter();
                    var yurl = 'http://' + ip + ':' + port + '/' + site + '/login/session/post';

                    var array = {Pin: pin};
                    $.ajax({
                        url: yurl,
                        timeout: 15000,
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
                        success: function (data, textStatus, XMLHttpRequest) {

                            if (data.successful == 1) {
                                getExistData_Carlos(check);

                            } else {
                                if (current_lang == 'es')
                                    mostrarModalGeneral("PIN Invalido");
                                else
                                    mostrarModalGeneral("Invalid PIN");
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
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

function getConfiguration(url) {

    var config = "";
    var query = "SELECT " + KEY_REMEMBER + " AS cantidad FROM " + TABLE_CONFIGURATION;
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [], function (transaction, results) {
                config = results.rows.item(0).cantidad;
                if (config > "0") {

                    window.location = "data/menu.html";
                } else {

                    window.location = "data/login.html";
                }

            }, function (transaction, error) {
                console.log("Error: " + error.code + "<br>Mensage: " + error.message);
            });
        });
    }
    catch (e) {
        console.log("Error getConfiguration " + e + ".");
    }

    return config;
}

//*********** funcion inserta datos en la tabla URL****************//
function addData(ip, port, url, alias, use, site) {//aqui se hace uin insert
    var query = "INSERT INTO " + TABLE_URL + " ( " + KEY_IP + " , " + KEY_PORT
            + " , " + KEY_URLBASE + ", " + KEY_ALIAS + " , " + KEY_USE + ", " + KEY_SITE + ") VALUES (?,?,?,?,?,?);";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [ip, port, url, alias, use, site], function (transaction, results) {
            }, errorHandler);
        });
    } catch (e) {
        console.log("Error addData " + e + ".");
    }
}


function addConfiguration(remember) {
    console.log("rem " + remember);
    var query = "INSERT INTO " + TABLE_CONFIGURATION + "(" + KEY_REMEMBER + ") VALUES (?);";

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [remember], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Error no se inserto Configuration");
                } else {


                    console.log("Insert realizado configuration, id: " + results.insertId);
                    window.location.href = "menu.html";

                }
            }, errorHandler);
        });
    } catch (e) {
        console.log("Error addConfiguration " + e + ".");
    }
}

//************** descargar data por compañia, en el array en el indice principal:1 ************//
function downloadByCompany(actual_, global_) {
    var xurl = "";
    var c_ip = "";
    var c_port = "";
    var c_site = "";
    var c_alias = "";

    var lblCurrentSale = "";
    var lblCurrentGoal = "";
    var lblGlobalSale = "";
    var lblGlobalGoal = "";
    localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ' + TABLE_URL + ' WHERE  ' + KEY_USE + ' = 1', [], function (tx, results) {
            c_ip = results.rows.item(0).ip;
            c_port = results.rows.item(0).port;
            c_site = results.rows.item(0).site;
            c_alias = results.rows.item(0).alias;
            xurl = 'http://' + c_ip + ':' + c_port + '/' + c_site + '/reportCompany/POST';
            //******************* captura los datos del report1.html *************************//
            var principal = $(".select-general div:first-child()").attr("data-value");
            var option = $(".select-dateP .init").attr("data-value");
            var array = {principal: principal, option: option};


            var actual = actual_;
            var global = global_;

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
                        var mostrar = "";
                        if (current_lang == 'es') {
                            if (option == 1) {
                                lblCurrentGoal = "MH:";
                                lblCurrentSale = "VH:";
                                lblGlobalGoal = "MS:";
                                lblGlobalSale = "VS:";
                            } else if (option == 2) {
                                lblCurrentGoal = "MA:";
                                lblCurrentSale = "VA:";
                                lblGlobalGoal = "MS:";
                                lblGlobalSale = "VS:";
                            } else if (option == 3) {
                                lblCurrentGoal = "MS:";
                                lblCurrentSale = "VS:";
                                lblGlobalGoal = "MM:";
                                lblGlobalSale = "VM:";
                            } else if (option == 4) {
                                lblCurrentGoal = "MM:";
                                lblCurrentSale = "VM:";
                                lblGlobalGoal = "MA:";
                                lblGlobalSale = "VA:";
                            } else if (option == 5) {
                                lblCurrentGoal = "MA:";
                                lblCurrentSale = "VA:";
                                lblGlobalGoal = "MAC:";
                                lblGlobalSale = "VAH:";
                            }
                        } else {
                            if (option == 1) {
                                lblCurrentGoal = "TG:";
                                lblCurrentSale = "TS:";
                                lblGlobalGoal = "WG:";
                                lblGlobalSale = "WS:";
                            } else if (option == 2) {
                                lblCurrentGoal = "YG:";
                                lblCurrentSale = "YS:";
                                lblGlobalGoal = "WG:";
                                lblGlobalSale = "WS:";
                            } else if (option == 3) {
                                lblCurrentGoal = "WG:";
                                lblCurrentSale = "WS:";
                                lblGlobalGoal = "MG:";
                                lblGlobalSale = "MS:";
                            } else if (option == 4) {
                                lblCurrentGoal = "MG:";
                                lblCurrentSale = "MS:";
                                lblGlobalGoal = "AG:";
                                lblGlobalSale = "AS:";
                            } else if (option == 5) {
                                lblCurrentGoal = "AG:";
                                lblCurrentSale = "AS:";
                                lblGlobalGoal = "CG:";
                                lblGlobalSale = "CS:";
                            }
                        }

                        mostrar += "<div id='divByCompany'>";
                        mostrar += "<div class='store'>";
                        mostrar += "<h1>" + c_alias + '</h1>';
                        $(data.report).each(function (index, value) {


                            var goalAmount = value.goalAmount;
                            var goalAmountGlobal = value.goalAmountGlobal;
                            var payTotal = value.payTotal;
                            var payTotalGlobal = value.payTotalGlobal;
                            var percent = 0.00;
                            var percentGlobal = 0.00;
                            goalAmount = goalAmount.replace(",", ".");
                            goalAmountGlobal = goalAmountGlobal.replace(",", ".");
                            payTotal = payTotal.replace(",", ".");
                            payTotalGlobal = payTotalGlobal.replace(",", ".");


                            var color = "";
                            var colorGlobal = "";

                            //calculo de percent
                            if (payTotal > 0 && goalAmount == 0.00) {
                                percent = 0.00;
                            } else if (payTotal == 0 && goalAmount == 0.00) {
                                percent = 0.00;
                            } else {
                                percent = (payTotal * 100) / goalAmount;
                            }

                            //calculo de percentglobal
                            if (payTotalGlobal > 0.00 && goalAmountGlobal == 0.00) {
                                percentGlobal = 0.00;
                            } else if (payTotalGlobal == 0.00 && goalAmountGlobal == 0.00) {
                                percentGlobal = 0.00;
                            } else {
                                percentGlobal = (payTotalGlobal * 100) / goalAmountGlobal;
                            }
                            
                            
                            
                            if (payTotal == 0.00 || goalAmount == 0.00) {
                                percent = 0.00;
                            }

                            if (payTotalGlobal == 0.00 || goalAmountGlobal == 0.00) {
                                percentGlobal = 0.00;
                            }
                            


                            if (percent < 75) {
                                color = "red";
                            }

                            if (percent > 74 && percent < 100) {
                                color = "ambar";
                            }
                            if (percent > 99) {
                                color = "green";
                            }
                            if (goalAmount == 0.00 && payTotal > 0.00) {
                                color = "green";
                            }
                            if (percentGlobal < 75) {
                                colorGlobal = "red";
                            }
                            if (percentGlobal > 74 && percentGlobal < 100) {
                                colorGlobal = "ambar";
                            }
                            if (percentGlobal > 99) {
                                colorGlobal = "green";
                            }
                            if (goalAmountGlobal == 0.00 && payTotalGlobal > 0.00) {
                                colorGlobal = "green";
                            }
                            percent = parseFloat(percent).toFixed(2);
                            percentGlobal = parseFloat(percentGlobal).toFixed(2);

                            if (actual == 1) {
                                mostrar += "<div class='actual'>";
                                mostrar += "<i>" + lblCurrentGoal + "</i>";
                                mostrar += "<p>" + parseFloat(goalAmount).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</p>";
                                mostrar += "<i>" + lblCurrentSale + "</i>";
                                mostrar += "<p>" + parseFloat(payTotal).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</p>";
                                mostrar += "<span class='" + color + "'>" + percent + " %</span>";
                                mostrar += "</div>";
                            }
                            if (global == 1) {
                                mostrar += "<div class='global'>";
                                mostrar += "<i>" + lblGlobalGoal + "</i>";
                                mostrar += "<p>" + parseFloat(goalAmountGlobal).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</p>";
                                mostrar += "<i>" + lblGlobalSale + "</i>";
                                mostrar += "<p>" + parseFloat(payTotalGlobal).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</p>";
                                mostrar += "<span class='" + colorGlobal + "'>" + percentGlobal + " %</span>";
                                mostrar += "</div>";
                            }
                            mostrar += "</div>";
                            mostrar += "<hr>";
                            $("#items").append(mostrar);
                        });
                        henry1();
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
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

            /*************************************/

        }, null);
    });

}

//************** Descargar data por Region, en el array en el indice byRegion:2*********//
function downloadByRegion(actual_, global_) {
    var xurl = "";
    var c_ip = "";
    var c_port = "";
    var c_site = "";

    var lblCurrentSale = "";
    var lblCurrentGoal = "";
    var lblGlobalSale = "";
    var lblGlobalGoal = "";

    localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ' + TABLE_URL + ' WHERE  ' + KEY_USE + ' = 1', [], function (tx, results) {

            c_ip = results.rows.item(0).ip;
            c_port = results.rows.item(0).port;
            c_site = results.rows.item(0).site;

            xurl = 'http://' + c_ip + ':' + c_port + '/' + c_site + '/reportByRegion/POST';

            var byRegion = $(".select-general div:first-child()").attr("data-value");
            var option = $(".select-dateP .init").attr("data-value");



            var array = {byRegion: byRegion, option: option};
            
            var actual = actual_;
            var global = global_;
            
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
                        var mostrar = "";
                        mostrar += "<div id='divByRegion'>";

                        if (current_lang == 'es') {
                            if (option == 1) {
                                lblCurrentGoal = "MH:";
                                lblCurrentSale = "VH:";
                                lblGlobalGoal = "MS:";
                                lblGlobalSale = "VS:";
                            } else if (option == 2) {
                                lblCurrentGoal = "MA:";
                                lblCurrentSale = "VA:";
                                lblGlobalGoal = "MS:";
                                lblGlobalSale = "VS:";
                            } else if (option == 3) {
                                lblCurrentGoal = "MS:";
                                lblCurrentSale = "VS:";
                                lblGlobalGoal = "MM:";
                                lblGlobalSale = "VM:";
                            } else if (option == 4) {
                                lblCurrentGoal = "MM:";
                                lblCurrentSale = "VM:";
                                lblGlobalGoal = "MA:";
                                lblGlobalSale = "VA:";
                            } else if (option == 5) {
                                lblCurrentGoal = "MA:";
                                lblCurrentSale = "VA:";
                                lblGlobalGoal = "MAC:";
                                lblGlobalSale = "VAH:";
                            }
                        } else {
                            if (option == 1) {
                                lblCurrentGoal = "TG:";
                                lblCurrentSale = "TS:";
                                lblGlobalGoal = "WG:";
                                lblGlobalSale = "WS:";
                            } else if (option == 2) {
                                lblCurrentGoal = "YG:";
                                lblCurrentSale = "YS:";
                                lblGlobalGoal = "WG:";
                                lblGlobalSale = "WS:";
                            } else if (option == 3) {
                                lblCurrentGoal = "WG:";
                                lblCurrentSale = "WS:";
                                lblGlobalGoal = "MG:";
                                lblGlobalSale = "MS:";
                            } else if (option == 4) {
                                lblCurrentGoal = "MG:";
                                lblCurrentSale = "MS:";
                                lblGlobalGoal = "AG:";
                                lblGlobalSale = "AS:";
                            } else if (option == 5) {
                                lblCurrentGoal = "AG:";
                                lblCurrentSale = "AS:";
                                lblGlobalGoal = "CG:";
                                lblGlobalSale = "CS:";
                            }
                        }


                        $(data.report).each(function (index, value) {

                            var regionName = value.region;
                            var goalAmount = value.goalamount;
                            var goalAmountGlobal = value.goalamountglobal;
                            var payTotal = value.paytotal;
                            var payTotalGlobal = value.paytotalglobal;
                            var percent = 0.00;
                            var percentGlobal = 0.00;


                            goalAmount = goalAmount.replace(",", ".");
                            goalAmountGlobal = goalAmountGlobal.replace(",", ".");
                            payTotal = payTotal.replace(",", ".");
                            payTotalGlobal = payTotalGlobal.replace(",", ".");


                            var color = "";
                            var colorGlobal = "";

                            //calculo de percent
                            if (payTotal > 0 && goalAmount == 0.00) {
                                percent = 0.00;
                            } else if (payTotal == 0 && goalAmount == 0.00) {
                                percent = 0.00;
                            } else {
                                percent = (payTotal * 100) / goalAmount;
                            }

                            //calculo de percentglobal
                            if (payTotalGlobal > 0.00 && goalAmountGlobal == 0.00) {
                                percentGlobal = 0.00;
                            } else if (payTotalGlobal == 0.00 && goalAmountGlobal == 0.00) {
                                percentGlobal = 0.00;
                            } else {
                                percentGlobal = (payTotalGlobal * 100) / goalAmountGlobal;
                            }

                            if (payTotal == 0.00 || goalAmount == 0.00) {
                                percent = 0.00;
                            }

                            if (payTotalGlobal == 0.00 || goalAmountGlobal == 0.00) {
                                percentGlobal = 0.00;
                            }

                            if (percent < 75) {
                                color = "red";
                            }

                            if (percent > 74 && percent < 100) {
                                color = "ambar";
                            }

                            if (percent > 99) {
                                color = "green";
                            }

                            if (goalAmount == 0.00 && payTotal > 0.00) {
                                color = "green";
                            }

                            if (percentGlobal < 75) {
                                colorGlobal = "red";
                            }

                            if (percentGlobal > 74 && percentGlobal < 100) {
                                colorGlobal = "ambar";
                            }

                            if (percentGlobal > 99) {
                                colorGlobal = "green";
                            }

                            if (goalAmountGlobal == 0.00 && payTotalGlobal > 0.00) {
                                colorGlobal = "green";
                            }

                            percent = parseFloat(percent).toFixed(2);
                            percentGlobal = parseFloat(percentGlobal).toFixed(2);

                            mostrar += "<div class='store'>";
                            mostrar += "<h1>" + regionName + "</h1>";
                            if (actual == 1) {
                                mostrar += "<div class='actual'>";

                                mostrar += "<i>" + lblCurrentGoal + "</i>";
                                mostrar += "<p>" + parseFloat(goalAmount).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</p>";
                                mostrar += "<i>" + lblCurrentSale + "</i>";
                                mostrar += "<p>" + parseFloat(payTotal).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</p>";
                                mostrar += "<span class='" + color + "'>" + percent + " %</span>";

                                mostrar += "</div>";
                            }
                            if (global == 1) {
                                mostrar += "<div class='global'>";

                                mostrar += "<i class='type'>" + lblGlobalGoal + "</i>";
                                mostrar += "<p class='gol-number'>" + parseFloat(goalAmountGlobal).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</p>";
                                mostrar += "<i class='type'>" + lblGlobalSale + "</i>";
                                mostrar += "<p class='sale-number'>" + parseFloat(payTotalGlobal).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</p>";
                                mostrar += "<span class='" + colorGlobal + "'>" + percentGlobal + " %</span>";

                                mostrar += "</div>";
                            }
                            mostrar += "</div>";
                            mostrar += "</div><hr>";
                            $("#items").append(mostrar);
                            
                            mostrar = "";

                        });
                        henry1();
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
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

//************ Descargar data por Store, en el arrary su indice vale***********//
function downloadByStore(actual_, global_, _ch_order_payTotal, _ch_order_goalAmount) {
    var xurl = "";
    var c_ip = "";
    var c_port = "";
    var c_site = "";

    var lblCurrentSale = "";
    var lblCurrentGoal = "";
    var lblGlobalSale = "";
    var lblGlobalGoal = "";

    var option = $(".select-dateP .init").attr("data-value");
    var regionCode = $(".select-region div:first-child()").attr("data-value");


    if (regionCode == "R-1") {
        regionCode = "";
    }
    var array = {option: option, regionCode: regionCode, total: _ch_order_payTotal, goal: _ch_order_goalAmount};

    var actual = actual_;
    var global = global_;

    localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ' + TABLE_URL + ' WHERE  ' + KEY_USE + ' = 1', [], function (tx, results) {
            c_ip = results.rows.item(0).ip;
            c_port = results.rows.item(0).port;
            c_site = results.rows.item(0).site;
            xurl = 'http://' + c_ip + ':' + c_port + '/' + c_site + '/reportgoal/post';


            /*********************/
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
                        var mostrar = "";
                        var indice = 0;

                        if (current_lang == 'es') {
                            if (option == 1) {
                                lblCurrentGoal = "MH:";
                                lblCurrentSale = "VH:";
                                lblGlobalGoal = "MS:";
                                lblGlobalSale = "VS:";
                            } else if (option == 2) {
                                lblCurrentGoal = "MA:";
                                lblCurrentSale = "VA:";
                                lblGlobalGoal = "MS:";
                                lblGlobalSale = "VS:";
                            } else if (option == 3) {
                                lblCurrentGoal = "MS:";
                                lblCurrentSale = "VS:";
                                lblGlobalGoal = "MM:";
                                lblGlobalSale = "VM:";
                            } else if (option == 4) {
                                lblCurrentGoal = "MM:";
                                lblCurrentSale = "VM:";
                                lblGlobalGoal = "MA:";
                                lblGlobalSale = "VA:";
                            } else if (option == 5) {
                                lblCurrentGoal = "MA:";
                                lblCurrentSale = "VA:";
                                lblGlobalGoal = "MAC:";
                                lblGlobalSale = "VAH:";
                            }
                        } else {
                            if(option == 1) {
                                lblCurrentGoal = "TG:";
                                lblCurrentSale = "TS:";
                                lblGlobalGoal = "WG:";
                                lblGlobalSale = "WS:";
                            } else if (option == 2) {
                                lblCurrentGoal = "YG:";
                                lblCurrentSale = "YS:";
                                lblGlobalGoal = "WG:";
                                lblGlobalSale = "WS:";
                            } else if (option == 3) {
                                lblCurrentGoal = "WG:";
                                lblCurrentSale = "WS:";
                                lblGlobalGoal = "MG:";
                                lblGlobalSale = "MS:";
                            } else if (option == 4) {
                                lblCurrentGoal = "MG:";
                                lblCurrentSale = "MS:";
                                lblGlobalGoal = "AG:";
                                lblGlobalSale = "AS:";
                            } else if (option == 5) {
                                lblCurrentGoal = "AG:";
                                lblCurrentSale = "AS:";
                                lblGlobalGoal = "CG:";
                                lblGlobalSale = "CS:";
                            }
                        }

                        // mostrar += "<div id='divByRegion'>";

                        $(data.report).each(function (index, value) {

                            var storeName = value.storeName;
                            var goalAmount = value.goalAmount;
                            var goalAmountGlobal = value.goalAmountGlobal;
                            var payTotal = value.payTotal;
                            var payTotalGlobal = value.payTotalGlobal;
                            var percent = 0.00;
                            var percentGlobal = 0.00;

                            
                            goalAmount = goalAmount.replace(",", ".");
                            goalAmountGlobal = goalAmountGlobal.replace(",", ".");
                            payTotal = payTotal.replace(",", ".");
                            payTotalGlobal = payTotalGlobal.replace(",", ".");

                            var color = "";
                            var colorGlobal = "";


                            
                            //calculo de percent
                            if (payTotal > 0 && goalAmount == 0.00) {
                                percent = 0.00;
                            } else if (payTotal == 0 && goalAmount == 0.00) {
                                percent = 0.00;
                            } else {
                                    percent = (payTotal * 100) / goalAmount;
                            }
                            
                                
                            //calculo de percentglobal
                            if (payTotalGlobal > 0.00 && goalAmountGlobal == 0.00) {
                                percentGlobal = 0.00;
                            } else if(payTotalGlobal == 0.00 && goalAmountGlobal == 0.00) {
                                percentGlobal = 0.00;
                            }   else {
                                    percentGlobal = (payTotalGlobal * 100) / goalAmountGlobal;  
                            }                    

                            if (payTotal == 0.00 || goalAmount == 0.00) {
                                percent = 0.00;
                            }

                            if (payTotalGlobal == 0.00 || goalAmountGlobal == 0.00) {
                                percentGlobal = 0.00;
                            }

                            if (percent < 75) {
                                color = "red";
                            }

                            if (percent > 74 && percent < 100) {
                                color = "ambar";
                            }

                            if (percent > 99) {
                                color = "green";
                            }

                            if (goalAmount == 0.00 && payTotal > 0.00) {
                                color = "green";
                            }

                            if (percentGlobal < 75) {
                                colorGlobal = "red";
                            }
                            if (percentGlobal > 74 && percentGlobal < 100) {
                                colorGlobal = "ambar";
                            }

                            if (percentGlobal > 99) {
                                colorGlobal = "green";
                            }

                            if (goalAmountGlobal == 0.00 && payTotalGlobal > 0.00) {
                                colorGlobal = "green";
                            }

                            percent = parseFloat(percent).toFixed();
                            percentGlobal = parseFloat(percentGlobal).toFixed();


                            mostrar += "<div onclick=\"storeWitdhGraphic('-" + indice + "')\" class='store'>";
                            mostrar += "<h1>" + storeName + "</h1>";
                            // mostrar += "<div>";

                            if (actual == 1) {
                                mostrar += "<div class='actual'>";
                                mostrar += "<i>" + lblCurrentGoal + "</i>";
                                mostrar += "<p>" + parseFloat(goalAmount).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</p>";
                                mostrar += "<i>" + lblCurrentSale + "</i>";
                                mostrar += "<p>" + parseFloat(payTotal).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</p>";
                                mostrar += "<span class='" + color + "'>" + percent + " %</span>";

                                mostrar += "</div>";
                            }

                            if (global == 1) {
                                mostrar += "<div class='global'>";
                                mostrar += "<i>" + lblGlobalGoal + "</i>";
                                mostrar += "<p>" + parseFloat(goalAmountGlobal).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</p>";
                                mostrar += "<i>" + lblGlobalSale + "</i>";
                                mostrar += "<p>" + parseFloat(payTotalGlobal).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</p>";
                                mostrar += "<span class='" + colorGlobal + "'>" + percentGlobal + " %</span>";

                                mostrar += "</div>";
                            }


                            var j = 0;
                            var array_description = [];
                            var array_total = [];
                            $(value.info).each(function (index, value) {
                                var info = value.info;
                                var total = value.total;

                                array_description[j] = info;
                                array_total[j] = total;

                                j++;
                            });
                            mostrar += "<div id='graph-" + indice + "' class='graphic-" + indice + "'><div id='chartdiv-" + indice + "' class='chartdiv-" + indice + "'></div>";

                            mostrar += "<div class='detalle-" + indice + "'>";

                            mostrar += "<div class='year'>Año</div><div class='quantity'>Cantidad</div>";
                            mostrar += "<i>" + array_description[0] + "</i><span>" + parseFloat(array_total[0]).toFixed() + "</span>";
                            mostrar += "<i>" + array_description[1] + "</i><span>" + parseFloat(array_total[1]).toFixed() + "</span>";
                            mostrar += "<i>" + array_description[2] + "</i><span>" + parseFloat(array_total[2]).toFixed() + "</span>";

                            mostrar += "</div></div>";
                            mostrar += "</div>";
                            mostrar += "</div><hr>";

                            $("#items").append(mostrar);
                            drawGraphic(array_description[0], array_description[1], array_description[2],
                                    array_total[0], array_total[1], array_total[2], indice);

                            mostrar = "";
                            indice++;

                        });
                        henry1();
                        mostrarIndice(indice);
                    }

                    hideLoading();

                },
                error: function (xhr, ajaxOptions, thrownError) {
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
            /**********************/
        });
    });
}

function loadComboRegions(actual_, global_) {
    var yurl = "";
    var c_ip = "";
    var c_port = "";
    var c_site = "";

    var selectRegion = "ALL REGION";

    localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ' + TABLE_URL + ' WHERE  ' + KEY_USE + ' = 1', [], function (tx, results) {
            c_ip = results.rows.item(0).ip;
            c_port = results.rows.item(0).port;
            c_site = results.rows.item(0).site;
            yurl = 'http://' + c_ip + ':' + c_port + '/' + c_site + '/region/';

            $.ajax({
                url: yurl,
                type: 'get',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout: 15000,
                crossdomain: true,
                async: true,
                beforeSend: function () {

                },
                complete: function () {

                },
                success: function (data, textStatus, XMLHttpRequest) {
                    $("#selectRegion").empty();
                    $('.region .section_content .select-region').empty();
                    
                    if (data.quantity == 1) { //este objeto data es el object que devuelve el webservice(2 atributos (1jsonarray y el otro un entero))

                        if (current_lang == 'es')
                            selectRegion = "TODAS LAS REGIONES";
                        
                        $("#selectRegion").append("<div data-value='R-1' class='init item innerLi' onclick='moveToLeft(4);'>"+selectRegion+"</div>");
                        
                        $('.region .section_content .select-region').append("<div class='item selected' data-value='R-1'>" + selectRegion + "</div>");
                        
                        $(data.data).each(function (index, value) {
                            var regionCode = value.regionCode;
                            var regionName = value.regionName;
                            $('.region .section_content .select-region')
                                    .append($("<div class='item' id=" + regionCode +">" + regionName +"</div>")
                                            .attr("data-value", regionCode)
                                            .text(regionName));
                        });

                        showCombo();
                        downloadByStore(actual_, global_);

                    } else {

                        downloadByStore(actual_, global_);


                    }
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

function showCombo() {
    $('.region').show(); //* varia si existe regiones*/
}

function deleteConfiguration() {

    var query = "DELETE FROM " + TABLE_CONFIGURATION;
    try {
        localDB.transaction(function (transaction) {

            transaction.executeSql(query, [], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Error delete configuration.");
                }
                else {
                    console.log("Realizado deleteConfiguration");
                }
            }, errorHandler);
        });
    }
    catch (e) {
        updateStatus("No se realizo deleteConfiguration " + e + ".");
    }
}

function updateState() {

    var query = "UPDATE " + TABLE_URL + " SET " + KEY_USE + " = ?";

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, ["0"], function (transaction, results) {
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

function capture_variable(variable_) {
    passed_variable = variable_;
}

function updateCheckActual(principal, variable) {
    retornarStores(principal, variable);
}

function updateCheckGlobal(variable) {
    $("#global").val(variable);
    downloadGoal();
}

function getAllData() {

    var query = "SELECT " + KEY_ID + ", " + KEY_URLBASE + "," + KEY_ALIAS + " FROM " + TABLE_URL;
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [], function (transaction, results) {

                var mostrar = "";
                $("#divlistado").empty();

                for (var i = 0; i < results.rows.length; i++) {

                    var row = results.rows.item(i);
                    var _id = row['id'];
                    var _alias = row['alias'];
                    var _url = row['urlBase'];

                    //<div class="alias-item" id="alias-item">Cambiar de Alias 1 <button type="button" class="delete">×</button></div>

                    mostrar += "<div class='alias-item' id='alias-item'> ";
                    mostrar += "<span data-toggle='modal' data-target='#ModalConfirm' onclick=\"addID(" + _id + ")\">" + _alias + "</span> ";//data-target ???
                    mostrar += "<button type='button' class='delete' data-toggle='modal' data-target='#ModalConfirmDelete' ";
                    mostrar += "onclick=\"addIDDelete(" + _id + ")\"></button></div>";
                }
                $("#divlistado").append(mostrar);


            }, function (transaction, error) {
                console.log("Error: " + error.code + "<br>Mensage: " + error.message);
            });
        });
    }
    catch (e) {
        console.log("Error getAllData " + e + ".");
    }
}

function updateStateURL(id) {

    var query = "UPDATE " + TABLE_URL + " SET " + KEY_USE + " = '0'";

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

    var query2 = "UPDATE " + TABLE_URL + " SET " + KEY_USE + " = '1' WHERE " + KEY_ID + " = ? ";
    console.log("query2 " + query2);

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query2, [id], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Error updateState");
                }
                else {
                    console.log("Update realizado:" + results.rowsAffected);
                    location.reload();
                }
            }, errorHandler);
        });
    } catch (e) {
        console.log("Error updateState " + e + ".");
    }
}

function deleteServer(id) {
    var query1 = "SELECT " + KEY_USE + " FROM " + TABLE_URL + " WHERE " + KEY_ID + " = ?";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query1, [id], function (transaction, results) {
                var total = results.rows.item(0).use;


                if (total == 1) {
                    mostrarModalMessage();
                } else {
                    var query2 = "DELETE FROM " + TABLE_URL + " WHERE " + KEY_ID + " = ? ";
                    try {
                        localDB.transaction(function (transaction) {
                            transaction.executeSql(query2, [id], function (transaction, results) {
                                if (!results.rowsAffected) {
                                    console.log("Error eliminar servidor");
                                }
                                else {
                                    console.log("deleteServer realizado:" + results.rowsAffected);
                                    getDataInUse();
                                    getAllData();
                                }
                            }, errorHandler);
                        });
                    } catch (e) {
                        console.log("Error updateState " + e + ".");
                    }
                }
            }, errorHandler);
        });
    } catch (e) {
        console.log("Error deleteServer " + e + ".");
    }

}

function getDataInUse() {
    var query = "SELECT " + KEY_IP + "," + KEY_ALIAS + " FROM " + TABLE_URL + " WHERE " + KEY_USE + " = '1'";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [], function (transaction, results) {
                var ip = results.rows.item(0).ip;
                var alias = results.rows.item(0).alias;
                console.log("ip: " + ip + " - alias: " + alias);
                $("#txtIP").text("IP: " + ip);
                $("#txtStore").text(alias);

            }, function (transaction, error) {
                console.log("Error: " + error.code + "<br>Mensage: " + error.message);
            });
        });
    }
    catch (e) {
        console.log("Error getDataInUse " + e + ".");
    }
}


/*******ocultar y mostrar lineas principal y global*******/
function refresh() {
    var principal = $(".select-general div:first-child()").attr("data-value");

    if (checkNetConnection() == true) {
        var chActual = get_chActual();
        var chGlobal = get_chGlobal();
        if (principal == 1) {
            downloadByCompany(chActual, chGlobal);
        } else if (principal == 2) {
            downloadByRegion(chActual, chGlobal);
        } else if (principal == 3) {
            downloadByStore(chActual, chGlobal);
        }

    } else {
        mostrarModalGeneral();
    }

}


/*****************************function for capture and show parameters*********************************/
function captureParameters() {
    var vr = 'ip'; /* parámetro que se necesita */
    var src = String(window.location.href).split('?')[1];
    var vrs = src.split('&');
    for (var x = 0, c = vrs.length; x < c; x++)
    {
        if (vrs[x].indexOf(vr) != -1)
        {
            return decodeURI(vrs[x].split('=')[1]);
            break;
        }
        ;
    }
    ;
}

function locationVars(vr){
    try {
        var src = String(window.location.href).split('?')[1];
        var vrs = src.split('&');

        for (var x = 0, c = vrs.length; x < c; x++)
        {
            if (vrs[x].indexOf(vr) != -1)
            {
                return decodeURI(vrs[x].split('=')[1]);
                break;
            }
            ;
        }
        ;
    } catch (e) {
        return "-1"; //esto ocurre cuando en la url tenemos login.html nada mas , solo para el caso en la pantalla login.html  
    }
}

function getIp_Parameter() {
    return locationVars('ip');
}
function getPort_Parameter() {
    return locationVars('port');
}
function getUrlBase_Parameter() {
    return locationVars('urlbase');
}
function getAlias_Parameter() {
    return locationVars('alias');
}
function getActivo_Parameter() {
    return locationVars('activo');
}
function getSite_Parameter() {
    return locationVars('site');
}
function getVariable_Parameter() {
    return locationVars('variable');
}
function menu() {
    window.location.href = "menu.html";
}
function obtenerVariables(name) {
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var tmpURL = window.location.href;
    var results = regex.exec(tmpURL);

    if (results == null) {
        return "-1";
    } else {
        return results[1];
    }
}
function drawGraphic(year1, year2, year3, sales1, sales2, sales3, option) {
    var chartData = [
        {
            "year": year1,
            "duration": sales1
        },
        {
            "year": year2,
            "duration": sales2
        },
        {
            "year": year3,
            "duration": sales3
        }
    ];
    var chart = AmCharts.makeChart("chartdiv-" + option, {
        theme: "none",
        type: "serial",
        dataDateFormat: "YYYY",
        dataProvider: chartData,
        addClassNames: true,
        //startDuration: 0,
        color: "#333",
        marginLeft: 0,
        categoryField: "year",
        valueAxes: [{
                id: "a3",
                position: "right",
                gridAlpha: 0,
                axisAlpha: 0,
                inside: true,
                ignoreAxisWidth: true
            }],
        graphs: [{
                id: "g3",
                valueField: "duration",
                type: "line",
                lineColor: "#0052CD",
                //balloonText: "[[category]]<br><b>[[value]]</b>",
                lineThickness: 2,
                bullet: "round",
                bulletBorderColor: "#f1f1f1",
                bulletBorderThickness: 2,
                bulletBorderAlpha: 1
                        //dashLengthField: "dashLength",
                        //animationPlayed: false
            }],
    });
}

function deteclenguage() {
    lang = navigator.language.split("-");
    current_lang = (lang[0]);

    if (current_lang == 'es') {

        //Index        
        MSG_INSERT_ADDRESS_SERVER();
        MSG_PORT();
        MSG_ALIAS();
        MSG_SITE();
        MSG_GO();
        MSG_RETURN();

        //Login
        MSG_NUMBER_PIN();
        MSG_REMEMBER_PIN();
        BTN_LOGIN();
        MSG_BACK_LOGIN();
        

        //Menu
        MSG_LBL_MAINTITLE();
        MSG_LBL_GVS();
        MSG_LBL_GVS_D();
        MSG_LBL_WORKING();
        MSG_LBL_SC();
        MSG_LBL_SC_D();
        MSG_LBL_PP();
        MSG_LBL_PP_D();

        MSG_LBL_TITLE_MENU_R4();
        MSG_LBL_TITLE_MENU_DETAIL_R4();
        MSG_LBL_TITLE_MENU_R5();
        MSG_LBL_TITLE_MENU_DETAIL_R5();


        //Modal Menu
        MSG_LBL_CHANGE_ALIAS_T();
        MSG_LBL_CHANGE_ALIAS_BUTTON();
        MSG_LBL_CHANGE_ALIAS_CONFIRM();
        MSG_LBL_CHANGE_ALIAS_CONFIRM_SI();
        MSG_LBL_DELETE_SERVER_MESSAGE();

        //Stores
        BTN_PREFERENCES_TXT();
        BTN_REFRESH();

        OPT_COMBO_GENERAL();
        OPT_COMBO_DATE();
        OPT_COMBO_STORES();

        //Modal Stores
        MSG_DICT_TITLE();
        MSG_SHORTCUTS();
        BTN_OK();

        //Preferences
        BTN_BACK();
        MSGS_VISUALIZATION();
        MSGS_ORDER();



        //Modal Report 4 menu
        MSG_TITLE_DIALOGSTORE_R4();
        MSG_OK_R4();
        //Modal Reporte 5 menu
        MSG_TITLE_DIALOGSTORE_R5();
        MSG_OK_R5();

        /////////////////////////////
        /***************REPORTE1***************/
        MSG_COMPANY_1();
        MSG_LBL_COMPANY_1();
        MSG_LBL_REGION_1();
        MSG_LBL_STORE_1();
        MSG_TXT_TITLE_1();
        MSG_SPN_HEADER_1();
        MSG_SPN_TITLE_1();
        MSG_LBL_MODAL_DIC_1();
        MSG_RPT_TG_1();
        MSG_RPT_TS_1();
        MSG_RPT_YG_1();
        MSG_RPT_YS_1();
        MSG_RPT_WG_1();
        MSG_RPT_WS_1();
        MSG_RPT_MG_1();
        MSG_RPT_MS_1();
        MSG_RPT_AG_1();
        MSG_RPT_AS_1();
        MSG_RPT_CG_1();
        MSG_RPT_CS_1();
        MSG_MODAL_OK_1();
        MSG_BACK_1();
        MSG_CHOOSEDATE_1();
        MSG_TODAY_1();
        MSG_YESTERDAY_1();
        MSG_WEEK_1();
        MSG_MONTH_1();
        MSG_YEAR_1();
        MSG_VISUALIZATION_1();
        MSG_SHOWCURRENT_1();
        MSG_SHOWGLOBAL_1();
        MSG_TODAYP_1();
        
        MSG_LBL_DET_DIC_1();
        /***************************************/ 
    }
}