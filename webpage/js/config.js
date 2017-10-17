var docTypes = [];
var docTypeValues = ["PATENT","PUBMED","NIH","NSF","SBIR","CLINICALTRIALS","TRACXN","DTIC","IEEE"];
var docTypeLabels = ["PATENT","PUBMED","NIH","NSF","SBIR","CLINICAL TRIALS","VC DATA","DTIC","IEEE"];
for(var i in docTypeLabels){
	var tmp = {};
	tmp.label = docTypeLabels[i];
	tmp.value = docTypeValues[i];
	tmp.active = true;
	tmp.index = i;
	docTypes.push(tmp);
}
var version = "SuperH Index - v. Tachyon.1.11";
var updates = [
	"New enhanced interface for filtering your search from any page.",
	"The Search Results page tables can now be used to explore/filter your results.",
	"Filters, settings, and saved sessions menus available on every page.",
];
primaryColor =  " #293973 ";
secondaryColor = " #F2752E ";

var mainHost, mainPort, sessionHost, sessionPort, urlStart, apiPort;
var rootURL;
var currentURL = window.location.href;
if(currentURL.indexOf("https://superhindex.com") != -1){
	rootURL = "https://superhindex.com/fsp";
	mainHost = "marklogic.superhindex.com";
	mainPort = "8501";
	mainPyPort = "8505";
	sessionHost = mainHost;
	sessionPort = "8010";
   apiPort = "8504";
	urlStart = "https://";
} else if(currentURL.indexOf("localhost:8010") != -1){
	rootURL = "http://localhost:8010";
	mainHost = "68.68.26.90";
	mainPort = "8503";
	mainPyPort = "8505";
	sessionHost = mainHost;
	sessionPort = "8100";
   apiPort = "8504";
	urlStart = "http://";
}else if(currentURL.indexOf("68.68.26.91:8010") != -1){
	rootURL = "http://68.68.26.91:8010";
	mainHost = "68.68.26.91";
	mainPort = "8501";
	mainPyPort = "8505";
	sessionHost = "68.68.26.90";
	sessionPort = "8100";
   apiPort = "8504";
	urlStart = "http://";
}else if(currentURL.indexOf("68.68.26.91:8504") != -1){
	rootURL = "http://68.68.26.91:8504";
	mainHost = "68.68.26.91";
	mainPort = "8501";
	mainPyPort = "8505";
	sessionHost = "68.68.26.90";
	sessionPort = "8100";
   apiPort = "8504";
	urlStart = "http://";
}else if(currentURL.indexOf("localhost:8009") != -1){
	rootURL = "http://localhost:8009";
	mainHost = "68.68.26.91";
	mainPort = "8501";
	mainPyPort = "8505";
	sessionHost = "68.68.26.90";
	sessionPort = "8100";
   apiPort = "8504";
	urlStart = "http://";}
else if(currentURL.indexOf("localhost:8011") != -1){
	rootURL = "http://localhost:8011";
	mainHost = "68.68.26.91";
	mainPort = "8501";
	mainPyPort = "8505";
	sessionHost = "68.68.26.90";
	sessionPort = "8100";
   apiPort = "8504";
	urlStart = "http://";
}
var sessionData = getSessionData();
console.log("looking for ieee");
var hasieee = false;
sessionData.docTypes.forEach(function(typ){
	if(typ.label === "IEEE"){
		hasieee = true;
	}
})
if(!hasieee){
	console.log("adding ieee");
	sessionData.docTypes.push({
		"active":true,"label":"IEEE","value":"ieee","index":sessionData.docTypes.length
	});
	updateSessionData(sessionData);
}
$("#nav-session-title").text(sessionData.sessionID);

$("#version-text").text(version);

if(sessionData.username == "Janet" || sessionData.username == "hughes" || sessionData.username == "ajdaling"){
        d3.select(".dropdown-user").append("li").append("a").attr("href","https://superhindex.com/test/CEAD/BioHealth/").attr("target","_blank")
        .attr("id","cead-link").text("CEAD Tool");
}

