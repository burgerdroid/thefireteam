tornApiObj = new tornApi("user");

function printOut(data) {
    let table = document.getElementById('apiout').getElementsByTagName('tbody')[0];
    for (var key in data) {
        if (typeof data[key] === typeof {'1':1}) {
            var row = table.insertRow(table.rows.length);
            var cell0 = row.insertCell(0);
            cell0.className = "keyBlock"
            cell0.innerHTML = key;
            cell0.colSpan = 2;
            printOut(data[key]);
            continue;
        }
        var row = table.insertRow(table.rows.length);
        var cell0 = row.insertCell(0);
        cell0.innerHTML = key;
        var cell1 = row.insertCell(1);
        cell1.innerHTML = data[key]
    }
}


function clearTable(tid) {
    let table = document.getElementById(tid).getElementsByTagName('tbody')[0];
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}


function toggleValue(thisid) {
    if (thisid.checked) {
        tornApiObj.addSelection(thisid.value);
    }
    else if (!thisid.checked) {
        tornApiObj.removeSelection(thisid.value)
    }
    document.getElementById('selections').value = tornApiObj.selectionsToString();
}


function parseApiQuery() {
    clearTable("apiout");
    tornApiObj.setTypeID(document.getElementById('userid').value);
    tornApiObj.setApiKey(document.getElementById('apikey').value);
    tornApiObj.setApiVer(document.querySelector("input[name=apiver]:checked").value);
    let url = tornApiObj.getQueryUrl();
    document.getElementById("queryurl").innerHTML = url;
    getData(url).then(result => {
        // do things with the result here, like call functions with them
        printOut(result);
        console.log(result);
    });
}