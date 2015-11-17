<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- Spring -->	
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<jsp:include page="employeeMenu.jsp"></jsp:include>
<jsp:include page="springMessageVariable.jsp"></jsp:include>
<script src="<c:url value ="/static/resources/pageJS/history.js"/>"></script> 

<input id="empId" type="hidden" value="${id}">

<form:form id ="listForm" method="post" commandName="history">

<!-- <div class="row"> -->
<!-- <div class="col-md-6"> -->
<%-- <h2><spring:message code="history.name" /></h2>  --%>
<!-- </div> -->
<br>

<!-- Button trigger modal -->
<!-- <div class="form-group" align="left"> -->
<!-- <div class="col-md-12"> -->
<%-- <button type="button" id="addBtnHis" class="btn btn-warning active" data-toggle="modal" data-target="#addModal"><spring:message code="label.newRecord" /></button>  --%>
<!-- </div> -->
<!-- </div> -->
<!-- </div> -->

<!-- Table -->
<div class="form-group table-responsive">
<table id="tbResult" class="dataTable stripe table-bordered">
<caption title=""><spring:message code="history.name" /></caption>
	<thead>
		<tr>
			<th><spring:message code="history.dateOfAdjustment" var="dateOfAdjustment"/>${dateOfAdjustment }</th>
			<th><spring:message code="history.position" var="position"/>${position }</th>
			<th><spring:message code="history.salary" var="salary"/>${salary }</th>
			<th><spring:message code="history.reasonOfAdjustment" var="reasonOfAdjustment"/>${reasonOfAdjustment }</th>
			<th class="text-center"><spring:message code="label.edit" /></th>
			<th class="text-center"><spring:message code="label.delete" /></th>
			<!-- <th></th> -->
		</tr>
	</thead>
	<tbody></tbody>
</table>
</div>

</form:form>

<form:form id ="addForm" method="post" commandName="history" >
 <form:hidden path="createdBy" id="createHis"></form:hidden>
 <form:hidden path="createdTimeStamp" id="createdTimeHis" ></form:hidden>

<!-- Modal -->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span id="closeX" aria-hidden="true">x</span></button>
        <h4 class="modal-title" id="myModalLabel"><spring:message code="history.name" /></h4>
      </div>
      
      <div class="modal-body row">
        
        <spring:message code="default.date" var="date"/>
   		<spring:message code="default.enter" var="enter"/>
   		
      <div class="form-group col-md-6">
	    <label class="required">${dateOfAdjustment } : </label>
	    <div class='input-group date' id='datetimepicker1'>
	    <form:input path="dateOfAdjustment" type="text" class="form-control" name="dateOfAdjustment" id="dateOfAdjustment" placeholder="${date }"/>
	  	<span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"></span>
        </span>
	  	
	  	</div>
	  </div>
	    
	  <div class="form-group col-md-6">
	    <label class="required">${position } : </label>
	    <form:input path="position" type="text" class="form-control" id="position" name="position" placeholder="${enter }${position }" />
	  </div>
	  
	  <div class="form-group col-md-6">
	    <label class="required">${ salary} : </label>
	    <form:input path="salary" type="text" class="form-control money" id="salary" name="salary" placeholder="${enter }${salary }"/>
	  </div>
	  
	  <div class="form-group col-md-6">
	    <label><spring:message code="history.oldSalary" var="oldSalary"/>${oldSalary } :</label>
	    <form:input path="oldSalary" type="text" class="form-control" id="oldSalary" name="oldSalary" placeholder="${enter }${oldSalary }"/>
	  </div>
	  
	  <div class="form-group col-md-6">
	    <label>${reasonOfAdjustment } :</label>
	    <form:textarea path="reasonOfAdjustment" type="text" class="form-control" name="reasonOfAdjustment" id="reasonOfAdjustment" placeholder="${enter }${reasonOfAdjustment }"/>
	  </div>
	  
	  <%-- <div class="form-group col-md-6">
	    <label>Adjustment Time :</label>
	    <form:input path="adjustmentTime" type="text" class="form-control" id="adjustmentTime" placeholder="Enter Adjustment Time"/>
	  </div> --%>
	  

      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-default  btnClose" data-dismiss="modal"><spring:message code="label.close" /></button>
      	<button type="button" class="btn btn-info active btnSave"><spring:message code="label.save" /></button>
      </div>
      
    </div>
  </div>
</div>

</form:form>

<form:form id="deleteForm" commandName="history" method="post">

		<!-- Modal -->
		<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title" id="myModalLabel"><spring:message code="history.name" /></h4>
					</div>
					<div class="modal-body">
						<h4><spring:message code="default.delete.confirm" /></h4>
						<form:hidden path="id"/>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-danger btnYes"><spring:message code="default.yes" /></button>
						<button type="button" class="btn btn-info active" data-dismiss="modal"><spring:message code="default.no" /></button>
					</div>
				</div>
			</div>
		</div>

</form:form>
