$(function(){
	var $errMessage = $('#message');
	var $formGroup = $('.form-group');
	
	
	if ( $errMessage.children().length > 0 ) {
		$formGroup.addClass('has-error');
	} else {
		$formGroup.removeClass('has-error');
	}
});	