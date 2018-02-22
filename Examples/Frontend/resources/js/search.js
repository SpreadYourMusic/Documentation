var DEFAULT_SEARCH_PRODUCT = "<div class=\"row\">\n" +
    "                <div class=\"container-fluid\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <table class=\"table table-bordered\">\n" +
    "                            <tbody>\n" +
    "                            <tr>\n" +
    "                                <th rowspan=\"4\" width=\"10%\" class=\"text-center\">\n" +
    "                                    <img src=\"/resources/imgs/user.png\" alt=\"User logo\" width=\"75%\" height=\"75%\"\n" +
    "                                         max-height=\"100px\"\n" +
    "                                         max-width=\"100px\"/><br/>\n" +
    "                                    <span>{USERNAME}</span>\n" +
    "                                </th>\n" +
    "                                <th>{TITLE}</th>\n" +
    "                            </tr>\n" +
    "                            <tr>\n" +
    "                                <td rowspan=\"9\">{COMMENT}</td>\n" +
    "                            </tr>\n" +
    "                            <tr></tr>\n" +
    "                            <tr></tr>\n" +
    "                            <tr>\n" +
    "                                <td rowspan=\"4\" class=\"text-center\">\n" +
    "                                    <div id=\"bars\">\n" +
    "                                        <div id=\"public_rate\" class=\"bar\" data-percent=\"{RATING}\">\n" +
    "                                            <canvas class=\"bar-circle\" width=\"75%\" height=\"75%\"></canvas>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </td>\n" +
    "                            </tr>\n" +
    "                            <tr></tr>\n" +
    "                            <tr></tr>\n" +
    "                            <tr></tr>\n" +
    "                            <tr>\n" +
    "                                <td class=\"text-center\">{DATE}</td>\n" +
    "                            </tr>\n" +
    "                            <tr>\n" +
    "                                <td></td>\n" +
    "                            </tr>\n" +
    "                            </tbody>\n" +
    "                        </table>\n" +
    "                    </div>\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-sm-offset-3 col-sm-6\">\n" +
    "                            <table id=\"vendors-{PRODUCT_ID}\" class=\"table table-bordered\">\n" +
    "                                <thead>\n" +
    "                                <tr>\n" +
    "                                    <th width=\"40%\">Vendor</th>\n" +
    "                                    <th width=\"10%\">Price</th>\n" +
    "                                    <th width=\"5%\" class=\"text-center\">Buy</th>\n" +
    "                                </tr>\n" +
    "                                </thead>\n" +
    "                                <tbody>\n" +
    "                                <tr></tr>\n" +
    "                                </tbody>\n" +
    "                            </table>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                {HEADER_LINE}\n" +
    "            </div>";

var DEFAULT_VENDOR_PRICE_HTML = "Precio total:" +
    "<div class=\"blockquote-lvl1 search-price\">" +
    "{PRICE} &euro;" +
    "</div>";

var DEFAULT_VENDOR_URL_HTML = "<a href=\"{VENDOR_URL}\"><i class=\"fa fa-shopping-cart fa-3x\" aria-hidden=\"true\"></i></a>";

$(document).ready(
    function(){
        $('#search-button').click(function(){
            var search = $('input[id="keywords-search"]').val();

            resetSearchInputs();

            if(search === "" || search.length < 3){
                if(search === "" || search.length < 3){
                    $('div[id="search-container"]').addClass("has-error");
                    $('span[id="keywords-search-icon"]').removeClass("hidden");
                }

                $('div[id=search-loading-icon]').addClass('hidden');
            }else{
                performAsyncGetRequest("/products/search/?keywords=" + search, search_callback);
            }
        });

        $('#reset-search-button').click(function(){
            $('input[id="keywords-search"]').innerHTML = "";
            resetSearchInputs();
            $('div[id=search-loading-icon]').addClass('hidden');
        });

        /*
        $.getScript("/resources/js/request.js")
          .done(function( script, textStatus ) {
            console.log( "Dinamically loaded requests" );
          })
          .fail(function( jqxhr, settings, exception ) {
            console.log( jqxhr );
            console.log( settings );
            console.log( exception );
            $( "div.log" ).text( "Triggered ajaxError handler." );
          });*/
    }
);

function resetSearchInputs(){
    $('div[id="search-container"]').removeClass("has-error");
    $('span[id="keywords-search-icon"]').addClass("hidden");

    var alert =$('div[id=search-alert]');
    alert.removeClass("alert-danger");
    alert.removeClass("alert-success");
    alert.addClass("hidden");
    $('div[id=search-loading-icon]').removeClass('hidden');
}

function getProductPricesFor(map, id){
    var mapValue = map.get(id);
    if(mapValue === undefined){
        mapValue = performSyncGetRequest("/products/" + id + "/vendors/");
        map.set(id, mapValue);
    }

    return mapValue;
}

function search_callback(product_search, textStatus, jqXHR){
    console.log(product_search);
    var products = product_search["products"];
    var amount = product_search['number'];

    var div = document.getElementById("search_result");
    div.innerHTML = "";

    var alert = $('div[id=search-alert]');
    alert.removeClass("hidden");
    $('div[id=search-loading-icon]').addClass('hidden');

    var map = new Map();

    for(var i = 0; i < amount; i++){
        var product = products[i];
        var product_id = product["id"];

        //var parsedContent = DEFAULT_PRODUCT.replace("{USERNAME}", product["user"]);
        var parsedContent = DEFAULT_SEARCH_PRODUCT.replace("{TITLE}", product["name"]);
        parsedContent = parsedContent.replace("{PRODUCT_ID}", product_id);
        parsedContent = parsedContent.replace("{COMMENT}", product["description"]);
        parsedContent = parsedContent.replace("{RATING}", product["public_rate"]*100);
        parsedContent = parsedContent.replace("{DATE}", "17/11/2017");

        if(i !== amount-1){
            parsedContent = parsedContent.replace("{HEADER_LINE}", "<hr class=\"separator\">");
        }else{
            parsedContent = parsedContent.replace("{HEADER_LINE}", "");
        }

        div.innerHTML += parsedContent;

        var prices = getProductPricesFor(map, product_id);
        var vendors = prices["vendors"];
        console.log(prices);
        var prices_amount = prices['number'];
        // https://stackoverflow.com/questions/18333427/how-to-insert-row-in-html-table-body-in-javascript
        var price_table_content = document.getElementById("vendors-" + product_id).getElementsByTagName("tbody")[0];
        for(var j = 0; j < prices_amount; j++){
            var vendor = vendors[j];
            var vendor_data = vendor["vendor"];
            var newRow = price_table_content.insertRow(-1);
            var vendor_cell = newRow.insertCell(0);
            var price_cell = newRow.insertCell(1);
            var buy_cell = newRow.insertCell(2);

            vendor_cell.setAttribute("class", "valign-middle search-vendor");
            vendor_cell.innerHTML = vendor_data["name"];

            price_cell.setAttribute("class", "valign-middle");
            price_cell.innerHTML = DEFAULT_VENDOR_PRICE_HTML.replace("{PRICE}", vendor['price'].toFixed(2));

            buy_cell.setAttribute("class", "valign-middle text-center");
            buy_cell.innerHTML = DEFAULT_VENDOR_URL_HTML.replace("{VENDOR_URL}", vendor_data['url']);
        }
    }

    bars_content();
}
