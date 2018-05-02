var customer_fullname;
var barcode_id;
// var full_name;

// $.ajax({
//     type: "POST",
//     dataType: "json",
//     url: "api/ajax/getFullName.php", 
//     data: null,
//     success: function(response) {
// 	 		// console.log(data);
// 	 		full_name = response;
//      	// window.location.assign('customer-information.php');
//     }
// });

function setScanner() {
	const datafetch = firebase.database().ref().child('Scanner').on('value', snapshot => {
		var response = null;
		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.val() != 'test' && childSnapshot.val().message_id != "null") {

		  		response = childSnapshot.val();
		  	}
		});

		showPoint(response.barcode_id);
		showBarcode(response.barcode_id);
		showInformation(response.barcode_id);
	});
}

function viewReward(barcode) {
	const datafetch = firebase.database().ref().child('Barcode').once('value', snapshot => {
		var response = null;
		var count = 0;
		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.val() != 'test' && childSnapshot.val().message_id != "null") {
		  		if(childSnapshot.val().barcode == barcode) {
		  			// $('.gal').append('<img src="' + childSnapshot.val().photo_url + '" alt="">');
		  			console.log(childSnapshot.val());
		  			response = childSnapshot.val();

		  			count++;
		  		}
		  		// console.log(childSnapshot.val());
		  		// response = ;
		  	}
		});

		if(count < 1) {
			$('h1#point').text('Waiting...');
	    	$('h3#barcode').text('None');
  			$('h3#name').text('None');
  			$('h3#email').text('None');
  			$('h3#contact_number').text('None');
		} else {
			showPoint(response.barcode_id);
			showBarcode(response.barcode_id);
			showInformation(response.barcode_id);
		}

		
	});
}

function showUserAccount() {
	const datafetch = firebase.database().ref().child('User').on('value', snapshot => {

		$('table tbody').html('');

		var x = 0;

		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.val() != 'test') {
				if(childSnapshot.val().username == null && childSnapshot.val().password == null) {
					x++;
			  		// response = childSnapshot.val();

			  		console.log(childSnapshot.val());
			  		var exResult = dataFromTimestamp(childSnapshot.val().timestamp);


			  		$('table tbody').append('<tr><td>' + x + '</td><td>' + childSnapshot.val().lastname + ', ' + childSnapshot.val().firstname + '</td><td>' + childSnapshot.val().contact_number + '</td><td>' + childSnapshot.val().email + '</td><td>' + exResult.fullDate + ' ' + exResult.fullTime + '</td></tr>');

			  		
				}

				

		  		// $('#reward').append('<tr class="reward_item" id="' + childSnapshot.val().reward_id + '"><td>' + x + '</td><td>' + childSnapshot.val().reward + '</td><td>' + childSnapshot.val().point + '</td><td><button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#add-rewards">Add Reward</button> <button class="btn btn-danger button-delete-rewards" onclick=deleteReward("' + childSnapshot.val().reward_id + '")>Delete</button> <button class="btn btn-warning btn-cancel-action" onclick=claimReward("' + childSnapshot.val().reward_id + '")>Claim</button></td></tr>');
		  	}
		});

	});
}

function showPoint(barcode_id) {
	const datafetch = firebase.database().ref().child('Point').once('value', snapshot => {
		var response = null;
		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.val() != 'test' && childSnapshot.val().message_id != "null") {
		  		if(childSnapshot.val().barcode_id == barcode_id) {
		  			$('h1#point').text(childSnapshot.val().point + ' PTS');
		  		}
		  	}
		});
	});
}

function showBarcode(barcode_id) {
	const datafetch = firebase.database().ref().child('Barcode').once('value', snapshot => {
		var response = null;
		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.val() != 'test' && childSnapshot.val().message_id != "null") {
		  		if(childSnapshot.val().barcode_id == barcode_id) {
		  			$('h3#barcode').text(childSnapshot.val().barcode);
		  		}
		  	}
		});
	});
}

