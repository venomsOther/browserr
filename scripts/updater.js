const https = require('https');
const fs = require('fs');

function read(branch, filePath){
    var url = 'https://raw.githubusercontent.com/eatmyvenom/browserr/' + branch + '/' + filePath;
    https.get(url, res => {
        let data = "";
        res.on('data',d=>{data+=d});
        res.on('end',e=>{fs.writeFileSync(__dirname+'/../'+filePath,data)});
    });
}

function gread(branch, filePath){
    return new Promise((resolve,reject)=>{
        var url = 'https://raw.githubusercontent.com/eatmyvenom/browserr/' + branch + '/' + filePath;

        try{
            https.get(url, res => {
                let data = "";
                res.on('data',d=>{data+=d});
                res.on('end',e=>{resolve(data)});
            });
        }catch(e){
            reject(e);
        }
    });
}

module.exports = (branch = 'master') => {
    gread(branch,'scripts/updates.json').then((d)=>{;
        if(d == '404: Not Found') return;
        d = JSON.parse(d);
        let i;
        let f = JSON.parse(fs.readFileSync(__dirname+'/'+'updates.json').toString());

        if(d.version != f.version){
            fs.writeFileSync(__dirname+'/'+'updates.json', JSON.stringify(d));
            for(i in d.files){ read(branch,i) }
        }
    }).catch((e)=>{
        console.log(e);
    });
}
