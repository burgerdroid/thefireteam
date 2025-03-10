async function getData(url) {
    try {
        const response = await fetch(url, {})
        const parsedResponse = await response.json()
        return parsedResponse;
    } catch(error) {
        console.log(error)
    }
}

class tornApi {
    constructor(queryType, apiVer="", apiKey="", typeID="", selections=[]) {
        this.queryType = queryType;
        this.typeID = typeID;
        this.apiKey = apiKey;
        this.selections = new Set(selections);
        this.apiVer = apiVer;
    } //constructor


    setQueryType(queryType) {
        this.queryType = queryType;
    }

    setApiVer(apiVer) {
        this.apiVer = apiVer;
    }

    setTypeID(typeID) {
        this.typeID = typeID;
    }

    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    setSelections(selections) {
        this.selections = new Set(selections);
    }

    clearSelections() {
        this.selections.clear();
    }

    addSelection(newSelection) {
        this.selections.add(newSelection);
    }

    removeSelection(oldSelection) {
        this.selections.delete(oldSelection);
    }

    selectionsToString() {
        let selectArray = new Array();
        for (const entry of this.selections) {
            selectArray.push(entry);
        }
        return selectArray.join(",");
    }

    getQueryUrl(apiVer="") {
        //default to v1 API if none set
        if (apiVer != "") {
            this.apiVer = apiVer;
        }
        else if (this.apiVer == "") {
            this.apiVer = "v1"
        }

        let apiUrl = "";
        //selections to csv string
        let selections = this.selectionsToString();

        if (this.apiVer == "v1") {
            apiUrl = `https://api.torn.com/${this.queryType}/${this.typeID}?selections=${selections}&key=${this.apiKey}`;
        }
        if (this.apiVer == "v2") {
            if (this.typeID == "") {
                apiUrl = `https://api.torn.com/v2/${this.queryType}/${selections}/?key=${this.apiKey}`;
            }
            else {
                apiUrl = `https://api.torn.com/v2/${this.queryType}/${this.typeID}/${selections}/?key=${this.apiKey}`;
            }
        }
        return apiUrl;
    } //getQueryUrl


} //class