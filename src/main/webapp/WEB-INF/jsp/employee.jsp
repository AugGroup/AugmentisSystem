<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- Spring -->
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="f"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<link href="<c:url value="/static/resources/pageCss/headerHr.css" />"rel="stylesheet" type="text/css">
<div style="margin-left: 15px;">
	<jsp:include page="employeeMenu.jsp"></jsp:include>
	<jsp:include page="springMessageVariable.jsp"></jsp:include>
</div>

<script src="<c:url value="/static/resources/pageJS/employee.js" />"></script>
<script src="<c:url value="/static/resources/js/jquery.collapse.js" />"></script>





<c:if test="${ not empty msgerror }">
	<div class="alert alert-danger">
		<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;${msgerror }
	</div>
	<%-- <c:remove var="msgerror" scope="session"/>--%>
</c:if>


<input type="hidden" id="emp">
<input type="hidden" id="empname">

<style>
#addForm {
	margin-left: 20px;
}
</style>
<%-- <f:form method="post" id="addForm" commandName="allEmployeeDto" class="form-horizontal" role="form" action="${pageContext.request.contextPath}/employee/submit" enctype="multipart/form-data"> --%>

<f:form method="post" id="addForm" commandName="employeeDto"
	class="form-horizontal" role="form" name="employeeForm"
	enctype="multipart/form-data">

	<!------------------------------------------------------ Start Information-------------------------------------------------------->

	<input id="appId" type="hidden" value="${appId}" />

	<input id="employeeCodeDto" name="employeeCodeDto.rungingNumber"
		type="hidden" class="form-control" placeholder="Location ID"
		value="${ employeeCodeDto.rungingNumber}">



	<div id="message"></div>

	<div id="collapse-show-hide-info">
		<h3 class="col-sm-12 open " id="div-information">
			<spring:message code="employee.information" />
			<span class="pull-right glyphicon glyphicon-menu-up"
				id="infomation-arrow"></span>
		</h3>

		<div style="padding: 0 20px">
			<div class="row">

				<%-- <div id = "div-information" class="col-sm-12">
				<h2><spring:message code="employee.information"></spring:message>
					<!-- <i style="position: absolute; right: 20px; cursor:pointer;" id = "icon1" class="fa fa-chevron-up"></i> -->
				</h2>
		 </div> --%>
			</div>
			<!--   Upload image -->
			<div class="col-md-3">
				<div class="form-group">
					<div class="col-md-12">



						<div class="col-md-9">
							<div class="row" align="center">
								<c:if test="${empty employeeDto.image}">
									<div id="imagePreview" class="img-rounded img-responsive"
										style="background-image:url('<c:url value="/static/resources/images/photo_2.jpg" />');">
									</div>
								</c:if>

								<c:if test="${not empty employeeDto.image}">
									<div id="imagePreview" class="img-rounded img-responsive"
										style="background-image:url('${pageContext.request.contextPath}/static/resources/images/photo_2.jpg');"></div>
								</c:if>
							</div>
							<br> <label> <spring:message
									code="employee.uploadFile"></spring:message> :
							</label> <input type="file" id="uploadFile" name="fileupload"
								accept="image/*" class="file" data-show-upload="false"
								data-show-preview="false"
								data-initial-caption="${employeeDto.image}"
								data-overwrite-initial="false"> <input type="hidden"
								name="image" class="form-control element-to-paste-filename"
								value="${employeeDto.image}" />


						</div>
					</div>




				</div>
			</div>


			<div class="col-md-9">

				<spring:message code="default.enter" var="enter" />
				<spring:message code="default.please" var="please" />
				<spring:message code="employee.pleasewrite" var="write" />
				<spring:message code="employee.pleaseEmployeeName" var="empname" />
				<spring:message code="employee.pleaseEmployeeRelation"
					var="emprelation" />
				<spring:message code="employee.pleaseEmployeePosition"
					var="empposition" />
				<spring:message code="employee.givethereason" var="reason" />
				<spring:message code="employee.pleasestatethereasons"
					var="pleasereason" />
				<spring:message code="employee.datedrafted" var="datedrafted" />
				<spring:message code="employee.selectempstatus" var="empstatuslabel" />




				<div class="form-group">
					<div class="col-md-6">

						<label class="required"> <spring:message
								code="employee.status"></spring:message> :
						</label>

						<f:select multiple="single" path="statusemp" class="form-control">
							<f:option value="" label="${empstatuslabel}" />
							<f:option value="Employee" label="Employee" />
							<f:option value="Resignation" label="Resignation" />
						</f:select>
					</div>

				</div>

				<div class="form-group">
					<input id="id" name="id" type="hidden" value="${id}">


					<div class="col-md-6">
						<label><spring:message code="employee.location"></spring:message>
							:</label>
						<f:select id="masLocation" path="masLocation" class="form-control"
							value="TH">
							<option value=""><spring:message
									code="employee.selectlocation"></spring:message></option>
							<f:options items="${ locationList }" itemValue="code"
								itemLabel="name" />
						</f:select>
					</div>

					<div class="col-md-6">
						<label for="employeeCode"> <spring:message
								code="employee.code"></spring:message> :
						</label> <input id="employeeCodeForShow" name="employeeCodeForShow"
							type="text" class="form-control" disabled
							value="${employeeDto.employeeCode}">
					</div>

					<input id="employeeCode" name="employeeCode" type="hidden"
						class="form-control" value="${employeeDto.employeeCode}">


				</div>



				<div class="form-group">
					<div class="col-md-4">
						<label class="required"> <spring:message
								code="employee.nameThai"></spring:message> :
						</label> <input type="text" class="form-control" id="nameThai"
							name="nameThai"
							placeholder="${please}${enter}<spring:message code="employee.nameThai"></spring:message>"
							value="${employeeDto.nameThai}">
					</div>

					<div class="col-md-4">
						<label> <spring:message code="employee.surnameThai"></spring:message>
							:
						</label> <input type="text" class="form-control" id="surnameThai"
							name="surnameThai"
							placeholder="${please}${enter}<spring:message code="employee.surnameThai"></spring:message>"
							value="${employeeDto.surnameThai}">
					</div>

					<div class="col-md-4">
						<label> <spring:message code="employee.nicknameThai"></spring:message>
							:
						</label> <input type="text" class="form-control" id="nicknameThai"
							name="nicknameThai"
							placeholder="${please}${enter}<spring:message code="employee.nicknameThai"></spring:message>"
							value="${employeeDto.nicknameThai}">
					</div>
				</div>



				<div class="form-group">
					<div class="col-md-4">
						<label> <spring:message code="employee.nameEng"></spring:message>
							:
						</label> <input type="text" class="form-control" id="nameEng"
							name="nameEng"
							placeholder="${please}${enter}<spring:message code="employee.nameEng"></spring:message>"
							value="${employeeDto.nameEng}">
					</div>
					<div class="col-md-4">
						<label> <spring:message code="employee.surnameEng"></spring:message>
							:
						</label> <input type="text" class="form-control" id="surnameEng"
							name="surnameEng"
							placeholder="${please}${enter}<spring:message code="employee.surnameEng"></spring:message>"
							value="${employeeDto.surnameEng}">
					</div>
					<div class="col-md-4">
						<label> <spring:message code="employee.nicknameEng"></spring:message>
							:
						</label> <input type="text" class="form-control" id="nicknameEng"
							name="nicknameEng"
							placeholder="${please}${enter}<spring:message code="employee.nicknameEng"></spring:message>"
							value="${employeeDto.nicknameEng}">
					</div>
				</div>
			</div>
		</div>
	</div>



	<!-------------------------------------------------- Start Address-------------------------------------------------->

	<div class="col-md-12">
		<div class="form-group" align="right">
			<button id="addaddress" type="button" class="btn btn-warning btn-sm"
				data-toggle="modal" data-target="#myModal">
				<spring:message code="label.newRecord"></spring:message>
			</button>
		</div>
	</div>


	<div id="outputAddress" class="form-group"
		style="overflow-x: scroll; width: 100%; margin-left: 5px;">
		<table id="tbResult" class="dataTable stripe table-bordered">
			<caption title="">
				<spring:message code="label.address"></spring:message>
			</caption>
			<thead>
				<tr>
					<th><spring:message code="label.id"></spring:message></th>
					<th><spring:message code="address.idtype"></spring:message></th>
					<th><spring:message code="address.type"></spring:message></th>
					<th><spring:message code="address.houseNo"></spring:message></th>
					<th><spring:message code="address.road"></spring:message></th>
					<th><spring:message code="address.district"></spring:message></th>
					<th><spring:message code="address.subDistrict"></spring:message></th>
					<th><spring:message code="address.idprovince"></spring:message></th>
					<th><spring:message code="address.province"></spring:message></th>
					<th><spring:message code="address.zipcode"></spring:message></th>
					<th><spring:message code="address.getindex"></spring:message></th>
					<th><spring:message code="label.action"></spring:message></th>
					<!-- <th>Delete</th> -->
					<th><spring:message code="address.status"></spring:message></th>
					<!-- <th>HiddenIndex</th>  -->
				</tr>

			</thead>

			<tbody>

			</tbody>
		</table>

	</div>



	<!----------------------------------------- Start General------------------------------------------------------>
	<div id="collapse-show-hide-general">
		<h3 class="col-sm-12 open " id="div-information">
			<spring:message code="employee.general" />
			<span class="pull-right glyphicon glyphicon-menu-up"
				id="general-arrow"></span>
		</h3>
		<div style="padding: 0 20px">
			<div class="row">

				<%-- <div id = "div-information" class="col-md-12" style="padding: 15px 0px 15px 0px;">
				<h2><spring:message code="employee.general"></spring:message>
					<i style="position: absolute; right: 20px; cursor:pointer;" id = "icon1" class="fa fa-chevron-up"></i>
				</h2>
	       </div> --%>


				<div class="row">
					<div class="col-md-12">

						<div class="form-group">
							<div class="col-md-3">
								<label class="required" style="margin-right: 25px;"> <spring:message
										code="employee.email"></spring:message> :
								</label> <input type="email" class="form-control" id="email"
									name="email"
									placeholder="${please} ${enter} <spring:message code="employee.email"></spring:message>"
									value="${employeeDto.email}">
							</div>
							<div class="col-md-3">
								<label class="required" style="margin-right: 25px;"> <spring:message
										code="employee.telHome"></spring:message> :
								</label> <input type="text" class="form-control" id="telHome"
									name="telHome"
									placeholder="<spring:message code="employee.formatTel"></spring:message>"
									value="${employeeDto.telHome}">
							</div>
							<div class="col-md-3">
								<label class="required" style="margin-right: 25px;"> <spring:message
										code="employee.telMobile"></spring:message> :
								</label> <input type="text" class="form-control" id="telMobile"
									name="telMobile"
									placeholder="<spring:message code="employee.formatTelMo"></spring:message>"
									value="${employeeDto.telMobile}">
							</div>
							<div class="col-md-3">
								<label class="required" style="margin-right: 25px;"> <spring:message
										code="employee.telFax"></spring:message> :
								</label> <input type="text" class="form-control" id="telFax"
									name="telFax"
									placeholder="<spring:message code="employee.formatTel"></spring:message>"
									value="${employeeDto.telFax}">
							</div>
						</div>

					</div>
				</div>

				<div class="row">
					<div class="col-md-12">

						<div class="form-group">
							<div class="col-md-6">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.congenitalDisease"></spring:message> :
								</label> <input type="text" class="form-control" id="congenitalDisease"
									name="congenitalDisease"
									placeholder="${please} ${enter} <spring:message code="employee.congen"></spring:message>"
									value="${employeeDto.congenitalDisease}">
							</div>
							<div class="col-md-6">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.hospital"></spring:message> :
								</label> <input type="text" class="form-control" id="hospital"
									name="hospital"
									placeholder="${please} ${enter} <spring:message code="employee.hospital"></spring:message>"
									value="${employeeDto.hospital}">
							</div>
						</div>

					</div>
				</div>

				<div class="row">
					<div class="col-md-12">

						<div class="form-group">
							<div class="col-md-6">
								<label class="required" style="margin-right: 25px;"> <spring:message
										code="employee.emergencyContact"></spring:message> :
								</label> <input type="text" class="form-control" id="emergencyContact"
									name="emergencyContact"
									placeholder="${please} ${enter} <spring:message code="employee.emergencyname"></spring:message>"
									value="${employeeDto.emergencyContact}">
							</div>
							<div class="col-md-6">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.relationshipWithEmergencyContact"></spring:message>
									:
								</label> <input type="text" class="form-control"
									id="relationshipWithEmergencyContact"
									name="relationshipWithEmergencyContact"
									placeholder="${please} ${enter} <spring:message code="employee.relationshipWithEmergencyContact"></spring:message>"
									value="${employeeDto.relationshipWithEmergencyContact}">
							</div>
						</div>

					</div>
				</div>

				<div class="row">
					<div class="col-md-12">
						<div class="form-group">
							<div class="col-md-6">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.emergencyContactAddress"></spring:message> :
								</label> <input type="text" class="form-control"
									id="emergencyContactAddress" name="emergencyContactAddress"
									placeholder="${please} ${enter} <spring:message code="employee.emergencyAddress"></spring:message>"
									value="${employeeDto.emergencyContactAddress}">
							</div>
							<div class="col-md-3">
								<label class="required" style="margin-right: 25px;"> <spring:message
										code="employee.emergencyContactPhoneNumber"></spring:message>
									:
								</label> <input type="text" class="form-control"
									id="emergencyContactPhoneNumber"
									name="emergencyContactPhoneNumber"
									placeholder="<spring:message code="employee.formatTelMo"></spring:message>"
									value="${employeeDto.emergencyContactPhoneNumber}">
							</div>
						</div>

					</div>
				</div>


				<div class="row">
					<div class="col-md-12">

						<div class="form-group">
							<div class="col-md-3">
								<label class="required" style="margin-right: 25px;"> <spring:message
										code="employee.dateOfBirth"></spring:message> :
								</label>
								<div class='input-group date' id='dateOfBirth'>



									<input type="text" class="form-control" id="dateOfBirth"
										name="dateOfBirth"
										placeholder="${please} ${enter} <spring:message code="employee.dob"></spring:message>"
										value='<fmt:formatDate pattern="dd-MM-yyyy" value="${employeeDto.dateOfBirth}" />' />


									<span class="input-group-addon"> <span
										class="glyphicon glyphicon-calendar"></span>
									</span>
								</div>
							</div>



							<div class="col-md-3">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.placeOfBirth"></spring:message> :
								</label> <input type="text" class="form-control" id="placeOfBirth"
									name="placeOfBirth"
									placeholder="${please} ${enter} <spring:message code="employee.pob"></spring:message>"
									value="${employeeDto.placeOfBirth}">
							</div>



							<div class="col-md-3">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.age"></spring:message> :
								</label> <input type="text" class="form-control" id="age" name="age"
									placeholder="${please} ${enter} <spring:message code="employee.age"></spring:message>"
									value="${employeeDto.age}">
							</div>
							<div class="col-md-3">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.religion"></spring:message> :
								</label> <input type="text" class="form-control" id="religion"
									name="religion"
									placeholder="${please} ${enter} <spring:message code="employee.religion"></spring:message>"
									value="${employeeDto.religion}">
							</div>

						</div>

					</div>
				</div>

				<div class="row">
					<div class="col-md-12">

						<div class="form-group">
							<div class="col-md-3">
								<label class="required" style="margin-right: 25px;"> <spring:message
										code="employee.idCard"></spring:message> :
								</label> <input type="text" class="form-control unique" id="idCard"
									name="idCard"
									placeholder="${please} ${enter} <spring:message code="employee.idCard"></spring:message>"
									value="${employeeDto.idCard}">
							</div>
							<div class="col-md-3">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.issuedOffice"></spring:message> :
								</label> <input type="text" class="form-control" id="issuedOffice"
									name="issuedOffice"
									placeholder="${please} ${enter} <spring:message code="employee.issuedOffice"></spring:message>"
									value="${employeeDto.issuedOffice}">
							</div>

							<div class="col-md-3">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.expiryDate"></spring:message> :
								</label>
								<div class='input-group date' id='expiryDate'>
									<input type="text" class="form-control" id="expiryDate"
										name="expiryDate"
										placeholder="${enter} <spring:message code="employee.expiryDate"></spring:message>"
										value='<fmt:formatDate pattern="dd-MM-yyyy" value="${employeeDto.expiryDate}" />' />

									<span class="input-group-addon"> <span
										class="glyphicon glyphicon-calendar"></span>
									</span>
								</div>
							</div>
						</div>

					</div>
				</div>

				<div class="row">
					<div class="col-md-12">
						<!------------------------------------------------------------------ form ของ sex ------------------------------------------------------------->
						<div class="form-group">


							<div class="col-md-3">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.sex"></spring:message> :
								</label>
								<div class="radio">
									<c:if test="${empty employeeDto.sex}">
										<label><input type="radio" name="sex" id="Male"
											value="Male">
										<spring:message code="employee.male"></spring:message></label>
										<label><input type="radio" name="sex" id="Female"
											value="Female">
										<spring:message code="employee.female"></spring:message></label>
										<label id="sex-error" class="error" for="sex"></label>
									</c:if>


									<c:if test="${not empty employeeDto.sex}">

										<c:if test="${employeeDto.sex =='Male'}">
											<label><input type="radio" name="sex" id="Male"
												value="Male" checked="checked">
											<spring:message code="employee.male"></spring:message></label>
											<label><input type="radio" name="sex" id="Female"
												value="Female">
											<spring:message code="employee.female"></spring:message></label>
										</c:if>

										<c:if test="${employeeDto.sex =='Female'}">
											<label><input type="radio" name="sex" id="Male"
												value="Male">
											<spring:message code="employee.male"></spring:message></label>
											<label><input type="radio" name="sex" id="Female"
												value="Female" checked="checked">
											<spring:message code="employee.female"></spring:message></label>
										</c:if>
									</c:if>

								</div>
							</div>

							<!----------------------------------------------------------------------------------------- form ของ marital staus  ------------------------------------------------------------------->

							<div class="col-md-3">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.maritalStatus"></spring:message> :
								</label>
								<div class="radio">
									<c:if test="${empty employeeDto.maritalStatus}">
										<label><input type="radio" name="maritalStatus"
											id="Single" value="Single">
										<spring:message code="employee.single"></spring:message></label>
										<label><input type="radio" name="maritalStatus"
											id="Married" value="Married">
										<spring:message code="employee.married"></spring:message></label>
										<label><input type="radio" name="maritalStatus"
											id="Divorce" value="Divorce">
										<spring:message code="employee.divorce"></spring:message></label>
										<label id="maritalStatus-error" class="error"
											for="maritalStatus"></label>
									</c:if>
									<c:if test="${not empty employeeDto.maritalStatus}">

										<c:choose>
											<c:when test="${employeeDto.maritalStatus =='Single'}">
												<label><input type="radio" name="maritalStatus"
													id="Single" value="Single" checked="checked">
												<spring:message code="employee.single"></spring:message></label>
												<label><input type="radio" name="maritalStatus"
													id="Married" value="Married">
												<spring:message code="employee.married"></spring:message></label>
												<label><input type="radio" name="maritalStatus"
													id="Divorce" value="Divorce">
												<spring:message code="employee.divorce"></spring:message></label>
											</c:when>

											<c:when test="${employeeDto.maritalStatus =='Married'}">
												<label><input type="radio" name="maritalStatus"
													id="Single" value="Single">
												<spring:message code="employee.single"></spring:message></label>
												<label><input type="radio" name="maritalStatus"
													id="Married" value="Married" checked="checked">
												<spring:message code="employee.married"></spring:message></label>
												<label><input type="radio" name="maritalStatus"
													id="Divorce" value="Divorce">
												<spring:message code="employee.divorce"></spring:message></label>
											</c:when>

											<c:when test="${employeeDto.maritalStatus =='Divorce'}">
												<label><input type="radio" name="maritalStatus"
													id="Single" value="Single">
												<spring:message code="employee.single"></spring:message></label>
												<label><input type="radio" name="maritalStatus"
													id="Married" value="Married"">
												<spring:message code="employee.married"></spring:message></label>
												<label><input type="radio" name="maritalStatus"
													id="Divorce" value="Divorce" checked="checked">
												<spring:message code="employee.divorce"></spring:message></label>
											</c:when>

											<c:otherwise>
												<label><input type="radio" name="maritalStatus"
													id="Single" value="Single">
												<spring:message code="employee.single"></spring:message></label>
												<label><input type="radio" name="maritalStatus"
													id="Married" value="Married">
												<spring:message code="employee.married"></spring:message></label>
												<label><input type="radio" name="maritalStatus"
													id="Divorce" value="Divorce">
												<spring:message code="employee.divorce"></spring:message></label>
											</c:otherwise>
										</c:choose>

									</c:if>

								</div>
							</div>



							<div class="col-md-3">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.height"></spring:message> :
								</label> <input type="text" class="form-control" id="height"
									name="height"
									placeholder="${please} ${enter} <spring:message code="employee.height"></spring:message>"
									value="${employeeDto.height}">
							</div>
							<div class="col-md-3">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.weigth"></spring:message> :
								</label> <input type="text" class="form-control" id="weigth"
									name="weigth"
									placeholder="${please} ${enter} <spring:message code="employee.weigth"></spring:message>"
									value="${employeeDto.weigth}">
							</div>
						</div>

					</div>
				</div>




				<div class="row">
					<div class="col-md-12">

						<div class="form-group">
							<div class="col-md-3" id="numberOfChildrenDiv">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.numberOfChildren"></spring:message> :
								</label> <input type="text" class="form-control" id="numberOfChildren"
									name="numberOfChildren"
									placeholder="${please} ${enter} <spring:message code="employee.numberOfChildren"></spring:message>"
									value="${employeeDto.numberOfChildren}">
							</div>
							<div class="col-md-3" id="spouseNameDiv">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.spouseName"></spring:message> :
								</label> <input type="text" class="form-control" id="spouseName"
									name="spouseName"
									placeholder="${please} ${enter} <spring:message code="employee.spouseName"></spring:message>"
									value="${employeeDto.spouseName}">
							</div>
							<div class="col-md-3" id="marriageCertificateNoDiv">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.marriageCertificateNo"></spring:message> :
								</label> <input type="text" class="form-control"
									id="marriageCertificateNo" name="marriageCertificateNo"
									placeholder="${please} ${enter} <spring:message code="employee.marcertno"></spring:message>"
									value="${employeeDto.marriageCertificateNo}">
							</div>
							<div class="col-md-3" id="issuedOffice2Div">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.issuedOffice"></spring:message> :
								</label> <input type="text" class="form-control" id="issuedOffice2"
									name="issuedOffice2"
									placeholder="${please} ${enter} <spring:message code="employee.issuedOffice"></spring:message>"
									value="${employeeDto.issuedOffice2}">
							</div>
						</div>

					</div>
				</div>

				<div class="row">
					<div class="col-md-12">

						<div class="form-group">
							<div class="col-md-6" id="addressDiv">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.address"></spring:message> :
								</label> <input type="text" class="form-control" id="address"
									name="address"
									placeholder="${please} ${enter} <spring:message code="employee.address"></spring:message>"
									value="${employeeDto.address}">
							</div>
							<div class="col-md-6" id="occupationDiv">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.occupation"></spring:message> :
								</label> <input type="text" class="form-control" id="occupation"
									name="occupation"
									placeholder="${please} ${enter} <spring:message code="employee.occupation"></spring:message>"
									value="${employeeDto.occupation}">
							</div>
						</div>

					</div>
				</div>

				<div class="row">
					<div class="col-md-12">
						<label style="margin-right: 25px;"> <spring:message
								code="employee.howdoyouknowaugmentis"></spring:message> :
						</label>
					</div>
				</div>
				<div class="row">

					<div class="form-group">
						<div class="col-md-12">
							<div class="col-md-3">

								<c:if test="${empty employeeDto.knowAugNewspaper}">
									<label style="margin-right: 25px;"><input
										type="checkbox" id="Newspaper" name="knowAugNewspaper"
										value="Newspaper">
									<spring:message code="employee.newspaper"></spring:message></label>
								</c:if>

								<c:if test="${not empty employeeDto.knowAugNewspaper}">
									<label style="margin-right: 25px;"><input
										type="checkbox" id="Newspaper" name="knowAugNewspaper"
										value="Newspaper" checked="checked">
									<spring:message code="employee.newspaper"></spring:message></label>
								</c:if>

								<input type="text" class="form-control"
									id="descriptionNewspaper" name="descriptionNewspaper"
									placeholder="${please} ${enter} <spring:message code="employee.newspaper"></spring:message>"
									value="${employeeDto.descriptionNewspaper}">

							</div>

							<div class="col-md-3">

								<c:if test="${empty employeeDto.knowAugMagazine}">
									<label style="margin-right: 25px;"><input
										type="checkbox" id="Magazine" name="knowAugMagazine"
										value="Magazine">
									<spring:message code="employee.magazine"></spring:message></label>
								</c:if>

								<c:if test="${not empty employeeDto.knowAugMagazine}">
									<label style="margin-right: 25px;"><input
										type="checkbox" id="Magazine" name="knowAugMagazine"
										value="Magazine" checked="checked">
									<spring:message code="employee.magazine"></spring:message></label>
								</c:if>

								<input type="text" class="form-control" id="descriptionMagazine"
									name="descriptionMagazine"
									placeholder="${please} ${enter} <spring:message code="employee.magazine"></spring:message>"
									value="${employeeDto.descriptionMagazine}">

							</div>

							<div class="col-md-3">
								<c:if test="${empty employeeDto.knowAugWebsite}">
									<label style="margin-right: 25px;"><input
										type="checkbox" id="Website" name="knowAugWebsite"
										value="Website">
									<spring:message code="employee.website"></spring:message></label>

								</c:if>

								<c:if test="${not empty employeeDto.knowAugWebsite}">
									<label style="margin-right: 25px;"><input
										type="checkbox" id="Website" name="knowAugWebsite"
										value="Website" checked="checked">
									<spring:message code="employee.website"></spring:message></label>
								</c:if>

								<input type="text" class="form-control" id="descriptionWebsite"
									name="descriptionWebsite"
									placeholder="${please} ${enter} <spring:message code="employee.website"></spring:message>"
									value="${employeeDto.descriptionWebsite}">
							</div>

							<div class="col-md-3">
								<c:if test="${empty employeeDto.knowAugFriend}">
									<label style="margin-right: 25px;"><input
										type="checkbox" id="Friend" name="knowAugFriend"
										value="Friend">
									<spring:message code="employee.friend"></spring:message></label>
								</c:if>

								<c:if test="${not empty employeeDto.knowAugFriend}">
									<label style="margin-right: 25px;"><input
										type="checkbox" id="Friend" name="knowAugFriend"
										value="Friend" checked="checked">
									<spring:message code="employee.friend"></spring:message></label>
								</c:if>

								<input type="text" class="form-control" id="descriptionFriend"
									name="descriptionFriend"
									placeholder="${please} ${enter} <spring:message code="employee.friend"></spring:message>"
									value="${employeeDto.descriptionFriend}">


							</div>

						</div>


						<div class="col-md-12">
							<div class="col-md-12">
								<c:if test="${empty employeeDto.knowAugOther}">
									<label><input type="checkbox" id="Other"
										name="knowAugOther" value="Other">
									<spring:message code="employee.other"></spring:message></label>
								</c:if>

								<c:if test="${not empty employeeDto.knowAugOther}">
									<label><input type="checkbox" id="Other"
										name="knowAugOther" value="Other" checked="checked">
									<spring:message code="employee.other"></spring:message></label>
								</c:if>

								<input type="text" class="form-control" id="descriptionOther"
									name="descriptionOther"
									placeholder="${please} ${enter} <spring:message code="employee.other"></spring:message>"
									value="${employeeDto.descriptionOther}">

							</div>
						</div>


					</div>


				</div>

				<div class="row">
					<div class="col-md-12">
						<label> <spring:message code="employee.doyouknow"></spring:message>
							:
						</label>
					</div>
				</div>


				<div class="row">

					<div class="form-group">
						<div class="col-md-12">
							<div class="col-md-1">

								<label style="margin-right: 25px;"> <f:radiobutton
										id="Yes" path="knowEmployed" value="Yes" />
									<spring:message code="employee.yes"></spring:message>
								</label>
							</div>

							<div class="form-group">
								<div class="col-md-12">
									<div class="col-md-4">

										<div id="descriptionYesNameDiv">
											<label> <spring:message code="employee.empName"></spring:message>
												:
											</label>
											<f:input class="form-control" id="descriptionYesName"
												path="descriptionYesName"
												value="${employeeDto.descriptionYesName}"
												placeholder="${please} ${enter} ${empname}" />
										</div>

									</div>

									<div class="col-md-4">
										<div id="positionYesDiv">
											<label> <spring:message code="employee.empPosition"></spring:message>
												:
											</label>
											<f:input class="form-control" id="positionYes"
												path="positionYes" value="${employeeDto.positionYes}"
												placeholder="${please} ${enter} ${empposition}" />
										</div>
									</div>

									<div class="col-md-4">

										<div id="relationYesDiv">
											<label> <spring:message code="employee.empRelation"></spring:message>
												:
											</label>
											<f:input class="form-control" id="relationYes"
												path="relationYes" value="${employeeDto.relationYes}"
												placeholder="${please} ${enter} ${emprelation}" />
										</div>
									</div>

								</div>
							</div>
						</div>

						<div class="col-md-12">
							<div class="col-md-12">
								<label style="margin-right: 25px;"> <f:radiobutton
										id="No" path="knowEmployed" value="No" />
									<spring:message code="employee.no"></spring:message>
								</label> <input id="knowEmployed" type="hidden"
									value="${employeeDto.knowEmployed}" />
							</div>
						</div>


					</div>
				</div>


				<div class="row">
					<div class="col-md-12">
						<label><spring:message code="employee.haveyoueverserved"></spring:message>
							:</label>
					</div>
				</div>

				<div class="row">
					<div class="form-group">
						<div class="col-md-12">
							<div class="col-md-12">
								<label style="margin-right: 25px;"> <f:radiobutton
										id="militaryServiceYes" path="militaryService" value="Yes" />
									<spring:message code="employee.yes"></spring:message>
								</label>

							</div>
						</div>

						<div class="col-md-12">
							<div class="col-md-3">

								<div id="fromYearDiv">
									<label style="margin-right: 25px;"> <spring:message
											code="employee.fromYear"></spring:message> :
									</label>

									<div class='input-group date' id='fromYear'>
										<input type="text" class="form-control" id="fromYear"
											name="fromYear"
											placeholder="${please} ${enter} <spring:message code="employee.fromYear"></spring:message>"
											value='<fmt:formatDate pattern="dd-MM-yyyy" value="${employeeDto.fromYear}" />' />
										<span class="input-group-addon"> <span
											class="glyphicon glyphicon-calendar"></span>
										</span>
									</div>
								</div>


							</div>

							<div class="col-md-3">
								<div id="toYearDiv">
									<label style="margin-right: 25px;"> <spring:message
											code="employee.toYear"></spring:message> :
									</label>
									<div class='input-group date' id='toYear'>
										<input type="text" class="form-control" id="toYear"
											name="toYear"
											placeholder="${please} ${enter} <spring:message code="employee.toYear"></spring:message>"
											value='<fmt:formatDate pattern="dd-MM-yyyy" value="${employeeDto.toYear}" />' />
										<span class="input-group-addon"> <span
											class="glyphicon glyphicon-calendar"></span>
										</span>
									</div>
								</div>
							</div>


							<div class="col-md-3">
								<div id="branchOfServiceDiv">
									<label style="margin-right: 25px;"> <spring:message
											code="employee.branchOfService"></spring:message> :
									</label> <input type="text" class="form-control" id="branchOfService"
										name="branchOfService"
										placeholder="${please} ${enter} <spring:message code="employee.branchOfService"></spring:message>"
										value="${employeeDto.branchOfService}">
								</div>
							</div>

							<div class="col-md-3">
								<div id="serviceNoDiv">
									<label style="margin-right: 25px;"> <spring:message
											code="employee.serviceNo"></spring:message> :
									</label> <input type="text" class="form-control" id="serviceNo"
										name="serviceNo"
										placeholder="${please} ${enter} <spring:message code="employee.serviceNo"></spring:message>"
										value="${employeeDto.serviceNo}">
								</div>
							</div>
						</div>

					</div>
				</div>


				<div class="row">
					<div class="form-group">
						<div class="col-md-12">
							<div class="col-md-12">
								<label style="margin-right: 25px;"> <f:radiobutton
										id="militaryServiceNo" path="militaryService" value="No" />
									<spring:message code="employee.no"></spring:message>
								</label>

							</div>
						</div>

						<div class="col-md-12">
							<div class="col-md-6">
								<label> <spring:message
										code="employee.pleasestatethereasons"></spring:message> :
								</label>
								<f:input class="form-control" id="reasonsNo" path="reasonsNo"
									value="${employeeDto.reasonsNo}"
									placeholder="${please} ${enter} ${pleasereason}" />
							</div>
							<div class="col-md-3">
								<label style="margin-right: 25px;"> <spring:message
										code="employee.dateToBeDrafted"></spring:message> :
								</label>

								<div class='input-group date' id='dateToBeDrafted'>
									<input type="text" class="form-control" id="dateToBeDrafted"
										name="dateToBeDrafted"
										placeholder="${please} ${enter} ${datedrafted}"
										value='<fmt:formatDate pattern="dd-MM-yyyy" value="${employeeDto.dateToBeDrafted}" />' />
									<span class="input-group-addon"> <span
										class="glyphicon glyphicon-calendar"></span>
									</span>
								</div>
							</div>

							<input id="militaryService" type="hidden"
								value="${employeeDto.militaryService}" />


						</div>

					</div>
				</div>


				<div class="row">
					<div class="col-md-12">
						<label> <spring:message code="employee.mayinquiry"></spring:message>
							:
						</label>
					</div>
				</div>

				<div class="row">

					<div class="form-group">
						<div class="col-md-12">
							<div class="col-md-12">
								<label style="margin-right: 25px;"> <f:radiobutton
										id="previousEmployerYes" path="previousEmployer" value="Yes" />
									<spring:message code="employee.yes"></spring:message>
								</label>
							</div>
						</div>


						<div class="col-md-12">
							<div class="col-md-1">
								<label style="margin-right: 25px;"> <f:radiobutton
										id="previousEmployerNo" path="previousEmployer" value="No" />
									<spring:message code="employee.no"></spring:message>
								</label>
							</div>

							<div class="col-md-11">
								<f:input class="form-control" id="previousEmpreasonsNo"
									path="previousEmpreasonsNo"
									value="${employeeDto.previousEmpreasonsNo}"
									placeholder="${please} ${enter} ${reason}" />
							</div>

							<input id="previousEmployer" type="hidden"
								value="${employeeDto.previousEmployer}" />
						</div>

					</div>
				</div>

			</div>
		</div>
	</div>


	<!---------------------------------------------------------- Start Official--------------------------------------------->
	<div id="collapse-show-hide-official">
		<h3 class="col-sm-12 open " id="div-information">
			<spring:message code="official.name" />
			<span class="pull-right glyphicon glyphicon-menu-up"
				id="official-arrow"></span>
		</h3>
		<div style="padding: 0 20px">
			<div class="row">
				<%-- <div id = "div-information" class="col-md-12" style="padding: 15px 0px 15px 0px;">
			<h2><spring:message code="official.name"></spring:message>
					<i style="position: absolute; right: 20px; cursor:pointer;" id = "icon1" class="fa fa-chevron-up"></i>
			</h2>
	   </div> --%>



				<div class="row">
					<div class="col-md-12">
						<div class="form-group">
							<div class="col-md-6">
								<label style="margin-right: 25px;"> <spring:message
										code="official.positionAppliedFor"></spring:message> :
								</label> <input type="text" class="form-control" id="positionAppliedFor"
									name="positionAppliedFor"
									placeholder="${please} ${enter} <spring:message code="official.position"></spring:message>"
									value="${employeeDto.positionAppliedFor}">
							</div>


							<div class="col-md-6">
								<label style="margin-right: 25px;"> <spring:message
										code="official.salaryExpected"></spring:message> :
								</label> <input type="text" class="form-control" id="salaryExpected"
									name="salaryExpected"
									placeholder="${please} ${enter} <spring:message code="official.salary"></spring:message>"
									value="${employeeDto.salaryExpected}">


								<%-- <div class="col-md-6">
									<label> Salary Expected :</label> <input type="text" class="form-control" id="salaryExpected" name="salaryExpected" placeholder="Enter Salary" value="${allEmployeeDto.salaryExpected}">
 				--%>
							</div>

						</div>

					</div>
				</div>




				<!--------------------------------------------------  Official link to table--------------------------------- -->

				<%-- <div class="col-md-12">
	       
				<div class="form-group">
					 <div class="col-md-3">
    					<label>Location :</label>
    						<f:select id="masLocation" path="masLocation"  class="form-control" value="TH">
							 	 <f:option  value="-1" label="--Select Location--" />
  								 <f:options items="${ locationList }"  itemValue="code" itemLabel="name" />
							</f:select>
						</div> 
						
  				</div>
			
	    </div> --%>

				<div class="row">
					<div class="col-md-12">

						<div class="form-group">
							<div class="col-md-6">
								<label style="margin-right: 25px;"> <spring:message
										code="official.startWorkDate"></spring:message> :
								</label>
								<div class='input-group date' id='startWorkDate'>
									<input type="text" class="form-control" id="startWorkDate"
										name="startWorkDate"
										placeholder="${enter} <spring:message code="official.startWorkDate"></spring:message>"
										value='<fmt:formatDate pattern="dd-MM-yyyy" value="${employeeDto.startWorkDate}"/>' />
									<span class="input-group-addon"> <span
										class="glyphicon glyphicon-calendar"></span>
									</span>
								</div>
							</div>


							<div class="col-md-6">
								<label id="endDate" style="margin-right: 25px;"> <spring:message
										code="official.endWorkDate"></spring:message> :
								</label>
								<div class='input-group date' id='endWorkDate'>
									<input type="text" class="form-control" id="endWorkDate"
										name="endWorkDate"
										placeholder="${please} ${enter} <spring:message code="official.endWorkDate"></spring:message>"
										value='<fmt:formatDate pattern="dd-MM-yyyy" value="${employeeDto.endWorkDate}"/>' />
									<span class="input-group-addon"> <span
										class="glyphicon glyphicon-calendar"></span>
									</span>
								</div>


								<%-- ${allEmployeeDto.endWorkDate} --%>


								<%-- 	<div class="col-md-3">
    						<label> Start Work Date :</label> <input type="text" class="form-control"
									id="startWorkDate" name="startWorkDate" placeholder="Enter Start Work Date" value="${allEmployeeDto.startWorkDate}">
						</div>
						
						<div class="col-md-3">
    						<label> End Work Date :</label> <input type="text" class="form-control"
									id="endWorkDate" name="endWorkDate" placeholder="Enter End Work Date" value="${allEmployeeDto.endWorkDate}">
						</div> --%>


							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-md-12">

						<div class="form-group">
							<div class="col-md-6">
								<label style="margin-right: 25px;"><spring:message
										code="employee.masEmployment"></spring:message> :</label>

								<f:select id="masEmployment" path="masEmployment"
									class="form-control">

									<option value=""><spring:message
											code="employee.enter.employment"></spring:message></option>
									<f:options items="${ employmentList }" itemValue="id"
										itemLabel="name" />


								</f:select>
							</div>

							<div class="col-md-6">
								<label style="margin-right: 25px;"><spring:message
										code="employee.masDivision"></spring:message> :</label>

								<f:select id="masDivision" path="masDivision"
									class="form-control">

									<option value=""><spring:message
											code="employee.enter.division"></spring:message></option>
									<f:options items="${ divisionList }" itemValue="id"
										itemLabel="name" />


								</f:select>


							</div>

						</div>

					</div>
				</div>

				<div class="row">
					<div class="col-md-12">

						<div class="form-group">



							<div class="col-md-6">
								<label style="margin-right: 25px;"><spring:message
										code="employee.masStaffType"></spring:message> :</label>

								<f:select id="masStaffType" path="masStaffType"
									class="form-control">

									<option value=""><spring:message
											code="employee.enter.staffType"></spring:message></option>
									<f:options items="${ staffTypeList }" itemValue="id"
										itemLabel="name" />


								</f:select>

							</div>

							<div class="col-md-6">
								<label style="margin-right: 25px;"><spring:message
										code="employee.masJoblevel"></spring:message> :</label>

								<f:select id="masJoblevel" path="masJoblevel"
									class="form-control">

									<option value=""><spring:message
											code="employee.enter.joblevel"></spring:message></option>
									<f:options items="${ joblevelList }" itemValue="id"
										itemLabel="name" />


								</f:select>

							</div>

						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-md-12">

						<div class="form-group">


							<div class="col-md-6">
								<label style="margin-right: 25px;"><spring:message
										code="employee.masCoreSkill"></spring:message> :</label>

								<f:select id="masCoreSkill" path="masCoreSkill"
									class="form-control">

									<option value=""><spring:message
											code="employee.enter.coreSkill"></spring:message></option>
									<f:options items="${ coreskillList }" itemValue="id"
										itemLabel="name" />


								</f:select>


							</div>

							<div class="col-md-6">
								<label style="margin-right: 25px;"><spring:message
										code="employee.technology"></spring:message> :</label>

								<f:select id="technology" path="technology" class="form-control">

									<option value=""><spring:message
											code="employee.enter.technology"></spring:message></option>
									<f:options items="${ technologyList }" itemValue="id"
										itemLabel="name" />


								</f:select>


							</div>
						</div>

					</div>
				</div>

				<div class="row">
					<div class="col-md-12">

						<div class="form-group">

							<div class="col-md-6">
								<label> <spring:message code="label.aim"></spring:message>
									:
								</label>
								<div class="checkbox">

									<c:if test="${empty employeeDto.isManager}">
										<label style="margin-right: 25px;"><input
											type="checkbox" value="1" name="isManager">
										<spring:message code="label.ismanager"></spring:message></label>
									</c:if>
									<c:if test="${not empty employeeDto.isManager}">
										<label style="margin-right: 25px;"><input
											type="checkbox" value="1" name="isManager" checked="checked">
										<spring:message code="label.ismanager"></spring:message></label>
									</c:if>

								</div>
							</div>


							<div class="col-md-6">


								<label style="margin-right: 25px;"> <spring:message
										code="employee.probationdate"></spring:message> :
								</label>
								<div class='input-group date' id='probationDate'>
									<input type="text" class="form-control" id="probationDate"
										name="probationDate"
										placeholder="${please} ${enter} <spring:message code="employee.probationdate"></spring:message>"
										value='<fmt:formatDate pattern="dd-MM-yyyy" value="${employeeDto.probationDate}"/>' />


									<%-- <label> Probation Date :</label> <input type="text" class="form-control"
							 id="probationDate" name="probationDate" placeholder="Enter Probation Date" value="${allEmployeeDto.probationDate}">
						 --%>


									<span class="input-group-addon"> <span
										class="glyphicon glyphicon-calendar"></span>
									</span>
								</div>
							</div>

						</div>

					</div>
				</div>

				<div class="row">
					<div class="col-md-12">
						<div class="form-group">
							<div class="col-md-6">

								<%-- <label>AIM : ${aimList.size()}</label> --%>


								<%-- <div class="form-group">					
    			<label>AIM :${aimList.size()}</label> --%>
								<label style="margin-right: 25px;"><spring:message
										code="label.aim"></spring:message> : </label>
								<f:select path="aimempid" class="form-control">

									<f:option value="">
										<spring:message code="employee.enter.aim"></spring:message>
									</f:option>
									<f:options items="${ aimList }" itemValue="id"
										itemLabel="name_eng" />


								</f:select>
							</div>


							<div class="col-md-6">
								<label style="margin-right: 25px;"> <spring:message
										code="official.registerDate"></spring:message> :
								</label>

								<div class='input-group date' id='officialDate'>
									<input type="text" class="form-control" id="officialDate"
										name="officialDate"
										placeholder="${enter} <spring:message code="official.registerDate"></spring:message>"
										value='<fmt:formatDate pattern="dd-MM-yyyy" value="${employeeDto.officialDate}"/>' />
									<span class="input-group-addon"> <span
										class="glyphicon glyphicon-calendar"></span>
									</span>
								</div>
							</div>



						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="form-group row">
		<div class="col-md-12" align="right">
			<button type="button" class="btn btn-default renew"
				data-dismiss="modal" style="margin-right: 15px;">
				<spring:message code="label.renew" />
			</button>
			<!-- <button type="button" class="btn btn-primary saveButton">Save</button> -->
			<button type="button" id="saveButton" class="btn btn-warning"
				name="saveButton">
				<spring:message code="label.saveAndCon" />
			</button>

		</div>
	</div>

