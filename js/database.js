
//DATABASE NAME
var localDB = 'RCS';

//DEFINE OUR TABLES
var TABLE_URL = "URLSTORE";

//TABLE_CONFIGURATION
var TABLE_CONFIGURATION = "CONFIGURATION";
var KEY_PIN = "pin";
var KEY_REMEMBER = "save";

//DEFINE OUR FIELDS
var KEY_ID = "id";
var KEY_IP = "ip";
var KEY_PORT = "port";
var KEY_URLBASE = "urlBase";
var KEY_ALIAS = "alias";
var KEY_USE = "use";
var KEY_SITE = "site";
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
//*****Table Reports********//
var TABLE_REPORTS = "REPORTS";
var KEY_REPORT = "report";
//var KEY_REPORTINF = "info";
var KEY_ACTIVO = "activo";
//**************************//



function initDB() {
    var shortName = 'RCS';
    var version = '2.0';
    var displayName = 'RCS Reports';
    var maxSize = 10240; // Em bytes
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
}

function createTables() {

    var tableURL = "CREATE TABLE " + TABLE_URL + " ( "
            + KEY_ID + " INTEGER PRIMARY KEY, " + KEY_IP + " TEXT, " + KEY_PORT + " TEXT, " + KEY_URLBASE + " TEXT, "
            + KEY_ALIAS + " TEXT, " + KEY_USE + " TEXT, " + KEY_SITE + " TEXT ) ";

    var tableConfiguration = "CREATE TABLE " + TABLE_CONFIGURATION + " (" + KEY_PIN + " TEXT, " + KEY_REMEMBER + " TEXT)";

    var tableClasification = "CREATE TABLE " + TABLE_CLASIFICATION + " ( " +
            KEY_MUY_BUENA + " TEXT, " + KEY_LIMIT_INF_BUENA + " TEXT, " + KEY_LIMIT_SUP_BUENA + " TEXT, " + KEY_LIMIT_INF_ACEPTABLE + " TEXT, " +
            KEY_LIMIT_SUP_ACEPTABLE + " TEXT, " + KEY_LIMIT_INF_DEFICIENTE + " TEXT, " + KEY_LIMIT_SUP_DEFICIENTE + " TEXT, " + KEY_LIMIT_INF_CRITICO + " TEXT, " +
            KEY_LIMIT_SUP_CRITICO + " TEXT, " + KEY_MUY_CRITICO + " TEXT)";

    var tableCDateRange = "CREATE TABLE " + TABLE_CUSTOM_DATE_RANGE + "(" + KEY_DATE_START + " TEXT," + KEY_DATE_END + " TEXT," + KEY_DATE_CHOOSED + " TEXT)";

    var tableStore = "CREATE TABLE " + TABLE_STORE + "(" + KEY_IDSTORE + " INTEGER PRIMARY KEY, " + KEY_STORENO + " TEXT, " + KEY_STORENAME + " TEXT, "
            + KEY_USEDSTORE + " TEXT)";

    var tableRegion = "CREATE TABLE REGION( regionCode TEXT, regionName TEXT)";
    var tableReports = "CREATE TABLE " + TABLE_REPORTS + "(" + KEY_REPORT + " TEXT , " + KEY_ACTIVO + " TEXT)";


    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(tableURL, [], nullDataHandler, errorHandler);
            console.log("Tabla URL status: OK.");
        });
    } catch (e) {
        console.log("Error creando Tabla URL " + e + ".");
        return;
    }

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(tableConfiguration, [], nullDataHandler, errorHandler);
            console.log("Tabla CONFIGURATION status: OK.");
        });
    } catch (e) {
        console.log("Error creando Tabla CONFIGURATION " + e + ".");
        return;
    }

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(tableClasification, [], nullDataHandler, errorHandler);
            console.log("Tabla CLASIFICATION status: OK.");
        });
    } catch (e) {
        console.log("Error creando Tabla CLASIFICATION " + e + ".");
        return;
    }

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(tableCDateRange, [], nullDataHandler, errorHandler);
            console.log("Tabla CRANGEDATE status: OK.");
        });
    } catch (e) {
        console.log("Error creando Tabla CRANGEDATE " + e + ".");
        return;
    }

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(tableStore, [], nullDataHandler, errorHandler);
            console.log("Tabla STORE status: OK.");
        });
    } catch (e) {
        console.log("Error creando Tabla STORE " + e + ".");
        return;
    }


    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(tableRegion, [], nullDataHandler, errorHandler);
            console.log("Tabla URL status: OK.");
        });
    } catch (e) {
        console.log("Error creando Tabla URL " + e + ".");
        return;
    }

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(tableReports, [], nullDataHandler, errorHandler);
            console.log("Tabla URL status: OK.");
        });
    } catch (e) {
        console.log("Error creando Tabla REPORTS " + e + ".");
        return;
    }

}

