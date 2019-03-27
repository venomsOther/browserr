module.exports = class {
    constructor(name){
        this.__dir = name;
        
        var obj = JSON.parse(require('fs').readFileSync('locations.json'));
        this.dir = obj[name];
    }

    
}