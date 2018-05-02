<?php
	@session_start();
	if(isset($_SESSION['user_id'])) {
		echo '<script>window.location.assign("customer-information.php");</script>';
	}
?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8"/>
	<title>Project-IB</title>
	<meta name="robots" content="index, follow"/>
    <meta name="keywords" content="audio visualization javascript html"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300" rel="stylesheet" type="text/css">

     <link rel="stylesheet" type="text/css" href="assets/css/login.css" />
    <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.css" />


    <script src="assets/js/jquery.min.js"></script>
</head>
<body>
	<div class="vertical-center">
		<div class="container">
			<!-- <div class="row">
				<div class="col-md-4"></div>
				<div class="col-md-4">
					<h1>Project-IB</h1>
				</div>
			</div> -->
			<div class="row">
				<div class="col-md-4"></div>
		        <div class="col-md-4">

		        	<div class="well login-box text-left">
		        	<div class="row">
		        		<div class="col-md-12">
		        			<h3>Login</h3>
							<br>
		        		</div>
						<div class="col-md-12">
							
				                <!-- <form action=""> -->
				                    <!-- <legend>Administrator</legend> -->

				                    <div class="form-group error">
									    <div class="alert alert-danger fade in">

									        <!-- <a href="#" class="close" data-dismiss="alert">&times;</a> -->

									        <strong>Error:</strong> Invalid username or password.

									    </div>
								    </div>

				                    <div class="form-group">
				                        <!-- <label for="username-email">Username</label> -->
				                        <input id="username" value='' placeholder="Username" type="text" class="form-control text-username" />
				                    </div>
				                    <div class="form-group">
				                        <!-- <label for="password">Password</label> -->
				                        <input id="password" value='' placeholder="Password" type="password" class="form-control text-password" />
				                    </div>
				                    <div class="form-group text-right">
				                   		 <!-- <a href="signup.php"><button class="btn btn-danger btn-cancel-action">Sign Up</button></a> -->
				                   		 <!-- <a href="signup.php"><span style="font-size: 13px;">Create new account?</span></a> -->
				                        <button class="btn btn-success btn-cancel-action button-login">Log In</button>
				                        <!-- <input type="submit" class="btn btn-success btn-login-submit" value="Log In" /> -->
				                    </div>
				                <!-- </form> -->
				            </div>
						</div>
					</div>
		            
		        </div>
		    </div>
		    <div class="row">
				<!-- <div class="col-md-4"></div> -->
				<div class="col-md-12">
					<span style="font-size: 10px;">Made with love by Jessie Calipara Jamola & Vince Kobe Cacar</span>
				</div>
				<div class="col-md-12">
					<span style="font-size: 10px;">Project-IB 2017</span>
				</div>
			</div>
			<!-- https://bootsnipp.com/snippets/featured/application-login -->
		</div>
	</div>
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
</body>
</html>