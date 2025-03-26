<?php
if (isset($_GET['doc'])) {
	//sanitise doc file name
	$pattern = "/^[\w]+$/";
	$fname = "";

	if (preg_match($pattern, $_GET['doc']) == 1) {
		$fname = $_GET['doc'];
	}
    if ($fname == "") {
        $content = "";
    }
    else {
        $fname = $_SERVER['DOCUMENT_ROOT'] . "/docs/" . $fname . ".md";
        $content = file_get_contents($fname);
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="stylesheet" type="text/css" href="styles/document.css"> 
	<title><?php $tmp = explode("\n", $content); echo $tmp[0];?></title>
</head>
<body>
<textarea id="md-src" style="display: none;"><?php echo $content; ?></textarea>
<section id="md-block"></section>
<?php
if ($content == "") {
    echo "<h1>Invalid Document</h1>";
}
else {
echo "<script src=\"modules/commonmark.min.js\"></script>
<script>
	var mdsrc = document.getElementById(\"md-src\");
	var mdblock = document.getElementById(\"md-block\");
	var reader = new commonmark.Parser();
	var writer = new commonmark.HtmlRenderer();
	var parsed = reader.parse(mdsrc.value);
	mdblock.innerHTML = writer.render(parsed);
</script>";
}
?>
</body>
</html>

