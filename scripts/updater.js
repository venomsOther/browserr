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

function update (branch = 'master') {

    if(!require('fs').existsSync(__dirname+'/scripts/ulock')){
        require('fs').writeFileSync(__dirname+'/scripts/ulock',"");
        require('fs').writeFileSync(__dirname+'/scripts/ulock',`{\n\t"version" : "1.1.2",\n\t"files" : \n\t{\n\t\t"scripts/updater.js":"",\n\t\t"scripts/ulock"\n\t},\n\n\t"patches":\n\t{\n\t}\n}`);
        update(branch);
    }

    gread(branch,'scripts/updates.json').then((d)=>{;
        if(d == '404: Not Found') return;
        d = JSON.parse(d);
        let i;
        let f = JSON.parse(fs.readFileSync(__dirname+'/'+'updates.json').toString());
        let currentPatch = Object.keys(f.patches).length;

        if(d.patches[currentPatch + 1] != undefined){
            f.patches[currentPatch + 1] = d.patches[currentPatch + 1];
            fs.writeFileSync(__dirname+'/updates.json', JSON.stringify(f));
            for(i in d.patches[currentPatch + 1].files){ read(branch,i) }
            update(branch);
        }
    }).catch((e)=>{
        console.log(e);
    });
}

module.exports = update;
