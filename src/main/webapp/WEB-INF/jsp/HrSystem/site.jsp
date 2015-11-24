<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>


<!-- Spring -->	
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="f"%>



<jsp:include page="employeeMenu.jsp"></jsp:include>
<jsp:include page="springMessageVariable.jsp"></jsp:include>
<script src="<c:url value="/static/resources/bootstrapvalidator/dist/js/bootstrapValidator.js" />"></script>
<script src="<c:url value ="/static/resources/pageJS/site.js"/>"></script> 


<input id="empId" type="hidden" value="${id}"/>

<f:form id="listForm" name="siteForm" method="post" commandName="siteDto" role="form">	      	 

<br>

<div class="form-group table-responsive">

 <table id="tableResult" class="dataTable stripe table-bordered"> 
 <caption title=""><spring:message code="site.name" /></caption>
	    <thead>
            <tr> 
                <th><spring:message code="site.startDate" var="startDate"/>${startDate }</th>
                <th><spring:message code="site.endDate" var="endDate"/>${endDate }</th>
                <th><spring:message code="site.projectname" var="projectname"/>${projectname }</th>
                <th><spring:message code="site.projectOwner" var="projectOwner"/>${projectOwner }</th> 
                <th><spring:message code="site.projectOwnerContact" var="projectOwnerContact"/>${projectOwnerContact }</th>
                <th class="text-center"><spring:message code="label.edit" /></th>
				<th class="text-center"><spring:message code="label.delete" /></th>
            </tr>
        </thead>
 
   </table>
  
   </div> 
    </f:form>
   
   <f:form id ="formAddUpdate" method="post" commandName="site">
   
<!-- Modal Add and Update data-->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel"><spring:message code="site.name" /></h4>
      </div>
      <div class="modal-body">
          
          
	      
	   <spring:message code="default.date" var="date"/>
	   
	    <div class="row">
		   <div class="form-group col-md-6">
			    
			     <label class="required">${startDate}</label>	 		
				 <div  class="input-group date" id='startDate'>		     		
				 <f:input name="startDate" path="startDate" class="form-control" placeholder="${date}"/>
				 <span class="input-group-addon">
	                  <span class="glyphicon glyphicon-calendar"></span>
	             </span>
				     </div>
		   		</div>	
		   		
			<div class="form-group col-md-6">
			     <label class="required">${endDate}</label>	 		
				     <div  class="input-group date" id='endDate'>		     		
				     		<f:input name="endDate" path="endDate" class="form-control" placeholder="${date}"/>
				     		<span class="input-group-addon">
	                        <span class="glyphicon glyphicon-calendar"></span>
	                    </span>
				     </div>
				</div>		   
		   </div>
		   
		     <div class="form-group">
			    
			      <label class="required" >
			            ${projectname}
			      </label>	 		
			     		<f:input  id="projectName" path="projectName" cssClass="form-control required" placeholder="${projectname}" />			     		
			     </div>
		   
		   
		    <div class="form-group form-group-sm">
			    
			     <label class="required" >
			            ${projectOwner}
			     </label>	 		
			     		<f:input id="projectOwner" path="projectOwner" cssClass="form-control required" placeholder="${projectOwner}"/>
			     </div>
		           
		   
		  <div class="form-group">
			    
			     <label class="required" >
			            ${projectOwnerContact}
			     </label>	 		
			     		<f:input id="projectOwnerContact" path="projectOwnerContact" cssClass="form-control required" placeholder="${projectOwnerContact}"/>
			     </div>
			     
		     </div>
		  
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal"><spring:message code="label.close" /></button>
		        <button id="saveBtn" name="saveBtn" type="button" class="btn btn-primary"><spring:message code="label.save" /></button>
		      </div>
 
	  
	    </div>
	  </div>
	</div>   
 
    </f:form>
   
   <f:form id="deleteForm" commandName="site" method="post">
	<!-- Modal Delete -->
	<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
	  <div class="modal-dialog">
	    <div class="modal-content">
	    <div class="modal-header">
	        <h4 class="modal-title" id="deleteModalLabel"><spring:message code="site.name" /></h4>
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
