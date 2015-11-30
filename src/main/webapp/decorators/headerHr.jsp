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
					<a href="<%=request.getContextPath()%>/employee/list" id="employeePage">
						<span class="glyphicon glyphicon-home "></span>
					</a>
				</li>
				<li id="report-dropdown">
					<a href="#" class="dropdown-toggle " id="report-btn" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
						<spring:message code="report.text" /> <span class="caret "></span>
					</a>
					<ul class="dropdown-menu sub-menu" id="dropdown_report">
						<li>
		    				<a id = "reportEmpName-tap" href="<%=request.getContextPath()%>/employee/reportEmpName"><spring:message code="report.empName" /></a>
		    			</li>
		    			
		    			<li>
		    				<a id = "reportEmpCode-tap" href="<%=request.getContextPath()%>/employee/reportEmpCode"><spring:message code="report.empCode" /></a>
		    			</li>
		    			
		    			<li>
		    				<a  id = "reportStatusEmp-tap" href="<%=request.getContextPath()%>/employee/ReportStatusEmp"><spring:message code="report.empStatus" /></a>
		    			</li>
		    			
		    			<li>
		    				<a id = "reportLeave-tap" href="<%=request.getContextPath()%>/employee/ReportLeave"><spring:message code="report.empLeave" /></a>
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
		</div> <!-- /.navbar-collapse -->
	</div> <!-- /.container-fluid -->
</nav>