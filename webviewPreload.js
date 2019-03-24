const remote = require('electron').remote;
const Menu = remote.require('electron').Menu
const MenuItem = remote.require('electron').MenuItem;

let rightclickpoint = {x:0,y:0};

function handleInspectElementClick(menuItem, browserWindow, event){

    x = rightclickpoint.x;
    y = rightclickpoint.y;

    remote.getCurrentWebContents().inspectElement(x,y);
    console.log(remote.getCurrentWebContents())
}



var contextMenu = Menu.buildFromTemplate([
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



function handleContextMenu(e){
    console.log(e);
    rightclickpoint.x = e.x;
    rightclickpoint.y = e.y + 100;
//    console.log(remote.getCurrentWindow());
    contextMenu.popup()
}


//console.log(window);
window.oncontextmenu = handleContextMenu;