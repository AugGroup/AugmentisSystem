$(document).ready(function () {
	var dtReport;
	var $dataReport;
	$('#btn_search').off('click').on('click', function(){
		if(dtReport){
			dtReport.ajax.reload();
		}else{
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
						$dataReport = data;
						console.log(data.length)
			            return data;
					}
				},
				columns :[
				       {data: "reservationBy"},
				       {data: "divisionName"},
				       {data: "roomName"},
				       {data: "reservationTypeName"},
				       {data: "dateReservation"},				      

				       ]
//				language:{
//
//						    url: datatablei18n
//
//						  }	
			});
			
		}
		
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
	
	$('#btn_search').trigger("click");
	
 	 $(".submit").click(function() {
		$("form[name='reportForm']").submit();
	});
 
});