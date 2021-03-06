<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="org.springframework.security.core.userdetails.User"%>
<%@page
	import="org.springframework.security.core.context.SecurityContextHolder"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator"
	prefix="decorator"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="f"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>

<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/pageCss/header.css"/>">

<%
	User user = (User) SecurityContextHolder.getContext()
			.getAuthentication().getPrincipal();
	String name = user.getUsername();
%>
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
			<a href="${pageContext.request.contextPath}/welcome">
				<img id="logo" src="${pageContext.request.contextPath}/static/decorators/Logo.png" alt="logo" />
			</a>
		</div>

		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="collapse navbar-collapse" id="navbar-collapse">
			<ul class="nav navbar-nav" id="nav-menu">
				<li>
					<a href="<%=request.getContextPath()%>/reservation" id="reservationPage">
						<span class="glyphicon glyphicon-home "></span>
					</a>
				</li>
				<li id="report-dropdown">
					<a href="#" id="report-btn" class="dropdown-toggle " data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
						<spring:message code="report.text" /> <span class="caret "></span>
					</a>
					<ul class="dropdown-menu sub-menu" id="dropdown_report">
			    		<li>
		    				<a id = "" href="<%=request.getContextPath()%>/reservation/report">Reservation Report</a>
		    			</li>
	    			</ul>
				</li>
			</ul>
		
			<ul class="nav navbar-nav navbar-right">
				<li id="bgLogout">						
					<a id="linkLogout" class="navbar-link" href="<c:url value="/logout"/>">
						<spring:message code="sitemesh.logout" /> | <%=name%>
					</a>
				</li>
			</ul>
			<%-- <div class="clearFloat"></div>
			<ul class="nav navbar-nav navbar-right" id="top-flag">
					<c:set var="locale">${pageContext.response.locale}</c:set>					
					<li class="flags-link" >
					
					<a id="flag-link" class="navbar-link" href="${request.getRequestURL}?locale=th" > 
						<img src="${pageContext.request.contextPath}/static/resources/images/flag_thailand.png" alt="logo" class='img-flag ${ (locale eq "th") ? "flag-active" : ""}' />
					</a>
					
					<a id="flag-link" class="navbar-link" href="${request.getRequestURL}?locale=en" > 
						<img src="${pageContext.request.contextPath}/static/resources/images/flag_usa.png" alt="logo" class='img-flag ${ (locale eq "en") ? "flag-active" : ""}' />
					</a>
					
					</li>
					
					
			
			</ul> --%>
			
		</div>
		<!-- /.navbar-collapse -->
	</div>
	<!-- /.container-fluid -->
</nav>