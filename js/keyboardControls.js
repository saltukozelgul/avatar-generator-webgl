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
`

headControlHTML = `
Left Arrow - Decreases Head Width <br>
Right Arrow - Increases Head Width <br>
Up - Increases Head Height <br>
Down - Decreases Head Height <br>
`


// Add left arrow key listener
function onSelectObjectChange(newObject) {
  // Reset button background
  var buttons = document.getElementsByClassName("part-buttons");
  var controlHTML = document.getElementById("keyboard-controls")
  controlHTML.innerHTML = ""
  for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("bg-green-500");
      buttons[i].classList.remove("hover:bg-green-600");
  }

  selectedObject = newObject;
  if (selectedObject === "head") {
      document.getElementById("head-button").classList.add("bg-green-500");
      document.getElementById("head-button").classList.add("hover:bg-green-600");

      controlHTML.innerHTML = headControlHTML
  } else if (selectedObject === "eye") {
      document.getElementById("eye-button").classList.add("bg-green-500");
      document.getElementById("eye-button").classList.add("hover:bg-green-600");

      controlHTML.innerHTML = eyeControlsHtml

  } else if (selectedObject === "body") {
      document.getElementById("body-button").classList.add("bg-green-500");
      document.getElementById("body-button").classList.add("hover:bg-green-600");
  }
  else if (selectedObject === "clothes") {
      document.getElementById("clothes-button").classList.add("bg-green-500");
      document.getElementById("clothes-button").classList.add("hover:bg-green-600");
  }

}


