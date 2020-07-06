// 2D Ray Casting

let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;
let correct;

function setup() {  
    correct = new Audio('assets/correct.mp3');
  
    createCanvas(1000, 600);
    
    for (let i = 0; i < 5; i++) {
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }

    walls.push(new Boundary(-1, -1, width, -1));
    walls.push(new Boundary(width, -1, width, height));
    walls.push(new Boundary(width, height, -1, height));
    walls.push(new Boundary(-1, height, -1, -1));
    particle = new Particle();    

    document.getElementById("defaultCanvas0").addEventListener('click', particle.isClicked, true);
}

function draw() {
    background(0);

    for (let wall of walls) {
      wall.show();
    }

    //particle.update(width/2, height/2); //stagnant position
    particle.update(noise(xoff) * width, noise(yoff) * height); //random movements
   // particle.update(mouseX, mouseY); //moving with the mouse
    particle.show();
    particle.look(walls);
        
    //if (document.getElementById("defaultCanvas0").click()) {
          //Call click function on ray
         // particle.isClicked();      
    //}
    

    xoff += 0.008;
    yoff += 0.008;
}
