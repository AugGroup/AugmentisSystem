<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- Spring -->	
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<jsp:include page="employeeMenu.jsp"></jsp:include>
<jsp:include page="springMessageVariable.jsp"></jsp:include>
<script src="<c:url value="/static/resources/bootstrapvalidator/dist/js/bootstrapValidator.js" />"></script>
<script src="<c:url value ="/static/resources/pageJS/education.js"/>"></script> 

<input id="empId" type="hidden" value="${id}">
<input id="appId" type="hidden" value="${appId}"/>

<form:form id ="listForm" method="post" commandName="education" action="education">

<!-- <div class="row"> -->
<%-- <div class="col-md-6">
<h2><spring:message code="education.name" /></h2>
</div> --%>
<!-- Button trigger modal -->
<br>
<!-- <div class="form-group" align="right"> -->
<!-- <div class="col-md-12"> -->
<%-- <button type="button" id="addBtnEdu" class="btn btn-warning active btnAdds " data-toggle="modal" data-target="#addModal"><spring:message code="label.newRecord" /></button>  --%>
<!-- </div> -->
<!-- </div> -->
<!-- </div> -->

<!-- Table -->
<div class="form-group table-responsive">
<table id="tbResult" class="dataTable stripe table-bordered">
<caption title=""><spring:message code="education.name" /></caption>
	<thead>
		<tr>
			<th><spring:message code="education.start.date" /></th>
			<th><spring:message code="education.finish.date" /></th>
			<th><spring:message code="education.deegreetype" /></th>
			<th><spring:message code="education.university" /></th>
			<th><spring:message code="education.major" /></th>
			<th><spring:message code="education.gpa" /></th>
			<th class="text-center"><spring:message code="label.edit" /></th>
		   <th class="text-center"><spring:message code="label.delete" /></th>
			<!-- <th></th> -->
		</tr>
	</thead>
	<tbody></tbody>
</table>
</div>

</form:form>

<form:form id ="addForm" method="post" commandName="education">

<!-- Modal -->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span id="closeX" aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel"><spring:message code="education.name" /> </h4>
      </div>
      
      <div class="modal-body row">
   		
   		<spring:message code="default.date" var="date"/>
   		<spring:message code="default.enter" var="enter"/>
   		
   	  <div class="form-group col-md-6">
	    <label class="required"><spring:message code="education.start.date" /> :</label>
	    <div class='input-group date' id='datetimepickerStart'>
	    <form:input path="start_date" type="text" class="form-control" id="startDate" name="startDate" placeholder="${date}"/>
	    <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"></span>
        </span>
	    </div>
	   </div> 
	   
	   <div class="form-group col-md-6">
	    <label class="required"><spring:message code="education.finish.date" /> :</label>
	    <div class='input-group date' id='datetimepickerGrad'>
	    <form:input path="graduated_date" type="text" class="form-control" id="graduatedDate" name="graduatedDate" placeholder="${date}"/>
	    <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"></span>
        </span>
        </div>
	  </div>
	  
	  <div class="form-group col-md-6">
	    <label class="required"><spring:message code="education.university" var="university"/>${university} :</label>
	    <form:input path="university" type="text" class="form-control" id="university" name="university" placeholder="${enter}${university}"/>
	  </div>
	  
	  
	  
	  <div class="form-group col-md-6">
	    <label class="required"><spring:message code="education.major" var="major"/>${major} :</label>
	    <form:input path="major" type="text" class="form-control" id="major" name="major" placeholder="${enter}${major}"/>
	  </div>
	  
	  <div class="form-group col-md-12">
	    <label class="required"><spring:message code="education.faculty" var="faculty"/>${faculty} :</label>
	    <form:input path="faculty" type="text" class="form-control" id="faculty" name="faculty" placeholder="${enter}${faculty}"/>
	  </div>
	  
	  <div class="form-group col-md-12">
	    <label class="required"><spring:message code="education.deegreetype" /> :</label>
	    
	    <div class="form-group">
		  <form:select path="masdegreetype" class="form-control"
			id="masdegreetype">
			<form:option value="" label="--- Select  Degreetype ---" />
			<c:forEach var="obj" items="${ masdegreetypeList }">
				<option value="${obj.id }">${ obj.name}</option>
			</c:forEach>
		</form:select>
		</div>
		
		<%-- <form:select  id="masdegreetype" name="masdegreetype" path="masdegreetype" cssClass="form-control">
		<form:option value="-1" label="--- Select  Degreetype ---"/>
		<option value=""><spring:message code="education.enter.deegreetype" /></option>
	    <form:options items="${masdegreetypeList}" itemValue="id" itemLabel="name"/>
	    </form:select> --%>
	    
	  </div>
	  
	  
	   <div class="form-group col-md-6">
	    <label><spring:message code="education.gpa" var="gpa"/>${gpa} :</label>
	    <form:input path="gpa" type="text" class="form-control" name="gpa" id="gpa" placeholder="${enter}${gpa}"/>
	  </div>
	  
	  <div class="form-group col-md-6">
	    <label><spring:message code="education.certification" var="certification"/>${certification} :</label>
	    <form:input path="certification" type="text" class="form-control" id="certificate" name="certificate" placeholder="${enter}${certification}"/>
	  </div>
	  
	  <%-- <div class="form-group col-md-12">
	    <label><spring:message code="education.description" var="description"/>${description} :</label>
	    <form:input path="description" type="text" class="form-control" id="description" name="description" placeholder="${enter}${description}"/>
	  </div>
	  
      </div> --%>
     </div>  
      <div class="modal-footer">
        <button type="button" class="btn btn-default btnClose" data-dismiss="modal"><spring:message code="label.close" /></button>
      	<button type="button" class="btn btn-info btnSave"><spring:message code="label.save" /></button>
      </div>
      
  </div>
</div>
</div>
</form:form>

<form:form id="deleteForm" commandName="education" method="post">

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
						<h4 class="modal-title" id="myModalLabel"><spring:message code="education.name" /></h4>
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
