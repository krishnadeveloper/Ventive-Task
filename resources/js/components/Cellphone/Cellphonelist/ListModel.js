import Axios from "axios";
import Api from "../../../Classes/api";
import Url from "../../../Classes/Url";

class PhoneListModel extends Api{
    constructor(){
        super()
        this.phone = {
            endpoint:{
                list:`${this.laravelApiUrl()}phone`,
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


}

export default new PhoneListModel();