<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="f"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<!-- Reservation css -->
<link href="<c:url value="/static/resources/pageCss/reservation.css" />" rel="stylesheet" type="text/css">
<!-- font Awesome -->
<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/fontawesome/css/font-awesome.css"/>">

<jsp:include page="springMessageVariable.jsp"></jsp:include>

<script type="text/javascript">
	$(document).ready(function(){
		$("#reservationPage").addClass('active-menu'); 
	});
</script>

<div class="container-fluid">
	<input type="hidden" id="employeeId" value="${employeeId}" >
	<input type="hidden" id="firstNameEn" value="${firstNameEn}" >
	<input type="hidden" id="lastNameEn" value="${lastNameEn}" >
	<div class="row">
		<div id="div-calendar-bg" class="col-md-9">
			<div id="calendar"></div>
		</div>
		<div id="calendarPanel" class="col-md-3">
<!-- 			<div class="row"> -->
<!-- 				<div id="printPanel" class="col-md-12 text-center content-block"> -->
<%-- 					<a type="submit" class="btn_new_app" href="${pageContext.request.contextPath}/reservation/report"> --%>
<!-- 						<i class="fa fa-print fa-3x" ></i> -->
<!-- 						<br>Print -->
<!-- 					</a> -->
<!-- 				</div> -->
<!-- 			</div> -->
			<div class="row">
				<div class="col-md-12">
				<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
				  <div class="panel panel-default">
				    <div class="panel-heading text-center content-block" role="tab" id="resevationFilter-header">
				      <h4 class="panel-title">
				        <a role="button" class="collapseLink" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
				          Filter search
				        </a>
				      </h4>
				    </div>
				    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
				      <div class="panel-body">
				      	<label for="reservationTypeFilter"><spring:message code="reservation.show.reserv.type" /></label>
						<select id="reservationTypeFilter" class="form-control" >
							<option value=""><spring:message code="reservation.please.select.type" /></option>
							<c:forEach items="${reservationTypes}" var="masreservationtype">
								<option value="${masreservationtype.id}">${masreservationtype.name}</option>
							</c:forEach>
						</select>
						<label for="divisionFilter"><spring:message code="reservation.show.division" /></label>
						<select id="divisionFilter" class="form-control" >
							<option value=""><spring:message code="reservation.please.select.division" /></option>
							<c:forEach items="${divisions}" var="editDivision">
									<option value="${editDivision.id}">${editDivision.name}</option>
							</c:forEach>
						</select>
						<label for="roomFilter"><spring:message code="reservation.show.room" /></label>
					    <select id="roomFilter" class="form-control">
							<option value=""><spring:message code="reservation.please.select.room" /></option>
							<c:forEach items="${rooms}" var="room">
								<option value="${room.id}">${room.name}</option>
							</c:forEach>
						</select>
						<label for="reservationByFilter"><spring:message code="reservation.resserv.by" /></label>
						<input id="reservationByFilter" class="form-control" ></input>
						<div class="text-right"><button id="filterReserveBtn" class="btn btn-info" ><spring:message code="reservation.search" /></button></div>
				      </div>
				    </div>
				  </div>
				  <div class="panel panel-default">
				    <div class="panel-heading text-center content-block" role="tab" id="resevationSearch-header">
				      <h4 class="panel-title">
				        <a class="collapsed collapseLink" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
				          Search
				        </a>
				      </h4>
				    </div>
				    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
				      <div class="panel-body">
				      	<label for="reservationTypeCriteria"><spring:message code="reservation.show.reserv.type" /></label>
						<select id="reservationTypeCriteria" class="form-control" >
							<option value=""><spring:message code="reservation.please.select.type" /></option>
							<c:forEach items="${reservationTypes}" var="masreservationtype">
								<option value="${masreservationtype.id}">${masreservationtype.name}</option>
							</c:forEach>
						</select>
						<label for="divisionCriteria"><spring:message code="reservation.show.division" /></label>
						<select id="divisionCriteria" class="form-control" >
							<option value=""><spring:message code="reservation.please.select.division" /></option>
							<c:forEach items="${divisions}" var="editDivision">
									<option value="${editDivision.id}">${editDivision.name}</option>
							</c:forEach>
						</select>
						<label for="reservationByCriteria"><spring:message code="reservation.resserv.by" /></label>
						<input id="reservationByCriteria" class="form-control" ></input>		
						<div class="text-right"><button id="searchReserveBtn" class="btn btn-info" ><spring:message code="reservation.search" /></button></div>
				      </div>
				    </div>
				  </div>
				</div>
			
			
				</div>
			</div>
			
		</div>
	</div>
	
	
</div>

