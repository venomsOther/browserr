module.exports = class IconSet {
    constructor(name){
        this.name = name;
        
        var obj = JSON.parse(require('fs').readFileSync('scripts/locations.json').toString());
        this.dir = obj[name];
        this.icons = JSON.parse(require('fs').readFileSync(this.dir+'/icons.json').toString());
    }

    read(name){
        return require('fs').readFileSync(this.dir+'/'+this.icons[name]);
    }

    getDir(name){
        return this.dir+'/'+this.icons[name];
    }
}