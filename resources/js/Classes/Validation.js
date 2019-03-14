class Validation 
{   
    /**
     * 
     * @param {*} value : Validate value or string as empty, it returns true for emprty string
     */
    isEmpty(value) 
    {
        return (value == null || value===undefined || !value ||  value.length === 0)?true:false;
    }

    /**
     * 
     * @param {*} value : Validate value or string as empty, it returns true for not emprty string
     */
    isNotEmpty(value) 
    {
        return (value == null || value===undefined || !value ||  value.length === 0)?false:true;
    }

}

export default new Validation();