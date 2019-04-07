var $ = document.querySelector('textwrapper');

var currentS = JSON.parse(require('fs').readFileSync('scripts/settings.json').toString());

function doclose(){
    require('electron').remote.getCurrentWindow().close();
}

function editSettings(setting,value){
    var obj = JSON.parse(require('fs').readFileSync('scripts/settings.json').toString());
    obj[setting] = value;
    require('fs').writeFileSync('scripts/settings.json',JSON.stringify(obj));
}

function fontWeight(){
    editSettings('font-weight', $.querySelector('#weight').value);
}

function ZoomIncrement(){
    $.querySelector('#incrementV').innerHTML = $.querySelector('#increment').value;
    editSettings('ZoomIncrement', $.querySelector('#increment').value / 100);
}

function ZoomLevel(){
    $.querySelector('#zlvlV').innerHTML = $.querySelector('#zlvl').value + '%';
    editSettings('ZoomLevel', $.querySelector('#zlvl').value / 100);
}

function iconPack(){
    console.log(this);
    editSettings('iconPack', this.value);
}

$.querySelector('#weight').addEventListener('change',fontWeight);
$.querySelector('#increment').addEventListener('input',ZoomIncrement);
$.querySelector('#zlvl').addEventListener('input',ZoomLevel);

$.querySelectorAll('#icpp').forEach(e=>{
    if(e.value == currentS.iconPack){
        e.checked = true;
    }
    e.addEventListener('click', iconPack);
});

document.querySelector('.close').addEventListener('click',doclose);