function showInformation(barcode_id) {
	// console.log(barcode_id);

	const datafetch = firebase.database().ref().child('User').once('value', snapshot => {
		var response = null;
		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.val() != 'test' && childSnapshot.val().message_id != "null") {
		  		if(childSnapshot.val().barcode_id == barcode_id) {
		  			console.log(childSnapshot.val());

		  			barcode_id = childSnapshot.val().barcode_id;

		  			$('h3#barcode_id').text(childSnapshot.val().barcode_id);
		  			$('h3#name').text(childSnapshot.val().lastname + ', ' + childSnapshot.val().firstname);
		  			$('h3#email').text(childSnapshot.val().email);
		  			$('h3#contact_number').text(childSnapshot.val().contact_number);
		  			$('h3#facebook_link').html('<a href="' + childSnapshot.val().facebook_link + '" target="_blank">' + childSnapshot.val().facebook_link + '</a>');

		  			customer_fullname = childSnapshot.val().lastname + ', ' + childSnapshot.val().firstname;

		  			$('h3#reward_name').text(customer_fullname);

		  			// $('.gal').append('<img src="' + childSnapshot.val().photo_url + '" alt="">');
		  		}
		  		
		  		// response = childSnapshot.val();
		  	}
		});

		firebase.database().ref().child('Point').once('value', snapshot => {
			var response = null;
			snapshot.forEach(function(childSnapshot) {
				if(childSnapshot.val() != 'test' && childSnapshot.val().message_id != "null") {
			  		if(childSnapshot.val().barcode_id == barcode_id) {
			  			$('h3#reward_points').text(childSnapshot.val().point + ' PTS');
			  		}
			  	}
			});
		});


		// console.log(response);
	});
}

/* Admin */

function showAdmin() {
	const datafetch = firebase.database().ref().child('User').on('value', snapshot => {

		$('table tbody').html('');

		var x = 0;

		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.val() != 'test') {
				if(childSnapshot.val().username != null && childSnapshot.val().password != null) {
					x++;
			  		// response = childSnapshot.val();

			  		console.log(childSnapshot.val());
			  		var exResult = dataFromTimestamp(childSnapshot.val().timestamp);

			  		var datas = {
			  			user_id: childSnapshot.val().user_id,
			  			lastname: childSnapshot.val().lastname,
			  			firstname: childSnapshot.val().firstname,
			  			username: childSnapshot.val().username,
			  			password: childSnapshot.val().password,
			  			status: "inactive"
			  		}

			  		if(childSnapshot.val().status == 'active') {

			  			$('table tbody').append('<tr id="' + childSnapshot.val().user_id + '"><td>' + x + '</td><td>' + childSnapshot.val().lastname + ', ' + childSnapshot.val().firstname + '</td><td>' + childSnapshot.val().username + '</td><td>' + childSnapshot.val().password + '</td><td>' + childSnapshot.val().status + '</td><td><button class="btn btn-warning deactivateAdmin">Deactivate</button> <button class="btn btn-danger button-delete-rewards" onclick=deleteAdmin("' + childSnapshot.val().user_id + '")>Delete</button></td> <button class="btn btn-danger button-delete-rewards" onclick=deleteAdmin("' + childSnapshot.val().user_id + '")>Delete</button></td></tr>');

			  			$(".activateAdmin").click(function(){
			  				console.log($(this).closest("tr").attr("id"));
			  				var updateRef = firebase.database().ref('User/' + $(this).closest("tr").attr("id")).update({ status: "active" });
							// var removeRef = firebase.database().ref('order/section/' + $(this).closest("tr").attr("id")).remove();
						});

			  			$(".deactivateAdmin").click(function(){
			  				console.log($(this).closest("tr").attr("id"));
			  				var updateRef = firebase.database().ref('User/' + $(this).closest("tr").attr("id")).update({ status: "inactive" });
							// var removeRef = firebase.database().ref('order/section/' + $(this).closest("tr").attr("id")).remove();
						});
			  		} else if(childSnapshot.val().status == 'inactive') {

			  				$('table tbody').append('<tr id="' + childSnapshot.val().user_id + '"><td>' + x + '</td><td>' + childSnapshot.val().lastname + ', ' + childSnapshot.val().firstname + '</td><td>' + childSnapshot.val().username + '</td><td>' + childSnapshot.val().password + '</td><td>' + childSnapshot.val().status + '</td><td><button class="btn btn-warning activateAdmin">Activate</button> <button class="btn btn-danger button-delete-rewards" onclick=deleteAdmin("' + childSnapshot.val().user_id + '")>Delete</button></td> <button class="btn btn-danger button-delete-rewards" onclick=deleteAdmin("' + childSnapshot.val().user_id + '")>Delete</button></td></tr>');

			  			$(".activateAdmin").click(function(){
			  				console.log($(this).closest("tr").attr("id"));
			  				var updateRef = firebase.database().ref('User/' + $(this).closest("tr").attr("id")).update({ status: "active" });
							// var removeRef = firebase.database().ref('order/section/' + $(this).closest("tr").attr("id")).remove();
						});

						$(".deactivateAdmin").click(function(){
			  				console.log($(this).closest("tr").attr("id"));
			  				var updateRef = firebase.database().ref('User/' + $(this).closest("tr").attr("id")).update({ status: "inactive" });
							// var removeRef = firebase.database().ref('order/section/' + $(this).closest("tr").attr("id")).remove();
						});

			  		}

			  		
				}

				

		  		// $('#reward').append('<tr class="reward_item" id="' + childSnapshot.val().reward_id + '"><td>' + x + '</td><td>' + childSnapshot.val().reward + '</td><td>' + childSnapshot.val().point + '</td><td><button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#add-rewards">Add Reward</button> <button class="btn btn-danger button-delete-rewards" onclick=deleteReward("' + childSnapshot.val().reward_id + '")>Delete</button> <button class="btn btn-warning btn-cancel-action" onclick=claimReward("' + childSnapshot.val().reward_id + '")>Claim</button></td></tr>');
		  	}
		});

	});
}

