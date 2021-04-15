//initializing canvas
var canvas = document.getElementById('paint');
var ctx = canvas.getContext('2d');

// var sketch = document.getElementById('sketch');
// var sketch_style = getComputedStyle(sketch);

//uploading the image
var reader = new FileReader();
var img = new Image();

//canvas initial dimension
canvas.width = 600;
canvas.height = 393.25;

//arrays storing values of x and y
var coordinateX = [];
var coordinateY = [];

const l = 600; //array size
var m = 0; //increments if 2 pair of coordinates are same

// drawing code

var mouse = { //mouse initial coordinates
  x: 0,
  y: 0
};
// var t=0;
// var j=0;

var drawOnce = "false"; //this will ensure that user draw only once

// Get the modal (the big canvas)
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn1 = document.getElementById("defaultimg");
var btn2 = document.getElementById("commonimg");
// var btn = document.getElementsByClassName("tapimg");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//describing the properties of line
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 2;
ctx.strokeStyle = "black";

//reselecting the area
document.querySelector('#reselect').addEventListener('click', () => {
  document.getElementById("sel").style.color = 'black';
  document.getElementById("sel").innerHTML = "Select the area in which you want to Count Trees";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  drawOnce = "true";
  coordinateX = [];
  coordinateY = [];
  console.log(coordinateX, coordinateY);
  document.getElementById("sel1").innerHTML = "Select the area in which you want to Count Trees";
  document.getElementById("commonimg").src = canvas.toDataURL();
});

/* Mouse Capturing Work */
//mousemove
canvas.addEventListener('mousemove', function(e) {
  // mouse.x = e.pageX - this.offsetLeft;
  // mouse.y = e.pageY - this.offsetTop;

  var rect = canvas.getBoundingClientRect(); //this give the coordinates of the canvas
  var root = document.documentElement; //this gives the information about the html element

  mouse.x = e.clientX - rect.left - root.scrollLeft; //these two gives the mouse positions
  mouse.y = e.clientY - rect.top - root.scrollTop;
// if(initialX==mouse.x && initialY==mouse.y){}
}, false);

//mousedown
canvas.addEventListener('mousedown', function(e) {
  if (drawOnce == "true") {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    canvas.addEventListener('mousemove', onPaint, false);
  }
}, false);

//mouseup
canvas.addEventListener('mouseup', function() {
  canvas.removeEventListener('mousemove', onPaint, false);
  drawOnce = "false";

  //checking for closed path or not
  m = 0;
  for (i = 0; i < coordinateX.length - 1; i++) {
    for (var j = i + 1; j < coordinateX.length; j++) {
      if ((coordinateX[i] == coordinateX[j]) && (coordinateY[i] == coordinateY[j]))
        m++;
    }
  }
  // if(t!=m){
  //   j=m-t;
  // } else if(m==t &&m<3){
  //   j=1;
  // }else if(m>5){
  //   j=-1;
  // }
  // else{
  //   j=-1;
  // }
  console.log(m);
  // console.log("j",j," t",t,"m" ,m);

  if (m >= 5) {
    // if (j !=1) {

    // alert("Please select the region again");
    document.getElementById("sel").style.color = '#d00';
    document.getElementById("sel").innerHTML = "Please select the region again";
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    drawOnce = "true";
    coordinateX = [];
    coordinateY = [];
    console.log(coordinateX, coordinateY);

  } else {
    // alert("The selected region is");
    document.getElementById("sel").style.color = '#00008B';
    document.getElementById("sel").innerHTML = "This is the selected Region.";
    setTimeout(function() { //close the canvas modal after 2 seconds
      modal.style.display = "none";
    }, 1500);
    selectedRegion();
  }
  // t=0;
  // j=0;
}, false);

//this function paints on the canvas
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
    // if (coordinateX[coordinateX.length-1]==mouse.x && coordinateY[coordinateY.length-1]==mouse.y) {
    //   t++;
    // }
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
  document.getElementById("sel1").innerHTML = "Go Ahead to count the number of trees!!!";

  // document.getElementById("defaultimg").style.display = "none";
  // document.getElementById("commonimg").style.display = "block";
  document.getElementById("sendimage").src = canvas.toDataURL();
console.log(document.getElementById("sendimage").src);
  console.log("canvas : ",canvas.toDataURL());
  document.getElementById("commonimg").src = canvas.toDataURL();

  // var newurl = canvas.toDataURL();
  // img.onload = function() {
  //   drawOnce = "true";
  //   ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  // };
  // img.src =  newurl;
  // var dataURL = canvas.toDataURL();
  //     img.src = dataURL;

}


//this will load the default image on canvas
img.onload = function() {
  drawOnce = "true";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};
img.src = 'images/img1.png';

// document.getElementById("commonimg").src= canvas.toDataURL();

//this will upload different images on canvas
const uploadImage = (e) => {
  reader.onload = () => {
    img.onload = () => {

      let w = canvas.width;
      let nw = img.naturalWidth;
      let nh = img.naturalHeight;
      let aspect = nw / nh;
      let h = w / aspect;
      console.log('height', h);
      canvas.height = h;

      // let h= canvas.height;

      ctx.drawImage(img, 0, 0, w, h);
      document.getElementById("sel").style.color = 'black';
      document.getElementById("sel").innerHTML = "Select the area in which you want to Count Trees";
      document.getElementById("sel1").innerHTML = "Select the area in which you want to Count Trees";
      document.getElementById("commonimg").src = reader.result;
      document.getElementById("defaultimg").style.display = "none";
      document.getElementById("commonimg").style.display = "block";

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




// When the user clicks on the button, open the modal
btn1.onclick = function() {
  modal.style.display = "block";

}
btn2.onclick = function() {
  modal.style.display = "block";

}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// $(document).ready(function() {
//   $('#paint').hover(function() {
//     $('#bodyid,#navbarid,p,#para,#treeid,#countid').css({
// "background-color": "black",
// "color": "black",
// "opacity"     : 2
//
// });
//   }, function() {
//     // on mouseout, reset the background colour
//     $('#bodyid,#navbarid,p,#para,#treeid,#countid').css({
// "background-color": '',
// "color": '',
// "opacity"     : 1
//
// });
//   });
// });
