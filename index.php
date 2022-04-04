<?php

$title = "Snake!";

?>
<!DOCTYPE HTML>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="style.css">
<title><? echo (isset($title)) ? $title : ""; ?></title>
</head>
<body>
  <div id="header">
    <? echo (isset($title)) ? $title : ""; ?>
  </div>
  <div id="settingsWindow">
  </div>
  <div id="gameWindow">
  </div>
  <div id="info">
    Use arrow-keys to move the snake.<br /><br />
    Known bugs: <br />
    - Width &amp; height need to be even numbers <br />
    - Hitting 'start' when the game is already running will lead to undesired outcome <br />
  </div>
<script src="snake.js"></script>
</body>
</html>

