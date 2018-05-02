
setScanner();

// createBarcode();

$('.text-username').val('');
$('.text-password').val('');

$('.button-signup').click(function () {
	createAccount($('.text-username').val());
});

$('.button-login').click(function () {
	loginAccount($('.text-username').val(), $('.text-password').val());
});

$('.button-logout').click(function () {
	logoutAccount();
});

$('.button-create-user').click(function () {
	createBarcode();
});

$('.button-create-user-modal').click(function () {
	createNewUser($('h2#new_barcode').text());
});

$('.button-add-points-modal').click(function () {
	addPoint($('h3#barcode').text(), $('input#add-point').val());
});

$('.button-transfer-points-modal').click(function () {
	transferPoint($('h3#barcode').text(), $('input#transfer-barcode').val(), $('input#transfer-point').val());
	// console.log($('h3#barcode').text());
	// console.log($('input#transfer-barcode').val());
	// console.log($('input#transfer-point').val());

});

