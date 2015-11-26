<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="f"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
	<title><decorator:title/></title>
	
	<!-- Favicon -->
	<link rel="shortcut icon" type="image/x-icon" href="${ pageContext.request.contextPath }/static/decorators/favicon.ico">
	
	<!-- jQuery -->
	<script src='<c:url value ="/static/resources/js/jquery-1.11.3.min.js" />'></script>
	
	<!-- Bootstrap -->
	<script src='<c:url value ="/static/resources/bootstrap/js/bootstrap.min.js"/>'></script>
	<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/bootstrap/css/bootstrap.min.css"/>"> 
	
	<!-- Font Awesome -->
	<link rel="stylesheet" type="text/css" media="all" href="<c:url value ="/static/resources/fontawesome/css/font-awesome.min.css"/>" />
	
	<!-- Custom CSS -->
	<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/pageCss/login.css"/>">
	
	<!-- Custom JS -->
	<script src='<c:url value ="/static/resources/pageJS/login.js"/>'></script> 
	
</head>
<body>
	<!-- Header -->
	<nav class="navbar navbar-inverse navbar-fixed-top">
 		<div class="container-fluid" id="login-nav-container">
	    	<div class="navbar-header">
	      		<div class="navbar-brand">
	      			<img src="<c:url value="/static/decorators/Logo.png" />" id="login-logo"/>
	      		</div>
	    	</div>
		</div>
	</nav>
	
	<!-- Content -->
	<decorator:body />
	
	<!-- Footer -->
	<jsp:include page="footer.jsp"></jsp:include>
</body>
</html>