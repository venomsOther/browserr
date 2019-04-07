var $ = document.querySelector('textwrapper');

function editSettings(setting,value){
    var obj = JSON.parse(require('fs').readFileSync('scripts/settings.json').toString());
    obj[setting] = value;
    require('fs').writeFileSync('scripts/settings.json',JSON.stringify(obj));
}

function fontWeight(){
    editSettings('font-weight', $.querySelector('#weight').value);
    
}

$.querySelector('#weight').addEventListener('change',fontWeight);