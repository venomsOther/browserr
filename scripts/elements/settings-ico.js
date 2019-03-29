module.exports = class extends HTMLElement {    
    constructor(){
        super();
        let sha = this.attachShadow({mode: 'open'});

        sha.innerHTML = '<img src="'+IconSet.getDir("subMenu")+'" height="25" width="25" />'
        
    }

    connectedCallback(){
        this.addEventListener('click',pgRefresh);
    }
}