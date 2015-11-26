<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="f"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<title><spring:message code="tab.info" /></title>

<link rel="stylesheet" href="${pageContext.request.contextPath}/static/resources/pageCss/infoCss.css" />
<script src='<c:url value ="/static/resources/pageJS/newApplicant.js"/>'></script>
<script src='<c:url value ="/static/resources/js/lodash.min.js"/>'></script>
<script src='<c:url value ="/static/resources/js/jquery.collapse.js"/>'></script>



<jsp:include page="infoSpringMessage.jsp" />

<!-- tab informations -->
<style>
/* .collapse-br{
	margin-top: 50px;
}
h3 {
  margin: 0;
}
h3 a{
	display: block !important;
	color:white !important;
	text-decoration: none !important;
}
h3 + div { padding: 20px; } */ 
</style>
<script type="text/javascript">
$(document).ready(function(){
	$("#applicantPage").addClass('active-menu'); 
	if("${id}" == null || "${id}" == ""){
		$("#applicationMenu").hide();
	}
});
</script>

<div class="container">
<c:choose>
		<c:when test="${applicant.id ne null}">
			<c:set var="actionName">infoEdit/${applicant.id}</c:set>
		</c:when>
		<c:otherwise>
			<c:set var="actionName">saveInformations</c:set>
		</c:otherwise>
	</c:choose>

	<div class="row">

		<div class="col-sm-12 col-md-12" id="applicationMenu" ><jsp:include page="applicationMenu.jsp" /></div>
			<f:form id="informationApplicant" name="informationApplicant" action="${pageContext.request.contextPath}/${actionName}"
				modelAttribute="applicant" method="post" enctype="multipart/form-data" class="form-inline">
				<f:hidden path="id" />
				<f:hidden path="code" />
				<f:hidden path="score" />
				<f:hidden path="techScore" />
				<f:hidden path="attitudeHome" />
				<f:hidden path="attitudeOffice" />
				<f:hidden path="trackingStatus" />
				<f:hidden path="createdTimeStamp" id="createdTimeStamp" />
				<f:hidden path="createdBy" id="createdBy" />
				<f:hidden path="masLocation"/>
		
<!-- ********************	information	  ******************** -->
			<div id="collapse-show-hide-info" >
				<h3 class="col-sm-12 open " id="infomation"><spring:message code="tab.info" /><span class="pull-right glyphicon glyphicon-menu-up" id="infomation-arrow"></span></h3>
				
				<div >
				<div class="row collapse-br" >
					<div class="col-sm-3 text-center">
						<div class="row">
							<div class="col-sm-12">
								<c:choose>
									<c:when test="${empty applicant.image}">
										<div class="img-thumbnail" id="imagePreview"  style="background-image:url('${pageContext.request.contextPath}/static/decorators/noPhotoAvailable-resize.jpg')"></div>
								 	</c:when>
								 	<c:when test="${not empty applicant.image}">
								 		<div class="img-thumbnail" id="imagePreview"  style="background-image:url('${pageContext.request.contextPath}/DisplayImageServlet?namespace=APPLICANT&fileName=${applicant.image}');"></div>
									</c:when>
								</c:choose>
							</div>
						</div>
						
						<div class="row">	
							<div class="col-sm-12">
								<!-- <span class="btn btn-warning btn-file" class="glyphicon glyphicon-picture" style="margin-bottom: 10px;"> 
									<span class="glyphicon glyphicon-picture"></span> Add Photo 
									<input id="imageMultipartFile" name="imageMultipartFile" type="file" accept="image/*" class="file"/>
								</span> -->
								
							<label> Upload File </label>
								<input type="file" id="imageMultipartFile" name="imageMultipartFile" accept="image/*" class="file" data-show-upload="false" data-show-preview="false" data-initial-caption="image.png" data-overwrite-initial="false">
								<input type="hidden" name="image" class="form-control element-to-paste-filename" value="image.png">
								<f:hidden path="image" />
							</div>
						</div>
					</div>
					
					<div class="col-sm-9">
						<div class="col-sm-6">
							<div class="col-sm-12" id="jobcaseCode">
								<label for="augRequest">jobcaseCode </label><br>
								 <div id="augRequestLists">
			
									<f:select  id="augRequest" path="augRequest.id"  class="form-control" >
			    						
				    						<option  value="">--- Select Code--- </option>
				  							<f:options items="${ augRequests }"  itemValue="id" itemLabel="jobcaseCode" />
				  							
										</f:select>
											<br><label for="augRequest" class="error" ></label>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-4">
								<div class="col-sm-12">
									<label for="firstNameEng"><spring:message code="info.firstname.en"/></label>
									<spring:message code="info.text.first.en" var="firstnameEn"/><br>
									<f:input path="firstNameEN" id="firstNameEN" name="firstNameEN" placeholder="${firstnameEn}" class="form-control btn-information" type="text"></f:input>
								</div>
							</div>
							<div class="col-sm-4">
								<div class="col-sm-12">
									<label for="lastnameEng"><spring:message code="info.lastname.en"/> </label>
									<spring:message code="info.text.last.en" var="lastnameEn"/><br>
									<f:input path="lastNameEN" id="lastNameEN" name="lastNameEN" placeholder="${lastnameEn}" class="form-control btn-information" type="text"></f:input>
								</div>
							</div>
						</div>
					</div>
				
				</div>
				</div>
			</div>
