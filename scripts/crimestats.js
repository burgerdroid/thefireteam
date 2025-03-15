let tornApiObj = new tornApi("faction")
let memberData = new Array();
memberData['crimeskills'] = new Array();
memberData['crimecount'] = new Array();
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
 	if (memberData['crimeskills'].length == memberCount) {
 		clearInterval(intervalObj);
 		printMembersToTable('crimeskills');
		printMembersToTable('crimecount');
 	}
 }


function clearTable(tid) {
    let table = document.getElementById(tid).getElementsByTagName('tbody')[0];
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}


function printMembersToTable(tab) {
	memberData[tab].sort(sortByLevel);
	let table = document.getElementById(tab).getElementsByTagName('tbody')[0];
    for (var r=0; r<memberData[tab].length; r++) {
    		let row = table.insertRow(table.rows.length);
			let cell = row.insertCell(0);
			cell.innerHTML = memberData[tab][r][1];
			console.log(cell.innerHTML);
			cell = row.insertCell(1);
			cell.innerHTML = memberData[tab][r].toSpliced(0,2).reduce(mathSum);
			//starting at index 2 to skip level and name
    		for (var c=2; c<memberData[tab][r].length; c++) {
    	   		cell = row.insertCell(c);
        		cell.innerHTML = memberData[tab][r][c];
        	}
     }
}


function getMemberData(data) {   
	let crimeKeys = new Array('crimeskills','crimecount');
    let crimeFields = new Array();
	crimeFields['crimeskills'] = new Array("searchforcashskill","bootleggingskill","graffitiskill",
						"shopliftingskill","pickpocketingskill","cardskimmingskill",
						"burglaryskill","hustlingskill","disposalskill",
						"crackingskill","forgeryskill","scammingskill");

	crimeFields['crimecount'] = new Array("vandalism","theft","counterfeiting","fraud","illicitservices",
						"cybercrime","extortion","illegalproduction");
    
	for (var tab in crimeKeys) {
			memberData[crimeKeys[tab]].push([]);
    		let i = memberData[crimeKeys[tab]].length - 1;
    		memberData[crimeKeys[tab]][i].push(data['level'])
    		memberData[crimeKeys[tab]][i].push(data['name'])
    		for (var j in crimeFields[crimeKeys[tab]]) {
				memberData[crimeKeys[tab]][i].push(data["personalstats"][crimeFields[crimeKeys[tab]][j]]);
    		}
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
	clearTable("crimecount");
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

