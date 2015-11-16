



	var dt;
	$(document).ready(function() {
		
		$('#datepunish').mask("99-99-9999",{placeholder:"DD-MM-YYYY"});
		
		$('#tbResult').dataTable({ 
			"bLengthChange": false,
			"iDisplayLength": 10,
			"pagingType": "simple_numbers",
			"ordering": false,
			//"info": false,
			"dom": '<"toolbar">frtip'
		});
		
		$("div.toolbar").html('<b><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#addModal">'+$msgNewRecord+'</button>  </b>');
		
		
		$("#addBtn").on("click",function(){
			clearModal();
		});
		
			
	$('#addForm').bootstrapValidator({
//	        live: 'disabled',
	        message: 'This value is not valid',
	        feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {
	        	
	         	datepunish: {
	                validators: {
	                    notEmpty: {
	                    	message: $validatepunish
	                    },
	                    date: {
	                        format: 'DD-MM-YYYY'
	                    }
	                   
	                }
	            }, 
	            description: {
	                validators: {
	                    notEmpty: {
	                    	message: $validatedescriptionpunish
	                    }
	                }
	            },
	            
	            penalty: {
	                validators: {
	                    notEmpty: {
	                    	message: $validatepenaltypunish
	                    }
	                }
	            }
	          
	        }
	    });
		
		$('#datetimepicker1')
        .on('dp.change dp.show', function(e) {
            // Validate the date when user change it
            $('#addForm')
                // Get the bootstrapValidator instance
                .data('bootstrapValidator')
                // Mark the field as not validated, so it'll be re-validated when the user change date
                .updateStatus('datepunish', 'NOT_VALIDATED', null)
                // Validate the field
                .validateField('datepunish');
        });
		
		$('#datetimepicker1').datetimepicker({
			 
			 format : 'DD-MM-YYYY',
// 			 minDate: 'moment'
			 
		 });
	
		dt = $('#tbResult').dataTable();	
		 listAll();
		 
		$("#addModal").on("show.bs.modal",function(event) {
						
			var button = $(event.relatedTarget) //Button that triggered the model เพื่อดูว่า evet ของ ปุ่มไหน
			var punishid = button.data("id") //Extract info from data-* attribute
						
			 if(punishid != null){				 
				 getpunishById(punishid);
			} 
						
			$(this).find(".btnSave").off("click").on("click",function() {
			if(punishid != null){
				$('#addForm').bootstrapValidator();
				$('#addForm').data('bootstrapValidator').validate();
				if($('#addForm').data('bootstrapValidator').isValid()){
					updatepunish(button, punishid);
				}
			}else{
				$('#addForm').bootstrapValidator();
				$('#addForm').data('bootstrapValidator').validate();
				if($('#addForm').data('bootstrapValidator').isValid()){
					addpunish();
				}
			 }
		});
			
			
			
				 $(this).find(".btnClose").off("click").on("click",function() {
						$('#addForm').bootstrapValidator('resetForm', true);
			});
			
		});
		
		
//		------------------------------------------------------------------------------------------------------------

	 	$("#deleteModal").on("show.bs.modal", function (event) {
				
	 			var button = $(event.relatedTarget); // select การกระทำของปุ่ม
	 			var punishid = button.data("id"); //กดไอดีฝังในปุ่ม 
				
		
	 			$(this).find('.btnYes').off('click').on("click", function() {
								
	 					deleteById(button ,punishid);
	 
	 				})
					
	 			})
		});
								
