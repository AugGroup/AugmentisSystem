
	function myFunction(value) {
	
// 	alert(value);
	
	$.ajax({
		url : $getContextPath+"/allowances/findByIdMas",
		data : "masAllowancesid=" + value,
		type : "POST",
		success : function(data) {
				//alert(JSON.stringify(data));
			//alert("ok");
			$("#amount").val(accounting.formatNumber(data.amount_allowances));
			
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
// 			alert("ERROR");
		} */
	});
	
	}
	
	
	$(document).ready(function(){
		
		var dt;
		
		$("#addBtnAll").on("click",function(){clearModal();});
		
// 		$("#addModal").on("click",function(){
			
// 			clearModal();
			
// 		});
		
		$("#closeX").on("click",function(){
			
			clearModal();
			
		});
		
		$('#amount').mask('0,000,000.00', {reverse: true});
		
		$('#addForm').bootstrapValidator({
//	        live: 'disabled',
	        message: 'This value is not valid',
	        feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {
	        	masallowances: {
	                validators: {
	                    notEmpty: {
	                        message: $requiredmasallowances
	                    }
	                   
	                }
	            },
	            /* amount: {
	                validators: {
	                    notEmpty: {
	                        message: 'The amount is required and cannot be empty'
	                    }
	                }
	            }, */
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
		
		$("div.toolbar").html('<b><button type="button" id="addBtnAll" class="btn btn-warning" data-toggle="modal" data-target="#addModal">'+$msgNewRecord+'</button>  </b>');
		dt = $('#tbResult').dataTable();
		listAll();
		
		/* --- addProduct,updateProduct --- */
		$("#addModal").on("show.bs.modal",function(event) {
			
			//clearModal();
			
			var button = $(event.relatedTarget) //Button that triggered the model เพื่อดูว่า evet ของ ปุ่มไหน
			var allowancesid = button.data("id") //Extract info from data-* attribute
			
			if(allowancesid != null){
				getId(allowancesid);
			} 
			
			$(this).find(".btnSave").off("click").on("click",function() {
				if(allowancesid != null){
					$('#addForm').bootstrapValidator();
    				$('#addForm').data('bootstrapValidator').validate();
    				if($('#addForm').data('bootstrapValidator').isValid()){
    					updateAllowances(button, allowancesid); 
    				}	
				}else{
					
					$('#addForm').bootstrapValidator();
    				$('#addForm').data('bootstrapValidator').validate();
    				if($('#addForm').data('bootstrapValidator').isValid()){
    					addAllowances();
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
			var allowancesid = button.data("id") //Extract info from data-* attribute
			
			$(this).find(".btnYes").off("click").on("click",function() {
				deleteAllowances(button, allowancesid);
			});
			
		});
		
/* ---------------------------------------------------------------------------------------------------------------------------------------------- */
		
		function clearModal(){
			$("#masallowances").val("");
			$("#amount").val("");
		}
		
		function addAllowances(){
// 			var id = getUrlParameter('Id');
			var id = $("#empId").val();
			$.ajax({
				url : $getContextPath+"/allowances/add",
				data : JSON.stringify({
					masAllowancesId : $("#masallowances").val(), 
					masallowances : $("#masallowances option:selected").text(),
					amount :$("#amount").val().replace(/[\(\)\,-]/g, ""),
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
// 						data.masallowances,
// 						data.amount,
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
		
		function updateAllowances(button, allowancesid){
// 			var id = getUrlParameter('Id');
			var id = $("#empId").val();
			$.ajax({
				url : $getContextPath+"/allowances/update",
				data : JSON.stringify({
					id : allowancesid,
					masAllowancesId : $("#masallowances").val(), 
					masallowances : $("#masallowances option:selected").text(),
					amount :$("#amount").val().replace(/[\(\)\,-]/g, ""),
					employeeId : id
					/* company :$("#company").val(),
					salary :$("#salary").val(),
					time :$("#time").val(), */
					
				}),
				type : "POST",
				contentType : "application/json",
				dataType: "json",
				success : function(data) {
					$('#addForm').bootstrapValidator('resetForm', true);
//	 					alert(JSON.stringify(data));
					
// 					var tr = button.closest("tr")
					
// 					dt.fnUpdate(data.masallowances,tr,0);
// 					dt.fnUpdate(data.amount,tr,1);
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
		
		function getId(allowancesid){
			$.ajax({
				url : $getContextPath+"/allowances/findById",
				data : "allowancesid=" + allowancesid,
				type : "POST",
				success : function(data) {
	 				//alert(JSON.stringify(data));
					//alert("ok");
					$("#masallowances").val(data.masAllowancesId);
					$("#amount").val(data.amount);
					
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
		
		function deleteAllowances(button, allowancesid){
			$.ajax({
				url : $getContextPath+"/allowances/delete",
				data : "allowancesid=" + allowancesid,
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
				url : $getContextPath+"/allowances/listAll/"+id,
				type : "POST",
				success : function(data) {
					dt.fnClearTable();
				for (var i=0;i< data.length; i++) {
					dt.fnAddData([
					              data[i].masallowances,
					              accounting.formatNumber(data[i].amount),
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
	

