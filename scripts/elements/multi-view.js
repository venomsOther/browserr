module.exports = class extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.___cols = 1;
        this.___rows = 1;
    }

    set cols(num){
        this.___cols = num;
    }

    get cols(){
        return this.___cols;
    }

    set rows(num){
        this.___rows = num;
    }

    get rows(){
        return this.___rows;
    }

    changeCols(cols){
        var str = '';

        if(cols == 1 && this.rows == 1){
            this.disable();
        }else{
            this.enable();
        }

        for(var i=0;i<cols;i++){
            str+=' auto'
        }
        this.cols = cols;
        this.style.gridTemplateColumns = str;
    }

    changeRows(rows){
        var str = '';

        if(rows == 1 && this.cols == 1){
            this.disable();
        }else{
            this.enable();
        }

        for(var i=0;i<rows;i++){
            str+=' auto'
        }
        this.rows = rows;
        this.style.gridTemplateRows = str;
    }

    toggleEnabled(){
        if(this.hasAttribute('enabled')){
            this.removeAttribute('enabled');
        }else{
            this.setAttribute('enabled','');
        }
    }

    enable(){
        this.setAttribute('enabled','');
        this.setAttribute('class','enabled');
    }

    disable(){
        var v= getCurrentView().parentElement.tab;
        this.removeAttribute('enabled');
        this.setAttribute('class',"");
        v.show();
    }

    addChild(h){
        this.appendChild(h);
    }
}
