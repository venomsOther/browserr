//window.document.querySelector('body').addEventListener('', 
//()=>{
    var settings = JSON.parse(require('fs').readFileSync(__dirname+'/'+'settings.json').toString());

    if(!settings.bookmarks){
        window.document.querySelector('book-marks').remove();
    }

//});
