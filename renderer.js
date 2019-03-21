// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
require('./webviewele.js');



var thisWindow = require('electron').remote.getCurrentWindow();
var $ = window.document.body.querySelector;
var web = window.document.body.querySelector('web--view')
window.currentTab = window.document.body.querySelector('pg-tab');
window.searchProvider = "www.google.com";
window.tabs = window.document.querySelector('page-tabs');

function handleWindowRequest(url /* string */,frameName /* string */, disposition /* string */, options /* object */){
    url;
    frameName;
    disposition; /* can be one of: default, foreground-tab, background-tab, new-window, save-to-disk, other. */
    options; /* like if you were to make a new browserWindow, its the exact same options as that */

    // for now just make a new tab, but later add functionality for stuff like background tabs and stuff.
    // downloads will be webview.downloadUrl()
    makeWebv(url);
}

window.getCurrentView = function getCurrentView(){
    return window.document.querySelector('web--view:not([style="display: none;"])').view;
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

//######################## NEW WEBVIEW ##########################
window.makeWebv = function makeWebv(url){

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
    vv.setAttribute('src','https://google.com/');
    vv.setAttribute('allowpopups','')

    window.document.body.appendChild(vv);
}

class wv extends HTMLElement{
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
            a.value = this.getAttribute('src');
            webp.value = this.getAttribute('webpreferences');

            v.setAttributeNode(a);
            v.setAttributeNode(ws);
            v.setAttributeNode(webp);

            this.appendChild(v);
            let web = this.view;

            web.addEventListener('page-favicon-updated', this.otherFavicon);
            web.addEventListener('page-title-updated', this.updateTabTitle);
            web.addEventListener('new-window', handleWindowRequest);

            var toptab = window.document.createElement("pg-tab");
            toptab.num = tabs.children.length;

            tabs.appendChild(toptab);

            //this.tab.show();
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

    updateTabTitle(title,explicitSet){
        var tab = this.parentElement.tab;
        //console.log(tab);

        tab.querySelector('tb-title').innerHTML = title.title;
    }
    
    otherFavicon(favs){
        var tab = this.parentElement.tab;
        //console.log(tab);

        tab.querySelector('tb-icon').querySelector('img').src = favs.favicons[0];
    }
}

customElements.define('web--view', wv);

//######################## OTHER ELEMENTS ############################
customElements.define('add-tab', class extends HTMLElement{
    constructor(){
        super();
        //let shadowRoot = this.attachShadow({mode:'open'});
        let attrs = 'width="40" height="40"';
        attrs = 'class="addtb" style="width:100%;height:100%;display:inline-block;"';

        this.innerHTML = '<svg ' + attrs + ' ><line x1="9" y1="20" x2="29" y2="20" stroke="black" stroke-width="2" /><line x1="19" y1="10" x2="19" y2="30" stroke-width=2 stroke=black /></svg>'
    }

    connectedCallback(){
        this.addEventListener('click',this.click)
    }

    click(){
        makeWebv("https://google.com/");
    }
});

customElements.define('ch-min', class extends HTMLElement {  
    constructor(){
        super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = '<svg width="20" height="20" style="stroke:rgb(0,0,0);strike-width:10;"><line x1="0" y1="16" x2="25" y2="16" stroke-width=2 /></svg>';

            this.addEventListener('click',minimize);
    }
});

customElements.define('ch-max', class extends HTMLElement {    
    constructor(){
        super();
            let shadowRoot = this.attachShadow({mode:'open'});
            shadowRoot.innerHTML = '<svg width="20" height="20" style="stroke:rgb(0,0,0);strike-width:10;"><rect x="2" y="1" width="16" height="16" stroke="black" fill="transparent" stroke-width="2"/></svg>';

            this.addEventListener('click',maximize);
    }
});

customElements.define('ch-exit', class extends HTMLElement {    
    constructor(){
        super();
            let X = `  <line x1="2" y1="1" x2="16" y2="16" style="stroke:rgb(0,0,0);stroke-width:2" />
            <line x1="16" y1="1" x2="2" y2="16" style="stroke:rgb(0,0,0);stroke-width:2" />`

            let shadowRoot = this.attachShadow({mode:'open'});
            shadowRoot.innerHTML = '<svg width="20" height="20" style="stroke:rgb(0,0,0);strike-width:10;">'+X+'</svg>';

            this.addEventListener('click',close);
    }
});

customElements.define('page-tabs', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('pg-tab', class extends HTMLElement {    
    constructor(){
        super();
        
        
    }

    connectedCallback(){
        this.innerHTML = "<tb-icon src='images.png'></tb-icon><tb-title>New Tab</tb-title><tb-remove><tb-remove>";
        this.addEventListener("click",this.show);
        this.addEventListener("click",this.searchBarUpdate)

        this.view = document.querySelector('web--view[num="'+this.num+'"]');
    }

    searchBarUpdate(){
        var url = this.view.view.src;

        url = url.substring(0,url.indexOf('/',8));
        window.document.querySelector('search-bar').querySelector('sch-ipt').innerHTML = url;
    }

    show(){
        let i;
        for(i = 0; i < tabs.children.length; i++){
            tabs.children[i].hide();
        }

        console.dir(this)
        this.view.show();

        web = this.view;
        this.style.background = 'lightgrey';
    }

    hide(){
        this.view.hide();
        this.style.background = 'darkgrey';
    }

    get num(){
        return this.getAttribute("num");
    }

    set num(n){
        this.setAttribute("num",n)
    }

    remove(){
        console.log(this.parentElement.view);
        this.parentElement.view.remove();
        tabs.removeChild(this.parentElement);
        
        if(tabs.children.length == 0){
            require('electron').remote.getCurrentWindow().close();
        }
    }
});

customElements.define('tb-remove', class extends HTMLElement {    
    constructor(){
        super();
        
        // nothing
    }

    connectedCallback(){            
    let X = `  <line x1="6" y1="6" x2="14" y2="14" style="stroke:rgb(70,70,70);stroke-width:1" />
    <line x1="14" y1="6" x2="6" y2="14" style="stroke:rgb(70,70,70);stroke-width:1" />`

    this.innerHTML = '<svg width="20" height="20" style="stroke:rgb(0,0,0);strike-width:10;">'+X+'</svg>';

    this.addEventListener('click',this.parentElement.remove);
    }
});

customElements.define('tb-icon', class extends HTMLElement {    
    constructor(){
        super();
        
        // nothing
    }

    connectedCallback(){
        let boxSize = 23;

        this.innerHTML = `<img src="blank.svg" style="position:relative;top:7.5px;" width=${boxSize} height=${boxSize} />`
    }
});

customElements.define('tb-title', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('pg-nav', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('pg-back', class extends HTMLElement {    
    constructor(){
        super();
        let sha = this.attachShadow({mode: 'open'});

        sha.innerHTML = '<img src="backBtn.svg" height="25" width="25" />'
    }

    connectedCallback(){
        this.addEventListener('click', pgBack);
    }
});

customElements.define('pg-forward', class extends HTMLElement {    
    constructor(){
        super();
        let sha = this.attachShadow({mode: 'open'});

        sha.innerHTML = '<img src="forwardBtn.svg" height="25" width="25" />'
    }

    connectedCallback(){
        this.addEventListener('click',pgForward);
    }
});

customElements.define('pg-refresh', class extends HTMLElement {    
    constructor(){
        super();
        let sha = this.attachShadow({mode: 'open'});

        sha.innerHTML = '<img src="refreshBtn.svg" height="25" width="25" />'
        
    }

    connectedCallback(){
        this.addEventListener('click',pgRefresh);
    }
});

customElements.define('search-bar', class extends HTMLElement {    
    constructor(){
        super();

    }

    connectedCallback(){
        this.addEventListener('click', focusSearchInput)
    }
});

customElements.define('sch-icon', class extends HTMLElement {    
    constructor(){
        super();
        
    }

    connectedCallback(){
        this.href = this.getAttribute('href');
    }

    get img(){
        return this.children[0];
    }
});

customElements.define('sch-ipt', class extends HTMLElement {    
    constructor(){
        super();

        this.addEventListener('keypress', (k)=>{
//            console.log(k.key);

            if(k.key=='Enter'){
                k.preventDefault();
                urlify(this.innerHTML,(url)=>{
                    console.log(url);
                    web.src=url;
                    web.focus();
                });

                
                //updateTabIcon(this.innerHTML);
            }
        });
    }
});

customElements.define('other-settings', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('st-btn', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('st-win', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('st-br', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('st-history', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('hist-item', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('st-bookmarks', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('book-mark', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('bm-name', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('bm-ico', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('page-zoom', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('z-in', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('z-out', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('z-full', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('adv-settings', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('book-marks', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('b-mark', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('b-ico', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('b-title', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('b-link', class extends HTMLElement {    
    constructor(){
        super();

    }
});

customElements.define('dev-tools', class extends HTMLElement {    
    constructor(){
        super();
        this.innerHTML = 'Dev tools';
        this.addEventListener('click',getCurrentView().openDevTools)
    }
});

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