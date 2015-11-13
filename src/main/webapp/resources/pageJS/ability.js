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
	
	$("div.toolbar").html('<b><button type="button" id="addBtnAbi" class="btn btn-warning" data-toggle="modal" data-target="#addModal">'+$msgNewRecord+'</button> </b>');
	/* $("#addBtnAbi").on("click",function(){clearModal();});
	 */

		$("#btnSave").on("click",function(){
			
			$('#addForm').bootstrapValidator();
			$('#addForm').data('bootstrapValidator').resetForm();


		});
	 
	 
	 

	
	$('#addForm').bootstrapValidator({
		
		  message: 'This value is not valid',
	        feedbackIcons: {
	        	 valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {
	        	masspecialty: {
	                validators: {
	                    notEmpty: {
	                        message: $validateabilitymasspecialty
	                    },
		        callback: {
	                message: $msgAbility,
	                callback: function(value, validator) {
	                	var data = dt.fnGetData();
	                	var count = 0;
	                	var masSpec11 = $("#masspecialty option:selected").text();
	                	var dataMas=null;
	                	for(var i=0;i<data.length;i++){
	                		
	                		if(masSpec11==data[i][0]){
	                				
	                			count = count+1;
	                		
	                		}
		                }
	                	
	                	if(count==0){
	                		dataMas =  $("#masspecialty").val();
	                	}else{
	                		dataMas = 0;
	                	}
	                     return value==dataMas;
	                   
	                  }
	                	
	              
		            },
	            }
		          
	        }
	       
	      }
	        	
	});
	
	
	
	dt = $('#tbResult').dataTable();
	listAll();
	/* --- addProduct,updateProduct --- */
	
	
	
	$("#addModal").on("show.bs.modal",function(event) {
		
		//clearModal();
		
		var button = $(event.relatedTarget) //Button that triggered the model เพื่อดูว่า evet ของ ปุ่มไหน
		var abilityid = button.data("id") //Extract info from data-* attribute
		 
		if(abilityid != null){
			getId(abilityid);
		}  
		
		$(this).find(".btnSave").off("click").on("click",function() {
			 if(abilityid != null){
				/*  alert("be up"); */
				// var masSpec1 = $("#masspecialty option:selected").text();
					//var count1 = onlyAbility(masSpec1);
					//  if(count1==0){
				updateAbility(button,abilityid);
					 // }else{
						//  alert("not repeat");
					  //}
			}else{ 
				$('#addForm').bootstrapValidator();
				$('#addForm').data('bootstrapValidator').validate();
				if($('#addForm').data('bootstrapValidator').isValid()){
					//var masSpec = $("#masspecialty option:selected").text();
					//var count = onlyAbility(masSpec);
					 // if(count==0){
						addAbility();
					 // }else{
						 // alert("not repeat");
						//  alert($msgAbility);
					  //}
				}
				
				
			  } 
			
		});
		
		
		
		  $('#addModal').on("hide.bs.modal",function(event){
			   
			   $('#addForm')[0].reset();
		       $('#addForm').bootstrapValidator();
			   $('#addForm').data('bootstrapValidator').resetForm();

		  
		   });
		
		
		$(this).find(".btnClose").off("click").on("click",function() {
			$('#addForm').bootstrapValidator('resetForm', true);
		});
		
		
	});
	
	/* --- DeleteName --- */
	$("#deleteModal").on("show.bs.modal",function(event) {
		
		var button = $(event.relatedTarget) //Button that triggered the model เพื่อดูว่า evet ของ ปุ่มไหน
		var abilityid = button.data("id") //Extract info from data-* attribute
		
		$(this).find(".btnYes").off("click").on("click",function() {
			deleteAbility(button,abilityid);
		});
		
	});
	
	
	
	/* ---------------------------------------------------------------------------------------------------------------------------------------------- */
	
	
	function onlyAbility(masSpecility){
		
		var data1=dt.fnGetData();
		var count=0;
		for(var i=0;i<data1.length;i++){
		/*alert("data: "+data1[i][0]);*/
			
			if(masSpecility==data1[i][0]){
				count+=1;
			}
		
		}
		
		return count;
		
	}
	
	
	function addAbility(){
		
		
		
		if($('#rank1:checked').val()!=null){
  			
			rank = $('#rank1:checked').val();
  			
  		}else if($('#rank2:checked').val()!=null){
  			
  			rank = $('#rank2:checked').val();
  			
  		}else if($('#rank3:checked').val()!=null){
  			
  			rank = $('#rank3:checked').val();
  			
  		}else if($('#rank4:checked').val()!=null){
  			
  			rank = $('#rank4:checked').val();
  			
  		}else if($('#rank5:checked').val()!=null){
  			
  			rank = $('#rank5:checked').val();
  			
  		}else if($('#rank6:checked').val()!=null){
  			
  			rank = $('#rank6:checked').val();
  			
  		}else if($('#rank7:checked').val()!=null){
  			
  			rank = $('#rank7:checked').val();
  			
  		}else if($('#rank8:checked').val()!=null){
  			
  			rank = $('#rank8:checked').val();
  			
  		}else if($('#rank9:checked').val()!=null){
  			
  			rank = $('#rank9:checked').val();
  			
  		}else if($('#rank10:checked').val()!=null){
  			
  			rank = $('#rank10:checked').val();
  			
  		}
		
		
		
		
		var id = $("#empId").val();
		
		$.ajax({
			url : $getContextPath+"/ability/add",
			data : JSON.stringify({
				masspecialtyId : $("#masspecialty").val(), 
				masspecialty : $("#masspecialty option:selected").text(),
				rank : rank,
				applicantId :id
			}),
			type : "POST",
			contentType : "application/json",
			dataType: "json",
			success : function(data) {
				
				

				$('#addForm').bootstrapValidator('resetForm', true);
				
				
			//alert(JSON.stringify(data));
					
			
				/*  dt.fnClearTable();
				
				dt.fnAddData([
				
					data.masspecialty,
					data.rank, */
					
					'<button type="button" class="btn btn-warning" data-id="'+data.id+'" data-toggle="modal" style="margin-right :15px;" data-target="#addModal" >'+$msgEdit+'</button>',
					'<button type="button" class="btn btn-danger" data-id="'+data.id+'" data-toggle="modal" data-target="#deleteModal">'+$msgDelete+'</button>'
			/* 	]); */
				
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
				//alert("ERROR");
				$(function(){ new PNotify({
				    title: 'Error!',
				    type: 'error',
					animation: {
						effect_in: 'show',
						effect_out: 'slide'
					}
					});
				});
// 				$('#addForm').bootstrapValidator('validate');
			} */
		});
	}
	
function getId(abilityid){
		

		
	
		
		$.ajax({
			
			url : $getContextPath+"/ability/findById/"+ abilityid,
			//data : "id=" + abilityid,
			type : "POST",
			success : function(data) {
				//alert(JSON.stringify(data));
				
				 $("#masspecialty").val(data.masspecialtyId);
				/* rank.val(data.rank); */
				 applicantId: data.applicantId;
				
				
				if(data.rank == "1"){
		  			$('#rank1').prop('checked', 'checked');
		  			
		  		}else if(data.rank == "2"){
		  			
		  			$('#rank2').prop('checked','checked');
		  			
		  		}else if(data.rank == "3"){
		  			
		  			$('#rank3').prop('checked','checked');
		  			
		  		}else if(data.rank == "4"){
		  			
		  			$('#rank4').prop('checked','checked');
		  			
		  		}else if(data.rank == "5"){
		  			
		  			$('#rank5').prop('checked','checked');
		  			
		  		}else if(data.rank == "6"){
		  			
		  			$('#rank6').prop('checked','checked');
		  			
		  		}else if(data.rank == "7"){
		  			
		  			$('#rank7').prop('checked','checked');
		  			
		  		}else if(data.rank == "8"){
		  			
		  			$('#rank8').prop('checked','checked');
		  			
		  		}else if(data.rank == "9"){
		  			
		  			$('#rank9').prop('checked','checked');
		  			
		  		}else if(data.rank == "10"){
		  			
		  			$('#rank10').prop('checked','checked');
		  			
		  		}
		  		
				
				
				
			}/* ,
			error : function(data, textStatus, jqXML) {
				{
// 					alert("error");
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
				;
			} */
		});
	}
	
function updateAbility(button,abilityid) {
	
	if($('#rank1:checked').val()!=null){
			
		rank = $('#rank1:checked').val();
			
		}else if($('#rank2:checked').val()!=null){
			
			rank = $('#rank2:checked').val();
			
		}else if($('#rank3:checked').val()!=null){
			
			rank = $('#rank3:checked').val();
			
		}else if($('#rank4:checked').val()!=null){
			
			rank = $('#rank4:checked').val();
			
		}else if($('#rank5:checked').val()!=null){
			
			rank = $('#rank5:checked').val();
			
		}else if($('#rank6:checked').val()!=null){
			
			rank = $('#rank6:checked').val();
			
		}else if($('#rank7:checked').val()!=null){
			
			rank = $('#rank7:checked').val();
			
		}else if($('#rank8:checked').val()!=null){
			
			rank = $('#rank8:checked').val();
			
		}else if($('#rank9:checked').val()!=null){
			
			rank = $('#rank9:checked').val();
			
		}else if($('#rank10:checked').val()!=null){
			
			rank = $('#rank10:checked').val();
			
		}
		
// 	var id = getUrlParameter('Id');
	var id = $("#empId").val();
	$.ajax({
		url : $getContextPath+"/ability/update",
		data : JSON.stringify({
			id: abilityid,
			masspecialtyId : $("#masspecialty").val(),
			masspecialty : $("#masspecialty option:selected").text(),
			rank : rank,
			//employee : {id:2},
			applicantId: id
		}),
		type : "POST",
		contentType : "application/json",
		dataType : "json",
		success : function(data) {
			//alert(abilityid);
			//alert(JSON.stringify(data));
			$('#addForm').bootstrapValidator('resetForm', true);

			/* var tr = button.closest("tr");
			
			dt.fnUpdate(data.masspecialty.name, tr, 0);
			dt.fnUpdate(data.rank, tr, 1 );
			 */
			//alert(data.masspecialty.name);
			
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
// 			alert("ERROR");

		} */
	});
}
	
function deleteAbility(button,abilityid) {
	
	$.ajax({
		url : $getContextPath+"/ability/delete/"+abilityid,
		//data :"id=" + abilityid,
		type : "POST",
		success : function(data) {
			//alert(JSON.stringify(data));
			
			/* var tr = button.closest("tr");
			
			dt.fnDeleteRow( tr ); */
			
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
// 			alert("ERROR");
		} */
	
		});
}
function listAll(){
	//var id=2;
// 	var id = getUrlParameter('Id');
	//alert("id >>>>"+id);	
	
	var id = $("#empId").val();
	$.ajax({
			url : $getContextPath+"/ability/listAll/"+id,
			type : "POST",
			success : function(data) {
				dt.fnClearTable();
			for (var i=0;i< data.length; i++) {
				dt.fnAddData([data[i].masspecialty,
				              data[i].rank,
				    '<button type="button" class="btn btn-warning btn-center btn-center" data-id="'+data[i].id+'" data-toggle="modal" data-target="#addModal" >'+$msgEdit+'</button>',
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
// 				alert("ERROR");
			} */
		}); 
	}
	
	
 function clearModal(){
		
		$("#masspecialty").val(""),
		$("#rank1").prop('checked','checked');
	} 
	
	
 function getUrlParameter(sParam)
{
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
	
	
});