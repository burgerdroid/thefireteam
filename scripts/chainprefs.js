const nowSpan = document.getElementById('nowtime');
const timeTable = document.getElementById('timetable').getElementsByTagName('tbody');
const offset = parseInt(new Date().getTimezoneOffset() / -60);
document.getElementById('tzoffset').value = offset;
document.getElementById('displaytzoffset').innerHTML = offset;
let userId;
let tornApiObj = new tornApi("user");
        

function loadLocal() {
    userId = localStorage.getItem("uid");
    username = localStorage.getItem("uname");
    if (userId === null || username === null) {
        return;
    }
    document.getElementById("userid").value = userId;
    document.getElementById("username").value = username;
	document.getElementById("displayuid").innerHTML = userId;
    document.getElementById("displayusername").innerHTML = username;
    document.getElementById("submitBtn").disabled = false;
    for (i=0; i<=23; i++) {
        nextId = "checkhour" + i;
        nextCheck = document.getElementById(nextId);
        if (localStorage.getItem(nextId) !== null) {
            nextCheck.checked = true;
        }
        else {
            nextCheck.checked = false;
        }
    }        
}


function saveLocal() {      
    userId = document.getElementById("userid").value;
    username = document.getElementbyId("username").value;
    localStorage.setItem("uid", userId);
    localStoreg.setItem("uname", username);
    for (i=0; i<=23; i++) {
        nextId = "checkhour" + i;
        nextCheck = document.getElementById(nextId)
        if (nextCheck.checked == true) {
            localStorage.setItem(nextId,nextCheck.value);
        }
		else if (nextCheck.checked == false) {
			localStorage.removeItem(nextId);
		}
    }
    return true;
}


function keyUpdateCheck() {
    if (document.getElementById("apikey").value == "") {
        document.getElementById('getuidbtn').disabled = true;
    }
    else {
        document.getElementById('getuidbtn').disabled = false;
    }
}

function getUserId() {
    let url = "";
    tornApiObj.setApiKey(document.getElementById('apikey').value);
    tornApiObj.setSelections(["basic"]);
    url = tornApiObj.getQueryUrl();
    getData(url).then(result => {
        if (result.error) {
            alert("Error: " + result.error.code + " - " + result.error.error);
            return;
        }
        if (result.player_id) {
			userId = result.player_id;
            username = result.name;
            document.getElementById('userid').value = userId;
			document.getElementById('username').value = username
			document.getElementById('displayuid').innerHTML = userId;
 		    document.getElementById('displayusername').innerHTML = username;
			document.getElementById('submitBtn').disabled = false;
            localStorage.setItem("uid", userId);
			localStorage.setItem("uname", username);
        }
        else {
            alert("Error: your key must be very wrong resulting in an invalid URL. Ensure it is copied from your API key settings in Torn.");
        }
    });
}


function updateTime() {
    nowSpan.innerHTML = new Date();
}


function stopTimeUpdate() {
    clearInterval(timeUpdater);
}


updateTime();
const timeUpdater = setInterval(updateTime, 1000);
loadLocal();
