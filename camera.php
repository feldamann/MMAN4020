<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
// PHP FUNCTION YOU WANT TO CALL
function save ($input) {
  // Do your processing
  // Save to database of something
  //processin here cuz

//   $fp = fopen('images/test.txt', 'w');//opens file in append mode  
//   fwrite($fp, $input);  
//   fclose($fp);

//   $fp = fopen('images/len.txt', 'w');//opens file in append mode  
//   fwrite($fp, strlen($input));  
//   fclose($fp);

  $img = str_replace('data:image/png;base64,', '', $input);
  $img = str_replace(' ', '+', $img);

//   $fp = fopen('images/img2.txt', 'w');//opens file in append mode  
//   fwrite($fp, $img);  
//   fclose($fp);

  $fileData = base64_decode($img);
  file_put_contents('images/photo.png',$fileData);
  return true;
}

$pass = save($_POST['imgBase64']);

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