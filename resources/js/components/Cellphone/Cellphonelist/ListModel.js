import Axios from "axios";
import Api from "../../../Classes/api";
import Url from "../../../Classes/Url";

class PhoneListModel extends Api{
    constructor(){
        super()
        this.phone = {
            endpoint:{
                list:`${this.laravelApiUrl()}phone`,
                delete:`${this.laravelApiUrl()}phone/delete`,
            }
        } 
    }

    find(){
        return Axios.get(this.phone.endpoint.list);
    }

    page(page=1){
        return Axios.get(this.phone.endpoint.list+`?page=${page}`);
    }

    search(searchParams){
        return Axios.get(this.phone.endpoint.list+`?${Url.httpBuildQuery(searchParams)}`)
    }

    delete(id){
        return Axios.delete(this.phone.endpoint.delete+`/${id}`)
    }


}

export default new PhoneListModel();