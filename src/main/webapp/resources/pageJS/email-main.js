$(function(){
	var $parentNew = $("#email-appointment-new-parent");
	var $parentUpdate = $("#email-appointment-update-parent");
	var $emailAppointmentNew = $("#email-appointment-new");
	var $emailAppointmentUpdate = $("#email-appointment-update");
	var $btnEmail = $("#btn_email");
	var $badge = $("#email-badge");
	
	var newAppointment = 0;
	var updateAppointment = 0;
	
	$btnEmail.tooltip();

	$.ajax({
		url: contextPath + "/email/find/waitAppointment",
		type: "GET",
		success: function(data) {
			if (!data) {
				removeNotification($parentNew, $emailAppointmentNew);
			} else {
				var result = "";
				$.each(data, function(index, value) {					
					result += '<li class="email-notififation-li"><a href="#" class="new-email" data-id="' + value.id + '">' + value.topic + '</a></li>';
					newAppointment++;
				});
				setNotification($parentNew, $emailAppointmentNew);
				$emailAppointmentNew.empty().append(result);
			}
			setBtnEmail($badge, newAppointment + updateAppointment);
		},
		error: function() {
			alert("error find new appoinment");
		}
	});

	$.ajax({
		url: contextPath + "/email/find/updateAppointment",
		type: "GET",
		success: function(data) {
			if (!data) {
				removeNotification($parentUpdate, $emailAppointmentUpdate);
			} else {
				var result = "";
				$.each(data, function(index, value) {
					result += '<li class="email-notififation-li"><a href="#" class="update-email" data-id="' + value.id + '">' + value.topic + '</a></li>';
					updateAppointment++;
				});
				setNotification($parentUpdate, $emailAppointmentUpdate);
				$emailAppointmentUpdate.empty().append(result);
			}
			setBtnEmail($badge, newAppointment + updateAppointment);
		},
		error: function() {
			alert("error find update appoinment");
		}
	});
	
	$emailAppointmentNew.off().on("click", ".new-email", function(){
		window.location.replace(contextPath + "/email/write/appointment/" + $(this).data("id"));
	});
	
	$emailAppointmentUpdate.off().on("click", ".update-email", function(){
		window.location.replace(contextPath + "/email/write/appointment/" + $(this).data("id"));
	});
});

function setBtnEmail(badge, flag) {
	if (flag != 0) {
		badge.empty().append('<i class="fa fa-bell faa-ring animated fa-1x"></i>&nbsp;' + flag);
		$("#btn_email").tooltip();
	} else {
		badge.empty();
		$("#btn_email").tooltip("destroy");
	}
}

function setNotification(parent, appointment) {
	
	parent.removeClass("disabled");
	parent.addClass("email-notification");	
	appointment.addClass("dropdown-menu");
	appointment.addClass("email-notification");
}

function removeNotification(parent, appointment) {
	
	parent.addClass("disabled");
	parent.removeClass("email-notification");
	appointment.removeClass("dropdown-menu");
	appointment.removeClass("email-notification");
}