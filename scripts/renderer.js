// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
require('./webviewele.js');
const settings = JSON.parse(require('fs').readFileSync('scripts/settings.json').toString());
var svgs = require('./icons.js');
const zoomFactorChange = settings.ZoomIncrement;
const History = require('./history.js').History;
const thisWindow = require('electron').remote.getCurrentWindow();
const readIcons = require('./readIcons.js');
const IconSet = new readIcons(settings.iconPack);


window.indicator = window.document.querySelector('ind');


// get rid of web global variable
window.currentTab = window.document.body.querySelector('pg-tab');
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
    // downloads will be webview.downloadUrl()
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

//######################## NEW WEBVIEW ##########################
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

//######################## OTHER ELEMENTS ############################


customElements.define('tb-icon', class extends HTMLElement {    
    constructor(){
        super();
        
        // nothing
    }

    connectedCallback(){
        let boxSize = 23;

        this.innerHTML = `<img src="svgs/blank.svg" style="position:relative;top:7.5px;" width=${boxSize} height=${boxSize} />`
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

        sha.innerHTML = '<img src="'+IconSet.getDir("leftArrow")+'" height="25" width="25" />'
    }

    connectedCallback(){
        this.addEventListener('click', pgBack);
    }
});

customElements.define('pg-forward', class extends HTMLElement {    
    constructor(){
        super();
        let sha = this.attachShadow({mode: 'open'});

        sha.innerHTML = '<img src="'+IconSet.getDir("rightArrow")+'" height="25" width="25" />'
    }

    connectedCallback(){
        this.addEventListener('click',pgForward);
    }
});

customElements.define('pg-refresh', class extends HTMLElement {    
    constructor(){
        super();
        let sha = this.attachShadow({mode: 'open'});

        sha.innerHTML = '<img src="'+IconSet.getDir("refresh")+'" height="25" width="25" />'
        
    }

    connectedCallback(){
        this.addEventListener('click',pgRefresh);
    }
});

customElements.define('settings-ico', class extends HTMLElement {    
    constructor(){
        super();
        let sha = this.attachShadow({mode: 'open'});

        sha.innerHTML = '<img src="'+IconSet.getDir("subMenu")+'" height="25" width="25" />'
        
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
                    //console.log(url);
                    getCurrentView().src=url;
                    getCurrentView().focus();
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
        this.addEventListener('click',makeWebv);
    }
});

customElements.define('st-win', class extends HTMLElement {    
    constructor(){
        super();
        this.addEventListener('click',makeNewWin);
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
        this.addEventListener('click',historyWindow);
    }
});

customElements.define('st-bookmarks', class extends HTMLElement {    
    constructor(){
        super();
        this.addEventListener('click',bookmarksWindow);
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
        this.addEventListener('click',this.action);

        let shadowRoot = this.attachShadow({mode:'open'});

        shadowRoot.innerHTML = svgs.smallPlus;
    }

    action(){
        getCurrentView().getZoomFactor(factor=>{
            getCurrentView().setZoomFactor(factor + zoomFactorChange);
        });
    }
});

customElements.define('z-out', class extends HTMLElement {    
    constructor(){
        super();
        this.addEventListener('click',this.action);

        let shadowRoot = this.attachShadow({mode:'open'});

        shadowRoot.innerHTML = svgs.smallMinus;
    }

    action(){
        getCurrentView().getZoomFactor(factor=>{
            getCurrentView().setZoomFactor(factor - zoomFactorChange);
        });
    }
});

customElements.define('z-full', class extends HTMLElement {    
    constructor(){
        super();
        
        this.addEventListener('click',this.action);
        
        let shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.innerHTML = 'Reset';
    }

    action(){
        getCurrentView().setZoomFactor(1);
    }
});

customElements.define('adv-settings', class extends HTMLElement {    
    constructor(){
        super();
        this.addEventListener('click',settingsWindow);
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
        this.addEventListener('click', openTools);
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