<!-- ********************	end information	  ******************** -->
	
<!-- ********************	GENERAL	  ******************** -->
<div id="collapse-show-hide-general" >
	<h3 class="col-sm-12 open" id="general" ><spring:message code="info.general" /><span class="pull-right glyphicon glyphicon-menu-up" id="general-arrow"></span></h3>
	<div>
	<!-- row 1 -->
	<div class="row collapse-br" >
		<div class="col-sm-3">
			<div class="col-sm-12">
				<label for="tel"><spring:message code="info.tel"/></label>
				<spring:message code="info.text.tel" var="tel"/><br>
				<f:input path="tel" id="tel" name="tel" placeholder="${tel}" class="form-control btn-information" type="text"></f:input>
			</div>
		</div>
		<div class="col-sm-3">
			<div class="col-sm-12">
				<label for="eMail"><spring:message code="info.email"/></label>
				<spring:message code="info.text.email" var="email"/><br>
				<f:input path="email" id="email" name="email" type="email" placeholder="${email}" class="form-control btn-information"></f:input>
			</div>
		</div>
	</div>	
	<!-- end row 1 -->

	<!-- row 13 -->	

	<div class="row">
		  <div class="col-sm-6">
			<label class="resume">
    			<input type="file" id="resumeMultipartFile" name="resumeMultipartFile" type="file" accept="image/*" class="file"/>
    			<span>Resume</span>
			</label>
			<f:hidden path="resume"/>
		<c:choose>
 			<c:when test="${not empty applicant.resume}">
 					<a href="${pageContext.request.contextPath}/dowloadResume/${applicant.id}" id="resume">Click and download ${applicant.resume} here</a>
	    	</c:when>
	    </c:choose>
	    </div>
	      <div class="col-sm-6">
			<label class="transcript">
    			<input id="transcriptMultipartFile" name="transcriptMultipartFile" type="file" accept="image/*" class="file"/>
    			<span>Transcript</span>
			</label>
			<f:hidden path="transcript"/>
		<c:choose>
			<c:when test="${not empty applicant.transcript}">
 					<a href="${pageContext.request.contextPath}/dowloadTranscript/${applicant.id}" id="transcript">Click and transcript ${applicant.transcript} here</a>
	    	</c:when>
	      </c:choose>
		</div>
	</div>
	
	
	</div>
</div>
	<!-- ********************	END GENERAL	  ******************** -->
	
	<div id="collapse-show-hide-official" >	
	<h3 class="col-sm-12 open" id="official"><spring:message code="info.official" /><span class="pull-right glyphicon glyphicon-menu-up" id="official-arrow"></span></h3>
<!-- 			<div class="form-group"> -->
		<div>
		<div class="row collapse-br">
			<div class="row">
			<div class="col-sm-4">
				<div class="col-sm-12" >
					<label for="applyDate"><span class="glyphicon glyphicon-calendar"></span><spring:message code="info.apply.date"/></label><br>
					<div class="input-group date btn-information" id="applyDay">
						<f:input path="applyDate" id="applyDate" name="applyDate" class="form-control datepicker_readonly"></f:input><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>							
					</div>
					<br><label for="applyDate" class="error"></label>
				</div>
			</div>	
			</div>
		</div>
	
		 <div class="form-group">
		 <div class="row">
		 	<div class="col-sm-6">
				<div class="col-sm-12" >
					<label for="jobLevel"><spring:message code="main.position1"/></label><br>
					  <div id="jobLevelLists">

						<c:forEach var="tags" items="${checktags}">
							<input type="hidden" class="form-control tags" value="${ tags.jobName }">
						</c:forEach>	
									
						<f:select  id="joblevel" path="joblevel.id"  class="form-control" >
    						
	    						<option  value=""><spring:message code="info.select.data"/></option>
	  							<f:options items="${ jobLevels }"  itemValue="id" itemLabel="name" />
								
							</f:select>
								<br><label for="jobLevel" class="error" ></label>
					</div>
				</div>
			</div>
			
			<div class="col-sm-6">
				<div class="col-sm-12" id="tech">
					<label for="technology"><spring:message code="main.position2"/> </label><br>
					 <div id="technologyLists">

						<f:select  id="technology" path="technology.id"  class="form-control" >
    						
	    						<option  value=""><spring:message code="info.select.data"/> </option>
	  							<f:options items="${ technologies }"  itemValue="id" itemLabel="name" />
	  							
							</f:select>
								<br><label for="technology" class="error" ></label>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
	
	</div>
	<div class="row">
		<div class="col-sm-12">
				<div align="right">
				<button type="button" class="btn btn-default" id="buttonBack" name="buttonBack" onclick="window.location='${pageContext.request.contextPath}/applicant'"><span class="glyphicon glyphicon-step-backward"></span><spring:message code="button.back"/></button>
				<button type="button" class="btn btn-primary btnSave"><span class="fa fa-save"></span>&nbsp;&nbsp;<spring:message code="edit.button.save" /></button>		
				</div>
		</div>
	</div>
	</f:form>
	</div>
</div>