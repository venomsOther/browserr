class History{
    static addItem(item){
        var file = require('fs').readFileSync('scripts/history.json').toString();

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

    static getItem(item){
        
    }

    static readFile(){

    }

    static removeItem(n){
        var file = require('fs').readFileSync('scripts/history.json').toString();

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
                ii--;
            }
            else{
                obj[ii] = arr[i];
            }

            ii++;
        }

        for(i = 0; i<arr.length; i++){
            obj[i] = arr[i];
        }

        require('fs').writeFileSync('scripts/history.json',JSON.stringify(obj));
    }

    static asArray(){
        var file = require('fs').readFileSync('scripts/history.json').toString();

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
}

exports.History = History;