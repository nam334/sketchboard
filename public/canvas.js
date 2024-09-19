let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");

let penColor = "red";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");
let clearBtn = document.querySelector(".clearBtn");

let undoRedoTracker = []; //Data
let track = 0; //Represent which action from tracker array

let mouseDown = false;
//API
let tool = canvas.getContext("2d");

tool.strokeStyle = penColor; //color the line
tool.lineWidth = penWidth; //increase width of line

// tool.beginPath(); //creates new path
// //moveTo describes from where we want to begin
// //drawing of your line
// tool.moveTo(10, 10); //start point
// tool.lineTo(100, 150); //end point
// tool.stroke(); //fill color( fill graphic)

// tool.lineTo(200, 200);
// tool.stroke();

// tool.beginPath();
// tool.moveTo(20, 10);
// tool.lineTo(20, 200);
// tool.stroke();

//mousedown - start new path
//mousemove - path fill (graphics)
canvas.addEventListener("mousedown", (e) => {
  mouseDown = true;
  // beginPath({
  //   x: e.clientX,
  //   y: e.clientY,
  // });
  let data = {
    x: e.clientX,
    y: e.clientY,
  };
  socket.emit("beginPath", data);
});

canvas.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    let data = {
      x: e.clientX,
      y: e.clientY,
      color: eraserFlag ? eraserColor : penColor,
      width: eraserFlag ? eraserWidth : penWidth,
    };
    socket.emit("drawStroke", data);
  }
  // drawStroke({});
});

canvas.addEventListener("mouseup", (e) => {
  mouseDown = false;

  let url = canvas.toDataURL();
  undoRedoTracker.push(url);
  track = undoRedoTracker.length - 1;
});

undo.addEventListener("click", (e) => {
  if (track > 0) track--;
  //action
  // let trackObj = {
  //   trackValue: track,
  //   undoRedoTracker,
  // };
  let data = {
    trackValue: track,
    undoRedoTracker,
  };
  //undoRedoCanvas(trackObj);
  socket.emit("redoUndo", data);
});

redo.addEventListener("click", (e) => {
  if (track < undoRedoTracker.length - 1) track++;
  //action
  // let trackObj = {
  //   trackValue: track,
  //   undoRedoTracker,
  // };
  let data = {
    trackValue: track,
    undoRedoTracker,
  };
  // undoRedoCanvas(trackObj);
  socket.emit("redoUndo", data);
});

function undoRedoCanvas(trackObj) {
  track = trackObj.trackValue;
  undoRedoTracker = trackObj.undoRedoTracker;

  let url = undoRedoTracker[track];
  let img = new Image();
  img.src = url;
  img.onload = (e) => {
    tool.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}

function beginPath(strokeObj) {
  tool.beginPath();
  tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj) {
  tool.lineTo(strokeObj.x, strokeObj.y);
  tool.strokeStyle = strokeObj.color;
  tool.lineWidth = strokeObj.width;
  tool.stroke();
}

console.log(pencilColor, "pencilColor");
pencilColor.forEach((colorElem) => {
  colorElem.addEventListener("click", (e) => {
    let color = colorElem.classList[0];
    penColor = color;
    tool.strokeStyle = penColor;
  });
});
// pencilColor.forEach((color))
pencilWidthElem.addEventListener("change", (e) => {
  penWidth = pencilWidthElem.value;
  tool.lineWidth = penWidth;
});

eraserWidthElem.addEventListener("change", (e) => {
  eraserWidth = eraserWidthElem.value;
  tool.lineWidth = eraserWidth;
});

eraser.addEventListener("click", (e) => {
  if (eraserFlag) {
    tool.strokeStyle = eraserColor;
    tool.lineWidth = eraserWidth;
  } else {
    tool.strokeStyle = penColor;
    tool.lineWidth = pencilColor;
  }
});

download.addEventListener("click", (e) => {
  let url = canvas.toDataURL();
  let a = document.createElement("a");
  a.href = url;
  a.download = "board.jpg";
  a.click();
});

socket.on("beginPath", (data) => {
  //data -> data from server
  beginPath(data);
});

socket.on("drawStroke", (data) => {
  drawStroke(data);
});

socket.on("redoUndo", (data) => {
  undoRedoCanvas(data);
});

function clearCanvas() {
  const tool = canvas?.getContext("2d");
  console.log(canvas, tool, tool.clearRect(0, 0, canvas.width, canvas.height));
  tool.clearRect(0, 0, canvas.width, canvas.height);
}

clearBtn.addEventListener("click", (e) => {
  socket.emit("clearCanvas", canvas);
  console.log("clicked");
});

socket.on("clearCanvas", (data) => {
  clearCanvas(data);
  console.log("diss");
});
