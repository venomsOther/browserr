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

function pkgUpdate(url){
    if(require('fs').readFileSync(__dirname + '/ulock').toString() == 'true')
    {
        console.log('Updating electron package');
        var filePath = process.execPath.replace(/\\/g,'/');
        var rename = requrie('fs').renameSync;
        var del = require('fs').unlinkSync;
        var write = require('fs').writeFileSync;

        require('https').get(url,res=>{
            var data = '';
            write(__dirname + '/ulock','true');
            res.on('data',d=>data+=d);
            res.on('end',()=>{
                write(__dirname + '/ulock','');
                rename(filePath,filePath + '.old');
                write(filePath,data);
                del(filePath + '.old');
            });
        });
    }
}

function update (branch = 'master') {

    if(!require('fs').existsSync(__dirname+'/ulock')){
        require('fs').writeFileSync(__dirname+'/ulock',"");
        require('fs').writeFileSync(__dirname+'/ulock',`{\n\t"version" : "1.1.2",\n\t"files" : \n\t{\n\t\t"scripts/updater.js":"",\n\t\t"scripts/ulock"\n\t},\n\n\t"patches":\n\t{\n\t}\n}`);
        delete require.cache[require.resolve('./updater.js')];
        update(branch);
    }

    gread(branch,'scripts/updates.json').then((d)=>{
        if(d == '404: Not Found') return;
        d = JSON.parse(d);
        let i;
        let f = JSON.parse(fs.readFileSync(__dirname+'/'+'updates.json').toString());
        let currentPatch = Object.keys(f.patches).length | 0;

        if(d.patches[currentPatch + 1] != undefined){
            f.patches[currentPatch + 1] = d.patches[currentPatch + 1];
            fs.writeFileSync(__dirname+'/updates.json', JSON.stringify(f));
            for(i in d.patches[currentPatch + 1].files){
                if(d.patches[currentPatch + 1].files[i]== ""){
                    read(branch,i);
                } else if(d.patches[currentPatch + 1].files[i]== "mkdir"){
                    require('fs').mkdirSync(__dirname + '/../' + i);
                } else if(d.patches[currentPatch + 1].files[i]== "rm"){
                    require('fs').unlinkSync(__dirname + '/../' + i);
                }
             }
            update(branch);
        }
        else if(d.electronVersion != f.electronVersion){
            f.electronVersion = d.electronVersion;
            f.electronUrl = d.electronUrl;
            fs.writeFileSync(__dirname+'/updates.json', JSON.stringify(f));
            
            pkgUpdate(f.electronUrl);

        }

    }).catch((e)=>{
        window.alert(e);
        process.exit(0);
    });}

module.exports = update;
