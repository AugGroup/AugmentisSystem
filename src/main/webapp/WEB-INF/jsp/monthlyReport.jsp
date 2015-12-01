<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="f"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<title><spring:message code="report.text.monthly" /></title>
<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/pageCss/monthlyReport.css"/>">
<script src="<c:url value ="/static/resources/pageJS/monthlyReport.js"/>"></script> 

<script>
var datatablei18n = "<c:url value='/static/resources/dt-i18n/${pageContext.response.locale}.json' />";
</script>

<script type="text/javascript">
$(document).ready(function(){
	/* $("#btn_report").addClass('active-menu');  */
	$("#report-dropdown").addClass('active-menu');
	$("#monthlyPage").addClass('active-menu'); 
});
</script>

<div class="container">
	<!--page header--> 
 	<div class="row">
		<div class="col-sm-12">
			<div class="page-header">
		  		<h1><strong><spring:message code="report.text.monthly"/></strong></h1>
			</div>
		</div>
	</div>
 
	<!-- search option --> 
	<div class="row">
		<div class="col-sm-12">
			<f:form method="post" id="reportForm" name="reportForm" target="_blank" commandName="searchReportDTO" action="${pageContext.request.contextPath}/reportMonthly/preview" cssClass="form-inline">
				<input type="hidden" value="pdf" id="reportType" name="reportType" checked="checked">
				<div class="form-group">
					<input type="text" name="applyDateStr" id="applyDateStr" class="form-control" placeholder="<spring:message code="report.text.month"/>"/>
					<button type="button" class="btn btn-primary" id="btn_search">
						<span class="fa fa-search"></span>&nbsp;<spring:message code="main.button.search"/>
					</button>
				</div>
				<div class="form-group">
					<button type="button" class="btn btn-danger submit" id="btn_download_pdf" data-toggle="modal" data-target="#previewReportModal" >
						<span class="fa fa-file-pdf-o"></span>&nbsp;<spring:message code="report.text.pdf" />
					</button>
				</div>
			</f:form>		
		</div>
	</div>
	
	<!------------------- Report DataTable-------------------> 
	<div class="table-responsive" id="table2">
    	<table  id="reportTable" class="cell-border" style="width: 100%">
    	<caption title="" class="tableHeader"><spring:message code="report.text.monthly" /></caption>
            <thead>
                <tr>
                    <th><spring:message code="main.code"/></th>
                    <th><spring:message code="info.apply.date"/></th>
                  	<th><spring:message code="main.name"/></th>
                    <th><spring:message code="main.position1"/></th>
                    <th><spring:message code="main.position2"/></th>
                    <th><spring:message code="report.data.school"/></th>
                    <th><spring:message code="education.degree"/></th>
                    <th><spring:message code="education.data.gpa"/></th>
                </tr>
            </thead>
         </table>
     </div>
     
</div>