<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="f"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>


<!-- <div class="modal-header"> -->
<%-- 	<h4 class="modal-title"><spring:message code="reportleave.empName" /></h4> --%>
<!-- </div> -->

<script>
	$(document).ready(function (){
		$("#report-btn").addClass("active-menu");
		$("#reportLeave-tap").addClass( "active-menu" );
	});

</script>

<f:form method="post" id="reportForm" name="reportForm" target="_blank" commandName="applicant" action="${pageContext.request.contextPath}/employee/searchReportEmpLeave" cssClass="form-horizontal">

	 <div class="modal-body">
	 <div class="form-group form-group-sm">
		 	<div class="col-sm-3">
		 	<h4 class="modal-title"><spring:message code="reportleave.empName" /></h4>
		 	</div>
		 </div>
        <div class="form-group form-group-sm">
        	<div class="col-sm-3">
        	<spring:message code="reportleave.searchEmpName" />
        		${ searchfor }${ entity }
        	</div>
        	<div class="col-sm-6">
        		<f:input id="searchText" path="firstNameEN" cssClass="form-control" placeholder="${ searchfor }${ entity }"/>
        	</div>
        </div>
        
         <div class="form-group form-group-sm">
        	<div class="col-sm-3">
        	<spring:message code="label.doctype" />
        	</div>
        	<%-- <div class="col-sm-6" >
        		<label class="radio-inline"><f:radiobutton  path="reportType" value="pdf"/>Pdf</label>
				<label class="radio-inline"><f:radiobutton path="reportType" value="xls"/>Xls</label>
        	</div> --%>
        	<div class="col-sm-6" id="reportType">
        		<label class="radio-inline"><f:radiobutton path="reportType" value="pdf" name="reportType"/>Pdf</label>
				<label class="radio-inline"><f:radiobutton path="reportType" value="xls" name="reportType"/>Xls</label>
        	</div>
        </div>
        
        
       <div>  
        <f:form id ="listTable" method="post" commandName="applicant" class="form-horizontal" action="employee">		
			<div class="row">
				<!-- <h2 class="col-md-6">Report</h2>	 -->			
				<br>
				<div class="col-md-6" align="right">		
	
				<br>
				<br>
			</div>
			</div>	
		<div>
				<table id="tbResult" class="dataTable stripe table-bordered" class="form-group">
				<caption title=""><spring:message code="reportleave.empName" /></caption>
					<thead>	
						<tr>								
											
							<th><spring:message code="reportleave.resource" /></th>
							<!-- <th>Date Start Work</th> -->
							<%-- <th><spring:message code="report.nameTh" /></th> --%>
							<th><spring:message code="report.nameEn" /></th>
							<th><spring:message code="report.lastEn" /></th>
							<th><spring:message code="reportleave.annuallaeve" /></th>
							<th><spring:message code="reportleave.sickleave" /></th>
							<th><spring:message code="reportleave.personalleave" /></th>
							<th><spring:message code="reportleave.totalleave" /></th>
						</tr>
					</thead>		
				</table>
			</div>
		</f:form>
	</div>	
		

      	
      </div>

	<div class="modal-footer">	
		<button type="button" id ="btn_search" class="btn btn-default search" value="search"><spring:message code="label.search" /></button>
		<button type="button" id="btn_print" class="btn btn-default submit" value="print"><spring:message code="label.print" /></button>
		
	</div>
</f:form>

<script type="text/javascript">

$(document).ready(function () {
	var dt=$("#tbResult").dataTable({
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
			url : "${pageContext.request.contextPath}/employee/searchNameLeave/"+searchText,
			type : "POST",
			success : function(data) {
			dt.fnClearTable();
			for (var i=0;i< data.length; i++) {
				dt.fnAddData([data[i].employeeCode,
				             // data[i].startWorkDate,
				             // data[i].nameThai, 
				              data[i].nameEng, 
				              data[i].lastEng,
			                  data[i].dayAnnual,  
				              data[i].daySick,
				              data[i].dayPersonal,
				              data[i].totalDayLeave
				              
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
	
</script>