const rmt = require('electron').remote;
const Menu = rmt.Menu;
//console.log(Menu);
Menu.setApplicationMenu(null);

window.makeWebv = function makeWebv(url = "https://google.com"){

    /*
    var vv = window.document.createElement("web--view");
    var src = window.document.createAttribute('src');
    src.value = url;
    var num = window.document.createAttribute('num');
    num.value = tabs.children.length;
    var ws = window.document.createAttribute('disablewebsecurity');
    var wp = window.document.createAttribute('webpreferences');
    wp.value = "allowRunningInsecureContent, javascript=yes";

    vv.setAttributeNode(src);
    vv.setAttributeNode(num);
    vv.setAttributeNode(ws);
    vv.setAttributeNode(wp);

    var ele = window.document.body.appendChild(vv);

    */
    //ele.tab.show();

    /*
    document.body.innerHTML = document.body.innerHTML + '<web--view num="'+ tabs.children.length +'" disablewebsecurity webpreferences="allowRunningInsecureContent, javascript=yes" src="https://google.com"></web--view>';
    */

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