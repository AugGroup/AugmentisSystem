			var dt;			
			$(document).ready(function(){
					
				
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
//		        live: 'disabled',
		        message: 'This value is not valid',
		        feedbackIcons: {
		            valid: 'glyphicon glyphicon-ok',
		            invalid: 'glyphicon glyphicon-remove',
		            validating: 'glyphicon glyphicon-refresh'
		        },
		        fields: {
		        	typereward: {
		                validators: {
		                    notEmpty: {
		                    	message: $validatenamereward
		                    }
		                }
		            },
		            year: {
		                validators: {
		                    notEmpty: {
		                    	message: $validateyearreward
		                    },
		                }
		            },
		           
		           
		        }
		    });
				
			dt = $('#tbResult').dataTable();
			listAll();
			$("#addModal").on("show.bs.modal", function(event) {
				
				var button = $(event.relatedTarget) //Button that triggered the model เพื่อดูว่า evet ของ ปุ่มไหน
				var rewardid = button.data("id") //Extract info from data-* attribute

				clearModal();

				if (rewardid != null) {
					getRewardById(rewardid);
				}

				$(this).find(".btnSave").off("click").on("click", function() {
					if(rewardid != null){
						$('#addForm').bootstrapValidator();
	    				$('#addForm').data('bootstrapValidator').validate();
	    				if($('#addForm').data('bootstrapValidator').isValid()){
							updateReward(button, rewardid);
	    				}
					}else{
						$('#addForm').bootstrapValidator();
	    				$('#addForm').data('bootstrapValidator').validate();
	    				if($('#addForm').data('bootstrapValidator').isValid()){
							addReward();
	    				}
					 }
				});
				$(this).find(".btnClose").off("click").on("click",function() {
					$('#addForm').bootstrapValidator('resetForm', true);
				});
			});
			//		------------------------------------------------------------------------------------------------------------

			$("#deleteModal").on("show.bs.modal",function(event) {

						var button = $(event.relatedTarget); // select การกระทำของปุ่ม
						var rewardid = button.data("id"); //กดไอดีฝังในปุ่ม 

						$(this).find('.btnYes').off('click').on("click",
								function() {

									deleteById(button, rewardid);
								})
					});

			/* ---------------------------------------------------------------------------------------------------------------------------------------------- */

			function clearModal() {
				$("#typereward").val(""), 
				$("#year").val(""), 
				$("#reason").val("");

			}

					
			function addReward() {
// 				var id = getUrlParameter('Id');
				var id = $("#empId").val();
				$.ajax({
							//url : "${pageContext.request.contextPath}/reward/add",
							url : $getContextPath+"/reward/add",
							data : JSON.stringify({
								typereward : $("#typereward").val(),
								year : $("#year").val(),
								reason : $("#reason").val(),
								employeeId: id
							
							}),
							type : "POST",
							contentType : "application/json",
							dataType : "json",
							success : function(data) {
								
								$('#addForm').bootstrapValidator('resetForm', true);
								dt.fnClearTable();
								dt.fnAddData([
												data.typereward,
												data.year,
												data.reason,
												'<button type="button" style="margin-right :15px;" class="btn btn-warning" data-id="'+data.id+'" data-toggle="modal" data-target="#addModal" >'+$msgEdit+'</button>',
												'<button type="button" class="btn btn-danger" data-id="'+data.id+'" data-toggle="modal" data-target="#deleteModal">'+$msgDelete+'</button>' ]);

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
							} */
						});
			}

			
			
			function updateReward(button,rewardid) {
// 						var id = getUrlParameter('Id');
						var id = $("#empId").val();
						$.ajax({
							//url : "${pageContext.request.contextPath}/reward/update",
							url : $getContextPath+"/reward/update",
							data : JSON.stringify({ //แปลงจาก obj ของจาวาสคริปให้ไปเป็น string  ของเจสัน
								id : rewardid,
								typereward : $("#typereward").val(),
								year : $("#year").val(),
								reason : $("#reason").val(),

							}),
							type : "POST",
							contentType : "application/json",
							datatype : "json",
							success : function(data) {

								var tr = button.closest("tr"); // หาเเถวจากปุ่ม

										dt.fnUpdate(data.name, tr, 0),
										dt.fnUpdate(data.year, tr, 1),
										dt.fnUpdate(data.reason, tr, 2),
										'<button type="button"    class="btn btn-warning" data-id="'+data.id+'" data-toggle="modal" data-target="#addModal" >'+$msgEdit+'</button>',
										'<button type="button" class="btn btn-danger" data-id="'+data.id+'" data-toggle="modal" data-target="#deleteModal">'+$msgDelete+' </button>'

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
// 									alert("error");
							} */
						});

			}

			
			
			function getRewardById(rewardid) {
				$.ajax({
					//url : "${pageContext.request.contextPath}/reward/findById/"+rewardid,
					url : $getContextPath+"/reward/findById/"+rewardid,
					//data : "id=" + rewardid,
					type : "POST",
					success : function(data) {
						$("#typereward").val(data.typereward);
						$("#year").val(data.year);
						$("#reason").val(data.reason);
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

			
			
			function deleteById(button,rewardid) {
				$.ajax({
					//url : "${pageContext.request.contextPath}/reward/delete/"+rewardid,
					url : $getContextPath+"/reward/delete/"+rewardid,
					//data : "id=" + rewardid,
					type : "POST",
					success : function(data) {
						var tr = button.closest("tr"); // หาเเถวจากปุ่ม
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
			
			
			
			function listAll() {
// 						var id = getUrlParameter('Id');
						var id = $("#empId").val();
						$.ajax({
							//url : "${pageContext.request.contextPath}/reward/listAll"+id,
							url : $getContextPath+"/reward/listAll"+id,
							type : "POST",
							success : function(data) {
								dt.fnClearTable();
								for (var i = 0; i < data.length; i++) {
									dt.fnAddData([data[i].typereward,
												  data[i].year,
												  data[i].reason,
													'<button type="button"  class="btn btn-warning btn-sm active btn-center" data-id="' + data[i].id + '" data-target="#addModal" data-toggle="modal">'+$msgEdit+'</button>',
													'<button type="button" class="btn btn-danger btn-sm active btn-center" data-id="' + data[i].id + '" data-target="#deleteModal" data-toggle="modal">'+$msgDelete+'</button>' ]);
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
// 									alert("error");
							} */
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
			        ///alert("Param2 "+parseInt(sParameterName[1]));		    
			}     
		});			