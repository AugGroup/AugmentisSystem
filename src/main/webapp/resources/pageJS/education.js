
	$(document).ready(function(){

		$("#addBtnEdu").on("click",function(){clearModal();});
		var dt;
// 		$("#addModal").on("click",function(){
			
// 			clearModal();
			
// 		});
		
		$("#closeX").on("click",function(){
			
			clearModal();
			
		});
		$('#startDate').mask("99-99-9999",{placeholder:"DD-MM-YYYY"});
		$('#graduatedDate').mask("99-99-9999",{placeholder:"DD-MM-YYYY"});
		$('#gpa').mask("9.99");
		
		$('#addForm').bootstrapValidator({
//	        live: 'disabled',
	        message: 'This value is not valid',
	        feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {
	        	start_date: {
	                validators: {
	                    notEmpty: {
	                        message: $requiredstartdate
	                    },
	                    date: {
	                        format: 'DD-MM-YYYY'
	                    }
	                }
	            },
	            graduated_date: {
	                validators: {
	                    notEmpty: {
	                        message: $requiredfinishdate
	                    },
	                    date: {
	                        format: 'DD-MM-YYYY'
	                    }
	                }
	            },
	            university: {
	                validators: {
	                    notEmpty: {
	                        message: $requireduniversity
	                    },
	                    regexp: {
			                regexp: /^[a-z\s]+$/i,
			                message: $requireduniversity
			            }
	                }
	            },
	            faculty: {
	                validators: {
	                    notEmpty: {
	                        message: $requiredfaculty
	                    },
	                    regexp: {
			                regexp: /^[a-z\s]+$/i,
			                message: $requiredfaculty
			            }
	                }
	            },
	            major: {
	                validators: {
	                    notEmpty: {
	                        message: $requiredmajor
	                    },
	                    regexp: {
			                regexp: /^[a-z\s]+$/i,
			                message: $requiredmajor
			            }
	                }
	            },
	            masdegreetype: {
	                validators: {
	                    notEmpty: {
	                        message: $requireddeegreetype
	                    }
	                }
	            },
	            gpa: {
	                validators: {
	                	notEmpty: {
	                        message: $requiredgpa
	                    },
	                	 regexp: {
	                         regexp: /^[0-3]\.\d|4\.0+$/i,
	                         message: $requiredgpadigit
	                     }
	                }
	            }
	            /* adjustmentTime: {
	                validators: {
	                    notEmpty: {
	                        message: 'The adjustment time is required and cannot be empty'
	                    },
	                    digits: {
	                    	message: 'The adjustment time is number'
	                    },
	                }
	            } */
	        }
	    });
		
		
// 		$('#startDate')
//         .on('dp.change dp.show', function(e) {
//             // Validate the date when user change it
//             $('#addForm')
//                 // Get the bootstrapValidator instance
//                 .data('bootstrapValidator')
//                 // Mark the field as not validated, so it'll be re-validated when the user change date
//                 .updateStatus('datetimepickerStart', 'NOT_VALIDATED', null)
//                 // Validate the field
//                 .validateField('startDate');
//         });
		$('#datetimepickerStart').datetimepicker({
			 
			 format : 'DD-MM-YYYY',
// 			 minDate: 'moment'
			 defaultDate: 'moment',
			 
		 });
		
		var defaultDate = new Date();
		defaultDate.setDate(defaultDate.getDate());
		
		$('#datetimepickerGrad').datetimepicker({
			 
			 format : 'DD-MM-YYYY',
// 			 minDate: 'moment'
			 defaultDate: defaultDate
			 
		 });
		
		$('#datetimepickerStart')
        .on('dp.change dp.show', function(e) {
            // Validate the date when user change it
            $('#addForm')
                // Get the bootstrapValidator instance
                .data('bootstrapValidator')
                // Mark the field as not validated, so it'll be re-validated when the user change date
                .updateStatus('start_date', 'NOT_VALIDATED', null)
                // Validate the field
                .validateField('start_date');
            
            var tempdate = new Date(e.date);
			tempdate.setDate(tempdate.getDate());
            $('#datetimepickerGrad').data("DateTimePicker").minDate(tempdate);

        });
		
		$('#datetimepickerGrad')
        .on('dp.change dp.show', function(e) {
            // Validate the date when user change it
            $('#addForm')
                // Get the bootstrapValidator instance
                .data('bootstrapValidator')
                // Mark the field as not validated, so it'll be re-validated when the user change date
                .updateStatus('graduated_date', 'NOT_VALIDATED', null)
                // Validate the field
                .validateField('graduated_date');
        });
		
		$('#tbResult').dataTable({ 
			"bLengthChange": false,
			"iDisplayLength": 10,
			"pagingType": "simple_numbers",
			"ordering": false,
			//"info": false,
			"dom": '<"toolbar">frtip'
		});
		
		$("div.toolbar").html('<b><button type="button" id="addBtnEdu" class="btn btn-warning btnAdds " data-toggle="modal" data-target="#addModal">'+$msgNewRecord+'</button>  </b>');
		dt = $('#tbResult').dataTable();
		
		listAll();
		
		/* --- addProduct,updateProduct --- */
		$("#addModal").on("show.bs.modal",function(event) {
			
			clearModal();
			
			var button = $(event.relatedTarget) //Button that triggered the model เพื่อดูว่า evet ของ ปุ่มไหน
			var educationid = button.data("id") //Extract info from data-* attribute
			
			if(educationid != null){
				getId(educationid);
			} 
			
			$(this).find(".btnSave").off("click").on("click",function() {
				if(educationid != null){
					$('#addForm').bootstrapValidator();
    				$('#addForm').data('bootstrapValidator').validate();
    				if($('#addForm').data('bootstrapValidator').isValid()){
						updateEducation(button, educationid);
    				}
				}else{
					$('#addForm').bootstrapValidator();
    				$('#addForm').data('bootstrapValidator').validate();
    				if($('#addForm').data('bootstrapValidator').isValid()){
						addEducation();
    				}
				 }
				
			});
			
			$(this).find(".btnClose").off("click").on("click",function() {
				$('#addForm').bootstrapValidator('resetForm', true);
			});
			
		});
		
		/* --- DeleteName --- */
		$("#deleteModal").on("show.bs.modal",function(event) {
			
			var button = $(event.relatedTarget) //Button that triggered the model เพื่อดูว่า evet ของ ปุ่มไหน
			var educationid = button.data("id") //Extract info from data-* attribute
			
			$(this).find(".btnYes").off("click").on("click",function() {
				deleteEducation(button, educationid);
			});
			
		});
		
/* ---------------------------------------------------------------------------------------------------------------------------------------------- */

		function clearModal(){
			$("#university").val(""),
			$("#gpa").val(""),
			$("#faculty").val(""),
			$("#major").val(""),
			$("#masdegreetype").val("");
			$("#certificate").val("");
			$("#description").val("");
			$("#startDate").val("");
			$("#graduatedDate").val("");
		}
		
		function addEducation(){
// 			var id = getUrlParameter('Id');
			var id = $("#empId").val();
			$.ajax({
				url : $getContextPath+"/education/add",
				data : JSON.stringify({
					university :$("#university").val(),
					gpa :$("#gpa").val(),
					faculty :$("#faculty").val(),
					major :$("#major").val(),
					masdegreetypeId :$("#masdegreetype").val(),
					masdegreetype :$("#masdegreetype option:selected").text(),
					//certificate :$("#certificate").val(),
					//description :$("#description").val(),
					start_date :$("#startDate").val(),
					graduated_date :$("#graduatedDate").val(),
					applicantId : id
					
				}),
				type : "POST",
				contentType : "application/json",
				dataType: "json",
				success : function(data) {
					
					$('#addForm').bootstrapValidator('resetForm', true);

//	 				alert(JSON.stringify(data));
						
// 					dt.fnClearTable();
					
// 					dt.fnAddData([
// 						/* $("#Name").val(),
// 						$("#ProductCategory").val(),
// 						$("#Unit").val(),
// 						$("#Price").val(),
// 						$("#Description").val(), */
// 						data.university,
// 						data.gpa,
// 						data.faculty,
// 						data.major,
// 						data.masdegreetype,
// 						data.certificate,
// 						data.description,
// 						data.startDate,
// 						data.graduatedDate,
						
// 						'<button type="button" class="btn btn-warning" data-id="'+data.id+'" data-toggle="modal" data-target="#addModal" > Edit</button>',
// 						'<button type="button" class="btn btn-danger" data-id="'+data.id+'" data-toggle="modal" data-target="#deleteModal"> Delete</button>'
// 					]);
					
					$('#addModal').modal('toggle');
					$(function(){ new PNotify({
						title: $notifySuccess,
						text: $notifyAdd,
						type: 'success',
						delay: 1000,
						animation: {
							effect_in: 'show',
							effect_out: 'slide'
						}
						});
					});
					listAll();
					
				}/* ,
				error : function() {
					$(function(){ new PNotify({
					    title: 'Error!',
					    type: 'error',
						animation: {
							effect_in: 'show',
							effect_out: 'slide'
						}
						});
					});
// 					alert("ERROR");
// 					$('#addForm').bootstrapValidator('validate');

				} */
			});
		}
		
		function updateEducation(button, educationid){
// 			var id = getUrlParameter('Id');
			var id = $("#empId").val();
			$.ajax({
				url : $getContextPath+"/education/update",
				data : JSON.stringify({
					id : educationid,
					university : $("#university").val(),
					gpa :$("#gpa").val(),
					faculty :$("#faculty").val(),
					major :$("#major").val(),
					masdegreetypeId :$("#masdegreetype").val(),
					masdegreetype :$("#masdegreetype option:selected").text(),
					//certificate :$("#certificate").val(),
					//description :$("#description").val(),
					start_date :$("#startDate").val(),
					graduated_date :$("#graduatedDate").val(),
					applicantId : id
					
				}),
				type : "POST",
				contentType : "application/json",
				dataType: "json",
				success : function(data) {
//	 					alert(JSON.stringify(data));
					$('#addForm').bootstrapValidator('resetForm', true);

					/* var tr = button.closest("tr")
					
					dt.fnUpdate(data.university, tr ,0);
					dt.fnUpdate(data.gpa, tr ,1);
					dt.fnUpdate(data.faculty, tr ,2);
					dt.fnUpdate(data.major, tr ,3);
					dt.fnUpdate(data.masdegreetype, tr ,4);
					dt.fnUpdate(data.certificate, tr ,5);
					dt.fnUpdate(data.description, tr ,6);
					dt.fnUpdate(data.startDate, tr ,7);
					dt.fnUpdate(data.graduatedDate, tr ,8); */
					
					$('#addModal').modal('toggle');
					$(function(){ new PNotify({
						title: $notifySuccess,
						text: $notifyUpdate,
						type: 'success',
						delay: 1000,
						animation: {
							effect_in: 'show',
							effect_out: 'slide'
						}
						});
					});
					listAll();
				}/* ,
				error : function() {
					$(function(){ new PNotify({
					    title: 'Error!',
					    type: 'error',
						animation: {
							effect_in: 'show',
							effect_out: 'slide'
						}
						});
					});
// 					alert("ERROR");
// 					$('#addForm').bootstrapValidator('validate');

				} */
			});
		}
		
		function getId(educationid){
			$.ajax({
				url : $getContextPath+"/education/findById/"+ educationid,
				//data : "educationid=" + educationid,
				type : "POST",
				success : function(data) {
	 				//alert(JSON.stringify(data));
					//alert("ok");
					
					//alert("masDegreeTypeId: "+data.masdegreetypeId);
					
					$("#university").val(data.university),
					$("#gpa").val(data.gpa),
					$("#faculty").val(data.faculty),
					$("#major").val(data.major);
					$("#masdegreetype").val(data.masdegreetypeId);
					$("#certificate").val(data.certification);
					//$("#description").val(data.description);
					$("#startDate").val(data.start_date);
					$("#graduatedDate").val(data.graduated_date);
					applicantId: data.applicantId;
				}/* ,
				error : function() {
					$(function(){ new PNotify({
					    title: 'Error!',
					    type: 'error',
						animation: {
							effect_in: 'show',
							effect_out: 'slide'
						}
						});
					});
// 					alert("ERROR");
				} */
			});
		}
		
		function deleteEducation(button,educationid){
			$.ajax({
				url : $getContextPath+"/education/delete/"+educationid,
				//data : "educationid=" + educationid,
				type : "POST",
				success : function(data) {
//	 					alert(JSON.stringify(data));
					
					/*var tr = button.closest("tr")
					
					dt.fnDeleteRow(tr);*/
					
					$('#deleteModal').modal('toggle');
					$(function(){ new PNotify({
						title: $notifySuccess,
						text: $notifyDelete,
						type: 'success',
						delay: 1000,
						animation: {
							effect_in: 'show',
							effect_out: 'slide'
						}
						});
					});
					
					listAll();
					
				}/* ,
				
				error : function() {
					$(function(){ new PNotify({
					    title: 'Error!',
					    type: 'error',
						animation: {
							effect_in: 'show',
							effect_out: 'slide'
						}
						});
					});
// 					alert("ERROR");
				} */
			});
		}
		
		function listAll(){
// 			var id=1;
// 			var id = getUrlParameter('Id');
			//alert("id"+id);
			var id = $("#empId").val();
			$.ajax({
				url : $getContextPath+"/education/listAll/"+id,
				type : "POST",
				success : function(data) {
					dt.fnClearTable();
				for (var i=0;i< data.length; i++) {
					dt.fnAddData([
								  data[i].start_date,
								  data[i].graduated_date,
								  data[i].masdegreetype,
					              data[i].university,
					              data[i].major,
					              data[i].gpa,
						 '<button type="button"  class="btn btn-warning btn-center" data-id="'+ data[i].id +'" data-target="#addModal" data-toggle="modal">'+$msgEdit+'</button>',
						 '<button type="button" class="btn btn-danger btn-sm active btn-center" data-id="' + data[i].id + '" data-target="#deleteModal" data-toggle="modal">'+$msgDelete+'</button>']);
					 
					      
			 
			 
			 
			 
				}
				$(".btn-center").closest("td").addClass("text-center");
				}/* ,
				error : function() {
					$(function(){ new PNotify({
					    title: 'Error!',
					    type: 'error',
						animation: {
							effect_in: 'show',
							effect_out: 'slide'
						}
						});
					});
// 					alert("ERROR");
				} */
			}); 
		}
		
		
		function getUrlParameter(sParam)
		{
			//alert("url "+document.referrer);
		    var sPageURL = document.referrer;
		    var sURLVariables = sPageURL.split('?');
		    var sParameterName;
		    //alert("spilt "+sURLVariables);

		   	
		    
		    sParameterName = sURLVariables[1].split('=');
		    //alert("Param "+parseInt(sParameterName[1]));
		    if (sParameterName[0] == sParam) 
		        {
		        	//alert("Param "+sParameterName[0]);
		        	return sParameterName[1];
		        	
		        }
		        //alert("Param2 "+parseInt(sParameterName[1]));
		    
		}     
		
	});
	
