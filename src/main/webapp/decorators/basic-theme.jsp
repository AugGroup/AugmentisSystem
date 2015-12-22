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
<!DOCTYPE html>
<html>
<head>
	<!-- decorator-title -->
	<title><decorator:title/></title>
	
	<!-- Favicon -->
	<link rel="shortcut icon" type="image/x-icon" href="${ pageContext.request.contextPath }/static/decorators/favicon.ico">
	
	<!--jQuery -->
	<script src='<c:url value ="/static/resources/js/jquery-1.11.3.min.js" />'></script>
	
	<!-- jQuery UI -->
	<link href='<c:url value="/static/resources/css/jquery-ui.min.css"/>' rel='stylesheet' />
	<%-- <script src='<c:url value ="/static/resources/jQueryUI/jquery-ui.min.js"/>'></script> --%>
	
	<!-- Font Awesome -->
	<link rel="stylesheet" type="text/css" media="all" href="<c:url value ="/static/resources/fontawesome/css/font-awesome.min.css"/>" />
	<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/fontawesome/css/font-awesome-animation.min.css"/>">
	
	<!-- Bootstrap -->
	<script src='<c:url value ="/static/resources/bootstrap/js/bootstrap.min.js"/>'></script>
	<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/bootstrap/css/bootstrap.min.css"/>">
	
	<!-- Alertify -->
	<link rel="stylesheet" type="text/css" media="all" href="<c:url value ='/static/resources/css/alertify.core.css'/>"></link>
	<link rel="stylesheet" type="text/css" media="all" href="<c:url value ='/static/resources/css/alertify.bootstrap.css'/>"></link>
	<script src='<c:url value ="/static/resources/js/alertify.js"/>'></script>
	
	<!-- momentJS -->
	<script src='<c:url value ="/static/resources/js/moment.js"/>'></script>
	<script src='<c:url value="/static/resources/js/moment-timezone.js"/>'></script>
	
	<!-- bootstrap-typehead -->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/resources/bootstrap-tokenfield/css/bootstrap-tokenfield.min.css" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/resources/bootstrap-tokenfield/css/tokenfield-typeahead.min.css" />
	<script type="text/javascript" src="${pageContext.request.contextPath}/static/resources/bootstrap-typehead/bootstrap3-typeahead.min.js"></script>
	
	<!-- bootstrap-tagsinput -->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/resources/bootstrap-tagsinput/bootstrap-tagsinput.css" />
	<script type="text/javascript" src="${pageContext.request.contextPath}/static/resources/bootstrap-tagsinput/bootstrap-tagsinput.min.js"></script>
	
	<!-- Bootstrap Datetime Picker -->
	<link href="<c:url value="/static/resources/css/bootstrap-datetimepicker.min.css" />" rel="stylesheet" media="all">
	<script src="<c:url value="/static/resources/js/bootstrap-datetimepicker.js" />"></script>
	
	<!-- Bootstrap Datepicker -->
	<link rel="stylesheet" type="text/css" media="all" href="<c:url value ="/static/resources/css/bootstrap-datepicker3.min.css"/>" />
	<script src='<c:url value ="/static/resources/js/bootstrap-datepicker.min.js"/>'></script>
	
	<!-- DataTable -->
	<link rel="stylesheet" type="text/css" media="all" href="<c:url value ="/static/resources/css/jquery.dataTables.min.css"/>" />
	<link rel="stylesheet" type="text/css" media="all" href="<c:url value ="/static/resources/css/dataTables.bootstrap.css"/>" />
	<script src='<c:url value ="/static/resources/js/jquery.dataTables.min.js"/>'></script>
	<script src='<c:url value ="/static/resources/js/dataTables.bootstrap.js"/>'></script>
	
	<!-- Bootstrap Wizard -->
	<script src='<c:url value ="/static/resources/js/jquery.bootstrap.wizard.js"/>'></script>
	<script src='<c:url value ="/static/resources/js/jquery.bootstrap.wizard.min.js"/>'></script>
	
	<!-- Pnotify -->
	<link rel="stylesheet" type="text/css" media="all" href="<c:url value ="/static/resources/css/pnotify.custom.min.css"/>" />
	<script src='<c:url value ="/static/resources/js/pnotify.custom.min.js"/>'></script>
	
	<!-- jQuery Validate -->
	<script src='<c:url value ="/static/resources/js/jquery.validate.min.js"/>'></script>
		
	<!-- jQuery Mask -->
	<script src='<c:url value ="/static/resources/js/additional-methods.min.js"/>'></script>
	<script src='<c:url value ="/static/resources/js/jquery.inputmask.bundle.min.js" />'></script>
	<script src='<c:url value ="/static/resources/js/jquery.maskedinput.js" />'></script>
	
	<!-- Date js -->
	<script src='<c:url value ="/static/resources/js/date.js" />'></script>
	
	<!-- Daterange Picker -->
	<link rel="stylesheet" type="text/css" media="all" href="<c:url value ="/static/resources/css/daterangepicker-bs3.css"/>" />
	<script src='<c:url value ="/static/resources/js/daterangepicker.js"/>'></script>

	<!-- Full Calendar -->
	<link href='<c:url value="/static/resources/css/fullcalendar.css"/>' rel='stylesheet' type="text/css" />
	<link href='<c:url value="/static/resources/css/fullcalendar.print.css"/>' rel='stylesheet' media='print' />
	<script src='<c:url value="/static/resources/js/fullcalendar.min.js"/>'></script>
	<script src='<c:url value="/static/resources/js/calendar_lang-all.js"/>'></script>
	
	<!-- main.css -->
	<link rel="stylesheet" type="text/css" href="<c:url value ="/static/resources/pageCss/main.css"/>">
		
	<script type="text/javascript">
	$(document).ready(function(){
		$('#goToTop').hide();
		//Check to see if the window is top if not then display button
		$(window).scroll(function(){
			if ($(this).scrollTop() > 300) {
				
				$('.scrollToTop').fadeIn();
			} else {
				$('.scrollToTop').fadeOut();
			}
		});
		
		//Click event to scroll to top
		$('.scrollToTop').click(function(){
			$('html, body').animate({scrollTop : 0},800);
			return false;
		});
		
	});
	
	</script>
	
	<!-- Page Context -->
	<script type="text/javascript">
		var contextPath = "${pageContext.request.contextPath}";
		var local = '${pageContext.response.locale}';
	</script>
	
	<!-- Email -->
	<link href="${ pageContext.request.contextPath }/static/resources/pageCss/email-main.css" rel="stylesheet" type="text/css"></link>
	<script type="text/javascript" src="${ pageContext.request.contextPath }/static/resources/pageJS/email-main.js"></script>
</head>
<body background="${ pageContext.request.contextPath }/static/decorators/BG_W.jpg">
	<jsp:include page="header.jsp" />
	<!-- <div class="container"> -->
		<decorator:body />
	<!-- </div> -->
	<a href="#" class="scrollToTop" id="goToTop"><img src = "${ pageContext.request.contextPath }/static/decorators/uparrow.png" width="54px" height="54px" /></a>
	<jsp:include page="footer.jsp"></jsp:include>	
</body>
</html>