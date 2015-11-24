
$(document).ready(function () {
	var dt=$("#tdResult").dataTable({
			searching : false,
			paging: true,
			bLengthChange: false,
			sort : false
	});
	
	
	if($('.dataTables_empty').length > 0){
		document.getElementById("btn_print").disabled = true;
	}
	
	$('#reportForm').bootstrapValidator({
		message: 'This value is not valid',
		 feedbackIcons: {
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {
	        	reportType: {
	                validators: {
	                    notEmpty: {
	                        message: $requiredreportType
	                    }
	        
	                }
	            }
	        }
		
	});
	
	//Search By Position and Show function 
	$('#btn_search').on('click', function(){
		var searchText = $("#searchText").val();
		if(searchText === ""||searchText==null){
			searchText = "forEmptySearch";
		}
		$.ajax({
			url : $getContextPath+"/employee/searchCode/"+searchText,
			type : "POST",
			success : function(data) {
			dt.fnClearTable();
			for (var i=0;i< data.length; i++) {
				dt.fnAddData([data[i].employeeCode,data[i].startWorkDate,data[i].dateOfBirth,
				              data[i].nameThai,data[i].nameEng,
				              data[i].employmentName,data[i].divisionName,
				              data[i].technologyName
					]);
		 
				}
			
			if($('.dataTables_empty').length == 0){
				document.getElementById("btn_print").disabled = false;
			}
			},
			error : function(data,testStatus,jqXHR) {
				$("#outputajax").text(testStatus);
				}
			});
	});
	
	
	
	$('#btn_print').on('click', function(){
		$('#reportForm').bootstrapValidator();
		$('#reportForm').data('bootstrapValidator').validate();
		if($('#reportForm').data('bootstrapValidator').isValid()){
			$("#reportForm").get(0).submit();
		}
/* 		var searchText = $("#searchText").val();
		if(searchText == ""){
			searchText = "forEmptySearch";
		}
  		$.ajax({
		url : $getContextPath+"/employee/searchReportEmpName/"+searchText,
		type : "POST",
		success : function(data) {
			
		},
		error : function(data,testStatus,jqXHR) {
			$("#outputajax").text(testStatus);
			}
		}); */
	}); 
	
});
	
