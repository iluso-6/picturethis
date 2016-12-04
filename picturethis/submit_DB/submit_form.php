<?php
     require_once "Mail.php";
      
     $from =  $_POST['email']; // required
     $to = "shaydebarra@gmail.com";
     $subject = "Test";
     $body = "Testing, is this thing on?";
      
     $host = "picturethis.gear.host";
     $username = "picturethis\$picturethis";
     $password = "L0lewG1ZZLofzL6h5mTe2P2vM3uCsb78XBikBkgNReRfkEzh8NwHouTsfPxN";
      
     $headers = array ('From' => $from,
       'To' => $to,
       'Subject' => $subject);
     $smtp = Mail::factory('smtp',
       array ('host' => $host,
         'auth' => true,
         'username' => $username,
         'password' => $password));
      
     $mail = $smtp->send($to, $headers, $body);
      
     if (PEAR::isError($mail)) {
       echo("<p>" . $mail->getMessage() . "</p>");
      } else {
       echo("<p>Message successfully sent!</p>");
      }
?>