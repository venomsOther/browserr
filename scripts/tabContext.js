const rmt = require('electron').remote;
const Menu = rmt.Menu;
//console.log(Menu);
Menu.setApplicationMenu(null);

window.makeWebv = function makeWebv(url = "https://google.com"){

    let vv = window.document.createElement("web--view");
    vv.setAttribute('num',tabs.children.length);
    vv.setAttribute('disablewebsecurity','');
    vv.setAttribute('webpreferences','allowRunningInsecureContent, javascript=yes');
    vv.setAttribute('src',url);
    vv.setAttribute('allowpopups','');

    window.document.body.appendChild(vv);
}

function closeTab(){
    //console.log(window.currentTab.tRemove)
    window.currentTab.tRemove();
}

function openDevTools(){
    getCurrentView().openDevTools();
}

function newTab(){
    makeWebv();
}

Menu.setApplicationMenu(Menu.buildFromTemplate([
    {label:'Close Tab',accelerator : 'Ctrl+W',click:closeTab},
    {label:'Dev Tools',accelerator:'Ctrl+Shift+I',click:openDevTools},
    {label:'New Tab',accelerator:'Ctrl+T',click:newTab}
]));