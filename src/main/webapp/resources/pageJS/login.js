$(function(){
	var $errMessage = $('#message');
	var $formGroup = $('.form-group');
	var $receiver = $('#receiver');
	
	if ( $errMessage.children().length > 0 ) {
		$formGroup.addClass('has-error');
	} else {
		$formGroup.removeClass('has-error');
	}
	
	$('#sendBtn').on('click', function(){
		//alert($receiver.val());
		var sending = { 
				"email" : $receiver.val()
		};
		
		$.ajax({
			url : pageContext + "/login/sendemail",
			type : "POST",
			dataType : 'json',
			contentType : 'application/json',
			data : JSON.stringify(sending),
			success : function(data){ 
				if(data.id){
					$('#pwdModal').modal("hide");
					$('#receiver').val('');
				} else {
					alert(data);
				}
			},
			error : function(data){
				console.log("error"+ JSON.stringify(data));
				alert("error");
			}
			
		});
	});
	
	
});	