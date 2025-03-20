const nowSpan = document.getElementById('nowtime');
const timeTable = document.getElementById('timetable').getElementsByTagName('tbody');
const offset = parseInt(new Date().getTimezoneOffset() / -60);
let userId;
let tornApiObj = new tornApi("user");
        

function loadLocal() {
    userId = localStorage.getItem("uid");
    if (userId === undefined) {
        return;
    }
    document.getElementById("userid").value = userId;
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
    localStorage.setItem("uid", userId);
    let timeData = new Array();
    timeData['uid'] = userId;
    timeData['times'] = new Array();
    for (i=0; i<=23; i++) {
        nextId = "checkhour" + i;
        nextCheck = document.getElementById(nextId)
        if (nextCheck.checked == true) {
            timeData['times'].push(nextCheck.value);
            localStorage.setItem(nextId,nextCheck.value);
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
            document.getElementById('userid').value = userId;
            localStorage.setItem("uid", userId);
        }
        else {
            alert("Error: your key must be very wrong result in an invalid URL. Ensure it is copied from your API key settings in Torn.");
        }
    });
}


function updateTime() {
    nowSpan.innerHTML = new Date();
}


function stopTimeUpdate() {
    clearInterval(timeUpdater);
}


function fillTimeTable() {
    for (let i=0; i<=23; i++) {
        let row = timeTable[0].getElementsByTagName('tr')[i];
        let cell = row.getElementsByTagName('td')[1];
        let localHour = (i+offset) % 24;
        cell.innerHTML = ('00'+ localHour).slice(-2) + ":00";
    }
}

updateTime();
const timeUpdater = setInterval(updateTime, 1000);
fillTimeTable();
loadLocal();