<!-- Detail Modal -->
<div class="modal fade" id="reservDetailModal" tabindex="-1" role="dialog" aria-labelledby="reservDetailLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="reservDetailLabel"><spring:message code="reservation.name.detail.modal" /></h4>
      </div>
      <div class="modal-body">
      	<div class="container-fluid">
      		<div class="row">
      			<div class="col-offset-md-1 col-md-3"><h4><spring:message code="reservation.show.room" /></h4></div>
      			<div class="col-md-6 col-offset-md-1">
      			<h4 id="detailRoomName" class="showReservData"></h4>
      			<select name="room" id="editdetailRoomName" class="form-control editReservData">
					<option value=""><spring:message code="reservation.please.select.room" /></option>
					<c:forEach items="${rooms}" var="room">
						<option value="${room.id}">${room.name}</option>
					</c:forEach>
				</select>
      			</div>
      		</div>
      		
      		<div class="row">
      			<div class="col-offset-md-1 col-md-3"><h4><spring:message code="reservation.show.reservationType" /></h4></div>
      			<div class="col-md-6 col-offset-md-1">
	      			<h4 id="detailDescType" class="showReservData"></h4>
	      			<select name = "reservationType" id="editdetailDescType" class="form-control editReservData">
						<option value=""><spring:message code="reservation.please.select.type" /></option>
						<c:forEach items="${reservationTypes}" var="masreservationtype">
							<option value="${masreservationtype.id}">${masreservationtype.name}</option>
						</c:forEach>
					</select>
      			</div>
      		</div>
      		
      		<div class="row">
      			<div class="col-offset-md-1 col-md-3"><h4><spring:message code="reservation.show.description" /></h4></div>
      			<div class="col-md-6 col-offset-md-1">
      				<h4 id="detailDesc" class="showReservData"></h4>
      				<textarea id="editdetailDesc" name ="detailDesc" class="form-control editReservData" rows="4" placeholder="<spring:message code="reservation.show.description" />"></textarea>
      			</div>
      		</div>
      		
      		<div class="row">
      			<div class="col-offset-md-1 col-md-3"><h4><spring:message code="reservation.show.date" /></h4></div>
      			<div class="col-md-7 col-offset-md-1"><h4 id="detailDate"></h4></div>
      		</div>
      		
      		<div class="row">
      			<div class="col-offset-md-1 col-md-3"><h4><spring:message code="reservation.show.from" /></h4></div>
      			<div class="col-md-3"><h4 id="detailStart"></h4></div>
      			<div class="col-md-2"><h4><spring:message code="reservation.show.to" /></h4></div>
      			<div class="col-md-3 col-offset-md-1"><h4 id="detailEnd"></h4></div>
      		</div>
      		
      		<div class="row">
      			<div class="col-offset-md-1 col-md-3"><h4><spring:message code="reservation.resserv.by" /></h4></div>
      			<div class="col-md-3">
      				<h4 id="detailReservBy" class="showReservData"></h4>
      				<h4 id="editdetailReservBy" class="editReservData"></h4>
      			</div>
      		</div>	
      			
      		<div class="row">
      		<div class="col-md-3 col-offset-md-1"><h4><spring:message code="reservation.show.division" /></h4></div>
      			<div class="col-md-6">
      			<h4 id="detailDivision" class="showReservData"></h4>
      				<select name="editdetailDivision" id="editdetailDivision" class="form-control editReservData">
						<option value=""><spring:message code="reservation.please.select.division" /></option>
						<c:forEach items="${divisions}" var="editDivision">
								<option value="${editDivision.id}">${editDivision.name}</option>
						</c:forEach>
					</select>
      		</div>
      		
      		
      	</div>
      </div>
      <div class="modal-footer">
      	<button id="editReservBtn" type="button" class="btn btn-warning showReservData"><spring:message code="label.edit" /></button>
      	<button id="saveEditReservBtn" type="button" class="btn btn-warning editReservData"><spring:message code="label.save" /></button>
      	<button id="cancelEditReservBtn" type="button" class="btn btn-default editReservData"><spring:message code="label.cancel" /></button>
        <button id="delModalBtn" type="button" class="btn btn-danger showReservData"><spring:message code="label.delete" /></button>
        <button id="closeBtn" type="button" class="btn btn-default" data-dismiss="modal"><spring:message code="label.close" /></button>
      </div>
    </div>
  </div>
</div>
</div>

<!-- Modal Delete -->
<div class="modal fade" id="deleteReservModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
    <div class="modal-header">
        <h4 class="modal-title" id="deleteModalLabel"><spring:message code="reservation.confirm.delete" /></h4>
      </div>
      <div class="modal-body">
      	<spring:message code="default.delete.confirm" />
      </div>
      <div class="modal-footer">
      <button type="button" id="cancelDeleteReserv" class="btn btn-default" ><spring:message code="default.no" /></button>
      <button type="button" id="confirmDeleteReserv" class="btn btn-primary yesButton"><spring:message code="default.yes" /></button>
      </div>
    </div>
  </div>
