
// setScanner();
// showHistory();
// showReward();

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

$('.button-add-account-modal').click(function () {
	addAdmin($('#add-account input#lastname').val(), $('#add-account input#firstname').val(), $('#add-account input#username').val(), $('#add-account input#password').val());
});

$('.button-create-user-modal').click(function () {
	createNewUser($('h2#new_barcode').text());
});

$('.button-add-points-modal').click(function () {
	addPoint($('h3#barcode').text(), $('input#add-point').val());
});

$('.button-add-rewards-modal').click(function () {
	addReward($('input#reward-name').val(), $('input#reward-point').val());
});

$('.button-transfer-points-modal').click(function () {
	transferPoint($('h3#barcode').text(), $('input#transfer-barcode').val(), $('input#transfer-point').val());
	// console.log($('h3#barcode').text());
	// console.log($('input#transfer-barcode').val());
	// console.log($('input#transfer-point').val());

});

// $('.button-delete-rewards').click(function () {
// 	var div_id = $(this).closest('tr').find('.reward_item').attr('id');
// 	console.log(div_id);
// });

