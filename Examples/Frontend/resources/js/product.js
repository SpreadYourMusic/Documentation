var DEFAULT_PRODUCT = "<table class=\"table table-bordered\"><tr><th rowspan=\"4\" width=\"10%\" class=\"text-center\"><img src=\"/resources/imgs/user.png\" alt=\"User logo\" width=\"75%\" height=\"75%\" max-height=\"100px\" max-width=\"100px\" /></br><span>{USERNAME}</span></th><th>{TITLE}</th></tr><tr><td rowspan=\"9\">{COMMENT}</td></tr><tr></tr><tr></tr><tr><td rowspan=\"4\" class=\"text-center\"><div id=\"bars\"><div id=\"public_rate\" class=\"bar\" data-percent=\"{RATING}\"><canvas class=\"bar-circle\" width=\"75%\" height=\"75%\"></canvas></div></div></td></tr><tr></tr><tr></tr><tr></tr><tr><td class=\"text-center\">{DATE}</td></tr><tr><td ></td></tr></table>";

function load_product_callback(data, textStatus, jqXHR){
  var product = data["product"];
  
  document.getElementById("product_name").innerHTML = product["name"];
  document.getElementById("product_description").innerHTML = product["description"];
  document.getElementById("product_rate").setAttribute("data-percent", product["public_rate"] * 10);
  var product_tags = document.getElementById("product_tags");
  product_tags.innerHTML = "";

  var tags = product["tags"];
  var length = tags.length;
  
  for(var i = 0; i < length; i++){
    product_tags.innerHTML += "<span class=\"label label-default\">"+tags[i]+"</span>&nbsp;";
  }
  
  performAsyncGetRequest("/products/"+product['id']+"/comments", load_product_comments_callback);
}

function load_product(pId){
  performAsyncGetRequest("/products/"+pId+"", load_product_callback);
}

function load_product_comments_callback(product_comments, textStatus, jqXHR){
  var comments = product_comments["comments"];
  var count = product_comments["number"];
  
  var div = document.getElementById("product_comments");
  div.innerHTML = "";
  
  for(var i = 0; i < count; i++){
    var comment = comments[i];
    var parsedContent = DEFAULT_PRODUCT.replace("{USERNAME}", comment["user"]);
    parsedContent = parsedContent.replace("{TITLE}", comment["title"]);
    parsedContent = parsedContent.replace("{COMMENT}", comment["text"]);
    parsedContent = parsedContent.replace("{RATING}", comment["rate"]*10);
    parsedContent = parsedContent.replace("{DATE}", "17/11/2017");
    div.innerHTML += parsedContent;
  }
  
  bars_content();
}