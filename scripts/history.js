class History{
    constructor(filename){
        this.filename = filename;
    }
    HaddItem(item){this.addItem(item,this.filename)}

    static addItem(item){

        var arr = window.settings.h;

        arr.push(item);

        require('./editUser').set('h',arr);
    }

    static getItem(item,){

    }

    static readFile(){
        return window.settings.h
    }

    static removeItem(n){
        var arr = window.settings.h;
        arr.splice(n,1)

        require('./editUser').set('h',arr);
    }

    static asArray(){
        return this.readFile();
    }

    static clearAll(){
        require('./editUser').set('h',[]);
    }
}

exports.History = History;
