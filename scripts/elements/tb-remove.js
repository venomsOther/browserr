module.exports = class extends HTMLElement {    
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

    action(){
        this.parentElement.remove();
    }
}