$(document).ready(function () {
	var isResultTable = false;
	var dtReport = $('#reportTable').DataTable({
		searching : false,
		paging: true,
		bLengthChange: false,
		sort : false
	});
	
    $('#btn_search').off('click').on('click', function(){
    	
    	if (isResultTable) {
    		dtReport.ajax.reload();
    	}
    	else {
    		dtReport.destroy();
    		dtReport = $('#reportTable').DataTable({
    			ajax :{
    				type:'POST',
    				url: $getContextPath+'/reservation/report/findReservationReport',
    				data: function (d) {	
    		
    					d.roomId = $("#room").val();
    					d.reservationTypeId = $("#reservationType").val();
    					d.divisionId = $("#masDivisionInsert").val();
    					d.reservationBy = $("#reservationBy").val();
    				},
    				dataSrc: function (data) {
    		            return data;
    				}
    			},
    			searching : false,
    			paging: true,
    			bLengthChange: false,
    			sort : false,
    			columns :[
    			       {data: function(data) {
    			    	   return data.firstName + " " + data.lastName;
    			       }},
    			       {data: "divisionName"},
    			       {data: "roomName"},
    			       {data: "reservationTypeName"},
    			       {data: "dateReservation"},				      
    		
    			       ]
    		//	language:{
    		//
    		//			    url: datatablei18n
    		//
    		//			  }	
    		});
    	}
    	isResultTable = true;
    });
	
	
	$("#btn_preview").off().on("click",function(){
		var typePreview = $('input[name=reportType]:checked','#reportForm').val();
		console.log(typePreview);
		
		if($("#reservationBy").val()== ""){
			var reservationBy = "null";
		}else{
			var reservationBy = $("#reservationBy").val();
			
		}
		window.open(
				$getContextPath+'/reservation/report/review/'+typePreview+'/'
				+$("#room").val()+'/'+$("#reservationType").val()+'/'+$("#masDivisionInsert").val()
				+'/'+reservationBy);
		console.log($getContextPath+'/reservation/report/review/'+typePreview+'/'
				+$("#room").val()+'/'+$("#reservationType").val()+'/'+$("#masDivisionInsert").val()
				+'/'+reservationBy);
	});
	
 	 $(".submit").click(function() {
		$("form[name='reportForm']").submit();
	});
 
});