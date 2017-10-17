var poolData = {
  UserPoolId : "us-east-2_3SDTPlWJK",
  ClientId : "3hfq28ql5duhp53sdt6dagrr6s"
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

var cogUser = userPool.getCurrentUser();
console.log(cogUser);

$("#results").text("Hello, " + cogUser.username);

$.ajax({
  url:"http://68.68.26.91:8504/",
  success:function(data){
    alert('ajax success');
    console.log(data);
    $("#results2").text(JSON.stringify(data));
  }
});
  var params = {};
  // username = $("#username").val();
  var username = "ajdaling";
  // password = $("#password").val();
  var password = "88weruio";
  if(username){
    params.username = username;
  }
  if(password){
    params.password = password;
  }
  $.ajax({
    type: "GET",
    xhrFields: { withCredentials: true },
      crossDomain: true,
    url: "https://marklogic.superhindex.com:8501/login/login.sjs",
    data: params,
    success: function(data){
      console.log(data);
      if(data == "true"){
        alert("ml login worked");
        $("#results3").text("logged into ML");
        // sessionData.username = username;
        // sessionData.start_year = "1980";
        // sessionData.end_year = "2017";
        // updateSessionData(sessionData);
        // window.location.href = "dashboard.html";
      } else{
        alert("login 1 failed");
        // invalidLogin();
      }
    },
    error: function(data){
      alert("failed login to ML");
      // invalidLogin();
    }
  });