var canvas = document.getElementById('paint');
var ctx = canvas.getContext('2d');

var sketch = document.getElementById('sketch');
var sketch_style = getComputedStyle(sketch);

//canvas initial dimension
canvas.width = 500;
canvas.height = 250;

//arrays storing values of x and y
var coordinateX = [];
var coordinateY = [];
const l = 600; //array size
var m = 0;  //increments if 2 pair of coordinates are same

// drawing code
//mouse initial coordinates
var mouse = {
  x: 0,
  y: 0
};
var drawOnce = "false"; //this will ensure that user draw only once
/* Mouse Capturing Work */

document.querySelector('#reselect').addEventListener('click', () => {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  drawOnce = "true";
  coordinateX = [];
  coordinateY = [];
  console.log(coordinateX, coordinateY);

});

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

/* Drawing on Paint App */
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

ctx.strokeStyle = "black";

canvas.addEventListener('mousedown', function(e) {
  if (drawOnce == "true") {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    canvas.addEventListener('mousemove', onPaint, false);
  }

}, false);

canvas.addEventListener('mouseup', function() {
  canvas.removeEventListener('mousemove', onPaint, false);
  drawOnce = "false";

//checking for closed path or not
  // m=0;
  for (i = 0; i < coordinateX.length - 1; i++) {
    for (var j = i + 1; j < coordinateX.length; j++) {
      if ((coordinateX[i] == coordinateX[j]) && (coordinateY[i] == coordinateY[j]))
        m++;
    }
  }
  console.log(m);
  if (m >= 5) {
    alert("Please select the region again");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    drawOnce = "true";
    coordinateX = [];
    coordinateY = [];
    console.log(coordinateX, coordinateY);


  } else {
    alert("The selected region is");
    selectedRegion();
  }
}, false);

var onPaint = function() {
  ctx.lineTo(mouse.x, mouse.y);
  ctx.stroke();
  // for (var i = 0; i < coordinateX.length-10; i++) {
  // for (var i = 0; i <l; i++) {
  //   if((coordinateX[i]==mouse.x)&&(coordinateY[i]==mouse.y)){
  //     canvas.removeEventListener('mousemove', onPaint, false);
  //     drawOnce = "false";
  //   }
  // }
  if (coordinateX.length < l) {
    coordinateX.push(mouse.x);
    coordinateY.push(mouse.y);
    console.log(coordinateX, coordinateY);
    //this will console the x,y coordinates arrays
  }
};

//this will show the region selected by the user
var selectedRegion = function() {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  for (i = 0; i < coordinateX.length - 1; i++) {
    ctx.beginPath();
    ctx.moveTo(coordinateX[i], coordinateY[i]);
    ctx.lineTo(coordinateX[i + 1], coordinateY[i + 1]);
    ctx.stroke();
  }


}


//uploading the image

const reader = new FileReader();
const img = new Image();

const uploadImage = (e) => {
  reader.onload = () => {
    img.onload = () => {
      // myPics.width = img.width;
      // myPics.height = img.height;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      // context.drawImage(img, 0, 0);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      drawOnce = "true";
      coordinateX = [];
      coordinateY = [];
      console.log(coordinateX, coordinateY);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(e.target.files[0]);
};

const imageLoader = document.getElementById("uploader");
imageLoader.addEventListener("change", uploadImage);
