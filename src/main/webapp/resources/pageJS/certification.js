
	$(document).ready(function(){
		
		var dt;
		
		$("#addBtnCer").on("click",function(){clearModal();});
		
		$("#closeX").on("click",function(){
			
			clearModal();
			
		});
		
		$('#addForm').bootstrapValidator({
//	        live: 'disabled',
	        message: 'This value is not valid',
	        container: 'tooltip',
	        feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {
	        	year: {
	                validators: {
	                    notEmpty: {
	                        message: $requiredyear
	                    }
	                }
	            },
	            name: {
	                validators: {
	                    notEmpty: {
	                        message: $requiredcertificationname
	                    }
	                }
	            },
// 	            oldSalary: {
// 	                validators: {
// 	                    notEmpty: {
// 	                        message: 'The old salary is required and cannot be empty'
// 	                    },
// 	                    digits: {
// 	                    	message: 'The old salary is number'
// 	                    },
// 	                }
// 	            },
	            certificationForm: {
	                validators: {
	                    notEmpty: {
	                        message: $requiredcertificationform
	                    }
	                }
	            },
	            description: {
	                validators: {
	                    notEmpty: {
	                        message: $requireddescription
	                    }
	                }
	            },
// 	            reasonOfAdjustment: {
// 	                validators: {
// 	                    notEmpty: {
// 	                        message: 'The reason of adjustment is required and cannot be empty'
// 	                    }
// 	                }
// 	            },
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
		
		$('#tbResult').dataTable({ 
			"bLengthChange": false,
			"iDisplayLength": 10,
			"pagingType": "simple_numbers",
			"ordering": false,
			//"info": false,
			"dom": '<"toolbar">frtip'
		});
		
		$("div.toolbar").html('<b><button type="button" id="addBtnCer" class="btn btn-warning" data-toggle="modal" data-target="#addModal">'+$msgNewRecord+'</button>  </b>');
		dt = $('#tbResult').dataTable();
		listAll();
		
		/* --- addProduct,updateProduct --- */
		$("#addModal").on("show.bs.modal",function(event) {
			
			//clearModal();
			
			var button = $(event.relatedTarget) //Button that triggered the model เพื่อดูว่า evet ของ ปุ่มไหน
			var certificationid = button.data("id") //Extract info from data-* attribute
			
			if(certificationid != null){
				getId(certificationid);
			} 
			
			$(this).find(".btnSave").off("click").on("click",function() {
				if(certificationid != null){
					$('#addForm').bootstrapValidator();
    				$('#addForm').data('bootstrapValidator').validate();
    				if($('#addForm').data('bootstrapValidator').isValid()){
						updateCertification(button, certificationid);
    				}
				}else{
					$('#addForm').bootstrapValidator();
    				$('#addForm').data('bootstrapValidator').validate();
    				if($('#addForm').data('bootstrapValidator').isValid()){
						addCertification();
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
			var certificationid = button.data("id") //Extract info from data-* attribute
			
			$(this).find(".btnYes").off("click").on("click",function() {
				deleteCertification(button, certificationid);
			});
			
		});
		
/* ---------------------------------------------------------------------------------------------------------------------------------------------- */
		
		function clearModal(){
			$("#year").val("");
			$("#name").val("");
			$("#certificationForm").val("");
			$("#description").val("");
		}
		
		function addCertification(){
// 			var id = getUrlParameter('Id');
			var id = $("#appId").val();
			$.ajax({
				url : $getContextPath+"/certification/add",
				data : JSON.stringify({
					year : $("#year").val(),
					name :$("#name").val(),
					certificationForm :$("#certificationForm").val(),
					description :$("#description").val(),
					applicantId: id
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
// 						data.year,
// 						data.name,
// 						data.certificationForm,
// 						/* data.company,
// 						data.salary,
// 						data.time, */
						
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
				} */
			});
		}
		
		function updateCertification(button, certificationid){
// 			var id = getUrlParameter('Id');
			var id = $("#appId").val();
			$.ajax({
				url : $getContextPath+"/certification/update",
				data : JSON.stringify({
					id : certificationid,
					year : $("#year").val(),
					name :$("#name").val(),
					certificationForm :$("#certificationForm").val(),
					description :$("#description").val(),
					applicantId : id
					/* company :$("#company").val(),
					salary :$("#salary").val(),
					time :$("#time").val(), */
					
				}),
				type : "POST",
				contentType : "application/json",
				dataType: "json",
				success : function(data) {
//	 					alert(JSON.stringify(data));
					$('#addForm').bootstrapValidator('resetForm', true);

// 					var tr = button.closest("tr")
					
// 					dt.fnUpdate(data.year,tr,0);
// 					dt.fnUpdate(data.name,tr,1);
// 					dt.fnUpdate(data.certificationForm,tr,2);
					/* dt.fnUpdate(data.company, tr ,1);
					dt.fnUpdate(data.salary, tr ,2);
					dt.fnUpdate(data.time, tr ,3); */
					
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
				} */
			});
		}
		
		function getId(certificationid){
			$.ajax({
				url : $getContextPath+"/certification/findById",
				data : "certificationid=" + certificationid,
				type : "POST",
				success : function(data) {
	 				//alert(JSON.stringify(data));
					//alert("ok");
					$("#year").val(data.year);
					$("#name").val(data.name);
					$("#certificationForm").val(data.certificationForm);
					$("#description").val(data.description);
					/* employee: {id: data.position } */
					/* $("#company").val(data.company),
					$("#salary").val(data.salary),
					$("#time").val(data.time); */
			
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
		
		function deleteCertification(button, certificationid){
			$.ajax({
				url : $getContextPath+"/certification/delete",
				data : "certificationid=" + certificationid,
				type : "POST",
				success : function(data) {
//	 					alert(JSON.stringify(data));
					
					var tr = button.closest("tr")
					
					dt.fnDeleteRow(tr);
					
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
		
		/* function listAll(){
			$.ajax({
				url : $getContextPath+"/history/listAll",
				type : "POST",
				success : function(data) {
					dt.fnClearTable();
				for (var i=0;i< data.length; i++) {
					dt.fnAddData([data[i].position,
					              data[i].salary,data[i].oldSalary, 
					              data[i].dateOfAdjustment,data[i].reasonOfAdjustment,data[i].adjustmentTime,
						'<button type="button" class="btn btn-warning btn-sm active" data-id="' + data[i].id + '" data-target="#addModal" data-toggle="modal">Edit</button>',
						'<button type="button" class="btn btn-danger btn-sm active" data-id="' + data[i].id + '" data-target="#deleteModal" data-toggle="modal">Delete</button>']);
			
					}
				},
				error : function() {
					alert("ERROR");
				}
			}); 
		} */
		
		function listAll(){
			
// 			var id = getUrlParameter('Id');
			var id = $("#empId").val();
			$.ajax({
				url : $getContextPath+"/certification/listAll/"+id,
				type : "POST",
				success : function(data) {
					dt.fnClearTable();
				for (var i=0;i< data.length; i++) {
					dt.fnAddData([data[i].year,
					              data[i].name,
					              data[i].certificationForm, 
//					              data[i].description, 
						'<button type="button" class="btn btn-warning btn-sm active btn-center" data-id="' + data[i].id + '" data-target="#addModal" data-toggle="modal">'+$msgEdit+'</button>',
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
		    //alert("spilt "+sURLVariables);

		   	
		    
		    var sParameterName = sURLVariables[1].split('=');
		    //alert("Param "+parseInt(sParameterName[1]));
		    if (sParameterName[0] == sParam) 
		        {
		        	//alert("Param "+sParameterName[0]);
		        	return sParameterName[1];
		        	
		        }
		        //alert("Param2 "+parseInt(sParameterName[1]));
		    
		}   
		
	});
	
