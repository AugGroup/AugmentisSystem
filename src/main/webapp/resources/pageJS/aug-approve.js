 $(document).ready(function () {
//		$.ajaxSetup({
//		/* statusCode: */
//			statusCode : {
//       			400: function() { window.location="/AugRmSystem/exception/400"
//       			},
//       			404: function() { window.location="/AugRmSystem/exception/404"
//         		},
//         		415: function() { window.location="/AugRmSystem/exception/415"
//         		},
//         		500: function() { window.location="/AugRmSystem/exception/500"
//         		},
//       		
//  			 }, 
//    		error: function(jqXHR, textStatus, errorThrown){
//	            var exceptionVO = jQuery.parseJSON(jqXHR.responseText);
//	            console.log(jqXHR.status);
//	            $('#exceptionModal')
//	            .find('.modal-header h3').html(jqXHR.status+' error').end()
//	            .find('.modal-body p>strong').html(exceptionVO.clazz).end()
//	            .find('.modal-body p>em').html(exceptionVO.method).end()
//	            .find('.modal-body p>span').html(exceptionVO.message).end()
//	            .modal('show');
//	            
//	        } 
//    	});
		/* ------------------- DataTable------------------- */
	var dtRequest;
	if(dtRequest){ // if have dataTable
		dtRequest.ajax.reload(); // clear and call ajax, draw table?
	}else{
		dtRequest = $('#requestTable').DataTable({
				"columnDefs": [{ "width": "7%", "targets": 0 },
				               { "width": "10%", "targets": 1 },
				               { "width": "17%", "targets": 2 },
				               { "width": "7%", "targets": 4 },
			             ],
		sort : false,
		ajax: {
			type: "GET",
			url: contextPath + '/request/search',
			data: function (d) {
				$("#id").val(d.id);
				$("#requestDate").val(d.requestDate);
				$("#joblevel").val(d.masJobLevelName);
				$("#technology").val(d.masTechnologyName);
				$("#numberApplicant").val(d.numberApplicant);
				$("#status").val(d.status);
				$("#inputJobcaseStatus").val(d.jobcaseStatus);
				}
			},
			columns : [
			           {"data": "id"},
			           {"data": "jobcaseCode"},
			           {"data": "requestDate"},
			           {"data": "requesterName"},
			           {"data": "masJobLevelName"},
			           {"data": "masTechnologyName"},
			           {"data": "numberApplicant"},
			           {"data": "status"},
			           {"data": "jobcaseStatus"},
			           {data: function (data) {
			        	   if(data.status == "Approve"){
			        		   return '<button " class="btn btn-primary disabled btn_approve" data-id="' + data.id + '" data-toggle="modal" data-target="#approveModal"><span class="glyphicon glyphicon-edit"></span> '+approve_tx+' </button>';
			        	   } else {
			        		   return '<button " class="btn btn-primary" data-id="' + data.id + '" data-toggle="modal" data-target="#approveModal"><span class="glyphicon glyphicon-edit"></span> '+approve_tx+' </button>';
			        	   }
			        	}},
				       {data: function (data) {
				    	   if(data.status == "Approve"){
				    		   return '<button " class="btn btn-warning" data-id="' + data.id + '" data-toggle="modal" data-target="#jobcaseStatusModal"><span class="glyphicon glyphicon-pencil"></span> '+approve_tx+' </button>';
				    	   } else {
				    		   return '<button " class="btn btn-warning disabled btn_approve" data-id="' + data.id + '" data-toggle="modal" data-target="#jobcaseStatusModal"><span class="glyphicon glyphicon-pencil"></span> '+approve_tx+' </button>';
				    	   }
				       }},
			          ],
			language:{
			    url: datatablei18n
			},
			initComplete:function(data){
				setNotAllowed();
			}
			        	  
		});
	}
		
	/*------------------- Approve Modal Function------------------- */
	$('#approveModal').on('show.bs.modal', function (e) {
		var button = e.relatedTarget;
		var id = $(button).data("id");
		if (id !== null) {
			editSearch(id);
			$('#btn_approve_submit').off('click').on('click', function () {
				approve(button);
			});
		}
	});
	
	/*------------------- JobcaseStatus Modal Function------------------- */
	$('#jobcaseStatusModal').on('show.bs.modal', function (e) {
		var button = e.relatedTarget;
		var id = $(button).data("id");
		if(id != null){
			editSearch(id);
			$('#btn_jobcaseStatus_submit').off('click').on('click', function(){
				approve(button);
			});
		}
	});
	
	/*------------------- Edit Function (Search id and fill)------------------- */
	function editSearch(id) {
    	$.ajax({
    		url: 'request/search/' + id,
    		type: 'POST',
    		success: function (data) {
    			 if(data.status == 'New Request'){
    				 $('#inputStatus').val('');
    			 }else{
    				 $('#inputStatus').val(data.status);
        			 $('#inputJobcaseStatus').val(data.jobcaseStatus);
    			 }
    			 
    		}
    	});
    }
	
	/*------------------- Approve JobcaseStatus ------------- */
	function jobcaseStatus(button){
		var id = $(button).data("id");
		var jobcaseStatus = $('#inputJobcaseStatus option:selected').val();
		var index = dtRequest.row(button.closest("tr")).index();
		
		console.log(jobcaseStatus);
		var json = {
				'id': id,
				'jobcaseStatus': jobcaseStatus,
				};
		
		$.ajax({
			contentType: "application/json",
			type: "POST",
			url: 'approve/update/' + id,
			data: JSON.stringify(json),
			success: function (data) {
				var dt = dtRequest.data();
				dt.id = data.id;
				dt.jobcaseStatus = data.jobcaseStatus;
				
				$("#jobcaseStatusModal").modal('hide');
				
				dtRequest.ajax.reload();
				
				new PNotify({
			        title: pnotifySuccess,
			        text: pnotifyEdit,
			        type: 'success',
			        delay: 1000,
			        buttons:{
			        	closer_hover: false,
			        	sticker: false
			        }		
			    });
			},
			error : function() {
				alert("error");
				}
			});
	}
	
	/*------------------- Approve Function------------------- */
	function approve(button) {
		var id = $(button).data("id");
		var status = $('#inputStatus option:selected').val();
		var jobcaseStatus = $('#inputJobcaseStatus option:selected').val();
		var index = dtRequest.row(button.closest("tr")).index();
		var approveId = $('#approveId').val();
		var json = {
				'id': id,
				'status': status,
				'jobcaseStatus': jobcaseStatus,
				'approverId': approveId,
				'approveDate': moment(new Date()).format('DD-MM-YYYY')
				};
		
		$.ajax({
			contentType: "application/json",
			type: "POST",
			url: 'approve/update/' + id,
			data: JSON.stringify(json),
			success: function (data) {
				var dt = dtRequest.data();
				dt.id = data.id;
				dt.requesterName = data.requesterName;
				dt.requestDate = data.requestDate;
				dt.masJobLevelName = data.masJobLevelName;
				dt.masTechnologyName = data.masTechnologyName;
				dt.numberApplicant = data.numberApplicant;
				dt.status = data.status;
				dt.jobcaseStatus = data.jobcaseStatus;
				
				$("#approveModal").modal('hide');
				
				setNotAllowed();
				
				dtRequest.ajax.reload();
				
				new PNotify({
			        title: pnotifySuccess,
			        text: pnotifyEdit,
			        type: 'success',
			        delay: 1000,
			        buttons:{
			        	closer_hover: false,
			        	sticker: false
			        }		
			    });
			},
			error : function() {
				alert("error");
				}
			});
		}
	
    //set default date
    $("#addRequestModal").on('show.bs.modal', function() {
    	$("#inputApproveDate").val(moment(new Date()).format('DD-MM-YYYY'));
    });
    
	function setNotAllowed(data){
		$(".btn_approve").each(function(i,j){
			
			if( $(this).hasClass("disabled")){
				$(this).closest("td").hover(function(){
					$(this).css("cursor","not-allowed");
				});
			}
			
		});
	}
	
});