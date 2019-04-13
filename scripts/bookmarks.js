const fs = require('fs');

module.exports = class reader{
    static get(i){
        var obj = this.readAsObj();
        return obj[i];
    }

    static readFile(fileName='scripts/bookmarks.json'){
        return fs.readFileSync(fileName).toString();
    }

    static readAsObj(fileName='scripts/bookmarks.json'){
        return JSON.parse(this.readFile(fileName));
    }

    static set(i,d){
        var obj = this.readAsObj();
        obj[i]=d;
        this.writeFromObj('scripts/bookmarks.json',obj);
    }

    static writeFromObj(fileName,obj){
        this.writeFile(fileName,JSON.stringify(obj));
    }

    static writeFile(fileName,obj){
        fs.writeFileSync(fileName,obj);
    }
}