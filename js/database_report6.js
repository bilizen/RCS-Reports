$(document).ready(function(){

	$('.value').click(function(){
		$('.item span').text($(this).find(':first-child').text());
	});

});
// end DOM


function showDialogStore() {
    $("#show_modalStore").modal();    
}