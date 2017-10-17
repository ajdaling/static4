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