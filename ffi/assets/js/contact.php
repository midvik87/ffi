<?php
$sender_email = $_POST["email"];
$msg_title = $_POST["title"];
$message = $_POST["message"];
$sender = "From: $sender_email";
mail("midvyk007@gmail.com", $msg_title, $message, $sender);
?>
<html>
<head>
<title>Message sent!</title>
</head>
<body>
<h4>Thank you for your time, we will get back to you as soon as we can.</h4>
<a href="https://ffi.rs/ternal/index.html">Click here</a> to go back to home page.
</body>
</html>