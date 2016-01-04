$(document).ready(function () {

    var input_val = "";


    $('.input_effect input').focusin(function () {
        input_val = $(this).val();
        if (input_val == "") {
            $(this).closest('.input_effect').addClass('focus');
            // alert("1");
        }
    }).keyup(function () {
        input_val = $(this).val();
        if (input_val == "") {
            // $(this).closest('.input_effect').removeClass('focus');
        } else {
            $(this).closest('.input_effect').addClass('focus');
        }
    }).change(function () {
        input_val = $(this).val();
        if (input_val == "") {
            $(this).closest('.input_effect').removeClass('focus');
        } else {
            $(this).closest('.input_effect').addClass('focus');
        }
    }).focusout(function () {
        input_val = $(this).val();
        if (input_val == "") {
            $(this).closest('.input_effect').removeClass('focus');
        }
    })

    $('.input_effect').each(function () {
        if ($(this).find("input").val() != "") {
            $(this).addClass('focus');
        }
    });

    $('#clasRange1').keyup(function () {
        var changeinput = $(this).val();
        console.log(changeinput);
        $('.clasRange1').val(changeinput);
    });
    $('#clasRange2').keyup(function () {
        var changeinput = $(this).val();
        console.log(changeinput);
        $('.clasRange2').val(changeinput);
    });
    $('#clasRange3').keyup(function () {
        var changeinput = $(this).val();
        console.log(changeinput);
        $('.clasRange3').val(changeinput);
    });
    $('#clasRange4').keyup(function () {
        var changeinput = $(this).val();
        console.log(changeinput);
        $('.clasRange4').val(changeinput);
    });
    $('#clasRange5').keyup(function () {
        var changeinput = $(this).val();
        console.log(changeinput);
        $('.clasRange5').val(changeinput);
    });
    $('#clasRange6').keyup(function () {
        var changeinput = $(this).val();
        console.log(changeinput);
        $('.clasRange6').val(changeinput);
    });

    $('#miModal4').css("margin-top", Math.max(0, ($(window).height() - 58 - $('#miModal4').find('.modal-dialog').height()) / 4));


    // Centrado de los modelos al centro de la pantalla
    $(function () {
        function reposition() {
            var modal = $(this),
                    dialog = modal.find('.modal-dialog');
            modal.css('display', 'block');
            dialog.css("margin-top", Math.max(0, ($(window).height() - 58 - dialog.height()) / 2));
        }
        // Reposition when a modal is shown
        $('.modal').on('show.bs.modal', reposition);
        // Reposition when the window is resized
        $(window).on('resize', function () {
            $('.modal:visible').each(reposition);
        });
    });


    //topBar: verificar que salga en todas las pantallas excepto el index

    var html = document.location.pathname.match(/[^\/]+$/)[0];

    if (html == "index.html") {
        $('.options_bar_space').css('opacity', '0');
    }
    if (html == "login.html") {
        $('.options_bar_space').css('opacity', '1');
    }

    $('.visualization').hide();
    $('.general').hide();
    $('.date').hide();
    $('.region').hide();


    $('#btnno').click(function () {
        $('#show_alias').css('z-index', '1031');
    });

    $('#btnnodelete').click(function () {
        $('#show_alias').css('z-index', '1031');
    });

    $('#btnsidelete').click(function () {
        $('#show_alias').css('z-index', '1031');
    });


    //Responsive menu
    $('.menu').height($(window).height() - $('header').height());
    $(window).resize(function () {
        $('.menu').height($(window).height() - $('header').height());
    });

    //Responsive  Report 4
    $('#chartdiv').height($(window).height() - $('header').height());
    $(window).resize(function () {
        $('#chartdiv').height($(window).height() - $('header').height());
    });

});


function moveToLeft(valor) {
    if (valor == 1) {
        $('.visualization').hide();
        $('.general').show();
        $('.date').hide();
        $('.region').hide();
    } else {
        if (valor == 2) {
            $('.visualization').hide();
            $('.general').hide();
            $('.date').show();
            $('.region').hide();
        } else {
            if (valor == 3) {
                $('.visualization').show();
                $('.general').hide();
                $('.date').hide();
                $('.region').hide();
            } else { //valor 4
                $('.visualization').hide();
                $('.general').hide();
                $('.date').hide();
                $('.region').show();
            }
        }
    }
    $('#ios8_container').addClass('ocultar_atras');
    $('#ios8_container').removeClass('mostrar_adelante');

    $('#floatWindow').addClass('mostrar');
    $('#floatWindow').removeClass('ocultar');

    return false;
}
function moveToRight() {
    $('#ios8_container').addClass('mostrar_adelante');
    $('#ios8_container').removeClass('ocultar_atras');

    $('#floatWindow').addClass('ocultar');
    $('#floatWindow').removeClass('mostrar');
    return false;
}

var modalInfo = $('#dinamicContent .modal-body').html();


function showCalendar(valor) {
    var dateStart = $('#dateStart').text();
    var dateEnd = $('#dateEnd').text();
    var dateToCompare = $('#dateToCompare').text();
    $('#dinamicContent .modal-body').empty();
    if (valor == 1) {
        $('#dinamicContent .modal-body').html('<div id="calendarDateStart"></div>');
        $("#calendarDateStart").datepicker({
            defaultDate: dateStart,
            changeMonth: false,
            numberOfMonths: 1,
            dateFormat: "dd-mm-yy",
            onSelect: function (dateText, inst) {
               $('#dateStart').text(dateText);
            },
            onClose: function (selectedDate) {
                $("#calendarDateEnd").datepicker("option", "minDate", selectedDate);
            }
        });
    } else {
        if (valor == 2) {
            $('#dinamicContent .modal-body').html('<div id="calendarDateEnd"></div>');

            $("#calendarDateEnd").datepicker({
                defaultDate: dateEnd,
                changeMonth: false,
                numberOfMonths: 1,
                dateFormat: "dd-mm-yy",
                onSelect: function (dateText, inst) {
                   $('#dateEnd').text(dateText);
                },
                onClose: function (selectedDate) {
                    $("#calendarDateStart").datepicker("option", "maxDate", selectedDate);
                }

            });

        } else {
            if (valor == 3) {
                $('#dinamicContent .modal-body').html('<div id="calendarDateToCompare"></div>');

                $("#calendarDateToCompare").datepicker({
                    defaultDate: dateToCompare,
                    changeMonth: false,
                    numberOfMonths: 1,
                    dateFormat: "dd-mm-yy",
                    onSelect: function (dateText, inst) {
                        $('#dateToCompare').text(dateText);
                    }
                });
            } else {
                $('#dinamicContent .modal-body').html(modalInfo);
            }
        }
    }
    return false;
}





//Go to Menu
function goBack() {
    window.location.href = "menu.html";
}
//Go to Index
function goIndex() {
    window.location.href = "../index.html";
}

//animations
$('.menu button').each(function (index, value) {

    // $(value).children().css({'opacity':0}); 

    setTimeout(function () {

        $(value).children().addClass('translateX');

    }, 100 + (index * 125));

});

$(window).load(function () {
    $(".indexSection").center(true);
});
$(window).resize(function () {
    $(".indexSection").center(true);
});
jQuery.fn.center = function (parent) {
    if (parent) {
        parent = this.parent();
    } else {
        parent = window;
    }
    this.css({
        "position": "absolute",
        "top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() - $('header').height() + "px"),
        "left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
    });
    return this;
}