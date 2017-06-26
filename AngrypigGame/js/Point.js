//the point - a location in space
//the basic class construct
//closure



var point =(function() {

	
	function Pointclass(x,y) {	
		this.x = x;
		this.y = y;
	};
	Pointclass.prototype.asworld = function( scale ){
		var pt={
			x: this.x * scale,	
			y: this.y * scale *-1	
		};
		return pt;				
	};
	return Pointclass;
	
})();

var p = new point( 7,42 );
var coords = p.asworld(world.SCALE_FACTOR);