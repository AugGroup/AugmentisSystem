

	
	$(document).ready(function(){
		
		var dt;
		
		$("#addBtnHis").on("click",function(){
			
// 			$(this).removeData('bs.modal');
// 			$('#addForm').bootstrapValidator('resetForm', true);
			clearModal();
// 			bootstrapValidator('validate').hide();
			
			
		});
		
// 		$("#addModal").on("click",function(){
			
// 			clearModal();
			
// 		});
		
		$("#closeX").on("click",function(){
			
			clearModal();
			
		});
		
		$('#dateOfAdjustment').mask("99-99-9999",{placeholder:"DD-MM-YYYY"});
		
		$('#salary').mask('0,000,000.00', {reverse: true});
// 		$('.money').mask('000.000.000.000.000,00', {reverse: true});
// 		$('#salary').autoNumeric('init', {'dGroup': 3});
// 		$('#oldSalary').autoNumeric('init', {'dGroup': 3});
		$('#oldSalary').mask('0,000,000.00', {reverse: true});
		
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
	        	position: {
	                validators: {
	                    notEmpty: {
	                        message: $requiredposition
	                    },
				        regexp: {
			                regexp: /^[a-z\s]+$/i,
			                message: $requiredposition
			            }
	                }
	            },
	            salary: {
	                validators: {
	                    notEmpty: {
	                        message: $requiredsalary
	                    },
	                    regexp: {
			                regexp: /^[0-9,.\s]+$/i,
			                message: $requiredsalary
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
	            dateOfAdjustment: {
	                validators: {
	                    notEmpty: {
	                        message: $requireddateOfAdjustment
	                    },
	                    date: {
	                        format: 'DD-MM-YYYY'
	                    }
	                }
	            }
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
	   
		$('#datetimepicker1')
        .on('dp.change dp.show', function(e) {
            // Validate the date when user change it
            $('#addForm')
                // Get the bootstrapValidator instance
                .data('bootstrapValidator')
                // Mark the field as not validated, so it'll be re-validated when the user change date
                .updateStatus('dateOfAdjustment', 'NOT_VALIDATED', null)
                // Validate the field
                .validateField('dateOfAdjustment');
        });
		
		$('#datetimepicker1').datetimepicker({
			 
			 format : 'DD-MM-YYYY',
// 			 minDate: 'moment'
			 
		 });
		
		$('#tbResult').dataTable({ 
			"bLengthChange": false,
			"iDisplayLength": 10,
			"pagingType": "simple_numbers",
			"ordering": false,
			//"info": false,
			"dom": '<"toolbar">frtip'
		});
		
		$("div.toolbar").html('<b><button type="button" id="addBtnHis" class="btn btn-warning" data-toggle="modal" data-target="#addModal">'+$msgNewRecord+'</button> </b>');
		
		dt = $('#tbResult').dataTable();
		listAll();
		
		/* --- addProduct,updateProduct --- */
		$("#addModal").on("show.bs.modal",function(event) {
			
			//clearModal();
			 
			var button = $(event.relatedTarget) //Button that triggered the model เพื่อดูว่า evet ของ ปุ่มไหน
			var historyid = button.data("id") //Extract info from data-* attribute
			
			if(historyid != null){
				getId(historyid);
			} 
			
			$(this).find(".btnSave").off("click").on("click",function() {
				$("#salary").val($("#salary").val().replace(/[\(\)-]/g, ""));
				if(historyid != null){
					$('#addForm').bootstrapValidator();
    				$('#addForm').data('bootstrapValidator').validate();
    				if($('#addForm').data('bootstrapValidator').isValid()){
						updateHistory(button, historyid);
    				}
				}else{
					$('#addForm').bootstrapValidator();
    				$('#addForm').data('bootstrapValidator').validate();
    				if($('#addForm').data('bootstrapValidator').isValid()){
    					
						addHistory();
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
			var historyid = button.data("id") //Extract info from data-* attribute
			
			$(this).find(".btnYes").off("click").on("click",function() {
				deleteHistory(button, historyid);
			});
			
		});
		
/* ---------------------------------------------------------------------------------------------------------------------------------------------- */
		
		
    
		function clearModal(){
			$("#position").val("");
			$("#salary").val("");
			$("#oldSalary").val("");
			$("#dateOfAdjustment").val("");
			$("#reasonOfAdjustment").val("");
// 			$("#adjustmentTime").val("");
		}
		
		function addHistory(){
// 			var id = getUrlParameter('Id');
			var id = $("#empId").val();
			$.ajax({
				url : $getContextPath+"/history/add",
				data : JSON.stringify({
					position : $("#position").val(),
					salary :$("#salary").val().replace(/[\(\)\,-]/g, ""),
					oldSalary :$("#oldSalary").val().replace(/[\(\)\,-]/g, ""),
					dateOfAdjustment :$("#dateOfAdjustment").val(),
					reasonOfAdjustment :$("#reasonOfAdjustment").val(),
// 					adjustmentTime :$("#adjustmentTime").val(),
					employeeId: id
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
// 						data.position,
// 						data.salary,
// 						data.oldSalary,
// 						data.dateOfAdjustment,
// 						data.reasonOfAdjustment,
// 						data.adjustmentTime,
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
// 					$('#addForm').bootstrapValidator('validate');
				} */
			});
		}
		
		function updateHistory(button, historyid){
// 			var id = getUrlParameter('Id');
			var id = $("#empId").val();
			$.ajax({
				url : $getContextPath+"/history/update",
				data : JSON.stringify({
					id : historyid,
					createdBy : $("#createHis").val(),
					createdTimeStamp : $("#createdTimeHis").val(),
					position : $("#position").val(),
					salary :$("#salary").val().replace(/[\(\)\,-]/g, ""),
					oldSalary :$("#oldSalary").val().replace(/[\(\)\,-]/g, ""),
					dateOfAdjustment :$("#dateOfAdjustment").val(),
					reasonOfAdjustment :$("#reasonOfAdjustment").val(),
// 					adjustmentTime :$("#adjustmentTime").val(),
					employeeId : id
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
					
// 					dt.fnUpdate(data.position,tr,0);
// 					dt.fnUpdate(data.salary,tr,1);
// 					dt.fnUpdate(data.oldSalary,tr,2);
// 					dt.fnUpdate(data.dateOfAdjustment,tr,3);
// 					dt.fnUpdate(data.reasonOfAdjustment,tr,4);
// 					dt.fnUpdate(data.adjustmentTime,tr,5);
// 					/* dt.fnUpdate(data.company, tr ,1);
// 					dt.fnUpdate(data.salary, tr ,2);
// 					dt.fnUpdate(data.time, tr ,3); */
					
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
// 					alert("ERROR");
					$(function(){ new PNotify({
					    title: 'Error!',
					    type: 'error',
						animation: {
							effect_in: 'show',
							effect_out: 'slide'
						}
						});
					});

// 					$('#addForm').bootstrapValidator('validate');

				} */
			});
		}
		
		function getId(historyid){
			$.ajax({
				url : $getContextPath+"/history/findById",
				data : "historyid=" + historyid,
				type : "POST",
				success : function(data) {
	 				//alert(JSON.stringify(data));
					//alert("ok");
					$("#createHis").val(data.createdBy);
					$("#createdTimeHis").val(data.createdTimeStamp);
					$("#position").val(data.position);
					$("#salary").val(accounting.formatNumber(data.salary));
					$("#oldSalary").val(accounting.formatNumber(data.oldSalary));
// 					$("#salary").autoNumeric('set',data.salary);
// 					$("#oldSalary").autoNumeric('set',data.oldSalary);
					$("#dateOfAdjustment").val(data.dateOfAdjustment);
					$("#reasonOfAdjustment").val(data.reasonOfAdjustment);
// 					$("#adjustmentTime").val(data.adjustmentTime);
					
					/* employee: {id: data.position } */
					/* $("#company").val(data.company),
					$("#salary").val(data.salary),
					$("#time").val(data.time); */
			
				}/* ,
				error : function() {
// 					alert("ERROR");
					$(function(){ new PNotify({
					    title: 'Error!',
					    type: 'error',
						animation: {
							effect_in: 'show',
							effect_out: 'slide'
						}
						});
					});
				} */
			});
		}
		
		function deleteHistory(button, historyid){
			$.ajax({
				url : $getContextPath+"/history/delete",
				data : "historyid=" + historyid,
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
// 					alert("ERROR");
					$(function(){ new PNotify({
					    title: 'Error!',
					    type: 'error',
						animation: {
							effect_in: 'show',
							effect_out: 'slide'
						}
						});
					});
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
				url : $getContextPath+"/history/listAll/"+id,
				type : "POST",
				success : function(data) {
					dt.fnClearTable();
				for (var i=0;i< data.length; i++) {
					dt.fnAddData([
								  data[i].dateOfAdjustment,
					              data[i].position,
					              accounting.formatNumber(data[i].salary),
					              data[i].reasonOfAdjustment,
						 '<button type="button"  class="btn btn-warning btn-sm active btn-center" data-id="' + data[i].id + '" data-target="#addModal" data-toggle="modal">'+$msgEdit+'</button>',
						'<button type="button" class="btn btn-danger btn-sm active btn-center" data-id="' + data[i].id + '" data-target="#deleteModal" data-toggle="modal">'+$msgDelete+'</button>']);
			 
					}
				$(".btn-center").closest("td").addClass("text-center");
				}/* ,
				error : function() {
					alert("ERROR");
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
	