function getSessionData(){
	console.log("Gettings session data");
	if(localStorage.sessionData){
		sessionData = JSON.parse(localStorage.sessionData);
	} else{
		var sessionData = {};
		sessionData.start_year = 1980;
		sessionData.end_year = 2017;
		updateSessionData(sessionData);
	}
	var docTypes = [];
	var docTypeValues = ["PATENT","PUBMED","NIH","NSF","SBIR","CLINICALTRIALS","TRACXN","DTIC","IEEE"];
	var docTypeLabels = ["PATENT","PUBMED","NIH","NSF","SBIR","CLINICAL TRIALS","VC DATA","DTIC","IEEE"]
	for(var i in docTypeLabels){
		var tmp = {};
		tmp.label = docTypeLabels[i];
		tmp.value = docTypeValues[i];
		tmp.active = true;
		tmp.index = i;
		docTypes.push(tmp);
	}

	if(!sessionData.topics){
		sessionData.topics = [];
//		sessionData.topics = [{label:"Other",value:"Other",active:true,index:0}];
	}

	if(!sessionData.institutions){
		sessionData.institutions = [];
//		sessionData.institutions = [{label:"other",value:"other",active:true,index:0}];
	}
	else{
		sessionData.institutions = reIndex(sessionData.institutions);
		for(var i in sessionData.institutions){
			if(sessionData.institutions[i].temp){
				delete sessionData.institutions[i];
			}
		}
	}

	if(!sessionData.institutionsAdded){
		sessionData.institutionsAdded = [];
	}

	if(!sessionData.researchers){
		sessionData.researchers = [];
//		sessionData.researchers = [{label:"other",value:"other",active:true,index:0}];
	}

	if(!sessionData.researchersAdded){
		sessionData.researchersAdded = [];
	}

	if(!sessionData.start_year) sessionData.start_year = 1980;
	if(!sessionData.end_year) sessionData.end_year = 2017;
	if(!sessionData.topics) sessionData.topics = [];
	if(!sessionData.researchers) sessionData.researchers = [];
	if(!sessionData.institutions) sessionData.institutions = [];
	if(!sessionData.meshList) sessionData.meshList = [];
	if(!sessionData.docTypes) sessionData.docTypes = docTypes;
	updateSessionData(sessionData);

	var sd = JSON.parse(localStorage.getItem("sessionData"));
	return(sd);
}

var config = {
		host: mainHost,
		port : mainPort,
		pyport : mainPyPort,
		apiport: apiPort,
		session:{
			host: sessionHost,
			port: sessionPort,
		},
		rootURL : rootURL,
		homeLink :  "../../client_side/home/dashboard.html",
		newSearchLink :  "../../client_side/newSearch/newSearch.html",
		loginLink :  "../../client_side/home/login.html",
		docMasterLink :  "../../client_side/docMaster/docMaster.html",
		visualizationLink :  "../../client_side/newviz/vizDemo2.html",
		reportLink :  "../../client_side/report/reportPageCombined.html",
		docIndexURL:  "../../client_side/docIndex/docIndex.html",
		institutionLink :  "../../client_side/institution/instData.html",
		researcherLink : "../../client_side/researcher/resData.html",
		clusterLink :  "../../client_side/institution/clusterControl.html",
		fdaLink : "../../client_side/fda/fda.html",
};




config.sessionURL = urlStart+config.session.host+":"+config.session.port;
config.dataURL =  urlStart+config.host+":"+config.port;
config.pydataURL =  urlStart+config.host+":"+config.pyport;
config.apiURL =  urlStart+config.host+":"+config.apiport;
console.log("config val");
console.log(config);

$(".home-link").attr("href",config.homeLink);
$(".newSearch-link").attr("href",config.newSearchLink);
$(".login-link").attr("href",config.loginLink);
$(".results-link").attr("href",config.docMasterLink);
//$(".visualization-link").attr("href",config.visualizationLink);
$(".visualization-link").click(function(){
	var sessionData = JSON.parse(localStorage.getItem("sessionData"));
	if(sessionData.docData){
		delete sessionData.docData;
	}
	updateSessionData(sessionData);
	window.location.href = config.visualizationLink;
});
$(".report-link").attr("href",config.reportLink);
$(".save-link").on("click",function(){
//	saveSession();
	toggleSessions();

});