function deleteAdmin(user_id) {
	var removeRef = firebase.database().ref('User/' + user_id).remove();
}

function activateAdmin(user_id, lastname, firstname, username, password) {
	var setQuery = firebase.database().ref('User/' + user_id).set({
		user_id: user_id,
		lastname: lastname,
	    firstname: firstname,
	    username: username,
	    password: password,
	    status: 'active'
	  });
}

function deactivateAdmin(datas) {
	// var data = {
	// 	user_id: user_id, 
	// 	lastname: lastname,
	// 	firstname: firstname,
	// 	username: username,
	// 	password: password
	// }

	console.log(datas);

	// var setQuery = firebase.database().ref('User/' + user_id).set({
	// 	user_id: user_id,
	// 	lastname: lastname,
	//     firstname: firstname,
	//     username: username,
	//     password: password,
	//     status: 'inactive'
	//   });
}

/* Reward */

function showReward() {

	const datafetch = firebase.database().ref().child('Reward').on('value', snapshot => {

		$('#reward').html('');

		var x = 0;

		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.val() != 'test') {
				x++;
		  		// response = childSnapshot.val();
		  		var exResult = dataFromTimestamp(childSnapshot.val().timestamp);

		  		$('#reward').append('<tr class="reward_item" id="' + childSnapshot.val().reward_id + '" reward="' + childSnapshot.val().reward + '"><td>' + x + '</td><td>' + childSnapshot.val().reward + '</td><td>' + childSnapshot.val().point + '</td><td><button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#add-rewards">Add Reward</button> <button class="btn btn-danger button-delete-rewards" onclick=deleteReward("' + childSnapshot.val().reward_id + '")>Delete</button> <button class="btn btn-warning btn-cancel-action claimReward">Claim</button></td></tr>');


		  		
		  		// $("#reward").append("<tr class='reward_item' id='" + childSnapshot.val().reward_id + "'><td>" + x + "</td><td>" + childSnapshot.val().reward + "</td><td>" + childSnapshot.val().point + "</td><td><button type='button' class='btn btn-success btn-sm' data-toggle='modal' data-target='#add-rewards'>Add Reward</button> <button class='btn btn-danger button-delete-rewards' onclick=deleteReward('" + childSnapshot.val().reward_id + "')>Delete</button> <button class='btn btn-warning btn-cancel-action' onclick='claimReward(" + childSnapshot.val().reward_id + ", " + childSnapshot.val().reward + ")'>Claim</button></td></tr>");
		  	}
		});

		$(".claimReward").click(function(){
  			claimReward($(this).closest("tr").attr("id"), $(this).closest("tr").attr("reward"));
		});

	});
}

function addReward(reward, point) {

	var pushRef = firebase.database().ref('Reward/').push({
	   
	  });

	var timestamp = Math.floor(Date.now());

	var newPoint = parseInt(point) < 0 ? 0 : parseInt(point);

	var setQuery = firebase.database().ref('Reward/' + pushRef.key).set({
	    reward_id: pushRef.key,
	    reward: reward,
	    point: newPoint,
		timestamp: timestamp
	  });



	var newPoint = parseInt(point) < 0 ? 0 : parseInt(point);

	if(newPoint > 0) {
		var pushRef = firebase.database().ref('History/').push({

		  });

		var setQuery = firebase.database().ref('History/' + pushRef.key).set({
		    history_id: pushRef.key,
		    description: "A new reward named '" + reward + "' has been added.",
		    action: "ADD_REWARD",
			timestamp: timestamp
		  });
	}




	$('#add-rewards').modal('toggle');
}

