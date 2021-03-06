<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="f"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<title><spring:message code="address.name" /></title>

<script src="<c:url value ="/static/resources/pageJS/aug-address.js"/>"></script> 

<script>
	var valAddress = "<spring:message code="valid.addr.addr"/>";
	var valHouseNo = "<spring:message code="valid.addr.house"/>";
	var valRoad = "<spring:message code="valid.addr.road"/>";
	var valDistrict = "<spring:message code="valid.addr.district"/>";
	var valSubDistrict = "<spring:message code="valid.addr.sub.district"/>";
	var valProvince = "<spring:message code="valid.addr.province"/>";
	var valEdit = "<spring:message code="main.edit.info"/>";
	var valDelete = "<spring:message code="main.delete"/>";
	var valZipCode = "<spring:message code="valid.addr.zipcode"/>";
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
	<div class="modal fade" id="addressModal" role="dialog">
		<div class="modal-dialog">

			<div class="modal-content">
				<div class="modal-header" style="padding: 35px 50px;">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4>
						<span class="glyphicon glyphicon-lock"></span>
						<spring:message code="address.name" />
					</h4>
				</div>
				
				<div class="modal-body" style="padding: 40px 50px;">
					<form role="form" id="addressForm">
						<div class="form-group">
							<input type="hidden" id="applicant" name="applicant" value="${id}">
							<input type="hidden" id="addressId" name="addressId">
							<input type="hidden" id="provinceId" name="provinceId">
						</div>
						
 						<div class="form-group">
 							<label for="addressType"><spring:message code="address.type"/></label><br>
 							<select class="form-control" id="addressType" name="addressType">
								<option value="" label="<spring:message code="address.text.select"/>" />
								<c:forEach var="obj" items="${addresses}">
									<option value="${obj.id}">${obj.name}</option>
								</c:forEach>
							</select>
						</div> 
						
						<div class="form-group">
							<label for="houseNo"><spring:message
									code="address.houseNo" /> </label> <input type="text"
								class="form-control" id="houseNo" name="houseNo"
								placeholder="<spring:message code="address.text.houseNo"/>">
						</div>
						
						<div class="form-group">
							<label for="road"><spring:message code="address.road" />
							</label> <input type="text" class="form-control" id="road" name="road"
								placeholder="<spring:message code="address.text.road"/>">
						</div>
						
						<div class="form-group">
							<label for="district"><spring:message
									code="address.district" /> </label> <input type="text"
								class="form-control" id="district" name="district"
								placeholder="<spring:message code="address.text.district"/>">
						</div>
						
						<div class="form-group">
							<label for="subDistrict"><spring:message
									code="address.sub.district" /> </label> <input type="text"
								class="form-control" id="subDistrict" name="subDistrict"
								placeholder="<spring:message code="address.text.sub.district"/>">
						</div>
						
						<div class="form-group">
							<label for="zipcode"><spring:message
									code="address.zipcode" /> </label> <input type="text"
								class="form-control" id="zipcode" name="zipcode"
								placeholder="<spring:message code="address.text.zipcode"/>">
						</div>
						
						<div class="form-group">
							<label for="province"><spring:message code="address.province" /> </label>
	 					 	<select  class="form-control" id="province" name="province">
								<option value="" label="<spring:message code="address.text.select.proince"/>" />
								<c:forEach var="obj" items="${ provinces }">
									<option value="${obj.id }">${ obj.name}</option>
								</c:forEach>
							</select>
						</div>

						<br> <br>
						<button type="button" class="btn btn-warning" id="btn_save">
							<span class="glyphicon glyphicon-save"></span>
							<spring:message code="edit.button.save" />
						</button>
						
						<button type="button" class="btn btn-default" data-dismiss="modal">
							<spring:message code="button.cancel" />
						</button>
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
		<table id="addressTable" class="display" cellspacing="0" width="100%">
			<caption title="" class="tableHeader"><spring:message code="address.name"/></caption>
				<thead>
					<tr>
						<th><spring:message code="address.data" /></th>
						<th><spring:message code="address.data.house" /></th>
						<th><spring:message code="address.data.road" /></th>
						<th><spring:message code="address.data.district" /></th>
						<th><spring:message code="address.data.sub.district" /></th>
						<th><spring:message code="address.data.zipcode" /></th>
						<th><spring:message code="address.data.provice" /></th>
						<th><spring:message code="main.edit.info" /></th>
						<th><spring:message code="main.delete" /></th>
					</tr>
				</thead>
			<tbody></tbody>
		</table>
		<div align="right">
			<button class="btn btn-warning" id="buttonAdd" data-toggle="modal" data-target="#addressModal">
			<span class="glyphicon glyphicon-plus"></span><spring:message code="address.name.add"/></button>
			
			<button class="btn btn-default" type="button" id="buttonBack" name="buttonBack" 
			onclick="window.location='${pageContext.request.contextPath}/info/${id}'">
			<span class="glyphicon glyphicon-step-backward"></span> <spring:message code="button.back"/> </button>
			
			<button class="btn btn-default" type="button" id="buttonNext" name="buttonNext" 
			onclick="window.location='${pageContext.request.contextPath}/family/${id}'">
			<span class="glyphicon glyphicon-step-forward"></span> <spring:message code="button.next"/> </button>
		</div>
	</div>
	
</div>