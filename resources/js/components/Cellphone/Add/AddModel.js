import axios from "axios";
import Api from "../../../Classes/api";

class AddModel extends Api{
    constructor(){
        super()
        this.phone = {
            endpoint:{
                add:`${this.laravelApiUrl()}phone/add`,
            }
        } 
    }

    add(formdata){
        let FieldsData = new FormData();
        Object.keys(formdata).map(formInput=>{
            FieldsData.append(formInput, formdata[formInput]);
        })

        let request = {
            'method':'POST',
            url:this.phone.endpoint.add,
            data:FieldsData
        }
        return axios(request);

    }


}

export default new AddModel();