function deleteReward(reward_id) {
	var removeRef = firebase.database().ref('Reward/' + reward_id).remove();
}

function claimReward(reward_id, reward) {
	console.log(reward_id);
	console.log(reward);
	const datafetch = firebase.database().ref().child('Reward').on('value', snapshot => {

		var result = false;
		var tempRewardPoint = 0;

		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.val() != 'test') {
				if(childSnapshot.val().reward_id == reward_id) {
					result = true;
					tempRewardPoint = childSnapshot.val().point;
				}
		  	}
		});

		if(result) {
			// console.log(tempPoint);

				var tempBarcodeID;

				const datafetch = firebase.database().ref().child('Scanner').on('value', snapshot => {
					var response = null;
					snapshot.forEach(function(childSnapshot) {
						if(childSnapshot.val() != 'test' && childSnapshot.val().message_id != "null") {
					  		tempBarcodeID = childSnapshot.val().barcode_id;
					  	}
					});
				});

				// console.log(tempBarcodeID);

				firebase.database().ref('Point').once("value")
				  .then(function(snapshot) {
				  	
				  	var result = false;
				  	var tempPoint = 0;
				  	var key = null;

				  	snapshot.forEach(function(childSnapshot) {
					    
				  		if(childSnapshot.val() != 'test') {
				  			if(childSnapshot.val().barcode_id == tempBarcodeID) {
				  				result = true;
				  				key = childSnapshot.key;
					    		tempPoint = childSnapshot.val().point;

				  			}
				  			// console.log(childSnapshot.val().);
						}


					});

					if(result) {

						if(parseInt(tempRewardPoint) > parseInt(tempPoint)) {
							alert('Insufficient points!');
						} else {
							var resultPoint = (parseInt(tempPoint) - parseInt(tempRewardPoint));
							// console.log(resultPoint);

							var timestamp = Math.floor(Date.now());

							if(resultPoint >= 0) {
								var setQuery = firebase.database().ref('Point/' + key).set({
									point_id: key,
								    barcode_id: tempBarcodeID,
								    point: resultPoint,
									timestamp: timestamp
								  });
								console.log('hey!');

								var pushRef = firebase.database().ref('History/').push({

								  });

								var setQuery = firebase.database().ref('History/' + pushRef.key).set({
								    history_id: pushRef.key,
								    description: customer_fullname + " claimed " + reward + ".",
								    action: "CLAIM_REWARD",
									timestamp: timestamp
								  });
							} else {
								var setQuery = firebase.database().ref('Point/' + key).set({
									point_id: key,
								    barcode_id: tempBarcodeID,
								    point: 0,
									timestamp: timestamp
								  });
							}

							alert('Done!');
						}


						// $('#add-points').modal('toggle');
						// $('input#add-point').val('');

						
					} 
				  	
				  });

		}
		

	});
}


/* History */

function showHistory() {
	const datafetch = firebase.database().ref().child('History').orderByChild('timestamp').on('value', snapshot => {

		$('#history').html('');

		var x = 0;

		var arrayHistory = [];

		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.val() != 'test') {
				if(childSnapshot.val().action != 'SCAN') {
					x++;
			  		response = childSnapshot.val();
			  		arrayHistory.push(response);
		  		}
		  	}
		});

		arrayHistory.reverse();

		$.each( arrayHistory, function( key, value ) {
		  	var exResult = dataFromTimestamp(value.timestamp);

		  	$('#history').append('<tr><td>' + value.action + '</td><td>' + value.description + '</td><td>' + exResult.fullDate + ' ' + exResult.fullTime + '</td></tr>');
		});
	});
}

