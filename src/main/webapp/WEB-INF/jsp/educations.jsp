<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="f"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<title><spring:message code="education.name" /></title>

<script src="<c:url value ="/static/resources/pageJS/aug-educations.js"/>"></script>

<script>
var valUniversity = "<spring:message code="valid.ed.univers"/>";
var valDegree = "<spring:message code="valid.ed.degree"/>";
var valFaculty = "<spring:message code="valid.ed.faculty"/>";
var valMajor = "<spring:message code="valid.ed.major"/>";
var valGPA = "<spring:message code="valid.ed.gpa"/>";
var valStart = "<spring:message code="valid.ed.start.date"/>"
var valYear = "<spring:message code="valid.ed.year"/>";
var valEdit = "<spring:message code="main.edit.info"/>";
var valDelete = "<spring:message code="main.delete"/>";
var id = ${id};
var pnotifyAdd="<spring:message code="pnotify.add"/>";
var pnotifyEdit="<spring:message code="pnotify.edit"/>";
var pnotifyDel="<spring:message code="pnotify.delete"/>";
var pnotifySuccess="<spring:message code="pnotify.success"/>";
var pnotifyError="<spring:message code="pnotify.error"/>";
var datatablei18n = "<c:url value='/static/resources/dt-i18n/${pageContext.response.locale}.json' />";
</script>


<div class="container" id="titleHead">
<jsp:include page="applicationMenu.jsp" />
	<div class="modal fade" id="educationModal" role="dialog">
		<div class="modal-dialog">

			<div class="modal-content">
				<div class="modal-header" style="padding: 35px 50px;">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4>
						<span class="glyphicon glyphicon-lock"></span>
						<spring:message code="education.name" />
					</h4>
				</div>
				<div class="modal-body" style="padding: 40px 50px;">
					<form role="form" id="educationsForm">
						<div id="educations">
							<div class="form-group">
								<input type="hidden" id="applicant" name="applicant"
									value="${id}">
								<input type="hidden" id="degreeType" name="degreeType">
							</div>

							<div class="form-group">
								<label for="university"><spring:message
										code="education.university" /> </label> <input type="text"
									class="form-control" id="university" name="university"
									placeholder="<spring:message code="education.text.university"/>">
							</div>

<!-- 							<div class="form-group"> -->
<%-- 								<label for="degree"><spring:message --%>
<%-- 										code="education.degree" /> </label> <input type="text" --%>
<!-- 									class="form-control" id="degree" name="degree" -->
<%-- 									placeholder="<spring:message code="education.text.degree"/>"> --%>
<!-- 							</div> -->

	 						<div class="form-group">
	 							<label for="masdegreetype"><spring:message code="education.degree"/></label><br>
								<f:select  id="masdegreetype" name="masdegreetype" path="degreeTypes"  class="form-control" >
    						
	    						<option  value=""><spring:message code="education.text.degreeType"/> </option>
	  							<f:options items="${ degreeTypes }"  itemValue="id" itemLabel="name" />
	  							
							</f:select>
								<br><label for="masdegreetype" class="error" ></label>
							</div> 
							<div class="form-group">
								<label for="faculty"><spring:message
										code="education.faculty" /> </label> <input type="text"
									class="form-control" id="faculty" name="faculty"
									placeholder="<spring:message code="education.text.faculty"/>">
							</div>
							<div class="form-group">
								<label for="major"><spring:message
										code="education.major" /> </label> <input type="text"
									class="form-control" id="major" name="major"
									placeholder="<spring:message code="education.text.major"/>">
							</div>
							<div class="form-group">
								<label for="gpa"><spring:message code="education.gpa" /></label>
								<input type="text" class="form-control" maxlength="5" id="gpa" name="gpa"
									placeholder="<spring:message code="education.text.gpa"/>">
							</div>
							
							<div class="form-group">
								<label for="startDateDiv"><spring:message code="education.start" /> </label> 
								<div class="input-group btn-information date" id="startDateDiv">
								<input type="text" class="form-control datepicker_readonly" id="startDate" name="startDate" placeholder="<spring:message code="education.text.start"/>" >
									<span class="input-group-addon"><i class="glyphicon glyphicon-th" ></i></span>
								</div>
							</div>

							<div class="form-group">
								<label for="graduateDiv"><spring:message code="education.graduate" /> </label> 
								<div class="input-group btn-information date" id="graduateDiv">
								<input type="text" class="form-control datepicker_readonly" id="graduate" name="graduate"
									placeholder="<spring:message code="education.text.graduate"/>" >
									<span class="input-group-addon"><i class="glyphicon glyphicon-th" ></i></span>
								</div>
							</div>
							<br> <br>
							<button type="button" class="btn btn-warning" id="btn_save">
								<span class="glyphicon glyphicon-save"></span>
								<spring:message code="edit.button.save" />
							</button>
							<button type="button" class="btn btn-default"
								data-dismiss="modal">
								<spring:message code="button.cancel" />
							</button>
						</div>
					</form>
				</div>
			</div>

		</div>
	</div>

	<!-- Delete Model -->
	<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog"
		aria-labelledby="ModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="ModalLabel">
						<spring:message code="delete.title" />
					</h4>
				</div>
				<div class="modal-body">
					<h4 class="modal-title" id="ModalLabel">
						<spring:message code="delete.confirm.title" />
					</h4>
					<br>
					<div align="right">
						<button id="btn_delete_submit" type="button"
							class="btn btn-danger" data-dismiss="modal">
							<span class="glyphicon glyphicon-remove-sign"></span>
							<spring:message code="main.delete" />
						</button>
						<button id="btn_close" type="button" class="btn btn-default"
							data-dismiss="modal">
							<spring:message code="button.cancel" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<br> <br>
	<div class="table-responsive" id="table">
		<table id="educationTable" class="display" cellspacing="0" width="100%">
		<caption title="" class="tableHeader"><spring:message code="education.name"/></caption>
			<thead>
				<tr>
					<th><spring:message code="education.data" /></th>
					<th><spring:message code="education.data.degree" /></th>
					<th><spring:message code="education.data.faculty" /></th>
					<th><spring:message code="education.data.major" /></th>
					<th><spring:message code="education.data.gpa" /></th>
					<th><spring:message code="education.data.start"/></th>
					<th><spring:message code="education.data.graduate" /></th>
					<th><spring:message code="main.edit.info" /></th>
					<th><spring:message code="main.delete" /></th>

				</tr>
			</thead>
			<tbody></tbody>
		</table>
		<div align="right">
			<button class="btn btn-warning" id="buttonAdd" data-toggle="modal" data-target="#educationModal"><span class="glyphicon glyphicon-plus"></span> <spring:message code="education.name.add"/></button>
			<button class="btn btn-default" type="button" id="buttonBack" name="buttonBack" onclick="window.location='${pageContext.request.contextPath}/family/${id}'"><span class="glyphicon glyphicon-step-backward"></span> <spring:message code="button.back"/> </button>
			<button class="btn btn-default" type="button" id="buttonNext" name="buttonNext" onclick="window.location='${pageContext.request.contextPath}/certificates/${id}'"><span class="glyphicon glyphicon-step-forward"></span> <spring:message code="button.next"/> </button>		
		</div>
	</div>
</div>