$(".cluster-link").attr("href",config.clusterLink).css("cursor","pointer");

getUsername();

function updateSessionData(sessionData){
	var hasDTIC = false;
	if(!sessionData.docTypes){
		sessionData.docTypes = docTypes;
	}
	for(var i in sessionData.docTypes){
		if(sessionData.docTypes[i].label === "DTIC"){
			hasDTIC = true;
		}
	}
	if(!hasDTIC){
		sessionData.docTypes.push({label:"DTIC",value:"DTIC",active:true,index:String(sessionData.docTypes.length)});
	}
	window.localStorage.setItem("sessionData",JSON.stringify(sessionData));
}
function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

function clickInst(element,event){
	var sessionData = JSON.parse(localStorage.getItem("sessionData"));
	event.preventDefault();
	if(sessionData.docData){
		delete sessionData.docData;
	}
	if(!sessionData.instData){
		sessionData.instData = {};
		sessionData.instData.start_year = sessionData.start_year;
		sessionData.instData.end_year = sessionData.end_year;
	}
	sessionData.instData.compName = element.id;
	updateSessionData(sessionData);
	window.location.href = config.institutionLink;
//	openInNewTab(config.institutionLink);
}

function clickRes(element,event){
	var sessionData = JSON.parse(localStorage.getItem("sessionData"));
	event.preventDefault();
	if(sessionData.docData){
		delete sessionData.docData;
	}
	if(!sessionData.resData){
		sessionData.resData = {};
	}
	sessionData.resData.resName = element.id;
	updateSessionData(sessionData);
//	window.location.href = config.researcherLink;
	openInNewTab(config.researcherLink);
}

function clickDoc(element,event){
	event.preventDefault();
	var sessionData = JSON.parse(localStorage.getItem("sessionData"));

	if(!sessionData.docData){
		sessionData.docData = {};
		sessionData.docData.start_year = sessionData.start_year;
		sessionData.docData.end_year = sessionData.end_year;
	}
	sessionData.docData.docURI = element.className;
	sessionData.docData.docURL = element.id;
	updateSessionData(sessionData);
	window.location.href = config.docIndexURL;

}
function clickFDA(element,event){
	var sessionData = JSON.parse(localStorage.getItem("sessionData"));
	event.preventDefault();
	if(sessionData.docData){
		delete sessionData.docData;
	}
	if(!sessionData.instData){
		sessionData.instData = {};
		sessionData.instData.start_year = sessionData.start_year;
		sessionData.instData.end_year = sessionData.end_year;
	}
	if(!sessionData.fdaData){
		sessionData.fdaData = {};
	}
	console.log(element.id);
	sessionData.fdaData.compName = element.id;
	updateSessionData(sessionData);
	window.location.href = config.fdaLink;
}
function getUsername(){
	//mostly just a check to see if this is working, should be done via localStorage or cookie.
	var username;
	$.ajax({
		type: "GET",
		xhrFields: { withCredentials: true },
	    crossDomain: true,
		url: config.dataURL+"/lib/getUsername.sjs",
		success: function(data){
			if(data == "basic-user" && (window.location.href !== config.rootURL + "/client_side/home/login.html")){
				alert(config.rootURL+"/client_side/home/login.html");
				alert("Session expired, returning to login.")
				window.location.href = config.loginLink;
			}
			username  = data;
			//$("#jumbo-title").text("Welcome, " + data + ".");
			var sessionData = JSON.parse(localStorage.getItem("sessionData"));
			sessionData.username = data;
			$(".username-text").html(username);
			updateSessionData(sessionData);
		},
		error: function(data){
			alert("get username failed.");
		}
	});


	//the right way to do it, username initially set through login
//	$("#jumbo-title").text("Welcome, " + sessionData.username);
	//$("#jumbo-text").text("This is your dashboard. Check below to see your saved sessions.");

}


