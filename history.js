class PageStorage{
    constructor(array){
        var i;
        for(i = 0; i<array.length;i++){
            array[i] = JSON.parse(array[i]);
        }

        this.arr = array;
    }

    getUrl(i){
        return this.arr[i].url;
    }

    getTitle(i){
        return this.arr[i].title;
    }

    static fromCSV(text){
        return new PageStorage(text.split(','));
    }

    toCSV(){
        for(i = 0; i<array.length;i++){
            array[i] = JSON.stringify(array[i]);
        }
        return this.arr.join(',');
    }

    static fromFile(fileName){
        return fromCSV(require('fs').readFileSync(fileName).toString());
    }

    toFile(fileName){
        require('fs').writeFileSync(fileName,toCSV);
    }

    push(item){
        this.arr.push(item);
    }
}

class History extends PageStorage{
    constructor(item){
        if(item instanceof PageStorage){
            super(item.arr);
        } else {
            super(item);
        }
    }

    static fromCSV(text){
        return new History(PageStorage.fromCSV(text));
    }

    getTime(i){
        return this.arr[i].time;
    }

    save(){
        super.toFile('history.json');
    }
}

class Bookmarks extends PageStorage{
    constructor(item){
        if(item instanceof PageStorage){
            super(item.arr);
        } else {
            super(item);
        }
    }

    static fromCSV(text){
        return new Bookmarks(PageStorage.fromCSV(text));
    }

    getTime(i){
        return this.arr[i].time;
    }

    save(){
        super.toFile('bookmarks.json');
    }
}