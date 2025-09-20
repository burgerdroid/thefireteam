<?php 
$passlen = 4;
if (isset($_GET['len'])) {
    $passlen = intval($_GET['len']);
}
$wordArray = array(); 
$handle = fopen("other/pword_list.txt", "r");
if ($handle) {
	while (($line = fgets($handle)) !== false) {
		$line = rtrim($line);
        if (strlen($line) == $passlen) {
            array_push($wordArray, $line);
        }
    }
} else {
    echo "ERROR";
}  
fclose($handle);
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta content-type="utf-8" charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="styles/common.css"> 
	<title>Cracking Helper</title>
<style>
.pwordChar {
	font-size: 32pt;
	width: 1em;
	padding: 0;
	margin: 0;
	text-align: center;
}

.elimChars {
	width: 35pt;
	height: 32pt;
	font-size: 11pt;
	vertical-align: center;

}

.letterFreq {
	font-size: 8pt;
	font-family: monospace;
}

.hide {
	visibility: collapse;
	background-color: red;
}

.show {
	visibility: visible;
	background-color: lightgreen;

}

table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
}

td {
	text-align: center;
}

label, button, select {
	font-size: 14pt;
	margin-top: 0.3em;
}

#wordlist {
	font-family: monospace;
}

#loadingbox {
    position: absolute;
    top: 0.1%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(200,200,255,0.8);
}

#innerbox { 
    position: relative;
    top: 40%;
}

</style>
</head>
<body>
<div id="loadingbox">
<div id="innerbox"><h1 style="text-align: center;   ">Loading, please wait...<h1></div>
</div>
<header>
<h1>
        <span><a href="index.html"><img class="logo" src="images/fireteamlogo.jpg" alt="The Fireteam Logo"></a></span>
        <span>Cracking Helper</span>
</h1>
</header>
<h2>Instructions</h2>
<p>This is a crude tool that will assist in getting more correct guesses when doing the Cracking crime (there is a merit for getting 250 correct guesses).  The "dictionary" is now a list of previously guessed passwords for this crime, so should be fairly accurate.  Please let me know if you come across new passwords.</p>
<ol>
<li>Set the password length to the size of the password you are trying to guess.</li>
<li>Make a crack attempt and put the new letter into the corresponding character box.</li>
<li>Click <b>Get Candidate Words</b> to show a list the current candidate words, and to show the top 10 highest frequency letters for each character.</li>
<li>When making a guess in the Cracking crime:</li>
<ul>
	<li>If it is correct, add the new correct letter to the corresponding character box.</li>
	<li>If it is incorrect, add the letter to the wrong characters text field.</li>
	<li>After either of these 2 scenarios, click again on <b>Get Candidate Words</b></li>
