<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>


<div class="form-group navbar navbar-defaults">
  <a class="dropdown-link-menu" href="#" class="dropdown-toggle" data-toggle="dropdown"><spring:message code="label.menu" var="menu" /><b class="caret">${menu}  <span class="glyphicon glyphicon-triangle-bottom" ></span></b></a>
	        	
   		<ul class="dropdown-menu">
   			<c:if test="${ id == 0 || id == null}">

			<li class="active"><a href="${pageContext.request.contextPath}/employee" ><spring:message code="employee.name" /></a></li>
			<li class="disabled disabledTab"><a><spring:message code="family.name" /></a></li>
			<li class="disabled disabledTab"><a><spring:message code="education.name" /></a></li>
			<li class="disabled disabledTab"><a><spring:message code="experience.name" /></a></li>
			<li class="disabled disabledTab"><a><spring:message code="ability.name" /></a></li>
			<li class="disabled disabledTab"><a><spring:message code="reference.name" /></a></li>
			<li class="disabled disabledTab"><a><spring:message code="reward.name" /></a></li>
			<li class="disabled disabledTab"><a><spring:message code="history.name" /></a></li>
			<li class="disabled disabledTab"><a><spring:message code="probation.name" /></a></li>
			<li class="disabled disabledTab"><a><spring:message code="punish.name" /></a></li>
			<li class="disabled disabledTab"><a><spring:message code="leave.name" /></a></li>
			<li class="disabled disabledTab"><a><spring:message code="skilllanguage.name" /></a></li>
			<li class="disabled disabledTab"><a><spring:message code="site.name" /></a></li>
			<li class="disabled disabledTab"><a><spring:message code="certification.name" /></a></li>
			<li class="disabled disabledTab"><a><spring:message code="card.name" /></a></li>
			<li class="disabled disabledTab"><a><spring:message code="allowances.name" /></a></li>
			<li class="disabled disabledTab"><a><spring:message code="health.name" /></a></li>
			</c:if>
			
			<c:if test="${id > 0}">
			<li ><a href="${pageContext.request.contextPath}/employee/init/${id}"  >Employee</a></li>
			<li><a href="${pageContext.request.contextPath}/family/${id}" ><spring:message code="family.name" /></a></li>
			<li><a href="${pageContext.request.contextPath}/education/${id}" ><spring:message code="education.name" /></a></li>
			<li><a href="${pageContext.request.contextPath}/experience/${id}" ><spring:message code="experience.name" /></a></li>
			<li><a href="${pageContext.request.contextPath}/ability/${id}" ><spring:message code="ability.name" /></a></li>
			<li><a href="${pageContext.request.contextPath}/leave/${id}" ><spring:message code="leave.name" /></a></li>
			<li><a href="${pageContext.request.contextPath}/reference/${id}" ><spring:message code="reference.name" /></a></li>
			<li><a href="${pageContext.request.contextPath}/reward/${id}" ><spring:message code="reward.name" /></a></li>
			<li><a href="${pageContext.request.contextPath}/history/${id}" ><spring:message code="history.name" /></a></li>
			<li><a href="${pageContext.request.contextPath}/probation/${id}" ><spring:message code="probation.name" /></a></li>
			<li><a href="${pageContext.request.contextPath}/punish/${id}" ><spring:message code="punish.name" /></a></li>
			<li><a href="${pageContext.request.contextPath}/skilllanguage/${id}" ><spring:message code="skilllanguage.name" /></a></li>
			<li><a href="${pageContext.request.contextPath}/site/${id}" ><spring:message code="site.name" /></a></li>
			<li><a href="${pageContext.request.contextPath}/certification/${id}" ><spring:message code="certification.name" /></a></li>
			<li><a href="${pageContext.request.contextPath}/card/${id}" ><spring:message code="card.name" /></a></li>
			<li><a href="${pageContext.request.contextPath}/allowances/${id}" ><spring:message code="allowances.name" /></a></li>
			<li><a href="${pageContext.request.contextPath}/health/${id}" ><spring:message code="health.name" /></a></li>
			</c:if>
 		</ul>
 </div>

