module.exports = class IconSet {
    constructor(name){
        this.__dir = name;
        
        var obj = JSON.parse(require('fs').readFileSync('locations.json').toString());
        this.dir = obj[name];
        this.icons = JSON.parse(require('fs').readFileSync(dir+'/icons.json').toString());
    }
}