</ul>
</ol>
<label for="passlen">Password Length:&nbsp;&nbsp;</label>
<select id="passlen" onchange="reloadPage(this.value);">
<option value="4">4</option>
<option value="5">5</option>
<option value="6">6</option>
<option value="7">7</option>
<option value="8">8</option>
<option value="9">9</option>
<option value="10">10</option>
</select><br>
<button onclick="getCandidateWords();">Get Candidate Words</button>
<button onclick="resetForm();">Reset</button></p>
<table id="pwordTab">
<colgroup>
<col class="show" />
<col class="show" />
<col class="show" />
<col class="show" />
<col class="hide" />
<col class="hide" />
<col class="hide" />
<col class="hide" />
<col class="hide" />
<col class="hide" />
</colgroup>
<tbody>
<tr>
<td><input id="char0" oninput="this.value = this.value.toUpperCase();" type="text" maxlength="1" class="pwordChar"></input></td>
<td><input id="char1" oninput="this.value = this.value.toUpperCase();" type="text" maxlength="1" class="pwordChar"></input></td>
<td><input id="char2" oninput="this.value = this.value.toUpperCase();" type="text" maxlength="1" class="pwordChar"></input></td>
<td><input id="char3" oninput="this.value = this.value.toUpperCase();" type="text" maxlength="1" class="pwordChar"></input></td>
<td><input id="char4" oninput="this.value = this.value.toUpperCase();" type="text" maxlength="1" class="pwordChar"></input></td>
<td><input id="char5" oninput="this.value = this.value.toUpperCase();" type="text" maxlength="1" class="pwordChar"></input></td>
<td><input id="char6" oninput="this.value = this.value.toUpperCase();" type="text" maxlength="1" class="pwordChar"></input></td>
<td><input id="char7" oninput="this.value = this.value.toUpperCase();" type="text" maxlength="1" class="pwordChar"></input></td>
<td><input id="char8" oninput="this.value = this.value.toUpperCase();" type="text" maxlength="1" class="pwordChar"></input></td>
<td><input id="char9" oninput="this.value = this.value.toUpperCase();" type="text" maxlength="1" class="pwordChar"></input></td>
</tr>
<tr>
<td><textarea id="elim0" oninput="this.value = this.value.toUpperCase();" placeholder="bad chars" class="elimChars"></textarea></td>
<td><textarea id="elim1" oninput="this.value = this.value.toUpperCase();" placeholder="bad chars" class="elimChars"></textarea></td>
<td><textarea id="elim2" oninput="this.value = this.value.toUpperCase();" placeholder="bad chars" class="elimChars"></textarea></td>
<td><textarea id="elim3" oninput="this.value = this.value.toUpperCase();" placeholder="bad chars" class="elimChars"></textarea></td>
<td><textarea id="elim4" oninput="this.value = this.value.toUpperCase();" placeholder="bad chars" class="elimChars"></textarea></td>
<td><textarea id="elim5" oninput="this.value = this.value.toUpperCase();" placeholder="bad chars" class="elimChars"></textarea></td>
<td><textarea id="elim6" oninput="this.value = this.value.toUpperCase();" placeholder="bad chars" class="elimChars"></textarea></td>
<td><textarea id="elim7" oninput="this.value = this.value.toUpperCase();" placeholder="bad chars" class="elimChars"></textarea></td>
<td><textarea id="elim8" oninput="this.value = this.value.toUpperCase();" placeholder="bad chars" class="elimChars"></textarea></td>
<td><textarea id="elim9" oninput="this.value = this.value.toUpperCase();" placeholder="bad chars" class="elimChars"></textarea></td>
</tr>
<tr>
<td id="lettFreq0" class="letterFreq"></td>
<td id="lettFreq1" class="letterFreq"></td>
<td id="lettFreq2" class="letterFreq"></td>
<td id="lettFreq3" class="letterFreq"></td>
<td id="lettFreq4" class="letterFreq"></td>
<td id="lettFreq5" class="letterFreq"></td>
<td id="lettFreq6" class="letterFreq"></td>
<td id="lettFreq7" class="letterFreq"></td>
<td id="lettFreq8" class="letterFreq"></td>
<td id="lettFreq9" class="letterFreq"></td>
</tr>
</tbody>
</table>
<hr>
<h1>Candidate Words</h1>
<div id="wordlist">
</div>
<script>
function reloadPage(charLen) {
    window.location.replace(`crackinghelper.php?len=${charLen}`);
}

function resetForm() {
    document.getElementById("char0").value = '';	
    document.getElementById("char1").value = '';
    document.getElementById("char2").value = '';
    document.getElementById("char3").value = '';
    document.getElementById("char4").value = '';
    document.getElementById("char5").value = '';
    document.getElementById("char6").value = '';
    document.getElementById("char7").value = '';
    document.getElementById("char8").value = '';
    document.getElementById("char9").value = '';    

    document.getElementById("elim0").value = '';    
    document.getElementById("elim1").value = '';
    document.getElementById("elim2").value = '';
    document.getElementById("elim3").value = '';
    document.getElementById("elim4").value = '';
    document.getElementById("elim5").value = '';
    document.getElementById("elim6").value = '';
    document.getElementById("elim7").value = '';
    document.getElementById("elim8").value = '';
    document.getElementById("elim9").value = '';    

    document.getElementById("lettFreq0").innerHTML = '';    
    document.getElementById("lettFreq1").innerHTML = '';
    document.getElementById("lettFreq2").innerHTML = '';
    document.getElementById("lettFreq3").innerHTML = '';
    document.getElementById("lettFreq4").innerHTML = '';
    document.getElementById("lettFreq5").innerHTML = '';
    document.getElementById("lettFreq6").innerHTML = '';
    document.getElementById("lettFreq7").innerHTML = '';
    document.getElementById("lettFreq8").innerHTML = '';
    document.getElementById("lettFreq9").innerHTML = ''; 

    document.getElementById("wordlist").innerHTML = '';     
}