</f:form>

<!----------------------------------------------------------- Modal Address --------------------------------------------------->

<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">
					<spring:message code="address.name"></spring:message>
				</h4>
			</div>
			<div class="modal-body">

				<form id="validateAddress" name="validateAddress">
					<div class="form-group">
						<label><spring:message code="address.type"></spring:message>
							:</label>

						<div class="form-group">
							<select class="form-control" id="addressType" name="addressType">
								<option value=""
									label="<spring:message code="address.enter.selectaddresstype"></spring:message>" />
								<c:forEach var="obj" items="${ masAddressTypeList }">
									<option value="${obj.id }">${ obj.name}</option>
								</c:forEach>
							</select>
						</div>



						<div class="form-group">
							<label><spring:message code="address.houseNo"></spring:message>:</label>
							<textarea class="form-control" rows="1" id="houseNo"
								name="houseNo"
								placeholder="${please} ${enter} <spring:message code="address.houseNo"></spring:message>"></textarea>
						</div>


						<div class="form-group">
							<label><spring:message code="address.road"></spring:message>:</label>
							<textarea class="form-control" rows="1" id="road" name="road"
								placeholder="${please} ${enter} <spring:message code="address.road"></spring:message>"></textarea>
						</div>

						<div class="form-group">
							<label><spring:message code="address.district"></spring:message>:</label>
							<textarea class="form-control" rows="1" id="district"
								name="district"
								placeholder="${please} ${enter} <spring:message code="address.district"></spring:message>"></textarea>
						</div>

						<div class="form-group">
							<label><spring:message code="address.subDistrict"></spring:message>:</label>
							<textarea class="form-control" rows="1" id="subDistrict"
								name="subDistrict"
								placeholder="${please} ${enter} <spring:message code="address.subDistrict"></spring:message>"></textarea>
						</div>



						<div class="form-group">
							<label><spring:message code="address.province"></spring:message>
								:</label> <select class="form-control" id="province" name="province">
								<option value=""
									label="<spring:message code="address.enter.province"></spring:message>" />
								<c:forEach var="obj" items="${ provinceList }">
									<option value="${obj.id }">${ obj.name}</option>
								</c:forEach>
							</select>

						</div>

						<div class="form-group">
							<label><spring:message code="address.zipcode"></spring:message>:</label>
							<textarea class="form-control" rows="1" id="zipcode"
								name="zipcode"
								placeholder="${please} ${enter} <spring:message code="address.zipcode"></spring:message>"></textarea>
						</div>


					</div>



				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default closeAddressButton"
					data-dismiss="modal">
					<spring:message code="label.close"></spring:message>
				</button>
				<button type="button" id="saveAddressButton"
					name="saveAddressButton" class="btn btn-primary saveAddressButton">
					<spring:message code="label.saveAndCon"></spring:message>
				</button>
			</div>
		</div>
	</div>
</div>


<!------------------------------------------------- Modal Delete --------------------------------------------->

<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog"
	aria-labelledby="deleteModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="deleteModalLabel">
					<spring:message code="label.delete" />
					<spring:message code="address.name" />
				</h4>
			</div>
			<div class="modal-body">
				<spring:message code="default.delete.confirm"></spring:message>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">
					<spring:message code="default.no" />
				</button>
				<button type="button" id="yesButton"
					class="btn btn-primary yesButton">
					<spring:message code="default.yes" />
				</button>
			</div>
		</div>
	</div>
</div>



