var timer;
var waitDelay = 21;

function main() {
	var dt = new Date();
//            var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    $(".date").html( "Today is " + moment().format('MMM D, YYYY') );

    queryResult();

    timer = setInterval(updateLabel, 1000);

    // setInterval(function()
    // { 
    //     queryResult();
    // }, 5000);
}

function updateLabel() {
    if ( waitDelay <= 0 ) {
        // $('#status').text( 'assume the page finished loading and try to authenticate' );
        //clearInterval(timer);
        // location.reload();
        queryResult();

        waitDelay = 21;
    } else {
        $('.intervalSeconds').text( --waitDelay );
    }
}