function search(term) {

	console.log(term.length);
	const datafetch = firebase.database().ref().child('History').orderByChild('timestamp').once('value', snapshot => {

		$('#history').html('');

		var x = 0;

		var arrayHistory = [];

		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.val() != 'test') {
				
				if(childSnapshot.val().action != 'SCAN') {
					x++;
			  		response = childSnapshot.val();
			  		console.log(response);

			  		arrayHistory.push(response);
				}
		  		
		  	}
		});

		arrayHistory.reverse();

		$.each( arrayHistory, function( key, value ) {
		  	var exResult = dataFromTimestamp(value.timestamp);

	  		var action = value.action.toLowerCase();
	  		var description = value.description.toLowerCase();
	  		var date = exResult.fullDate + ' ' + exResult.fullTime;

			if (action.indexOf(term.toLowerCase()) > -1 || description.indexOf(term.toLowerCase()) > -1 || date.indexOf(term.toLowerCase()) > -1)
			{
			 	
	  			$('#history').append('<tr><td>' + x + '</td><td>' + value.action + '</td><td>' + value.description + '</td><td>' + exResult.fullDate + ' ' + exResult.fullTime + '</td></tr>');
			}
		});

		

		if(term == '' || term == null) {
			showHistory();
		}

	});

	
}

function dataFromTimestamp(timestamp){
    var d = new Date(timestamp);
    
    // Time
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    var time = h + ":" + m + ":" + s;
    
    // Date
    var da = d.getDate();       //day
    var mon = d.getMonth() + 1; //month
    var yr = d.getFullYear();   //year
    var thisDay = da + "/" + mon + "/" + yr;
    
    var dateTime = {
        seconds : s,
        minutes : m,
        hours : h,
        dayInMonth : da,
        month : mon,
        year : yr,
        dayInTheWeek : d.getDay(),
        fullTime : time,
        fullDate : thisDay,
    };
    //debugger;
    return dateTime;
    
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
}

function createHistory(datas) {

	console.log(datas);

	firebase.database().ref('Barcode').once("value")
	  .then(function(snapshot) {
	  	
	  	var result = false;
	  	var tempBarcodeID = null;

	  	snapshot.forEach(function(childSnapshot) {
		    var key = childSnapshot.key;
	  		if(childSnapshot.val() != 'test') {
	  			if(childSnapshot.val().barcode == datas.barcode) {
	  				result = true;
	  				tempBarcodeID = childSnapshot.val().barcode_id;
	  			}
	  			
			}


		});

		if(result) {
			switch(datas.action) {

				// SCAN
				// datas.barcode
				// datas.action	

				// case "SCAN":
				// 	var pushRef = firebase.database().ref('History/').push({
	   
				// 	  });

				// 	var timestamp = Math.floor(Date.now());

				// 	var setQuery = firebase.database().ref('History/' + pushRef.key).set({
				// 	    history_id: pushRef.key,
				// 	    barcode_id: tempBarcodeID,
				// 	    description: tempBarcodeID + " has been scanned.",
				// 	    action: datas.action,
				// 		timestamp: timestamp
				// 	  });
				// 	break;
				case "ADD_POINT":

					var newPoint = parseInt(datas.point) < 0 ? 0 : parseInt(datas.point);

					if(newPoint > 0) {
						var pushRef = firebase.database().ref('History/').push({
	   
						  });

						var timestamp = Math.floor(Date.now());

						var setQuery = firebase.database().ref('History/' + pushRef.key).set({
						    history_id: pushRef.key,
						    barcode_id: tempBarcodeID,
						    description: datas.barcode + " has been added " + datas.point + " points.",
						    action: datas.action,
							timestamp: timestamp
						  });
					}
					
					break;	
				case "TRANSFER_POINT":

					var newPoint = parseInt(datas.point) < 0 ? 0 : parseInt(datas.point);

					if(newPoint > 0) {
						var pushRef = firebase.database().ref('History/').push({
	   
						  });

						var timestamp = Math.floor(Date.now());

						var setQuery = firebase.database().ref('History/' + pushRef.key).set({
						    history_id: pushRef.key,
						    barcode_id: tempBarcodeID,
						    description: datas.barcode + " transferred " + datas.point + " points to " + datas.new_barcode + ".",
						    action: datas.action,
							timestamp: timestamp
						  });
					}

					break;
			}
		}

	  });

}

function createBarcode() {
	firebase.database().ref('Barcode').once("value")
	  .then(function(snapshot) {

	  	var barcodeArray = [];
	  	
	  	snapshot.forEach(function(childSnapshot) {
		    var key = childSnapshot.key;
	  		if(childSnapshot.val() != 'test' && childSnapshot.val().message_id != "null") {
		    	barcodeArray.push(childSnapshot.val().barcode);
			}
		});

	  	$.each( barcodeArray, function( key, value ) {
		  // console.log(value);
		});


	  	var newBarcode = Math.floor(100000000 + Math.random() * 900000000);

	  	while(jQuery.inArray(newBarcode, barcodeArray) !== -1) {
	  		newBarcode = Math.floor(100000000 + Math.random() * 900000000);
	  	} 

	  	// console.log(newBarcode);
	  	$('h2#new_barcode').text(newBarcode);

	  	// console.log($('h2#new_barcode').text());
	  	
	  });
}

