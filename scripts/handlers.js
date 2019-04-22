const settings = JSON.parse(require('fs').readFileSync(__dirname+'/'+'settings.json').toString());
var svgs = require('./icons.js');
const zoomFactorChange = settings.ZoomIncrement;
const History = require('./history.js').History;
const thisWindow = require('electron').remote.getCurrentWindow();
const readIcons = require('./readIcons.js');
const IconSet = new readIcons(settings.iconPack);
window.indicator = window.document.querySelector('ind');



window.urlify = function urlify(text,callback){
    var es = require('url-exists');

    es("https://" + text, (err,bool)=>{
        if(bool){
            callback("https://"+text);
        }else{
            es("http://" + text, (err,bool)=>{
                if(bool){
                    callback("http://" + text);
                }else{
                    callback("https://" + window.searchProvider + "/search?q=" + text.replace(/ /g, '+'));
                }
            });
        }
    });
}

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

    window.document.querySelector('multi-view').addChild(vv);
}

window.searchProvider = "www.google.com";
window.tabs = window.document.querySelector('page-tabs');



function addToHistory(url,title){
    History.addItem({url:url,title:title,date:Date.now()});
}

window.makeNewWin = function makeNewWin(){
    window.open('index.html');
}

window.settingsWindow = function settingsWindow(){
    window.open('settings.html')
}

window.bookmarksWindow = function settingsWindow(){
    window.open('bookmarkspage.html')
}

window.historyWindow = function historyWindow(){
    window.open('historypage.html')
}

function changeChrome(r,g,b){
    document.querySelector('chrome').style.background = `rgb(${r},${g},${b})`;
}

function handleWindowRequest(event){
    url = event.url;
    frameName = event.frameName;
    disposition = event.disposition; /* can be one of: default, foreground-tab, background-tab, new-window, save-to-disk, other. */
    options = event.options; /* like if you were to make a new browserWindow, its the exact same options as that */

    // for now just make a new tab, but later add functionality for stuff like background tabs and stuff.
    // downloads will be webview.downloadFile()
    //console.log(url);
    makeWebv(url);
}

function handleTargetUrl(event){
    //console.log(event);

    if(event.url == ""){
        window.document.querySelector('ind').style.display = 'none';
        mouseLinkHover = null;
    } else{
        var a = window.document.querySelector('ind');
        a.style.display = 'inline-block';
        a.innerHTML = event.url;
        mouseLinkHover = event.url;
    }
}

function handleStartLoad(e){
    window.document.querySelector('ind').display = 'inline-block';
    window.document.querySelector('ind').innerHTML = 'loading...';
}

function handleStopLoad(e){
    window.document.querySelector('ind').display = 'none';
}

function handleURLUpdate(event){
    addToHistory(event.url,event.srcElement.getTitle());
}

window.getCurrentView = function getCurrentView(){
    return window.document.querySelector('web--view:not([style="display: none;"])').view;
}

window.openTools = function openTools(){
    getCurrentView().openDevTools();
}

function minimize(){
    require('electron').remote.getCurrentWindow().minimize();
}

function close(){
    require('electron').remote.getCurrentWindow().close()
}

function maximize(){
    if(thisWindow.isMaximized()){
        thisWindow.unmaximize();
    }else{
        thisWindow.maximize();
    }
}


function pgBack(){
    window.document.querySelector('web--view:not([style="display: none;"])').view.goBack();
}

function pgForward(){
    window.document.querySelector('web--view:not([style="display: none;"])').view.goForward();
}

function pgRefresh(){
    window.document.querySelector('web--view:not([style="display: none;"])').view.reloadIgnoringCache();
}

function focusSearchInput(){
    window.document.body.querySelector('search-bar').querySelector('sch-ipt').focus();
}