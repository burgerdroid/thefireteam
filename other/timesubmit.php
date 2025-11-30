<?php
if (isset($_POST['userid'])) {
    $rawdata = "";
    $fh = fopen('./chaindata.json','r');
    while ($line = fgets($fh)) {
        $rawdata = $rawdata . $line;
    }
    fclose($fh);
    $savedEntries = json_decode($rawdata, true);
    $userid = $_POST['userid'];
    $username = $_POST['username'];
    $savedEntries[$userid] = array();
    $savedEntries[$userid]['name'] = $username;
    $savedEntries[$userid]['tzoffset'] = $_POST['tzoffset'];
    $saveEntries[$userid]['times'] = array();
    for ($i=0; $i <= 23; $i++) {
		$savedEntries[$userid]['times'][] = 0;
    }
    foreach($_POST as $key=>$value) {
	    if (substr($key,0,9) == 'checkhour') {
			$idx = (int)explode('hour', $key)[1];
			$savedEntries[$userid]['times'][$idx] = 1;
		}	
    }
    $rawdata = json_encode($savedEntries);
    $fh = fopen('chaindata.json', 'w');
    fwrite($fh, $rawdata);
    fclose($fh);
	$fh = fopen('../scripts/chaindata.js', 'w');
    fwrite($fh, 'chaindata = ' . $rawdata . ';');
    fclose($fh);
}
echo "<h1>Your preferences have been saved.</h1>";
echo '<a href="/index.html">Return to Index</a>';
?>
