<!DOCTYPE html>
<!-- ------------------------------------------------------------------------------ -->
<!-- Copyright 2014 Vancouver Film School, all rights reserved                      -->
<html>
    <head>

        <link rel="stylesheet" href="css/style.css">
        <style>
        </style>

        <!-- This is the key CDN to pull jQuery from -->
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script type="text/javascript" src="js/Box2D.js"></script>
        <script type="text/javascript" src="js/Box2d.min.js"></script>
		<!-- <script type="text/javascript" src="js/buzz.min.js"></script>	-->
        <script src="//cdnjs.cloudflare.com/ajax/libs/buzz/1.2.0/buzz.min.js"></script>
    </head>

    <body id="background">
        <!-- ----------------------------------------------------------------------------------
       <!-- VFS: Page header and titling for the site. Litter this with VFS logo stuff
         -->
        <header id="intro">
				<table id="logo">
					<tr>
						<td><p id="tittle">AngryPigs</p></td>
					</tr>
				</table>
        </header>
 		<br>
 		<br>
 		<br>
 		<br>
        	<section id="startmenu"></section>
        	<section id="menu">
        		<ul id="buttons">
        			<li style="top:0;" id="playbutton"></li>
        			<li style="top:200px;" id="username">
        			<input id="textarea" type="text" id="width" value="username"><br>
        			</li>
        			<li style="top:400px;" id="editorbutton"></li>

        		</ul>
        	</section>
	        <table id="toolbar">
	        	<tr>
	        		<td id="levelname"></td>
	        		<td id="bulletleft"></td>
	        		<td id="angleslider">
	        			<p>Angle</p>
	        			 <input id="sliderAngle" type ="range" min ="-90" max="90" step ="18" value ="-45"/>
	        		</td>
	        		<td id="powerslider">
	        			<p>Power</p>
	        			 <input id="sliderPower" type ="range" min ="0" max="10000" step ="11" value ="4000"/>
	        	    </td>
	        		<td id="load"></td>
	        		<td id="loadsection">
					<select name="level" id="level">
					    <?php
					    foreach (glob("../Angrypig/*.jason") as $filename) {
					        echo "<option value=" . basename($filename) .">" . basename($filename) . "</option>";
					    }
					    ?>
					 </select>
	        		</td>
	        		<td id="reset"></td>
	        	</tr>
	        </table>
        	<section id="gameboard">
        		<div id="gridmap"></div>
        	</section>
        	<section id="ending">
        		<p id="winningcondition">1233333</p>

        	</section>
		<script type="text/javascript" src="js/Game.js"></script>
        <script type="text/javascript" src="js/Entity.js"></script>
        <script type="text/javascript" src="js/DraggableHandler.js"></script>
        <script type="text/javascript" src="js/World.js"></script>

    </body>





</html>
