document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    switch (selectedObject) {
      case "head":
        document.getElementById("head-width-slider").value =
          parseFloat(document.getElementById("head-width-slider").value) - 1;
        break;
      case "eye":
        document.getElementById("eye-x-slider").value =
          parseFloat(document.getElementById("eye-x-slider").value) - 1;
        break;
      case "body":
        noseTheta -= 0.1;
        break;
      case "clothes":
        mouthTheta -= 0.1;
        break;
    }
  } else if (event.key === "ArrowRight") {
    switch (selectedObject) {
      case "head":
        document.getElementById("head-width-slider").value =
          parseFloat(document.getElementById("head-width-slider").value) + 1;
        break;
      case "eye":
        document.getElementById("eye-x-slider").value =
          parseFloat(document.getElementById("eye-x-slider").value) + 1;
        break;
      case "body":
        noseTheta += 0.1;
        break;
      case "clothes":
        mouthTheta += 0.1;
        break;
    }
  } else if (event.key === "ArrowUp") {
    switch (selectedObject) {
      case "head":
        document.getElementById("head-height-slider").value =
          parseFloat(document.getElementById("head-height-slider").value) + 1;
        break;
      case "eye":
        document.getElementById("eye-y-slider").value =
          parseFloat(document.getElementById("eye-y-slider").value) + 1;
        break;
      case "body":
        mouthTheta += 0.1;
        break;
      case "clothes":
        noseTheta += 0.1;
        break;
    }
  } else if (event.key === "ArrowDown") {
    switch (selectedObject) {
      case "head":
        document.getElementById("head-height-slider").value =
          parseFloat(document.getElementById("head-height-slider").value) - 1;
        break;
      case "eye":
        document.getElementById("eye-y-slider").value =
          parseFloat(document.getElementById("eye-y-slider").value) - 1;
        break;
      case "body":
        mouthTheta -= 0.1;
        break;
      case "clothes":
        noseTheta -= 0.1;
        break;
    }
  }
});

eyeControlsHtml = `
Left Arrow - Moves Eyes Left <br>
Right Arrow - Moves Eyes Right <br>
Up - Moves Up <br>
Down - Moves Down <br>
`;

headControlHTML = `
Left Arrow - Decreases Head Width <br>
Right Arrow - Increases Head Width <br>
Up - Increases Head Height <br>
Down - Decreases Head Height <br>
`;

// Add left arrow key listener
function onSelectObjectChange(newObject) {
  // Reset button background
  var buttons = document.getElementsByClassName("part-buttons");
  var controlHTML = document.getElementById("keyboard-controls");
  controlHTML.innerHTML = "";
  for (var i = 0; i < buttons.length; i++) {
    // bg-slate-600 hover:bg-slate-700
    buttons[i].classList.add("bg-slate-600");
    buttons[i].classList.add("hover:bg-slate-700");

    buttons[i].classList.remove("bg-green-500");
    buttons[i].classList.remove("hover:bg-green-600");
  }

  selectedObject = newObject;
  if (selectedObject === "head") {
    var button = document.getElementById("head-button");
    button.classList.add("bg-green-500");
    button.classList.add("hover:bg-green-600");
    button.classList.remove("bg-slate-600");
    button.classList.remove("hover:bg-slate-700");

    controlHTML.innerHTML = headControlHTML;
  } else if (selectedObject === "eye") {
    var button = document.getElementById("eye-button");
    button.classList.add("bg-green-500");
    button.classList.add("hover:bg-green-600");
    button.classList.remove("bg-slate-600");
    button.classList.remove("hover:bg-slate-700");

    controlHTML.innerHTML = eyeControlsHtml;
  } else if (selectedObject === "body") {
    var button = document.getElementById("body-button");
    button.classList.add("bg-green-500");
    button.classList.add("hover:bg-green-600");
    button.classList.remove("bg-slate-600");
    button.classList.remove("hover:bg-slate-700");
  } else if (selectedObject === "clothes") {
    var button = document.getElementById("clothes-button");
    button.classList.add("bg-green-500");
    button.classList.add("hover:bg-green-600");
    button.classList.remove("bg-slate-600");
    button.classList.remove("hover:bg-slate-700");
  }
}
