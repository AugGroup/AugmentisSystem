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
	<script src='<c:url value ="/static/resources/js/bootstrap.min.js"/>'></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">
	
	<%-- <link rel="stylesheet" type="text/css" media="all" href="<c:url value ='/static/resources/css/bootstrap.min.css'/>"></link> --%>
	<%-- <link rel="stylesheet" type="text/css" media="all" href="<c:url value ="/static/resources/css/bootstrap-theme.min.css"/>" /> --%> 
	
	<!-- Font Awesome -->
	<link rel="stylesheet" type="text/css" media="all" href="<c:url value ="/static/resources/fontawesome/css/font-awesome.min.css"/>" />
	
	<!-- Custom CSS -->
	<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/pageCss/login.css"/>">
	
	<!-- Custom JS -->
	<script src='<c:url value ="/static/resources/pageJS/login.js"/>'></script> 
	
</head>
<body>
	<decorator:body />
</body>
</html>