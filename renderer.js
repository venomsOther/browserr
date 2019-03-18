// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
require('./webviewele.js');

var thisWindow = require('electron').remote.getCurrentWindow();
var $ = window.document.body.querySelector;
var web = window.document.body.querySelector('webview');
window.currentTab = window.document.body.querySelector('pg-tab');

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

}

customElements.define('ch-min', class extends HTMLElement {  
    constructor(){
        super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = '<svg width="20" height="20" style="stroke:rgb(0,0,0);strike-width:10;"><line x1="0" y1="10" x2="25" y2="10" stroke-width=2 /></svg>';

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

function updateTabIcon(){
    require('get-website-favicon')(web.src).then((object)=>{
        window.currentTab.querySelector('tb-icon').querySelector('img').src = object.icons[0].src;
    });
}

function updateTabTitle(title,explicitSet){
    console.log(title);
    window.currentTab.querySelector('tb-title').innerHTML = title.title;
}

web.addEventListener('did-finish-load', updateTabIcon);
web.addEventListener('page-title-updated', updateTabTitle);
