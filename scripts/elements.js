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

var normalStyle = document.createElement('style');
normalStyle.innerHTML = preprocess('style.css',{

});

console.log(preprocess('style.css',{
    "darkgray":"blue"
}));

document.querySelector('head').appendChild(normalStyle);