function onInit() {
    try {
        if (!window.openDatabase) {
            console.log("No soporta BD");
        } else {
            initDB();
            createTables();
        }
    } catch (e) {
        if (e == 2) {
            console.log("Versión de base de datos invalida");
        } else {
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
    var windowh = $(window).height();
    var headerh = $('header').height();
    var regionh = $('#divRegion').height();
    var selectdateP = $('.select-dateP').height();
    var selectGeneral = $('.select-general').height();
    if ($('#divRegion').css('display') == 'none') {
        $('.list').height(windowh - headerh - selectdateP - selectGeneral - 20);
    } else {
        $('.list').height(windowh - headerh - selectdateP - selectGeneral - 68);
    }
}

$(window).resize(function () {
    var windowh = $(window).height();
    var headerh = $('header').height();
    var regionh = $('#divRegion').height();
    var selectdateP = $('.select-dateP').height();
    var selectGeneral = $('.select-general').height();
    if ($('#divRegion').css('display') == 'none') {
        $('.list').height(windowh - headerh - selectdateP - selectGeneral - 20);
    } else {
        $('.list').height(windowh - headerh - selectdateP - selectGeneral - 68);
    }
});
//**********************************************//




//***limpiar tablas a la hora de cambiar o entrar a otro servidor**//
function delTables() {
    try {
        var queryDelete1 = "DELETE FROM " + TABLE_STORE;
        localDB.transaction(function (transaction) {
            transaction.executeSql(queryDelete1, [], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Error updateState");
                } else {
                    console.log("DELETE FROM TABLE STORE :" + results.rowsAffected);
                }
            }, errorHandler);
        });
    } catch (e) {
        console.log("Error updateState " + e + ".");
    }

    try {
        var queryDelete2 = "DELETE FROM REGION";
        localDB.transaction(function (transaction) {
            transaction.executeSql(queryDelete2, [], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Error updateState");
                } else {
                    console.log("DELETE FROM TABLE REGION:" + results.rowsAffected);
                }
            }, errorHandler);
        });
    } catch (e) {
        console.log("error: " + e);
    }

}
function delTable_Reports() {
    try {
        var queryDelete1 = "DELETE FROM " + TABLE_REPORTS;
        localDB.transaction(function (transaction) {
            transaction.executeSql(queryDelete1, [], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Error updateState");
                } else {
                    console.log("DELETE FROM TABLE REPORTS :" + results.rowsAffected);
                }
            }, errorHandler);
        });
    } catch (e) {
        console.log("Error updateState " + e + ".");
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
//entra al ejecutar el APP
function validIP(ip, port, _url, alias, use, site, variable) {
    var xurl = 'http://' + ip + ':' + port + '/' + site + '/Country/';
    $.ajax({
        type: 'GET',
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
            //entra al ejecutar el APP
            if (variable == -1) {
                firstServer(ip, port, xurl, alias, use, site, variable);
            } else {
                //alert("entro al " + variable + " validip");
                newServer(ip, port, xurl, alias, use, site, variable);
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {

            console.log(xhr.status);
            console.log(xhr.statusText);
            console.log(xhr.responseText);
            //hideLoading();
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
    try {
        var query1 = "SELECT " + KEY_PIN + " FROM " + TABLE_CONFIGURATION;
        localDB.transaction(function (transaction) {
            transaction.executeSql(query1, [], function (transaction, results) {
                var pin = results.rows.item(0).pin;
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
                        //verifica que el pin es correcto
                        if (data.successful == 1) {
                            //UPDATE  a la TABLE_URL  1  a 0
                            updateState();
                            //insert en la TABLE_URL
                            //addData(ip, port, urlbase, alias, activo, site);
                            //window.location.href = "data/menu.html";
                            try {
                                var query = "INSERT INTO " + TABLE_URL + " ( " + KEY_IP + " , " + KEY_PORT
                                        + " , " + KEY_URLBASE + ", " + KEY_ALIAS + " , " + KEY_USE + ", " + KEY_SITE + ") VALUES (?,?,?,?,?,?);";
                                localDB.transaction(function (transaction) {
                                    transaction.executeSql(query, [ip, port, urlbase, alias, activo, site], function (transaction, results) {
                                        //alert("inserto data en la TABLE_URL");
                                        //direcciona al MENU.html
                                        window.location.href = "data/menu.html";
                                    }, errorHandler);
                                });
                            } catch (e) {
                                console.log("Error addData " + e + ".");
                            }




                        } else {
                            if (current_lang == 'es') {
                                mostrarModalGeneral("PIN Invalido");
                            } else {
                                mostrarModalGeneral("Invalid PIN");
                            }
                            window.location.href = "data/login.html?" +
                                    "ip=" + ip +
                                    "&port=" + port +
                                    "&urlbase=" + urlbase +
                                    "&alias=" + alias +
                                    "&activo=1" +
                                    "&site=" + site +
                                    "&variable=" + variable;
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
            }, errorHandler);
        });
    } catch (e) {
        console.log("Error updateState " + e + ".");
    }
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

//apretas el boton entrar en el LOGIN.HTML
function validData(pin, check) {
    var variable_ = getVariable_Parameter();
    //alert(variable_);
    if (variable_ == "1") {//si es que es un servidor nuevo y estamos en la pantalla de login
        var ip = getIp_Parameter();
        var port = getPort_Parameter();
        var site = getSite_Parameter();
        var urlbase = getUrlBase_Parameter();
        var alias = getAlias_Parameter();
        var activo = getActivo_Parameter();
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
                //verifica que el pin es correcto
                if (data.successful == 1) {
                    //borramos las TABLE_REPORTS
                    delTable_Reports();
                    //delete TABLE_CONFIGURATION
                    deleteConfiguration();
                    //UPDATE  a la TABLE_URL  1  a 0
                    updateState();
                    //insert
                    addData(ip, port, urlbase, alias, activo, site);
                    //insert el pin y el check en la TABLE_CONFIGURATION
                    insertTableConfi(pin, check);
                    //envia a ala vista MENU.HTML
                    //window.location = "../menu.html";
                } else {
                    if (current_lang == 'es') {
                        mostrarModalGeneral("PIN Invalido");
                    } else {
                        mostrarModalGeneral("Invalid PIN");
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
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

    } else {

        var query = "SELECT COUNT(*) as cant FROM " + TABLE_URL;
        var cant = 0;
        try {
            localDB.transaction(function (transaction) {
                transaction.executeSql(query, [], function (transaction, results) {
                    //cuando ingresa por primera vez
                    if (0 == results.rows.item(0).cant) {
                        var ip = getIp_Parameter();
                        var port = getPort_Parameter();
                        var site = getSite_Parameter();
                        var urlbase = getUrlBase_Parameter();
                        var alias = getAlias_Parameter();
                        var activo = getActivo_Parameter();
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
                                //verifica que el pin es correcto
                                if (data.successful == 1) {
                                    //DELETE FROM REPORTS
                                    delTable_Reports();

                                    //agrega en la TABLE_URL
                                    addData(ip, port, urlbase, alias, activo, site);
                                    //insert el pin y el check en la TABLE_CONFIGURATION
                                    insertTableConfi(pin, check);

                                    //window.location.href = "../data/menu.html";

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
                                //hideLoading();
                                if (current_lang == 'es')
                                    mostrarModalGeneral("Error de Conexión");
                                else
                                    mostrarModalGeneral("No Connection");
                            }
                        });



                        //cuadno sale del app y pone no gusradar pin o cerrar sesion
                    } else {
                        var c_ip = "";
                        var c_port = "";
                        var c_site = "";
                        localDB.transaction(function (tx) {
                            tx.executeSql('SELECT * FROM ' + TABLE_URL + ' WHERE  ' + KEY_USE + ' = 1', [], function (tx, results) {
                                c_ip = results.rows.item(0).ip;
                                c_port = results.rows.item(0).port;
                                c_site = results.rows.item(0).site;
                                var yurl = 'http://' + c_ip + ':' + c_port + '/' + c_site + '/login/session/post';
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
                                        //verifica que el pin es correcto
                                        if (data.successful == 1) {
                                            //DELETE FROM REPORTS
                                            delTable_Reports();

                                            //delete from TABLE_CONFIGURATION
                                            deleteConfiguration();
                                            //insert el pin y el check en la TABLE_CONFIGURATION
                                            insertTableConfi(pin, check);


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
                    }
                }, errorHandler);
            });
        } catch (e) {
            console.log("Error updateState " + e + ".");
        }


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
    } catch (e) {
        console.log("Error existsData " + e + ".");
    }
}


//*funcion que verifica si hay o no hay data para decidir donde mandar menu o store*//
function existsData() {
    var url = "";
    var query = "SELECT COUNT(" + KEY_URLBASE + ") AS urlBase FROM " + TABLE_URL;
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [], function (transaction, results) {
                url = results.rows.item(0).urlBase;
                if (url > 0) {
                    //function verific if vista menu.html or login.html 
                    getConfiguration();
                }
            }, function (transaction, error) {
                console.log("Error: " + error.code + "<br>Mensage: " + error.message);
            });
        });
    } catch (e) {
        console.log("Error existsData " + e + ".");
    }
}

function Title_Company() {
    var query = "SELECT " + KEY_ALIAS + " FROM " + TABLE_URL + " WHERE " + KEY_USE + " = '1';";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [], function (tx, results) {
                var alias = results.rows.item(0).alias;
                document.getElementById('txt_maintitle').innerHTML = alias;
            });
        });
    } catch (e) {
        console.log("Error Title_Company " + e + ".");
    }
}

//function verifica si vista se dirige a menu.html or login.html 
function getConfiguration() {
    var query = "SELECT " + KEY_PIN + " FROM " + TABLE_CONFIGURATION + " WHERE " + KEY_REMEMBER + "='1'";
    var pin = "";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [], function (transaction, results) {

                if (results.rows.length > 0) {
                    pin = results.rows.item(0).pin;
                    localDB.transaction(function (tx) {
                        tx.executeSql('SELECT * FROM ' + TABLE_URL + ' WHERE  ' + KEY_USE + ' = 1', [], function (tx, results) {
                            var c_ip = results.rows.item(0).ip;
                            var c_port = results.rows.item(0).port;
                            var c_site = results.rows.item(0).site;
                            var yurl = 'http://' + c_ip + ':' + c_port + '/' + c_site + '/login/session/post';
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
                                    //verifica que el pin es correcto
                                    if (data.successful == 1) {
                                        //envia a ala vista MENU.HTML
                                        window.location = "data/menu.html";
                                    } else {
                                        if (current_lang == 'es') {
                                            mostrarModalGeneral("Pin Actualizado");
                                            window.location = "data/login.html";
                                        } else {
                                            mostrarModalGeneral("Update Pin");
                                            window.location = "data/login.html";
                                        }
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
                } else {
                    window.location = "data/login.html";
                }
            }, function (transaction, error) {
                console.log("Error: " + error.code + "<br>Mensage: " + error.message);
            });
        });
    } catch (e) {
        console.log("Error getConfiguration " + e + ".");
    }
}

//*********** funcion inserta datos en la tabla URL****************//
function addData(ip, port, urlbase, alias, use, site) {//aqui se hace uin insert
    try {
        var query = "INSERT INTO " + TABLE_URL + " ( " + KEY_IP + " , " + KEY_PORT
                + " , " + KEY_URLBASE + ", " + KEY_ALIAS + " , " + KEY_USE + ", " + KEY_SITE + ") VALUES (?,?,?,?,?,?);";
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [ip, port, urlbase, alias, use, site], function (transaction, results) {
                //alert("inserto data en la TABLE_URL")
                //direcciona al MENU.html
                //window.location.href = "data/menu.html";
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
function downloadByStore(actual_, global_) {
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


    if (regionCode == "R-1" || regionCode == null) {
        regionCode = "";
    }

    var array = {option: option, regionCode: regionCode};

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

                        // mostrar += "<div id='divByRegion'>";

                        $(data.report).each(function (index, value) {

                            var storeName = value.storeName;
                            var goalAmount = value.goalAmount;
                            var goalAmountGlobal = value.goalAmountGlobal;
                            var payTotal = value.payTotal;
                            var payTotalGlobal = value.payTotalGlobal;
                            var lastConexion = value.lastConexion;
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

                            percent = parseFloat(percent).toFixed();
                            percentGlobal = parseFloat(percentGlobal).toFixed();


                            mostrar += "<div onclick=\"storeWitdhGraphic('-" + indice + "')\" class='store'>";
                            mostrar += "<h1 class='storeNameR1'>" + storeName + "</h1>";
                            mostrar += "<div class='lastConexion'><div class='lblLastConexion'>Last Conn.: </div><div class='dataLastConexion'>" + lastConexion + "</div></div>";
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
                            mostrar += "<i>" + array_description[0] + "</i><span>" + parseFloat(array_total[0]).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</span>";
                            mostrar += "<i>" + array_description[1] + "</i><span>" + parseFloat(array_total[1]).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</span>";
                            mostrar += "<i>" + array_description[2] + "</i><span>" + parseFloat(array_total[2]).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</span>";

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
                        deteclenguage();
                    }
                    //hideLoading();
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

                        $("#selectRegion").append("<div data-value='R-1' class='init item innerLi' onclick='moveToLeft(4);'>" + selectRegion + "</div>");

                        $('.region .section_content .select-region').append("<div class='item selected' data-value='R-1'>" + selectRegion + "</div>");

                        $(data.data).each(function (index, value) {
                            var regionCode = value.regionCode;
                            var regionName = value.regionName;
                            $('.region .section_content .select-region').append("<hr>");
                            $('.region .section_content .select-region')
                                    .append($("<div class='item' id=" + regionCode + ">" + regionName + "</div>")
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

                    //mostrarModalGeneral("asasas");
                    console.log(xhr.status);
                    console.log(xhr.statusText);
                    console.log(xhr.responseText);
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
                } else {
                    console.log("Realizado deleteConfiguration");
                }
            }, errorHandler);
        });
    } catch (e) {
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
                } else {
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
    } catch (e) {
        console.log("Error getAllData " + e + ".");
    }
}

//insertar TABLE_CONFIGURATION
function insertTableConfi(pin, save) {
    //alert(pin + " " + save);
    var query = "INSERT INTO " + TABLE_CONFIGURATION + " ( " + KEY_PIN + " , " + KEY_REMEMBER + " ) VALUES(?,?);";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [pin, save], function (transaction, results) {
                window.location.href = "../data/menu.html";

            }, errorHandler);
        });
    } catch (e) {
        console.log("insertTableConfi :" + e);
    }
}



function updateStateURL(id) {

    var query = "UPDATE " + TABLE_URL + " SET " + KEY_USE + " = '0'";

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

    var query2 = "UPDATE " + TABLE_URL + " SET " + KEY_USE + " = '1' WHERE " + KEY_ID + " = ? ";
    console.log("query2 " + query2);

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query2, [id], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Error updateState");
                } else {
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
                                } else {
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
                $("#txtIP").text(ip);
                $("#txtStore").text(alias);

            }, function (transaction, error) {
                console.log("Error: " + error.code + "<br>Mensage: " + error.message);
            });
        });
    } catch (e) {
        console.log("Error getDataInUse " + e + ".");
    }
}



