function urlBreadcrumbs(url){
    var a = url.substring(url.indexOf('/',8)).split('/');
    a.shift();
    return a;
}

class WebSearch{
    constructor(url){
        this.crumbs = urlBreadcrumbs(url);
        this.url = url; 
    }

    htmlify(){
        return url.substring(0,url.indexOf('/')) + `<span hint>${this.crumbs.join('/')}</span>`;
    }
}

module.exports = WebSearch;