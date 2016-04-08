$(document).ready(function(){
     onInit();  

	$('.value').click(function(){
		$('.item span').text($(this).find(':first-child').text());
	});

});

$(window).load(function(){ 
    deteclenguage();             

});



function showDialogStore() {
    $("#show_modalStore").modal();    
}