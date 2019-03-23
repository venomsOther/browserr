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

    unshift(item){
        this.arr.unshift(item);
    }

    addTop(url,title){
        unshift({url:url,title:title});
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
        return new History(PageStorage.fromCSV(text));
    }

    getTime(i){
        return this.arr[i].time;
    }

    save(){
        super.toFile('history.json');
    }

    static fromFileAuto(){
        return History.fromCSV('bookmarks.json');
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