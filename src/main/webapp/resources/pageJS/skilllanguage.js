/**
 * @author apiva kimkatanom
 * @date   Aug 9, 2015
 */


var dt;
    
	$(document).ready(function(){
		
		
		
		 $('#tableResult').dataTable({ 
				"bLengthChange": false,
				"iDisplayLength": 10,
				"pagingType": "simple_numbers",
				"ordering": false,
				//"info": false,
				"dom": '<"toolbar">frtip'
			});
			
		 $("div.toolbar").html('<b><button type="button"  class="btn btn-warning" data-toggle="modal" data-target="#addModal">'+$msgNewRecord+'</button> </b>');
			

		$("#saveBtn").off("click").on("click",function(){
			
			$('#formAddUpdate').bootstrapValidator();
			$('#formAddUpdate').data('bootstrapValidator').resetForm();


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
		        
		        	 masSkillLanguage: {
		                validators: {
		                    notEmpty: {
		                        message: $requiredMasSkillLanguage
		                    }
		                }
		            },
		            nameLanguage: {
		                validators: {
		                    notEmpty: {
		                        message: $requiredMasSkillLanguage
		                    },
		                    callback: {
		                        message: $dupicateLanguage,
		                        callback: function(value, validator) {
		                        	var data = dt.fnGetData();
		                        	var count = 0;
		                        	var nameLang = null;
		                        	for(var i=0;i<data.length;i++){
		                        		
		                        		if($("#nameLanguage").val()==data[i][0]){
		                        				
		                        			count = count+1;
		                        		
		                        		}
		                        	}
		                        	
		                        	
		                        	if(count==0){
		                        		nameLang = $("#nameLanguage").val();
		                        	}else{
		                        		nameLang = 0;	                        				                        		
		                        	}
		                        
		                            return value == nameLang;
		                        }
		                    },
		                
		                }
		            },
		        }
		 
    });
		 
		 
		 
		 
	      $("#nameLanguage").prop('readonly','readonly');
		
					
		  $('#masSkillLanguage').change(function() {
			  
			  $('#formAddUpdate').bootstrapValidator();
			  $('#formAddUpdate').data('bootstrapValidator').resetForm();
			 
			  
			  if($("#masSkillLanguage option:selected").text()=='Other'){
				  
				  //	alert('aaaa');
	
					$("#nameLanguage").prop('readonly',false);
				    $('#nameLanguage').val('');
		
			   }
			  
			  if($("#masSkillLanguage option:selected").text()=='English'){
				  
				  //	alert('aaaa');
	
					$("#nameLanguage").prop('readonly',true);
				    $('#nameLanguage').val($("#masSkillLanguage option:selected").text());
		
			   }
			  
			  if($("#masSkillLanguage option:selected").text()=='Thai'){
				  
				  //	alert('aaaa');
	
					$("#nameLanguage").prop('readonly',true);
				    $('#nameLanguage').val($("#masSkillLanguage option:selected").text());
		
			   }
			  
			  
			  $('#formAddUpdate').bootstrapValidator();
			  $('#formAddUpdate').data('bootstrapValidator').validate();

					
			});
			
			
			
		
		 dt=$('#tableResult').dataTable();
		 doFindData();
		 
		 
		   function doFindData() {  
		   	   
			  	  var id = $("#empId").val();
			  	  var applicantId = $("#appId").val();
			  	  
			  	//  alert("appId: "+applicantId);
		  	      
			  	  $.ajax({  
		  	      type : "POST",   
		  	      url : $getContextPath+"/skilllanguage/list/"+applicantId,   
		  	      dataType : 'json', 
		  	      contentType :"application/json; charset=utf-8",
		  	     
		  	      success : function(data) {  
		    		
		  	      
		  	        dt.fnClearTable();
		  	    	
		  	        for(var i=0;i<data.length;i++){
		  	        	
		  	        	  
		  	        	   //alert("id: "+data[i].id);
		  	        	
	
		  	        	   dt.fnAddData([  
		  	        	                   data[i].nameLanguage,
					  			           data[i].speaking,
					  			           data[i].writing,
					  			           data[i].reading,
					  			           data[i].understanding,
					  			        
					  			          '<button type="button" class="btn btn-warning btn-center" data-idupdate="'+data[i].id+'" data-target="#addModal" data-toggle="modal">'+$msgEdit+'</button>',
					    				  '<button type="button" class="btn btn-danger btn-sm active btn-center" data-iddelete="' + data[i].id+ '" data-target="#deleteModal" data-toggle="modal">'+$msgDelete+'</button>'
					    					
					  			           ]); 			  		
			  	    	 }
		  	      $(".btn-center").closest("td").addClass("text-center");	  	        
		  	     }
		  	    }); 
		  	   
		    }
	
		   
		   
		   $("#addModal").on("show.bs.modal", function(event){
		    	  
	    	    clearModal();
	    	    var button = $(event.relatedTarget);
	    		var idUpdate = button.data("idupdate"); 
	    		
	    	
	    		if(idUpdate != null){
	    		
	    			
	    			doInitEditDataPost(idUpdate);
	    			
				}
	     		
	    		$(this).find("#saveBtn").off("click").on("click", function()
	    		{
	    			if(idUpdate != null){
	    				$('#formAddUpdate').bootstrapValidator();
	    				$('#formAddUpdate').data('bootstrapValidator').validate();
	    				if($('#formAddUpdate').data('bootstrapValidator').isValid()){
	    					 doEditDataPost(idUpdate);
	    				}
	    			}
	    			else {
	    				$('#formAddUpdate').bootstrapValidator();
	    				$('#formAddUpdate').data('bootstrapValidator').validate();
	    				if($('#formAddUpdate').data('bootstrapValidator').isValid()){
	    					
	    				//	alert('aaa');
	    					addSkilllanguage();
	    				}
	    			}
	    		});
	    	  
	      });
	
		
			
		   
		   $('#addModal').on("hide.bs.modal",function(event){
			   
			   $('#formAddUpdate')[0].reset();
		       //$('#formAddUpdate').bootstrapValidator('resetForm', true);
			   $('#formAddUpdate').bootstrapValidator();
			   $('#formAddUpdate').data('bootstrapValidator').resetForm();
			   $('#error').text('');
		  
		   });
		   
		   
		   
		   
		   function clearModal(){
			   
			   $("#fairSpeaking").prop('checked', 'checked');
			   $('#fairWriting').prop('checked','checked');
			   $('#fairReading').prop('checked','checked');
			   $('#fairUnderstanding').prop('checked','checked');
			   $('#masSkillLanguage').val("");
		 
		   }
		   
		   
		   
		   
		   function addSkilllanguage(){
			   		
			   
			  		var masSkillLanguageId = $('#masSkillLanguage').val();
			  		var speaking;
			  		var writing;
			  		var reading;
			  		var understanding;
			  		var masSkillLanguageName= $("#masSkillLanguage option:selected").text();
			  		var nameLanguage=$("#nameLanguage").val();
			  		//alert("nameee: "+nameLanguage);
			  		
			  		
			  		if($('#excSpeaking:checked').val()!=null){
			  			
			  			speaking = $('#excSpeaking:checked').val();
			  			
			  		}else if($('#goodSpeaking:checked').val()!=null){
			  			
			  			speaking = $('#goodSpeaking:checked').val();
			  			
			  		}else if($('#fairSpeaking:checked').val()!=null){
			  			
			  			speaking = $('#fairSpeaking:checked').val();
			  			
			  		}
			  		
			  		
			  		
			  		
					if($('#excWriting:checked').val()!=null){
			  			
						writing = $('#excWriting:checked').val();
			  			
			  		}else if($('#goodWriting:checked').val()!=null){
			  			
			  			writing = $('#goodWriting:checked').val();
			  			
			  		}else if($('#fairWriting:checked').val()!=null){
			  			
			  			writing = $('#fairWriting:checked').val();
			  			
			  		}
			  	
			  		

					
					
					if($('#excReading:checked').val()!=null){
			  			
						reading = $('#excReading:checked').val();
			  			
			  		}else if($('#goodReading:checked').val()!=null){
			  			
			  			reading = $('#goodReading:checked').val();
			  			
			  		}else if($('#fairReading:checked').val()!=null){
			  			
			  			reading = $('#fairReading:checked').val();
			  			
			  		}
					
					
					
					
					if($('#excUnderstanding:checked').val()!=null){
			  			
						understanding = $('#excUnderstanding:checked').val();
			  			
			  		}else if($('#goodUnderstanding:checked').val()!=null){
			  			
			  			understanding = $('#goodUnderstanding:checked').val();
			  			
			  		}else if($('#fairUnderstanding:checked').val()!=null){
			  			
			  			understanding = $('#fairUnderstanding:checked').val();
			  			
			  		}
			  		
			  		
			  			  	    
			 			  	     

					var id = $("#empId").val();
					
					var idApp=$("#appId").val();
								 
			  	    var language2="nameLanguage="+nameLanguage+"&speaking="+speaking+"&reading="+reading+"&understanding="+understanding+"&writing="+writing+"&employeeId="+id+"&applicantId="+idApp;
	                
			  	    $.ajax({  
			  	      type : "POST",   
			  	      url : $getContextPath+"/skilllanguage/add",   
			  	      data: language2,			  	     
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
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   function doInitEditDataPost(idUpdate) {  
		   	   
			     		  	   
		  	    var language = "id="+idUpdate;
		  	  //  alert("id: "+idUpdate);
		  	    
		  	   
		  	     $.ajax({  
		  	      type : "POST",   
		  	      url : $getContextPath+"/skilllanguage/initedit",   		  	    
		  	      data : language,  
		  	     
		  	      success : function(data) {  
		  	    	  
		  	    	  
		  	    	  
		  	    	if(data.nameLanguage=='English'||data.nameLanguage=='Thai'){
		  	    		$('#masSkillLanguage').val(data.nameLanguage);
		  	    	}else{
		  	    		$('#masSkillLanguage').val('Other');
		  	    		$("#nameLanguage").prop('readonly',false);
		  	    	}
		  	        
		  	        $('#nameLanguage').val(data.nameLanguage);
		  	        
		  	        $('#nameLang').val(data.nameLanguage);
		    	
			  		
			  		if(data.speaking == "Excellent"){
			  			
			  			$('#excSpeaking').prop('checked', 'checked');
			  			
			  		}else if(data.speaking == "Good"){
			  			
			  			$('#goodSpeaking').prop('checked','checked');
			  			
			  		}else if(data.speaking == "Fair"){
			  			
			  			
			  			$('#fairSpeaking').prop('checked','checked');
			  			
			  		}
			  		
			  		
			  		
			  		
					if(data.writing == "Excellent"){
			  			
						$('#excWriting').prop('checked','checked');
			  			
			  		}else if(data.writing == "Good"){
			  			
			  		    $('#goodWriting').prop('checked','checked');
			  			
			  		}else if(data.writing == "Fair"){
			  			
			  		    $('#fairWriting').prop('checked','checked');
			  			
			  		}
			  	
			  		

					
					
					if(data.reading == "Excellent"){
			  			
						$('#excReading').prop('checked','checked');
			  			
			  		}else if(data.reading == "Good"){
			  			
			  			$('#goodReading').prop('checked','checked');
			  			
			  		}else if(data.reading == "Fair"){
			  			
			  			$('#fairReading').prop('checked','checked');
			  			
			  		}
					
					
					
					
					if(data.understanding == "Excellent"){
			  			
						$('#excUnderstanding').prop('checked','checked');
			  			
			  		}else if(data.understanding == "Good"){
			  			
			  			$('#goodUnderstanding').prop('checked','checked');
			  			
			  		}else if(data.understanding == "Fair"){
			  			
			  			$('#fairUnderstanding').prop('checked','checked');
			  			
			  		}
			  		
			  		
			  	
					//$('#masSkillLanguage').val(data.masSkillLanguageId);
		  	    	 
		  	     } 
		  	    }); 
		  	   
		    }
		   
		   
		   
		   
		   
		   
		   
		   
		   function doEditDataPost(idUpdate) {  
		   	   
 		  	   

		  	    var speaking;
		  	    var reading;
		  	    var writing;
		  	    var understanding;
				var masSkillLanguage;
				var languageName;
				
				
				
		  		if($('#excSpeaking').is(':checked')){
		  			
		  			speaking = $('#excSpeaking').val();
		  			
		  		}else if($('#goodSpeaking').is(':checked')){
		  			
		  			speaking = $('#goodSpeaking').val();

		  		}else if($('#fairSpeaking').is(':checked')){
		  			
		  			speaking = $('#fairSpeaking').val();
		  			
		  		}
		  		
		  		
		  		
		  		
				if($('#excWriting').is(':checked')){
		  			
					writing = $('#excWriting').val();
		  			
		  		}else if( $('#goodWriting').is(':checked')){
		  			
		  			writing = $('#goodWriting').val();
		  			
		  		}else if($('#fairWriting').is(':checked')){
		  			
		  			writing = $('#fairWriting').val();
		  			
		  		}
		  	
				
				//alert("writing: "+writing)
		  		

				
				
				if($('#excReading').is(':checked')){
					
					reading = $('#excReading').val();
		  			
		  		}else if($('#goodReading').is(':checked')){
		  			
		  			reading = $('#goodReading').val();
		  			
		  		}else if($('#fairReading').is(':checked')){
		  			
		  			reading = $('#fairReading').val();		  			
		  		}
				
				
				
				
				if($('#excUnderstanding').is(':checked')){
				
					understanding = $('#excUnderstanding').val();	
		  			
		  		}else if($('#goodUnderstanding').is(':checked')){
		  			
		  			understanding = $('#goodUnderstanding').val();	
		  			
		  		}else if($('#fairUnderstanding').is(':checked')){
		  			
		  			understanding = $('#fairUnderstanding').val();	
		  		}
		  		
		  		
				
				
				languageName=$("#nameLanguage").val();
				
				
				var masSkillLanguageName= $("#masSkillLanguage option:selected").text();
		  	  
				var id = $("#empId").val();
				
                var language2 =  "id="+idUpdate+"&nameLanguage="+languageName+"&speaking="+speaking+"&reading="+reading+"&understanding="+understanding+"&writing="+writing+"&employeeId="+id;
		  	    
		  	    
		  	   
		  	     $.ajax({  
		  	      type : "POST",   
		  	      url : $getContextPath+"/skilllanguage/edit",   		  	    
		  	      data : language2,  
		  	     
		  	      success : function(data) {  
		    		
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
		    	  
	    	    clearModal();
	    	    var button = $(event.relatedTarget);
	    		var idDelete = button.data("iddelete"); 
	    		
	
	    		$(this).find("#delete").off("click").on("click", function()
	    		{
	    			
	    				 doDeleteData(idDelete);
	    			
	    		});
	    	  
	      });
		   
		   
		   
		   
		   
		   
		   
		   function doDeleteData(idDelete) {  
		   	   
 		  	   

	  	    	  
		  	    var language =  "id="+idDelete;
		  	   
		  	     $.ajax({  
		  	      type : "POST",   
		  	      url : $getContextPath+"/skilllanguage/delete",   		  	    
		  	      data : language,  
		  	     
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
		  	   
		    }	   
	
	});