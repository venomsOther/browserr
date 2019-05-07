const History = require('../history.js').History;
const WebSearch = require('../websearch.js')
var nonPageItems = [document.querySelector('tabBar'), document.querySelector('toolbar'), document.querySelector('book-marks')];

function handleWindowRequest(event){
    url = event.url;
    frameName = event.frameName;
    disposition = event.disposition; /* can be one of: default, foreground-tab, background-tab, new-window, save-to-disk, other. */
    options = event.options; /* like if you were to make a new browserWindow, its the exact same options as that */

    // for now just make a new tab, but later add functionality for stuff like background tabs and stuff.
    // downloads will be webview.downloadFile()
    makeWebv(url);
}

function addToHistory(url,title){
    History.addItem({url:url,title:title,date:Date.now()});
}

function handleTargetUrl(event){

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

    document.querySelector('body > toolbar > search-bar > sch-ipt').innerHTML = new WebSearch(event.url).htmlify();
    console.log(this.src)
    addToHistory(event.url,event.srcElement.getTitle());
}

function handleFullScreen(event){
    nonPageItems.forEach(e=>{
        e.style.display = 'none';
    });
    this.style.position = 'absolute';
    this.style.height = '100vh';
    this.style.width = '100vw';
}

function handleNormalScreen(event){
    nonPageItems.forEach(e=>{
        e.style.display = '';
    });
    this.style.position = '';
    this.style.height = '';
    this.style.width = '';
}

module.exports = class wv extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        if(!this.hasAttribute("num")){
            throw new Error("A usable webview was declared but without a \"num\" attribute.");
        }else{
            var v = window.document.createElement("webview");
            var a = window.document.createAttribute("src");
            var ws = window.document.createAttribute("disablewebsecurity");
            var webp = window.document.createAttribute("webpreferences");
            var full = window.document.createAttribute("allowfullscreen");
            a.value = this.getAttribute('src');
            webp.value = this.getAttribute('webpreferences');

            v.setAttributeNode(a);
            v.setAttributeNode(ws);
            v.setAttributeNode(webp);
            v.setAttributeNode(full);

            this.appendChild(v);
            let web = this.view;

            web.addEventListener('page-favicon-updated', this.otherFavicon);
            web.addEventListener('page-title-updated', this.updateTabTitle);
            web.addEventListener('new-window', handleWindowRequest);
            web.addEventListener('update-target-url', handleTargetUrl);
            web.addEventListener('did-navigate', handleURLUpdate);
            web.addEventListener('did-start-loading', handleStartLoad);
            web.addEventListener('did-stop-loading',handleStopLoad);
            web.addEventListener('enter-html-full-screen', handleFullScreen);
            web.addEventListener('leave-html-full-screen', handleNormalScreen);
            web.setAttribute('preload',`file://${__dirname}/../webviewPreload.js`);

            var toptab = window.document.createElement("pg-tab");
            toptab.num = tabs.children.length;

            tabs.appendChild(toptab);

        }
    }

    hide(){
        this.style.display = 'none';
    }

    show(){
        this.style.display = 'inline';
    }

    get view(){
        return this.children[0];
    }

    set src(s){
        this.view.src = s;
        this.setAttribute('src',s);
    }

    get tab(){
        return window.document.querySelector('page-tabs').children[this.getAttribute("num")];
    }

    set tab(n){
        this.setAttribute("num",n);
    }

    remove(){
        this.parentElement.removeChild(this);
    }

    searchBarUpdate(){
        var url = this.src;

        var mySearch = new WebSearch(url);

        window.document.querySelector('search-bar').querySelector('sch-ipt').innerHTML = mySearch.htmlify()
    }

    updateTabTitle(title,explicitSet){
        var tab = this.parentElement.tab;

        tab.querySelector('tb-title').innerHTML = title.title;
    }

    otherFavicon(favs){
        var tab = this.parentElement.tab;

        tab.querySelector('tb-icon').querySelector('img').src = favs.favicons[0];
    }
}
