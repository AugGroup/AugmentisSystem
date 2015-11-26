<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="f"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="<c:url value="/static/resources/pageCss/headerHr.css" />" rel="stylesheet" type="text/css">
<script src="<c:url value="/static/resources/pageJS/listemployee.js" />"></script>
<jsp:include page="springMessageVariable.jsp" />
<style>
.form{
	font-family: Dosis-Regular;
	font-size:18px;
	border: 0px solid #eee;
	background-color:#eee;
	padding: 5px;
	
}
</style>

<script type="text/javascript">
	$(document).ready(function(){
		$("#employeePage").addClass('active-menu'); 
	});
</script>

<div id="contentemp">
<div class="form">
<f:form method="post" commandName="listemployee"  role="form">
		<!-- <ol class="breadcrumb">
			<li role="presentation" class="active"><a href="#">Home</a></li>
 			<li role="presentation"><a href="employee.jsp" data-toggle="modal">Add Employee</a></li>
		</ol> -->
		<br/>
		
		<c:if test="${ not empty msgerror }">
			<div class="alert alert-danger" >
			<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;${msgerror }</div>
		</c:if>
		

		<div id="message"></div>
		<div id="outputajax" class="form-group table-responsive">	
			
		<table id="tdResult" class="dataTable stripe table-bordered">
		<caption title=""><spring:message code="employee.name" /></caption>
			<thead>
				<tr>
					<th><spring:message code="label.id" /></th>
					<th><spring:message code="employee.code" /></th>
		 			<th><spring:message code="employee.firstname" /></th>
					<th><spring:message code="employee.surname" /></th>
					<th class="text-center"><spring:message code="label.edit" /></th>
					<th class="text-center"><spring:message code="label.delete" /></th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
		</div>
</f:form>
</div>		
</div>
	<!-- Button trigger modal -->
    <sec:authorize access="hasAnyRole('ROLE_ADMIN','ROLE_HR')"> 
	<div id="groupbtn" align="right">
	<f:form action="${pageContext.request.contextPath}/employee" method="POST" role="form">
		<div class="form-group">
		<%-- <button type="submit" class="btn btn-warning btn-md">
 	 	<spring:message code="label.add" />
		</button> --%>
		</div>
	</f:form>
	</div> 
	</sec:authorize>

<!-- Modal Delete -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h4 class="modal-title" id="deleteModalLabel"><spring:message code="label.delete" /><spring:message code="employee.name" /></h4>
    </div>
      <div class="modal-body">
      	<spring:message code="default.delete.confirm" />
      </div>
      <div class="modal-footer" data-backdrop="static" data-keyboard="false">
      	<button type="button" class="btn btn-danger yesButton" ><spring:message code="default.yes" /></button>
      	<button type="button" class="btn btn-info" data-dismiss="modal"><spring:message code="default.no" /></button>
      </div>
    </div>
  </div>
</div>

