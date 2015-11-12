<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="org.springframework.security.core.userdetails.User"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="f"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>

<link rel="stylesheet" type="text/css" media="all" href="<c:url value ='/static/resources/css/bootstrap.min.css'/>"></link>
<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/pageCss/main.css"/>">
<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/pageCss/header.css"/>">
<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/pageCss/footer.css"/>">
<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/fontawesome/css/font-awesome.css"/>">

<%
	User user = (User) SecurityContextHolder.getContext()
			.getAuthentication().getPrincipal();
	String name = user.getUsername();
%>

<style type="text/css">

html, body {
    height: 100%;
    margin: 0 0 1px;
    padding: 0;
}

#manu-icon-content {
	margin-top: 50px;
	font-size: larger;
	padding: 0px 150px;
	position: fixed;
}

.content-block {
	margin: 40px 0;	
}

.navbar-back {
    background: #707070;
    height: 65px !important;
}

@media ( max-width : 768px) {
	#manu-icon-content {
		margin-top: 0px;
		margin-left: 0px;
		font-size: larger;
		padding: 0px 150p;
	}
}

.btn_new_app
{
	color: black;
    display:inline-block;
    border:0;
    position: relative;
    -webkit-transition: all 200ms ease-in;
    -webkit-transform: scale(1); 
    -ms-transition: all 200ms ease-in;
    -ms-transform: scale(1); 
    -moz-transition: all 200ms ease-in;
    -moz-transform: scale(1);
    transition: all 200ms ease-in;
    transform: scale(1);   

}
.btn_new_app:hover
{
	color: rgb(222, 145, 4);
    z-index: 2;
    -webkit-transition: all 200ms ease-in;
    -webkit-transform: scale(1.5);
    -ms-transition: all 200ms ease-in;
    -ms-transform: scale(1.5);   
    -moz-transition: all 200ms ease-in;
    -moz-transform: scale(1.5);
    transition: all 200ms ease-in;
    transform: scale(1.5);
    text-decoration: none;
}

.fa-5x {
    font-size: 7em !important;
}

#lan-flag {
	display: block;
	margin-right: -22px;
		
}


.footer {
  position:  fixed !important;
  bottom:0;
  width: 100%;
  /* Set the fixed height of the footer here */
  height: 60px; 
  background-color: #ffc000;
  margin-top: 0;
  /* background-image: linear-gradient(to bottom, #ffc000 0%, #ffc000 100%); */ 
  
}
</style>

<body background="${ pageContext.request.contextPath }/static/decorators/BG_W.jpg">

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
			<img  id="logo" src="${pageContext.request.contextPath}/static/decorators/augmentis.jpg" alt="logo" />
		</div>

		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="collapse navbar-collapse" id="navbar-collapse">
		
			<ul class="nav navbar-nav navbar-right">
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
		<div class="col-md-6 col-lg-6 text-center content-block">
			<a type="submit" class="btn_new_app" href="${pageContext.request.contextPath}/applicant">
				<i class="fa fa-eye fa-5x" ></i>
				<br>Recuitment System
			</a>
		</div>
		
		<div class="col-md-6 col-lg-6 text-center content-block">
			<a type="submit" class="btn_new_app" href="${pageContext.request.contextPath}/employee/list">
				<i class="fa fa-user fa-5x"></i>
				<br>Human Resource System
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
</body>

<script src='<c:url value ="/static/resources/js/jquery-1.11.3.min.js" />'></script>
<script src='<c:url value ="/static/resources/js/bootstrap.min.js"/>'></script>