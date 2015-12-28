$(function(){
	//set active bar
	$("#career-case-page").addClass('active-menu');
	
	//create auto-complete of masSpecialties
	$('#masSpecialties').tagsinput({
	  typeahead: {
	    source: specialties
	  },
	  itemValue: 'id',
	  itemText: 'name'
	});
	$('.bootstrap-tagsinput').addClass('form-control');

	//date pick
	$('#startDate').datetimepicker({
    format: 'YYYY-MM-DD'
	});
	$('#endDate').datetimepicker({
    format: 'YYYY-MM-DD'
	});
	$('#expectedDate').datetimepicker({
    format: 'YYYY-MM-DD'
	});
  $('#dateRequest').datetimepicker({
    format: 'YYYY-MM-DD'
  });

	//reset modal
	$('#modal-insert').on('hidden.bs.modal', function () {
		$('#modal-form').trigger('reset');
	});

	//create career case
	$('#btn-save').on('click', function(){

    var masSpecialtyInput = $('#masSpecialties').tagsinput('items');
		var masSpecialties = [];
		$.each(masSpecialtyInput, function( index, value ) {
			var specialty = { id: value.id };
			masSpecialties.push(specialty);
		});

		var careerCase = {
			client : { id: $('#client').val() },
			masDivision: { id: $('#masDivision').val() },
			masJobLevel: { id: $('#masJobLevel').val() },
			masCoreSkill: { id: $('#masCoreSkill').val() },
			masTechnology: { id: $('#masTechnology').val() },
      dateRequest: moment($('#dateRequest').val()),
			startDate: moment($('#startDate').val()),
			endDate: moment($('#endDate').val()),
			expectedDate: moment($('#expectedDate').val()),
			specialRequest: $('#specialRequest').val(),
			jobDescription: $('#jobDescription').val(),
			masSpecialties: masSpecialties
		}

    console.log(typeof careerCase.dateRequest);

    //$.ajax({
    //  url: contextPath + "/careercase/create",
    //  type: "POST",
    //  data: JSON.stringify(careerCase),
    //  contentType: "application/json; charset=utf-8",
    //  dataType: "json",
    //  success: function(data) {
    //    console.log(data);
    //  },
    //  error: function(data) {
    //    console.log("error");
    //  }
    //});

	});


});