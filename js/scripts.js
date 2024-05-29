var canvas;
var gl;

// Bu klavyenin hangi objeyi haraket ettireceğini belirler.
var selectedObject = 'eye';

var program;

window.onload = function init() {
    console.log('Hello, WebGL!');

    canvas = document.getElementById('avatar-canvas');
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    
    render();
};

function drawHead(modelViewMatrix, projectionMatrix) {
    // vertex shader
    var vertexShader = `
    attribute vec4 vPosition;
    attribute vec4 vColor;
    uniform mat4 u_ModelViewMatrix;
    uniform mat4 u_ProjectionMatrix;
    varying vec4 v_Color;

    void main() {
        gl_Position = u_ProjectionMatrix * u_ModelViewMatrix * vPosition;
        v_Color = vColor;
    }
    `;

    // fragment shader
    var fragmentShader = `
    precision mediump float;
    varying vec4 v_Color;

    void main() {
        gl_FragColor = v_Color;
    }
    `;

    var program = initShadersWithSource(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    var vertices = [];
    var colors = [];
    var latitudeBands = 30;
    var longitudeBands = 30;

    for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
        var theta = latNumber * Math.PI / latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
            var phi = longNumber * 2 * Math.PI / longitudeBands;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;

            vertices.push(vec3(x * getValueWithElementId('head-width-slider', true) / 10,
                               y * getValueWithElementId('head-height-slider', true) / 10,
                               z * getValueWithElementId('head-depth-slider', true) / 10));
            // Assign a random color to each vertex for demonstration purposes
            colors.push(vec4(Math.random(), Math.random(), Math.random(), 1.0));
        }
    }

    var indices = [];
    for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
        for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
            var first = (latNumber * (longitudeBands + 1)) + longNumber;
            var second = first + longitudeBands + 1;
            indices.push(first, second, first + 1);
            indices.push(second, second + 1, first + 1);
        }
    }

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    var projectionMatrixLoc = gl.getUniformLocation(program, "u_ProjectionMatrix");
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    var modelViewMatrixLoc = gl.getUniformLocation(program, "u_ModelViewMatrix");
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}


function drawEyes() {
    // vertex shader (On the head of the avatar)
    // will send position from html
    var vertexShader = `
    attribute vec4 vPosition;

    void main() {
        gl_Position = vPosition;
    }
    `;

    // fragment shader
    var fragmentShader = `
    precision mediump float;
    uniform vec4 u_EyeColor;

    void main() {
        gl_FragColor = u_EyeColor;
    }
    `;

    var eyeProgram = initShadersWithSource(gl, vertexShader, fragmentShader);
    gl.useProgram(eyeProgram);

    // Get eye position from HTML
    var eyeX = getValueWithElementId('eye-x-slider', true);
    var eyeY = getValueWithElementId('eye-y-slider', true);
    var separation = getValueWithElementId('eye-separation-slider', true); // New separation value

    // Function to create circle vertices
    function createCircleVertices(centerX, centerY) {
        var vertices = [];
        var numSlices = 360;
        for (var i = 0; i < numSlices; i++) {
            var theta = i * 2 * Math.PI / numSlices;
            var x = Math.cos(theta) * 0.1 + centerX;
            var y = Math.sin(theta) / 1.6 * 0.1 + centerY;
            vertices.push(vec3(x, y, 0.0));
        }
        return vertices;
    }

    // Create vertices for both eyes
    var leftEyeVertices = createCircleVertices(eyeX - separation / 2, eyeY);
    var rightEyeVertices = createCircleVertices(eyeX + separation / 2, eyeY);

    // Combine vertices for both eyes
    var vertices = leftEyeVertices.concat(rightEyeVertices);

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(eyeProgram, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // eye color
    var eyeColor = getColorWithElementId("eye-color-picker");
    var eyeColorLoc = gl.getUniformLocation(eyeProgram, "u_EyeColor");
    gl.uniform4fv(eyeColorLoc, flatten(eyeColor));

    // Draw left eye
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 360);

    // Draw right eye
    gl.drawArrays(gl.TRIANGLE_FAN, 360, 360);
}

function render() {
    // Clear the canvas before drawing
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Get camera position from sliders
    var camX = getValueWithElementId('camera-x-slider', true);
    var camY = getValueWithElementId('camera-y-slider', true);
    var camZ = getValueWithElementId('camera-z-slider', true);

    // Projection and ModelView matrices
    var projectionMatrix = perspective(45, canvas.width / canvas.height, 0.1, 100);
    var modelViewMatrix = lookAt(vec3(camX, camY, camZ), vec3(0, 0, 0), vec3(0, 1, 0));

    // Draw head with updated camera
    drawHead(modelViewMatrix, projectionMatrix);

    // Draw eyes
    drawEyes();

    requestAnimFrame(render);
}
