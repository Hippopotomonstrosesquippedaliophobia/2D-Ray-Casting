// 2D Ray Casting
let hits;
let misses;
let accuracy; 

class Particle {
    constructor() {
      this.pos = createVector(width / 2, height / 2);
      this.rays = [];
      
      for (let a = 0; a < 360; a += 1) {
        this.rays.push(new Ray(this.pos, radians(a)));
      }

      
      hits = 0;
      misses = 0;
      accuracy = 0;
    }
  
    update(x, y) {
      this.pos.set(x, y);
    }
  
    look(walls) {
      for (let i = 0; i < this.rays.length; i++) {
        const ray = this.rays[i];
        let closest = null;
        let record = Infinity;

        for (let wall of walls) {
          const pt = ray.cast(wall);
          if (pt) {
            const d = p5.Vector.dist(this.pos, pt);
            if (d < record) {
              record = d;
              closest = pt;
            }
          }
        }
        if (closest) {
          // colorMode(HSB);
          // stroke((i + frameCount * 2) % 360, 255, 255, 50);
          stroke(255, 100);
          line(this.pos.x, this.pos.y, closest.x, closest.y);
        }
      }
    }
  
    isClicked(){
      //console.log(particle.pos.x);
      if (mouseX >= particle.pos.x - 14 && mouseX <= particle.pos.x + 14 && mouseY >= particle.pos.y - 14 &&  mouseY <= particle.pos.y + 14)
      {
        //Calculate accuracy
        hits = hits + 1;
        accuracy = (hits / (hits + misses)) * 100;

       
        console.log("HIT IT: /n Hits are " +hits+"/"+misses+" /n accuracy is "+accuracy+"%");
        
        ellipse(50, 50, 50, 50);
        const origAudio = document.getElementById("correct");
        const newAudio = origAudio.cloneNode()
        newAudio.play()

        var c = document.getElementById("defaultCanvas0");
        var ctx = c.getContext("2d");
        ctx.fillStyle = "white";
        ctx.font = "bold 16px Arial";
        ctx.fillText("Zibri", (c.width / 2) - 17, (c.height / 2) + 8);
      }else
      {
        misses = misses + 1;
        accuracy = (hits / (hits + misses)) * 100;
        console.log("Missed IT: /n Hits are " +hits+"/"+misses+" /n accuracy is "+accuracy+"%");
      }
    }

    show() {
      fill(255);
      ellipse(this.pos.x, this.pos.y, 4);
      for (let ray of this.rays) {
        ray.show();
      }
    }
  }
  