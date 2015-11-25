<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="f"%>

<!-- decorator-title -->
<title><spring:message code="default.login.btn" var="login"/>${login}</title>

<!-- decorator-body -->
<body>

<div class="container">
		
	<nav class="navbar navbar-inverse navbar-fixed-top">
  		<div class="container-fluid">
	    	<div class="navbar-header">
	      		<div class="navbar-brand">
	      			<img src="<c:url value="/static/decorators/Logo.png" />" id="login-logo"/>
	      		</div>
	    	</div>
		</div>
	</nav>	    
	
	<div class="row">
		<form name='loginForm' action="<c:url value='j_spring_security_check' />" method='POST'>
			<div class="col col-lg-4 col-md-5 col-sm-6 col-xs-12 col-lg-offset-4 col-sm-offset-3" id="login">
				<spring:message code="default.enter" var="enter" />
				<%-- <div class="headLogo" >
					<span><img src="<c:url value="/static/decorators/augmentis-logo.png" />" /></span>	
				</div> --%>
				<h3 id="login-header">Login to Augmentis</h3>
				<div class="form-group">
					<spring:message code="default.login.user" var="username" />
					<%-- <label for="user" class="control-label"><spring:message code="default.login.user" var="username" /> ${username} </label> --%>
					<div class="input-group">
				    	<span class="input-group-addon"> 
				    		<span class="fa fa-user"></span>
				    	</span>
				    	<input type="text" class="form-control" id="user" name='j_username' placeholder="${enter}${username}">
				    </div>
			    </div>
			    <div class="clear"></div>
			    <div class="form-group">
			    <spring:message code="default.login.password" var="password" />
				    <%-- <label for="pwd" class="control-label"><spring:message code="default.login.password" var="password" /> ${password} </label> --%>
				    <div class="input-group">
				    	<span class="input-group-addon"> 
				    		<span class="fa fa-lock"></span>
				    	</span>
						<input type="password" class="form-control" name='j_password' id="pwd" placeholder="${enter}${password}">	
				    </div>
			    </div>
			    
			    <input name="submit" type="submit" id="login-btn" class="btn btn-warning" value="${login}" />
				<br>
			</div>
		</form>
	</div>
	
	<div class="row">
		<div class="col-sm-4 col-sm-offset-4" id="login-error">
			<div id="message">
			   	<c:choose>
			   		<c:when test="${sessionScope['SPRING_SECURITY_LAST_EXCEPTION'].message ne null}">
						<div class="alert alert-danger" role="alert">
							${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}
						</div>
			   		</c:when>
			   		<c:otherwise></c:otherwise>
			   	</c:choose>
		   	</div>
		</div>
	</div>
</div>
<div class="footer">
	<jsp:include page="../../decorators/footer.jsp"></jsp:include>
</div>
</body>