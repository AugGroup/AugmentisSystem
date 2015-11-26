<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- Spring -->	
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<jsp:include page="employeeMenu.jsp"></jsp:include>
<jsp:include page="springMessageVariable.jsp"></jsp:include>
<script src="<c:url value ="/static/resources/pageJS/reference.js"/>"></script> 

<style>
.required:after {
  margin-bottom: 0px;
  content:"*";
  color:red;
    
}
</style>

<input id="empId" type="hidden" value="${id}">
		<form:form id ="listForm" method="post" commandName="reference" class="form-horizontal" action="reference">		
<!-- 		<div class="row"> -->
				<%-- <h2 class="col-md-6"><spring:message code="reference.name" /></h2>	 --%>			
				<br>
<!-- 				<div class="col-md-12" align="right">		 -->
<!-- 				<button type="button" class="btn btn-warning active btnAdd" data-toggle="modal" data-target="#addModal"> -->
<%-- 					<spring:message code="label.newRecord" /> --%>
<!-- 				</button>  -->
<!-- 				<br> -->
<!-- 				<br> -->
<!-- 			</div> -->
<!-- 		</div>	 -->
		<div class="form-group table-responsive">
				<table id="tbResult" class="dataTable stripe table-bordered " class="form-group">
				<caption title="">Reference</caption>
					<thead>	
						<tr>								
							<th><spring:message code="reference.fullname" /></th>
							<!-- <th>ADDRESS</th> -->
							<th><spring:message code="reference.telephoneheader" /></th>
							<!-- <th>OCCUPATION</th> -->
							<th class="text-center"><spring:message code="label.edit" /></th>
							<th class="text-center"><spring:message code="label.delete" /></th>
<!-- 							<th></th> -->
						</tr>
					</thead>
					<tbody></tbody>
				</table>
		</div>			
						
	   </form:form>	

	<form:form id ="addForm" method="post" commandName="reference">
	

	<!-- ---------------------------------------Modal------------------------------------------------------------------ -->
		
	
	<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">		
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">			
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
       					 <h4 class="modal-title" id="addModalLabel"><spring:message code="reference.name" /></h4>
      				</div>		
      				<br>																							
					<div class="col col-lg-12 " >		
							
							<spring:message code="default.enter" var="enter"/>
												
						<div class="form-group ">
								<label class="required" ><spring:message code="reference.fullname" var="fullname"/>${fullname} </label>
								<form:input path="name" type="text" class="form-control" id="name" placeholder="${enter}${fullname}"/>					
					    </div>	
					    
					    <spring:message code="reference.telephone" var="telephone" />
					    <div class="form-group " >
							<label class="required" ><spring:message code="reference.telephoneheader" var="telephoneheader" />${telephoneheader} </label>
							<form:input path="tel" type="text" class="form-control" id="tel" placeholder="${telephone}"/>							
				    	</div>
				    	
				    	<spring:message code="reference.address" var="address" />
				    	<div class="form-group " >
							<label class="required" ><spring:message code="reference.address" var="address" />${address} </label>
							<form:input path="address" type="text" class="form-control" id="address" placeholder="${address}"/>							
				    	</div>	
				    	
				    	<spring:message code="reference.occupation" var="occupation" />
				    	<div class="form-group " >
							<label class="required" ><spring:message code="reference.address" var="address" />${occupation} </label>
							<form:input path="occupation" type="text" class="form-control" id="occupation" placeholder="${occupation}"/>							
				    	</div>		
				    			    			    				  					    
					    
					</div>			    
					
					 <div class="modal-footer" >
      				 	 <button type="button" class="btn btn-default btnClose" data-dismiss="modal"><spring:message code="label.close" /></button>
      					<button type="button" class="btn btn-info btnSave"><spring:message code="label.save" /></button>
     				 </div>
					
						
				</div>
			</div>			
		</div>
	 
	</form:form> 

<!------------------------------------------Button  modal 2--------------------------------------------------------->
		
  
 <form:form id="deleteForm" commandName="reference" method="post">

		<!-- Modal -->
		<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title" id="myModalLabel"><spring:message code="reference.name" /></h4>
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
 

		
