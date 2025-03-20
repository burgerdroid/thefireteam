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
    $savedEntries[$userid] = array();
    foreach($_POST as $key=>$value) {
        if ($key != "userid") {
            $savedEntries[$userid][] = $value;
        } 
    }
    $rawdata = json_encode($savedEntries);
    $fh = fopen('chaindata.json', 'w');
    fwrite($fh, $rawdata);
    fclose($fh);
}
echo "<h1>Your preferences have been saved.</h1>";
echo '<a href="/index.html">Return to Index</a>';
?>
