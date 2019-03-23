class PageStorage{
    constructor(array){
        window.array = array;
        if(array == ""){
            this.arr = {};
        }
        else{
            var i;
            for(i = 0; i<array.length;i++){
                array[i] = JSON.parse(array[i]);
            }
    
            this.arr = array;
        }
        
    }

    get length(){
        return this.arr.length;
    }

    getUrl(i){
        return this.arr[i].url;
    }

    getTitle(i){
        return this.arr[i].title;
    }

    static fromJSON(text){
        return new PageStorage(JSON.parse(text))
    }

    toJSON(){
        return JSON.stringify(this.arr);
    }

    static fromFile(fileName){
        return PageStorage.fromJSON(require('fs').readFileSync(fileName).toString());
    }

    toFile(fileName){
        require('fs').writeFileSync(fileName,this.toJSON());
    }

    push(item){
        this.arr[this.arr.length] = item
    }

    add(url,title){
        push({url:url,title:title});
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
        return new History(PageStorage.fromJSON(text));
    }

    getTime(i){
        return this.arr[i].time;
    }

    save(){
        super.toFile('history.json');
    }

    static fromFileAuto(){
        return new History(PageStorage.fromFile('history.json'));
    }

    add(url,title){
        super.push({url:url,title:title,date:Date.now()})
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

    save(){
        super.toFile('bookmarks.json');
    }

    static fromFileAuto(){
        return Bookmarks.fromCSV('bookmarks.json');
    }
}

module.exports = {
    History : History,
    Bookmarks : Bookmarks
}