function setPassLen()
{
	passLen = document.getElementById('passlen').value;
	for (i=0; i<=9; i++) {
		if (i < passLen) {
			showHideColumn(i, true)
		}
		else if (i >= passLen) {
			showHideColumn(i, false)
		}
	}
   document.getElementById("loadingbox").style["display"] = 'none';
}

function showHideColumn( colNum, doShow ){
   const table  = document.getElementById( 'pwordTab' );
   const column = table.getElementsByTagName( 'col' )[colNum];
   if ( column ) {
      column.className = doShow ? "show" : "hide";
   }
}

function cmp2ndDesc(a, b) {
	if  (a[1] > b[1]) return -1;
	if  (a[1] < b[1]) return 1;
	return 0;
}

function getCandidateWords()
{
	const wordDiv = document.getElementById('wordlist');
	wordDiv.innerHTML = "";
	const regexLetters = [];
	const candidateWords = [];
	let letterOptions = ''
	let elimOptions = ''
	let newElim = ''

	//construct regex from guessed and eliminated characters
    for (i=0; i<passLen; i++) {
    	letterOptions = document.getElementById("char" + i).value
    	elimOptions = document.getElementById("elim" + i).value
    	if (letterOptions == '' && elimOptions == '') {
    		letterOptions = '.'
    	}
    	else if (elimOptions != '' && letterOptions == '') {
    		letterOptions = '[^' + document.getElementById("elim" + i).value + ']';
    	}
    	regexLetters.push(letterOptions);
    }
    //check for regex word matches
    let foundMatches = false;
	const regex = new RegExp(regexLetters.join(''));
	for (const word of wordList) {
		test = word.match(regex);
		if (test != null) {
			foundMatches = true;
			candidateWords.push(test[0]);
			wordDiv.innerHTML += test[0] + ' ';
		}
	}
	if (!foundMatches) {
		alert('Unable to match any words.');
		return;
	}


	//get highest letter frequency hints
	for (i=0; i<passLen; i++) {
		let letterFreq = [];
		let totalLetterCount = 0;
		for (const word of candidateWords) {
			totalLetterCount += 1;
			if (letterFreq[word[i]] === undefined) {
				letterFreq[word[i]] = 0;
			}
			letterFreq[word[i]] += 1;
		}

		let letterIdx = Object.keys(letterFreq);
		const letterFreqList = [];
		
		for (const letter of letterIdx) {
			letterFreqList.push([letter, letterFreq[letter] / totalLetterCount]);
		}

		letterFreqList.sort(cmp2ndDesc);
		const letterFreqCell = document.getElementById('lettFreq' + i);
		letterFreqCell.innerHTML = '';
		let maxRtn = Math.min(10, letterFreqList.length);
		if (maxRtn != 1) {
			for (j=0; j<maxRtn; j++) {
				letterFreqCell.innerHTML += letterFreqList[j][0] + ':' + (100*letterFreqList[j][1]).toFixed(1) + "%<br>";
			}
		}
        else if (maxRtn == 1) {
            alert("1");
        }
	}	
}

let passLen = <?php echo $passlen; ?>;
document.getElementById("passlen").value = passLen;
setPassLen('<?php echo $passlen; ?>');
let wordList = <?php echo json_encode($wordArray); ?>;

</script>
</body>
</html>
