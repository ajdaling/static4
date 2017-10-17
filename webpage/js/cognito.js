$("#login-button").on("click",function(){

  var authenticationData = {
  Username: $("#username").val(),
  Password: $("#password").val(),
  };
  var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
  var poolData = {
    UserPoolId : "us-east-2_3SDTPlWJK",
    ClientId : "3hfq28ql5duhp53sdt6dagrr6s"
  };
  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
  var userData = {
    Username: "ajdaling",
    Pool: userPool
  };
  var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails,{
    onSuccess: function(result){
      console.log("access token " + result.getAccessToken().getJwtToken());
      alert("worked");
      window.location.href = "./loggedIn.html"
    },
    onFailure: function(err){
      alert(err);
    },
  });
});

