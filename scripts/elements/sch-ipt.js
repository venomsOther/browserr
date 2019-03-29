module.exports = class extends HTMLElement {    
    constructor(){
        super();

        this.addEventListener('keypress', (k)=>{
//            console.log(k.key);

            var ele = this;
            if(k.key=='Enter'){
                k.preventDefault();
                urlify(this.innerHTML,(url)=>{
                    //console.log(url);
                    getCurrentView().src=url;
                    getCurrentView().focus();
                    ele.innerHTML = url;
                });

                
                //updateTabIcon(this.innerHTML);
            }
        });
    }
}