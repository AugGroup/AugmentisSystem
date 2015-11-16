<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- Spring -->	
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<jsp:include page="employeeMenu.jsp"></jsp:include>
<jsp:include page="springMessageVariable.jsp"></jsp:include>
<script src="<c:url value="/static/resources/bootstrapvalidator/dist/js/bootstrapValidator.js" />"></script>
<%-- <script src="<c:url value="/static/resources/autonumeric/js/autoNumeric.js" />"></script> --%>
<script src="<c:url value ="/static/resources/pageJS/card.js"/>"></script>
 

<style>
.required:after {
  margin-bottom: 0px;
  content:"*";
  color:red;
}
</style>

<input id="empId" type="hidden" value="${id}">
		<form:form id ="listForm" method="post" commandName="card">	
<!-- 			<div class="row"> -->
				 
			<br>
<!-- 					<div class="form-group" align="right"> -->
<!-- 					<div class="col-md-12"> -->
					<!-- Button trigger modal -->
<!-- 					<button type="button" class="btn btn-warning active" data-toggle="modal" data-target="#addModal"> -->
<%-- 						<spring:message code=ss"label.newRecord" /> --%>
<!-- 					</button>  -->
					
<!-- 					</div> -->
<!-- 					</div> -->
<!-- 			</div>		 -->
			
				<div class="form-group table-responsive">
				<table id="tbResult" class="dataTable stripe table-bordered">
				<caption title=""><spring:message code="card.name" /></caption>
					<thead>					
						<tr>								
							<th><spring:message code="card.cardno" /></th>
							<th><spring:message code="card.startdate" /></th>					
							<th><spring:message code="card.enddate" /></th>
							<th><spring:message code="card.status" /></th>
							<th><spring:message code="card.remark" /></th>
							<th class="text-center"><spring:message code="label.edit" /></th>
							<th class="text-center"><spring:message code="label.delete" /></th>
<!-- 							<th></th> -->
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>		
	   </form:form>	

	<form:form id ="addForm" method="post" commandName="card">
	<!-- ---------------------------------------Modal------------------------------------------------------------------ -->
	
		<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">		
			<div class="modal-dialog modal-md">  
				<div class="modal-content">
				
					<div class="modal-header">			
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
       					 <h4 class="modal-title" id="addModalLabel"><spring:message code="card.name" /></h4>
      				</div>
      					
      		<div class="col col-lg-12 " style="padding-top: 10px">	
      			<div class="form-group "  align="left">
      			
      						<spring:message code="default.date" var="date"/>
   							 <spring:message code="default.enter" var="enter"/>
   							 
							<label class="required" ><spring:message code="card.cardno" var="cardno" />${cardno} :</label>
							<form:input path="card_no" type="text" class="form-control" name="cardno" id="cardno" placeholder="${enter}${cardno}"/>							
				</div>			
      					
																																		
				    <div class="form-group "  align="left">
							<label class="required"><spring:message code="card.startdate" var="startdate"/>${startdate} :</label>
						<div class='input-group date' id='datetimepicker1'>
	   						 <form:input path="startdate" type="text" class="form-control" name="startdate" id="startdate"  placeholder="${date}"/>
	  						<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>	  	
					  	</div>													
					</div>
				    		
			
				    <div class="form-group "  align="left">
							<spring:message code="card.enddate" var="enddate"/>${enddate} :
						<div class='input-group date' id='datetimepicker2'>
	   						 <form:input path="enddate" type="text" class="form-control" name="enddate" id="enddate" placeholder="${date}"/>
	  						<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>	  	
					  	</div>													
					</div>    		
				    		
				    		<div class="form-group " align="left">
									 <label class="required"><spring:message code="card.status" var="status"/>${status} :</label>
									<form:select path="status" class="form-control" name="status" id="status">									
										<%-- <c:forEach var="obj" items="${ masdegreetypeList }"> --%>		
										<option value=""><spring:message code="card.selectsite" var="selectsite"/>${selectsite}</option>				
										<option value="Onsite">On site</option>
										<option value="Office">Office</option>
										<option value="Resign">Resign</option>	
										<%-- </c:forEach> --%>
									</form:select>
								</div>
				    						    		
				    			    
				  		  <div class="form-group "  align="left">
								<label for="remark" ><spring:message code="card.remark" var="remark" />${remark} :</label>
								<form:input path="remark" type="text" class="form-control" id="remark" placeholder="${enter}${remark}"/>							
				   		 </div>	
				    
				  </div>		
				  		
					<div class="modal-footer">
					<button type="button" class="btn btn-default btnClose" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-info btnSave">Save</button>
					</div>	
				
			</div>			
		</div>
	</div>
	</form:form>
	  
<!------------------------------------------Button  modal 2----------------------------------------------------->
	
 <form:form id="deleteForm" commandName="card" method="post">

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
						<h4 class="modal-title" id="myModalLabel"><spring:message code="card.name" /></h4>
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
 
		   
