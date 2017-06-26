/**
 * @name: Draggable Handler
 * 
 * @copyright: (C) 2014 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author:    Scott Henshaw {@link mailto:shenshaw@vfs.com} 
 * @version:   1.0.0
 * 
 * @summary:   Framework Singleton Class to contain a web app
 * 
 */
var DraggableHandler = (function() {
    
	var constant = {
		DEFAULT_Z: 1
	};
	
    /** @name: DraggableHandler */
    function DraggableConstructor( domElement_el ) {
    	
        // Public attributes (available in prototype members)
        this.mouseDown = false;
        this.mouseOver = false;
        this.thing = null;
        this.offsetX = null;
        this.offsetY = null;
        this.zIndex = constant.DEFAULT_Z;    
        
        // Private attributes
    	var local = {
            draggable_el: domElement_el,
    	};
            
        // Private methods - duplicated with each instance
    	local.offsetX = function() {
            
            if (this.offsetX == null)
                return 0;
            
            return this.offsetX; 
        };

        local.offsetY = function() { 

            if (this.offsetY == null)
                return 0;
            
            return this.offsetY; 
        };
    	
        // event handlers
        local.draggable_el.mousedown( this.down )
    	local.draggable_el.mousemove( this.move );
        local.draggable_el.mouseover( this.over );
        local.draggable_el.mouseout( this.out );
        local.draggable_el.mouseup( this.up );
    };
    
    /*
     * NOTE:  prototype methods are shared amongst all instances and therefore
     * have no access to private data within the objects they service. Internal
     * variables are NOT accessible (self)
     * 
     */

    /** @memberOf Draggable */
    DraggableConstructor.prototype.down = function( event ) {
    	
    	if (!this.mouseOver) 
    		return;
    	
	    // record the mouse
		this.mouseDown = true;
		this.offsetX = event.clientX - Math.floor( this.thing.offsetLeft );
		this.offsetY = event.clientY - Math.floor( this.thing.offsetTop );

		// save the z-index (depth)
		this.zIndex = this.thing.style.zIndex;
		this.thing.style.zIndex = 10000;
		
		// Change the cursor
		this.thing.style.cursor = "move";
    };
    
    /** @memberOf Draggable */
    DraggableConstructor.prototype.move = function( event ) {
	
    	if (this.mouseDown && this.mouseOver && this.thing != null) {
    		
    		this.thing.style.position = "absolute";
    		this.thing.style.margin = "0px";
    		this.thing.style.left = event.clientX - this.offsetX + "px";
    		this.thing.style.top = event.clientY - this.offsetY + "px";
    	}
    };
    
    /** @memberOf Draggable */
    DraggableConstructor.prototype.over = function( event ) {

        // make the thing whatever element we are hovering over
    	this.thing = event.target;

    	if(this.thing.classList.contains("draggable")) {
    		
    		this.mouseOver = true;
    	}
    	else {
    		
    		this.mouseOver = false;
    		this.thing = null;
    	}
    };
    
    /** @memberOf Draggable */
    DraggableConstructor.prototype.out = function( event ) {
    	
    	this.mouseOver = false;
    	this.thing = null;
    };
        
    /** @memberOf Draggable */
    DraggableConstructor.prototype.up = function( event ) {
    
    	this.mouseDown = false;
    	if (this.thing == null)
    		return;
    	
	    // reset the z-index
		this.thing.style.zIndex = this.zIndex;
		this.zIndex = constant.DEFAULT_Z;
		
		// reset the cursor
		this.style.cursor = "pointer";
    };
    
    return DraggableConstructor;
})();



