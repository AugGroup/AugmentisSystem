<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- Spring -->	
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<jsp:include page="employeeMenu.jsp"></jsp:include>
<jsp:include page="springMessageVariable.jsp"></jsp:include>
<script src="<c:url value="/static/resources/bootstrapvalidator/dist/js/bootstrapValidator.js" />"></script>
<script src="<c:url value ="/static/resources/pageJS/allowances.js"/>"></script> 

<input id="empId" type="hidden" value="${id}">

<form:form id ="listForm" method="post" commandName="allowances">

<!-- <div class="row"> -->
<%-- <div class="col-md-6">
<h2><spring:message code="allowances.name" /></h2> 
</div> --%>
<br>

<!-- Button trigger modal -->
<!-- <div class="form-group" align="right"> -->
<!-- <div class="col-md-12"> -->
<%-- <button type="button" id="addBtnAll" class="btn btn-warning active" data-toggle="modal" data-target="#addModal"><spring:message code="label.newRecord" /></button>  --%>
<!-- </div> -->
<!-- </div> -->
<!-- </div> -->

<!-- Table -->
<div class="form-group table-responsive">
<table id="tbResult" class="dataTable stripe table-bordered">
<caption title=""><spring:message code="allowances.name" /></caption>
	<thead>
		<tr>
			<th><spring:message code="allowances.masallowances" /></th>
			<th><spring:message code="allowances.amount" /></th>
			<th class="text-center"><spring:message code="label.edit" /></th>
			<th class="text-center"><spring:message code="label.delete" /></th>
			<!-- <th></th> -->
		</tr>
	</thead>
	<tbody></tbody>
</table>
</div>

</form:form>

<form:form id ="addForm" method="post" commandName="allowances">

<!-- Modal -->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span id="closeX" aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel"><spring:message code="allowances.name" /> </h4>
      </div>
      
      <div class="modal-body">
        
	  <div class="form-group">
	    <label class="required"><spring:message code="allowances.masallowances" />  </label>
	    <form:select path="masallowances" class="form-control"
			id="masallowances" name="masallowances" onchange="myFunction(this.value)">
			<option value=""><spring:message code="allowances.enter.allowances" /></option>
			<c:forEach var="obj" items="${ masallowancesList }">
				<option value="${obj.id }">${ obj.allowances_type}</option>
			</c:forEach>
		</form:select>
	  </div>
	  
	  <div class="form-group">
	    <label><spring:message code="allowances.amount" var="amount"/>${amount }  </label>
	    <form:input path="amount" type="text" class="form-control" id="amount" name="amount" placeholder="${enter }${amount }"/>
	  </div>
	  
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-default btnClose" data-dismiss="modal"><spring:message code="label.close" /></button>
      	<button type="button" class="btn btn-info btnSave"><spring:message code="label.save" /></button>
      </div>
      
    </div>
  </div>
</div>

</form:form>

<form:form id="deleteForm" commandName="allowances" method="post">

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
						<h4 class="modal-title" id="myModalLabel"><spring:message code="allowances.name" /></h4>
					</div>
					<div class="modal-body">
						<h4><spring:message code="default.delete.confirm" /></h4>
						<form:hidden path="id"/>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-danger btnYes"><spring:message code="default.yes" /></button>
						<button type="button" class="btn btn-info" data-dismiss="modal"><spring:message code="default.no" /></button>
					</div>
				</div>
			</div>
		</div>

</form:form>
