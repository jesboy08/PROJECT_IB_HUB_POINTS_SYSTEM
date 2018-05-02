function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function queryResult() {
    var response = httpGet('https://graph.facebook.com/Mochablogger/posts?since=1%20hour%20ago&fields=id%2Cmessage%2Ccreated_time&access_token=EAAZAMCJOUIUkBACI4Wz8GdatCgwIOHEixofXWDVYkltpZBhu70zZC17hUe67Agy45dfTW3oyO5ZBuiDKmoEfK9PezXvOjsQyrN92x9Hsy8WcsqCPtZAFCMitdRMczHw3wsZAIkO1tHeL4SNrolzamkruZBGOungCNcZD&__mref=message_bubble');
        
    var responseToLowerCase = response.toLowerCase();
        
    var keywords = [];
    keywords.push("class suspended");
    keywords.push("class suspension");    
    keywords.push("no class");
    keywords.push("walang pasok"); 
    keywords.push("walangpasok");
    keywords.push("#walangpasok"); 
    keywords.push("class cancellation"); 
    keywords.push("class cancellations");  
    keywords.push("class and work suspension");
    keywords.push("cancellation of classes");
    keywords.push("suspension of classes");
    keywords.push("suspension of classes");
    keywords.push("classes have been suspended");

    // keywords.push("");

    $(keywords).each(function( index, keys ) {
        var keysToLowerCase = keys.toLowerCase();
        if (responseToLowerCase.includes(keysToLowerCase)) {
            $("body").css('background', '#ea4335');
            $('.result').html('Walang Pasok!');
        } else {
            $("body").css('background', '#2990ff');
            $('.result').html('May Pasok!');
        }
    }); 
}