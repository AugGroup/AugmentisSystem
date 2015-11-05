var dt;
var empId;
	$(document).ready(function() {
		
		$.ajaxSetup({
		    timeout: 5000,
		    error : function(XMLHttpRequest,e,testStatus,jqXHR,xhr,errorThrown,thrownError) {  
		          
		    	  if(testStatus==="timeout") {
		    		  swal({
				   	    	title: "Time Out", 		  	    	    	
				   	    	text: "Connection Time Out..."
				   	    	});
				   	  
		          } 
		    	

		   	   if(XMLHttpRequest.responseText.indexOf("Error:")== 1){
		   		   
		   		 var errormsg = JSON.parse(XMLHttpRequest.responseText.split('Error:'));
		   		 var msg= ' ';
		   		 
		   		 for(var i=1;i<errormsg.length;i++){
		   			 
		   			 msg =msg+errormsg[i];
		   		 }
		   		 
		   		 
		   		 $('*').modal('hide');

		   		 
		   	    swal({
		   	    	title: "Error",		  	    	    	
		   	    	text: msg
		   	    	});
		   	  
		   	    
		   	   }else {
		     		
		   		      alert(testStatus);
			          myRedirect($getContextPath+'/httperror',testStatus);
		   	   
		   	   }

		    }    
		});


		var myRedirect = function(redirectUrl,err,testStatus) {
		  	var form = $('<form id="form" action="' + redirectUrl + '" method="post">' +
		  	'<input type="hidden" name="error" value="'+err+'" />' +
		  	'</form>');
		  	$('body').append(form);
		  	$('#form').submit();
		};

		
		
		dt=$("#tdResult").dataTable({ 
			"ordering": false,
			
// 			"dom": '<"toolbar">frtip'
			fnInitComplete : function(){
				listAll();
				
			}
		});
  	
		
// 		 $("div.toolbaCr").html('<b>Custom tool bar! Text/images etc.</b>');
		 
    	var button = $(event.relatedTarget);
		empId = button.data("empid"); 
// 		listAll();
			
    		function listAll(){
//    			alert('list all'); 
    			$.ajax({
    				url : $getContextPath+"/employee/listAll",
    				type : "POST",
    				contentType: "application/json",
    				dataType: "json",
    				success : function(data) {
    					
    					dt.fnClearTable();
    				    
	    				for (var i=0;i< data.length; i++) {
	    					console.log(data);
	    					
	    					dt.fnAddData([data[i].id,data[i].employeeCode,data[i].nameEng, 
	    					              data[i].surnameEng,
	    						 '<button type="button"  class="btn btn-warning btn-sm active btn-center" data-empId="' + data[i].id + '" onclick="initEditEmployee('+data[i].id+')" >'+$msgEdit+'</button>',
	    						'<button type="button" class="btn btn-danger btn-sm active btn-center" data-empId="' + data[i].id + '" data-target="#deleteModal" data-toggle="modal">'+$msgDelete+'</button>']);
	    			 
    					}	
	    				$(".btn-center").closest("td").addClass("text-center");
    				},
    				error : function(xhr){console.log("err----------------"+xhr.responseText)}
    			});
    		}
	
/* --------------------------------------------------- Delete Function --------------------------------------------------- */		
			
			$("#deleteModal").on("show.bs.modal", function(event){
				var button = $(event.relatedTarget);
				var empId = button.data("empid");
				//alert("delete "+empId);
				$(this).find(".yesButton").off("click").on("click", function()
						{
							deleteEmployee(button,empId);
							//alert("go fn");
						});
				
				function deleteEmployee(button,empId){
					//alert("in fn");
					$.ajax({
						url : $getContextPath+"/employee/deleteemp/"+empId,
						type : "POST",
						success : function(data) {
							$('#deleteModal').modal('toggle');
							$("#message").html('<div class="alert alert-success" role="alert">Success</div>');		
							listAll();
						}/* ,
						error : function(data,testStatus,jqXHR) {
							$('#deleteModal').modal('toggle');
							$("#message").html('<div class="alert alert-danger" role="alert">Error</div>');
							} */
						});
					}
    		   	
			
  				});

     	
	});
	
	/* --------------------------------------------------- EditFunction --------------------------------------------------- */		
		function initEditEmployee(empId) {
		if(empId == null){
			empId = 0;
		}

		var id = empId;
		window.location = $getContextPath+"/employee/init/"+id;
		//window.location = "${pageContext.request.contextPath}/employee/"+empId;

	/* 	$.ajax({
			url : "${pageContext.request.contextPath}/employee/initEdit/"+empId,
			type : "GET",
			success : function(data) {
				
				window.location = "${pageContext.request.contextPath}/?Id="+empId;
				alert("emp id:"+ empId);
				//editEmployee(); 

			},
			error : function(data,testStatus,jqXHR) {
				$("#message").html('<div class="alert alert-danger" role="alert">Error</div>');
				}
			}); */
	}