function saveSession(){
//	if(window.location.href == config.rootURL + "/client_side/home/dashboard.html"){
//		//save annotations first
//		saveAnnotations();
//	}
	//get session names
	var ajaxData = {};
	ajaxData.username = sessionData.username;
	var sessionNames = [];
	$.ajax({
		url: config.dataURL + "/sessions/getSessionsRequest.sjs",
		type: "GET",
		xhrFields: { withCredentials: true },
		contentType: "application/json",
	    crossDomain: true,
	    data: JSON.stringify(ajaxData),
		success: function(retdata){
			var data2 = [];
			if(retdata){
				var ret = [];
				if(Array.isArray(retdata)){
					data2 = retdata;
				} else{
					data2.push(retdata);
				}
				for(var ses in data2){
					sessionNames.push(data2[ses].sessionID);
				}
			}
			saveSession2(sessionNames);
		},
		error: function() {
			alert("error getting session ID's");
		}
	});
}

function saveSession2(sessionNames){
	event.preventDefault();
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){
	    dd='0'+dd;
	}
	if(mm<10){
	    mm='0'+mm;
	}
	var today2 = mm+'-'+dd+'-'+yyyy;
	var date = new Date();
	//Hours part from the timestamp
	var hours = date.getHours();
	//Minutes part from the timestamp
	var minutes = "0" + date.getMinutes();
	//Seconds part from the timestamp
	var seconds = "0" + date.getSeconds();

	//Will display time in 10:30:23 format
	var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	var write = false;
	var nameLoop = true;
	var timestamp = today;
	var timestampLabel = today + ' ' + formattedTime;
	//prompt for sessionID first time
	var searchName = sessionData.sessionID;
	//ask to overwrite
	if(sessionNames.indexOf(searchName) !== -1){
		write = confirm("Session already exists. Overwrite?");
	} else{
		write = true;
	}
	if(write){
		if (searchName == null || searchName == "") {
			   searchName = today2 + " (" + formattedTime + ")";
			}
		sessionData.searchName = searchName;
		sessionData.sessionID = searchName;
		sessionData.timestamp = timestamp;
		updateSessionData(sessionData);
		//will overwrite if id is the same
		$.ajax({
			url: "https://marklogic.superhindex.com:8010/sessions/saveSession.sjs",
			type: "POST",
//				xhrFields: { withCredentials: true },
			contentType: "application/json",
//			    crossDomain: true,
		    data: JSON.stringify(sessionData),
			success: function(retdata){
				alert("saved");
			},
			error: function(retdata) {
				alert("error");
			}
		});

//		sessionData.searchName = searchName;
//		sessionData.sessionID = searchName;
//		sessionData.timestamp = timestamp;
//		//will overwrite if id is the same
//		$.ajax({
//			url: config.dataURL + "/sessions/saveSessionRequest.sjs",
//			type: "GET",
//			xhrFields: { withCredentials: true },
//			contentType: "application/json",
//		    crossDomain: true,
//		    data: JSON.stringify(sessionData),
//			success: function(retdata){
//				alert("saved");
//			},
//			error: function() {
//				alert("error");
//			}
//		});
	}else{
		alert("Cancelled");
	}
}

//given an array of objects, clears out all null objects and resets indices
function reIndex(obj){
	var tmpObj = [];
	for(var i in obj){
		if(obj[i]!==null){
			tmpObj.push(obj[i]);
		}
	}
	return(tmpObj);
}
getSettings();
function getSettings(){
	console.log("getting settings");
	var ajaxParams = JSON.parse(JSON.stringify(sessionData));
	if(ajaxParams.repData) delete ajaxParams.repData;
	$.ajax({
	      type: "GET",
	      crossDomain: true,
	      xhrFields: {
	    	  withCredentials: true,
	      },
	      url: config.dataURL+"/sessions/getUserSettingsRequest.sjs",
	      data: JSON.stringify(ajaxParams),

	      success: function(data){
	    	  console.log("got settings");
	    	  console.log(data);
	    	  config.settings = data;
	      }
	    })
}

function ajaxify(sd){
	return(JSON.stringify(sd.instData.compName.replace(/&/g,"%26")));
}
