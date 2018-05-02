
function setScanner() {
	const datafetch = firebase.database().ref().child('Scanner').on('value', snapshot => {
		var response = null;
		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.val() != 'test' && childSnapshot.val().message_id != "null") {
		  		// if(childSnapshot.val().uid == response) {
		  			// $('.gal').append('<img src="' + childSnapshot.val().photo_url + '" alt="">');
		  		// }
		  		// console.log(childSnapshot.val());
		  		response = childSnapshot.val();
		  	}
		});

		showPoint(response.barcode_id);
		showBarcode(response.barcode_id);
		showInformation(response.barcode_id);
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
		  			$('h3#barcode_id').text(childSnapshot.val().barcode_id);
		  			$('h3#name').text(childSnapshot.val().lastname + ', ' + childSnapshot.val().firstname);
		  			$('h3#email').text(childSnapshot.val().email);
		  			$('h3#contact_number').text(childSnapshot.val().contact_number);
		  			// $('.gal').append('<img src="' + childSnapshot.val().photo_url + '" alt="">');
		  		}
		  		
		  		// response = childSnapshot.val();
		  	}
		});

		// console.log(response);
	});
}

function createHistory() {
	
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

function createNewUser(newBarcode) {
	var pushRef = firebase.database().ref('Barcode/').push({
	   
	  });

	var timestamp = Math.floor(Date.now());

	var setQuery = firebase.database().ref('Barcode/' + pushRef.key).set({
	    barcode_id: pushRef.key,
	    barcode: newBarcode,
		timestamp: timestamp
	  });

	createUser(pushRef.key, timestamp);
	createPoint(pushRef.key, timestamp);

	$('#create-user').modal('toggle');

	$('input#firstname').val('');
	$('input#lastname').val('');
	$('input#contact_number').val('');
	$('input#email').val('');
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
						var resultPoint = (parseInt(tempPoint) + parseInt(point));
						console.log(resultPoint);

						var timestamp = Math.floor(Date.now());

						var setQuery = firebase.database().ref('Point/' + key).set({
							point_id: key,
						    barcode_id: tempBarcodeID,
						    point: resultPoint,
							timestamp: timestamp
						  });

						$('#add-points').modal('toggle');
						$('input#add-point').val('');
					} 
				  	
				  });

		} 
	  	
	  });

}

function transferPoint(barcode, new_barcode, point) {

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
						var resultPoint = (parseInt(tempPoint) - parseInt(point));
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
						var resultPoint = (parseInt(tempPoint) + parseInt(point));
						console.log(resultPoint);

						var timestamp = Math.floor(Date.now());

						var setQuery = firebase.database().ref('Point/' + key).set({
							point_id: key,
						    barcode_id: tempBarcodeID,
						    point: resultPoint,
							timestamp: timestamp
						  });

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
	  	
	  	var result = false;
	  	var user_id;
	  	snapshot.forEach(function(childSnapshot) {
		    var key = childSnapshot.key;
		    var childData = childSnapshot.val();
		    
		    if(childData.username == username && childData.password == password) {
		    	result = true;
		    	user_id = childData.user_id;
		    }
		  });

	  	if(result) {
	  		// console.log("Successfully login!");
	  		$("document").ready(function() {
			    var datas = {
		            user_id: user_id
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

	  		
	  	} else {
	  		console.log("Unsuccessful!");
	  		$('.error').show().fadeIn(1000);
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