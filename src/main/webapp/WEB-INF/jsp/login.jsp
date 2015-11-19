<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="f"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- Bootstrap -->
<script src="<c:url value="/resource/jqueryvalidate/jquery.validate.min.js" />"></script>
<link href="<c:url value="/resource/bootstrap/css/bootstrap.css" />" rel="stylesheet" media="all">
<link href="<c:url value="/resource/bootstrap/css/bootstrap-theme.css" />" rel="stylesheet" media="all">
<script src="<c:url value="/resource/bootstrap/js/bootstrap.js" />"></script>

<!-- login css -->
<link href="<c:url value="/resources/css/login.css" />" rel="stylesheet" media="all">

<title><spring:message code="default.login.btn" var="login"/>${login}</title>
</head>
<body>
	<div class="container">
		<form name='loginForm' action="<c:url value='j_spring_security_check' />" method='POST'>
		<div class="col col-lg-4 col-md-5 col-sm-6 col-xs-12 col-lg-offset-4 col-sm-offset-3 login">
		<spring:message code="default.enter" var="enter" />
		<div class="headLogo" >
			<%-- <span><img src="<c:url value="resource/images/augmentis-logo.png" />" /></span> --%>
			<span><img src="<c:url value="/static/decorators/augmentis-logo.png" />" /></span>
			
			
		</div>	
			<div class="form-group">
			      <label for="user"><spring:message code="default.login.user" var="username" /> ${username} : </label>
			      <input type="text" class="form-control" id="user" name='j_username' placeholder="${enter}${username}">
		    </div>
		    <div class="form-group">
			      <label for="pwd"><spring:message code="default.login.password" var="password" /> ${password} : </label>
			      <input type="password" class="form-control" name='j_password' id="pwd" placeholder="${enter}${password}">
		    </div>
		    <input name="submit" type="submit" class="btn btn-default" value="${login}" />
			<div id="message">
				${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}
			</div>
			<br>
		</div>
		</form>
	</div>
	

</body>
</html>