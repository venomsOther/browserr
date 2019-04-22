customElements.define('web-view', class extends HTMLElement {  
    constructor(){
        super();



    }

    connectedCallback(){
        let response;
        let ele = this;

        let req = require('https').get(this.getAttribute('src'), (res)=>{
            let data = "";
            res.on('data', (d)=>{
                data+=d;
            });
            res.on('end',()=>{
                console.log(data);

                let shadowRoot = ele.attachShadow({mode: 'open'});
                shadowRoot.innerHTML = data;
            });


        });
    }
});
