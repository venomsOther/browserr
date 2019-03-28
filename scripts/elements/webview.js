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
            web.addEventListener('update-target-url', handleTargetUrl);
            web.addEventListener('did-navigate', handleURLUpdate);
            web.addEventListener('did-start-loading', handleStartLoad);
            web.addEventListener('did-stop-loading',handleStopLoad);
            web.setAttribute('preload',`file://${__dirname}/webviewPreload.js`)
            //web.addEventListener('contextmenu', handleContextMenu);

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