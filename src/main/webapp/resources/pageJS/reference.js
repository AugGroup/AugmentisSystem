

	var dt;
	$(document).ready(function(){
		
		
		 $('#tel').mask("999-999-9999");
		
		$('#tbResult').dataTable({ 
			"bLengthChange": false,
			"iDisplayLength": 10,
			"pagingType": "simple_numbers",
			"ordering": false,
			//"info": false,
			"dom": '<"toolbar">frtip'
			, initComplete :function(){
				$('#tel').mask("999-999-9999",{placeholder:"xxx-xxx-xxxx"});
			}
			
		});
		$("div.toolbar").html('<b><button type="button" class="btn btn-warning btnAdd" data-toggle="modal" data-target="#addModal">'+$msgNewRecord+'</button>  </b>');
		
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
	        	name: {
	                validators: {
	                    notEmpty: {
	                    	message: $validatenamereference
	                    }
	                }
	            },
	            
	         
	            
	            tel: {
	                validators: {
	                    notEmpty: {
	                    	message: $validatetelreference
	                    },
	                    stringLength: {	                    	
	                    	min: 12,
	                    	max: 12,
	                    }
	            	
	                }
	            },
	            
	            address: {
	                validators: {
	                    notEmpty: {
	                    	message: $validateaddressreference
	                    }
	                }
	            },
	            
	            occupation: {
	                validators: {
	                    notEmpty: {
	                    	message: $validateoccupationreference
	                    }
	                }
	            }
	            
	     
	        }
	    });
		
	
		
		dt = $('#tbResult').dataTable();	
		 listAll();
		 
		$("#addModal").on("show.bs.modal",function(event) {
			
			var button = $(event.relatedTarget) //Button that triggered the model เพื่อดูว่า evet ของ ปุ่มไหน
			var referenceid = button.data("id") //Extract info from data-* attribute
			
			clearModal();
			 if(referenceid != null){	
				 
				 getReferenceById(referenceid);
				
			} 			
			$(this).find(".btnSave").off("click").on("click",function() {
				 if(referenceid != null){
					 
					    $('#addForm').bootstrapValidator();
		    			$('#addForm').data('bootstrapValidator').validate();
		    			if($('#addForm').data('bootstrapValidator').isValid()){
		    				updateReference(button, referenceid);
					}
				}else{ 
					$('#addForm').bootstrapValidator();
					$('#addForm').data('bootstrapValidator').validate();
					if($('#addForm').data('bootstrapValidator').isValid()){
						addReference();					
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
	 			var referenceid = button.data("id"); //กดไอดีฝังในปุ่ม 
				
	 		$(this).find('.btnYes').off('click').on("click", function() {
								
	 					deleteById(button ,referenceid);		
	 		})				
	 	})			
	});
		
/* ---------------------------------------------------------------------------------------------------------------------------------------------- */


		function clearModal(){
			$("#name").val(""),
			$("#address").val(""),
		//	$("#Unit").val(""),
			$("#tel").val("");
			$("#occupation").val("");
		}


		
		function addReference(){
// 			var id = getUrlParameter('Id');
			var id = $("#empId").val();
			$.ajax({
				//url : "${pageContext.request.contextPath}/reference/add",
				url : $getContextPath+"/reference/add",
				data : JSON.stringify({			
					name : $("#name").val(),
					address :$("#address").val(),
					tel :$("#tel").val(),
					occupation :$("#occupation").val(),
					applicantId: id 
				}),
				type : "POST",
				contentType : "application/json",
				dataType: "json",
				success : function(data) {
					
					$('#addForm').bootstrapValidator('resetForm', true);
					dt.fnClearTable();					
					dt.fnAddData([
								data.name,
								/* data.address, */
								data.tel,
								/* data.occupation, */
								
	
						'<button type="button" style="margin-right :15px;" class="btn btn-warning" data-id="'+data.id+'" data-toggle="modal" data-target="#addModal" >'+$msgEdit+'</button>',
						'<button type="button" class="btn btn-danger" data-id="'+data.id+'" data-toggle="modal" data-target="#deleteModal">'+$msgDelete+'</button>'
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
				},
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
				}
			});
		}
		
		
			
		function updateReference(button,referenceid) {
// 			var id = getUrlParameter('Id');
			var id = $("#empId").val();
			
			$.ajax({
				//url:'${pageContext.request.contextPath}/reference/update',	
				url : $getContextPath+"/reference/update",
				
				data: JSON.stringify({    //แปลงจาก obj ของจาวาสคริปให้ไปเป็น string  ของเจสัน
					
								id :referenceid,
								name: $("#name").val(),	
								address: $("#address").val(),
								tel :$("#tel").val(),
								occupation: $("#occupation").val(),
								applicantId: id 
												
					}),
					type:"POST",
					contentType:"application/json",
					datatype: "json",
					success : function(data) {
						
					var tr = button.closest("tr"); // หาเเถวจากปุ่ม
									
					dt.fnUpdate(data.name, tr, 0),
					/* dt.fnUpdate(data.address, tr, 1), */
					dt.fnUpdate(data.tel, tr, 1),
					/* dt.fnUpdate(data.occupation, tr, 3), */
					'<button class="btn btn-warning btn-small" style="margin-right :15px;" type="button" data-toggle="modal" data-target="#addModal" data-id="'+ data.id +'"><i class="icon-white icon-pencil"></i> '+$msgEdit+'</button>',
					'<button class="btn btn-danger btn-small" type="button" data-toggle="modal" data-target="#addModal" data-id="'+ data.id +'" ><i class="icon-white icon-trash"></i>'+$msgDelete+' </button>'
							
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
					},
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
// 								alert("error");
					}
			});
			
		}
		
		
		
		function getReferenceById(referenceid) {
			
			$.ajax({
				//url : "${pageContext.request.contextPath}/reference/findById/"+referenceid,
				url : $getContextPath+"/reference/findById/"+referenceid,
				//data : "id=" +referenceid,
				type : "POST", 
				success : function(data) {
					$("#name").val(data.name); 
					$("#address").val(data.address);
					$("#tel").val(data.tel);
					$("#tel").unmask().mask("999-999-9999")
					$("#occupation").val(data.occupation);
					applicantId: data.applicantId;			
					
					
				},
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
// 							alert("error");
				}
			});
		}
		
		
		
		function deleteById(button,referenceid) {
			$.ajax({
				//url : "${pageContext.request.contextPath}/reference/delete/"+referenceid,
				url : $getContextPath+"/reference/delete/"+referenceid,
				//data : "id=" +referenceid,
				type : "POST", 
				success : function(data) {					
				//	var tr = button.closest("tr"); // หาเเถวจากปุ่ม											
				//	dt.fnDeleteRow(tr);			
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
					},
										
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
// 								alert("error");
						}
				});		
		}
		
		
		
			function listAll(){
// 				var id = getUrlParameter('Id');
				var id = $("#empId").val();
				$.ajax({
					//url : "${pageContext.request.contextPath}/reference/listAll/"+id,
					url : $getContextPath+"/reference/listAll/"+id,
					type : "POST",
					success : function(data) {
					dt.fnClearTable();
					for (var i=0;i< data.length; i++) {
						dt.fnAddData([data[i].name, 
						              data[i].tel,							
						    '<button type="button" class="btn btn-warning btn-sm active btn-center" data-id="' + data[i].id + '" data-target="#addModal" data-toggle="modal">'+$msgEdit+'</button>',
							'<button type="button" class="btn btn-danger btn-sm active btn-center" data-id="' + data[i].id + '" data-target="#deleteModal" data-toggle="modal">'+$msgDelete+'</button>']);
				
						}
					$(".btn-center").closest("td").addClass("text-center");
					},
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
// 								alert("error");
						}
					}); 
			}
			
		

			function getUrlParameter(sParam){
	
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
	