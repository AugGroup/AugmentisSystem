<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- Spring -->	
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="f"%>


<jsp:include page="employeeMenu.jsp"></jsp:include>
<jsp:include page="springMessageVariable.jsp"></jsp:include>
<script src="<c:url value="/static/resources/bootstrapvalidator/dist/js/bootstrapValidator.js" />"></script>
<script src="<c:url value ="/static/resources/pageJS/skilllanguage.js"/>"></script> 



<input id="empId" type="hidden" value="${id}">
<input id="appId" type="hidden" value="${appId}">


<!-- <div class="row">
	<div id="message"></div>
	<div id="outputajax" class="form-group"></div>
</div> -->		


<div class="form-group table-responsive">	
 <table id="tableResult" class="dataTable stripe table-bordered">
 <caption title=""><spring:message code="skilllanguage.name" /></caption>
	    <thead>
            <tr> 
                <th><spring:message code="skilllanguage.name" var="Language"/>
                ${Language}</th>
                <th><spring:message code="skilllanguage.Speaking" var="Speaking"/>
                ${Speaking}</th>
                <th><spring:message code="skilllanguage.Writing" var="Writing"/>
                ${Writing}</th>
                <th><spring:message code="skilllanguage.Reading" var="Reading"/>
                ${Reading}</th> 
                <th><spring:message code="skilllanguage.Understanding" var="Understanding"/>
                ${Understanding}</th>
               <th class="text-center"><spring:message code="label.edit" /></th>
				<th class="text-center"><spring:message code="label.delete" /></th>
</th>
            </tr>
        </thead>
</table>
</div>

