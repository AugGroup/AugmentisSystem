<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="f"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>


<title><spring:message code="report.text" /></title>
<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/pageCss/mainReport.css"/>">
<script src="<c:url value ="/static/resources/pageJS/mainReport.js"/>"></script> 
<script type="text/javascript">
var datatablei18n = "<c:url value='/static/resources/dt-i18n/${pageContext.response.locale}.json' />";
$(document).ready(function(){
	/* $("#btn_report").addClass('active-menu');  */
	$("#report-dropdown").addClass('active-menu');
	$("#reportPage").addClass('active-menu'); 
});
</script>

<div class="container">
	<!-- page Header -->
	<div class="row">
		<div class="col-sm-12">
			<div class="page-header">
		  		<h1><strong><spring:message code="report.text" /></strong></h1>
			</div>
		</div>
	</div>
	
	<!-- search option -->
	<div class="row">
		<div class="col-sm-12" id="search-section">
			<input type="hidden" id="jobLevelId" name="jobLevelId">
			<input type="hidden" id="technologyId" name="technologyId">
			<f:form method="post" name="reportForm" target="_blank" commandName="searchReportDTO" action="${pageContext.request.contextPath}/report/preview" cssClass="form-inline">
				<div class="form-group">
					<label for="joblevel"><spring:message code="main.position1" /></label><br>
					<select name="joblevel" id="joblevel" class="form-control" >
					<option value="-1" label="---Select Joblevel---" />
						<c:forEach items="${jobLevels}" var="jobLevelList">
							<option value="${jobLevelList.id}">${jobLevelList.name}</option>
						</c:forEach>
					</select>
				</div>
				<div class="form-group">
					<label for="technology"><spring:message code="main.position2" /></label><br> 
					<select name="technology" id="technology" class="form-control">
					<option value="-1" label="---Select Technology---" />
						<c:forEach items="${technologies}" var="technologyList">
							<option value="${technologyList.id}">${technologyList.name}</option>
						</c:forEach>
					</select> 
				</div>
				<div class="form-group">
					<label for="masdegreetype"><spring:message code="education.degree"/></label><br>
	 				<select class="form-control" id="masdegreetype" name="masdegreetype">
						<option value="-1" label="---Select DegreeType---" />
						<c:forEach var="obj" items="${degreeTypes}">
							<option value="${obj.id}">${obj.name}</option>
						</c:forEach>
					</select>
				</div>
				<div class="form-group">
					<label for="major"><spring:message code="education.major" /></label>
					<input type="text" class="form-control" id="major" name="major" placeholder="<spring:message code="education.text.major"/>">
				</div>
				<div class="form-group">
					<label for="gpa"><spring:message code="education.gpa" /></label>
					<input type="text" class="form-control" maxlength="5" id="gpa" name="gpa" placeholder="0.00">
				</div>
				<div class="form-group">
					<label for="university"><spring:message code="report.text.school" /></label> 
					<input type="text" class="form-control" id="university" name="university" placeholder="<spring:message code="report.enter.school"/>">
				</div>
				
				
				<!-- preview pdf -->
				<input type="hidden" value="pdf" id="reportType" name="reportType" checked="checked">
				<!-- &nbsp;&nbsp;&nbsp; -->
				<!-- <div class="btn-group" role="group" aria-label="..."> -->
					<button type="button" class="btn btn-primary" id="btn_search">
						<span class="fa fa-search"></span>&nbsp;<spring:message code="main.button.search" />
					</button>
					<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#previewReportModal" id="btn_download_pdf">
						<span class="fa fa-file-pdf-o"></span>&nbsp;<spring:message code="report.text.pdf" />
					</button>
				  	<%-- <button type="button" class="btn btn-success" data-toggle="modal" data-target="#previewReportModal" id="btn_download_xls">
						<span class="fa fa-file-excel-o"></span>&nbsp;<spring:message code="report.text.xls" />
					</button> --%>
				<!-- </div> -->
			</f:form>
		</div>
	</div>
	
	<!-- table -->
	<div class="row">
		<div class="col-sm-12 table-responsive" id="table2">
			<table class="dataTable" id="reportTable" class="cell-border" style="width: 100%">
				<caption title="" class="tableHeader"><spring:message code="report.text" /></caption>
				<thead>
					<tr>
						<th><spring:message code="main.code" /></th>
						<th><spring:message code="info.apply.date" /></th>
						<th><spring:message code="main.name" /></th>
						<th><spring:message code="main.position1" /></th>
						<th><spring:message code="main.position2" /></th>
						<th><spring:message code="report.data.school" /></th>
						<th><spring:message code="education.degree" /></th>
						<th><spring:message code="education.data.gpa" /></th>
					</tr>
				</thead>
			</table>
		</div>
	</div>

	<%-- <!------------------- Report DataTable------------------->
	<div class="table-responsive" id="table2">
		<table class="dataTable" id="reportTable" class="cell-border" style="width: 100%">
		<caption title="" class="tableHeader"><spring:message code="report.text" /></caption>
			<thead>
				<tr>
					<th><spring:message code="main.code" /></th>
					<th><spring:message code="info.apply.date" /></th>
					<th><spring:message code="main.name" /></th>
					<th><spring:message code="main.position1" /></th>
					<th><spring:message code="main.position2" /></th>
					<th><spring:message code="report.data.school" /></th>
					<th><spring:message code="education.degree" /></th>
					<th><spring:message code="education.data.gpa" /></th>
				</tr>
			</thead>
		</table>
	</div> --%>
</div>