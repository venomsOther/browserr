class History{
    static addItem(item){
        var file = require('fs').readFileSync('history.json').toString();

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

        require('fs').writeFileSync('history.json',JSON.stringify(obj));
    }

    static getItem(item){
        
    }

    static readFile(){

    }
}

exports.History = History;