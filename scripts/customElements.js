const req = require('module').createRequireFromPath('./elements');
function def(name){
    customElements.define(name, req(name+'.js'));
}

customElements.define('web--view', req('webview.js'));
def('add-tab');
def('ch-min');
def('ch-max');
def('ch-exit');
def('page-tabs');
def('pg-tab');
def('tb-remove');
def('tb-title');
def('pg-back');
def('pg-forward');
def('pg-refresh');
def('settings-ico');
def('search-bar');
def('sch-ipt');
def('sch-icon');
def('other-settings');
def('st-win');
def('st-btn');
def('st-br');
def('st-history');
def('st-bookmarks');
def('page-zoom');
def('z-in');
def('z-out');
def('z-full');
def('book-marks');
def('b-mark');
def('b-ico');