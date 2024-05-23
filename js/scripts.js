var canvas
var gl

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

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "skin-fragment-shader" );
    gl.useProgram( program );
    
    render();
}

function drawHead() {
    // Circle 2D
    var vertices = [];

    var numSlices = 360;

    for (var i = 0; i < numSlices; i++) {
        var theta = i * 2 * Math.PI / numSlices;
        var x = Math.cos(theta);
        var y = Math.sin(theta);
        vertices.push(vec3(x*0.5, y / 1.6 * 0.5, 0));
    }

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // skin color
    var skinColor = getColorWithElementId("skin-color-picker")
    console.log(skinColor   )
    var skinColorLoc = gl.getUniformLocation(program, "u_SkinColor");
    gl.uniform4fv(skinColorLoc, flatten(skinColor));

    gl.drawArrays(gl.TRIANGLE_FAN, 0, numSlices);
}


function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    drawHead(program);
    requestAnimFrame( render );
}