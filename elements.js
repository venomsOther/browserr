function urlBreadcrumbs(url){
    var a = url.substring(url.indexOf('/',8)).split('/');
    a.shift();
    return a;
}