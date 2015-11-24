<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- Spring -->	
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>


<jsp:include page="employeeMenu.jsp"></jsp:include>
<jsp:include page="springMessageVariable.jsp"></jsp:include>
<script src="<c:url value ="/static/resources/pageJS/ability.js"/>"></script> 

<input id="empId" type="hidden" value="${id}">
<input id="appId" type="hidden" value="${appId}"/>

<form:form id ="listForm" method="post" commandName="ability">

<!-- 			<div class="row-md-12"> -->

<!-- 				<div class="col-md-6"> -->
					<%-- <h2><spring:message code="ability.name" /></h2> --%>

<!-- 				</div> -->

<!-- 				<div class="col-md-6"> -->

					<br>
<!-- 					Button trigger modal -->
<!-- 					<div class="form-group" align="right"> -->
<!-- 						<button type="button" id="addBtnAbi" class="btn btn-warning active" -->
<%-- 							data-toggle="modal" data-target="#addModal"><spring:message code="label.newRecord" /></button> --%>
<!-- 					</div> -->


<!-- 				</div> -->
<!-- 			</div> -->


			<!-- Table -->
<div class="form-group table-responsive">
<table id="tbResult" class="dataTable stripe table-bordered">
<caption title=""><spring:message code="ability.name" /></caption>
	<thead>
		<tr>
			<!-- <th>#</th> -->
			<th><spring:message code="ability.specialty" /></th>
			<th><spring:message code="ability.rank" /></th>
			<th class="text-center"><spring:message code="label.edit" /></th>
			<th class="text-center"><spring:message code="label.delete" /></th>
			<!-- <th>Delete</th> -->
		</tr>
	</thead>
	<tbody></tbody>
</table>
</div>

</form:form>

<form:form id ="addForm" method="post" commandName="ability" >



<!-- Modal -->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel"><spring:message code="ability.name" /> </h4>
      </div>
     
      
      <div class="modal-body">
        
        <spring:message code="ability.enter.specialty" var="specialty"/>
	
	  
	  <div class="form-group">
	    <label class="required"><spring:message code="ability.specialty" /> </label>
	    
		<div class="form-group">
		  <form:select path="masspecialty" class="form-control"
			id="masspecialty">
			<form:option value="" label="${ specialty}" />
			<c:forEach var="obj" items="${ masspecialtyList }">
				<option value="${obj.id }">${ obj.name}</option>
			</c:forEach>
		</form:select>
		</div>
	  </div>
	  
	   <%-- <div class="form-group">
	    <label>Rank :</label>
	    <form:input path="rank" type="text" class="form-control" id="rank" placeholder="Enter Rank"/>
	  </div> --%>
	  
	  
	  <div class="form-group">
								
								
								<label class="radio-inline" for="rank" > 
		 			     	<form:radiobutton id="rank1" name="rank" path="rank" value="1" checked="true"/>1</label>
		 			     	
		 			     	<label class="radio-inline" for="rank" > 
		 			     	<form:radiobutton id="rank2" name="rank" path="rank" value="2" />2</label>
		 			     	
		 			     	<label class="radio-inline" for="rank" > 
		 			     	<form:radiobutton id="rank3" name="rank" path="rank" value="3" />3</label>
		 			     	
		 			   		<label class="radio-inline" for="rank" > 
		 			     	<form:radiobutton id="rank4" name="rank" path="rank" value="4" />4</label>
		 			     	
		 			     	<label class="radio-inline" for="rank" > 
		 			     	<form:radiobutton id="rank5" name="rank" path="rank" value="5" />5</label>
		 			     	
		 			     	<label class="radio-inline" for="rank" > 
		 			     	<form:radiobutton id="rank6" name="rank" path="rank" value="6" />6</label>
		 			     	
		 			     	<label class="radio-inline" for="rank" > 
		 			     	<form:radiobutton id="rank7" name="rank" path="rank" value="7" />7</label>
		 			     	
		 			     	<label class="radio-inline" for="rank" > 
		 			     	<form:radiobutton id="rank8" name="rank" path="rank" value="8" />8</label>
		 			     	
		 			     	<label class="radio-inline" for="rank" > 
		 			     	<form:radiobutton id="rank9" name="rank" path="rank" value="9" />9</label>
		 			     	
		 			     	<label class="radio-inline" for="rank" > 
		 			     	<form:radiobutton id="rank10" name="rank" path="rank" value="10" />10</label>
		 			  
							
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


<form:form id="deleteForm" commandName="ability" method="post">

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
						<h4 class="modal-title" id="myModalLabel"><spring:message code="ability.name" /></h4>
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




</body>
</html>

