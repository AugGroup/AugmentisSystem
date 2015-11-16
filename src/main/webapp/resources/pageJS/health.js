/**
 * @author apiva kimkatanom
 * @date   Aug 11, 2015
 */


var dt;  	

$(function(){
	
	
	
	var $congenitaldiv = $('#congenitaldiv');
	var $congenital2div = $('#congenital2div');
	var $congenital3div = $('#congenital3div');
	var $geneticDiseaseExplainDiv = $('#geneticDiseaseExplainDiv');
	var $geneticDiseaseExplainDiv2 = $('#geneticDiseaseExplainDiv2');
	var $geneticDiseaseExplainDiv3 = $('#geneticDiseaseExplainDiv3');
	
	
	
	//var $congenitalDisease = $('#congenitalDisease');
	var $congenitalDiseaseExplain  = $('#congenitalDiseaseExplain');
	var $congenitalDiseaseExplain2 = $('#congenitalDiseaseExplain2');
	var $congenitalDiseaseExplain3 = $('#congenitalDiseaseExplain3');
	
	var $congenitalDiseaseYes=$('#congenitalDiseaseYes');
	var $congenitalDiseaseNo=$('#congenitalDiseaseNo');
	
	
	//var $geneticDisease = $('#geneticDisease');
	var $geneticDiseaseExplain = $('#geneticDiseaseExplain');
	var $geneticDiseaseExplain2 = $('#geneticDiseaseExplain2');
	var $geneticDiseaseExplain3 = $('#geneticDiseaseExplain3');
	
	var $geneticDiseaseYes = $('#geneticDiseaseYes');
	var $geneticDiseaseNo = $('#geneticDiseaseNo');
	
	//var $takeMedicine = $("#takeMedicine");
	var $takeMedicineExplain = $("#takeMedicineExplain");
	var $takeMedicineDiv = $("#takeMedicineDiv");
	var $takeMedicineOk = $('#takeMedicineOk');
	
	var $takeMedicineYes=$("#takeMedicineYes");
	var $takeMedicineNo=$("#takeMedicineNo");
	
	
	//var $intolerance = $("#intolerance");
	var $intoleranceExplain = $("#intoleranceExplain");
	var $intoleranceDiv = $("#intoleranceDiv");
	var $intoOk = $('#intoOk');
	
	var $intoleranceYes=$('#intoleranceYes');
	var $intoleranceNo=$('#intoleranceNo');
	
	
	var $btnOkCongenital = $('#btnOkCongenital');
	var $geneticDiseaseBtnOk = $('#geneticDiseaseBtnOk');
	
	var $form = $('#formAddUpdate');
	
	
	 $form.bootstrapValidator({
		   
		   message: 'This value is not valid',
	        //container: 'tooltip',
	        feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {
	        	
	        	congenitalDisease: {
	                validators: {
	                    notEmpty: {
	                        message: $requiredCongenitalDisease
	                    }
	                }
	            },
	            congenitalDiseaseExplain: {
	                validators: {
	                    notEmpty: {
	                        message: $requiredCongenitalDiseaseExplain
	                    }
	                }
	            },
	            geneticDisease: {
	                validators: {
	                    notEmpty: {
	                        message: $requiredGeneticDisease 	
	                    }	                   	                  
	                }
	            },
	            geneticDiseaseExplain: {
	                validators: {
	                    notEmpty: {
	                        message:  $requiredGeneticDiseaseExplain	
	                    }	                  
	                }
	            },
	            takeMedicine: {
	                validators: {
	                    notEmpty: {
	                        message:  $requiredTakeMedicine	
	                    }	                  
	                }
	            },
	            takeMedicineExplain: {
	                validators: {
	                    notEmpty: {
	                        message:  $requiredTakeMedicineExplain	
	                    }	                  
	                }
	            },
	            intolerance: {
	                validators: {
	                    notEmpty: {
	                        message:  $requiredIntolerance	
	                    }	                  
	                }
	            },
	            intoleranceExplain: {
	                validators: {
	                    notEmpty: {
	                        message: $requiredIntoleranceExplain
	                    }	                  
	                }
	            },
	        }
	 
}); 
	
	
	
	
	event1();
	
	function event1(){

		/*Event of CongenitalDiseaseExplain*/
		
	
		if($congenitalDiseaseYes.is(":checked")==false&&$congenitalDiseaseNo.is(":checked")==false){
			
			$congenitalDiseaseExplain.val('');
			$congenitalDiseaseExplain2.val('');
			$congenitalDiseaseExplain2.prop("readonly",true);
			$congenitalDiseaseExplain3.val('');
			$congenitalDiseaseExplain3.prop("readonly",true);
			 
			$congenitaldiv.hide();
			$congenital2div.hide();
			$congenital3div.hide();
		}
		
		
		
		if($congenitalDiseaseYes.is(":checked")==true){
			//debugger;
			//alert('aaaaa');
			
			 $congenitalDiseaseYes.prop('checked', 'checked');
			 $congenitalDiseaseNo.prop('checked', false);
			 $congenitaldiv.show();
			 $congenital2div.show();
			 $congenital3div.show();
		}
		
		if($congenitalDiseaseNo.is(":checked")==true){
			
			 $congenitalDiseaseNo.prop('checked', 'checked');
			 $('#congenitalDiseaseYes').prop('checked', false);
			 $congenitaldiv.hide();
			 $congenital2div.hide();
			 $congenital3div.hide();
			 $congenitalDiseaseExplain.val('');
			 $congenitalDiseaseExplain2.val('');
			 $congenitalDiseaseExplain2.prop("readonly",true)
		     $congenitalDiseaseExplain3.val('');	
			 $congenitalDiseaseExplain3.prop("readonly",true)
			
		}
		
		
		
		$congenitalDiseaseYes.change(function () {
			
			 //debugger;
			 //alert('Yes');
			 $congenitalDiseaseYes.prop('checked', 'checked');
			 $congenitalDiseaseNo.prop('checked', false);
			 $congenitaldiv.show();
			 $congenital2div.show();
			 $congenital3div.show();
			
		});
		
		
		$congenitalDiseaseNo.change(function () {
				
			 //alert('No');
			 $congenitalDiseaseNo.prop('checked', 'checked');
			 $('#congenitalDiseaseYes').prop('checked', false);
			 $congenitaldiv.hide();
			 $congenital2div.hide();
			 $congenital3div.hide();
			 $congenitalDiseaseExplain.val('');
			 $congenitalDiseaseExplain2.val('');
			 $congenitalDiseaseExplain2.prop("readonly",true)
		     $congenitalDiseaseExplain3.val('');	
			 $congenitalDiseaseExplain3.prop("readonly",true)
			 
		});
		
		
		
		 
		  $($congenitalDiseaseExplain).keyup(function() {
			  
			  
			    $('#formAddUpdate').bootstrapValidator();
				$('#formAddUpdate').data('bootstrapValidator').resetForm();
							 
				 if($congenitalDiseaseExplain.val()!=null&&$congenitalDiseaseExplain.val()!==''){
					 
					 $congenitalDiseaseExplain2.prop("readonly",false);
					 
				 }else{
					 
		
					 $congenitalDiseaseExplain.val('');
					 $congenitalDiseaseExplain2.val('');
					 $congenitalDiseaseExplain2.prop("readonly",true);
					 $congenitalDiseaseExplain3.val('');
					 $congenitalDiseaseExplain3.prop("readonly",true);
					 
					 $congenitaldiv.hide();
					 $congenital2div.hide();
					 $congenital3div.hide();
					 
					 $('#congenitalDiseaseYes').prop('checked', false);
					 $('#congenitalDiseaseNo').prop('checked', false);
				 }
				 
				 
				  $('#formAddUpdate').bootstrapValidator();
				  $('#formAddUpdate').data('bootstrapValidator').validate();
				 
			});
			
			 
			 $($congenitalDiseaseExplain2).keyup(function() {
				 
				 
				 $('#formAddUpdate').bootstrapValidator();
				 $('#formAddUpdate').data('bootstrapValidator').resetForm();
				 
				 
				 if($congenitalDiseaseExplain2.val()!=null&&$congenitalDiseaseExplain2.val()!==''){
					
					 $congenitalDiseaseExplain3.prop("readonly",false);
				 }else{
					 $congenitalDiseaseExplain3.val('');
					 $congenitalDiseaseExplain3.prop("readonly",true);
				 }
				 
				 $('#formAddUpdate').bootstrapValidator();
				 $('#formAddUpdate').data('bootstrapValidator').validate();
			 });
			 
		 
		 
		 
		 
		 
		 
		 /*Event of GeneticDiseaseExplain*/
			 
			 
			 
			 
			 if($geneticDiseaseYes.is(":checked")==false&& $geneticDiseaseNo.is(":checked")==false){
					
				    $geneticDiseaseExplain.val('');
					$geneticDiseaseExplain2.val('');
					$geneticDiseaseExplain2.prop("readonly",true);
					$geneticDiseaseExplain3.val('');
					$geneticDiseaseExplain3.prop("readonly",true);
					 
					$geneticDiseaseExplainDiv.hide();
					$geneticDiseaseExplainDiv2.hide();
					$geneticDiseaseExplainDiv3.hide();
				}
				
				
				
				if($geneticDiseaseYes.is(":checked")==true){
					
					//debugger;					
					 $geneticDiseaseYes.prop('checked', 'checked');
					 $geneticDiseaseNo.prop('checked', false);
					 $geneticDiseaseExplainDiv.show();
					 $geneticDiseaseExplainDiv2.show();
					 $geneticDiseaseExplainDiv3.show();
				}
				
				if($geneticDiseaseNo.is(":checked")==true){
					
					 $geneticDiseaseNo.prop('checked', 'checked');
					 $geneticDiseaseYes.prop('checked', false);
					 $geneticDiseaseExplain.val('');
					 $geneticDiseaseExplain2.val('');
					 $geneticDiseaseExplain2.prop("readonly",true);
					 $geneticDiseaseExplain3.val('');
					 $geneticDiseaseExplain3.prop("readonly",true);
						 
					 $geneticDiseaseExplainDiv.hide();
					 $geneticDiseaseExplainDiv2.hide();
					 $geneticDiseaseExplainDiv3.hide();
					
				}
				
				
				
				$geneticDiseaseYes.change(function () {
					
					 //debugger;
					 $geneticDiseaseYes.prop('checked', 'checked');
					 $geneticDiseaseNo.prop('checked', false);
					 $geneticDiseaseExplainDiv.show();
					 $geneticDiseaseExplainDiv2.show();
					 $geneticDiseaseExplainDiv3.show();
					
				});
				
				
				$geneticDiseaseNo.change(function () {
						
					 //alert('No');
					 $geneticDiseaseNo.prop('checked', 'checked');
					 $geneticDiseaseYes.prop('checked', false);
					 $geneticDiseaseExplain.val('');
					 $geneticDiseaseExplain2.val('');
					 $geneticDiseaseExplain2.prop("readonly",true);
					 $geneticDiseaseExplain3.val('');
					 $geneticDiseaseExplain3.prop("readonly",true);
						 
					 $geneticDiseaseExplainDiv.hide();
					 $geneticDiseaseExplainDiv2.hide();
					 $geneticDiseaseExplainDiv3.hide();
					 
				});
			 
		
			 
			
			$($geneticDiseaseExplain).keyup(function() {
				
				 
			    $('#formAddUpdate').bootstrapValidator();
				$('#formAddUpdate').data('bootstrapValidator').resetForm();
				 
				 if($geneticDiseaseExplain.val()!=null&&$geneticDiseaseExplain.val()!==''){
					 
					 $geneticDiseaseExplain2.prop("readonly",false);
					 
				 }else{
					 
					 //debugger;
					 
					 $geneticDiseaseNo.prop('checked', false);
					 $geneticDiseaseYes.prop('checked', false);
					 $geneticDiseaseExplain.val('');
					 $geneticDiseaseExplain2.val('');
					 $geneticDiseaseExplain2.prop("readonly",true);
					 $geneticDiseaseExplain3.val('');
					 $geneticDiseaseExplain3.prop("readonly",true);
					 
					 $geneticDiseaseExplainDiv.hide();
					 $geneticDiseaseExplainDiv2.hide();
					 $geneticDiseaseExplainDiv3.hide();
				 }
				 
				 $('#formAddUpdate').bootstrapValidator();
				 $('#formAddUpdate').data('bootstrapValidator').validate();
				 
			});
			
			 
			 $($geneticDiseaseExplain2).keyup(function() {
				 
				 $('#formAddUpdate').bootstrapValidator();
				 $('#formAddUpdate').data('bootstrapValidator').resetForm();
				 
				 if($geneticDiseaseExplain2.val()!=null&&$geneticDiseaseExplain2.val()!==''){
					
					 $geneticDiseaseExplain3.prop("readonly",false);
				 }else{
					 $geneticDiseaseExplain3.val('');
					 $geneticDiseaseExplain3.prop("readonly",true);
				 }
				 
				 $('#formAddUpdate').bootstrapValidator();
				 $('#formAddUpdate').data('bootstrapValidator').validate();
			 });
			 
			
			
			
			
			
			
			
			
			
			
			
			/*Event of TakeMedicineExplain*/

			if($takeMedicineYes.is(":checked")==false||$takeMedicineNo.is(":checked")==false){
				
				$takeMedicineExplain.val('');
				$takeMedicineDiv.hide();

			}
			
			

			if($takeMedicineYes.is(":checked")==true){
				
				//debugger;					
				 $takeMedicineYes.prop('checked', 'checked');
				 $takeMedicineNo.prop('checked', false);
				 $takeMedicineDiv.show();
			}
			
			
			if($takeMedicineNo.is(":checked")==true){
				
				 $takeMedicineNo.prop('checked', 'checked');
				 $takeMedicineYes.prop('checked', false);
				 $takeMedicineExplain.val('');
				
				 $takeMedicineDiv.hide();	
			}
			
			
			
			$takeMedicineYes.change(function () {
				
				 //debugger;
				 $takeMedicineYes.prop('checked', 'checked');
				 $takeMedicineNo.prop('checked', false);
				 $takeMedicineDiv.show();
			});
			
			
			 $takeMedicineNo.change(function () {
					
				 //alert('No');
				 $takeMedicineNo.prop('checked', 'checked');
				 $takeMedicineYes.prop('checked', false);
				 $takeMedicineExplain.val('');

				 $takeMedicineDiv.hide();
		
			});

			 
			 
			$($takeMedicineExplain).keyup(function() {
				
				
				 $('#formAddUpdate').bootstrapValidator();
				 $('#formAddUpdate').data('bootstrapValidator').resetForm();
				 
				 if($takeMedicineExplain.val()!=null&&$takeMedicineExplain.val()!==''){
					 
					 $takeMedicineExplain.prop("readonly",false);
					 
				 }else{
					 
					 $takeMedicineYes.prop('checked', false);
					 $takeMedicineNo.prop('checked', false);
					 $takeMedicineExplain.val('');
					 $takeMedicineDiv.hide();
				 }				 
				 
				 
				 $('#formAddUpdate').bootstrapValidator();
				 $('#formAddUpdate').data('bootstrapValidator').validate();
			});			
		 
			
			 
			 
			
			
			 /*Event of IntoleranceExplain*/

				if($intoleranceYes.is(":checked")==false||$intoleranceNo.is(":checked")==false){
					
					$intoleranceExplain.val('');			
					$intoleranceDiv.hide();

				}
				
					
				if($intoleranceYes.is(":checked")==true){
					
					//debugger;					
					 $intoleranceYes.prop('checked', 'checked');
					 $intoleranceNo.prop('checked', false);
					 $intoleranceDiv.show();
				}
				
				
				if($intoleranceNo.is(":checked")==true){
					
					 $intoleranceNo.prop('checked', 'checked');
					 $intoleranceYes.prop('checked', false);
					 $intoleranceExplain.val('');
					
					 $intoleranceDiv.hide();	
				}
				
				
				$intoleranceYes.change(function () {
					
					 //debugger;
					 $intoleranceYes.prop('checked', 'checked');
					 $intoleranceNo.prop('checked', false);
					 $intoleranceDiv.show();
				});
				
				
				 $intoleranceNo.change(function () {
						
					 //alert('No');
					 $intoleranceNo.prop('checked', 'checked');
					 $intoleranceYes.prop('checked', false);
					 $intoleranceExplain.val('');
					
					 $intoleranceDiv.hide();
			
				});
			 
				 
				$($intoleranceExplain).keyup(function() {
					
					
						 $('#formAddUpdate').bootstrapValidator();
						 $('#formAddUpdate').data('bootstrapValidator').resetForm();
									 
						 if($intoleranceExplain.val()!=null&&$intoleranceExplain.val()!==''){
							 
							 $intoleranceExplain.prop("readonly",false);
							 
						 }else{
							 
							 $intolerance.val('');					 
							 $intoleranceExplain.val('');
							 $intoleranceDiv.hide();

						 }
						 
						 $('#formAddUpdate').bootstrapValidator();
						 $('#formAddUpdate').data('bootstrapValidator').validate();
				 });
					
		
		 
		}
	
	
	
	
	
	
	
	
	
	
	  var idHealth2;
	  var $idHealth = $('#idHealth');
	  
	  if($idHealth.val()===''||$idHealth.val()===''){
		  $('#deleteBtn').hide();	     
	  }
	  
	  
	  if($idHealth.val()!=null&&$idHealth.val()!==''){
		  $('#saveBtn').text($msgUpdate);
		
	  }
	  
	  
	  $(this).find("#saveBtn").off("click").on("click", function(){
		  
	      $("#createModal").on("show.bs.modal", function(event){
	    	  
	      $(this).find("#create").off("click").on("click", function(){
		
 	      $("#createModal").modal('hide');
		  
		  if($idHealth.val()==null||$idHealth.val()===''){
			  
			  $form.bootstrapValidator();
			  $('#formAddUpdate').data('bootstrapValidator').resetForm();
			  $form.data('bootstrapValidator').validate();
			  if($form.data('bootstrapValidator').isValid()){
				  addHealth(function(d) {
			          //processing the data
					 
			          console.log(d);
			          idHealth2 = d;
			          if(idHealth2!=null&&idHealth2!==''){
			        	  			        	  
				    	  doInitEdit(idHealth2);
				    	  $('#saveBtn').text($msgUpdate);
				    	  $('#deleteBtn').show();
				      }
			      });
			  }
			
		  }else if($idHealth.val()!=null&&$idHealth.val()!==''){
			  $('#saveBtn').text($msgUpdate);
	    	  $('#deleteBtn').show();
	    	  $form.bootstrapValidator();
			  $('#formAddUpdate').data('bootstrapValidator').resetForm();
			  $form.data('bootstrapValidator').validate();
			  if($form.data('bootstrapValidator').isValid()){
			  	doEdit($idHealth.val());	
			  }
		  }
	    });
	  });
  }); 
	   
	  
	  
	  $( "#renew" ).on( "click", function() {
		  if($idHealth.val()===''||$idHealth.val()===''){
			  
			  $('#formAddUpdate').bootstrapValidator();
			  $('#formAddUpdate').data('bootstrapValidator').resetForm();
		 	  clear();
		  }
		  if($idHealth.val()!=null&&$idHealth.val()!==''){
			  
			  $('#formAddUpdate').bootstrapValidator();
			  $('#formAddUpdate').data('bootstrapValidator').resetForm();
			  doFindData();
		  }
	  });


	  
	  
	  
	  function doFindData() {  
		  

		  
 	     var id = $("#empId").val();
	  	     $.ajax({  
	  	      type : "POST",   
	  	      url : $getContextPath+"/health/list/"+id,   
	  	      dataType : 'json', 
	  	      contentType :"application/json; charset=utf-8",
	  	     
	  	      success : function(data) {  	  	    	
	  	    
	  	    	
	  	    	  
	  	        for(var i=0;i<data.length;i++){
		  	        	
	  	        	//$congenitalDisease.val(data[i].congenitalDisease);
					$congenitalDiseaseExplain.val(data[i].congenitalDiseaseExplain);
					$congenitalDiseaseExplain2.val(data[i].congenitalDiseaseExplain2);
					$congenitalDiseaseExplain3.val(data[i].congenitalDiseaseExplain3);
					//$geneticDisease.val(data[i].geneticDisease);
					$geneticDiseaseExplain.val(data[i].geneticDiseaseExplain);
					$geneticDiseaseExplain2.val(data[i].geneticDiseaseExplain2);
					$geneticDiseaseExplain3.val(data[i].geneticDiseaseExplain3);
					//$takeMedicine.val(data[i].takeMedicine);
					$takeMedicineExplain.val(data[i].takeMedicineExplain);
					//$intolerance.val(data[i].intolerance);
					$intoleranceExplain.val(data[i].intoleranceExplain);
					
					
					
					if(data[i].congenitalDisease=='Yes'){
						
						//debugger;
						$congenitaldiv.show();
						$congenital2div.show();
						$congenital3div.show();
						$congenitalDiseaseYes.prop('checked', 'checked');
						$congenitalDiseaseNo.prop('checked', false);
						
						
						if(data[i].congenitalDiseaseExplain!=null&&data[i].congenitalDiseaseExplain!==''){
							
							 $congenitalDiseaseExplain2.prop("readonly",false);
						}
						
					    if(data[i].congenitalDiseaseExplain2!=null&&data[i].congenitalDiseaseExplain2!==''){
					    	 $congenitalDiseaseExplain3.prop("readonly",false);
					    }
					}else{
						
						$congenitaldiv.hide();
						$congenital2div.hide();
						$congenital3div.hide();
						
						$congenitalDiseaseNo.prop('checked', 'checked');
						$congenitalDiseaseYes.prop('checked', false);
						$congenitalDiseaseExplain.val('');
					    $congenitalDiseaseExplain2.val('');
					    $congenitalDiseaseExplain2.prop("readonly",true)
						$congenitalDiseaseExplain3.val('');	
					    $congenitalDiseaseExplain3.prop("readonly",true)
					}
					
					
					
					
					if(data[i].geneticDisease=='Yes'){
						
						//debugger;
						$geneticDiseaseExplainDiv.show();
						$geneticDiseaseExplainDiv2.show();
						$geneticDiseaseExplainDiv3.show();
						$geneticDiseaseYes.prop('checked', 'checked');
						$geneticDiseaseNo.prop('checked', false);
						
						
						if(data[i].geneticDiseaseExplain!=null&&data[i].geneticDiseaseExplain!==''){
							
							 $geneticDiseaseExplain2.prop("readonly",false);
						}
						
					    if(data[i].geneticDiseaseExplain2!=null&&data[i].geneticDiseaseExplain2!==''){
					    	 $geneticDiseaseExplain3.prop("readonly",false);
					    }
					}else{
						
						$geneticDiseaseExplainDiv.hide();
						$geneticDiseaseExplainDiv2.hide();
						$geneticDiseaseExplainDiv3.hide();
						
						$geneticDiseaseNo.prop('checked', 'checked');
						$geneticDiseaseYes.prop('checked', false);

						$geneticDiseaseExplain.val('');
						$geneticDiseaseExplain2.val('');
						$geneticDiseaseExplain2.prop("readonly",true)
						$geneticDiseaseExplain3.val('');	
						$geneticDiseaseExplain3.prop("readonly",true)
					}
					
					
					
					
					
					if(data[i].takeMedicine=='Yes'){
						
						//debugger;
						$takeMedicineDiv.show();						
						$takeMedicineYes.prop('checked', 'checked');
						$takeMedicineNo.prop('checked', false);
						
					}else{
						
						$takeMedicineDiv.hide();
						
						$takeMedicineNo.prop('checked', 'checked');
						$takeMedicineYes.prop('checked', false);

						$takeMedicineExplain.val('');
				
					}
					
					
					
					
					if(data[i].intolerance =='Yes'){
						
						//debugger;
						$intoleranceDiv.show();						
						$intoleranceYes.prop('checked', 'checked');
						$intoleranceNo.prop('checked', false);
						
					}else{
						
						$intoleranceDiv.hide();
						
						$intoleranceNo.prop('checked', 'checked');
						$intoleranceYes.prop('checked', false);

						$intoleranceExplain.val('');
				
					}
					
					
					

		  	     }
	  	        
	  	        
	  	          
	  	     }
	  	  }); 
	  	   
	    }
	  
	  
	  
	  
	  
	 
	 function addHealth(callback){
		 
		    var id = $("#empId").val();
		    var idHealth;
		    var congenitalDisease;
		    var geneticDisease;
		    var takeMedicine;
		    var intolerance;
		    
		    
		    if($congenitalDiseaseYes.is(':checked')==true){
		    	
		    	congenitalDisease="Yes";
		    	
		    }else if($congenitalDiseaseNo.is(':checked')==true){
		    	
		    	congenitalDisease="No";
		    	
		    }
		    
		    
		    if($geneticDiseaseYes.is(':checked')==true){
		    	
		    	geneticDisease='Yes';
		    }else if($geneticDiseaseNo.is(':checked')==true){
		    	
		    	geneticDisease='No';
		    }
		    
		    
		    if($takeMedicineYes.is(':checked')==true){		
		    	
		    	takeMedicine='Yes';
		    	
		    }else if($takeMedicineNo.is(':checked')==true){
		    	
		    	takeMedicine='No';
		    }
		    
		    
		    
		    
		    if($intoleranceYes.is(':checked')==true){		
		    	
		    	intolerance='Yes';
		    	
		    }else if($intoleranceNo.is(':checked')==true){
		    	
		    	intolerance='No';
		    }
		    
		    
		    
		    
	  	    $.ajax({  
	  	      type : "POST",   
	  	      url : $getContextPath+"/health/add",   
	  	      dataType : 'json', 
	  	      data : JSON.stringify(
	  	    		{"congenitalDisease":congenitalDisease,
	    			"congenitalDiseaseExplain" : $congenitalDiseaseExplain.val(),
  	    			"congenitalDiseaseExplain2": $congenitalDiseaseExplain2.val(),
  	    			"congenitalDiseaseExplain3":$congenitalDiseaseExplain3.val(),
  	    			"geneticDisease":geneticDisease,
  	    			"geneticDiseaseExplain":$geneticDiseaseExplain.val(),
  	    			"geneticDiseaseExplain2":$geneticDiseaseExplain2.val(),
  	    			"geneticDiseaseExplain3":$geneticDiseaseExplain3.val(),
  	    			"takeMedicine":takeMedicine,
  	    			"takeMedicineExplain":$takeMedicineExplain.val(),
  	    			"intolerance":intolerance,
  	    			"intoleranceExplain":$intoleranceExplain.val(),
  	    			"employeeId":id}
	  	    		),  
	  	      contentType :"application/json; charset=utf-8",
	  	     
	  	      success : function(data) { 
	  	    	  
	  	    	   $('#idHealth').val(data.id);			  	    	   
	  	    	   idHealth = data.id;
	  	    	   callback(idHealth);
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
	  	     }
	  	    }); 
	  	 
	  	return idHealth;
	 }
	
	
	
	 
	 
	
	 function doInitEdit(idUpdate){
		 
		 
		 $.ajax({  
	  	      type : "POST",   
	  	      url : $getContextPath+"/health/initedit",   
	  	      dataType : 'json', 
	  	      data : JSON.stringify({"id":idUpdate}),  
	  	      contentType :"application/json; charset=utf-8",
	  	     
	  	      success : function(data) {  
	  	    	  
	  	    	    //alert('bbb');
	
	  	    	    if(data.congenitalDisease=='Yes'){
	  	    	    	
	  	    	    	$congenitalDiseaseYes.prop('checked', 'checked');
	  	    	    	
	  	    	    }else if(data.congenitalDisease=='No'){
	  	    	    	
	  	    	    	$congenitalDiseaseNo.prop('checked', 'checked');
	  	    	    	
	  	    	    }
	  	    	    
	  	    	    
					$('#congenitalDiseaseExplain').val(data.congenitalDiseaseExplain);
					$('#congenitalDiseaseExplain2').val(data.congenitalDiseaseExplain2);
					$('#congenitalDiseaseExplain3').val(data.congenitalDiseaseExplain3);
					
					
					if(data.geneticDisease=='Yes'){
		  	    	    	
		  	    	    $geneticDiseaseYes.prop('checked', 'checked');
		  	    	    	
		  	    	}else if(data.geneticDisease=='No'){
		  	    	    	
		  	    	    $geneticDiseaseNo.prop('checked', 'checked');
		  	    	    	
		  	    	}
					
					
					$('#geneticDiseaseExplain').val(data.geneticDiseaseExplain);
					$('#geneticDiseaseExplain2').val(data.geneticDiseaseExplain2);
					$('#geneticDiseaseExplain3').val(data.geneticDiseaseExplain3);
					
					
					
					if(data.takeMedicine=='Yes'){
	  	    	    	
						$takeMedicineYes.prop('checked', 'checked');
		  	    	    	
		  	    	}else if(data.takeMedicine=='No'){
		  	    	    	
		  	    		$takeMedicineNo.prop('checked', 'checked');
		  	    	    	
		  	    	}
					
							
					$('#takeMedicineExplain').val(data.takeMedicineExplain);
					
					
					if(data.intolerance=='Yes'){
	  	    	    	
						$intoleranceYes.prop('checked', 'checked');
		  	    	    	
		  	    	}else if(data.intolerance=='No'){
		  	    	    	
		  	    		$intoleranceNo.prop('checked', 'checked');
		  	    	    	
		  	    	}
		
					$('#intoleranceExplain').val(data.intoleranceExplain);
					
					
	  	      }
	  	    }); 
	  	   
		 
	 }
	
	
	 
	  function doEdit(idUpdate){
		  
		   var idemp =  $("#empId").val();
		  
		  
		   var congenitalDisease;
		   var geneticDisease;
		   var takeMedicine;
		   var intolerance;
		    
		    
		    if($congenitalDiseaseYes.is(':checked')==true){
		    	
		    	congenitalDisease="Yes";
		    	
		    }else if($congenitalDiseaseNo.is(':checked')==true){
		    	
		    	congenitalDisease="No";
		    	
		    }
		    
		    
		    if($geneticDiseaseYes.is(':checked')==true){
		    	
		    	geneticDisease='Yes';
		    }else if($geneticDiseaseNo.is(':checked')==true){
		    	
		    	geneticDisease='No';
		    }
		    
		    
		    if($takeMedicineYes.is(':checked')==true){		
		    	
		    	takeMedicine='Yes';
		    	
		    }else if($takeMedicineNo.is(':checked')==true){
		    	
		    	takeMedicine='No';
		    }
		    
		    
		    
		    
		    if($intoleranceYes.is(':checked')==true){		
		    	
		    	intolerance='Yes';
		    	
		    }else if($intoleranceNo.is(':checked')==true){
		    	
		    	intolerance='No';
		    }
		    
		 
		  
	  	    $.ajax({  
	  	      type : "POST",   
	  	      url : $getContextPath+"/health/edit",   
	  	      dataType : 'json', 
	  	      data :  JSON.stringify(
		  	    		{	"id":idUpdate,
		  	    			"congenitalDisease":congenitalDisease,
			    			"congenitalDiseaseExplain" : $congenitalDiseaseExplain.val(),
		  	    			"congenitalDiseaseExplain2": $congenitalDiseaseExplain2.val(),
		  	    			"congenitalDiseaseExplain3":$congenitalDiseaseExplain3.val(),
		  	    			"geneticDisease":geneticDisease,
		  	    			"geneticDiseaseExplain":$geneticDiseaseExplain.val(),
		  	    			"geneticDiseaseExplain2":$geneticDiseaseExplain2.val(),
		  	    			"geneticDiseaseExplain3":$geneticDiseaseExplain3.val(),
		  	    			"takeMedicine":takeMedicine,
		  	    			"takeMedicineExplain":$takeMedicineExplain.val(),
		  	    			"intolerance":intolerance,
		  	    			"intoleranceExplain":$intoleranceExplain.val(),
		  	    			"employeeId":idemp}
			  	    		),  
	  	      contentType :"application/json; charset=utf-8",
	  	     
	  	      success : function(data) {  
	  	    	
	  	    	/* $("#createModal").modal('hide'); */
	  	    	doInitEdit($('#idHealth').val());
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
		 			
					
 					var idDelete = $('#idHealth').val();
 					//alert('iddel: '+idDelete)
		 			$(this).find("#delete").off("click").on("click", function(){
		 			
		 			
			     			$.ajax({  
				  		  	      type : "POST",   
				  		  	      url : $getContextPath+"/health/delete",   
				  		  	      dataType : 'json', 
				  		  	      data : JSON.stringify({"id":idDelete}),  
				  		  	      contentType :"application/json; charset=utf-8",
			  		  	     
				  		  	      success : function(data) {  
				  		    		
				  		  	    	 if(data=='successs'){
				  		  	    		 $("#deleteModal").modal('hide');
				  		  	    		 $('#deleteBtn').hide();
				  				    	 $('#saveBtn').text($msgSave);
				  				    	 clear();
					  	    		     $("#idHealth").val('');
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
				  		  	    	 }	  	      
				  		  	    	 
				  		  	     }
			  		  	    }); 
			 
			    });
		 
	 });
	
	
	
	function clear(){
		
		
		 	 $congenitalDiseaseYes.prop('checked', false);
		 	 $congenitalDiseaseNo.prop('checked', false);
		 	 $geneticDiseaseYes.prop('checked', false);
			 $geneticDiseaseNo.prop('checked', false);
			 $takeMedicineYes.prop('checked', false);
			 $takeMedicineNo.prop('checked', false);
			 $intoleranceNo.prop('checked', false);
			 $intoleranceYes.prop('checked', false);
			 
			 $('#congenitalDiseaseExplain').val('');
		     $('#congenitalDiseaseExplain2').val('');
			 $('#congenitalDiseaseExplain3').val('');	
			 
			 //read only congenitalDisease
			 $("#congenitalDisease").prop('readonly','readonly');
			 $('#congenitalDiseaseExplain2').prop('readonly','readonly');
			 $('#congenitalDiseaseExplain3').prop('readonly','readonly');	
			 
		 	 $('#geneticDiseaseExplain').val('');
			 $('#geneticDiseaseExplain2').val('');
			 $('#geneticDiseaseExplain3').val('');	
			 
			 //read only geneticDisease
			 $("#geneticDisease").prop('readonly','readonly');
			 $('#geneticDiseaseExplain2').prop('readonly','readonly');
			 $('#geneticDiseaseExplain3').prop('readonly','readonly');
			 
			 
			 $('#takeMedicine').val('');
		     $('#takeMedicineExplain').val('');
		     
			 //read only takeMedicine
		     $("#takeMedicine").prop('readonly','readonly');
		     
		     $('#intolerance').val('');
		     $('#intoleranceExplain').val('');
		     
		     //read only intolerance
			 $("#intolerance").prop('readonly','readonly');
			 
			  $congenitaldiv.hide();
			  $congenital2div.hide();
			  $congenital3div.hide();
			  $geneticDiseaseExplainDiv.hide();
			  $geneticDiseaseExplainDiv2.hide();
			  $geneticDiseaseExplainDiv3.hide();
			  $takeMedicineDiv.hide();
			  $intoleranceDiv.hide();

	}
	 
	
});
