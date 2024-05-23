var canvas
var gl

// Bu klavyenin hangi objeyi haraket ettireceğini belirler.
var selectedObject = 'eye';

var program;
var thetaLoc;

window.onload= function init() {
    console.log('Hello, WebGL!');

    canvas = document.getElementById('avatar-canvas');
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    gl.enable(gl.DEPTH_TEST);
    
    render();
}

function drawHead() {
    // vertex shader
    var vertexShader = `
    attribute vec4 vPosition;
    
    void main() {
        gl_Position = vPosition;
    }
    `;

    // fragment shader
    var fragmentShader = `
    precision mediump float;
    uniform vec4 u_SkinColor;
    
    void main() {
        gl_FragColor = u_SkinColor;
    }
    `;

    program = initShadersWithSource(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    // Circle 2D
    var vertices = [];

    var numSlices = 360;

    for (var i = 0; i < numSlices; i++) {
        var theta = i * 2 * Math.PI / numSlices;
        var x = Math.cos(theta);
        var y = Math.sin(theta);
        vertices.push(vec3(x*getValueWithElementId('head-width-slider', true), y / 1.6 * getValueWithElementId('head-height-slider', true), 0));
    }

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // skin color
    var skinColor = getColorWithElementId("skin-color-picker")
    var skinColorLoc = gl.getUniformLocation(program, "u_SkinColor");
    gl.uniform4fv(skinColorLoc, flatten(skinColor));

    gl.drawArrays(gl.TRIANGLE_FAN, 0, numSlices);
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

    program = initShadersWithSource(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

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

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // eye color
    var eyeColor = getColorWithElementId("eye-color-picker");
    var eyeColorLoc = gl.getUniformLocation(program, "u_EyeColor");
    gl.uniform4fv(eyeColorLoc, flatten(eyeColor));

    // Draw left eye
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 360);

    // Draw right eye
    gl.drawArrays(gl.TRIANGLE_FAN, 360, 360);
}



function render() {
    drawEyes(program);
    drawHead();
    requestAnimFrame( render );
}