<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- Spring -->	
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="f"%>

<jsp:include page="employeeMenu.jsp"></jsp:include>
<jsp:include page="springMessageVariable.jsp"></jsp:include>
<script src="<c:url value="/static/resources/bootstrapvalidator/dist/js/bootstrapValidator.js" />"></script>
<script src="<c:url value ="/static/resources/pageJS/health.js"/>"></script> 
<link href="<c:url value="/resources/pageCSS/health.css" />" rel="stylesheet" media="all">


<input id="empId" type="hidden" value="${id}"/>
<input  id="idHealth" name="ididHealth" type="hidden" value='${healthDto.id}'/>


		<div id="div-information" class="col-md-12">
				<h2><spring:message code="label.health" />
					<i id="icon1" class="fa fa-chevron-up"></i>
				</h2>
	    </div>
	

	<div class="container">     
	
          <f:form id="formAddUpdate" name="healthForm" method="post" commandName="healthDto" class="form-horizontal" role="form">	      	 
	  
    <div  class="form-group form-group-sm col col-lg-12 col-md-12 col-sm-12 col-xs-12 divHealth">
		   	
			     <div class="row">  
	
			    <label class="col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label required" for="congenitalDisease" >
					        <spring:message code="health.question.congenitalDisease" />?
					    </label> 		

				    	 <div class="form-group form-group-sm col col-lg-6 col-md-6 col-sm-6 col-xs-6">	
		
						 	 <div class="radio">
						 	    
						 	      <label >			    
								  	<f:radiobutton id="congenitalDiseaseYes" path="congenitalDisease" value="Yes"/><spring:message code="default.yes"/>
								  </label>
								
							 </div>	
							 
							  <div class="radio">					 	    
						 	     
								  <label> 
								  	<f:radiobutton id="congenitalDiseaseNo" path="congenitalDisease" value="No"/><spring:message code="default.no"/>
								  </label>
							
							 </div>	
			         	 </div>	     		          
			    </div>		       	  
		  </div> 
		   
		   <div id="congenitaldiv" class="form-group form-group-sm col col-lg-12 col-md-12 col-sm-12 col-xs-12">
		   
			     <div class="row">
			           
				    <label  class="col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label required congenitalDiseaseExplain" for="congenitalDisease" >
				            <spring:message code="health.congenitalDiseaseExplain1" var="congenitalDiseaseExplain1"/>${congenitalDiseaseExplain1 }:
				    </label>	 		

     
				     <div class="col col-lg-6 col-md-6 col-sm-6 col-xs-6">	
				        	<f:input  id="congenitalDiseaseExplain" path="congenitalDiseaseExplain" cssClass="form-control required" placeholder="${congenitalDiseaseExplain1 }" value="${healthDto.congenitalDiseaseExplain}"/>					     								
				     </div>	
			     
			     </div>
		   </div>
			     
			 
		   <div id="congenital2div" class="form-group form-group-sm col col-lg-12 col-md-12 col-sm-12 col-xs-12">
			      <div class="row">
			         
			   		 <label class="col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label required congenitalDiseaseExplain" for="congenitalDisease2" >
			           		<spring:message code="health.congenitalDiseaseExplain2" var="congenitalDiseaseExplain2"/>${congenitalDiseaseExplain2 }: 
			   		 </label>	
		     
				     <div class="col col-lg-6 col-md-6 col-sm-6 col-xs-6 congenitalDiseaseExplain">	
				        	<f:input  id="congenitalDiseaseExplain2" path="congenitalDiseaseExplain2" cssClass="form-control required" placeholder="${congenitalDiseaseExplain2 }" value="${healthDto.congenitalDiseaseExplain2}"/>					     								
				     </div>			 	 
			 	 </div>
		   
		   </div>

		      <div  id="congenital3div" class="form-group form-group-sm col col-lg-12 col-md-12 col-sm-12 col-xs-12">
		   
			     <div class="row">
		   
			   		 <label class="col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label required congenitalDiseaseExplain" for="congenitalDisease3" >
			           		<spring:message code="health.congenitalDiseaseExplain3" var="congenitalDiseaseExplain3"/>${congenitalDiseaseExplain3 }: 
			   		 </label>		
		     
				     <div class="col col-lg-6 col-md-6 col-sm-6 col-xs-6">	
				        	<f:input  id="congenitalDiseaseExplain3" path="congenitalDiseaseExplain3" cssClass="form-control required" placeholder="${congenitalDiseaseExplain3 }" value="${healthDto.congenitalDiseaseExplain3}"/>					     								
				     </div>	
				 </div>
			</div>
			 	

		     <div  class="form-group form-group-sm col col-lg-12 col-md-12 col-sm-12 col-xs-12 divHealth">
		   
		      <div class="row">

			    <label class="col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label required" for="geneticDisease" >
			           <spring:message code="health.question.GeneticDisease" />? :
			    </label> 		
			    
			    <div class="form-group form-group-sm col col-lg-6 col-md-6 col-sm-6 col-xs-6">	

				 	  <div class="radio">			 	  
				 	      <label>			    
						  	<f:radiobutton id="geneticDiseaseYes" path="geneticDisease" value="Yes"/><spring:message code="default.yes"/>
						  </label>						 
					 </div>
				 	 
				 	 
				 	  <div class="radio">			 	  			 	     
						  <label > 
						  	<f:radiobutton id="geneticDiseaseNo" path="geneticDisease" value="No"/><spring:message code="default.no"/>
						  </label>						
					 </div>
				 	 
				 	 					 
		       </div>	     
		         
		    </div>
		   </div>
		   
		   <div id="geneticDiseaseExplainDiv" class="form-group form-group-sm col col-lg-12 col-md-12 col-sm-12 col-xs-12">
		   
			     <div class="row">
			           
				    <label class="col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label required" for="geneticDisease" >
				           <spring:message code="health.geneticDiseaseExplain1" var="geneticDiseaseExplain1"/>${geneticDiseaseExplain1 }: 
				    </label>		

     
				     <div class="col col-lg-6 col-md-6 col-sm-6 col-xs-6">	
				        	<f:input  id="geneticDiseaseExplain" path="geneticDiseaseExplain" cssClass="form-control required" placeholder="${geneticDiseaseExplain1 }" value="${healthDto.geneticDiseaseExplain}"/>					     								
				     </div>	

			 	 </div>
		   </div>

		    <div id="geneticDiseaseExplainDiv2" class="form-group form-group-sm col col-lg-12 col-md-12 col-sm-12 col-xs-12">
		   
			     <div class="row">
			           
			   		 
			   		 <label class="col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label required" for="congenitalDisease2" >
			           		<spring:message code="health.geneticDiseaseExplain2" var="geneticDiseaseExplain2"/>${geneticDiseaseExplain2 }: 
			   		 </label>	 		
		     
				     <div class="col col-lg-6 col-md-6 col-sm-6 col-xs-6">	
				        	<f:input  id="geneticDiseaseExplain2" path="geneticDiseaseExplain2" cssClass="form-control required" placeholder="${geneticDiseaseExplain1}"  value="${healthDto.geneticDiseaseExplain2}"/>					     								
				     </div>			 	 			    
			 	 </div>
		   </div>
		   
		    <div id="geneticDiseaseExplainDiv3" class="form-group form-group-sm col col-lg-12 col-md-12 col-sm-12 col-xs-12">
		   
			     <div class="row">
		   
					<label class="col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label required" for="congenitalDisease3" >
					    <spring:message code="health.geneticDiseaseExplain3" var="geneticDiseaseExplain3"/>${geneticDiseaseExplain3 }: 
				    </label> 		
		     
				     <div class="col col-lg-6 col-md-6 col-sm-6 col-xs-6">	
				         <f:input  id="geneticDiseaseExplain3" path="geneticDiseaseExplain3" cssClass="form-control required" placeholder="${geneticDiseaseExplain1}"  value="${healthDto.geneticDiseaseExplain3}"/>					     								
		 			</div>	
		 		</div>
		 	</div>
			 	 
		   
		    </br>
		   
		   
		    <div class="form-group form-group-sm col col-lg-12 col-md-12 col-sm-12 col-xs-12 divHealth">
		   
		       <div class="row">
				    
				    <label class="col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label required" for="geneticDisease" >
				          <spring:message code="health.question.TakeMedicine" />? :		          
				    </label>		
				    
				    <div class="form-group form-group-sm col col-lg-6 col-md-6 col-sm-6 col-xs-6">				     
			 		
				 	  <div class="radio">			 	  
				 	      <label >			    
						  	<f:radiobutton id="takeMedicineYes" path="takeMedicine" value="Yes"/><spring:message code="default.yes"/>
						  </label>				
					 </div>
					 
					 
					 <div class="radio">			 	  
						  <label > 
						  	<f:radiobutton id="takeMedicineNo" path="takeMedicine" value="No"/><spring:message code="default.no"/>
						  </label>						
					 </div>
				 	 				 
		            </div>	     
				</div>
			</div>
			    
		  
			     <div id="takeMedicineDiv" class="form-group form-group-sm col col-lg-12 col-md-12 col-sm-12 col-xs-12">
			         <div class="row">
						    
					    <label class="col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label required" for="takeMedicineExplain" >
					           <spring:message code="health.takeMedicineExplain1" var="takeMedicineExplain1"/>${takeMedicineExplain1 }: 
					    </label> 		
	
					     <div class="col col-lg-6 col-md-6 col-sm-6 col-xs-6">	
					        	<f:input  id="takeMedicineExplain" path="takeMedicineExplain" cssClass="form-control required" placeholder="${takeMedicineExplain1}"  value="${healthDto.takeMedicineExplain}" />					     								
					     </div>	
					  </div>
				
			    </div>
			  
			     <div class="form-group form-group-sm col col-lg-12 col-md-12 col-sm-12 col-xs-12 divHealth">
		   
		     	   <div class="row">
				    
				    <label class="col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label required" for="intolerance" >
				          <spring:message code="health.question.Intolerance" />? :
				    </label>
				    		
				      <div class="form-group form-group-sm col col-lg-6 col-md-6 col-sm-6 col-xs-6">				     
				 		
					 		
					 		<div class="radio">			 	  
						 	      <label >			    
								  	<input type="radio" id="intoleranceYes" name="intolerance" value="Yes"/><spring:message code="default.yes"/>
								  </label>
											
							 </div>
							 
							 <div class="radio">			 	  
						 	    
								  <label > 
								  	<input type="radio" id="intoleranceNo" name="intolerance" value="No"/><spring:message code="default.no"/>
								  </label>						
							 </div>
					 							 
		             </div>	     
				  
				  </div> 
			    </div>
			    
			     <div id="intoleranceDiv"  class="form-group form-group-sm col col-lg-12 col-md-12 col-sm-12 col-xs-12">
			      <div class="row">
				    
				    <label class="col-lg-6 col-md-6 col-sm-6 col-xs-6 control-label required" for="intoleranceExplain" >
				          <spring:message code="health.intoleranceExplain" var="intoleranceExplain"/>${intoleranceExplain }: 
				    </label>	 		

     
				     <div class="col col-lg-6 col-md-6 col-sm-6 col-xs-6">	
				        	<f:input  id="intoleranceExplain" path="intoleranceExplain" cssClass="form-control required" placeholder="${intoleranceExplain}"  value="${healthDto.intoleranceExplain}"/>					     								
				     </div>	
				  </div>
			    </div>
	
	
		     <div id="btn" class="form-group form-group-sm col col-lg-12 col-md-12 col-sm-12 col-xs-12" align="center">
		      
		        <button  id="renew" type="button" class="btn btn-default btn-md" ><spring:message code="label.renew" /></button>
		        <button id="saveBtn" name="saveBtn" type="button" class="btn btn-primary btn-md"  data-toggle="modal" data-target="#createModal"><span class="fa fa-save"></span>&nbsp;&nbsp;<spring:message code="label.save" /></button>
		        <button id="deleteBtn" name="deleteBtn" type="button" class="btn btn-danger active btn-md" data-toggle="modal" data-target="#deleteModal"><spring:message code="label.delete" /></button>
		      
		      </div>
		   </div>
 
      </f:form>
</div>
 


<!-- Modal Create and Update -->
<div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="createModalLabel" aria-hidden="true"  data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h4 class="modal-title" id="createModalLabel"><spring:message code="health.name" /></h4>
      </div>
      <div class="modal-body">
      	<spring:message code="default.create.confirm" />
      </div>
      <div class="modal-footer">
		<button id="create" type="button" class="btn btn-info yesButton" ><spring:message code="default.yes" /></button>
      	<button type="button" class="btn btn-danger" data-dismiss="modal"><spring:message code="default.no" /></button>
      </div>
    </div>
  </div>
</div>



<!-- Modal Delete -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h4 class="modal-title" id="deleteModalLabel"><spring:message code="health.name" /></h4>
      </div>
      <div class="modal-body">
      	<spring:message code="default.delete.confirm" />
      </div>
      <div class="modal-footer">
		<button id="delete" type="button" class=" btn btn-info yesButton" ><span class="fa fa-trash"></span>&nbsp;<spring:message code="default.yes" /></button>
      	<button type="button" class="btn btn-default" data-dismiss="modal"><spring:message code="default.no" /></button>
      </div>
    </div>
  </div>
</div>
 
 
 
 
 
 