<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- Spring -->	
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="f"%>

<jsp:include page="employeeMenu.jsp"></jsp:include>
<jsp:include page="springMessageVariable.jsp"></jsp:include>
<script src="<c:url value ="/static/resources/pageJS/probation.js"/>"></script> 
<style type="text/css">

.required:after {
  margin-bottom: 0px;
  content:"*";
  color:red;
}  

</style>

<input id="empId" type="hidden" value="${id}">
<f:form method="post" commandName="probation" class="form-horizontal" role="form">
		<div id="outputajax" class="table-responsive" >		
		<table id="tdResult" class="dataTable stripe table-bordered">
		 <caption title=""><spring:message code="probation.name" /></caption>
			<thead>
				<tr>
					<th><spring:message code="probation.dateFrom" /></th>
					<th><spring:message code="probation.dateTo" /></th>
					<th><spring:message code="probation.status" /></th>
					<th><spring:message code="probation.reason" /></th>
					<th class="text-center"><spring:message code="label.edit" /></th>
					<th class="text-center"><spring:message code="label.delete" /></th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
		</div>
		
</f:form>			
		
<!-- Modal -->
<f:form id="validate" method="post" commandName="probation">
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
       <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel"><spring:message code="probation.name" /></h4>
      </div>
      <div class="modal-body row">
  		<div class="form-group col-md-6">
  		<spring:message code="default.enter" var="enter" />
  		<spring:message code="default.date" var="date" />
    		<label class="required">
    			<spring:message code="probation.dateFrom" var="dateFrom" /> ${dateFrom}  
    		</label>
  			<div class="input-group date" id="dateTimeFrom">
  				<f:input path="dateFrom" id="dateFrom" type="text" class="form-control" placeholder="${date}"/> 
  				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
			</div>
		</div>
		
		<div class="form-group col-md-6">
    		<label class="required">
    			<spring:message code="probation.dateTo" var="dateTo" /> ${dateTo} 
    		</label> 	
  			<div class="input-group date" id="dateTimeTo">
  				<f:input path="dateTo" id="dateTo" type="text" class="form-control" placeholder="${date}"/>
  				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
			</div>
		</div>
  		
  		<div class="form-group col-md-12">
    			<label class="required"><spring:message code="probation.status" var="status" /> ${status}  </label>
    				<f:select path="status" id="status"  class="form-control">
						<option value=""><spring:message code="probation.chooseStatus" /></option>
						<option value="Pass"><spring:message code="probation.pass" /></option>
						<option value="Not Pass"><spring:message code="probation.notPass" /></option>
						<option value="Extend"><spring:message code="probation.extend" /></option>
					</f:select>  
		</div>
  		
  		<div class="form-group col-md-12">
	    	<label><spring:message code="probation.reason" var="reason" /> ${reason}  </label>
	   		<input type="text" class="form-control" id="reason" placeholder="${enter}${reason}"/>
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
        <h4 class="modal-title" id="deleteModalLabel"><spring:message code="label.delete" /><spring:message code="probation.name" /></h4>
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
