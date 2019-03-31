$(document).ready(function () {
    var articles1 = $('.articles1');
    var articles2 = $('.articles2');
    var articles3 = $('.articles3');
    var input = $('input');
    var button = $('button');
    var toSearch = '';

var url = "https://query.wikidata.org/sparql";
//var query = "SELECT ?verb WHERE {wd:Q55 ?verb wd:Q727}";



$('#search').click(function (e) {
    articles1.empty();
    var search = $('#person').val();
    //search += ' + Born';
    console.log(search);
    var query = 'SELECT distinct ?image ?item ?itemLabel ?itemDescription ?DR ?RIP WHERE {?item wdt:P31 wd:Q5. ?item ?label "' + search + '"@en. OPTIONAL{?item wdt:P569 ?DR .} OPTIONAL{?item wdt:P570 ?RIP .} OPTIONAL{?item wdt:P18 ?image .} SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }  }';
    console.log(query);
    var queryUrl = encodeURI(url + "?query=" + query);
    $.ajax({
        dataType: "json",
        url: queryUrl,
        success: function (data) {
            //console.log(data);            
            var results = data.results.bindings;
            if (results.length > 0) {
                console.log(results);
                console.log(results[0].itemLabel.value);
                console.log(results[0].DR);
                console.log(results[0].RIP);
                
                for (var i = 0; i < results.length; i++) {
                    if (typeof (results[i].image) != 'undefined') {
                        var image = '<img class="inline" src=' + results[i].image.value + ' height="100">';
                        articles1.append(image);
                        articles1.append('<br>');
                    }
                    articles1.append(results[i].itemLabel.value);
                    articles1.append('<br>');
                    if (typeof (results[i].DR) != 'undefined') {
                        var dr = new Date(results[i].DR.value);                    
                        articles1.append(dr.getFullYear());
                        if (typeof (results[i].RIP) != 'undefined') {
                            var rip = new Date(results[i].RIP.value);
                            articles1.append(' - ');
                            articles1.append(rip.getFullYear());
                        }
                        articles1.append('<br>');
                    }
                    if (typeof (results[i].itemDescription) != 'undefined') {
                        articles1.append(results[i].itemDescription.value);
                    }
                    articles1.append('<br><br>');
                    //articles2.append(results[i].itemLabel.value);
                    //articles3.append(results[i].itemLabel.value);
                }
            }
            else {
                articles1.append("Sorry, no results");
            }
        },
        error: function (textStatus, errorThrown) {
            articles1.append("Sorry, no service");
        },
        timeout: 3000
    });
})

$('#person').keypress(function (e) {
    if (e.which == 13) {//Enter key pressed
        $('#search').click();
    }
});
})