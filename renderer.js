// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
require('./webviewele.js');



var thisWindow = require('electron').remote.getCurrentWindow();
var $ = window.document.body.querySelector;
var web = window.document.body.querySelector('webview');
window.currentTab = window.document.body.querySelector('pg-tab');
window.searchProvider = "www.google.com";
let currentTabNum = 0;
window.tabs = window.document.querySelector('page-tabs');

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
    web.goBack();
}

function pgForward(){
    web.goForward();
}

function pgRefresh(){
    web.reloadIgnoringCache();
}

function focusSearchInput(){
    window.document.body.querySelector('search-bar').querySelector('sch-ipt').focus();
}

//######################## NEW WEBVIEW ##########################
window.makeWebv = function makeWebv(url){
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

    return vv;
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

            web.addEventListener('page-favicon-updated', otherFavicon);
            web.addEventListener('page-title-updated', updateTabTitle);
        }
    }

    get view(){
        return this.children[0];
    }

    get tab(){
        return window.document.querySelector('page-tabs').children[this.getAttribute("num")];
    }

    set tab(n){
        this.setAttribute("num",n);
    }

    updateTabTitle(title,explicitSet){
        window.document.querySelector('page-tabs').children[this.tab].querySelector('tb-title').innerHTML = title.title;
    }
    
    otherFavicon(favs){
        window.currentTab.querySelector('tb-icon').querySelector('img').src = favs.favicons[0];
    }
}

customElements.define('web--view', wv);

//######################## OTHER ELEMENTS ############################
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
});

customElements.define('tb-icon', class extends HTMLElement {    
    constructor(){
        super();
        
        // nothing
    }

    connectedCallback(){
        //let shadowRoot = this.attachShadow({mode:'open'})
        let boxSize = 23;
        //console.log(this.getAttribute('src'))

        this.innerHTML = `<img src="${this.getAttribute('src')}" style="position:relative;top:7.5px;" width=${boxSize} height=${boxSize} />`
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

//web.addEventListener('did-finish-load', ()=>{updateTabIcon(web.src)});
//web.addEventListener('did-navigate', ()=>{updateTabIcon(web.src)});
web.addEventListener('page-favicon-updated', otherFavicon);
web.addEventListener('page-title-updated', updateTabTitle);

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