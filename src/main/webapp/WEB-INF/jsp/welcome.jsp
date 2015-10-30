<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="f"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>

<div class="container">

	<a type="submit" id="btn_new_app" class="btn btn-warning" href="${pageContext.request.contextPath}/applicant">
	<span class="glyphicon glyphicon-plus "></span>RM SYSTEM</a>
	
	<a type="submit" id="btn_new_app" class="btn btn-warning" href="${pageContext.request.contextPath}/request">
	<span class="glyphicon glyphicon-plus "></span>HR SYSTEM</a>
			
</div>