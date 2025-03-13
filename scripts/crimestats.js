let tornApiObj = new tornApi("faction")
let memberData = new Array();
let memberCount = 0;
let intervalObj;
mathSum = (a,b) => a+b;

function sortByLevel(a, b) {
    if (a[0] == b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1: 1;
    }
 }


function allDataCollected() {
 	if (memberData.length == memberCount) {
 		clearInterval(intervalObj);
 		printMembersToTable();
 	}
 }


function clearTable(tid) {
    let table = document.getElementById(tid).getElementsByTagName('tbody')[0];
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}


function printMembersToTable() {
	memberData.sort(sortByLevel);
	let table = document.getElementById('crimeskills').getElementsByTagName('tbody')[0];
    
    for (var r=0; r<memberData.length; r++) {
    		let row = table.insertRow(table.rows.length);
			let cell = row.insertCell(0);
			cell.innerHTML = memberData[r][1];
			cell = row.insertCell(1);
			cell.innerHTML = memberData[r].toSpliced(0,2).reduce(mathSum);
			//starting at index 2 to skip level and name
    		for (var c=2; c<memberData[r].length; c++) {
    	   		cell = row.insertCell(c);
        		cell.innerHTML = memberData[r][c];
        	}
     }
}


function getMemberData(data) {   
    let crimeKeys = new Array("searchforcashskill","bootleggingskill","graffitiskill",
						"shopliftingskill","pickpocketingskill","cardskimmingskill",
						"burglaryskill","hustlingskill","disposalskill",
						"crackingskill","forgeryskill","scammingskill");
    memberData.push([]);
    let i = memberData.length - 1;
    memberData[i].push(data['level'])
    memberData[i].push(data['name'])
    for (var j in crimeKeys) {
    	   memberData[i].push(data["personalstats"][crimeKeys[j]]);
    }
}


function getMemberCrimeStats(data) {
	let userID = ""
	let url = ""
	tornApiObj.setQueryType("user");
	tornApiObj.setSelections(["basic", "personalstats"])

	for (userID in data) {
		memberCount += 1;
		tornApiObj.setTypeID(userID);
		url = tornApiObj.getQueryUrl();
		getData(url).then(result => {
			getMemberData(result);
		});
	}
	intervalObj = setInterval(allDataCollected, 100);
}


function getTeamCrimeStats() {
	clearTable("crimeskills");
	let apiKey = document.getElementById("apikey").value;
	tornApiObj.setQueryType("faction");
	tornApiObj.setApiVer("v1")
	tornApiObj.setApiKey(document.getElementById("apikey").value);
	tornApiObj.setSelections(["basic"]);
	let url = tornApiObj.getQueryUrl();
	getData(url).then(result => {
        getMemberCrimeStats(result['members']);
     });
}

