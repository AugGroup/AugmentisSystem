var dt;
	$(document).ready(function() {
		
		$('#dateFrom').mask("99-99-9999",{placeholder:"DD-MM-YYYY"});
		$('#dateTo').mask("99-99-9999",{placeholder:"DD-MM-YYYY"});
/*  		$('#salary').mask("#,###.00", {locale:"us"}); */
 		$('#salary').autoNumeric('init', {'dGroup': 3});
		$('#tdResult').dataTable({ 
			"bLengthChange": false,
			"iDisplayLength": 10,
			"pagingType": "simple_numbers",
			"ordering": false,
			//"info": false,
			"dom": '<"toolbar">frtip'
		});
		$("div.toolbar").html('<b><button id="clearModal" type="button" class="btn btn-warning btn-md " data-toggle="modal" data-target="#addModal">'+$msgNewRecord+'</button>  </b>');
		var expId; 
		$('#validate').bootstrapValidator({
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
		                        message: $validateExpDateFrom
		                    }, 
		                    date: {
		                        format: 'DD-MM-YYYY'
		                    }
		                }
		            },
		            dateTo: {
		                validators: {
		                    notEmpty: {
		                        message: $validateExpDateTo
		                    }, 
		                    date: {
		                        format: 'DD-MM-YYYY'
		                    }
		                }
		            },
		            cName: {
		            	validators: {
	                        notEmpty: {
	                            message: $validateExpCompanyName
	                        }
	                    }
		            },
		            position: {
		            	validators: {
	                        notEmpty: {
	                            message: $validateExpPosition
	                        }
	                    }
		            },
		            salary: {
		            	validators: {
	                        notEmpty: {
	                            message: $validateExpSalary
	                        }
	                    }
		            },
		            reason: {
		            	validators: {
	                        notEmpty: {
	                            message: $validateExpReason
	                        }
	                    }
		            }
		        }
		});
		
		
		
		$("#dateTimeFrom").datetimepicker({
			format : 'DD-MM-YYYY',
			defaultDate: 'moment', 
/* 		onSelect: function(dateText, inst){
			$("#dateTimeTo").datetimepicker('option', 'minDate', dateText);
			}*/
		}); 
		
 		var defaultDate = new Date();
		defaultDate.setDate(defaultDate.getDate());
		
    	$("#dateTimeTo").datetimepicker({
			format : 'DD-MM-YYYY',
			defaultDate: defaultDate,
			//minDate: 'moment',
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
    		expId = button.data("expid"); 
    		//alert("Check"+expId);
 		    var d = new Date($('#dateTimeFrom').data("DateTimePicker").date());
			d.setDate(d.getDate()+1);
    		$('#dateTimeTo').data("DateTimePicker").minDate(d);
    		$('#dateTimeTo').data("DateTimePicker").date(d);
    		
    		if(expId != null){
				initEditExperience(expId);
			}
     		
    		$(this).find(".saveButton").off("click").on("click", function()
    		{
    			//alert("click");
    			
    			console.log(".saveButton");
    			if(expId != null){
    				$('#validate').bootstrapValidator();
    				$('#validate').data('bootstrapValidator').validate();
    				if($('#validate').data('bootstrapValidator').isValid()){
    					
    					editExperience();
    				}
    			}
    			else {
 		        	$('#validate').bootstrapValidator();
    				$('#validate').data('bootstrapValidator').validate();
    				if($('#validate').data('bootstrapValidator').isValid()){
    					addExperience();
    				}
    			}
    			
    		});
    		
    		$(this).find(".closeButton").off("click").on("click",function() {
				$('#validate').bootstrapValidator('resetForm', true);
			});
    		
    		function addExperience() {
//     			var id = getUrlParameter('Id');
    			var id = $("#empId").val();
    			//debugger;
    			$.ajax({
    				url : $getContextPath+"/experience/add",
    				type : "POST",
    				data : JSON.stringify({
    					 companyName: $("#cName").val(),
    					 typeOfBusiness: $("#businessType").val(),
    					 position: $("#position").val(),
    					 salary: $("#salary").autoNumeric('get'),
    					 dateFrom: $("#dateFrom").val(),
    					 dateTo: $("#dateTo").val(),
    					 responsibility: $("#responsibility").val(),
    					 reference: $("#reference").val(),
    					 address: $("#address").val(),
    					 reason: $("#reason").val(),
    					 applicantId: id 
    					}),
    				datatype: "json",
    				contentType: "application/json",
    				success : function(data) {
    					$('#validate').bootstrapValidator('resetForm', true);
    					$('#addModal').modal('toggle');
    					$(function(){ new PNotify({
    						title:$notifySuccess,
    						text: $notifyAdd,
    						type: 'success',
    						delay: 1000,
    						animation: {
    							effect_in: 'show',
    							effect_out: 'slide'
    						}
    						});
    					});
    					//$("#message").html('<div class="alert alert-success" role="alert">Success</div>');
    					/* dt.fnClearTable();
    					dt.fnAddData([
    					    data.id,
    						data.companyName,
    						data.business,
    						data.position,
    						data.dateFrom,
    						data.dateTo,
    						data.address,
    						data.description,
    						data.superVisor,
    						//data.employee.id,
    					'<button type="button" class="btn btn-info btn-sm active" data-expId="' + data.id + '" data-target="#addModal" data-toggle="modal">Edit</button>',
    					'<button type="button" class="btn btn-danger btn-sm active" data-expId="' + data.id + '" data-target="#deleteModal" data-toggle="modal">Delete</button>'
    					]); */
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
    					} */
    				});
    		}
    		
    		function initEditExperience(expId) {
				//alert(expId+" Init edit");
				$.ajax({
					url : $getContextPath+"/experience/initEdit/"+expId,
					type : "POST",
					success : function(data) {
						//$('#validate').bootstrapValidator('resetForm', true);
						id:expId;
						$("#cName").val(data.companyName);
						$("#businessType").val(data.typeOfBusiness);
						$("#position").val(data.position);
/* 						$("#salary").val(data.salary); */
						$('#salary').autoNumeric('set',data.salary);
						$("#dateFrom").val(data.dateFrom);
						$("#dateTo").val(data.dateTo);
						$("#responsibility").val(data.responsibility);
						$("#reference").val(data.reference);
						$("#address").val(data.address);
						$("#reason").val(data.reason);
						applicantId: data.applicantId;
					}/* ,
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
// 						alert("ERROR");
						//$("#message").html('<div class="alert alert-danger" role="alert">Error</div>');
						} */
					});
			}
			
			
    		
    		function editExperience() {
//     			var id = getUrlParameter('Id');
    			var id = $("#empId").val();
    			console.log(expId+" edit");
				$.ajax({
					url : $getContextPath+"/experience/edit",
					type : "POST",
					data : JSON.stringify({
						 id: expId,
						 companyName: $("#cName").val(),
						 typeOfBusiness: $("#businessType").val(),
    					 position: $("#position").val(),
    					 salary: $("#salary").autoNumeric('get'),
    					 dateFrom: $("#dateFrom").val(),
    					 dateTo: $("#dateTo").val(),
    					 responsibility: $("#responsibility").val(),
    					 reference: $("#reference").val(),
    					 address: $("#address").val(),
    					 reason: $("#reason").val(),
    					 applicantId: id
					 }),
					datatype: "json",
					contentType: "application/json",
					success : function(data) {
						$('#validate').bootstrapValidator('resetForm', true);
						//$('#validate').bootstrapValidator('validate');
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
						//$("#message").html('<div class="alert alert-success" role="alert">Success</div>');
						/* dt.fnClearTable();
						dt.fnAddData([
						    data.id,
							data.companyName,
							data.business,
							data.position,
							data.dateFrom,
							data.dateTo,
							data.description,
							data.superVisor,
							data.address,
							'<button type="button" class="btn btn-info btn-sm active" data-expId="' + data.id + '" data-target="#addModal" data-toggle="modal"></button>',
	    					'<button type="button" class="btn btn-danger btn-sm active" data-expId="' + data.id + '" data-target="#deleteModal" data-toggle="modal">Delete</button>'
						]); */
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
						//$('#addModal').modal('toggle');
// 						alert("ERROR");
						//$("#message").html('<div class="alert alert-danger" role="alert">Error</div>');
						} */
					});
			}
			
    		$("#clearModal").off().on("click", function(){
    			
				$("#businessType").val("");
				$("#cName").val("");
				$("#position").val("");
				$("#salary").val("");
				$("#dateFrom").val("");
				$("#dateTo").val("");
				$("#responsibility").val("");
				$("#reference").val("");
				$("#address").val("");
				$("#reason").val("");
			});
    		
     		});
			
			$("#deleteModal").on("show.bs.modal", function(event){
				var button = $(event.relatedTarget);
				var expId = button.data("expid");
				$(this).find(".yesButton").off("click").on("click", function()
						{
							deleteExperience(button,expId);
							//alert("go fn");
						});
				
				function deleteExperience(button,expId){
					//alert("in fn");
					//alert("delete "+expId);
					$.ajax({
						url : $getContextPath+"/experience/delete/"+expId,
						type : "POST",
						success : function(data) {
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
							//$("#message").html('<div class="alert alert-success" role="alert">Success</div>');		
							/* var del = button.closet("tr");
							dt.fnDeleteRow(del); */
							listAll();
						}/* ,
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
// 							alert("ERROR");
							//$("#message").html('<div class="alert alert-danger" role="alert">Error</div>');
							} */
						});
				}
    		   		
      	});
			
			function listAll(){
				
				//alert("list experience");
// 				var id = getUrlParameter('Id');
				//alert("id >>>>"+id);
				var id = $("#empId").val();
				$.ajax({
					url : $getContextPath+"/experience/listAll/"+id,
					/* data: "id="+getUrlParameter('Id'), */
					type : "POST",
					success : function(data) {
					dt.fnClearTable();
					for (var i=0;i< data.length; i++) {
						dt.fnAddData([data[i].dateFrom,
						              data[i].dateTo,
						              data[i].companyName, 
						              data[i].position,
						              data[i].salary,
						              data[i].reason,
							 
						 	'<button type="button"  class="btn btn-warning btn-sm active btn-center" data-expId="' + data[i].id + '" data-target="#addModal" data-toggle="modal">'+$msgEdit+'</button>',
	    				  '<button type="button" class="btn btn-danger btn-sm active btn-center" data-expId="' + data[i].id + '" data-target="#deleteModal" data-toggle="modal">'+$msgDelete+'</button>']);
	    					
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
  