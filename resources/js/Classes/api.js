class Api{
    
    constructor(){
        this.config = {
            protocol:'http',
            port:'8000',
            prefix:'/',
            host:'localhost'
        }
    }

    /**
     * @param {*} key : pass the key
     * @param {*} value : values of key
     */
    setConfig(key,value)
    {
        if(this.config.hasOwnProperty(key)){
            this.config[key] = value;
        }
    }

    getApiUrl()
    {
        var url = this.config.protocol+'://'+this.config.host;
        url = url+(this.config.port.length>0?':'+this.config.port+'/':'/');
        url = url+(this.config.prefix.length>0?this.config.prefix+'/':'');
        return url;
    }

    laravelApiUrl(){
        return '/api/';
    }

    
}

export default Api;