const fs = require('fs');

module.exports = class reader{
    static get(i){
        var obj = readAsObj();
        return obj[i];
    }

    static readFile(fileName='bookmarks.json'){
        return fs.readFileSync(fileName).toString();
    }

    static readAsObj(fileName='bookmarks.json'){
        return JSON.parse(readFile(fileName));
    }

    static set(i,d){
        var obj = readAsObj();
        obj[i]=d;
        writeFromObj(obj);
    }

    static writeFromObj(fileName,obj){
        writeFile(fileName,JSON.stringify(obj));
    }

    static writeFile(fileName,obj){
        fs.writeFileSync(fileName,obj);
    }
}