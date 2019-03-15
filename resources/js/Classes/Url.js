class Url {

    httpBuildQuery(object)
    {
        return Object.keys(object).map((key)=>{return(key+'='+object[key])}).join('&');
    }
}

export default new Url(); 