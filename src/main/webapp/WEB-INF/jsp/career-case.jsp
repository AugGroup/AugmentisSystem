<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- decorator title -->
<title>Career Case</title>

<script>
	var contextPath = "${pageContext.request.contextPath}";
	
	var specialties = [];
	<c:forEach items="${specialties}" var="specialty">
		var specialty = { id : "${specialty.id}", name : "${specialty.name}" };
		specialties.push(specialty);
	</c:forEach>
</script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/resources/pageJS/career-case.js"></script>

<style type="text/css">
	#table-content {
		margin-top: 15px;
	}
	textarea#jobDescription {
		resize: none;
	}
</style>

<!-- decorator body -->
<div class="container">
	<div class="row">
		<div class="col-sm-12">
			<div class="page-header">
		  		<h1><strong>Career Case</strong></h1>
			</div>
		</div>
	</div>
	
	<!-- insert button -->
	<div class="row">
		<div class="col-sm-12">
			<button id="btn-insert" class="btn btn-warning" data-toggle="modal" data-target="#modal-insert">
				<span class="fa fa-plus"></span>&nbsp;Add Career Case
			</button>
		</div>
	</div>
	
	
	
	
	<!-- <div class="row">
		<div class="col-sm-12">
			<div class="table-responsive" id="table-content">
				<table class="dataTable" id="table" class="cell-border" style="width: 100%">
					<caption title="" class="tableHeader">Career Case</caption>
					<thead>
						<tr>
							<th>Career Case</th>
							<th>Status</th>
							<th>Date Request</th>
							<th>Client</th>
							<th>Division</th>
							<th>Career Level</th>
							<th>Core Skill</th>
							<th>Technology</th>
							<th>Specialty</th>
							<th>Start Date</th>
							<th>End Date</th>
							<th>Job Description</th>
							<th>Career Case Status</th>
							<th>Expected Date</th>
							<th>Special Request</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div> -->
	
</div>

<!-- insert modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="modal-insert">
	<div class="modal-dialog">
    	<div class="modal-content">
      		<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        		<h3 class="modal-title"><span class="fa fa-plus"></span>&nbsp;<strong>Add Career Case</strong></h3>
      		</div>
      		<form id="modal-form">
	      		<div class="modal-body">
	      			<div class="row">
	      				<div class="col-sm-6">
	      					<div class="form-group">
	      						<label for="client">Client</label>
	      						<select class="form-control" id="client">
	      							<option value="">---Select Client---</option>
		    						<c:forEach items="${clients}" var="client">
		    							<option value="${client.id}">${client.name}</option>
		    						</c:forEach>
		    					</select>
	      					</div>
	      				</div>
	      				<div class="col-sm-6">
	      					<div class="form-group">
	      						<label for="masDivision">Division</label>
	      						<select class="form-control" id="masDivision">
	      							<option value="">---Select Division---</option>
		    						<c:forEach items="${divisions}" var="division">
		    							<option value="${division.id}">${division.name}</option>
		    						</c:forEach>
		    					</select>
	      					</div>
	      				</div>
	      			</div>
	      			<div class="row">
	      				<div class="col-sm-6">
	      					<div class="form-group">
	      						<label for="masJobLevel">Career Level</label>
	      						<select class="form-control" id="masJobLevel">
	      							<option value="">---Select Career Level---</option>
		    						<c:forEach items="${jobLevels}" var="jobLevel">
		    							<option value="${jobLevel.id}">${jobLevel.name}</option>
		    						</c:forEach>
		    					</select>
	      					</div>
	      				</div>
	      				<div class="col-sm-6">
	      					<div class="form-group">
	      						<label for="masCoreSkill">Core Skill</label>
	      						<select class="form-control" id="masCoreSkill">
	      							<option value="">---Select Core Skill---</option>
		    						<c:forEach items="${coreSkills}" var="coreSkill">
		    							<option value="${coreSkill.id}">${coreSkill.name}</option>
		    						</c:forEach>
		    					</select>
	      					</div>
	      				</div>
	      			</div>
	      			<div class="row">
	      				<div class="col-sm-6">
	      					<div class="form-group">
	      						<label for="masTechnology">Technology</label>
	      						<select class="form-control" id="masTechnology">
	      							<option value="">---Select Career Level---</option>
		    						<c:forEach items="${technologies}" var="technology">
		    							<option value="${technology.id}">${technology.name}</option>
		    						</c:forEach>
		    					</select>
	      					</div>
	      				</div>
	      				<div class="col-sm-6">
	      					<div class="form-group">
	      						<label for="masSpecialties">Specialty</label>
	      						<input type="text" class="form-control" id="masSpecialties" />
	      					</div>
	      				</div>
	      			</div>
	      			<div class="row">
	      				<div class="col-sm-6">
	      					<div class="form-group">
	      						<label for="startDate">Start Date</label>
				                <div class='input-group date' id='startDate'>
				                    <input type='text' class="form-control" />
				                    <span class="input-group-addon">
				                        <span class="fa fa-calendar"></span>
				                    </span>
				                </div>
				            </div>
	      				</div>
	      				<div class="col-sm-6">
	      					<div class="form-group">
	      						<label for="endDate">End Date</label>
				                <div class='input-group date' id='endDate'>
				                    <input type='text' class="form-control" />
				                    <span class="input-group-addon">
				                        <span class="fa fa-calendar"></span>
				                    </span>
				                </div>
				            </div>
	      				</div>
	      			</div>
	      			<div class="row">
	      				<div class="col-sm-6">
	      					<div class="form-group">
	      						<label for="expectedDate">Expected Date</label>
				                <div class='input-group date' id='expectedDate'>
				                    <input type='text' class="form-control" />
				                    <span class="input-group-addon">
				                        <span class="fa fa-calendar"></span>
				                    </span>
				                </div>
				            </div>
	      				</div>
	      				<div class="col-sm-6">
	      					<div class="form-group">
	      						<label for="specialRequest">Special Request</label>
				                <input type="text" class="form-control" >
				            </div>
	      				</div>
	      			</div>
	      			<div class="row">
	      				<div class="col-md-12">
	      					<label for="่jobDescription">Job Description</label>
				            <textarea class="form-control" rows="3" id="jobDescription"></textarea>
	      				</div>
	      			</div>
	      		</div>
      		</form>
      		<div class="modal-footer">
        		<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        		<button type="button" class="btn btn-primary"><span class="fa fa-save"></span>&nbsp;Save</button>
      		</div>
    	</div><!-- /.modal-content -->
  	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->





































