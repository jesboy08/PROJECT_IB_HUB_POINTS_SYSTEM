<?php
	@session_start();
	if(!isset($_SESSION['user_id'])) {
		echo '<script>window.location.assign("index.php");</script>';
	}
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

     <link rel="stylesheet" type="text/css" href="assets/css/main.css" />
    <!-- <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.css" /> -->

    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <style type="text/css">

    	#add-points input[type="text"] {
    		font-size: 40px;
    		padding: 10px;
    		text-align: center;
    	}

    	#transfer-points input[type="text"] {
    		font-size: 40px;
    		padding: 10px;
    		text-align: center;
    	}

    	#create-user input[type="text"] {
    		font-size: 20px;
    		padding: 10px;
    		margin-bottom: 10px;
    		/*text-align: center;*/
    	}

    	#create-user input[type="email"] {
    		font-size: 20px;
    		padding: 10px;
    		margin-bottom: 10px;
    		/*text-align: center;*/
    	}

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
	

	<?php include_once('views/partials/header.php'); ?>

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
							<div class="profile-sidebar">
								<!-- SIDEBAR USERPIC -->
								<div class="profile-userpic">
									<img src="assets/img/default-user-icon-profile.png" class="img-responsive" alt="">
								</div>
								<!-- END SIDEBAR USERPIC -->
								<!-- SIDEBAR USER TITLE -->
								<div class="profile-usertitle">
									<div class="profile-usertitle-name">
										<?php echo $_SESSION['firstname']; ?> <?php echo $_SESSION['lastname']; ?>
									</div>
									<div class="profile-usertitle-job">
										Administrator
									</div>
								</div>
								<!-- END SIDEBAR USER TITLE -->
								<!-- SIDEBAR BUTTONS -->
								<div class="profile-userbuttons">
									<!-- <a href="create-new-user.php"><button type="button" class="btn btn-success btn-sm">Create User</button></a> -->
									<button type="button" class="btn btn-success btn-sm button-create-user" data-toggle="modal" data-target="#create-user">Create User</button>

									<!-- Create User Modal -->
									<div id="create-user" class="modal fade" role="dialog">
									  <div class="modal-dialog">

									    <!-- Modal content-->
									    <div class="modal-content">
									      <div class="modal-header">
									        <button type="button" class="close" data-dismiss="modal">&times;</button>
									        <h4 class="modal-title">Create User</h4>
									      </div>
									      <div class="modal-body">
						                    <div class="form-group">
						                    	<h2 id="new_barcode"></h2>
						                        <input id="lastname" value='' placeholder="Last Name" type="text" class="form-control" />
						                        <input id="firstname" value='' placeholder="First Name" type="text" class="form-control" />
						                        <input id="contact_number" value='' placeholder="Contact No." type="text" class="form-control" />
						                        <input id="email" value='' placeholder="Email" type="text" class="form-control" />
						                        <input id="facebook_link" value='' placeholder="Facebook Link" type="text" class="form-control" />
						                    </div>
									      </div>
									      <div class="modal-footer">
									      	<button type="button" class="btn btn-success btn-sm button-create-user-modal">Create</button>
									        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
									      </div>
									    </div>

									  </div>
									</div>

									<a href="logout.php"><button type="button" class="btn btn-danger">Logout</button></a>
								</div>
								<!-- END SIDEBAR BUTTONS -->
								<!-- SIDEBAR MENU -->
								<div class="profile-usermenu">
									<ul class="nav">
										<li class="active">
											<a href="customer-information.php">
											<!-- <i class="glyphicon glyphicon-home"></i> -->
											Customer Information </a>
										</li>
										<li>
											<a href="manage-account.php">
											Manage Account 	 </a>
										</li>
										<li>
											<a href="user-account.php">
											User Account 	 </a>
										</li>
										
										<!-- <li>
											<a href="#">
											<i class="glyphicon glyphicon-user"></i>
											 </a>
										</li> -->
										<!-- <li>
											<a href="#" target="_blank">
											<i class="glyphicon glyphicon-ok"></i>
											Check Points </a>
										</li> -->
										<li>
											<a href="reward.php">
											<!-- <i class="glyphicon glyphicon-ok"></i> -->
											Rewards </a>
										</li>
										<li>
											<a href="history.php">
											<!-- <i class="glyphicon glyphicon-flag"></i> -->
											History </a>
										</li>
									</ul>
								</div>
								<!-- END MENU -->
							</div>
						</div>
						<div class="col-md-9">
				            <div class="profile-content">
							   
							   <div class="row">
							   		<div class="col-md-12">
							   			<h3>Customer Information</h3>
							   			<hr>
							   		</div>
							   		<div class="col-md-12 text-center">
							   			<h1 style="font-weight: 800;" id="point">Waiting...</h1>
							   		</div>
							   		<!-- <div class="col-md-12 text-right" style="padding-right: 5em;">
							   			<a href="#">Account Settings</a>
							   		</div> -->
							   		<div class="col-md-6" style="margin-top: 2em;">
							   			<h4>Account ID:</h4>
							   			<h3 id="barcode">None</h3>
							   		</div>
							   		<div class="col-md-6" style="margin-top: 2em;">
							   			<h4>Account Name:</h4>
							   			<h3 id="name">None</h3>
							   		</div>
							   		<div class="col-md-6" style="margin-top: 2em;">
							   			<h4>Contact No:</h4>
							   			<h3 id="contact_number">None</h3>
							   		</div>
							   		<div class="col-md-6" style="margin-top: 2em;">
							   			<h4>Email:</h4>
							   			<h3 id="email">None</h3>
							   		</div>
							   		<div class="col-md-12" style="margin-top: 2em;">
							   			<h4>Facebook Link:</h4>
							   			<h3 id="facebook_link">None</h3>
							   		</div>
							   		<!-- <div class="col-md-12" style="margin-top: 2em;">
							   			<h4>Actions</h4>
							   			<hr>
							   		</div> -->
							   		<div class="col-md-12" style="margin-top: 2em;">
							   			<div class="profile-userbuttons">

							   				<button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#add-points">Add Points</button>

											<!-- Add Points Modal -->
											<div id="add-points" class="modal fade" role="dialog">
											  <div class="modal-dialog">

											    <!-- Modal content-->
											    <div class="modal-content">
											      <div class="modal-header">
											        <button type="button" class="close" data-dismiss="modal">&times;</button>
											        <h4 class="modal-title">Add Points</h4>
											      </div>
											      <div class="modal-body">
								                    <div class="form-group">
								                        <input id="add-point" value='' placeholder="0" type="text" class="form-control" />
								                    </div>
											      </div>
											      <div class="modal-footer">
											      	<button type="button" class="btn btn-success btn-sm button-add-points-modal">Add</button>
											        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
											      </div>
											    </div>

											  </div>
											</div>

							   				<!-- <button type="button" class="btn btn-success btn-sm">Add Points</button> -->
							   				<!-- <button type="button" class="btn btn-danger btn-sm">Subtract Points</button> -->

											<!-- <button type="button" class="btn btn-warning btn-sm">Transfer Points</button> -->
											<button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#transfer-points">Transfer Points</button>

											<!-- Transfer Points Modal -->
											<div id="transfer-points" class="modal fade" role="dialog">
											  <div class="modal-dialog">

											    <!-- Modal content-->
											    <div class="modal-content">
											      <div class="modal-header">
											        <button type="button" class="close" data-dismiss="modal">&times;</button>
											        <h4 class="modal-title">Transfer Points</h4>
											      </div>
											      <div class="modal-body">
											       	<div class="form-group ">
								                        <input id="transfer-barcode" value='' placeholder="Account ID" type="text" class="form-control text-firstname" />
								                    </div>
								                    <div class="form-group">
								                        <input id="transfer-point" value='' placeholder="0" type="text" class="form-control text-lastname" />
								                    </div>
											      </div>
											      <div class="modal-footer">
											      	<button type="button" class="btn btn-warning btn-sm button-transfer-points-modal">Transfer</button>
											        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
											      </div>
											    </div>

											  </div>
											</div>


										</div>
							   		</div>
							   </div>
				            </div>
						</div>
					<!-- </div> -->

					<!-- https://bootsnipp.com/snippets/featured/user-profile-sidebar -->
			</div>
		</div>
		<!-- <div class="row text-center">
			<div class="col-md-12">
				<span style="font-size: 10px;">Made with love by Jessie Calipara Jamola & Vince Kobe Cacar</span>
			</div>
			<div class="col-md-12">
				<span style="font-size: 10px;">Project-IB 2017</span>
			</div>
		</div> -->
	</div>


	<?php include_once('views/partials/footer.php'); ?>


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
	<script type="text/javascript" src="assets/js/function.js"></script>
	<script type="text/javascript" src="assets/js/main.js"></script>
	<script type="text/javascript">setScanner();</script>
</body>
</html>