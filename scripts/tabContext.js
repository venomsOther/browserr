const rmt = require('electron').remote;
const Menu = rmt.Menu;
console.log(Menu);
Menu.setApplicationMenu(null);

function closeTab(){
    //console.log(window.currentTab.tRemove)
    window.currentTab.tRemove();
}

function openDevTools(){
    getCurrentView().openDevTools();
}

Menu.setApplicationMenu(Menu.buildFromTemplate([
    {label:'Close Tab',accelerator : 'Ctrl+W',click:closeTab},
    {label:'Dev Tools',accelerator:'Ctrl+Shift+I',click:openDevTools}
]));