function addAdmin(lastname, firstname, username, password) {

	firebase.database().ref('User').once("value")
	  .then(function(snapshot) {
	  	
	  	var result = false;

	  	snapshot.forEach(function(childSnapshot) {

	  		if(childSnapshot.val() != 'test') {
	  			if(childSnapshot.val().lastname == $('#add-account input#lastname').val() && childSnapshot.val().firstname == $('#add-account input#firstname').val()) {
	  				result = true;
	  			}

	  			if(childSnapshot.val().username == $('#add-account input#username').val()) {
	  				result = true;
	  			}
	  			
			}


		});

		if(result) {
			console.log('true');
		} else {

			var pushRef = firebase.database().ref('User/').push({
	   
			  });

			var setQuery = firebase.database().ref('User/' + pushRef.key).set({
				user_id: pushRef.key,
				lastname: lastname,
			    firstname: firstname,
			    username: username,
			    password: password,
			    status: 'active'
			  });


			$('#add-account').modal('toggle');

			$('#add-account input#firstname').val('');
			$('#add-account input#lastname').val('');
			$('#add-account input#username').val('');
			$('#add-account input#password').val('');

			console.log('false');

		}
	});

	// var datas = {
	// 	lastname: lastname,
	// 	firstname: firstname,
	// 	username: username,
	// 	password: password
	// }


	// console.log(datas);
}

function createNewUser(new_barcode) {

	firebase.database().ref('User').once("value")
	  .then(function(snapshot) {
	  	
	  	var result = false;

	  	snapshot.forEach(function(childSnapshot) {

	  		if(childSnapshot.val() != 'test') {
	  			if(childSnapshot.val().lastname == $('input#lastname').val() && childSnapshot.val().firstname == $('input#firstname').val()) {
	  				result = true;
	  				// tempBarcodeID = childSnapshot.val().barcode_id;
	  				// destBarcode = childSnapshot.val().barcode;
	  			}
	  			
			}


		});

		if(result) {
			console.log('true');
		} else {
			console.log('false');

			var pushRef = firebase.database().ref('Barcode/').push({
	   
			  });

			var timestamp = Math.floor(Date.now());

			var setQuery = firebase.database().ref('Barcode/' + pushRef.key).set({
			    barcode_id: pushRef.key,
			    barcode: new_barcode,
				timestamp: timestamp
			  });

			createUser(pushRef.key, timestamp);
			createPoint(pushRef.key, timestamp);

			$('#create-user').modal('toggle');

			$('input#firstname').val('');
			$('input#lastname').val('');
			$('input#contact_number').val('');
			$('input#email').val('');
			$('input#facebook_link').val('');
		}

	});

}

function createUser(barcode_id, timestamp) {
	var pushRef = firebase.database().ref('User/').push({
	   
	  });

	var setQuery = firebase.database().ref('User/' + pushRef.key).set({
		user_id: pushRef.key,
	    barcode_id: barcode_id,
	    firstname: $('input#firstname').val(),
		lastname: $('input#lastname').val(),
	    contact_number: $('input#contact_number').val(),
	    email: $('input#email').val(),
	    facebook_link: $('input#facebook_link').val(),
		// firstname: $('.text-firstname').val(),
		// lastname: $('.text-lastname').val(),
	 //    contact_number: $('.text-contactnumber').val(),
	 //    email: $('.text-email').val(),
		timestamp: timestamp
	  });
}

function createPoint(barcode_id, timestamp) {
	var pushRef = firebase.database().ref('Point/').push({
	   
	  });

	var setQuery = firebase.database().ref('Point/' + pushRef.key).set({
		point_id: pushRef.key,
	    barcode_id: barcode_id,
	    point: 0,
		timestamp: timestamp
	  });
}

