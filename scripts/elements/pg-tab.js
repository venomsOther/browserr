const WebSearch = require('../websearch.js');

function handleTooBig(){
    tabs.setAttribute('style','top: -7px;');
}

function handleTooSmall(){
    tabs.setAttribute('style','')
}

function newWinBig(openurl){
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

    win.loadFile(__dirname+'/index.html');
    win.webContents.executeJavaScript('getCurrentView().src = "'+openurl+'";');

}


module.exports = class extends HTMLElement {
    constructor(){
        super();


    }

    connectedCallback(){
        this.innerHTML = "<tb-icon src='images.png'></tb-icon><tb-title>New Tab</tb-title><tb-remove><tb-remove>";
        this.addEventListener("click",this.show);
        this.addEventListener("click",this.searchBarUpdate2);

        this.view = document.querySelector('web--view[num="'+this.num+'"]');

        this.show();




        if(tabs.offsetTop > 27){
            handleTooBig();
        }
    }

    searchBarUpdate(){
        var url = this.view.view.src;

        url = url.substring(0,url.indexOf('/',8));
        window.document.querySelector('search-bar').querySelector('sch-ipt').innerHTML = url;
    }

    searchBarUpdate2(){
        var url = this.view.view.src;

        var mySearch = new WebSearch(url);

        window.document.querySelector('search-bar').querySelector('sch-ipt').innerHTML = mySearch.htmlify()
    }

    show(){
        let i;
        for(i = 0; i < tabs.children.length; i++){
            tabs.children[i].hide();
        }

        this.view.show();
        this.setAttribute('show','');
        currentTab = this;

        this.style.background = 'lightgrey';
    }

    hide(){
        if(!document.querySelector('multi-view').hasAttribute('enabled')){
            this.view.hide();
        }
        this.removeAttribute('show');
        this.style.background = 'darkgrey';
    }

    get num(){
        return this.getAttribute("num");
    }

    set num(n){
        this.setAttribute("num",n);
    }

    remove(){
        this.parentElement.view.remove();
        tabs.removeChild(this.parentElement);

        if(tabs.children.length == 0){
            require('electron').remote.getCurrentWindow().close();
        } else{
            tabs.children[tabs.children.length - 1].show();
            if(tabs.offsetTop < 17){
                handleTooSmall();
            }
        }

        document.querySelector('multi-view').refresh();
    }

    tRemove(){
        this.view.remove();
        tabs.removeChild(this);

        if(tabs.children.length == 0){
            require('electron').remote.getCurrentWindow().close();
        } else{
            tabs.children[tabs.children.length - 1].show();
            if(tabs.offsetTop < 20){
                handleTooSmall();
            }
        }

        document.querySelector('multi-view').refresh();
    }
}
