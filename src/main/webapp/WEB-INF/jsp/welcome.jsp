<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="org.springframework.security.core.userdetails.User"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="f"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>

<!DOCTYPE html>
<html>
<head>
	<title><spring:message code="welcome.message" /></title>

	<!-- Favicon -->
	<link rel="shortcut icon" type="image/x-icon" href="${ pageContext.request.contextPath }/static/decorators/favicon.ico">

	<!-- jQuery -->
	<script src='<c:url value ="/static/resources/js/jquery-1.11.3.min.js" />'></script>
	
	<!-- Bootstrap CSS-->
	<link rel="stylesheet" type="text/css" media="all" href="<c:url value ='/static/resources/css/bootstrap.min.css'/>"></link>
	
	<!-- Custom CSS -->
	<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/pageCss/main.css"/>">
	<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/pageCss/header.css"/>">
	<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/pageCss/footer.css"/>">
	<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/pageCss/welcome.css"/>">
	
	<!-- Font Awesome -->
	<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/fontawesome/css/font-awesome.css"/>">
	
	<%
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String name = user.getUsername();
	%>
</head>
<body>

	<nav class="navbar navbar-back">
		<div id="top-con" class="container-fluid ">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed top-toggle" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
					<span class="sr-only">Toggle navigation</span> 
					<span class="icon-bar"></span> 
					<span class="icon-bar"></span> 
					<span class="icon-bar"></span>
				</button>
				<img  id="logo" src="${pageContext.request.contextPath}/static/decorators/Logo.png" alt="logo" />
			</div>
			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="navbar-collapse">
			
				<ul class="nav navbar-nav navbar-right" >
					<li id="bgLogout">						
						<a id="linkLogout" class="navbar-link" href="<c:url value="/logout"/>">
							<spring:message code="sitemesh.logout" /> | <%=name%>
						</a>
					</li>
				</ul>
				<div class="clearFloat"></div> 
				<ul class="nav navbar-nav navbar-right" id="lan-flag">
						<c:set var="locale">${pageContext.response.locale}</c:set>					
						<li class="flags-link" >
						
						<a id="flag-link" class="navbar-link" href="${request.getRequestURL}?locale=th" > 
							<img src="${pageContext.request.contextPath}/static/resources/images/flag_thailand.png" alt="logo" class='img-flag ${ (locale eq "th") ? "flag-active" : ""}' />
						</a>
						
						<a id="flag-link" class="navbar-link" href="${request.getRequestURL}?locale=en" > 
							<img src="${pageContext.request.contextPath}/static/resources/images/flag_usa.png" alt="logo" class='img-flag ${ (locale eq "en") ? "flag-active" : ""}' />
						</a>
						
						</li>
				</ul>
				
			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid -->
	</nav>
	<div class="container" id="manu-icon-content">
		<div class="row">
			<div class="col-md-4 col-lg-4 text-center content-block">
				<a type="submit" class="btn_new_app" href="${pageContext.request.contextPath}/applicant">
					<i class="fa fa-user-plus fa-5x" ></i>
					<br><spring:message code="recruitment.system" />
				</a>
			</div>
			
			<div class="col-md-4 col-lg-4 text-center content-block">
				<a type="submit" class="btn_new_app" href="${pageContext.request.contextPath}/employee/list">
					<i class="fa fa-users fa-5x"></i>
					<br><spring:message code="human.resource.system" />
				</a>
			</div>
			
			<div class="col-md-4 col-lg-4 text-center content-block">
				<a type="submit" class="btn_new_app" href="${pageContext.request.contextPath}/reservation">
					<i class="fa fa-calendar fa-5x"></i>
					<br><spring:message code="reservation.room.system" />
				</a>
			</div>
		</div>	
	</div>

	<footer class='footer'>
		<div class="container">
			<div class="text-muted">
				<span class="spe-character">©</span> 2011-2015 Augmentis (Thailand) Limited. All rights reserved.
			</div>
		</div>
	</footer>
	
	<!-- Bootstrap JS-->
	<script src='<c:url value ="/static/resources/js/bootstrap.min.js"/>'></script>
</body>
</html>