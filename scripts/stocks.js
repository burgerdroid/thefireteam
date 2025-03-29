let tornApiObj = new tornApi("torn", apiVer="v1");
tornApiObj.setSelections(["stocks"]);
let tornStocks = undefined;
let userStocks = undefined;


function getTornStocks() {
    tornApiObj.setQueryType("torn");
    tornApiObj.setApiKey(document.getElementById("apikey").value);
    let url = tornApiObj.getQueryUrl();
    getData(url).then(result => {
        let tmp = JSON.stringify(result);
        tornStocks = JSON.parse(tmp);
        if (userStocks === undefined) {
            getUserStocks();
        }
        else {
            processStockData();
        }
    });
}


function getUserStocks() {
    tornApiObj.setQueryType("user");
    tornApiObj.setApiKey(document.getElementById("apikey").value);
    let url = tornApiObj.getQueryUrl();
    getData(url).then(result => {
        let tmp = JSON.stringify(result);
        userStocks = JSON.parse(tmp);
        if (tornStocks === undefined) {
            getTornStocks();
        }
        else {
            processStockData();
        }
    });
}


function moneyString(n, dPoints=2) {
	let addSpace = ""
	if (n > 0) {
		addSpace = "&nbsp;";
	}
	let moneyFormat = { style: 'currency', currency: 'USD'};
	let moneyStr = addSpace + n.toLocaleString('en-us', moneyFormat);

	if (dPoints != 0)
		return moneyStr.substring(0, moneyStr.length - (2-dPoints));
	return moneyStr.substring(0, moneyStr.length - 3);	
}


function valPlusSellFee(n) {
	return n + (n / 1000);
}


function valMinusSellFee(n) {
	return n - (n / 1000);
}


function processStockData() {
	let sellTotal = 0;
	let boughtTotal = 0;
	let data = "";
	let stocktotals = document.getElementById("stocktotals");
    let stockdetails  = document.getElementById("stockdetails");
    let err = document.getElementById("error");
	stocktotals.innerHTML = "";
	stockdetails.innerHTML = "";
    
    if (tornStocks["error"] !== undefined) {
        err.innerHTML += "Error - " + tornStocks["error"]["error"] + "<br>";
        tornStocks = undefined;
        userStocks = undefined;
        return;
    }
    if (userStocks["error"] !== undefined) {
        err.innerHTML += "Error - " + userStocks["error"]["error"] + "<br>";
        userStocks = undefined;
        tornStocks = undefined;
        return;
    }
    err.innerHTML = "";
    data +=  "<br>___________________________________________________________<br><br>";
    Object.keys(userStocks["stocks"]).forEach(function(stockID) {
        let currStock = tornStocks["stocks"][stockID]
        let bought = 0;
        let sold = 0;
		let stockCount = 0;
        data += `<div class="stockheader"><b>${currStock["name"]} [${currStock['acronym']}]</b>`;
		data += ` | Current Price: ${moneyString(currStock["current_price"])}</div><br><table class="stockhistory">`;	
        Object.keys(userStocks["stocks"][stockID]["transactions"]).forEach(function(transID) {
            let currTrans = userStocks["stocks"][stockID]["transactions"][transID];
            let transDate;
            if (currTrans["bought_price"] !== undefined) {
                bought += currTrans["shares"] * currTrans["bought_price"];
				stockCount += currTrans["shares"];
                transDate = new Date(currTrans["time_bought"]*1000).toLocaleString();
				data += `<tr><td>${transDate}</td><td>${currTrans["shares"]}</td><td>@</td>`;
				data += `<td>${moneyString(currTrans["bought_price"])}</td>`;
				data += `<td>${moneyString(currTrans["shares"] * currTrans["bought_price"])}</td></tr>`; 
				boughtTotal += currTrans["shares"] * currTrans["bought_price"];
				sellTotal += valMinusSellFee(currTrans["shares"] * currStock["current_price"]);
                stockdetails.innerHTML += data;
            }
        });
		data += `</table>Current ROI: ${moneyString(valMinusSellFee(stockCount * currStock["current_price"]) - (bought - sold))}`;
        data += "<br><br>___________________________________________________________<br><br>";
    });
	let dataTotals = "";

    dataTotals += `<table><tr><td>Total Invested</td><td>${moneyString(boughtTotal, 0)}</td></tr>`;
	dataTotals += `<tr><td>Present Sell Value</td><td>${moneyString(sellTotal, 0)}</td></tr>`;
	dataTotals += `<tr><td>Present Gain/Loss</td><td>${moneyString(sellTotal - boughtTotal,0)}</td></tr></table>`;
	stockdetails.innerHTML = data;
	stocktotals.innerHTML = dataTotals;
}
