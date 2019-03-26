const remote = require('electron').remote;
const Menu = remote.require('electron').Menu
const webC = remote.getCurrentWebContents();

// for debugging
//window.remote = remote;

// global vars because of event emitters which is vucking stupid
let rightclickpoint = {x:0,y:0};
let contextUrl;

// Handlers
//
//  
function handleInspectElementClick(menuItem, browserWindow, event){

    x = rightclickpoint.x;
    y = rightclickpoint.y;

//  console.log(browserWindow)

    remote.getCurrentWebContents().inspectElement(x,y);
//    console.log(remote.getCurrentWebContents())
}

function handleOpenNewTab(menuItem, browserWindow, event){

}
 
function handleOpenNewWin(){

}

function handleCopyLink(){

}

function handleNavReload(){

}

function handleNavBack(){

}

function handleNavForward(){

}

// Menus
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
var textMenu =  Menu.buildFromTemplate([
    {role:'undo'},
    {role:'redo'},
    {role:'selectAll'},
    {role:'copy'},
    {role:'cut'},
    {role:'paste'},
    {role:'delete'},
    {type:'separator'},
    {role:'resetZoom'},
    {role:'zoomIn'},
    {role:'zoomOut'},
    {type:'separator'},
    {label:'Inspect Element',click: handleInspectElementClick}
]);

var linkMenu = Menu.buildFromTemplate([
    {label:'Open in new tab', click: handleOpenNewTab},
    {label:'Open in new Window', click: handleOpenNewWin},
    {label:'Copy link', click:handleCopyLink},
    {type:'separator'},
    {role:'zoomIn'},
    {role:'zoomOut'},
    {type:'separator'},
    {label:'Inspect Element', click: handleInspectElementClick}
]); 

var defaultMenu = Menu.buildFromTemplate([
    {label:'Back', click:handleNavBack},
    {label:'Forward', click: handleNavForward},
    {label:'Reload', click: handleNavReload},
    {type:'separator'},
    {role:'zoomIn'},
    {role:'zoomOut'},
    {type:'separator'},
    {label:'Inspect Element', click: handleInspectElementClick}
]);

var contextMenu = defaultMenu;


// Events
//////////////////////////////////////
/////////////////////////////////////

function handleContextMenu(e){
//    console.log(e);
    rightclickpoint.x = e.x;
    rightclickpoint.y = e.y + 100;
//    console.log(remote.getCurrentWindow());
    contextMenu.popup()
}

function handleTargetUrlUpdate(e,u){
    var isHovering = !(u == "");

    if(isHovering){
        contextMenu = linkMenu;
        contextUrl = u;
    }else{
        contextMenu = defaultMenu;
    }
}


// Emitters
/////////////////////////////////////////
////////////////////////////////////////
webC.on('update-target-url', handleTargetUrlUpdate);
window.oncontextmenu = handleContextMenu;