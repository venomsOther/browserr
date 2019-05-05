module.exports = (filename, url, secure) => {

    var https = require('https');
    var http = require('http');
    if(secure){
        f('https',filename,url);
    }else{
        f('http',filename,url)
    }
}


function f(mod,filename,url){
    var fs = require('fs');
    var newf = fs.createWriteStream(filename);
    require(mod).get(url,(res)=>{
        newf.pipe(res);
    });
}
