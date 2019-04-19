module.exports = class extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        
    }

    changeGrid(cols){
        var str = '';

        for(var i=0;i<cols;i++){
            str+=' auto'
        }
        this.style.gridTemplateColumns = str;
    }

    toggleEnabled(){
        if(this.hasAttribute('enabled')){
            this.removeAttribute('enabled');
        }else{
            this.setAttribute('enabled','');
        }
    }

    addChild(h){
        this.appendChild(h);
    }
}