var $ = document.querySelector('textwrapper');

function editSettings(setting,value){
    var obj = JSON.parse(require('fs').readFileSync('settings.json').toString());
    obj[setting] = value;
    require('fs').writeFileSync('settings.json',JSON.stringify(obj));
}

function fontWeight(){
    editSettings(fontWeight, this.innerHTML);
    
}

$.querySelector('#weight').addEventListener('change',fontWeight);