function addPoint(barcode, point) {

	firebase.database().ref('Barcode').once("value")
	  .then(function(snapshot) {
	  	
	  	var result = false;
	  	var tempBarcodeID = null;

	  	snapshot.forEach(function(childSnapshot) {
		    var key = childSnapshot.key;
	  		if(childSnapshot.val() != 'test') {
	  			if(childSnapshot.val().barcode == barcode) {
	  				result = true;
	  				tempBarcodeID = childSnapshot.val().barcode_id;
	  			}
	  			
			}


		});

		if(result) {
			
				firebase.database().ref('Point').once("value")
				  .then(function(snapshot) {
				  	
				  	var result = false;
				  	var tempPoint = 0;
				  	var key = null;

				  	snapshot.forEach(function(childSnapshot) {
					    
				  		if(childSnapshot.val() != 'test') {
				  			if(childSnapshot.val().barcode_id == tempBarcodeID) {
				  				result = true;
				  				key = childSnapshot.key;
					    		tempPoint = childSnapshot.val().point;

				  			}
				  			// console.log(childSnapshot.val().);
						}


					});

					if(result) {

						var newPoint = parseInt(point) < 0 ? 0 : parseInt(point);


						if(newPoint > 0) {
							var resultPoint = (parseInt(tempPoint) + parseInt(newPoint));
							console.log(resultPoint);

							var timestamp = Math.floor(Date.now());

							var setQuery = firebase.database().ref('Point/' + key).set({
								point_id: key,
							    barcode_id: tempBarcodeID,
							    point: resultPoint,
								timestamp: timestamp
							  });

							/*Start Create History*/

							var datas = {
								barcode: barcode,
								action: "ADD_POINT",
								point: point
							}

							createHistory(datas);
						}

						$('#add-points').modal('toggle');
						$('input#add-point').val('');
					} 
				  	
				  });

		} 
	  	
	  });

}

function transferPoint(barcode, new_barcode, point) {

	// var sourceBarcode = null;
	var destBarcode = null;

	/*Barcode*/

	firebase.database().ref('Barcode').once("value")
	  .then(function(snapshot) {
	  	
	  	var result = false;
	  	var tempBarcodeID = null;

	  	snapshot.forEach(function(childSnapshot) {
		    var key = childSnapshot.key;
	  		if(childSnapshot.val() != 'test') {
	  			if(childSnapshot.val().barcode == barcode) {
	  				result = true;
	  				tempBarcodeID = childSnapshot.val().barcode_id;
	  			}
	  			
			}


		});

		if(result) {
			
				firebase.database().ref('Point').once("value")
				  .then(function(snapshot) {
				  	
				  	var result = false;
				  	var tempPoint = 0;
				  	var key = null;

				  	snapshot.forEach(function(childSnapshot) {
					    
				  		if(childSnapshot.val() != 'test') {
				  			if(childSnapshot.val().barcode_id == tempBarcodeID) {
				  				result = true;
				  				key = childSnapshot.key;
					    		tempPoint = childSnapshot.val().point;

				  			}
				  			// console.log(childSnapshot.val().);
						}


					});

					if(result) {

						var newPoint = parseInt(point) < 0 ? 0 : parseInt(point);

						var resultPoint = (parseInt(tempPoint) - parseInt(newPoint));
						console.log(resultPoint);

						var timestamp = Math.floor(Date.now());

						if(resultPoint >= 0) {
							var setQuery = firebase.database().ref('Point/' + key).set({
								point_id: key,
							    barcode_id: tempBarcodeID,
							    point: resultPoint,
								timestamp: timestamp
							  });
						} else {
							var setQuery = firebase.database().ref('Point/' + key).set({
								point_id: key,
							    barcode_id: tempBarcodeID,
							    point: 0,
								timestamp: timestamp
							  });
						}

						// $('#add-points').modal('toggle');
						// $('input#add-point').val('');

						
					} 
				  	
				  });

		} 
	  	
	  });

	  /* New Barcode */

	  firebase.database().ref('Barcode').once("value")
	  .then(function(snapshot) {
	  	
	  	var result = false;
	  	var tempBarcodeID = null;

	  	snapshot.forEach(function(childSnapshot) {
		    var key = childSnapshot.key;
	  		if(childSnapshot.val() != 'test') {
	  			if(childSnapshot.val().barcode == new_barcode) {
	  				result = true;
	  				tempBarcodeID = childSnapshot.val().barcode_id;
	  				destBarcode = childSnapshot.val().barcode;
	  			}
	  			
			}


		});

		if(result) {
			
				firebase.database().ref('Point').once("value")
				  .then(function(snapshot) {
				  	
				  	var result = false;
				  	var tempPoint = 0;
				  	var key = null;

				  	snapshot.forEach(function(childSnapshot) {
					    
				  		if(childSnapshot.val() != 'test') {
				  			if(childSnapshot.val().barcode_id == tempBarcodeID) {
				  				result = true;
				  				key = childSnapshot.key;
					    		tempPoint = childSnapshot.val().point;
				  			}
				  			// console.log(childSnapshot.val().);
						}


					});

					if(result) {

						var newPoint = parseInt(point) < 0 ? 0 : parseInt(point);

						var resultPoint = (parseInt(tempPoint) + parseInt(newPoint));
						console.log(resultPoint);

						var timestamp = Math.floor(Date.now());

						var setQuery = firebase.database().ref('Point/' + key).set({
							point_id: key,
						    barcode_id: tempBarcodeID,
						    point: resultPoint,
							timestamp: timestamp
						  });


						/*Start Create History*/

						var datas = {
							barcode: barcode,
							action: "TRANSFER_POINT",
							new_barcode: destBarcode,
							point: point
						}

						createHistory(datas);

						$('#transfer-points').modal('toggle');
						$('input#transfer-point').val('');

						
					} 
				  	
				  });

		} 
	  	
	  });

}

