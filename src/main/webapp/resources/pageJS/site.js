
/**
 * @author apiva kimkatanom
 * @date   Aug 10, 2015
 */

	var dt;  	

	
	$(function(){
		
		
		
		$("#saveBtn").on("click",function(){
			
			$('#formAddUpdate').bootstrapValidator('resetForm', true);

		});
		
		
		 
		  $("#formAddUpdate").bootstrapValidator({
			   
			   message: 'This value is not valid',
		        //container: 'tooltip',
		        feedbackIcons: {
		            valid: 'glyphicon glyphicon-ok',
		            invalid: 'glyphicon glyphicon-remove',
		            validating: 'glyphicon glyphicon-refresh'
		        },
		        fields: {
		        	
		        	projectName: {
		                validators: {
		                    notEmpty: {
		                        message: $requiredProjectname
		                    }
		                }
		            },
		            projectOwner: {
		                validators: {
		                    notEmpty: {
		                        message: $requiredProjectOwner
		                    }
		                }
		            },
		            projectOwnerContact: {
		                validators: {
		                    notEmpty: {
		                        message: $requiredProjectOwnerContact
		                    },
		                }
		            },
		            startDate: {
		                validators: {
		                    notEmpty: {
		                        message: $requiredStartDate
		                    },
		                    date: {
		                        format: 'DD-MM-YYYY'
		                    }
		                }
		            },
		            endDate: {
		                validators: {
		                    notEmpty: {
		                        message: $requiredEndDate
		                    },
		                    date: {
		                        format: 'DD-MM-YYYY'
		                    }
		                }
		            },
		           
		        }
		 
    }); 
	
			
			$('#tableResult').dataTable({ 
				"bLengthChange": false,
				"iDisplayLength": 10,
				"pagingType": "simple_numbers",
				"ordering": false,
				//"info": false,
				"dom": '<"toolbar">frtip'
			});
			
			$("div.toolbar").html('<b><button type="button" class="btn btn-warning btn-md" data-toggle="modal" data-target="#addModal">'+$msgNewRecord+'</button>  </b>');
		
		dt = $('#tableResult').dataTable();  	
		doFindData();
		
		/* var defaultDate = new Date();
		var defaultDateOne = new Date();
		defaultDateOne.setDate(defaultDate.getDate()+1);
		
		
		$('#startDate').daterangepicker({
	        format: 'DD-MM-YYYY',
	        startDate: defaultDate,
	        endDate: defaultDateOne,
	        dateLimit: { days: 6 }
	    }); */
		
		
		
		//$('#startDate').daterangepicker({ startDate: '2014-03-05', endDate: '2014-03-06' });

		//$('#startDate').data('daterangepicker').setStartDate('2014-03-01');
		//$('#startDate').data('daterangepicker').setEndDate('2014-03-31');

		//$('#startDate').mask("99-99-9999",{placeholder:"DD-MM-YYYY"});
		//$('#endDate').mask("99-99-9999",{placeholder:"DD-MM-YYYY"});
		
		
	
	  $('#startDate').datetimepicker({
			 
 						 //viewMode: 'days',
						 format : 'DD-MM-YYYY',
   				 	     defaultDate: 'moment',
		 				 //minDate: 'moment',
						 //showClear: true,
 						 //showClose:true,		
						
		});
	  
	  
	  
	  $('#startDate').data("DateTimePicker").date(moment());
	  $("input[name='startDate']").val($('#startDate').data("DateTimePicker").date().format('DD-MM-YYYY')); 
	  
	  
	  
	  
	  
			 
		var defaultDate = new Date();
		defaultDate.setDate(defaultDate.getDate()+1);
		
		
		$('#endDate').datetimepicker({			 
 			 //viewMode: 'days',
			 format : 'DD-MM-YYYY',	 
			 defaultDate: defaultDate,
 			 minDate: 'moment',
			 //ShowClear: true,
 			 //showClose:true					 
		
		});
		
		  $('#endDate').data("DateTimePicker").minDate(defaultDate);
		  $('#endDate').data("DateTimePicker").date(defaultDate);
		  $("input[name='endDate']").val($('#endDate').data("DateTimePicker").date().format('DD-MM-YYYY')); 
		  
		  

		
		
 		$("#startDate").on("dp.change", function (e) {
 			
 			$('#formAddUpdate')
            // Get the bootstrapValidator instance
            .data('bootstrapValidator')
            // Mark the field as not validated, so it'll be re-validated when the user change date
            .updateStatus('startDate', 'NOT_VALIDATED', null)
            // Validate the field
            .validateField('startDate');
 			
 			
    			var tempdate = new Date(e.date);
    			tempdate.setDate(tempdate.getDate()+1);
                $('#endDate').data("DateTimePicker").minDate(tempdate);
            
            
        }); 
 		
 		
 		
		$("#endDate").on("dp.change", function (e) {
 			
 			$('#formAddUpdate')
            // Get the bootstrapValidator instance
            .data('bootstrapValidator')
            // Mark the field as not validated, so it'll be re-validated when the user change date
            .updateStatus('endDate', 'NOT_VALIDATED', null)
            // Validate the field
            .validateField('endDate');
 			
        }); 
 		 
 		 
 		 
 		 
 		function doFindData() {  
		   	   
 			//var id = getUrlParameter('Id');
   	     
   	     	var id = $("#empId").val();
	  	     $.ajax({  
	  	      type : "POST",   
	  	      url : $getContextPath+"/site/list/"+id,   
	  	      dataType : 'json', 
	  	      contentType :"application/json; charset=utf-8",
	  	     
	  	      success : function(data) {  
	    		
	  	    
	  	        dt.fnClearTable();
	  	    	
	  	        for(var i=0;i<data.length;i++){
	  	        	
		  			 	
		  			        
	  	        	   dt.fnAddData([ 
				  			           
				  			           data[i].startDate,
				  			           data[i].endDate,
				  			           data[i].projectName,
				  			           data[i].projectOwner,
				  			           data[i].projectOwnerContact,
				  			          '<button type="button" class="btn btn-warning btn-sm active btn-center" data-idupdate="' + data[i].id + '" data-target="#addModal" data-toggle="modal">'+$msgEdit+'</button>',
				    				  '<button type="button" class="btn btn-danger btn-sm active btn-center" data-iddelete="' + data[i].id + '" data-target="#deleteModal" data-toggle="modal">'+$msgDelete+'</button>'
				    					
				  			           ]);
		  		
		  	    	 }
	  	      $(".btn-center").closest("td").addClass("text-center");
	  	        		  	        
	  	     }
	  	   }); 
	  	   

	    }
 		
 		
 		
 		
 		 $("#addModal").on("show.bs.modal", function(event){
 			  
 			 
	    	    //clearModal();
	    	    var button = $(event.relatedTarget);
	    		var idUpdate = button.data("idupdate"); 
	    		if(idUpdate != null){
	    		
	    			doInitEdit(idUpdate);
	    			
				}
	     		
	    		$(this).find("#saveBtn").off("click").on("click", function()
	    		{
	    			if(idUpdate != null){
	    				$('#formAddUpdate').bootstrapValidator();
	    				$('#formAddUpdate').data('bootstrapValidator').validate();
	    				if($('#formAddUpdate').data('bootstrapValidator').isValid()){
	    				 doEdit(idUpdate);
	    				}
	    			}
	    			else {
	    				$('#formAddUpdate').bootstrapValidator();
	    				$('#formAddUpdate').data('bootstrapValidator').validate();
	    				if($('#formAddUpdate').data('bootstrapValidator').isValid()){
	    				 addSite();
	    				}
	    			}
	    		});
	    	  
	      });
 		 
 		 
 		 
 		$('#addModal').on("hide.bs.modal",function(event){
 			
			   //$('#formAddUpdate').bootstrapValidator('resetForm', true);
			   $('#formAddUpdate').bootstrapValidator();
			   $('#formAddUpdate').data('bootstrapValidator').resetForm();
			   $('#formAddUpdate')[0].reset();
			   $("input[name='startDate']").val('');
			   $("input[name='endDate']").val('');
			   
			  	   

			   /*for set date*/
	
			   //$('#startDate').data("DateTimePicker").minDate(moment());
			   $('#startDate').data("DateTimePicker").date(moment());
			   $("input[name='startDate']").val($('#startDate').data("DateTimePicker").date().format('DD-MM-YYYY'));
			   //$("input[name='startDate']").val(moment().format("DD-MM-YYYY"));
			  
 		       var d = new Date($('#startDate').data("DateTimePicker").date());
			   d.setDate(d.getDate()+1);
			   //alert("d "+d);
			   //$('#endDate').data("DateTimePicker").minDate(d);
           	   //$('#endDate').data("DateTimePicker").date(d);
           	   
           	   
           	   $('#endDate').data("DateTimePicker").minDate(d);
           	   $('#endDate').data("DateTimePicker").date(d);
           	   $("input[name='endDate']").val($('#endDate').data("DateTimePicker").date().format('DD-MM-YYYY')); 

			    	  
	    });
 		 
 		 
 		 
 		function addSite() {  
		   	   
    	    
 			//var id = getUrlParameter('Id');
    	    var id = $("#empId").val();
    	    
	  		
	  	    
	  	    $.ajax({  
	  	      type : "POST",   
	  	      url : $getContextPath+"/site/add",   
	  	      dataType : 'json', 
	  	      data : JSON.stringify(
	  	    		{"projectName":$('#projectName').val(),
	    			"startDate" : $("input[name='startDate']").val(),
  	    			"endDate": $("input[name='endDate']").val(),
  	    			"projectOwner":$('#projectOwner').val(),
  	    			"projectOwnerContact":$('#projectOwnerContact').val(),
  	    			"employeeId":id}
	  	    		),  
	  	      contentType :"application/json; charset=utf-8",
	  	     
	  	      success : function(data) {  
	  	    	 
	  	    	     $('#addModal').modal('hide');
	  	    	     doFindData();
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
		    		
	  	     }
	  	    }); 
	  	    
	  	   
	     } 
 		 
 		
 		
 		
 		
 		
 		function doInitEdit(idUpdate) {  
		   	
 			
	  	     $.ajax({  
	  	      type : "POST",   
	  	      url : $getContextPath+"/site/initedit",   
	  	      dataType : 'json', 
	  	      data : JSON.stringify({"id":idUpdate}),  
	  	      contentType :"application/json; charset=utf-8",
	  	     
	  	      success : function(data) {  
	    		
	  	    	//alert(JSON.stringify(data));
	  	    	
	  	    	$('#projectName').val(data.projectName);
	  	    	$("input[name='startDate']").val(data.startDate);
	  	    	$("input[name='endDate']").val(data.endDate);
	  	    	$('#projectOwner').val(data.projectOwner);
	  	    	$('#projectOwnerContact').val(data.projectOwnerContact);
	  	    	
	  	    
	  	    	
	  	    	//$('#startDate').data("DateTimePicker").minDate(data.startDate).date(data.startDate);	  	    	
	  	    	$('#startDate').data("DateTimePicker").date(data.startDate);	  	    	
	  	    	
	  	    	var date = new Date();
	  	    	date.setDate($('#startDate').data("DateTimePicker").date());
	  	    	date.setDate(date.getDate()+1);
	  	    	$('#endDate').data("DateTimePicker").minDate(data.startDate+1);
	            $('#endDate').data("DateTimePicker").date(data.endDate); 
	   	    	
	  	     }
	  	    }); 
	  	   
	    }
 		
 		
 		
 		 
 		
 		 
 		  function doEdit(idUpdate) {  
 			  
 			  var id = $("#empId").val();
	    	 
		  	    $.ajax({  
		  	      type : "POST",   
		  	      url : $getContextPath+"/site/edit",   
		  	      dataType : 'json', 
		  	      data : JSON.stringify({
		  	    	  			"id":idUpdate,
	  	    		  			"projectName":$('#projectName').val(),
	  	    		    		"startDate":$("input[name='startDate']").val(),
	  	    		   	 		"endDate":$("input[name='endDate']").val(),
	  	    		    		"projectOwner":$('#projectOwner').val(),
	  	    		    		"projectOwnerContact":$('#projectOwnerContact').val(),
	  	    		    		"employeeId":id
	  	    		    		}),  
		  	      contentType :"application/json; charset=utf-8",
		  	     
		  	      success : function(data) {  
		  	    	
		  	    	 
		  	    	  
		  	    	  //alert(JSON.stringify(data));
		  	    	 
		  	    	
		  	       		 $('#addModal').modal('hide');	  
		  	       	     doFindData();
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
		  	        
		  	     }
		  	    }); 	  	    
		    }
 		 
 		 
 		  
 		 $("#deleteModal").on("show.bs.modal", function(event){
 			 
  			var button = $(event.relatedTarget);
     		var idDelete = button.data("iddelete"); 
 				
     		
     		$(this).find("#delete").off("click").on("click", function(){
     			
     			
	     			$.ajax({  
	  		  	      type : "POST",   
	  		  	      url : $getContextPath+"/site/delete",   
	  		  	      dataType : 'json', 
	  		  	      data : JSON.stringify({"id":idDelete}),  
	  		  	      contentType :"application/json; charset=utf-8",
	  		  	     
	  		  	      success : function(data) {  
	  		    		
	  		  	    	
	  		  	    	$('#deleteModal').modal('hide');
	  	  	       	    doFindData();
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
		  		  	    	 
	  		  	     }
	  		  	    }); 
	  		  	   
     			
   						
  			 
  		    });
  		 
 	     });
 		 
 		 
 		 
 		 
 		 
	     
	     
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