$(function(){
	$("#career-case-page").addClass('active-menu');
	
	//	create aupucomplete of masSpecialties
	$('#masSpecialties').tagsinput({
	  typeahead: {
	    source: specialties
	  },
	  itemValue: 'id',
	  itemText: 'name'
	});
	
	$('.bootstrap-tagsinput').addClass('form-control');
	
	$('#startDate').datetimepicker();
	$('#endDate').datetimepicker();
	$('#expectedDate').datetimepicker();
	
	$('#modal-insert').on('hidden.bs.modal', function () {
		$('#modal-form').trigger('reset');
	});
	
	var $table = $('#table').DataTable({
//		searching : true,
//   	 	paging: 10,
//   	 	sort : true,
//   	 	ajax: contextPath + 'api/careecases',
   	 	
	});
	
	
//	$.each( specialties, function( key, value ) {
//		alert( key + ": " + value.name );
//	});
	
	//console.log(JSON.stringify(specialties));
});