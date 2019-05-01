module.exports = class{
    static addHistory(obj){
        window.settings.H.push(obj);
        this.save();
    }

    static addBookmarks(name,obj){
        window.settings.B[name] = obj;
        this.save();
    }

    static clearHistory(){
        window.settings.H = [];
    }

    static clearMarks(){
        window.settings.B = {};
    }

    static save(){
        require('./lock.js').encryptFile(window.settings.pass, 'user*'+JSON.stringify(window.settings), __dirname+'/../users/'+window.settings.name+'.user');
    }

    static set(setting, value){
        window.settings[setting] = value;
        this.save();
    }
}
