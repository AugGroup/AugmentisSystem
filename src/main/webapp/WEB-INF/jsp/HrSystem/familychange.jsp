<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- Spring -->	
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="f"%>

<link href="<c:url value="/static/resources/pageCss/headerHr.css" />" rel="stylesheet" type="text/css">
<div style="margin-left:15px;">
	<jsp:include page="employeeMenu.jsp"></jsp:include>
	<jsp:include page="springMessageVariable.jsp"></jsp:include>
</div>

<%-- <script src="<c:url value="/static/resources/bootstrapvalidator/dist/js/bootstrapValidator.js" />"></script> --%>
<script src="<c:url value="/static/resources/pageJS/family.js" />"></script>
<script src="<c:url value="/static/resources/js/jquery.collapse.js" />"></script>

 
 
<input id="empId" type="hidden" value="${id}">
<input id="appId" type="hidden" value="${appId}">

 <f:form id="listForm" name="FamilyForm" method="post" commandName="family">	      	 


<br>

<div class="form-group  table-responsive">
 <table id="tableResult" class="dataTable stripe table-bordered">
 <caption title=""><spring:message code="family.name" /></caption>
	    <thead>
            <tr> 
                <th><spring:message code="label.fullname" /></th>
                <th><spring:message code="family.occupation" /></th> 
                <th><spring:message code="label.telephone" /></th>
                <th><spring:message code="family.relation" /></th> 
                <th class="text-center"><spring:message code="label.edit" /></th>
				<th class="text-center"><spring:message code="label.delete" /></th>
            </tr>
        </thead>

 
      
	   <tbody>
	   
	   </tbody>
   </table>
</div>   

 

   </f:form>
   
   
 <f:form id ="formAdd" method="post" commandName="family">
 
<!-- Modal Add and Update data-->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel"><spring:message code="family.name" /></h4>
      </div>
      <div class="modal-body">
          
	     <div class="form-group">
			      <label class="required" ><spring:message code="label.fullname" />  </label>	 		
			      <f:input  id="familyName"  path="familyName" cssClass="form-control required" placeholder="Full Name" />   		
			     </div>
		  
		  
	     <div class="form-group">
			    
			     <label class="required" >
			     	  <spring:message code="family.gender" /> 
			     </label>	 		

			      <div class="form-group">					    
				     	
				     <label class="radio-inline" for="gender_male" > 
		 			     	<f:radiobutton id="genderMale" name="gender" path="gender" value="Male" checked="true"/><spring:message code="family.gender.male" />
		 			 </label>
		 			 <label class="radio-inline" for="gender_female"> 
		 			     <f:radiobutton id="genderFemale" name="gender" path="gender" value="Female"/><spring:message code="family.gender.female" />
				     </label>  					     		 
				  </div>
		     </div>

		   
		   
		    <div class="form-group">
			        
			      <label class="required" for="age">
			       	 <spring:message code="family.age" /> 
			     </label>	 		
					<f:input  type="number" id="age" name="age" path="age" cssClass="form-control required" placeholder="Age" />		
			     </div>		   

		   
		   
		   
		   <div class="form-group">
						 
			    <label class="required" for="mobile" >
			    	 <spring:message code="label.mobile" /> 
			    </label>	 		
			     	<f:input  type="tel" id="mobile" name="mobile" path="mobile" cssClass="form-control required" placeholder="Mobile" />
			     </div>		   
		  		  		 
		   
		   <div class="form-group">
		   
			     <label class="required" for="address" >
			           <spring:message code="label.address" /> 
			     </label>	 		
			     	<f:textarea rows="2" id="address" name="address"  path="address" cssClass="form-control required" placeholder="Address" />
			   
			     </div>	
	
		   
		   <div class="form-group">
		   
			     <label for="occupation">
			           <spring:message code="family.occupation" /> 
			     </label>	 		
			     	 <f:input id="occupation" name="occupation" path="occupation" cssClass="form-control" placeholder="Occupation" />	     		
			     		
			     </div>		   
		   
		   
		   <div class="form-group">
		   
	         
			     <label for="position">
			     		<spring:message code="family.position" />
			     </label>	 		
			     		<f:input id="position" name="position" path="position" cssClass="form-control" placeholder="Positon" />	     		
			     	
			     </div>		 
		   
		   
		   
		   <spring:message code="family.enter.Relation" var="Relation"/>
		   
		   
		   
		    <div class="form-group">
		   
		        <label class="required" for="masRelation" >
		        	   <spring:message code="family.relation" />
			          
			    </label>	 		
			    
			    </div>
			     
			     
			      <div class="form-group">	     		

			     		 <f:select id="masRelationType" path="masRelationType" cssClass="form-control">
						  <option  value="">${Relation }</option>							
							<c:forEach var="obj" items="${ masRelationTypeList }">									
									<option value="${obj.id}" >${obj.relationType}</option> 									
							</c:forEach>
						</f:select> 
								
			     </div>		 
			     
		  
		      <div class="modal-footer">
		       		
		        <button type="button" class="btn btn-default" data-dismiss="modal"><spring:message code="label.close" /></button>
		        <button id="saveBtn" name="saveBtn" type="button" class="btn btn-primary"><spring:message code="label.save" /></button>
		 		     		     
		      </div>
		      
		        
	  
	    </div>
	  </div>
 </div>
 </div>
 
 </f:form>
 
 <f:form id="deleteForm" commandName="family" method="post">
 
 <!-- Modal Delete -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h4 class="modal-title" id="deleteModalLabel"><spring:message code="family.name" /></h4>
      </div>
      <div class="modal-body">
      	<spring:message code="default.delete.confirm" />
      </div>
      <div class="modal-footer">
		<button id="delete" type="button" class="btn btn-danger yesButton" ><spring:message code="default.yes" /></button>
      	<button type="button" class="btn btn-info" data-dismiss="modal"><spring:message code="default.no" /></button>
      </div>
    </div>
  </div>
</div>
</f:form>
 

