<h1>Test page for ajax</h1>
<?php
	print("<h3>".$_SERVER['REQUEST_METHOD']." request:</h3>\n");
	print("<pre>".print_r(${'_'.$_SERVER['REQUEST_METHOD']},true)."</pre>\n");
?>