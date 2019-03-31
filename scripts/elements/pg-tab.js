module.exports = class extends HTMLElement {    
    constructor(){
        super();
        this.innerHTML = "<tb-icon src='images.png'></tb-icon><tb-title>New Tab</tb-title><tb-remove><tb-remove>";
        this.addEventListener("click",this.show);
        this.addEventListener("click",this.searchBarUpdate)

        this.view = document.querySelector('web--view[num="'+this.num+'"]');
        
    }

    connectedCallback(){
        
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
        //console.log(this.parentElement.view);
        this.parentElement.view.remove();
        tabs.removeChild(this.parentElement);
        
        if(tabs.children.length == 0){
            require('electron').remote.getCurrentWindow().close();
        }
    }
}