/********************Validate Data Bill  meotdo para comparar fechas********************************/

function valDate(dateStar, dateEnd) {
    var arrayDateStart = dateStar.split("-");
    var arrayDateEnd = dateEnd.split("-");
    var dateStarDay = arrayDateStart[0];
    var dateStarMonth = arrayDateStart[1];
    var dateStarYear = arrayDateStart[2];
    var dateEndDay = arrayDateEnd[0];
    var dateEndMonth = arrayDateEnd[1];
    var dateEndYear = arrayDateEnd[2];

    if (dateStar == dateEnd) {
        return true;
    } else {
        if (parseInt(dateStarYear) < parseInt(dateEndYear)) {
            return true;
        } else if (parseInt(dateStarYear) > parseInt(dateEndYear)) {
            return false;
        } else if (parseInt(dateStarYear) == parseInt(dateEndYear)) {
            if (parseInt(dateStarMonth) < parseInt(dateEndMonth)) {
                return true;
            } else if (parseInt(dateStarMonth) > parseInt(dateEndMonth)) {
                return false;
            } else if (parseInt(dateStarMonth) == parseInt(dateEndMonth)) {
                if (parseInt(dateStarDay) > parseInt(dateEndDay)) {
                    return false;
                } else if (parseInt(dateStarDay) < parseInt(dateEndDay)) {
                    return true;
                } else if (parseInt(dateStarDay) == parseInt(dateEndDay)) {
                    return true;
                }

            }

        }
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

function locationVars(vr) {
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




function insertarTableReports(NameReport, Activo) {
    try {
        var query1 = "INSERT INTO " + TABLE_REPORTS + " ( " + KEY_REPORT + ", " + KEY_ACTIVO + " ) VALUES(?,?); ";
        localDB.transaction(function (transaction) {
            transaction.executeSql(query1, [NameReport, Activo], function (transaction, results) {
            }, errorHandler);
        });
    } catch (e) {
        console.log("error:" + e);
    }
}


function updateHideReports() {
    try {
        var query1 = "SELECT * FROM " + TABLE_URL + " WHERE  " + KEY_USE + " = '1'";
        localDB.transaction(function (transaction) {
            transaction.executeSql(query1, [], function (tx, results) {
                var c_ip = results.rows.item(0).ip;
                var c_port = results.rows.item(0).port;
                var c_site = results.rows.item(0).site;

                var query2 = "SELECT " + KEY_PIN + " FROM " + TABLE_CONFIGURATION;
                localDB.transaction(function (transaction) {
                    transaction.executeSql(query2, [], function (transaction, results) {
                        var pin = results.rows.item(0).pin;
                        var query3 = "SELECT * FROM " + TABLE_REPORTS;
                        localDB.transaction(function (transaction) {
                            transaction.executeSql(query3, [], function (transaction, results) {
                                var yurl = 'http://' + c_ip + ':' + c_port + '/' + c_site + '/login/session/post';
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
                                        //verifica que el pin es correcto
                                        if (data.successful == 1) {
                                            var arrReport = data.report;
                                            $("#txtUser").text(data.employeeName);

                                            var igual = 0;
                                            for (var a = 0; a < results.rows.length; a++) {
                                                if (arrReport[a] == results.rows.item(a).report) {
                                                    igual++;
                                                }
                                            }
                                            if (data.report.length == igual) {
                                                //pinta los reportes en el menu.html                  
                                                selectReports();
                                            } else {
                                                //delete from Reports
                                                delTable_Reports();
                                                //limpia el html de menu.html
                                                $('.menu').empty();
                                                for (var i = 0; i < data.report.length; i++) {
                                                    var report = data.report[i].toString();
                                                    insertarTableReports(report, "1");
                                                }
                                                //pinta los reportes en el menu.html                  
                                                selectReports();
                                            }




                                        } else {
                                            if (current_lang == 'es') {
                                                mostrarModalGeneral("PIN Invalido");
                                            } else {
                                                mostrarModalGeneral("Invalid PIN");
                                            }
                                            window.location.href = "login.html";
                                        }
                                    },
                                    error: function (xhr, ajaxOptions, thrownError) {
                                        console.log(xhr.status);
                                        console.log(xhr.statusText);
                                        console.log(xhr.responseText);
                                        //hideLoading();
                                        if (current_lang == 'es') {
                                            mostrarModalGeneral("Error de Conexión");
                                        } else {
                                            mostrarModalGeneral("No Connection");
                                        }
                                    }
                                });




                            });
                        });






                    });
                });
            });
        });

    } catch (e) {
        console.log("Error updateState " + e + ".");
    }
}

