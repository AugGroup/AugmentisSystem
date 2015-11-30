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
	<div class="row">
		<form name='loginForm' action="<c:url value='j_spring_security_check' />" method='POST'>
			<div class="col col-lg-4 col-md-5 col-sm-6 col-xs-12 col-lg-offset-4 col-sm-offset-3" id="login">
				<spring:message code="default.enter" var="enter" />
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
				
				<div class="container">
  					<a href="#" data-target="#pwdModal" data-toggle="modal">Forgot my password</a>
				</div>
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
	
	<!--modal-->
			<div id="pwdModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
			  <div class="modal-dialog">
			  <div class="modal-content">
			      <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			          <h1 class="text-center">What's My Password?</h1>
			      </div>
			      <div class="modal-body">
			          <div class="col-md-12">
			                <div class="panel panel-default">
			                    <div class="panel-body">
			                        <div class="text-center">
			                          
			                          <p>If you have forgotten your password you can reset it here.</p>
			                            <div class="panel-body">
			                                <%-- <form action="${pageContext.request.contextPath}/login/sendemail" method="POST" > --%>
			                                    <div class="form-group">
			                                        <input id="receiver" class="form-control input-lg" placeholder="E-mail Address" name="receiver" type="email">
			                                    </div>
			                                  <!--   <input class="btn btn-lg btn-primary btn-block" value="Send My Password" type="submit"> -->
			                                    <button type="button" id="sendBtn" class="btn btn-lg btn-primary btn-block"><spring:message code="request.email.send"/></button>
			                                <%-- </form> --%>
			                            </div>
			                        </div>
			                    </div>
			                </div>
			            </div>
			      </div>
			      <div class="modal-footer">
			          <div class="col-md-12">
			          <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
					  </div>	
			      </div>
			  </div>
		  	</div>
		  </div>
</div>
</body>

