<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- Spring -->	
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="f"%>

<jsp:include page="employeeMenu.jsp"></jsp:include>
<jsp:include page="springMessageVariable.jsp"></jsp:include>

<script src="<c:url value="/static/resources/autonumeric/js/autoNumeric.js" />"></script>
<script src="<c:url value ="/static/resources/pageJS/experience.js"/>"></script> 


<style>
.required:after {
  margin-bottom: 0px;
  content:"*";
  color:red;
}
</style>
<input id="empId" type="hidden" value="${id}">

<f:form method="post" commandName="experience"  role="form">	
				
<!-- 		<div class="row"> -->
		<%-- <div class="col-md-6">
		<h2><spring:message code="experience.name" /></h2>
		</div> --%>
		<!-- Button trigger modal -->
		<br>
<!-- 			<div class="form-group" align="right"> -->
<!-- 			<div class="col-md-12"> -->
<%-- 				<button type="button" id="addBtnEdu" class="btn btn-warning active btnAdds " data-toggle="modal" data-target="#addModal"><spring:message code="label.newRecord" /></button>  --%>
<!-- 			</div> -->
<!-- 			</div> -->
<!-- 		</div>				 -->
						
		
		<div id="outputajax" class="form-group table-responsive">		
		<table id="tdResult" class="dataTable stripe table-bordered ">
		<caption title=""><spring:message code="experience.name" /></caption>
			<thead>
				<tr>
					<th><spring:message code="experience.dateFrom" /></th>
					<th><spring:message code="experience.dateTo" /></th>
					<th><spring:message code="experience.companyName" /></th>
					<th><spring:message code="experience.position" /></th>
					<th><spring:message code="experience.salary" /></th>
					<th><spring:message code="experience.reason" /></th>
					<th class="text-center"><spring:message code="label.edit" /></th>
					<th class="text-center"><spring:message code="label.delete" /></th>
					<!-- <th></th> -->
				</tr>
			</thead>
			<tbody></tbody>
		</table>
		</div>
</f:form>			
		
<!-- Modal -->
<f:form id="validate" method="post" commandName="experience">
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
       <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel"><spring:message code="experience.name" /></h4>
      </div>
      <div class="modal-body row">
        <spring:message code="default.enter" var="enter" />
  		<spring:message code="default.date" var="date" />
       	
       	<div class="form-group col-md-6">
    		<label class="required"><spring:message code="experience.dateFrom" var="dateFrom" /> ${dateFrom}  </label>
  			<div class="input-group date" id="dateTimeFrom">
  				<f:input data-format="dd-mm-yyyy" path="dateFrom" id="dateFrom" type="text" class="form-control" placeholder="${date}" />
  				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
			</div>
		</div>
		
		<div class="form-group col-md-6">
    		<label class="required"><spring:message code="experience.dateTo" var="dateTo" /> ${dateTo}  </label> 	
  			<div class="input-group date" id="dateTimeTo">
  				<f:input path="dateTo" type="text" class="form-control" id="dateTo" placeholder="${date}" />
  				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
			</div>
		</div>
        <div class="form-group col-md-6">
  			<label class="required"><spring:message code="experience.companyName" var="cName" /> ${cName}  </label>
  			<f:input path="companyName" type="text" class="form-control" id="cName" placeholder="${enter}${cName}" />
  		</div>
  		<div class="form-group col-md-6">
  			<label><spring:message code="experience.businessType" var="businessType" /> ${businessType}  </label>
  			<input type="text" class="form-control" id="businessType" placeholder="${businessType}">
  		</div>
  		
      	<div class="form-group col-md-6">
      		<label class="required"><spring:message code="experience.position" var="position" /> ${position}  </label>
  			<f:input path="position" type="text" class="form-control" id="position" placeholder="${enter}${position}" />
		</div>
		
		<div class="form-group col-md-6">
      		<label class="required"><spring:message code="experience.salary" var="salary" /> ${salary}  </label>
  			<f:input path="salary" type="text" class="form-control" id="salary" placeholder="${enter}${salary}" />
		</div>
  		
		<div class="form-group col-md-6">
  			<label><spring:message code="experience.responsibility" var="responsibility" /> ${responsibility}  </label>
  			<input type="text" class="form-control" id="responsibility" placeholder="${enter}${responsibility}">
  		</div>
  		<div class="form-group col-md-6">
  			<label><spring:message code="experience.reference" var="reference" /> ${reference}  </label>
  			<input type="text" class="form-control" id="reference" placeholder="${enter}${reference}">
  		</div>
  		
  		<div class="form-group col-md-12">
  			<label><spring:message code="experience.address" var="address" /> ${address}  </label>
  			<input type="text" class="form-control" id="address" placeholder="${enter}${address} ">
  		</div>
  		
  		<div class="form-group col-md-12">
  			<label class="required"><spring:message code="experience.reason" var="reason" /> ${reason}  </label>
  			<f:input path="reason" type="text" class="form-control" id="reason" placeholder="${enter}${reason}" />
  		</div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default closeButton" data-dismiss="modal"><spring:message code="label.close" /></button>
        <button type="button" class="btn btn-info saveButton"><spring:message code="label.save" /></button>
      </div>
    </div>
  </div>
</div>
</f:form>

<!-- Modal Delete -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h4 class="modal-title" id="deleteModalLabel"><spring:message code="label.delete" /><spring:message code="experience.name" /></h4>
      </div>
      <div class="modal-body">
      	<spring:message code="default.delete.confirm" />
      </div>
      <div class="modal-footer">
		<button type="button" class="btn btn-danger yesButton" ><spring:message code="default.yes" /></button>
      	<button type="button" class="btn btn-info" data-dismiss="modal"><spring:message code="default.no" /></button>
      </div>
    </div>
  </div>
</div>
