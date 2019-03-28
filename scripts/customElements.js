var req = require('module').createRequireFromPath('./elements');

customElements.define('web--view', req('webview.js'));
customElements.define('add-tab', req('add-tab.js'));