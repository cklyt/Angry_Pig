var menusound = new buzz.sound("./sounds/menu.wav", {
	loop: true
});
var buttonpressed = new buzz.sound("./sounds/button.wav", {
});
var shooting = new buzz.sound("./sounds/shoot.wav", {
});
var destroy = new buzz.sound("./sounds/collide.wav", {
});

var game = (function() {
	
	function GameSingleton() {
		
		// Constants
		var i = 1;
		var theEntities = new Array();
		var theWorld;
		var maxFireballs = 20;
		var fireballEntityIndex = -1;  
		var theFireball = null;	
		var currFireballs = 20;	
	    var ghost = null;
	    var boolFire=false;
	    var score=2000;
		var username = $("#textarea").val();
		var enemy=null;
		var self = this;
		var theEntities = new Array();
	    /** @memberOf Game.public */
	    this.init = function() { 
	    	menusound.play();
			//Getting main game window & assigning it as world
			var gameArea_el = $('#gameboard');
			theWorld = new World (gameArea_el);
			
			$("#playbutton").on("click" , function() {
				buttonpressed.play();
				$("#levelname").html("User: " + username + "<br>"+"Score:"+score);		
			});
			$("#startmenu").on("click" , function() {
				
				$("#startmenu").toggleClass("hide");
				$("#menu").show();			
			});
			$("#playbutton").on("click" , function() {
				
				document.getElementById("menu").style.display = "none";
				$("#gameboard").show();			
				$("#toolbar").show();	
			});
			$("#editorbutton").on("click" , function() {
				buttonpressed.play();
				location.href = "http://pgwm.vfs.local.apps/~pg07yutong/Angrypig/editor.php";		
			});
            //when the div with the "reset" id is clicked, reload the page
            $("#reset").on("click", function () {
            	location.reload(true);
            });
            $("#ending").on("click", function () {
            	location.reload(true);
            });
            $('#load').on('click', function() {
            	$('#load').hide();
            	buttonpressed.play();
            	var e = document.getElementById("level");
            	var strUser = e.options[e.selectedIndex].value;
            	var myCmd = {action:'load'};
            	myCmd["nameinput"]=e.options[e.selectedIndex].value;
            	//Get load action command
            	var servercommand = $.param( myCmd );
            	//check if user has input a file name
            	//Get load data from server
            	//Get load data from server
            	$.post('server.php', servercommand )
            		.then( function( data ) {

            		//Parse two times to get data in required format
            		 var response = JSON.parse( data);  
            	//	 var serverData = $.parseJSON(response.data);
            		 //Clear editor area

            		 // VFS: Use  $('#gameboard').html(''); better not to mix, use JQuery or don't.
            		 document.getElementById('gameboard').innerHTML = "";
                 	$("#gameboard").append("<div id='gridmap'></div>");
            		 //Get data from each item stored using a for loop
                     for(i = 0; i <response.gameboardObjects.length; i++)
                     {                                                                   
         			 	var div = document.createElement("div");
        				document.getElementById('gameboard').appendChild(div);
        				div.className = response.gameboardObjects[i].CLASS;
        				div.setAttribute('id', "123");
        				div.style.cursor= "move";
        				div.style.position = "absolute";
        				div.style.margin = "0px";
        				div.style.top= response.gameboardObjects[i].TOP;
        				div.style.left= response.gameboardObjects[i].LEFT;  
                     }
                     $(".pig").removeClass("draggable");
                     enemy = new Entity( theWorld, $(".pig"), false, "enemy");
					 $("#gameboard .draggable").each( function( a, b ) {        	
							//TODO: Populate the array of entities with the xml content
								theEntities[theEntities.length] = new Entity( theWorld, $(b),false);
								console.log(theEntities);
							});	
					 theEntities.push(enemy);
            		 //Display success message alert
            		 alert("Loading Successful");
            		 boolFire=true;
            	});
            });
			//Handling Main menu button
			
			////Handling lose button
					//Load button handler
					$('#playbutton').on('click', function() {						
						//Setting projectile text 
						$('#bulletleft').text(' Bullets remaining: 20');
						currFireballs = 20;
							//Handling Launch button
							$("#gameboard").on("click" , function() {
								shooting.play();
								if(boolFire==true)
								{
									var i = 0;
									//Playing projectile sound
									currFireballs--;
																
									//Checking for number of fireballs that has been shot
									//Destroying projectiles if more than 1
									if(fireballEntityIndex > 0)
									{
										theEntities[fireballEntityIndex].destroy(theEntities); 
									}
									
									//Creating & adding projectile div
									$("#gameboard").append("<div class = 'projectile' id = 'projectile" + i + "'></div>");
									
									//Creating fireball entity & Adding it to the entity array
									fireballEntityIndex = theEntities.length;
									theFireball = new Entity( theWorld, $("#projectile" + i + ""), false, "ball");
									theEntities.push(theFireball);
									i++;
									//update the score
									score=score-100;
									$("#levelname").html("User: " + username +"<br>"+"Score:"+score);	
									//Applying impulse
									theFireball.applyImpulse(document.getElementById("sliderAngle").value, document.getElementById("sliderPower").value);
									//Updating projectile count in html
									$('#bulletleft').text('Bullets remaining: ' + (currFireballs));
									position=$(".projectile").position();
									position1=$(".pig").position();
									if(currFireballs<=0)
										{
										
										$("#gameboard").hide();	
										$("#toolbar").hide();	
										$("#winningcondition").html("You lose!"+"<br></br>"+"click screen to reload");
										$("#ending").show();	
										}
									
								};
							});												
					});
				
		
		};
		
		
	    /** @memberOf Game.private */
	    function update() { 
		
	    	theWorld.update();
	    	
		};
	
	    
	    /** @memberOf Game.private */
	    function render() {
			
			for (var i = 0; i < theEntities.length; i++) {
				theEntities[i].render();
			}
			theWorld.getModel().ClearForces();      	
	    }
	    
	    
	    /** @memberOf Game.public - 60 fps*/
		
		this.run = function() {	    
		    // MAIN GAME LOOP  			
			var frame = function( timestamp ) {
				update();
	            render(); 
	            //Updating animations
	            window.requestAnimationFrame( frame );
	            
	        };
			window.requestAnimationFrame( frame );
		};
	
	};
	
	return new GameSingleton();
	
})();

//Handling document.ready function
$(document).ready(function(e) {

	//Initializing & running game
    game.init();
    game.run();
	//game.run();
});