$(document).ready(function () {
	var dt=$("#tdResult").dataTable({
		searching : false,
		paging: true,
		bLengthChange: false,
		sort : false,
		scrollX: true
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
	                        message: '<spring:message code="report.validate.reportType" />'
	                    }
	        
	                }
	            }
	        }
		
	});
	
	//Search By Position and Show function 
	$('#btn_search').on('click', function(){
		var searchText = $("#searchText").val();
		if(searchText == ""){
			searchText = "forEmptySearch";
		}
		$.ajax({
			url :  $getContextPath+"/employee/searchName/"+searchText,
			type : "POST",
			success : function(data) {
			dt.fnClearTable();
			for (var i=0;i< data.length; i++) {
				dt.fnAddData([data[i].employeeCode,data[i].startWorkDate,
				              data[i].yearStart,data[i].monthStart,data[i].dayStart,
				              data[i].dateOfBirth,
				              data[i].year,data[i].month,data[i].day,
				              data[i].nameThai,data[i].nameEng,data[i].nicknameEng,
				              data[i].telMobile,data[i].email,
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
	$('#btn_print').off("click").on('click', function(){
		$('#reportForm').bootstrapValidator();
		$('#reportForm').data('bootstrapValidator').validate();
		if($('#reportForm').data('bootstrapValidator').isValid()){
			//alert("print");
			$("#reportForm").get(0).submit();
		}
/* 		var searchText = $("#searchText").val();
		if(searchText == ""){
			searchText = "forEmptySearch";
		}
  		$.ajax({
		url : "${pageContext.request.contextPath}/employee/searchReportEmpName/"+searchText,
		type : "POST",
		success : function(data) {
			
		},
		error : function(data,testStatus,jqXHR) {
			$("#outputajax").text(testStatus);
			}
		}); */
	}); 
	
});
