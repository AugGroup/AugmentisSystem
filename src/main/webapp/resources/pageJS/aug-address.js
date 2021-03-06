$(document).ready(function () {
	
	var $addressTypeId = $("#addressType");
	var $addressType = $('#addressType option:selected');
	var $houseNo = $("#houseNo");
	var $road = $("#road");
	var $district = $("#district");
	var $subDistrict = $("#subDistrict")
	var $zipcode = $("#zipcode");
	var $provinceId = $("#province");
	var $province = $('#province option:selected');
		
	var $validAddress = $('#addressForm').validate({
		rules : {
			addressType : {required : true},
			houseNo : {required : true},
			road : {required : true},
			district : {required : true},
			subDistrict : {required : true},
			zipcode : {required : true, digits:true},
			province : {required : true}
		},
		messages : {
			addressType : {required : valAddress},
			houseNo : {required : valHouseNo},
			road : {required : valRoad},
			district : {required : valDistrict},
			subDistrict : {required : valSubDistrict},
			province : {required : valProvince},
			zipcode : {required : valZipCode}
		}
	});
	
	$('.input-group.date').datepicker({
			startView : 2,
			todayBtn : "linked",
			format : "dd/mm/yyyy"
	});
		
	var dtApplicant;
		
	if(dtApplicant) {
		dtApplicant.ajax.reload();
	}
	else {
		dtApplicant = $('#addressTable').DataTable({
			paging: true,
			hover:false,
			sort:false,
			ajax : {
				url : contextPath + '/findByIdAddress/'+id,
				type : 'POST'
			},
			columns : [ {data : "masaddresstypeName"},
						{data : "houseNo"},
						{data : "road"},
						{data : "district"},
						{data : "subDistrict"},
						{data : "zipcode"},
						{data : "masprovinceName"},
						{data : function(data) {
					 		return '<button id="buttonEdit" data-id="'+data.id+'" data-toggle="modal" data-target="#addressModal" class="btn btn-warning btn-mini"><span class="glyphicon glyphicon-pencil"></span> '+ valEdit +'</button>';
						}},
						{ data : function(data) {
					 		return '<button id="buttonDelete" data-id="'+data.id+'" data-toggle="modal" data-target="#deleteModal" class="btn btn-danger btn-mini"><span class="glyphicon glyphicon-remove-sign"></span> '+ valDelete +'</button>';
						}}],
		   language:{

						    url: datatablei18n

						  },
			searching : false

		});
	}
		
	function saveAddress(){
		if($('#addressForm').valid()){
			var addressTypeId = $addressTypeId.val();
			var addressType = $('#addressType option:selected').text();
			var houseNo = $houseNo.val();
			var district = $district.val();
			var subDistrict = $subDistrict.val();
			var road = $road.val();
			var provinceId = $provinceId.val();
			var province = $('#province option:selected').text();
			var zipcode = $zipcode.val();
			var json = {"applicant" : {"id" : id},
						"addressType" : {"id" : addressTypeId,"name" : $('#addressType option:selected').text()},
						"houseNo" : houseNo,
						"district" : district,
						"subDistrict" : subDistrict,
						"road" : road,
						"province" : {"id" : provinceId,"name" : $('#province option:selected').text()},
						"zipcode":zipcode};
		
			$.ajax({
				url : contextPath + '/address/'+id,
				contentType : "application/json",
				type : "POST",
				data : JSON.stringify(json),
				success : function(data) {
					$('#addressModal').modal('hide');
					dtApplicant.ajax.reload();
					
					new PNotify({
				        title: pnotifySuccess,
				        text: pnotifyAdd,
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
		};
	}
		
		
	//Find by Id
	function findById(id){
		$.ajax({
			url : contextPath + "/findAddressId/" + id,
			type : "POST",
			success : function(data){
				showFillData(data);
			}
		});
	}
	
	//Show data on inputField
	function showFillData(data){
		$('#addressType').val(data.addressTypeId);
		$("#houseNo").val(data.houseNo);
		$("#road").val(data.road);
		$("#district").val(data.district);
		$("#subDistrict").val(data.subDistrict);
		$("#zipcode").val(data.zipcode);
		console.log(data.houseNo);
		
		$("#province").val(data.masprovinceId);
	}
	
	//Update function
	function updateAddress(button){
		if ($('#addressForm').valid()) {
		var id = $(button).data("id");
		var addressTypeId = $addressTypeId.val();
		var addressType = $('#addressType option:selected').text();
		var houseNo = $houseNo.val();
		var road = $road.val();
		var district = $district.val();
		var subDistrict = $subDistrict.val();
		var zipcode = $zipcode.val();
		var provinceId = $provinceId.val();
		var province = $('#province option:selected').text();
		console.log(id);
		
		var json = {
				"id" : id,
				"addressTypeId" : addressTypeId,
				"masaddresstypeName" : $('#addressType option:selected').text(),
				"houseNo" : houseNo,
				"road" : road,
				"district" : district,
				"subDistrict" : subDistrict,
				"zipcode" : zipcode,
				"masprovinceId" : provinceId,
				"masprovinceName" : $('#province option:selected').text()
				};
		
		$.ajax({
			url : contextPath + "/updateAddress/"+id,
			type : "POST",
			contentType :"application/json; charset=utf-8",
			data : JSON.stringify(json),
			success : function(data){
				$('#addressModal').modal('hide');
				
				var table = $('#addressTable').DataTable();	
			 	var rowData = table.row(button.closest('tr')).index(); 
			 	var d = table.row(rowData).data();
			 		console.log(data.masaddresstypeName);

			 		d.masaddresstypeName = data.masaddresstypeName;
			 		d.houseNo = data.houseNo;
					d.road = data.road;
			 		d.district = data.district;
			 		d.subDistrict = data.subDistrict;
			 		d.zipcode = data.zipcode;
			 		d.masprovinceName = data.masprovinceName;
			 		
			 		table.row(rowData).data(d).draw();
			 		
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
		};
	}
	
	  //delete Modal
    $('#deleteModal').on('shown.bs.modal', function (e) {
        var button = e.relatedTarget;
        var id = $(button).data("id");
        if (id != null) {
            $('#btn_delete_submit').off('click').on('click', function () {
                deleted(button);
            });
        }
    });
    
    //delete function 
    function deleted(button) {
        var dtApplicant = $('#addressTable').DataTable();
        var id = $(button).data("id");
        var index = dtApplicant.row(button.closest("tr")).index();
        $.ajax({
            url: contextPath + "/deleteAddress/" + id,
            type: "POST",
            success: function () {
            	dtApplicant.row(index).remove().draw();
            	new PNotify({
				    title: pnotifySuccess,
				    text: pnotifyDel,
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
	
    $('#addressModal').on('hide.bs.modal', function (e) {
    	// do something...
    	$validAddress.resetForm();
	})
	
    $('#addressModal').off("click").on('shown.bs.modal', function (e) {
    	//$validAddress.resetForm();
    	var button = e.relatedTarget;
		if(button != null){
			var id = $(button).data("id");
			if(id != null){
				console.log(id);
				findById(id);
				$('#btn_save').off('click').on('click', function(id){
					updateAddress(button);
				});
			}else{
				$('#addressForm')[0].reset();
				$('#btn_save').off('click').on('click', function(){
					saveAddress();
				});
			}

		}
   });
});