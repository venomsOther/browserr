const rmt = require('electron').remote;
const Menu = rmt.Menu;
//console.log(Menu);
Menu.setApplicationMenu(null);
const BrowserWindow = rmt.BrowserWindow;

window.makeWebv = function makeWebv(url = "https://google.com"){

    let vv = window.document.createElement("web--view");
    vv.setAttribute('num',tabs.children.length);
    vv.setAttribute('disablewebsecurity','');
    vv.setAttribute('webpreferences','allowRunningInsecureContent, javascript=yes');
    vv.setAttribute('src',url);
    vv.setAttribute('allowpopups','');

    window.document.querySelector('multi-view').addChild(vv);
}

function changeWindow(){
    Menu.setApplicationMenu(mnu);
}

rmt.getCurrentWindow().on('focus',changeWindow)

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

function newWindow(){
    var win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        },
        icon: './images.png',
        frame: false,
        minWidth: '145',
        minHeight: '100'});

    win.loadFile('index.html');
}

let mnu = Menu.buildFromTemplate([
    {label:'Close Tab',accelerator : 'Ctrl+W',click:closeTab},
    {label:'Dev Tools',accelerator:'Ctrl+Shift+I',click:openDevTools},
    {label:'New Tab',accelerator:'Ctrl+T',click:newTab},
    {label:'New Window',accelerator:'Ctrl+N',click:newWindow}
]);

Menu.setApplicationMenu(mnu);