import axios from "axios";
import Api from "../../../Classes/api";

class EditModel extends Api{
    constructor(){
        super()
        this.phone = {
            endpoint:{
                edit:`${this.laravelApiUrl()}phone/edit`,
                update:`${this.laravelApiUrl()}phone/update`,
            }
        } 
    }

    update(id, formdata){

        let FieldsData = new FormData();
        Object.keys(formdata).map(formInput=>{
            FieldsData.append(formInput, formdata[formInput]);
        })

        let request = {
            'method':'POST',
            url:this.phone.endpoint.update+`/${id}`,
            data:FieldsData
        }
        return axios(request);

    }

    edit(id){
        return axios.get(this.phone.endpoint.edit+`/${id}`);
    }

}

export default new EditModel();