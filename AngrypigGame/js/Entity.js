
 function Entity( world, element, static, shape ) {
	
	// Initializing variables
	var eX, eY, eWidth, eHeight;
	this.userData;
	//World manager
	this.eWorld = world; 
	this.eType=shape;
	//DOM element    
	this.eElement = element;
	
    var domPos = this.eElement.position();
    eWidth = this.eElement.width() / 2 ;
    eHeight = this.eElement.height() / 2;
        
    eX = (domPos.left) + eWidth;
    eY = (domPos.top) + eHeight;
    
	//entity model managed by box2d          
    this.physics_mdl = this.createModel( eX, eY, eWidth, eHeight, static, shape );

    
    this.physics_mdl.m_userData = { 
						    	      domObj:this.eElement, 
						    	      width:eWidth, 
						    	      height:eHeight,
						    	      type:this.eType
    };

    //Resetting DOM element position for CSS
    this.eElement.css( {'left':'0px', 'top':'0px'} );
}


//Prototyping applyImpulse for use by the projectile
Entity.prototype.applyImpulse = function( degrees, power ) {
	
    var vector = new b2Vec2( Math.cos( degrees * DEG_2_RAD ) * power,  Math.sin( degrees * DEG_2_RAD ) * power );
    var myModel = this.physics_mdl;
    
    myModel.ApplyImpulse( vector, myModel.GetWorldCenter());
};






//Prototyping applyForce for use by the ghost body
Entity.prototype.applyForce = function( degrees, power ) {
	
    var force = new b2Vec2( Math.cos( degrees * DEG_2_RAD ) * power,  Math.sin( degrees * DEG_2_RAD ) * power );
    var myModel = this.physics_mdl;
    
    myModel.ApplyForce( force, myModel.GetWorldCenter());
};

//Prototyping destroy for deleting projectile physics body
Entity.prototype.destroy = function(entityList)
{
	this.eElement.remove();
	
	var physicsWorld = this.eWorld.getModel();
	physicsWorld.DestroyBody(this.physics_mdl);
	
	this.physics_mdl = null;
	var entityIndex = entityList.indexOf(this);
	
	entityList.splice(entityIndex, 1);
	entityIndex = -1;
	
}



//Updating entity data every frame
Entity.prototype.update = function( opts ) {

	if (opts !== 'undefined') {
		
		var x = opts.x;
		var y = opts.y;
		
	    var myModel = this.physics_mdl;
		
		//Retrieve positions and rotations from the Box2d world
	    myModel.m_xf.position.x = (x / World.SCALE) + myModel.m_userData.width;
	    myModel.m_xf.position.y = (y / World.SCALE) + myModel.m_userData.height;
	}
};

//Moving the entity based on position
Entity.prototype.render = function() {

    var myModel = this.physics_mdl;
    var myElement = this.eElement;

	//Retrieving positions and rotations from the Box2d world
    var x = Math.floor((myModel.m_xf.position.x * World.SCALE) - myModel.m_userData.width);
    var y = Math.floor((myModel.m_xf.position.y * World.SCALE) - myModel.m_userData.height);
    //console.log(myModel.m_userData.width);


    //CSS3 transform 
    var r = Math.round(((myModel.m_sweep.a + TWO_PI) % TWO_PI) * RAD_2_DEG * 100) / 100;
    var css = {
		'transform':'translate(' + x + 'px,' + y + 'px) rotate(' + r  + 'deg)'
	    };
		
    myElement.css(css);	
};


//Creating entity physics model 
Entity.prototype.createModel = function( x, y, width, height, static, shape ) {
	
    var bodyDef = new b2BodyDef;    
    bodyDef.type = b2Body.b2_dynamicBody;
    if (static) {
    	bodyDef.type = b2Body.b2_staticBody;
    }
    
    bodyDef.position.x = x / World.SCALE;
    bodyDef.position.y = y / World.SCALE;

    var fixDef = new b2FixtureDef;
    if(shape =="ball"){
    	fixDef.shape = new b2CircleShape(width / World.SCALE);
    	
    	//console.log(this.m_userData.ball);
    }
    else if(shape == "enemy")
    	{
    	//console.log(this.m_userData);
    	fixDef.shape = new b2CircleShape(width / World.SCALE);
    	}
    else {    	
    	fixDef.shape = new b2PolygonShape;
	    fixDef.shape.SetAsBox( width / World.SCALE, height / World.SCALE);
    	
    }
    
	//Setting density, friction & restitution
    fixDef.density = 4.0;      
    fixDef.friction = 0.7;     
    fixDef.restitution = 0.2;  
    
    var myWorldModel = this.eWorld.getModel(); 
    var aBodyModel = myWorldModel.CreateBody( bodyDef );
    
    aBodyModel.CreateFixture(fixDef);
	
    return aBodyModel;
};