function showReports() {
    $('#ModalReportsOption').modal('show');

    try {
        var query1 = "SELECT * FROM " + TABLE_REPORTS;
        var report = "";
        var check = "";
        var active = "";
        localDB.transaction(function (transaction) {
            transaction.executeSql(query1, [], function (transaction, results) {
                $('#list_reports').empty();
                for (var i = 0; i < results.rows.length; i++) {
                    report = results.rows.item(i).report;
                    active = results.rows.item(i).activo;
                    if (active == 1) {
                        check = "checked";
                    } else {

                        check = "";
                    }

                    if (current_lang == 'es') {
                        if (report == 2402) {
                            $('#list_reports').append(
                                    "<input type='checkbox' class='check_report1' " + check + ">" +
                                    "<label class='text-report'>Metas vs Ventas</label>" +
                                    "<hr>");
                        }
                        if (report == 2403) {
                            $('#list_reports').append(
                                    "<input type='checkbox' class='check_report2' " + check + ">" +
                                    "<label class='text-report'>Clasificación por Tienda</label>" +
                                    "<hr>");
                        }
                        if (report == 2404) {
                            $('#list_reports').append(
                                    "<input type='checkbox' class='check_report3' " + check + ">" +
                                    "<label class='text-report'>Progreso en % por tienda</label>" +
                                    "<hr>");


                        }
                        if (report == 2405) {
                            $('#list_reports').append(
                                    "<input type='checkbox' class='check_report4' " + check + ">" +
                                    "<label class='text-report'>Gráfico Avanzado</label>" +
                                    "<hr>");

                        }
                        if (report == 2406) {
                            $('#list_reports').append(
                                    "<input type='checkbox' class='check_report5' " + check + ">" +
                                    "<label class='text-report'>Alcance de Meta</label>" +
                                    "<hr>");
                        }
                    } else {

                        if (report == 2402) {
                            $('#list_reports').append(
                                    "<input type='checkbox' class='check_report1' " + check + ">" +
                                    "<label class='text-report'>Goal VS Sales</label>" +
                                    "<hr>");

                        }
                        if (report == 2403) {
                            $('#list_reports').append(
                                    "<input type='checkbox' class='check_report2' " + check + ">" +
                                    "<label class='text-report'>Store Clasification</label>" +
                                    "<hr>");
                        }
                        if (report == 2404) {
                            $('#list_reports').append(
                                    "<input type='checkbox' class='check_report3' " + check + ">" +
                                    "<label class='text-report'>% Progress By Store</label>" +
                                    "<hr>");
                        }
                        if (report == 2405) {
                            $('#list_reports').append(
                                    "<input type='checkbox' class='check_report4' " + check + ">" +
                                    "<label class='text-report'>Advance Graphic</label>" +
                                    "<hr>");
                        }
                        if (report == 2406) {
                            $('#list_reports').append(
                                    "<input type='checkbox' class='check_report5' " + check + ">" +
                                    "<label class='text-report'>Goal Scope By Clerk</label>" +
                                    "<hr>");
                        }
                    }
                }
            });
        });
    } catch (e) {
        console.log("error: " + e);
    }

}


