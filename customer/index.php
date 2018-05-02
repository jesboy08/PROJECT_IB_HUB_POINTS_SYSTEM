<?php
	// @session_start();
	// if(!isset($_SESSION['user_id'])) {
	// 	echo '<script>window.location.assign("index.php");</script>';
	// }
?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8"/>
	<title>Project-IB</title>
	<meta name="robots" content="index, follow"/>
    <meta name="author" content="Patrick Wied, w-labs"/>
    <meta name="keywords" content="audio visualization javascript html"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300" rel="stylesheet" type="text/css">

     <link rel="stylesheet" type="text/css" href="../admin/assets/css/main.css" />
    <!-- <link rel="stylesheet" type="text/css" href="../admin/assets/bootstrap/css/bootstrap.css" /> -->

    <link rel="stylesheet" href="../admin/assets/css/bootstrap.min.css">
    <script src="../admin/assets/js/jquery.min.js"></script>
    <script src="../admin/assets/js/bootstrap.min.js"></script>
    <style type="text/css">
    	/*#add-points input[type="text"] {
    		font-size: 40px;
    		padding: 10px;
    		text-align: center;
    	}*/

    	input[type="text"] {
    		font-size: 30px;
    		padding: 10px;
    		text-align: center;
    	}

    	/*#create-user input[type="text"] {
    		font-size: 20px;
    		padding: 10px;
    		margin-bottom: 10px;
    	}
*/
    </style>
    <style type="text/css">
    	footer {
    		color: #aaa;
    	}

    	ul {
		  list-style-type: none;
		}
    </style>
</head>
<body>
	<?php include_once('../admin/views/partials/header.php'); ?>
	<div class="container">
		<!-- <div class="row">
			<div class="col-md-12">
				<h1>Project-IB</h1>
			</div>
		</div> -->
		<div class="row profile">
			<div class="col-md-12">
					<!-- <div class="row profile"> -->
						<div class="col-md-3">

						</div>
						<div class="col-md-12">
				            <div class="profile-content">
							   
							   <div class="row">
							   		<div class="col-md-12">
							   			<h3>Project IB - Customer Information</h3>
							   			<hr>
							   		</div>
							   		<div class="col-md-12 text-center">
							   			<h1 style="font-weight: 800;" id="point">Waiting...</h1>
							   		</div>
							   		<!-- <div class="col-md-12 text-right" style="padding-right: 5em;">
							   			<a href="#">Account Settings</a>
							   		</div> -->
							   		<div class="col-md-3" style="margin-top: 2em;">
							   			<h4>Account ID:</h4>
							   			<h3 id="barcode">None</h3>
							   		</div>
							   		<div class="col-md-3" style="margin-top: 2em;">
							   			<h4>Account Name:</h4>
							   			<h3 id="name">None</h3>
							   		</div>
							   		<div class="col-md-3" style="margin-top: 2em;">
							   			<h4>Contact No:</h4>
							   			<h3 id="contact_number">None</h3>
							   		</div>
							   		<div class="col-md-3" style="margin-top: 2em;">
							   			<h4>Email:</h4>
							   			<h3 id="email">None</h3>
							   		</div>
							   		<!-- <div class="col-md-12" style="margin-top: 2em;">
							   			<h4>Actions</h4>
							   			<hr>
							   		</div> -->
							   		<div class="col-md-3" style="margin-top: 2em;"></div>
							   		<div class="col-md-6" style="margin-top: 2em;">
							   			<div class="profile-userbuttons">

							   				<!-- <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#add-points">Add Points</button> -->
							   				<input id="transfer-barcode" value='' placeholder="Account ID" type="text" class="form-control text-firstname" />

										</div>
							   		</div>
							   		<div class="col-md-3" style="margin-top: 2em;"></div>
							   </div>
				            </div>
						</div>
					<!-- </div> -->

					<!-- https://bootsnipp.com/snippets/featured/user-profile-sidebar -->
			</div>
		</div>
	</div>
	<?php include_once('../admin/views/partials/footer.php'); ?>
	<script src="https://www.gstatic.com/firebasejs/4.2.0/firebase.js"></script>
	<script>
	  // Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyDK-2nM0rSrtxL4KTSl9h0I0hoBO6GTF_M",
	    authDomain: "project-ib.firebaseapp.com",
	    databaseURL: "https://project-ib.firebaseio.com",
	    projectId: "project-ib",
	    storageBucket: "project-ib.appspot.com",
	    messagingSenderId: "539100574152"
	  };
	  firebase.initializeApp(config);

	  firebase.auth().signInAnonymously().catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		});

	  firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User is signed in.
		    var isAnonymous = user.isAnonymous;
		    var uid = user.uid;
		    // ...
		  } else {
		    // User is signed out.
		    // ...
		  }
		  // ...
		});
	</script>
	<script type="text/javascript" src="../admin/assets/js/function.js"></script>
	<script type="text/javascript" src="../admin/assets/js/main.js"></script>
	<!-- <script type="text/javascript">setScanner();</script> -->
	<script type="text/javascript">
		$('#transfer-barcode').on('input',function(e){
		    // alert('Changed!')
		    // console.log($('#transfer-barcode').val());

		    if($('#transfer-barcode').val() == '') {
		    	$('h1#point').text('Waiting...');
		    	$('h3#barcode').text('None');
	  			$('h3#name').text('None');
	  			$('h3#email').text('None');
	  			$('h3#contact_number').text('None');
		    }

		    

		    viewReward($('#transfer-barcode').val());
		});
	</script>
</body>
</html>