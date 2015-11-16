

	var dt;
	$(document).ready(function() {
		
		
		$("#addBtn").on("click",function(){clearModal();});
			
		$('#tbResult').dataTable({ 
			"bLengthChange": false,
			"iDisplayLength": 10,
			"pagingType": "simple_numbers",
			"ordering": false,
			//"info": false,
			"dom": '<"toolbar">frtip'
		});
		
		 
		$("div.toolbar").html('<b><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#addModal">'+$msgNewRecord+'</button>  </b>');
		
		$("#addBtn").on("click", function(){			
			clearModal();		
		}); 
		
		$("#Button").on("click",function(){
				
				/* $('#addForm').bootstrapValidator(); */
				$('#addForm').data('bootstrapValidator').resetForm();
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
	        	
	        	card_no: {
	                validators: {
	                    notEmpty: {
	                    	message: $validatecardno
	                    },
	                   
	                }
	            }, 
	            startdate: {
	                validators: {
	                    notEmpty: {
	                    	message: $validatedestartdatecard
	                    },
	                    date: {
	                        format: 'DD-MM-YYYY'
	                    }
	                }
	            },
	  
	            status: {
	                validators: {
	                    notEmpty: {
	                    	message: $validatestatuscard
	                    }

	                }
	            },
	           
	        
	        }
	    });
		
		
		
		$('#datetimepicker1').datetimepicker({
			 
			 format : 'DD-MM-YYYY',
			 defaultDate: 'moment',
			 
		 });
		
		var defaultDate = new Date();
		defaultDate.setDate(defaultDate.getDate());
		
		
		$('#datetimepicker2').datetimepicker({
			 
			 format : 'DD-MM-YYYY',
			 defaultDate: defaultDate,
			 
		 });
		
		
		
		
		//$('#startdate').mask("99-99-9999",{placeholder:"DD-MM-YYYY"});
		//$('#enddate').mask("99-99-9999",{placeholder:"DD-MM-YYYY"});
		
		$('#datetimepicker1')
        .on('dp.change dp.show', function(e) {
            // Validate the date when user change it
            $('#addForm')
                // Get the bootstrapValidator instance
                .data('bootstrapValidator')
                // Mark the field as not validated, so it'll be re-validated when the user change date
                .updateStatus('startdate', 'NOT_VALIDATED', null)
                // Validate the field
                .validateField('startdate');
          

            var tempdate = new Date(e.date);
			tempdate.setDate(tempdate.getDate());
            $('#datetimepicker2').data("DateTimePicker").minDate(tempdate);

        });


		$('#datetimepicker2')
   /*      .on('dp.show', function(e) {
            // Validate the date when user change it
            $('#addForm')
                // Get the bootstrapValidator instance
                .data('bootstrapValidator')
                // Mark the field as not validated, so it'll be re-validated when the user change date
                .updateStatus('enddate', 'NOT_VALIDATED', null)
                // Validate the field
                .validateField('enddate');

        });
 */
		
		
	
		


		dt = $('#tbResult').dataTable();	
		 listAll();
		 
		 
		$("#addModal").on("show.bs.modal",function(event) {
						
			var button = $(event.relatedTarget) //Button that triggered the model เพื่อดูว่า evet ของ ปุ่มไหน
			var cardid = button.data("id") //Extract info from data-* attribute

			 var d = new Date($('#datetimepicker1').data("DateTimePicker").date());
				 d.setDate(d.getDate()+1);
    //		$('#datetimepicker2').data("DateTimePicker").minDate(d);
    //		$('#datetimepicker2').data("DateTimePicker").date(d);
			
			clearModal();
			
			if (cardid != null) {
				getcardById(cardid);
			}
			
			$(this).find(".btnSave").off("click").on("click", function() {
			 if(cardid != null){
				    $('#addForm').bootstrapValidator();
	    			$('#addForm').data('bootstrapValidator').validate();
	    			if($('#addForm').data('bootstrapValidator').isValid()){
	    				updatecard(button, cardid);
				}
			}else{ 
				$('#addForm').bootstrapValidator();
				$('#addForm').data('bootstrapValidator').validate();
				if($('#addForm').data('bootstrapValidator').isValid()){
					addcard();					
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
	 			var cardid = button.data("id"); //กดไอดีฝังในปุ่ม 
				
		
	 			$(this).find('.btnYes').off('click').on("click", function() {
								
	 					deleteById(button ,cardid);
	 
	 				})
					
	 			})
								
/* ---------------------------------------------------------------------------------------------------------------------------------------------- */
		function clearModal(){
			$("#cardno").val(""),
			$("#startdate").val("");
			$("#enddate").val(""),
			$("#status").val(""),
			$("#remark").val("")
		
		}

		function addcard(){
// 			var id = getUrlParameter('Id');
			var id = $("#empId").val();
			$.ajax({
				//url : "${pageContext.request.contextPath}/card/add",
				url : $getContextPath+"/card/add",
				data : JSON.stringify({
					card_no : $("#cardno").val(),
					startdate : $("#startdate").val(),
					enddate : $("#enddate").val(),
					status : $("#status").val(),
					remark :$("#remark").val(),
					employeeId : id	
					//employeeId : {id:2}		
				}),
				type : "POST",
				contentType : "application/json",
				dataType: "json",
				success : function(data) {
					$('#addForm').bootstrapValidator('resetForm', true);
					dt.fnClearTable();					
					dt.fnAddData([             
									data.card_no,
									data.startdate,	
									data.enddate,
									data.status,
									data.remark,
						'<button type="button" style="margin-right :15px;" class="btn btn-warning" data-id="'+data.id+'" data-toggle="modal" data-target="#addModal" > '+$msgEdit+'</button>',
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
					$('#addForm').bootstrapValidator('validate');
				} */
			});
		}
		
		
		
		function updatecard(button,cardid) {
// 			var id = getUrlParameter('Id');
			var id = $("#empId").val();
			$.ajax({
				//url:"${pageContext.request.contextPath}/card/update",	
				url : $getContextPath+"/card/update",
				data: JSON.stringify({    //แปลงจาก obj ของจาวาสคริปให้ไปเป็น string  ของเจสัน
					
								id :cardid,
								card_no: $("#cardno").val(),	
								startdate: $("#startdate").val(), 
								enddate: $("#enddate").val(),
								status: $("#status").val(),
								remark: $("#remark").val(),
								employeeId : id	
								//employeeId: {id:2}
											
					}),
					type:"POST",
					contentType:"application/json",
					datatype: "json",
					success : function(data) {
						
					var tr = button.closest("tr"); // หาเเถวจากปุ่ม
						
					
					dt.fnUpdate(data.card_no, tr, 0),
					dt.fnUpdate(data.startdate, tr, 1),
					dt.fnUpdate(data.enddate, tr, 2),
					dt.fnUpdate(data.status, tr, 3),
					dt.fnUpdate(data.remark, tr, 4),
				
						$('#addModal').modal('toggle');
					$(function(){ new PNotify({
						title:$notifySuccess,
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
// 							alert("error");
					} */
			});
			
		}
		
		
		
		function getcardById(cardid) {
			$.ajax({
				//url : "${pageContext.request.contextPath}/card/findById/"+ cardid,
				url : $getContextPath+"/card/findById/"+cardid,
				//data : "id=" +cardid,
				type : "POST", 
				success : function(data) {
					$("#cardno").val(data.card_no); 
					$("#startdate").val(data.startdate);
					$("#enddate").val(data.enddate);
					$("#status").val(data.status);
					$("#remark").val(data.remark);
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
// 						alert("error");
									} */
							});
						}	
		
		
		
		function deleteById(button,cardid) {
			$.ajax({
				//url : "${pageContext.request.contextPath}/card/delete/"+ cardid,
				url : $getContextPath+"/card/delete/"+cardid,
				//data : "id=" +cardid,
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
// 						alert("error ----");
						} */
				});							
		}
		
		
		
			function listAll(){
				
// 				var id = getUrlParameter('Id');
				//alert("id >>>>"+id);			
				var id = $("#empId").val();
				$.ajax({
					//url : "${pageContext.request.contextPath}/card/listAll"+id,
					url : $getContextPath+"/card/listAll"+id,
					type : "POST",
					success : function(data) {
						dt.fnClearTable();
					for (var i=0;i< data.length; i++) {
						dt.fnAddData([data[i].card_no,
						              data[i].startdate, 		
						              data[i].enddate, 
						              data[i].status, 
						              data[i].remark, 
							'<button type="button" class="btn btn-warning btn-sm active btn-center" data-id="' + data[i].id + '" data-target="#addModal" data-toggle="modal">'+$msgEdit+'</button>',
							'<button type="button" class="btn btn-danger btn-sm active btn-center" data-id="' + data[i].id + '" data-target="#deleteModal" data-toggle="modal">'+$msgDelete+'</button>'
							]);
				
						}
					$(".btn-center").closest("td").addClass("text-center");
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
// 							alert("error");
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
						

	
	
