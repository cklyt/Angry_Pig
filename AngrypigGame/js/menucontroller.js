var game=new function(){
	this.init=function init(){


		$("#playbutton").on("click" , function() {
			var username = $("#textarea").val();
			$("#levelname").html("Level: " + username);		
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
			
			location.href = "http://pgwm.vfs.local.apps/~pg07yutong/Angrypig/editor.php";		
		});
	
		
	};
	
	
};
$(document).ready( function() {
	game.init();
});