function  confirmSignOut() {
    try {
        var query1 = "DELETE FROM " + TABLE_CONFIGURATION;
        localDB.transaction(function (transaction) {
            transaction.executeSql(query1, [], function (transaction, results) {
                window.location = "./login.html";
            });
        });
    } catch (e) {
        console.log("execute confirmSignOut()");
    }
}

function exitsUsers() {
    try {
        var query1 = "SELECT " + KEY_REMEMBER + " FROM " + TABLE_CONFIGURATION;
        localDB.transaction(function (transaction) {
            transaction.executeSql(query1, [], function (transaction, results) {
                if (results.rows.length > 0) {
                    return 1;
                } else {
                    return 0;
                }
            })
        });
    } catch (e) {
        console.log("execute exitsUsers()");
    }


}

function buttonOkReports() {
    $('#ModalReportsOption').modal('hide');
    if ($('.check_report1').is(':checked')) {
        updateCheckModalReports("2402", "1");
    } else {
        updateCheckModalReports("2402", "0");
    }
    if ($('.check_report2').is(':checked')) {
        updateCheckModalReports("2403", "1");
    } else {
        updateCheckModalReports("2403", "0");
    }
    if ($('.check_report3').is(':checked')) {
        updateCheckModalReports("2404", "1");
    } else {
        updateCheckModalReports("2404", "0");
    }
    if ($('.check_report4').is(':checked')) {
        updateCheckModalReports("2405", "1");
    } else {
        updateCheckModalReports("2405", "0");
    }
    if ($('.check_report5').is(':checked')) {
        updateCheckModalReports("2406", "1");
    } else {
        updateCheckModalReports("2406", "0");
    }
    if ($('.check_report6').is(':checked')) {
        updateCheckModalReports("2407", "1");
    } else {
        updateCheckModalReports("2407", "0");
    }

    //updateHideReports();
    selectReports();
}

