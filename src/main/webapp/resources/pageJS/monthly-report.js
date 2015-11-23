$(document).ready(function () {
	var isResultTable = false;
	
	var dtReport = $('#reportTable').DataTable({
		searching : false,
		paging: true,
		sort : false
	});
	
    $('input[name="applyDateStr"]').daterangepicker({
        format: 'DD/MM/YYYY',
        opens : "left",
        showDropdowns : true,
    });
  
	//Search By Position and Show function 
	$('#btn_search').off('click').on('click', function(){
		if(isResultTable){
			dtReport.ajax.reload();
		}else{
			dtReport.destroy();
			dtReport = $('#reportTable').DataTable({
				"columnDefs": [
				               { "width": "14%", "targets": 2 },
				               { "width": "13%", "targets": 3 },
				               { "width": "13%", "targets": 4 },
				               { "width": "13%", "targets": 5 },
				             ],
				searching : false,
				paging: true,
				sort : false,
				ajax : {
					type:'POST',
					url: 'report/searchMonth',
					data: function (d) {
						d.applyDateStr = $('#applyDateStr').val();
					},
					complete: function(data){
						if($('.dataTables_empty').length > 0){
							document.getElementById("btn_preview").disabled = true;
						}else document.getElementById("btn_preview").disabled = false;
						console.log(data);
					}
				},
				columns : [
			           {"data": "code"},
				       {"data": "applyDate"},
				       {"data": "fullNameEN"},
				       {"data": "masJoblevelName"},
				       {"data": "masTechnologyName"},
				       {"data": "schoolName"},
				       {"data": "degree"},
				       {"data": "gpa"},
				       ],
				language:{
					url: datatablei18n
				},	
			});
		}
		isResultTable = true;
	});
	
 	$(".submit").click(function() {
		$("form[name='reportForm']").submit();
	});
});