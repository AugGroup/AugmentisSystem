var dt;
	$(document).ready(function() {
		
		$('#dateFrom').mask("99-99-9999",{placeholder:"DD-MM-YYYY"});
		$('#dateTo').mask("99-99-9999",{placeholder:"DD-MM-YYYY"});
		$('#tdResult').dataTable({ 
			"bLengthChange": false,
			"iDisplayLength": 10,
			"pagingType": "simple_numbers",
			"ordering": false,
			//"info": false,
			"dom": '<"toolbar">frtip'
		});
		
		$("div.toolbar").html('<b><button id="clearModal" type="button" class="btn btn-warning btn-md" data-toggle="modal" data-target="#addModal">'+$msgNewRecord+'</button> </b>');
		var proId; 
		$('#validate')
        .bootstrapValidator({
			message: 'This value is not valid',
			 feedbackIcons: {
		            valid: 'glyphicon glyphicon-ok',
		            invalid: 'glyphicon glyphicon-remove',
		            validating: 'glyphicon glyphicon-refresh'
		        },
		        fields: {
		        	dateFrom: {
		                validators: {
		                    notEmpty: {
		                        message: $validateProDateFrom
		                    }, 
		                    date: {
		                        format: 'DD-MM-YYYY'
		                    }
		        
		                }
		            },
		            dateTo: {
		                validators: {
		                    notEmpty: {
		                        message:  $validateProDateTo
		                    }, 
		                    date: {
		                        format: 'DD-MM-YYYY'
		                    }
		                }
		            },
		            status: {
		            	validators: {
	                        notEmpty: {
	                            message: $validateProStatus
	                        }
	                    }
		            }
		        }
		});
		
    	$( "#dateTimeFrom" ).datetimepicker({
			 //viewMode: 'days',
			 format : 'DD-MM-YYYY',
			 defaultDate: 'moment',
			 //minDate: moment(),
		});
    	
 		var defaultDate = new Date();
		defaultDate.setDate(defaultDate.getDate());
    	$( "#dateTimeTo" ).datetimepicker({
			 //viewMode: 'days',
			 format : 'DD-MM-YYYY',
			 defaultDate: defaultDate,
			 //minDate: moment(),
		});
    	
		$('#dateTimeFrom')
        .on('dp.change dp.show', function(e) {
            // Validate the date when user change it
            $('#validate')
                // Get the bootstrapValidator instance
                .data('bootstrapValidator')
                // Mark the field as not validated, so it'll be re-validated when the user change date
                .updateStatus('dateFrom', 'NOT_VALIDATED', null)
                // Validate the field
                .validateField('dateFrom');
            
            var tempdate = new Date(e.date);
			tempdate.setDate(tempdate.getDate());
            $('#dateTimeTo').data("DateTimePicker").minDate(tempdate);
        });
		
		$('#dateTimeTo')
        .on('dp.change dp.show', function(e) {
            // Validate the date when user change it
            $('#validate')
                // Get the bootstrapValidator instance
                .data('bootstrapValidator')
                // Mark the field as not validated, so it'll be re-validated when the user change date
                .updateStatus('dateTo', 'NOT_VALIDATED', null)
                // Validate the field
                .validateField('dateTo');
        });
    	dt=$("#tdResult").dataTable();
 	
 		listAll();
 		
     	$("#addModal").on("show.bs.modal", function(event){
    		var button = $(event.relatedTarget);
    		proId = button.data("proid");
    		var d = new Date($('#dateTimeFrom').data("DateTimePicker").date());
 			d.setDate(d.getDate()+1);
     		$('#dateTimeTo').data("DateTimePicker").minDate(d);
     		$('#dateTimeTo').data("DateTimePicker").date(d);
    		if(proId != null){
				initEditProbation(proId);
			}
     		
    		$(this).find(".saveButton").off("click").on("click", function()
    		{
    			if(proId != null){
					$('#validate').bootstrapValidator();
    				$('#validate').data('bootstrapValidator').validate();
    				if($('#validate').data('bootstrapValidator').isValid()){
    					editProbation();
    				}
    				
    			}
    			else {
					$('#validate').bootstrapValidator();
    				$('#validate').data('bootstrapValidator').validate();
    				if($('#validate').data('bootstrapValidator').isValid()){
    					addProbation();
    				}
    			}
    			
    		});
    		
    		$(this).find(".closeButton").off("click").on("click",function() {
				$('#validate').bootstrapValidator('resetForm', true);
			});
    		
    		
    		function addProbation() {
//     			var id = getUrlParameter('Id');
    			var id = $("#empId").val();
    			$.ajax({
    				url : $getContextPath+"/probation/add",
    				type : "POST",
    				/*data :  " dateFrom="+ $("#dateFrom").val()+
   					"&dateTo="+ $("#dateTo").val()+ 
    					 "status="+ $("#status option:selected").text()+
   					 "&employee.id="+ id 
   					,*/
   					
    				 data : JSON.stringify({
    					 dateFrom: $("#dateFrom").val(),
    					 dateTo: $("#dateTo").val(),
    					 status: $("#status option:selected").text(),
    					 reason: $("#reason").val(),
    					 employeeId: id
    					}),
    				datatype: "json",
    				contentType: "application/json",
    				success : function(data) {
    					$('#validate').bootstrapValidator('resetForm', true);
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
    				error : function(data,testStatus,jqXHR) {
    					$(function(){ new PNotify({
    					    title: 'Error!',
    					    type: 'error',
    						animation: {
    							effect_in: 'show',
    							effect_out: 'slide'
    						}
    						});
    					});
    					}*/
    				});
    		}
    		
    		function initEditProbation(proId) {
				$.ajax({
					url : $getContextPath+"/probation/initEdit/"+proId,
					type : "POST",
					success : function(data) {
							id:proId;
							$("#dateFrom").val(data.dateFrom);
							$("#dateTo").val(data.dateTo);
							$("#status").val(data.status);
							$("#reason").val(data.reason);
							employeeId: data.employeeId; 
					} ,
					error : function(data,testStatus,jqXHR) {
						$('#addModal').modal('toggle');
						$(function(){ new PNotify({
						    title: 'Error!',
						    type: 'error',
							animation: {
								effect_in: 'show',
								effect_out: 'slide'
							}
							});
						});

						}

					});
			}
    		
    		function editProbation() {
    			var id = $("#empId").val();
				$.ajax({
					url : $getContextPath+"/probation/edit",
					type : "POST",
					data : JSON.stringify({
						 id: proId,
    					 dateFrom: $("#dateFrom").val(),
    					 dateTo: $("#dateTo").val(),
    					 status: $("#status option:selected").text(),
    					 reason: $("#reason").val(),
    					 employeeId: id
					 }),
					datatype: "json",
					contentType: "application/json",
					success : function(data) {
						$('#validate').bootstrapValidator('resetForm', true);
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
					error : function(data,testStatus,jqXHR) {
						$(function(){ new PNotify({
						    title: 'Error!',
						    type: 'error',
							animation: {
								effect_in: 'show',
								effect_out: 'slide'
							}
							});
						});
						}*/
					});
			}
    		
    		$("#clearModal").off().on("click", function(){
				$("#dateFrom").val("");
				$("#dateTo").val("");
				$("#status").val(""); 
				$("#reason").val("");
			});
			
			});
			
			$("#deleteModal").on("show.bs.modal", function(event){
				var button = $(event.relatedTarget);
				var proId = button.data("proid");
				$(this).find(".yesButton").off("click").on("click", function()
						{
							deleteProbation(button,proId);
						});
				
				function deleteProbation(button,proId){
					$.ajax({
						url : $getContextPath+"/probation/delete/"+proId,
						type : "POST",
						success : function(data) {
							$('#deleteModal').modal('toggle');
							$(function(){ new PNotify({
								title:$notifySuccess,
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
						} /*,
						error : function(data,testStatus,jqXHR) {
							$('#deleteModal').modal('toggle');
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
    		   		
      	});
			
			function listAll(){
				
				var id = $("#empId").val();
				$.ajax({
					url : $getContextPath+"/probation/listAll/"+id,
					/* data: "id="+getUrlParameter('Id'), */
					type : "POST",
					success : function(data) {
					dt.fnClearTable();
					for (var i=0;i< data.length; i++) {
						dt.fnAddData([data[i].dateFrom,data[i].dateTo,
						              data[i].status,data[i].reason,
							 '<button type="button"  class="btn btn-warning btn-sm active btn-center" data-proId="' + data[i].id + '" data-target="#addModal" data-toggle="modal">'+$msgEdit+'</button>',
							'<button type="button" class="btn btn-danger btn-sm active btn-center" data-proId="' + data[i].id + '" data-target="#deleteModal" data-toggle="modal">'+$msgDelete+'</button>']);
				 
						}
					$(".btn-center").closest("td").addClass("text-center");
					}/* ,
					error : function(data,testStatus,jqXHR) {
						$(function(){ new PNotify({
						    title: 'Error!',
						    type: 'error',
							animation: {
								effect_in: 'show',
								effect_out: 'slide'
							}
							});
						});
						$("#outputajax").text(testStatus);
						}*/
					}); 
				 
			}
			
			function getUrlParameter(sParam)
			{
			    var sPageURL = document.referrer;
			    var sURLVariables = sPageURL.split('?');

			   	
			    
			    var sParameterName = sURLVariables[1].split('=');
			    if (sParameterName[0] == sParam) 
			        {
			        	return sParameterName[1];
			        	
			        }
			    
			} 
    	
  	});