function updateCheckModalReports(report, active) {
    try {
        var query1 = "UPDATE " + TABLE_REPORTS + " SET " + KEY_ACTIVO + "='" + active + "' WHERE " + KEY_REPORT + "='" + report + "'";
        localDB.transaction(function (transaction) {
            transaction.executeSql(query1, [], function (transaction, results) {

            });
        }, errorHandler);
    } catch (e) {
        console.log("error: " + e);
    }
}


//pinta los reportes en el menu.html
function selectReports() {
    var query2 = "SELECT " + KEY_REPORT + " , " + KEY_ACTIVO + " FROM " + TABLE_REPORTS;
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query2, [], function (transaction, results) {
                var report = "";
                var save = "";
                var activo = "";
                $('.menu').empty();
                for (var i = 0; i < results.rows.length; i++) {
                    report = results.rows.item(i).report;
                    activo = results.rows.item(i).activo;
                    if (activo == 1) {
                        save = "";
                    } else {
                        save = "hide";
                    }
                    if (current_lang == 'es') {

                        if (report == 2402) {
                            $('.menu').append(
                                    "<button class ='item report1 " + save + "' onclick ='openReport1();'>" +
                                    "<span class ='box' >" +
                                    "<span class ='iconReport'> </span>" +
                                    "<span id ='lblgvst' class ='item_title'>Metas vs Ventas</span>" +
                                    "<span id ='lblgvsd'  class ='item_subtitle'>Compare sus metas vs ventas en tiempo real</span>" +
                                    "</span>" +
                                    "</button>"
                                    );
                        }
                        if (report == 2403) {
                            $('.menu').append(
                                    "<button class ='item report2 " + save + "' onclick ='openReport2();'>" +
                                    "<span class ='box' >" +
                                    "<span class ='iconReport'> </span>" +
                                    "<span id ='lblgvst' class ='item_title'>Clasificación por Tienda</span>" +
                                    "<span id ='lblgvsd'  class ='item_subtitle'>Clasificación personalizado por Tienda</span>" +
                                    "</span>" +
                                    "</button>"
                                    );
                        }
                        if (report == 2404) {
                            $('.menu').append(
                                    "<button class ='item report3 " + save + "' onclick ='openReport3();'>" +
                                    "<span class ='box' >" +
                                    "<span class ='iconReport'> </span>" +
                                    "<span id ='lblgvst' class ='item_title'>Progreso en % por tienda</span>" +
                                    "<span id ='lblgvsd'  class ='item_subtitle'>El progreso de ventas por tienda</span>" +
                                    "</span>" +
                                    "</button>"
                                    );
                        }
                        if (report == 2405) {
                            $('.menu').append(
                                    "<button class ='item report4 " + save + "' onclick ='openReport4();' data-value='report4'>" +
                                    "<span class ='box' >" +
                                    "<span class ='iconReport'> </span>" +
                                    "<span id ='lblgvst' class ='item_title'>Gráfico Avanzado</span>" +
                                    "<span id ='lblgvsd'  class ='item_subtitle'>Visualiza ventas, metas y punto de equilibrio graficamente</span>" +
                                    "</span>" +
                                    "</button>"
                                    );
                        }
                        if (report == 2406) {
                            $('.menu').append(
                                    "<button class ='item report5 " + save + "' onclick ='openReport5();' data-value='report5'>" +
                                    "<span class ='box' >" +
                                    "<span class ='iconReport'> </span>" +
                                    "<span id ='lblgvst' class ='item_title'>Alcance de Meta</span>" +
                                    "<span id ='lblgvsd'  class ='item_subtitle'>Mira y compara el progreso de venta por empleado</span>" +
                                    "</span>" +
                                    "</button>"
                                    );
                        }
                        if (report == 2407) {
                            $('.menu').append(
                                    "<button class ='item report5 " + save + "' onclick ='openReport6();' data-value='report6'>" +
                                    "<span class ='box' >" +
                                    "<span class ='iconReport'> </span>" +
                                    "<span id ='lblgvst' class ='item_title'>Sales Advanced By Store</span>" +
                                    "<span id ='lblgvsd'  class ='item_subtitle'>Sales Advanced By Store</span>" +
                                    "</span>" +
                                    "</button>"
                                    );
                        }
                    } else {

                        if (report == 2402) {
                            $('.menu').append(
                                    "<button class ='item report1 " + save + "' onclick ='openReport1();'>" +
                                    "<span class ='box' >" +
                                    "<span class ='iconReport'> </span>" +
                                    "<span id ='lblgvst' class ='item_title'>Goal VS Sales</span>" +
                                    "<span id ='lblgvsd'  class ='item_subtitle'>Compare your Goals vs Sales in real time</span>" +
                                    "</span>" +
                                    "</button>"
                                    );
                        }
                        if (report == 2403) {
                            $('.menu').append(
                                    "<button class ='item report2 " + save + "' onclick ='openReport2();'>" +
                                    "<span class ='box' >" +
                                    "<span class ='iconReport'> </span>" +
                                    "<span id ='lblgvst' class ='item_title'>Store Clasification</span>" +
                                    "<span id ='lblgvsd'  class ='item_subtitle'>Custom Clasification by store</span>" +
                                    "</span>" +
                                    "</button>"
                                    );
                        }
                        if (report == 2404) {
                            $('.menu').append(
                                    "<button class ='item report3 " + save + "' onclick ='openReport3();'>" +
                                    "<span class ='box' >" +
                                    "<span class ='iconReport'> </span>" +
                                    "<span id ='lblgvst' class ='item_title'>% Progress By Store</span>" +
                                    "<span id ='lblgvsd'  class ='item_subtitle'>Compare your Goals vs Sales in real time</span>" +
                                    "</span>" +
                                    "</button>"
                                    );
                        }
                        if (report == 2405) {
                            $('.menu').append(
                                    "<button class ='item report4 " + save + "' onclick ='openReport4();' data-value='report4'>" +
                                    "<span class ='box' >" +
                                    "<span class ='iconReport'> </span>" +
                                    "<span id ='lblgvst' class ='item_title'>Advance Graphic</span>" +
                                    "<span id ='lblgvsd'  class ='item_subtitle'>Compare your Goals vs Sales in real time</span>" +
                                    "</span>" +
                                    "</button>"
                                    );
                        }
                        if (report == 2406) {
                            $('.menu').append(
                                    "<button class ='item report5 " + save + "' onclick ='openReport5();' data-value='report5'>" +
                                    "<span class ='box' >" +
                                    "<span class ='iconReport'> </span>" +
                                    "<span id ='lblgvst' class ='item_title'>Goal Scope By Clerk</span>" +
                                    "<span id ='lblgvsd'  class ='item_subtitle'>Compare your Goals vs Sales in real time</span>" +
                                    "</span>" +
                                    "</button>"
                                    );
                        }
                        if (report == 2407) {
                            $('.menu').append(
                                    "<button class ='item report6 " + save + "' onclick ='openReport6();' data-value='report6'>" +
                                    "<span class ='box' >" +
                                    "<span class ='iconReport'> </span>" +
                                    "<span id ='lblgvst' class ='item_title'>Sales Advanced By Store</span>" +
                                    "<span id ='lblgvsd'  class ='item_subtitle'>Sales Advanced By Store</span>" +
                                    "</span>" +
                                    "</button>"
                                    );
                        }

                    }
                }
                highlightButtons();
            });
        });

    } catch (e) {
        console.log(e);
    }
}