</div>

    
<!-- Insert Modal -->
	<div class="modal fade" id="insModal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	    
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title"><spring:message code="reservation.name.insert.modal" /></h4>
	      </div>
	      
	      <div class="modal-body">
	        	<div class="container-fluid"><form id="formInsert">
	        		<div class="row">
	        			<div class="col-md-12">
	        			<input type="hidden" id="employee"  name="employee"  ></input>
	        			<input type="hidden" id="masreservationtype"  name="masreservationtype"  ></input>
	        			<label for="insStartTime"><spring:message code="reservation.show.from" /></label>
	        			<h4 id="insStartTime"></h4>
	        			</div>
	        		</div>
	        		<div class="row">
	        			<div class="col-md-12">
	        			<label for="insEndTime"><spring:message code="reservation.show.to" /></label>
	        			<h4 id="insEndTime"></h4>
	        			</div>
	        		</div>
	        		<hr>
	        		<div class="row">
						<div class="col-md-6">
							<label for="room"><spring:message code="reservation.show.room" /></label> 
							<select name="room" id="room" class="form-control">
								<option value=""><spring:message code="reservation.please.select.room" /></option>
								<c:forEach items="${rooms}" var="room">
										<option value="${room.id}">${room.name} </option>
									</c:forEach>
							</select>
						</div>
						
						<div class="col-md-6">
								<label for="reservationType"><spring:message code="reservation.show.type" /></label> 
								<select id="reservationType" class="form-control" name = "reservationType">
									<option value=""><spring:message code="reservation.please.select.type" /></option>
									<c:forEach items="${reservationTypes}" var="masreservationtype">
										<option value="${masreservationtype.id}">${masreservationtype.name} </option>
									</c:forEach>
								</select>
						</div>
					</div>
						
        			<hr>
        			<div class="row">
	        			<div class="col-md-6">
	        				<label for="reservationBy"><spring:message code="reservation.resserv.by" /></label>
	        				<input id="reservationBy" class="form-control" name="reservationBy" disabled value="${firstNameEn} ${lastNameEn}"></input>
	        			</div>
	        		
	        		<div class="col-md-6">
							<label for="masDivision"><spring:message code="reservation.show.division" /></label> 
							<select name="masDivisionInsert" id="masDivisionInsert" class="form-control">
								<option value=""><spring:message code="reservation.please.select.division" /></option>

								<c:forEach items="${divisions}" var="masDivision">
										<option value="${masDivision.id}">${masDivision.name} </option>
								</c:forEach>
							</select>
					</div>
					</div>
					<br>
					<div class="row">	
	        			<div class="col-md-12">
	        				<label for="description"><spring:message code="reservation.show.description" /></label>
	        				<textarea id="descriptionInsert" name ="descriptionInsert" class="form-control" rows="4" placeholder="<spring:message code="reservation.show.description" />"></textarea>
	        			</div>
        			</div></form>
	        		</div>
	      </div><!-- /.modal-body -->
	      
	      <div class="modal-footer">
	        <button id="insBtn" type="button" class="btn btn-warning"><span class="glyphicon glyphicon-plus"></span><spring:message code="label.add" /></button>
	        <button type="button" class="btn btn-default" data-dismiss="modal"><spring:message code="label.cancel" /></button>
	      </div>
	      
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<div class="modal fade" id="reservationListModal" tabindex="-1" role="dialog" aria-labelledby="modal_appointmentList">
	  <div class="modal-dialog modal-lg" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="modalHeader_reservationList"></h4>
	      </div>
	      <div id="modalBody_reservationList" class="modal-body">
	      	<div class="table-responsive" style=" width:100%;">
	      		<table id="reservationListTable" >
	      			<thead>
	      				<tr>
	      					<th><spring:message code="reservation.show.room"/></th>
	      					<th><spring:message code="reservation.show.date"/></th>
	      					<th><spring:message code="reservation.start.time"/></th>
	      					<th><spring:message code="reservation.end.time"/></th>
	      					<th><spring:message code="reservation.show.reserv.type"/></th>
	      					<th><spring:message code="reservation.show.division"/></th>
	      					<th><spring:message code="reservation.resserv.by"/><th>
	      				</tr>
	      			</thead>
	      		</table>
	      	</div>
	      </div>
	    </div>
	  </div>
	</div>
	
<script type="text/javascript">
	var $languageNow = "${pageContext.response.locale}";
	var cantInsPassTime = "<spring:message code='appointment.insert.pass.time' />";
</script>

<!-- Reservation JS -->
<script src="<c:url value ="/static/resources/pageJS/reservation.js"/>"></script> 
