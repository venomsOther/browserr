function urlBreadcrumbs(url){
    var a = url.substring(url.indexOf('/',8)).split('/');
    a.shift();
    return a;
}

function preprocess(filename,replacements){
    var txt = require('fs').readFileSync(__dirname+'/'+filename).toString();
    for(var i in replacements){
        var regex = new RegExp(i,'g');
        txt=txt.replace(regex,replacements[i]);
    }

    return txt;
}

var darkgray = "hsl(0,0%,80%)";
var lightgrey = "hsl(0,0%,90%)";
var lighter = "hsl(0,0%,100%)";
var tabRight = "hsl(0,0%,70%)";
var black = "hsl(0,0%,50%)";
var bright = 'white';


var normalStyle = document.createElement('style');
normalStyle.innerHTML = preprocess('style.css',{
    "darkgray":darkgray,
    "darkgrey":darkgray,
    "lightgrey":lightgrey,
    "lightgray":lightgrey,
    "rgb(220,220,220)":lighter,
    "rgb(50,50,50)":tabRight,
    "black":black,
    "#ffffff":bright
});



document.querySelector('head').appendChild(normalStyle);