//dialog_report4
function showDialogStore() {
    $("#show_modalStore").modal();
    existDataStore();
    //focusToactiveStore();
}

function existDataStore() {
    var query = "SELECT COUNT(*) AS urlBase FROM " + TABLE_STORE;
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [], function (transaction, results) {
                url = results.rows.item(0).urlBase;
                if (url > 0) {
                    downloadAllStore2();
                } else {
                    downloadAllStore();
                }
            }, function (transaction, error) {
                console.log("Error: " + error.code + "<br>Mensage: " + error.message);
            });
        });
    } catch (e) {
        console.log("Error existsData " + e + ".");
    }
}

function downloadAllStore2() {
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
                            showLoading4();
                        },
                        complete: function () {
                            hideLoading4();
                        },
                        success: function (data) {

                            if (data.successful > 0) {
                                var StoreName;
                                var StoreNo;
                                var show = "";
                                $('.list_r4').empty();
                                $(data.report).each(function (index, value) {
                                    StoreNo = value.StoreNo;
                                    StoreName = value.StoreName;
                                    if (StoreNo == StoreNoT) {
                                        show += "<h1 class='storeName-" + StoreNo + " active' data-value='" + StoreName + "'  onclick=setStoreNo('" + StoreNo + "');>" + StoreName + "</h1>";
                                    } else {
                                        show += "<h1 class='storeName-" + StoreNo + "' data-value='" + StoreName + "'  onclick=setStoreNo('" + StoreNo + "');>" + StoreName + "</h1>";
                                    }
                                });
                                $('.list_r4').append(show);
                            }
                        }, error: function (xhr, ajaxOptions, thrownError) {
                            console.log(xhr.status);
                            console.log(xhr.statusText);
                            console.log(xhr.responseText);
                            //hideLoading();
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
                    showLoading4();
                },
                complete: function () {
                    hideLoading4();
                },
                success: function (data, textStatus, XMLHttpRequest) {
                    if (data.successful > 0) {
                        var StoreName;
                        var StoreNo;
                        var use = 1;
                        var show = "";
                        $('.list_r4').empty();
                        $(data.report).each(function (index, value) {
                            StoreName = value.StoreName;
                            StoreNo = value.StoreNo;
                            if (index == 0) {
                                insertTableStore(StoreNo, StoreName, '1');
                                show += "<h1 class='storeName-" + StoreNo + " active' data-value='" + StoreName + "' onclick=setStoreNo('" + StoreNo + "');>" + StoreName + "</h1>";
                            } else {
                                show += "<h1 class='storeName-" + StoreNo + "' data-value='" + StoreName + "'  onclick=setStoreNo('" + StoreNo + "');>" + StoreName + "</h1>";
                            }

                        });
                        $('.list_r4').append(show);

                    }

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(xhr.statusText);
                    console.log(xhr.responseText);
                    //hideLoading();
                    if (current_lang == 'es')
                        mostrarModalGeneral("Error de Conexión");
                    else
                        mostrarModalGeneral("No Connection");

                }
            });

        });
    });

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