/*Log In*/

function loginAccount(username, password) {
   var keys = [];
   var datas = [];
   firebase.database().ref('User').once("value")
	  .then(function(snapshot) {
	  	
	  	var result = 0;
	  	var user_id;
	  	var firstname;
	  	var lastname;
	  	snapshot.forEach(function(childSnapshot) {
		    var key = childSnapshot.key;
		    var childData = childSnapshot.val();
		    
		    if(childData.username == username && childData.password == password) {
		    	if(childData.status == 'active') {
		    		result = 2;
		    		user_id = childData.user_id;
		    		firstname = childData.firstname;
		    		lastname = childData.lastname;
		    	} else {
		    		result = 1;
		    	}

		    }
		  });

	  	switch(result) {
	  		case 0:
	  			$('.error-invalid').show();
	  			$('.error-deactivated').hide();
	  			break;
	  		case 1:
	  			$('.error-invalid').hide();
	  			$('.error-deactivated').show();
	  			break;
	  		case 2:

	  			$("document").ready(function() {
				    var datas = {
			            user_id: user_id,
			            firstname: firstname,
			            lastname: lastname
			        };

			        // console.log(datas);

			        // datas_serialize = $(this).serialize() + "&" + $.param(datas);

			        $.ajax({
			            type: "POST",
			            dataType: "json",
			            url: "api/ajax/createSession.php", //Relative or absolute path to response.php file
			            data: datas,
			            success: function(response) {
			       	 		// console.log(data);
			             	window.location.assign('customer-information.php');
			            }
			        });
			        return false;
				});

	  			break;
	  	}
	  	

	  });
	
}

/*Sign Up*/

function createAccountCallback(boolean, key) {
	if(!boolean) {
	var pushRef = firebase.database().ref('User/').push({
	   
	  });

	var timestamp = Math.floor(Date.now());

	var setQuery = firebase.database().ref('User/' + pushRef.key).set({
	    barcode_id: 'null',
	    contact_number: $('.text-contactnumber').val(),
	    email: $('.text-email').val(),
		firstname: $('.text-firstname').val(),
		lastname: $('.text-lastname').val(),
		password: $('.text-password').val(),
		timestamp: timestamp,
		user_id: pushRef.key,
		username: $('.text-username').val()
	  });

	// $('.text-username').val('');
	// $('.text-password').val('');
	} 
}

function createAccount(username) {
   var keys = [];
   var datas = [];
   firebase.database().ref('User').once("value")
	  .then(function(snapshot) {
	  	

	  	snapshot.forEach(function(childSnapshot) {
		    var key = childSnapshot.key;
		    var childData = childSnapshot.val();
		    keys.push(key);
		    datas.push(childData.username);
		    // console.log(childData.username);
		  });

		var setBoolean;
		var setKey;

		$.each([keys, datas], function() {
		    $.each(this, function(i, v) {
		    	
		    	if (v == username) {
					setBoolean = true;
					setKey = keys[i];
				} 
				// else {
				// 	setBoolean = false;
				// 	setKey = keys[i];
				// }
		    });
		});

		createAccountCallback(setBoolean, setKey);
	  });
	
}

function logoutAccount() {
	$.ajax({
        type: "POST",
        dataType: "json",
        url: "api/ajax/destroySession.php", //Relative or absolute path to response.php file
        data: null,
        success: function(response) {
   	 		// console.log(data);
         	window.location.assign('index.php');
        }
    });
}