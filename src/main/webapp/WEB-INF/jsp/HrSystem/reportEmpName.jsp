<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="f"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>


<!-- Variable -->
<jsp:include page="springMessageVariable.jsp"></jsp:include>

<!-- Custom Script -->
<script>
	$(document).ready(function (){
		$("#report-btn").addClass("active-menu");
		$("#reportEmpName-tap").addClass("active-menu");
	});
</script>

<!-- Pade-Header -->
<div class="row">
	<div class="col-sm-12">
		<div class="page-header">
	  		<h1><strong><spring:message code="report.empName" /></strong></h1>
		</div>
	</div>
</div>
<f:form method="post" id="reportForm" name="reportForm" target="_blank" commandName="employee" action="${pageContext.request.contextPath}/employee/searchReportEmpName" cssClass="form-horizontal">

	 <div class="modal-body">
	 <div class="form-group form-group-sm">
		 	<div class="col-sm-3">
		 	<h4 class="modal-title"><spring:message code="report.empName" /></h4>
		 	</div>
		 </div>
        <div class="form-group form-group-sm">
        	<div class="col-sm-3">
        	<spring:message code="report.searchEmpName" />
        		${ searchfor }${ entity }
        	</div>
        	<div class="col-sm-6">
        		<f:input id="searchText" path="name" cssClass="form-control" placeholder="${ searchfor }${ entity }"/>
        	</div>
        </div>
        
         <div class="form-group form-group-sm">
        	<div class="col-sm-3">
        	<spring:message code="label.doctype" />
        	</div>
        	<div class="col-sm-6" id="reportType">
        		<label class="radio-inline"><f:radiobutton path="reportType" value="pdf" name="reportType"/>Pdf</label>
				<label class="radio-inline"><f:radiobutton path="reportType" value="xls" name="reportType"/>Xls</label>
        	</div>
        </div>
        
        
       <div>  
        <f:form id ="listTable" method="post" commandName="employee" class="form-horizontal" action="employee">		
			<div class="row">
				<!-- <h2 class="col-md-6">Report</h2>	 -->			
				<br>
				<div class="col-md-6" align="right">		
	
				<br>
				<br>
			</div>
			</div>	
		<div>
				<table id="tdResult" class="dataTable stripe table-bordered" class="form-group">
				<caption title=""><spring:message code="report.empName" /></caption>
					<thead>	
						<tr>								
							<th><spring:message code="report.resourceId" /></th>
							<th><spring:message code="report.DateStartWork" /></th>
							<th><spring:message code="report.durationYear" /></th>
							<th><spring:message code="report.durationMonth" /></th>
							<th><spring:message code="report.durationDay" /></th>
							<th><spring:message code="employee.dateOfBirth" /></th>
							<th><spring:message code="report.ageYear" /></th>
							<th><spring:message code="report.ageMonth" /></th>
							<th><spring:message code="report.ageDay" /></th>
							<th><spring:message code="report.nameTh" /></th>
							<th><spring:message code="report.nameEn" /></th>
							<th><spring:message code="employee.nicknameEng" /></th>
							<th><spring:message code="employee.telMobile" /></th>
							<th><spring:message code="employee.email" /></th>
							<th><spring:message code="report.type" /></th>
							<th><spring:message code="report.position" /></th>
							<th><spring:message code="report.skill" /></th>
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

<script src="<c:url value ="/static/resources/pageJS/reportEmpName.js"/>"></script> 