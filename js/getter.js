// Bu fonksyion html dosyasında bu id ile olan picker'ın rengini döndürür. vector4 olarak döndürür.
function getColorWithElementId(id) {
    var element = document.getElementById(id);
    var color = element.value;
    color = color.substring(1);
    var r = parseInt(color.substring(0, 2), 16) / 255;
    var g = parseInt(color.substring(2, 4), 16) / 255;
    var b = parseInt(color.substring(4, 6), 16) / 255;
    var a = 1;
    color = vec4(r, g, b, a);
    return color;
}