/* ---------------------------------------------------------------------------------------------------------------------------------------------- */
		function clearModal(){
			$("#datepunish").val(""),
			$("#description").val("");
			$("#penalty").val("");
		
		}

		function addpunish(){
// 			var id = getUrlParameter('Id');
			var id = $("#empId").val();
			$.ajax({
				//url : "${pageContext.request.contextPath}/punish/add",
				url : $getContextPath+"/punish/add",
				data : JSON.stringify({
					datepunish : $("#datepunish").val(),
					description :$("#description").val(),
					penalty :$("#penalty").val(),	
					employeeId : id		
				}),
				type : "POST",
				contentType : "application/json",
				dataType: "json",
				success : function(data) {

					$('#addForm').bootstrapValidator('resetForm', true);
					dt.fnClearTable();					
					dt.fnAddData([             
								
									data.datepunish,
									data.description,	
									data.penalty,
						'<button type="button" style="margin-right :15px;" class="btn btn-warning" data-id="'+data.id+'" data-toggle="modal" data-target="#addModal" >'+$msgEdit+'</button>',
						'<button type="button" class="btn btn-danger" data-id="'+data.id+'" data-toggle="modal" data-target="#deleteModal"> '+$msgDelete+'</button>'
					]);
					
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
					//	alert("error");
					
					$('#addForm').bootstrapValidator('validate');
				}*/
			});
		}
		
		
		
		function updatepunish(button,punishid) {
// 			var id = getUrlParameter('Id');
			var id = $("#empId").val();
			$.ajax({
				//url:'${pageContext.request.contextPath}/punish/update',			
				url : $getContextPath+"/punish/update",
				data: JSON.stringify({    //แปลงจาก obj ของจาวาสคริปให้ไปเป็น string  ของเจสัน
					
								id :punishid,
								datepunish: $("#datepunish").val(),	
								description: $("#description").val(), 
								penalty: $("#penalty").val(), 
								employeeId: id 
											
					}),
					type:"POST",
					contentType:"application/json",
					datatype: "json",
					success : function(data) {
						
					var tr = button.closest("tr"); // หาเเถวจากปุ่ม
						
					
					dt.fnUpdate(data.datepunish, tr, 0),
					dt.fnUpdate(data.description, tr, 1),
					dt.fnUpdate(data.penalty, tr, 2),
				
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
					error : function(jqXHR,	textStatus,	error) {
						$(function(){ new PNotify({
						    title: 'Error!',
						    type: 'error',
							animation: {
								effect_in: 'show',
								effect_out: 'slide'
							}
							});
						});
						//alert("error");
					} */
			});
			
		}
		
		
		
		function getpunishById(punishid) {
			$.ajax({
				//url : "${pageContext.request.contextPath}/punish/findById/"+ punishid,
				url : $getContextPath+"/punish/findById/"+punishid,
				//data : "id=" +punishid,
				type : "POST", 
				success : function(data) {
					$("#datepunish").val(data.datepunish); 
					$("#description").val(data.description);
					$("#penalty").val(data.penalty);
					employeeId: data.employeeId;
					
					}/* ,
				error : function(jqXHR,	textStatus,	error) {
					$(function(){ new PNotify({
					    title: 'Error!',
					    type: 'error',
						animation: {
							effect_in: 'show',
							effect_out: 'slide'
						}
						});
					});
					//alert("error");
									} */
							});
						}	
		
		
		
		function deleteById(button,punishid) {
			$.ajax({
				//url : "${pageContext.request.contextPath}/punish/delete/"+ punishid,
				url : $getContextPath+"/punish/delete/"+punishid,
				//data : "id=" +punishid,
				type : "POST", 
				success : function(data) {				
					/* var tr = button.closest("tr"); // หาเเถวจากปุ่ม											
					dt.fnDeleteRow(tr); */					
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
				error : function(jqXHR,	textStatus,	error) {
					$(function(){ new PNotify({
					    title: 'Error!',
					    type: 'error',
						animation: {
							effect_in: 'show',
							effect_out: 'slide'
						}
						});
					});
						//alert("error ----");
						} */
				});							
		}
		
		
		
			function listAll(){
				
// 				var id = getUrlParameter('Id');
				//alert("id >>>>"+id);	
				var id = $("#empId").val();
				$.ajax({
					//url : "${pageContext.request.contextPath}/punish/listAll"+id,
					url : $getContextPath+"/punish/listAll"+id,
					type : "POST",
					success : function(data) {
						dt.fnClearTable();
					for (var i=0;i< data.length; i++) {
						dt.fnAddData([data[i].datepunish,
						              data[i].description, 	
						              data[i].penalty, 					             
							'<button type="button"  class="btn btn-warning btn-sm active btn-center" data-id="' + data[i].id + '" data-target="#addModal" data-toggle="modal">'+$msgEdit+'</button>',
							'<button type="button" class="btn btn-danger btn-sm active btn-center" data-id="' + data[i].id + '" data-target="#deleteModal" data-toggle="modal">'+$msgDelete+'</button>']);
				
						}
					$(".btn-center").closest("td").addClass("text-center");
					}/* ,
					error : function(jqXHR,	textStatus,	error) {	
						$(function(){ new PNotify({s
						    title: 'Error!',
						    type: 'error',
							animation: {
								effect_in: 'show',
								effect_out: 'slide'
							}
							});
						});
						//alert("error");
						} */
					}); 
			}
			
			
			
			function getUrlParameter(sParam){
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
	
	
	

	