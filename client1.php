<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
// PHP FUNCTION YOU WANT TO CALL
function save ($input) {
  // Do your processing
  // Save to database of something
  //processin here cuz

  $json_data = json_encode($input);
  $stringdata = substr($json_data,10,-4);
  $fp = fopen('data/myfile2.log', 'w');//opens file in append mode  
  //fwrite($fp, ' real shit ');  
  fwrite($fp, $stringdata);  
  fclose($fp);

  return true;
}

$pass = save($_POST);

// function console_log($input, $with_script_tags = true) {
//   $js_code = 'console.log(' . json_encode($input, JSON_HEX_TAG) . ');';
//   if ($with_script_tags) {
//       $js_code = '<script>' . $js_code . '</script>';
//   }

//   echo $js_code;
// }

// console_log($input)

//RESULT
echo json_encode([
  "status" => $pass ? 1 : 0,
  "message" => $pass ? "OK" : "An error has occured"
]);
?>