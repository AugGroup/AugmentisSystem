
var dt;
var rowUpdate;
var dataUpdate;
var getIndex = 0;

	$(document).ready(function() {
		 		
		new jQueryCollapse($("#collapse-show-hide-info"), {
		      open: function() {
		        this.slideDown(300);
		      
		       $("#infomation-arrow").removeClass("glyphicon glyphicon-menu-down");
		       $("#infomation-arrow").addClass("glyphicon glyphicon-menu-up"); 
		      },
		      close: function() {
		        this.slideUp(300);
		        
		        $("#infomation-arrow").removeClass("glyphicon glyphicon-menu-up"); 
		        $("#infomation-arrow").addClass("glyphicon glyphicon-menu-down");
		      }
		    });

		 new jQueryCollapse($("#collapse-show-hide-general"), {
		        open: function() {
		          this.slideDown(300);
		          $("#general-arrow").removeClass("glyphicon glyphicon-menu-down");
		          $("#general-arrow").addClass("glyphicon glyphicon-menu-up"); 
		        },
		        close: function() {
		          this.slideUp(300);
		          $("#general-arrow").removeClass("glyphicon glyphicon-menu-up"); 
		          $("#general-arrow").addClass("glyphicon glyphicon-menu-down");
		        }
		      });
		    
		    new jQueryCollapse($("#collapse-show-hide-official"), {
		        open: function() {
		          this.slideDown(300);
		          $("#official-arrow").removeClass("glyphicon glyphicon-menu-down");
		          $("#official-arrow").addClass("glyphicon glyphicon-menu-up"); 
		        },
		        close: function() {
		          this.slideUp(300);
		          $("#official-arrow").removeClass("glyphicon glyphicon-menu-up"); 
		          $("#official-arrow").addClass("glyphicon glyphicon-menu-down");
		        }
		      });
		
		$("#telHome").mask("(99) 999-9999");
		$("#telMobile").mask("(999) 999-9999");
		$("#telFax").mask("(99) 999-9999");
		$("#idCard").mask("9-9999-99999-99-9");
		$("#emergencyContactPhoneNumber").mask("(999) 999-9999"); 

		/*$('#nameThai').mask('AAAAAAAAAAAAAAAAAAAAAAAAAA', {'translation': {
            A: {pattern: /[ก-๋]/} 
          }
    });*/
		
		$('#salaryExpected').mask('0,000,000.00', {reverse: true});
		
		
		/* $("#startWorkDate").datepicker({
	        minDate: 0,
	        maxDate: "+60D",
	        numberOfMonths: 2,
	        onSelect: function(selected) {
	          $("#txtToDate").datepicker("option","minDate", selected)
	        }
	    });
		
		$("#endWorkDate").datepicker({ 
	        minDate: 0,
	        maxDate:"+60D",
	        numberOfMonths: 2,
	        onSelect: function(selected) {
	           $("#txtFromDate").datepicker("option","maxDate", selected)
	        }
	    });  */
		
//------------------------------------------------------ Validate --------------------------------------------------------------------------------------------

$(".closeAddressButton").off("click").on("click",function() {
	//$('#validateAddress').bootstrapValidator('resetForm', true);
});
		
		
$("#validateAddress").validate({
	rules: {
		addressType: "required",
		houseNo: "required",
		road: "required",
		district: "required",
		subDistrict: "required",
		province: "required",
		zipcode: {
			required: true,
			 digits: true,
			 rangelength : [5, 5]
		}
		
	},
	messages: {
		addressType: $validateaddressType,
		houseNo: $validatehouseNo,
		road: $validateroad,
		district: $validatedistrict,
		subDistrict: $validatesubDistrict,
		province: $validateprovince,
		zipcode: $validatezipcode
		
	}
});		
		




		function doFindData() {  
			
			
			var $idCard = $('#idCard');	
			var $id = $('#id');
		    var val=0; 
		    
		    
		     $.ajax({  
		     type : "POST",  
		     data : JSON.stringify({"id":$id.val(),
		    	 					"cardId":$idCard.val()}), 
		     url : $getContextPath+"/employee/finduniqueidcard",   
		     dataType : 'json', 
		     contentType :"application/json; charset=utf-8",
		     async: false,  
		    
		     success : function(data) {  
		   	       
		    	 		val=data;
		    	 		//console.log('a: '+val[0].id);
			     } 
		    
		     }); 	
		    
		    return val;
		    
		}


		jQuery.validator.addMethod("unique", function(value) {
			
		   //debugger;			
	  	   var dataCount=0;
	       dataCount = doFindData();	  	   
	  	   console.log('datac: '+dataCount.length);
		   return dataCount.length==0;
		}, "Value is not unique.");
		
		
		jQuery.validator.classRuleSettings.unique = {
		    unique: true
		};


		
// ---------------------------------------------- Validate Thai Language ------------------------------------------------ // 
		
		jQuery.validator.addMethod("languageThai", function(value, element) {
						   		  // allow any non-whitespace characters as the host part
						   		  return this.optional( element ) || /^[ก-๋]+$/.test( value );
						   		}, $validatethaiLanguage);

		
    var validator = $("#addForm").validate({
    errorPlacement:function(error,element){
    	error.insertAfter(element);
    },
	rules: {
		nameThai: {
			required : true,
			languageThai : true},
		/*surnameThai: { 
		  required : true,
		  languageThai : true},
		nicknameThai:  {
		  required : true,
		  languageThai : true},*/
		nameEng: "required",
		/*surnameEng: "required",
		nicknameEng: "required",
		congenitalDisease: "required",
		hospital: "required",*/
		
		emergencyContact: "required",
		/*relationshipWithEmergencyContact: "required",
		emergencyContactAddress: "required",*/
		dateOfBirth: "required",
		/*placeOfBirth: "required",*/
		/*fromYear: "required",
		toYear: "required",*/
		
		/*religion: "required",
		issuedOffice: "required",
		expiryDate: "required",*/
		
		/*sex:{ required:true},
		maritalStatus:{ required:true},
		spouseName: "required",
		marriageCertificateNo: "required",*/
		
		/*issuedOffice2: "required",
		address: "required",
		occupation: "required",
		militaryServiceYes: "required",*/
		/*descriptionYes: "required",*/
		
		/*branchOfService: "required",
		serviceNo: "required",
		reasonsNo: "required",
		dateToBeDrafted: "required",
		previousEmpreasonsNo: "required",*/
		
		officialDate: "required",
		startWorkDate: "required",
		/*endWorkDate: "required", */
		positionAppliedFor: "required",
		
		probationDate: "required",
		masEmployment: "required",
		masCoreSkill: "required",
		masLocation: "required",
		masDivision: "required",
		
		masJoblevel: "required",
		technology: "required",
		masStaffType: "required",
		
		email: {
			required: true,
			email: true
		}, 
		
	 	telHome: {
			required: true,
			rangelength : [13, 13]
			/*  digits: true, 
			 minlength: 9,
			 maxlength: 9  */ 
			 
		}, 
		
		telMobile: {
			required: true,
			rangelength : [14, 14]
			 /* digits: true,
			 minlength: 10,
			 maxlength: 10 */
		},
		
		/*telFax: {
			required: true,
			rangelength : [11, 11]
			  digits: true,
			 minlength: 10,
			 maxlength: 10 
		},*/
		
		idCard: {
			 required: true,
			 /*rangelength : [17, 17]
			 digits: true,
			 minlength: 13,
			 maxlength: 13*/ 
		},
		
		/*age: {
			required: true,
			 digits: true,
			 minlength: 2
		},
		
		height: {
			required: true,
			 digits: true
		},
		
		weigth: {
			required: true,
			 digits: true
		},*/
		
		emergencyContactPhoneNumber: {
			required: true,
			rangelength : [14, 14]
			 /* digits: true,
			 minlength: 10,
			 maxlength: 10 */
		},
		
		/*numberOfChildren: {
			required: true,
			 digits: true
		},*/
		
		salaryExpected: {
			required: true
			 /* digits: true */
		},
		statusemp: "required"
	
	},
	
	messages: {
		nameThai: $validatethaiLanguage,
		/*surnameThai: $validatesurnameThai,
		nicknameThai: $validatenicknameThai,*/
		nameEng: $validatenameEng,
		/*surnameEng: $validatesurnameEng,
		nicknameEng: $validatenicknameEng,*/
		
		email: $validateemail,
		telHome: $validatetelHome,
		telMobile: $validatetelMobile,
		/*telFax: $validatetelFax,
		congenitalDisease: $validatecongenitalDisease,
		hospital: $validatehospital,*/
		
		emergencyContact: $validateemergencyContact,
		/*relationshipWithEmergencyContact: $validaterelationshipWithEmergencyContact,
		emergencyContactAddress: $validateemergencyContactAddress,*/
		emergencyContactPhoneNumber: $validateemergencyContactPhoneNumber,
		dateOfBirth: $validatedateOfBirth,
		/*fromYear: $validatefromYear,
		
		toYear: $validatetoYear,
		placeOfBirth: $validateplaceOfBirth,
		age: $validateage,
		religion: $validatereligion,*/
		idCard: {
			required: $validateidCard,
			//rangelength: 'length err',
			//unique: $validateUniqueIdCard 
		},
		/*issuedOffice: $validateissuedOffice,
		
		expiryDate: $validateexpiryDate,
		height: $validateheight,
		weigth: $validateweigth,
		sex: $validatesex,
		maritalStatus: $validatemaritalStatus,
		numberOfChildren: $validatenumberOfChildren,*/
		
		/*spouseName: $validatespouseName,
		marriageCertificateNo: $validatemarriageCertificateNo,
		issuedOffice2: $validateissuedOffice2,
		address: $validateaddress,
		occupation: $validateoccupation,
		militaryServiceYes: $validatemilitaryServiceYes,
		
		descriptionYes: $validatedescriptionYes,
		branchOfService: $validatebranchOfService,
		serviceNo: $validateserviceNo,
		reasonsNo: $validatereasonsNo,
		dateToBeDrafted: $validatedateToBeDrafted,
		previousEmpreasonsNo: $validatepreviousEmpreasonsNo,*/
		
		officialDate: $validateofficialDate,
		startWorkDate: $validatestartWorkDate,
		/*endWorkDate: $validateendWorkDate,*/ 
		positionAppliedFor: $validatepositionAppliedFor,
		salaryExpected: $validatesalaryExpected,
		probationDate: $validateprobationDate,
		
		masEmployment: $validatemasEmployment,
		masCoreSkill: $validatemasCoreSkill,
		masLocation: $validatemasLocation,
		masDivision: $validatemasDivision,
		masJoblevel: $validatemasJoblevel,
		technology: $validatetechnology,
		masStaffType: $validatemasStaffType,
		statusemp: $validatestatusemp
		
		
		
	}
});		
	

/* -------------------------------------------- Validate CheckBox ----------------------------------------------------------- */	
$("#descriptionNewspaper").hide();//descriptionYes ชื่อกล่อง
$("input:checkbox[name=knowAugNewspaper]").change(function(){//name= ชื่อ group checkbox

	if(this.value == 'Newspaper' && this.checked){
	 $("#descriptionNewspaper").show();
	}else{
	$("#descriptionNewspaper").hide();
}
});


$("#descriptionMagazine").hide();//descriptionYes ชื่อกล่อง
$("input:checkbox[name=knowAugMagazine]").change(function(){//name= ชื่อ group checkbox

	if(this.value == 'Magazine' && this.checked){
	 $("#descriptionMagazine").show();
	}else{
	$("#descriptionMagazine").hide();
}
});

$("#descriptionWebsite").hide();//descriptionYes ชื่อกล่อง
$("input:checkbox[name=knowAugWebsite]").change(function(){//name= ชื่อ group checkbox

	if(this.value == 'Website' && this.checked){
	 $("#descriptionWebsite").show();
	}else{
	$("#descriptionWebsite").hide();
}
});

$("#descriptionFriend").hide();//descriptionYes ชื่อกล่อง
$("input:checkbox[name=knowAugFriend]").change(function(){//name= ชื่อ group checkbox

	if(this.value == 'Friend' && this.checked){
	 $("#descriptionFriend").show();
	}else{
	$("#descriptionFriend").hide();
}
});


$("#descriptionOther").hide();//descriptionYes ชื่อกล่อง
$("input:checkbox[name=knowAugOther]").change(function(){//name= ชื่อ group checkbox

	if(this.value == 'Other' && this.checked){
	 $("#descriptionOther").show();
	}else{
	$("#descriptionOther").hide();
}
});

if($('#Newspaper').prop( "checked" )){
	 $("#descriptionNewspaper").show();
}

if($('#Magazine').prop( "checked" )){
	 $("#descriptionMagazine").show();
}

if($('#Website').prop( "checked" )){
	 $("#descriptionWebsite").show();
}

if($('#Friend').prop( "checked" )){
	 $("#descriptionFriend").show();
}


if($('#Other').prop( "checked" )){
	$("#descriptionOther").show();
}
/* -------------------------------------------- Validate radio Yes/No ----------------------------------------------------------- */		

$("#descriptionYesNameDiv").hide();//descriptionYes ชื่อกล่อง
$("#positionYesDiv").hide();
$("#relationYesDiv").hide();

$("input:radio[name=knowEmployed]").change(function(){//name= ชื่อ group radio
    
	
	if(this.value == 'Yes' && this.checked){
	 $("#descriptionYesNameDiv").show();
	 $("#positionYesDiv").show();
	 $("#relationYesDiv").show();
	 
	}else{
		$("#descriptionYesNameDiv").hide();
		$("#positionYesDiv").hide();
		$("#relationYesDiv").hide();
}
});


if($('#knowEmployed').val()=="Yes"){
	 $("#descriptionYesNameDiv").show();
	 $("#positionYesDiv").show();
	 $("#relationYesDiv").show();
	
}else if($('#knowEmployed').val()=="No"){
	$("#descriptionYesNameDiv").hide();//descriptionYes ชื่อกล่อง
	$("#positionYesDiv").hide();
	$("#relationYesDiv").hide();
	
}


/*$("#numberOfChildrenDiv").hide();//descriptionYes ชื่อกล่อง
$("#spouseNameDiv").hide();
$("#marriageCertificateNoDiv").hide();
$("#issuedOffice2Div").hide();
$("#addressDiv").hide();
$("#occupationDiv").hide();*/

$("input[name=maritalStatus]:radio").change(function(){//name= ชื่อ group radio
	if(this.value == 'Single' && this.checked){
		$("#numberOfChildrenDiv").hide();//descriptionYes ชื่อกล่อง
		$("#spouseNameDiv").hide();
		$("#marriageCertificateNoDiv").hide();
		$("#issuedOffice2Div").hide();
		$("#addressDiv").hide();
		$("#occupationDiv").hide();
	}else{
		$("#numberOfChildrenDiv").show();//descriptionYes ชื่อกล่อง
		$("#spouseNameDiv").show();
		$("#marriageCertificateNoDiv").show();
		$("#issuedOffice2Div").show();
		$("#addressDiv").show();
		$("#occupationDiv").show();
  }
});



	if($('#Single').is(":checked")==true ){
		$("#numberOfChildrenDiv").hide();//descriptionYes ชื่อกล่อง
		$("#spouseNameDiv").hide();
		$("#marriageCertificateNoDiv").hide();
		$("#issuedOffice2Div").hide();
		$("#addressDiv").hide();
		$("#occupationDiv").hide();
	}
	else if($('#Married').is(":checked")==true){
	$("#numberOfChildrenDiv").show();//descriptionYes ชื่อกล่อง
	$("#spouseNameDiv").show();
	$("#marriageCertificateNoDiv").show();
	$("#issuedOffice2Div").show();
	$("#addressDiv").show();
	$("#occupationDiv").show();
	
	}
	else if($('#Divorce').is(":checked")==true){
		$("#numberOfChildrenDiv").show();//descriptionYes ชื่อกล่อง
		$("#spouseNameDiv").show();
		$("#marriageCertificateNoDiv").show();
		$("#issuedOffice2Div").show();
		$("#addressDiv").show();
		$("#occupationDiv").show();
		
		}


$("#fromYearDiv").hide();
$("#toYearDiv").hide();
$("#branchOfServiceDiv").hide();
$("#serviceNoDiv").hide();
$("input:radio[name=militaryService]").change(function(){//name= ชื่อ group radio

	if(this.value == 'Yes' && this.checked){

	 $("#fromYearDiv").show();
	 $("#toYearDiv").show();
	 $("#branchOfServiceDiv").show();
	 $("#serviceNoDiv").show();
	 
	}else{
		 $("#fromYearDiv").hide();
		 $("#toYearDiv").hide();
		 $("#branchOfServiceDiv").hide();
		 $("#serviceNoDiv").hide();
  }
});


if($('#militaryService').val()=="Yes"){
	
	 $("#fromYearDiv").show();
	 $("#toYearDiv").show();
	 $("#branchOfServiceDiv").show();
	 $("#serviceNoDiv").show();
	
	
}else if($('#knowEmployed').val()=="No"){
	
	 $("#fromYearDiv").hide();
	 $("#branchOfServiceDiv").hide();
	 $("#serviceNoDiv").hide();
	
}



$("#reasonsNo").hide();//descriptionYes ชื่อกล่อง
$("#dateToBeDrafted").hide();
$("input:radio[name=militaryService]").change(function(){//name= ชื่อ group radio

if(this.value == 'No' && this.checked){
	 $("#reasonsNo").show();
	 $("#dateToBeDrafted").show();
	 
	}else{
		$("#reasonsNo").hide();
		$("#dateToBeDrafted").hide();
}
});

if($('#militaryService').val()=="No"){
	 $("#reasonsNo").show();
	 $("#dateToBeDrafted").show();
	
	
}else if($('#knowEmployed').val()=="Yes"){
	 $("#reasonsNo").hide();
	 $("#dateToBeDrafted").hide();
	
}




$("#previousEmpreasonsNo").hide();//descriptionYes ชื่อกล่อง
$("input:radio[name=previousEmployer]").change(function(){//name= ชื่อ group radio

	if(this.value == 'No' && this.checked){
	 $("#previousEmpreasonsNo").show();
	}else{
	$("#previousEmpreasonsNo").hide();
}
});
		
if($('#previousEmployer').val()=="No"){
	$("#previousEmpreasonsNo").show();
	
}else if($('#previousEmployer').val()=="Yes"){
	$("#previousEmpreasonsNo").hide();
	
}
		
		
		var date1 = $( "#dateOfBirth" ).datetimepicker({
			format : "DD-MM-YYYY",
			viewMode : 'years'
		});
		
    	var date2 = $( "#expiryDate" ).datetimepicker({
    		format : "DD-MM-YYYY",
		});
    	
    	var date3 = $( "#fromYear" ).datetimepicker({
    		format : "DD-MM-YYYY",
		});
    	
    	var date4 = $( "#toYear" ).datetimepicker({
    		format : "DD-MM-YYYY",
		});
    	
    	var date5 = $( "#dateToBeDrafted" ).datetimepicker({
    		format : "DD-MM-YYYY",
		});
    	
    	var date6 = $( "#officialDate" ).datetimepicker({
    		format : "DD-MM-YYYY",
		});
    
    	
    	var date6 = $( "#startWorkDate" ).datetimepicker({
    		format : "DD-MM-YYYY"
		});
    	
    
    	
    	var date6 = $( "#endWorkDate" ).datetimepicker({
    		format : "DD-MM-YYYY",
		});
    	
 	
    	
    	var date6 = $( "#probationDate" ).datetimepicker({
    		format : "DD-MM-YYYY",
		});
    	
    
    	
     if($('#id').val()==null||$('#id').val()===''){
    	 
    	 $('#endWorkDate').data("DateTimePicker").disable();
    	 
     }
    	
     if($('#id').val()!=null&&$('#id').val()!==''){
     	 
    	  var defaultDate2 = new Date($('#startWorkDate').data("DateTimePicker").date());
		  defaultDate2.setDate(defaultDate2.getDate()+1);
		  $('#endWorkDate').data("DateTimePicker").minDate(defaultDate2);
    	 
    	
    	 $("#startWorkDate").on("dp.change", function (d) {
  				 
    		      var defaultDate = new Date($('#startWorkDate').data("DateTimePicker").date());
				  defaultDate.setDate(defaultDate.getDate()+1);
				  $('#endWorkDate').data("DateTimePicker").minDate(defaultDate);
				  /* $('#endWorkDate').data("DateTimePicker").date(defaultDate); */
    	
         }); 
    		
     }	
     
     
     $('#toYear').data("DateTimePicker").disable();
     
    if($("input[name='fromYear']").val()==null||$("input[name='fromYear']").val()===''){
    	
    	
        $("#fromYear").on("dp.change", function (d) {
   			 
      	  $('#toYear').data("DateTimePicker").enable();    	
   	      var defaultDate4 = new Date($('#fromYear').data("DateTimePicker").date());
   		  defaultDate4.setDate(defaultDate4.getDate()+1);
   		  $('#toYear').data("DateTimePicker").minDate(defaultDate4);
   		  /* $('#endWorkDate').data("DateTimePicker").date(defaultDate); */
	
   		}); 
    	
    } else if($("input[name='fromYear']").val()!=null&&$("input[name='fromYear']").val()!==''){
    	
    	  $('#toYear').data("DateTimePicker").enable();    	
    	  var defaultDate3 = new Date($('#fromYear').data("DateTimePicker").date());
		  defaultDate3.setDate(defaultDate3.getDate()+1);
		  $('#toYear').data("DateTimePicker").minDate(defaultDate3);
    	
         $("#fromYear").on("dp.change", function (d) {
    			 
    	      var defaultDate4 = new Date($('#fromYear').data("DateTimePicker").date());
    		  defaultDate4.setDate(defaultDate4.getDate()+1);
    		  $('#toYear').data("DateTimePicker").minDate(defaultDate4);
    		  /* $('#endWorkDate').data("DateTimePicker").date(defaultDate); */

    	}); 
    }
		
     
		
    	$('[name="saveButton"]').click(function() {
    	
				$('[name="employeeForm"]').attr('action',
						$getContextPath+"/employee/submit");
				$('[name="employeeForm"]').submit(); 
		});
    	
    	 dt=$("#tbResult").dataTable( 
    		 	 { 
    		 		"searching": false,
    				"bLengthChange": false,
    				"iDisplayLength": 10,
    				"pagingType": "simple_numbers",
    				"ordering": false,
    				"info": false,
    				"paging": false,
    		 		 
    		 	 
    		 		 "columnDefs": [
    	    	                  {
    	    	                     "targets": [ 0 ],
    	    	                     "visible": false
    	    	                 },
    	    	                 {
    	    	                     "targets": [ 1 ],
    	    	                     "visible": false
    	    	                 },
    	    	                 
    	    	                 {
    	    	                     "targets": [ 7 ],
    	    	                     "visible": false
    	    	                 }, 
    	    	                 
    	    	                  {
    	    	                     "targets": [ 10 ],
    	    	                     "visible": false
    	    	                 }, 
    	    	                 
    	    	                 
    	    	                 {
    	    	                     "targets": [ 12 ],
    	    	                     "visible": false
    	    	                 }
    	    	                 
    	    	                     	    	                 
    	    	           ]  
    			
    			} ); 
    	 
          	 
			    	
		
/* 	 	$("#nameThai").val('bbb');
		$("#surnameThai").val('aaa');
		$("#nicknameThai").val('nnn');
		$("#nameEng").val('mmm');
		$("#surnameEng").val('ppp');
		$("#nicknameEng").val('aaa');
		$("#email").val('bb@hotmail.com');
		$("#telHome").val('02356995');
		$("#telMobile").val('02445533');
		$("#telFax").val('0235996');
		$("#congenitalDisease").val('help');
		$("#hospital").val('rama');
		$("#emergencyContact").val('bbaa');
		$("#relationshipWithEmergencyContact").val('mom');
		$("#emergencyContactAddress").val('adcd');
		$("#emergencyContactPhoneNumber").val('0235660');
		//$("#dateOfBirth").val(),
		$("#placeOfBirth").val('home');
		$("#age").val(25);
		$("#religion").val('christ');
		$("#idCard").val(122233333333);
		$("#issuedOffice").val('bnn');
		//$("#expiryDate").val(),
		$("#height").val(160);
		$("#weigth").val(45);
		$("#Female").prop('checked','checked');
		$("#Married").prop('checked','checked');
		$("#numberOfChildren").val('5');
		$("#spouseName").val('num');
		$("#marriageCertificateNo").val('2');
		$("#issuedOffice2").val('aa');
		$("#address").val('aaa/bb');
		$("#occupation").val('vvvv');
		$("#Newspaper").prop('checked','checked');
		$("#descriptionNewspaper").val('nn');
		$("#Magazine").prop('checked','checked');
		$("#descriptionMagazine").val('doo');
		$("#Website").prop('checked','checked');
		$("#descriptionWebsite").val('vv');
		$("#Friend").prop('checked','checked');
		$("#descriptionFriend").val('aa');
		$("#Other").prop('checked','checked');
		$("#descriptionOther").val('ll');
		$("#Yes").prop('checked','checked');
		$("#descriptionYes").val('yes');
		$("#No").prop('checked','checked');
		//$("#militaryServiceYes").prop('checked','checked');
		//$("#fromYear").val(),
		//$("#toYear").val(),
		$("#branchOfService").val('gg');
		$("#serviceNo").val('aa');
		//$("#militaryServiceNo").prop('checked','checked');
		$("#reasonsNo").val('bbb');
		//$("#dateToBeDrafted").val();
		$("#previousEmployerYes").prop('checked','checked');
		$("#previousEmployerNo").prop('checked','checked');
		$("#previousEmpreasonsNo").val('n');
		$("#statusemp").val('office');  */

		
		
			    	  
			    
			           $("#masLocation").change(function() {
				    	   //alert('bb');
				    	   var code = $("#masLocation").val();
				    	   //alert(code);
				    	   $('#employeeCodeForShow').val(''); 
				  	       $('#employeeCode').val(''); 

			           }); 
			           
			           
			
			           
			       	
			 			$("#uploadFile").on("change", function()
					    {
			 			    
					        var files = !!this.files ? this.files : [];
					        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

					        if (/^image/.test( files[0].type)){ // only image file
					            var reader = new FileReader(); // instance of the FileReader
					            reader.readAsDataURL(files[0]); // read the local file

					            reader.onloadend = function(){ // set image data as background of div
					            	
					                $("#imagePreview").css("background-image", "url("+this.result+")");
			   	              }
					        }
					        
					    });
			 		
			 		
			 		
			    		
			    		
			    $('body').on('click','#addaddress', function() {
			    	
			    		
			  		$("#saveAddressButton").off("click").on("click", function()
			  				
			  		{
			  			if($("#validateAddress").valid()
			  		){
			   				
			  			addAddress();
			  			}
						
					});
			    		
			    });		
			    		
			    	

			        $("#myModal").on("hide.bs.modal", function(event){
			        	
			        	clearDataModal();
			       
			        });
			    		
			    		
			    
			    	$("#deleteModal").on("show.bs.modal", function(event){
			   	    	  
			 	    	    var button = $(event.relatedTarget);
			 	    		var idDelete = button.data("iddelete"); 
			 	    		
			 	     		
			 	    		$(this).find("#delete").off("click").on("click", function()
			 	    		{
			 	    			doDeleteDataPost(idDelete);
			 	    		});
			 	    	  
			 	      });
			  		
			  		
			 /* --------------------------------------------------- Clear Address Function --------------------------------------------------- */	  		
			  		function clearDataModal(){
			  			
			  			$('#addressType').val('');
			  			$('#houseNo').val('');
			  			$('#road').val('');
			  			$('#district').val('');
			  			$('#subDistrict').val('');
			  			$("#province").val('');
			  			$('#zipcode').val('');
			  			
			  		}

			   
			   	/* ----------------------------------------------------- Add Address Function --------------------------------------------------- */		
						
						function addAddress() {
							alert($validatealertmessage); 
							
			 				 var addressId = $("#addressType").val();
							 var addressType = $("#addressType option:selected").text();
							 
							 var houseNo = $("#houseNo").val();
							 var road = $("#road").val();
							 var district = $("#district").val();
							 var subDistrict = $("#subDistrict").val();
							 
							 var provinceId = $("#province").val();
							 var province = $("#province option:selected").text();
							 
							 var zipcode= $("#zipcode").val();
							 
							 var appId = $('#appId').val();
							 
							 /*console.log("app: "+appId);*/
							 
							 var id=0;
							 var status="add";
							 
							  dt.fnAddData([  id, 
							                  addressId,
							                  addressType,
							                  houseNo,
							                  road,
							                  district,
							                  subDistrict,
								              provinceId,
								              province,
								              zipcode,
								              getIndex,
								              
								              '<button id="edit" type="button" class="btn btn-warning btn-sm active"  data-target="#addModal" style="margin-right :15px;" data-toggle="modal">'+$msgEdit+'</button>'+
							    			  '<button id="delete" type="button" class="btn btn-danger btn-sm active" data-target="#deleteModal" data-toggle="modal">'+$msgDelete+'</button>',
							    			 
							    			  status
							    				
						   	 ]); 
							  
							  
							  $('<input>').attr({
								    type: 'hidden',
								    id: 'dataaddressid'+getIndex,
								    name: 'addressList['+getIndex+'].id',
								    value: id
								}).appendTo('form');
							  
							  
							  $('<input>').attr({
								    type: 'hidden',
								    id: 'dataaddresstype'+getIndex,
								    name: 'addressList['+getIndex+'].addressTypeId',
								    value: addressId
								}).appendTo('form');
							  
							  $('<input>').attr({
								    type: 'hidden',
								    id: 'houseNo'+getIndex,
								    name: 'addressList['+getIndex+'].houseNo',
								    value: houseNo
								}).appendTo('form');
							  
							  $('<input>').attr({
								    type: 'hidden',
								    id: 'road'+getIndex,
								    name: 'addressList['+getIndex+'].road',
								    value: road
								}).appendTo('form');
							  
							  $('<input>').attr({
								    type: 'hidden',
								    id: 'district'+getIndex,
								    name: 'addressList['+getIndex+'].district',
								    value: district
								}).appendTo('form');
							  
							  $('<input>').attr({
								    type: 'hidden',
								    id: 'subDistrict'+getIndex,
								    name: 'addressList['+getIndex+'].subDistrict',
								    value: subDistrict
								}).appendTo('form');
							  
							  $('<input>').attr({
								    type: 'hidden',
								    id: 'dataprovinceid'+getIndex,
								    name: 'addressList['+getIndex+'].masprovinceId',
								    value: provinceId
								}).appendTo('form');
							  
							  $('<input>').attr({
								    type: 'hidden',
								    id: 'datazipcode'+getIndex,
								    name: 'addressList['+getIndex+'].zipcode',
								    value: zipcode
								}).appendTo('form');
							  
							  $('<input>').attr({
								    type: 'hidden',
								    id: 'applicantId'+getIndex,
								    name:'addressList['+getIndex+'].applicantId',
								    value: appId
								}).appendTo('form');
							  						 
							  
							  $('<input>').attr({
								    type: 'hidden',
								    id: 'status'+getIndex,
								    name: 'addressList['+getIndex+'].status',
								    value: status
								}).appendTo('form');
							  
							
							 
							  
							  getIndex = getIndex+1; 
							
							 
							  $('#myModal').modal('toggle');
							  clearDataModal();
							  //$('#validateAddress').bootstrapValidator('resetForm', true);
			   	
			   	    }
			   	
			   	
			/* ----------------------------------------------------- Edit Address Function --------------------------------------------------- */		
					 	
						$('#tbResult tbody').on( 'click', '#edit', function (){		   
					    	
							
					    	  rowUpdate = $(this).parents('tr');
					    	  dataUpdate = dt.fnGetData($(this).parents('tr'));
					    	  //alert("data[1]: "+dataUpdate[1]); 
					    	
					    	  editAddress(rowUpdate,dataUpdate);
					    	    	  
					  }); 
			   	
			   	

			   	
			   	function editAddress(rowUpdate,dataUpdate){
			   		
			   		$('#myModal').modal('show');
			   		
			   		$("#addressType").val(dataUpdate[1]);
			   		$("#houseNo").val(dataUpdate[3]);
			   		$("#road").val(dataUpdate[4]);
			   		$("#district").val(dataUpdate[5]);
			   		$("#subDistrict").val(dataUpdate[6]);
			   		$("#province").val(dataUpdate[7]);
			   		$("#zipcode").val(dataUpdate[9]);
			   		
			   		
			   		$('#saveAddressButton').off("click").on("click",function(){
			   			
			   			/* $('[name="validateAddress"]').submit();
			   			if($('#validateAddress').data('bootstrapValidator').isValid()){ */
				   			
				   			
			   			
			   		var id = dataUpdate[0];	
			   		var addressId = $("#addressType").val();
					var addressType = $("#addressType option:selected").text();
					
			   		var houseNo = $("#houseNo").val();
			   		var road = $("#road").val();
			   		var district = $("#district").val();
			   		var subDistrict = $("#subDistrict").val();
			   		
			   	    var provinceId = $("#province").val();
				    var province = $("#province option:selected").text();
				    var zipcode= $("#zipcode").val();
				    
				    var appId = $("#appId").val();
				   // alert("appId: "+appId);
			   		
				    
			   		
			   		if(dataUpdate[0]!=0){
			   			
			   			
			   			dt.fnUpdate(addressId, rowUpdate, 1);
			   			dt.fnUpdate(addressType, rowUpdate, 2);
					    dt.fnUpdate(houseNo, rowUpdate, 3);
					    dt.fnUpdate(road, rowUpdate, 4);
					    dt.fnUpdate(district, rowUpdate, 5);
					    dt.fnUpdate(subDistrict, rowUpdate, 6);
					    dt.fnUpdate(provinceId, rowUpdate, 7);
					    dt.fnUpdate(province, rowUpdate, 8);
					    dt.fnUpdate(zipcode, rowUpdate, 9);
					    dt.fnUpdate('edit', rowUpdate, 12);
					    
					    $("#dataaddressid"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].id");
					    $("#dataaddressid"+dataUpdate[10]).val(id);
					    
					    $("#dataaddresstype"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].addressTypeId");
					    $("#dataaddresstype"+dataUpdate[10]).val(addressId);
					    
					    $("#datahouseNo"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].houseNo");
					    $("#datahouseNo"+dataUpdate[10]).val(houseNo);
					    
					    $("#dataroad"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].road");
					    $("#dataroad"+dataUpdate[10]).val(road);
					    
					    $("#datadistrict"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].district");
					    $("#datadistrict"+dataUpdate[10]).val(district);
					    
					    $("#datasubDistrict"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].subDistrict");
					    $("#datasubDistrict"+dataUpdate[10]).val(subDistrict);
					    
					    $("#dataprovinceid"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].masprovinceId");
					    $("#dataprovinceid"+dataUpdate[10]).val(provinceId);
					    
					
					    $("#datazipcode"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].zipcode");
					    $("#datazipcode"+dataUpdate[10]).val(zipcode);
					    
					    
					    $("#applicantId"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].applicantId");
					    $("#applicantId"+dataUpdate[10]).val(appId);
					    
					
					    
					    $("#status"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].status");
					    $("#status"+dataUpdate[10]).val('edit');
					    
					    
					    
			   	 }else{
			   		 
			   		dt.fnUpdate(addressId, rowUpdate, 1);
				    dt.fnUpdate(addressType, rowUpdate, 2);
				    dt.fnUpdate(houseNo, rowUpdate, 3);
				    dt.fnUpdate(road, rowUpdate, 4);
				    dt.fnUpdate(district, rowUpdate, 5);
				    dt.fnUpdate(subDistrict, rowUpdate, 6);
				    dt.fnUpdate(provinceId, rowUpdate, 7);
				    dt.fnUpdate(province, rowUpdate, 8);
				    dt.fnUpdate(zipcode, rowUpdate, 9);
				    
				    $("#dataaddressid"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].id");
				    $("#dataaddressid"+dataUpdate[10]).val(id);
				    
				    $("#dataaddresstype"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].addressTypeId");
				    $("#dataaddresstype"+dataUpdate[10]).val(addressId);
				    
				    $("#datahouseNo"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].houseNo");
				    $("#datahouseNo"+dataUpdate[10]).val(houseNo);
				    
				    $("#dataroad"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].road");
				    $("#dataroad"+dataUpdate[10]).val(road);
				    
				    $("#datadistrict"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].district");
				    $("#datadistrict"+dataUpdate[10]).val(district);
				    
				    $("#datasubDistrict"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].subDistrict");
				    $("#datasubDistrict"+dataUpdate[10]).val(subDistrict);
				    
				    $("#dataprovinceid"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].masprovinceId");
				    $("#dataprovinceid"+dataUpdate[10]).val(provinceId);
				    
				    
				    $("#applicantId"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].applicantId");
				    $("#applicantId"+dataUpdate[10]).val(appId);
				    
				
				    $("#datazipcode"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].zipcode");
				    $("#datazipcode"+dataUpdate[10]).val(zipcode);
				    
				    
				    $("#status"+dataUpdate[10]).attr('name', "addressList["+dataUpdate[10]+"].status");
				    $("#status"+dataUpdate[10]).val('add');
				    

			   		
			   	 }
			   		
			   		$('#myModal').modal('toggle');
			   			
			   		});
			   	
			   	
			   	} 
			   	
			   	
			   	
			   	$('#tbResult tbody').on( 'click', '#delete', function (){	
			   		
			   	  var row = $(this).parents('tr');
			      var dataDelete = dt.fnGetData($(this).parents('tr'));
			      if(dataDelete[0]==0){
			   	  
				   	 $('#yesButton').off("click").on("click",function(){ 
				   	  
					  dt.fnDeleteRow(row);
					
					  $( '#dataaddressid'+dataDelete[0] ).remove();
					  $( '#dataaddresstype'+dataDelete[0] ).remove();
					  $( '#datahouseNo'+dataDelete[0] ).remove();
					  $( '#dataroad'+dataDelete[0] ).remove();
					  $( '#datadistrict'+dataDelete[0] ).remove();
					  $( '#datasubDistrict1'+dataDelete[0] ).remove();
					  $( '#dataprovinceid'+dataDelete[0] ).remove();
					  $( '#datazipcode'+dataDelete[0] ).remove();
					  $( '#datastatus'+dataDelete[0] ).remove();
					 
					 
					  $('#deleteModal').modal('toggle');
					  
				   	});
				 		
			      }else{
			    	  
			    	  $('#yesButton').off("click").on("click",function(){ 
			    		  
			    		  //alert(dataDelete[8]);
				    	  dt.fnUpdate('delete', row, 12);
				    	  $("#datastatus"+dataDelete[10]).attr('name', "addressList["+dataDelete[10]+"].status");
						  $("#status"+dataDelete [10]).val('delete');
						  dt.fnDeleteRow(row);
						  $('#deleteModal').modal('toggle');

			    	 	});
			      }
			   	 
			   	 
			   	clearDataModal();
			 });
			   	
			   	
			   	
			   	
			   	
			   	
			   	if($('#id').val()!=null||$('#id').val()!==""){
			   		
			   	    listAddress($('#appId').val());
			   		
			   	}		
			   		
			   	
			   		function listAddress(id){
			   			
							var status = 'unmodified';
			   			
			   			$.ajax({
							url : $getContextPath+"/employee/address/",
							data: JSON.stringify({"applicantId":id}),
							type : "POST",
							dataType : 'json', 
						  	//data : JSON.stringify({"id":id}),  
						  	contentType :"application/json; charset=utf-8",
							success : function(data) {
						    dt.fnClearTable();
							for (var i=0;i< data.length; i++) {
							
									dt.fnAddData([
									          data[i].id,
								              data[i].addressTypeId,
								              data[i].masaddresstypeName,
								              data[i].houseNo,
								              data[i].road,
								              data[i].district,
								              data[i].subDistrict,
								              data[i].masprovinceId, 
								              data[i].masprovinceName, 					              
								              data[i].zipcode,
								              getIndex,
									'<button id="edit" type="button" class="btn btn-warning btn-sm active" data-addId="' + data[i].id + '" data-target="#addModal" style="margin-right :15px; data-toggle="modal">'+$msgEdit+'</button>'+
									'<button id="delete" type="button" class="btn btn-danger btn-sm active" data-addId="' + data[i].id + '" data-target="#deleteModal" data-toggle="modal">'+$msgDelete+'</button>',
									 "unmodified",
									]);
								 
									
									  $('<input>').attr({
										    type: 'hidden',
										    id: 'dataaddressid'+getIndex,
										    name: 'addressList['+getIndex+'].id',
										    value: data[i].id
										}).appendTo('form');
									  
									  
									  $('<input>').attr({
										    type: 'hidden',
										    id: 'dataaddresstype'+getIndex,
										    name: 'addressList['+getIndex+'].addressTypeId',
										    value: data[i].addressTypeId
										}).appendTo('form');
									  
									  $('<input>').attr({
										    type: 'hidden',
										    id: 'datahouseNo'+getIndex,
										    name: 'addressList['+getIndex+'].houseNo',
										    value: data[i].houseNo
										}).appendTo('form');
									  
									  $('<input>').attr({
										    type: 'hidden',
										    id: 'dataroad'+getIndex,
										    name: 'addressList['+getIndex+'].road',
										    value: data[i].road
										}).appendTo('form');
									  
									  $('<input>').attr({
										    type: 'hidden',
										    id: 'datadistrict'+getIndex,
										    name: 'addressList['+getIndex+'].district',
										    value: data[i].district
										}).appendTo('form');
									  
									  $('<input>').attr({
										    type: 'hidden',
										    id: 'datasubDistrict'+getIndex,
										    name: 'addressList['+getIndex+'].subDistrict',
										    value: data[i].subDistrict
										}).appendTo('form');
									  
									  $('<input>').attr({
										    type: 'hidden',
										    id: 'dataprovinceid'+getIndex,
										    name: 'addressList['+getIndex+'].masprovinceId',
										    value: data[i].masprovinceId
										}).appendTo('form');
									  
									  $('<input>').attr({
										    type: 'hidden',
										    id: 'datazipcode'+getIndex,
										    name: 'addressList['+getIndex+'].zipcode',
										    value: data[i].zipcode
										}).appendTo('form');
									  
									  $('<input>').attr({
										    type: 'hidden',
										    id: 'datazipcode'+getIndex,
										    name: 'addressList['+getIndex+'].zipcode',
										    value: data[i].zipcode
										}).appendTo('form');
									  
									  
									  $('<input>').attr({
										    type: 'hidden',
										    id: 'applicantId'+getIndex,
										    name: 'addressList['+getIndex+'].applicantId',
										    value: id
										}).appendTo('form');
									
									  
									  $('<input>').attr({
										    type: 'hidden',
										    id: 'status'+getIndex,
										    name: 'addressList['+getIndex+'].status',
										    value: 'unmodified'
										}).appendTo('form');
									
									  
									
									getIndex = getIndex+1; 

						
							  }
							} 
						}); 
					}
				
			 
			   		
			  
			   		
			   		$('.renew').click(function() {
				
					 if( $('#id').val()==null||$('#id').val()===''){
						 window.location = $getContextPath+"/employee";
					 }else if($('#id').val()!=null||$('#id').val()!==''){
						 window.location = $getContextPath+"/employee/init/"+$('#id').val();
					 }
				 });
			
          
			   	 //---------------------check Division---------------------
			   if($("#masDivision").val()!=""){
				  // $('select option[value='+$("#masDivision").val()+']').attr("selected",true);
					
				   console.log("Division"+$("#masDivision").val());
				   initTagDivision($("#masDivision").val());
			   }
			   	
			   	
			   	 $("#masDivision").on("change", function(){
					 var $id = $("#masDivision").val();
					 var divSelect = $("#masDivision option:selected").text();
					 console.log(divSelect);
					 getTagDivision($id);
					 var find = false;
					 
				 })   
				 
				
				 function getTagDivision(id){
						
						$.ajax({
							url : $getContextPath+"/employee/division/"+id,
							type : "GET",
							success : function(data) {
								getTagJoblevel(data);
							} 
						}); 
				 }  
			   	 
			   	function getTagJoblevel(tagJob){
				   		console.log(">>>>>>>>>>"+tagJob);
						$.ajax({
							url : $getContextPath+"/employee/joblevel/"+tagJob,
							type : "GET",
							success : function(data) {
					
								 $('#masJoblevel').html('');
								for(var i in data){
								     $('#masJoblevel')
								         .append($("<option></option>")
								         .attr("value",data[i].jobId)
								         .text(data[i].jobName)); 
								}
								
								
							} 
						}); 
					} 
			   	
				    function initTagDivision(id){
						
							$.ajax({
								url : $getContextPath+"/employee/division/"+id,
								type : "GET",
								success : function(data) {
									initTagJoblevel(data);
								} 
							}); 
					 } 
				    
					function initTagJoblevel(tagJob){
						$.ajax({
							url : $getContextPath+"/employee/joblevel/"+tagJob,
							type : "GET",
							success : function(data) {
								var job = $("#masJoblevel").val();
								console.log("job :"+job);
								$('#masJoblevel').html('');
								for(var i in data){
								     $('#masJoblevel')
								         .append($("<option></option>")
								         .attr("value",data[i].jobId)
								         .text(data[i].jobName)); 
								}
								
								$('select option[value='+job+']').attr("selected",true);
								
							} 
						}); 
					} 
			});
		


 	