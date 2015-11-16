<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- Spring -->	
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>



<jsp:include page="employeeMenu.jsp"></jsp:include>
<jsp:include page="springMessageVariable.jsp"></jsp:include>
<script src="<c:url value="/static/resources/bootstrapvalidator/dist/js/bootstrapValidator.js" />"></script>
<script src="<c:url value ="/static/resources/pageJS/punish.js"/>"></script> 



<style>
.required:after {
  margin-bottom: 0px;
  content:"*";
  color:red;
}
</style>

<input id="empId" type="hidden" value="${id}">
		<form:form id ="listForm" method="post" commandName="punish">	
<!-- 			<div class="row"> -->
			<%-- <h2 class="col-md-6"><spring:message code="punish.name" /></h2> --%>
			<br>
<!-- 					<div class="col-md-12" align="right"> -->
					<!-- Button trigger modal -->
<!-- 					<button type="button" class="btn btn-warning active" data-toggle="modal" data-target="#addModal"> -->
<%-- 					<spring:message code="label.newRecord" /> --%>
<!-- 					</button>  -->
<!-- 					<br> -->
<!-- 					<br> -->
<!-- 					</div> -->
<!-- 			</div>	 -->
				<div class="form-group table-responsive">
				<table id="tbResult" class="dataTable stripe table-bordered">
				<caption title=""><spring:message code="punish.name" /></caption>
					<thead>					
						<tr>								
							<th><spring:message code="punish.dateform" /></th>
							<th><spring:message code="punish.description" /></th>	
							<th><spring:message code="punish.penalty" /></th>				
							<th class="text-center"><spring:message code="label.edit" /></th>
							<th class="text-center"><spring:message code="label.delete" /></th>
<!-- 							<th></th> -->
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>		
	   </form:form>		

	<form:form id ="addForm" method="post" commandName="punish">
	
	<!-- ---------------------------------------Modal------------------------------------------------------------------ -->
	
		<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">		
			<div class="modal-dialog modal-md">
				<div class="modal-content">
					<div class="modal-header">			
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
       					 <h4 class="modal-title" id="addModalLabel"><spring:message code="punish.name" /></h4>
      					</div>
														
														
																														
				<div class="col col-lg-12 " style="padding-top: 10px">		
				    <div class="form-group "  align="left">
				    
				    		 <spring:message code="default.date" var="date"/>
   							 <spring:message code="default.enter" var="enter"/>
   							 
							<label class="required" ><spring:message code="punish.dateform" var="dateform"/>${dateform} :</label>
						<div class='input-group date' id='datetimepicker1'>
	   						 <form:input path="datepunish" type="text" class="form-control" id="datepunish"  placeholder="${date}"/>
	  						<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>	  	
					  	</div>													
				    </div>	
				    		  
				    		    
				    <div class="form-group "  align="left">
							<label class="required" ><spring:message code="punish.description" var="description"/>${description} :</label>
							<form:input path="description" type="text" class="form-control" name="description"  id="description" placeholder="${enter}${description}"/>							
				    </div>	
				    	
				     <div class="form-group "  align="left">
							<label class="required" ><spring:message code="punish.penalty" var="penalty"/>${penalty} :</label>
							<form:input path="penalty" type="text" class="form-control" name="penalty" id="penalty" placeholder="${enter}${penalty}"/>							
				    </div>	
				    			
				</div>
				
					<div class="form-group" align="center">
					<button type="button" class="btn btn-default btnClose" data-dismiss="modal"><spring:message code="label.close" /></button>
						<button type="button" class="btn btn-info btnSave"><spring:message code="label.save" /></button>
					</div>	
				
				</div>			
			</div>
		</div>
	</form:form>
	  
<!------------------------------------------Button  modal 2----------------------------------------------------->
	
 <form:form id="deleteForm" commandName="punish" method="post">

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
						<h4 class="modal-title" id="myModalLabel"><spring:message code="punish.name" /></h4>
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
 
		   
