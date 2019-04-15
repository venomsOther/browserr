class History{
    constructor(filename){
        this.filename = filename;
    }
    HaddItem(item){this.addItem(item,this.filename)}

    static addItem(item,filename='scripts/history.json'){
        var file = require('fs').readFileSync(filename).toString();

        var obj = JSON.parse(file);
        var arr = [];
        var i, ii;
        i=0;
        for(ii in obj){
            arr[i] = obj[ii];
            i++
        }

        arr.push(item);

        for(i = 0; i<arr.length; i++){
            obj[i] = arr[i];
        }

        require('fs').writeFileSync('scripts/history.json',JSON.stringify(obj));
    }

    static getItem(item, filename='scripts/history.json'){
        
    }

    static readFile(filename='scripts/history.json'){

    }

    static removeItem(n,filename='scripts/history.json'){
        var file = require('fs').readFileSync(filename).toString();

        var obj = JSON.parse(file);
        var arr = [];
        var i, ii;
        i=0;
        for(ii in obj){
            arr[i] = obj[ii];
            i++
        }

        arr[n] = null;
        ii = 0;

        for(i = 0; i<arr.length; i++){
            if(arr[i] == null){
                // do nothing
            }
            else{
                obj[ii] = arr[i];
                ii++;
            }
        }

        console.log(obj)

        require('fs').writeFileSync('scripts/history.json',JSON.stringify(obj));
    }

    static asArray(filename='scripts/history.json'){
        var file = require('fs').readFileSync(filename).toString();

        var obj = JSON.parse(file);
        var arr = [];
        var i, ii;
        i=0;
        for(ii in obj){
            arr[i] = obj[ii];
            i++
        }

        return arr;
    }

    static clearAll(filename='scripts/history.json'){
        require('fs').writeFileSync(filename,'{}');
    }
}

exports.History = History;