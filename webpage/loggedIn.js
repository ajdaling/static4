var poolData = {
  UserPoolId : "us-east-2_3SDTPlWJK",
  ClientId : "3hfq28ql5duhp53sdt6dagrr6s"
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

var cogUser = userPool.getCurrentUser();
console.log(cogUser);

$("#results").text("Hello, " + cogUser.username);