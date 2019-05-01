module.exports = class reader{
    static get(i){
        var obj = this.readAsObj();
        return obj[i];
    }

    static readAsObj(){
        return window.settings.b;
    }

    static set(i,d){
        var obj = this.readAsObj();
        obj[i]=d;
        this.writeFromObj(obj);
    }

    static remove(i){
        var obj = this.readAsObj();
        obj[i]=null;

        let newobj={};
        for(let a in obj){
            if(obj[a]!=null){
                newobj[a] = obj[a];
            }
        }

        this.writeFromObj(newobj);
    }

    static writeFromObj(obj){
        require('./editUser.js').set('b',obj);
    }
}