<!-- Modal Add and Update data-->
<f:form id="formAddUpdate" name="skillLanguageForm" method="post" commandName="skillLanguage" class="form-horizontal" role="form" >	      	 
	      
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">${Language}</h4>
      </div>
      <div class="modal-body row">

					<input id="nameLang" type="hidden"/>


					<div class='col-sm-12' align="left">
						<label class="required"><spring:message
								code="skilllanguage.name.lang" var="namelang" />${namelang } </label>
					</div>



					<div class="form-group col-md-12">
					
				       
							<div class='col-sm-6' align="left">
								
									<select id="masSkillLanguage" name="masSkillLanguage" class="form-control ">
										<option value=""><spring:message code="skilllanguage.enter.skill" /></option>
										<option value="Thai">Thai</option>
										<option value="English">English</option>
										<option value="Other">Other</option>
		
									</select>
				
							</div>
	
						  <div class="form-group col-md-6">
							
								<!-- <input id="LangName" type="text" class="form-control" /> -->
								<f:input path="nameLanguage" type="text" class="form-control" id="nameLanguage" name="nameLanguage"/>
		    
	
						
						</div>
					
					
				</div>

				
		   

		   <spring:message code="skilllanguage.Excellent" var="Excellent"/>
		   <spring:message code="skilllanguage.Good" var="Good"/>
		   <spring:message code="skilllanguage.Fair" var="Fair"/>
		   
		   
		   
		   
		   
		<div class="form-group form-group-sm col col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  
			  <div class="row">  
		     		 <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label required" >
				          ${Speaking}:
				     </label>	 		
			  
	 
				    <div class="col col-lg-6 col-md-6 col-sm-6 col-xs-6">	 

							     <label class="radio-inline" for=abilitySpeaking > 
					 			     	<f:radiobutton id="excSpeaking" name="speaking" path="speaking" value="Excellent"/>
					 			  		${Excellent}
					 			 </label>
					 			 <label class="radio-inline" for="abilitySpeaking"> 
					 			     <f:radiobutton id="goodSpeaking" name="speaking" path="speaking" value="Good"/>
							     		${Good}
							     </label> 
							     <label class="radio-inline" for="abilitySpeaking"> 
					 			     <f:radiobutton id="fairSpeaking" name="speaking" path="speaking" value="Fair" checked="true"/>
							    		${Fair}
							     </label> 	
						   	     		 
					 </div> 
	 		 </div>
         
		 </div>
		   
		   
		   
		   
		   <div class="form-group form-group-sm  col col-lg-12 col-md-12 col-sm-12 col-xs-12">
			    
			   <div class="row">  
			     <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label required" >			        
			          ${Writing}:
			     </label>	 		


			     <div class="col col-lg-6 col-md-6 col-sm-6 col-xs-6">	
				       <label class="radio-inline" for="abilityWriting" > 
		 			     	<f:radiobutton id="excWriting" name="writing" path="writing" value="Excellent"/>
		 			  		${Excellent}
		 			   </label>
		 			 <label class="radio-inline" for="abilityWriting"> 
		 			     <f:radiobutton id="goodWriting" name="writing" path="writing" value="Good"/>
				     		${Good}
				     </label> 
				     <label class="radio-inline" for="abilityWriting"> 
		 			     <f:radiobutton id="fairWriting" name="writing" path="writing" value="Fair" checked="true"/>
				    		${Fair}
				     </label> 	
				     			     		 
				  </div> 
		      </div>
		   </div>
		   
		   
		   
		     <div class="form-group form-group-sm col col-lg-12 col-md-12 col-sm-12 col-xs-12">
			    
			  <div class="row">
			     <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label required" >
			           ${Reading}:
			     </label>	 		


			     <div class="col col-lg-6 col-md-6 col-sm-6 col-xs-6">	
				       <label class="radio-inline" for="abilityReading" > 
		 			     	<f:radiobutton id="excReading" name="reading" path="reading" value="Excellent"/>
		 			  		${Excellent}
		 			   </label>
		 			 <label class="radio-inline" for="abilityReading"> 
		 			     <f:radiobutton id="goodReading" name="reading" path="reading" value="Good"/>
				     		${Good}
				     </label> 
				     <label class="radio-inline" for="abilityReading"> 
		 			     <f:radiobutton id="fairReading" name="reading" path="reading" value="Fair" checked="true"/>
				    		${Fair}
				     </label> 	
				     			     		 
				  </div> 
			  </div>
		           
		   </div>
		   
		   
		   
		    <div class="form-group form-group-sm col col-lg-12 col-md-12 col-sm-12 col-xs-12">
			    
			     <div class="row">
			     
				     <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label required" >
				          ${Understanding}
				     </label>	 		
	
	
				     <div class="col col-lg-6 col-md-6 col-sm-6 col-xs-6">	
					       <label class="radio-inline" for="abilityUnderstanding" > 
			 			     	<f:radiobutton id="excUnderstanding" name="understanding" path="understanding" value="Excellent"/>
			 			  		${Excellent}
			 			   </label>
			 			 <label class="radio-inline" for="abilityUnderstanding"> 
			 			     <f:radiobutton id="goodUnderstanding" name="understanding" path="understanding" value="Good"/>
					     		${Good}
					     </label> 
					     <label class="radio-inline" for="abilityUnderstanding"> 
			 			     <f:radiobutton id="fairUnderstanding" name="understanding" path="understanding" value="Fair"  checked="true"/>
					    		${Fair}
					     </label> 	
					     			     		 
					  </div> 
				  
				  </div>
		           
		   </div>
		  
		  
		   
 
    
	  
	    </div>
	    
	     <div class="modal-footer">
		        <button type="button" class="btn btn-default btnClose" data-dismiss="modal"><spring:message code="label.close" /></button>
		     	<button type="button" class="btn btn-primary btnSave"><span class="fa fa-save"></span>&nbsp;&nbsp;<spring:message code="label.save" /></button>
		      </div>
	    
	    
	  </div>
	</div>   
 </div>
  </f:form> 


<!-- Modal Delete -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h4 class="modal-title" id="deleteModalLabel">${Language}</h4>
      </div>
      <div class="modal-body">
      	<spring:message code="default.delete.confirm" />
      </div>
      <div class="modal-footer">
		<button id="delete" type="button" class="btn btn-danger yesButton" ><span class="fa fa-trash"></span>&nbsp;<spring:message code="default.yes" /></button>
      	<button type="button" class="btn btn-default" data-dismiss="modal"><spring:message code="default.no" /></button>
      </div>
    </div>
  </div>
</div>
 