function setStoreNo(storeNo) {
    $('.list_store h1').removeClass('active');
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
//acaba function del reporte4

function showLoading5() {
    $('#show_modalStore5 .list_r5').append(loading); // agrega el cargando <div class="loader-ios"... con toda la animacion del cargando
    $('#show_modalStore5 .list_r5').css('background', 'rgba(0,0,0,0.23)');
    $('#show_modalStore5 #btnStore').attr('disabled', 'disabled');
}

function showLoading4() {
    $('#show_modalStore .list_r4').append(loading); // agrega el cargando <div class="loader-ios"... con toda la animacion del cargando
    $('#show_modalStore .list_r4').css('background', 'rgba(0,0,0,0.23)');
    $('#show_modalStore #btnStore').attr('disabled', 'disabled');
}

function hideLoading5() {
//    setTimeout(function () {
    $('#show_modalStore5 .loader-ios').remove();
    $('#show_modalStore5 .list_r5').css('background', 'rgba(0,0,0,0)');
    $('#show_modalStore5 .list_r5 h1').removeClass('hide');
    $('#show_modalStore5 #btnStore').removeAttr('disabled');

    setTimeout(function () {
        focusToactiveStore5();
    }, 500);

//    }, 3200);
}
function hideLoading4() {
//    setTimeout(function () {
    $('#show_modalStore .loader-ios').remove();
    $('#show_modalStore .list_r4').css('background', 'rgba(0,0,0,0)');
    $('#show_modalStore .list_r4 h1').removeClass('hide');
    $('#show_modalStore #btnStore').removeAttr('disabled');

    setTimeout(function () {
        focusToactiveStore4();
    }, 500);

//    }, 3200);
}





//incia function del report5
function showDialogStore5() {
    $("#show_modalStore5").modal();
    existDataStore_report5();
    //focusToactiveStore();
}

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
                                $(".list_r5").empty();
                                $(data.report).each(function (index, value) {
                                    StoreNo = value.StoreNo;
                                    StoreName = value.StoreName;
                                    if (StoreNo == StoreNoT) {
                                        show += "<h1 class='storeName-" + StoreNo + " active' data-value='" + StoreName + "'  onclick=setStoreNo('" + StoreNo + "');>" + StoreName + "</h1>";
                                    } else {
                                        show += "<h1 class='storeName-" + StoreNo + "' data-value='" + StoreName + "'  onclick=setStoreNo('" + StoreNo + "');>" + StoreName + "</h1>";
                                    }
                                });
                                $('.list_r5').append(show);
                                //focusToactiveStore5();
                            }
                            
                        }, error: function (xhr, ajaxOptions, thrownError) {
                            console.log(xhr.status);
                            console.log(xhr.statusText);
                            console.log(xhr.responseText);
                            //hideLoading();
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
                        $(".list_r5").empty();
                        $(data.report).each(function (index, value) {
                            StoreNo = value.StoreNo;
                            StoreName = value.StoreName;
                            if (index == 0) {
                                insertTableStore(StoreNo, StoreName, '1');
                                show += "<h1 class='storeName-" + StoreNo + " active' data-value='" + StoreName + "'  onclick=setStoreNo('" + StoreNo + "');>" + StoreName + "</h1>";
                            } else {
                                show += "<h1 class='storeName-" + StoreNo + "' data-value='" + StoreName + "'  onclick=setStoreNo('" + StoreNo + "');>" + StoreName + "</h1>";
                            }
                        });
                        $('.list_r5').append(show);
                    }//modal no hay data
                }, error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(xhr.statusText);
                    console.log(xhr.responseText);
                    //hideLoading();
                    if (current_lang == 'es')
                        mostrarModalGeneral("Error de Conexión");
                    else
                        mostrarModalGeneral("No Connection");
                }
            });
        });
    });
}




//acaba function report 5


//focus para el modal 4
function focusToactiveStore4() {

    var list4 = $('.list_r4');

    list4.animate({
        scrollTop: $('.list_r4 .active').offset().top - list4.offset().top + list4.scrollTop()
    });
}

//focus para el modal 5 
function focusToactiveStore5() {
    
     var list5 = $('.list_r5');

    list5.animate({
        scrollTop: $('.list_r5 .active').offset().top - list5.offset().top + list5.scrollTop()
    });
    

    
}






//function para lo del Login()
function verific(){
    var query="SELECT * FROM "+TABLE_URL;
    localDB.transaction(function (tx) {
        tx.executeSql(query, [], function (tx, results) {
            if(results.rows.length>0){
            $('.arrow.white').addClass('hide');
            }
        });
    });
}


function deteclenguage() {
    lang = navigator.language.split("-");
    current_lang = (lang[0]);
    localStorage.lang = current_lang;
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

        MSGS_SIGNOUT();


        //Modal Menu
        MSG_LBL_CHANGE_ALIAS_T();
        MSG_LBL_CHANGE_ALIAS_BUTTON();
        MSG_LBL_CHANGE_ALIAS_CONFIRM();
        MSG_LBL_CHANGE_ALIAS_CONFIRM_SI();
        MSG_LBL_DELETE_SERVER_MESSAGE();
        MSG_LBL_CHANGE_ALIAS_SETTINGS();
        MSG_LBL_CHANGE_ALIAS_SERVERS();
        MSG_LBL_CHANGE_ALIAS_HIDE_SHOW_REPORTS_T();
        MSG_LBL_CHANGE_ALIAS_HIDE_SHOW_REPORTS();
        MSG_LBL_CHANGE_ALIAS_CLOSE();

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
        MSG_DICTIONARY();
        /***************************************/
        MSGS_TEXT_OPTIONS();
        // Last Connection
        LBL_LAST_CONNECTION();
    }
}