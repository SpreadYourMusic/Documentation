/* Credits: 
 * https://www.developphp.com/video/JavaScript/Circular-Progress-Loader-Canvas-JavaScript-Programming-Tutorial
 */
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function mix_color(r1, g1, b1, r2, g2, b2, perc){
  return rgbToHex(
    (perc * (r2 - r1) + r1) | 0,
    (perc * (g2 - g1) + g1) | 0,
    (perc * (b2 - b1) + b1) | 0
  );
}

function get_color(perc){
  if(perc >= 0 && perc < 25){
    return mix_color(
      255, 0, 0,
      255, 255, 0,
      perc/25
    );
  }else if(perc < 50){
    return mix_color(
      255, 255, 0,
      255, 229, 0,
      (perc-25)/25
    );
  }else if(perc <= 100){
    return mix_color(
      255, 229, 0,
      1, 124, 28,
      (perc-50.0)/50
    );
  }else{
    return "#017c1c";
  }
}

var bars_content = function() {
	
	var Progress = function( element ) {
		
		this.context = element.getContext( "2d" );
		this.refElement = element.parentNode;
		this.loaded = 0;
		this.start = 4.72;
		this.width = this.context.canvas.width;
		this.height = this.context.canvas.height;
		this.total = parseInt( this.refElement.dataset.percent, 10 );
		this.timer = null;
		
		this.diff = 0;
		
		this.init();	
	};
	
	Progress.prototype = {
		init: function() {
			var self = this;
			self.timer = setInterval(function() {
				self.run();	
			}, 1);
		},
		run: function() {
			var self = this;
			
			self.diff = ( ( self.loaded / 100 ) * Math.PI * 2 * 10 ).toFixed( 2 );	
			self.context.clearRect( 0, 0, self.width, self.height );
			self.context.lineWidth = 10;
			self.context.fillStyle = "#000";
			self.context.strokeStyle = get_color(self.loaded);
			self.context.textAlign = "center";
			
			self.context.fillText( self.loaded + "%", self.width * .5, self.height * .5 + 2, self.width );
			self.context.beginPath();
			self.context.arc( 35, 35, 30, self.start, self.diff / 10 + self.start, false );
			self.context.stroke();
			
			if( self.loaded >= self.total ) {
				clearInterval( self.timer );
			}
			
			self.loaded++;
		},
    
    stop: function(){
      clearInterval( self.timer );
    }
	};
	
	var CircularSkillBar = function( elements ) {
		this.bars = document.querySelectorAll( elements );
		if( this.bars.length > 0 ) {
			this.init();
		}	
	};
	
	CircularSkillBar.prototype = {
		init: function() {
			this.tick = 1;
			this.progress();
			
		},
		progress: function() {
			var self = this;
			var index = 0;
			var firstCanvas = self.bars[0].querySelector( "canvas" );
			var firstProg = new Progress( firstCanvas );
			
			
			
			var timer = setInterval(function() {
				index++;
        if( index == self.bars.length ) {
						clearInterval( timer );
				}else{
          var canvas = self.bars[index].querySelector( "canvas" );
          var prog = new Progress( canvas );
        }
				
			}, self.tick * 100);
				
		},
    
    reset: function(){
      clearInterval( timer );
      prog.stop();
      this.init();
    }
	};
	
	document.addEventListener( "DOMContentLoaded", function() {
		this.circularBars = new CircularSkillBar( "#bars .bar" );
	});
	
  this.circularBars = new CircularSkillBar( "#bars .bar" );
};
