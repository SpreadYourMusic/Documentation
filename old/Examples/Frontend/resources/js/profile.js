function load_profile(user){
  console.log("Hey!");
  performAsyncGetRequest("/users/"+user+"/", profile_callback);
}

function profile_callback(json, textStatus, jqXHR){
  console.log("Hey!");
  var profile = json["profile"];
  var isPublic = profile["public_profile"];
  
  console.log(profile);
  
  if(isPublic){
      redirectToPage("/404.html");
  }else{
    var user = profile["user"];
    var isMailVisible = profile["mail_visible"];
    
    document.getElementById("username").innerHTML = "<h3>"+user+"</h3>";
    document.getElementById("name").innerHTML = profile["name"];
    if(isMailVisible){
      document.getElementById("mail").innerHTML = profile["mail"];
    }else{
      document.getElementById("mail").innerHTML = get_random_mail();
    }
    
    document.getElementById("public_rate").setAttribute("data-percent", profile["public_rate"] * 10);
    document.getElementById("description").innerHTML = profile["description"];
    
    
    console.log("/users/"+user+"/comments");
    performAsyncGetRequest("/users/"+user+"/comments", load_products_callback);
  }
}

function decorateNumber(num){
  return "<span style=\"color:" + get_color(num*10) + "\">" + num + "</span> / <span style=\"color:" + get_color(100) + "\">10</span>";
}

function load_products_callback(json, textStatus, jqXHR){
  var count = json["number"];
  var comments = json["comments"];
  
  var table = document.getElementById("product_table");
  
  for(var i = 0; i < count; i++){
    var comment = comments[i];
    console.log(comment);
    var product = performSyncGetRequest("/products/" + comment['id'])['product'];
    console.log(product);
    
    var row = table.insertRow(table.rows.lenght);
    var c1 = row.insertCell(0);
    var c2 = row.insertCell(1);
    var c3 = row.insertCell(2);
    var c4 = row.insertCell(3);
    
    c1.innerHTML = "17/11/2017";
    c2.innerHTML = product["name"];
    c3.innerHTML = decorateNumber(comment["rate"]);
    c4.innerHTML = comment["text"];
  }
  
  bars_content();
}

function get_random_mail(){
  return Array(get_random_value(10, 20)).join("*") + "@" + Array(get_random_value(10, 15)).join("*") + "." + Array(get_random_value(3, 5)).join("*");
}

function get_random_value(min, max){
  return Math.random() * (max - min) + min | 0;
}