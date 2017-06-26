var app = (function() {
    function App() {

        var self = {
            draggable:null
        };
        var boolFire=false;
        var property = {
                "bounce":0,
                "friction":1,
                "hitPoints":4,
        }
       //inits my app
        this.init = function() {
            //makes the editor a DraggabbleHandler and appends my cannon to it
            //when the div with the "piggie" id is clicked, get its width, height, and mass values entered
            $("#pig").on("click", function() {
                var width = $("#width").val();
                var height = $("#height").val();
                var mass = $("#mass").val();
                var bounce = property.bounce;
                //append it to the editor and make it draggable, and have various styles
                $("#gameboard").append("<div class='pig draggable 'style='top: 0px; left: 0px; width:" + width + "px; height:" + height + "px; background-size:" + width + "px " + height + "px;'></div>");

                
            });
            
            
            
            //make the grid

            $("#grid").on("click", function() {
				$("#gridmap").toggleClass("hide");
               
            });
            $("#cannon").on("click", function() {
                var width = $("#width").val();
                var height = $("#height").val();
                var mass = $("#mass").val();
                $("#cannon").hide();
                //append it to the editor and make it draggable, and have various styles
                $("#gameboard").append("<div class='cannon draggable " + mass + "'style='top: 0px; left: 0px; width:" + width + "px; height:" + height + "px; background-size:" + width + "px " + height + "px;'></div>");
                
            });

            //when the div with the "box" id is clicked, get its width, height, and mass values entered
            $("#box").on("click", function() {
            	var width = $("#width").val();
                var height = $("#height").val();
                var mass = $("#mass").val();
              
                //append it to the editor and make it draggable, and have various styles
            	$("#gameboard").append("<div class='box draggable " + mass + "' style='top: 0px; left: 0px; width:" + width + "px; height:" + height + "px; background-size:" + width + "px " + height + "px;'></div>");
            	$( "#box" ).draggable({
              	  containment: "#gameboard"
              	});
            });

            //when the div with the "steel" id is clicked, get its width, height, and mass values entered
            $("#box1").on("click", function() {
            	var width = $("#width").val();
                var height = $("#height").val();
                var mass = $("#mass").val();

                //append it to the editor and make it draggable, and have various styles
            	$("#gameboard").append("<div class='box1 draggable " + mass + "' style='top: 0px; left: 0px; width:" + width + "px; height:" + height + "px; background-size:" + width + "px " + height + "px;'></div>");

            });
            
          
            //when the div with the "reset" id is clicked, reload the page
            $("#reset").on("click", function () {
            	location.reload(true);
            });

            //when the div with the "save" id is clicked
            $("#save").on("click", function()
    	    {
            	
    	    	var gameboard = document.getElementById("gameboard");
    	    	var gameboardElements = gameboard.getElementsByTagName("div");
    	    	var tempArray = [];
    	    	var checkerror = $("#Filenameinput").val();
    	    	//if there is at least another element than the cannon
    	    	if (gameboardElements.length > 1)
    	    	{
    	    		//check if user has input the filename
        	    	if(checkerror==(""))
    	    		{
        	    		alert("type a filename!");
    	    			
    	    		}
        	    	else{
    	    		saveData = { "action" : "saveEditor"};
    	    		//save userinput into the savedata
    	    		saveData["nameinput"]=$("#Filenameinput").val()+(".jason");
                   // var filename = $.param(mass);
    	    		//search through every element that is in the editor
    	    		for (var i = 0; i < gameboardElements.length; i ++)
    	    		{
    	  					//store the class name, left px, top px, width, and heigh values into the temporary array
    	   				tempArray[i] =  {
    						"CLASS" : gameboardElements[i].className,
    	   					"LEFT" : gameboardElements[i].style.left,
    	   					"TOP" : gameboardElements[i].style.top,
    	    				"WIDTH" : gameboardElements[i].style.width,
    	    				"HEIGHT" : gameboardElements[i].style.height
    	    		};
    	    			//take that array and save it to a variable
    	    			saveData["gameboardObjects"] = tempArray;
    	    		}
    	    			//use JSON.stringify to take saveData and make it into a JSON string
    	    			//savedResult = JSON.stringify (saveData);

    	    			//use jquery .param to make that into a string and store it in a variable
    	    			var savedResult =  $.param ( saveData );
    	    			var content = JSON.stringify(saveData);
    	    			//alert (savedResult);
    	    			var request = savedResult + "&data=" + content
    	    			alert(request);  
 
    	    			//making a post to server.php with savedResult as a parameter
    	    			$.post("server.php", savedResult)
    	    			//once the data has been sent,
    	    			.then(function(data){
    	    			//get it back and parse it to a javascript object
    	    			JSONresult = $.parseJSON(data);
    	    			alert(JSONresult);
    	    		//	alert("reciverd");
    	    		});
        	    	}
    	    	}
    	    		//if there are no objects placed other than the cannon, tells user to place some objects
    	    		else
    	    		{
    	    			alert ("Please place some objects!");
    	    		}
    	    	});
            
            

            $('#load').on('click', function() {
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

            		 // VFS: Use  $('#editor').html(''); better not to mix, use JQuery or don't.
            		 document.getElementById('gameboard').innerHTML = "";
                 	$("#gameboard").append("<div id='gridmap'></div>");
            		 //Get data from each item stored using a for loop
                     for(i = 0; i <response.gameboardObjects.length; i++)
                     {

                         
                                              
         			 	var div = document.createElement("div");
        				document.getElementById('gameboard').appendChild(div);
        				div.className = response.gameboardObjects[i].CLASS;
        				div.setAttribute('id', response.gameboardObjects[i]);
        				div.style.cursor= "move";
        				div.style.position = "absolute";
        				div.style.margin = "0px";
        				div.style.top= response.gameboardObjects[i].TOP;
        				div.style.left= response.gameboardObjects[i].LEFT;
                         
                         
                         
                     }

            		 //Display success message alert
            		 alert("Loading Successful");
            		 boolFire=true;
            	});


            });
        };       

    };
    //returns the app
    return new App;
})();

//document ready function that inits the app
$(document).ready( function () {
    app.init();
});
