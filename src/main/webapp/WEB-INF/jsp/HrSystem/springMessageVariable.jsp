<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- Spring -->	
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="f"%>

<script>
	var $getContextPath = "${pageContext.request.contextPath}";
	var $msgNewRecord = '<spring:message code="label.newRecord" />';
	var $msgEdit = '<spring:message code="label.edit" />';
	var $msgUpdate = '<spring:message code="label.update" />';
	var $msgSave = '<spring:message code="label.save" />';
	var $msgDelete = '<spring:message code="label.delete" />';
	var $msgAbility='<spring:message code="alert.repeat" />';
	
	
	/* family-massage validate*/
	var $requiredFamilyName = '<spring:message code="family.required.firstName"/>';
	var $requiredLastName   = '<spring:message code="family.required.lastName" />';
	var $requiredAge 		= '<spring:message code="family.required.age" />';
	var $ageIsDigit  		= '<spring:message code="family.required.age.num" />';
	var $ageIsZero			= '<spring:message code="family.required.age.notzero" />';
	var $requiredMobile		= '<spring:message code="family.required.mobile" />'
	var $formatMobile		= '<spring:message code="family.required.mobile.format" />';
	var $requiredAddress    = '<spring:message code="family.required.address" />';
	var $requiredMasRelation 	= '<spring:message code="family.required.masRelation" />';
	

	/* language-massage validate */
	var $requiredMasSkillLanguage = '<spring:message code="skilllanguage.required.masSkillLanguage" />';
	var $requiredLanguage = '<spring:message code="skilllanguage.required.Language" />';
	var $dupicateLanguage = '<spring:message code="duplicate.language.namelanguage" />';

	
	/* site-message validate */
	var $requiredProjectname = '<spring:message code="site.required.projectname" />';
	var $requiredProjectOwner = '<spring:message code="site.required.projectOwner" />';
	var $requiredProjectOwnerContact = '<spring:message code="site.required.projectOwnerContact" />';
	var $requiredStartDate = '<spring:message code="site.required.startDate" />';
	var $requiredEndDate = '<spring:message code="site.required.endDate" />';

	/* reference-message validate*/
	var $validatenamereference = '<spring:message code="reference.required.fullname" />';
	var $validatetelreference = '<spring:message code="reference.required.telephone" />';
	var $validateaddressreference = '<spring:message code="reference.required.address" />';
	var $validateoccupationreference = '<spring:message code="reference.required.occupation" />';
	
		
	/* reward-message validate*/
	var $validatenamereward = '<spring:message code="reward.required.name" />';
	var $validateyearreward =  '<spring:message code="reward.required.year" />';
	

	/* punish-message validate*/
	var $validatepunish = '<spring:message code="punish.required.date" />';
	var $validatedescriptionpunish =  '<spring:message code="punish.required.description" />';
	var $validatepenaltypunish =  '<spring:message code="punish.required.penalty" />';
	
	
	/* card-message validate*/
	var $validatecardno = '<spring:message code="card.required.cardno" />';
	var $validatedestartdatecard =  '<spring:message code="card.required.startdate" />';
	var $validatestatuscard =  '<spring:message code="card.required.status" />';

	/* education-message validate */
	var $requiredstartdate = '<spring:message code="education.required.start.date" />';
	var $requiredfinishdate = '<spring:message code="education.required.finish.date" />';
	var $requireduniversity = '<spring:message code="education.required.university" />';
	var $requiredfaculty = '<spring:message code="education.required.faculty" />';
	var $requiredmajor = '<spring:message code="education.required.major" />';
	var $requireddeegreetype = '<spring:message code="education.required.deegreetype" />';
	var $requiredgpa = '<spring:message code="education.required.gpa" />';
	var $requiredgpadigit = '<spring:message code="education.required.gpa.digit" />';
	
	/* allowances-message validate */
	var $requiredmasallowances = '<spring:message code="allowances.required.masallowances" />';
	
	/* certification-message validate */
	var $requiredyear = '<spring:message code="certification.required.year" />';
	var $requiredcertificationname = '<spring:message code="certification.required.certification.name" />';
	var $requiredcertificationform = '<spring:message code="certification.required.certification.form" />';
	var $requireddescription = '<spring:message code="certification.required.description" />';
	
	
	/* history-message validate */
	var $requiredposition = '<spring:message code="history.required.position" />';
	var $requiredsalary = '<spring:message code="history.required.salary" />';
	var $requireddateOfAdjustment = '<spring:message code="history.required.dateOfAdjustment" />';
	
	/* reportEmpCode-message validate */
	var $requiredreportType = '<spring:message code="report.validate.reportType" />';

	
	/* ability-message validate*/
	var $validateabilitymasspecialty='<spring:message code="ability.required.masspecialty" />';
	
	/* leave-message validate*/
	var $validateNameMasleavetype='<spring:message code="leave.required.masleavetype" />';
	var $validateReason='<spring:message code="leave.required.reason" />';
	var $validateStartdate='<spring:message code="leave.required.start.date.time" />';
	var $validateEnddate='<spring:message code="leave.required.end.date.time" />';
	var $validateAim='<spring:message code="leave.required.aim" />';
	
	
	/* employee.address-message validate*/
	
	var $validateaddressType = '<spring:message code="address.required.addressType" />';
	var $validatehouseNo = '<spring:message code="address.required.houseNo" />';
	var $validateroad = '<spring:message code="address.required.road" />';
	var $validatedistrict = '<spring:message code="address.required.district" />';
	var $validatesubDistrict = '<spring:message code="address.required.subDistrict" />';
	var $validateprovince = '<spring:message code="address.required.province" />';
	var $validatezipcode = '<spring:message code="address.required.zipcode" />';
	var $validatealertmessage = '<spring:message code="address.required.alertAddress" />';
	
	
	/* employee-message validate*/
	
	var $validatenameThai = '<spring:message code="employee.required.nameThai" />';
	var $validatethaiLanguage = '<spring:message code="employee.required.thaiLanguage" />';
	var $validatesurnameThai = '<spring:message code="employee.required.surnameThai" />';
	var $validatenicknameThai = '<spring:message code="employee.required.nicknameThai" />';
	var $validatenameEng = '<spring:message code="employee.required.nameEng" />';
	var $validatesurnameEng = '<spring:message code="employee.required.surnameEng" />';
	var $validatenicknameEng = '<spring:message code="employee.required.nicknameEng" />';
	
	var $validateemail = '<spring:message code="employee.required.email" />';
	var $validatetelHome = '<spring:message code="employee.required.telHome" />';
	var $validatetelMobile = '<spring:message code="employee.required.telMobile" />';
	var $validatetelFax = '<spring:message code="employee.required.telFax" />';
	var $validatecongenitalDisease = '<spring:message code="employee.required.congen" />';
	var $validatehospital = '<spring:message code="employee.required.hospital" />';
	
	var $validateemergencyContact = '<spring:message code="employee.required.emergencyContact" />';
	var $validaterelationshipWithEmergencyContact = '<spring:message code="employee.required.relation" />';
	var $validateemergencyContactAddress = '<spring:message code="employee.required.emergencyAddress" />';
	var $validateemergencyContactPhoneNumber = '<spring:message code="employee.required.emergencyConPhoneNum" />';
	var $validatedateOfBirth = '<spring:message code="employee.required.dob" />';
	var $validatefromYear = '<spring:message code="employee.required.fromYear" />';
	
	var $validatetoYear = '<spring:message code="employee.required.toYear" />';
	var $validateplaceOfBirth = '<spring:message code="employee.required.pob" />';
	var $validateage = '<spring:message code="employee.required.age" />';
	var $validatereligion = '<spring:message code="employee.required.religion" />';
	var $validateidCard = '<spring:message code="employee.required.idCard" />';
	var $validateissuedOffice = '<spring:message code="employee.required.issuedOffice" />';
	
	var $validateexpiryDate = '<spring:message code="employee.required.expiryDate" />';
	var $validateheight = '<spring:message code="employee.required.height" />';
	var $validateweigth = '<spring:message code="employee.required.weigth" />';
	var $validatesex = '<spring:message code="employee.required.sex" />';
	var $validatemaritalStatus = '<spring:message code="employee.required.maritalStatus" />';
	var $validatenumberOfChildren = '<spring:message code="employee.required.Children" />';
	
	var $validatespouseName = '<spring:message code="employee.required.spouseName" />';
	var $validatemarriageCertificateNo = '<spring:message code="employee.required.marcert" />';
	var $validateissuedOffice2 = '<spring:message code="employee.required.issuedOffice" />';
	var $validateaddress = '<spring:message code="employee.required.address" />';
	var $validateoccupation = '<spring:message code="employee.required.occupation" />';
	var $validatemilitaryServiceYes = '<spring:message code="employee.required.militaryServiceYes" />';
	
	var $validatedescriptionYes = '<spring:message code="employee.required.pleasewrite" />';
	var $validatebranchOfService = '<spring:message code="employee.required.branchOfService" />';
	var $validateserviceNo = '<spring:message code="employee.required.serviceNo" />';
	var $validatereasonsNo = '<spring:message code="employee.required.reasons" />';
	var $validatedateToBeDrafted = '<spring:message code="employee.required.datedrafted" />';
	var $validatepreviousEmpreasonsNo = '<spring:message code="employee.required.givethereason" />';
	
	var $validateofficialDate = '<spring:message code="official.required.officialDate" />';
	var $validatestartWorkDate = '<spring:message code="official.required.startWorkDate" />';
	var $validateendWorkDate = '<spring:message code="official.required.endWorkDate" />';
	var $validatepositionAppliedFor = '<spring:message code="official.required.position" />';
	var $validatesalaryExpected = '<spring:message code="official.required.salary" />';
	var $validateprobationDate = '<spring:message code="employee.required.probationdate" />';
	
	var $validatemasEmployment = '<spring:message code="employee.required.employment" />';
	var $validatemasCoreSkill = '<spring:message code="employee.required.coreSkill" />';
	var $validatemasLocation = '<spring:message code="employee.required.location" />';
	var $validatemasDivision = '<spring:message code="employee.required.division" />';
	var $validatemasJoblevel = '<spring:message code="employee.required.joblevel" />';
	var $validatetechnology = '<spring:message code="employee.required.technology" />';
	var $validatemasStaffType = '<spring:message code="employee.required.staffType" />';
	var $validatestatusemp = '<spring:message code="employee.required.statusemp" />';
	var $validateUniqueIdCard = '<spring:message code="employee.unique.idCard" />';
	


	/* experience-message validate*/
	var $validateExpDateFrom = '<spring:message code="experience.required.dateFrom" />';
	var $validateExpDateTo =  '<spring:message code="experience.required.dateTo" />';
	var $validateExpCompanyName =  '<spring:message code="experience.required.companyName" />';
	var $validateExpPosition =  '<spring:message code="experience.required.position" />';
	var $validateExpSalary=  '<spring:message code="experience.required.salary" />';
	var $validateExpSalaryDigits =  '<spring:message code="experience.required.salary.digits" />';
	var $validateExpReason =  '<spring:message code="experience.required.reason" />';
	
	
	/* probation-message validate*/
	var $validateProDateFrom = '<spring:message code="probation.required.dateFrom" />';
	var $validateProDateTo = '<spring:message code="probation.required.dateTo" />';
	var $validateProStatus = '<spring:message code="probation.required.status" />';
	
	/* PNotify */
	var $notifySuccess =  '<spring:message code="PNotify.success" />';
	var $notifyAdd='<spring:message code="PNotify.add" />';
	var $notifyUpdate='<spring:message code="PNotify.update" />';
	var $notifyDelete='<spring:message code="PNotify.delete" />';
	var $notifyreserved='<spring:message code="PNotify.reserved" />';
	
	/* health-validate */
	var $requiredCongenitalDisease =  '<spring:message code="health.required.congenitalDisease" />';
	var $requiredCongenitalDiseaseExplain =  '<spring:message code="health.required.congenitalDiseaseExplain" />';
	var $requiredGeneticDisease  =  '<spring:message code="health.required.geneticDisease" />';
	var $requiredGeneticDiseaseExplain =  '<spring:message code="health.required.geneticDiseaseExplain" />';
	var $requiredTakeMedicine  =  '<spring:message code="health.required.takeMedicine" />';
	var $requiredTakeMedicineExplain =  '<spring:message code="health.required.takeMedicineExplain" />';
	var $requiredIntolerance =  '<spring:message code="health.required.intolerance" />';
	var $requiredIntoleranceExplain =  '<spring:message code="health.required.intoleranceExplain" />';
	
	/* reservation-validate*/
	var $confirmYes = '<spring:message code="default.yes" />';
	var $confirmNo = '<spring:message code="default.no" />';
	var $confirmUpdate = '<spring:message code="reservation.confirm.update" />';
	var $cannotMove = '<spring:message code="reservation.cannot.move" />';
	var $requiredRoom = '<spring:message code="require.reservation.room" />';
	var $requiredType = '<spring:message code="require.reservation.type" />';
	var $requiredBy = '<spring:message code="require.reservation.by" />';
	var $requiredDivision = '<spring:message code="require.reservation.division" />';
	var $requiredDescription = '<spring:message code="require.reservation.description" />';
	

	
</script>