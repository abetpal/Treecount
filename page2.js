var canvas = document.getElementById('paint');
var ctx = canvas.getContext('2d');

var sketch = document.getElementById('sketch');
var sketch_style = getComputedStyle(sketch);
//canvas initial dimension
canvas.width = 500;
canvas.height = 250;

// drawing code
//mouse initial coordinates
var mouse = {
    x: 0,
    y: 0
};

/* Mouse Capturing Work */
canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
}, false);

/* Drawing on Paint App */
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

ctx.strokeStyle = "black";

canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);

    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    console.log(mouse.x, mouse.y);
    //this will console the x,y coordinates
    ctx.stroke();
};

//uploading the image

const reader = new FileReader();
const img = new Image();

const uploadImage = (e)=>{
    reader.onload = ()=>{
        img.onload = ()=>{
            // myPics.width = img.width;
            // myPics.height = img.height;
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            // context.drawImage(img, 0, 0);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        ;
        img.src = reader.result;
    }
    ;
    reader.readAsDataURL(e.target.files[0]);
}
;

const imageLoader = document.getElementById("uploader");
imageLoader.addEventListener("change", uploadImage);
