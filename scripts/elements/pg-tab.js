function handleTooBig(){
    console.log('c');
    console.dir(tabs.style.top);
    tabs.setAttribute('style','top: -7px;');
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

    win.loadFile('index.html');
    win.webContents.executeJavaScript('getCurrentView().src = "'+openurl+'";');    

}


module.exports = class extends HTMLElement {    
    constructor(){
        super();
        
        
    }

    connectedCallback(){
        this.innerHTML = "<tb-icon src='images.png'></tb-icon><tb-title>New Tab</tb-title><tb-remove><tb-remove>";
        this.addEventListener("click",this.show);
        this.addEventListener("click",this.searchBarUpdate)

        this.view = document.querySelector('web--view[num="'+this.num+'"]');

        this.show();

        //console.log(tabs.offsetTop);



        if(tabs.offsetTop > 21){
            handleTooBig();
            //newWinBig(this.view.view.src);this.tRemove();
        }
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

        //console.dir(this)
        this.view.show();
        this.setAttribute('show','');
        currentTab = this;

        this.style.background = 'lightgrey';
    }

    hide(){
        this.view.hide();
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
        //console.log(this.parentElement.view);
        this.parentElement.view.remove();
        tabs.removeChild(this.parentElement);
        
        if(tabs.children.length == 0){
            require('electron').remote.getCurrentWindow().close();
        }
    }

    tRemove(){
        this.view.remove();
        tabs.removeChild(this);

        if(tabs.children.length == 0){
            require('electron').remote.getCurrentWindow().close();
        }
    }
}