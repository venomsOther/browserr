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

function doTheme(theme){

    var darkgray = "hsl(0,0%,80%)";
    var lightgrey = "hsl(0,0%,90%)";
    var lighter = "hsl(0,0%,100%)";
    var tabRight = "hsl(0,0%,70%)";
    var black = "hsl(0,0%,50%)";
    var bright = 'white';

    if(theme == 'bright'){
        bright = "hsl(0,0%,80%)";
        black = "hsl(0,0%,90%)";
        tabRight = "hsl(0,0%,100%)";
        lighter = "hsl(0,0%,70%)";
        lightgrey = "hsl(0,0%,50%)";
        darkgray = 'white';
    }

    if(theme == 'dark'){
        darkgray = "hsl(0,0%,20%)";
        lightgrey = "hsl(0,0%,10%)";
        lighter = "hsl(0,0%,0%)";
        tabRight = "hsl(0,0%,30%)";
        black = "hsl(0,0%,50%)";
        bright = 'black';
    }


    var normalStyle = document.createElement('style');
    normalStyle.innerHTML = preprocess('style.css',{
        "darkgray":darkgray,
        "darkgrey":darkgray,
        "lightgrey":lightgrey,
        "lightgray":lightgrey,
        "rgb(220,220,220)":lighter,
        "rgb(50,50,50)":tabRight,
        "black":black,
        "#ffffff":bright,
        "white":bright,
        "whitesmoke":bright
    });

    document.querySelector('head').appendChild(normalStyle);
}


doTheme('b');
