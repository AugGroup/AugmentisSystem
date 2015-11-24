<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- Spring -->	
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<style>
.required:after {
  margin-bottom: 0px;
  content:"*";
  color:red;
}
</style>


<jsp:include page="employeeMenu.jsp"></jsp:include>
<jsp:include page="springMessageVariable.jsp"></jsp:include>
<script src="<c:url value ="/static/resources/pageJS/leave.js"/>"></script> 

<input id="empId" type="hidden" value="${id}">
<form:form id ="listForm" method="post" commandName="leave">


<!-- Table -->
<div class="form-group table-responsive">
<table id="tbResult" class="dataTable stripe  table-bordered">
 <caption title=""><spring:message code="leave.name" /></caption>
	<thead>
		<tr>
			<!-- <th>Start_Date</th> -->
			<th><spring:message code="leave.start.date.time" /></th>
			<!-- <th>End_Date</th> -->
			<th><spring:message code="leave.end.date.time" /></th>
			<th><spring:message code="leave.leavetype" /></th>
			<th><spring:message code="leave.reason" /></th>
			 <th><spring:message code="leave.aim" /></th> 
			<th class="text-center"><spring:message code="label.edit" /></th>
			<th class="text-center"><spring:message code="label.delete" /></th>
			<!-- <th>Delete</th> -->
		</tr>
	</thead>
	<tbody></tbody>
</table>
</div>

</form:form>

<form:form id ="addForm" method="post" commandName="leave" >

	
	
	<!-- Modal -->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
       <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel"><spring:message code="leave.name" /></h4>
      </div>
      <div class="modal-body row">
   	
   	<spring:message code="default.date" var="date"/>



	    
	    
	    
	     <div class='col-sm-6'>
            <div class="form-group">
            <label  class="required"><spring:message code="leave.start.date.time" /></label>
                <div class='input-group date' id="startTime1">
				    <form:input id="startTime" name="startTime" path="startTime" cssClass="form-control" placeholder="${date}"/>
                    <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
                </div>
                </div>
                
                
                
             




		 <div class='col-sm-6'>
            <div class="form-group">
            <label  class="required">  <spring:message code="leave.end.date.time" /></label>
                <div class='input-group date' id="endTime1">
          <form:input type='text' class="form-control" name="endTime" path="endTime" id="endTime" placeholder="${date}"/>

                    <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
                </div>
                </div>
                
                
                
               
	<spring:message code="leave.enter.masleavetype" var="masleavetype"/>
	<spring:message code="leave.enter.aim" var="aim"/>
	<spring:message code="default.enter" var="enter"/>
		
  	<div  class=" form-group col-md-6">
	    <label  class="required"><spring:message code="leave.leavetype" /></label>
	    
		<div class="form-group">
		  <form:select path="masleavetype" class="form-control" id="masleavetype">
			<form:option value="" label="${masleavetype }" />
			<c:forEach var="obj" items="${masleavetypeList}">
				<option value="${obj.id}">${ obj.name}</option>
			</c:forEach>
		</form:select>
		</div>
	  </div>
	  
	  
	  
	<div  class=" form-group col-md-6">
	 <label  class="required"><spring:message code="leave.aim" /></label>
		  <form:select path="aim" class="form-control"
			id="aim">
			<form:option  value="" label="${aim }" />
  		    <form:options items="${ aimList }"  itemValue="id" itemLabel="name_eng" />
    		
		</form:select>
	  
	  </div>
	  

	     <div  class=" form-group col-md-12">
		
		
		 <label  class="required"><spring:message code="leave.reason" var="reason"/>${reason } </label>
	    <form:textarea path="reason" type="text" class="form-control" id="reason" placeholder="${enter }${reason }"/>
	 
	
  	</div>
        
		</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default btnClose " data-dismiss="modal"><spring:message code="label.close" /></button>
        <button id="saveButton" type="button" class="btn btn-info saveButton"><spring:message code="label.save" /></button>
      </div>
    
  
</div>
</div>
</div>
</form:form>

<form:form id="deleteForm" commandName="leave" method="post">

<!-- Modal Delete -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h4 class="modal-title" id="deleteModalLabel"><spring:message code="leave.name" /></h4>
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
</form:form>



</body>
</html>