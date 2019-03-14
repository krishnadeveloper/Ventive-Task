import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import PhoneListModel from "./ListModel";
class Cellphonelist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneList: [],
            page: {
                current: 1,
                total: 0,
                next: 0,
                last: 0,
            },
            loading: true,
        }

        this.handlePagination = this.handlePagination.bind(this);
    }

    

    componentDidMount(){
        PhoneListModel.find().then(res => {
            this.setState(prevState => {
                return {
                    phoneList: prevState.phoneList.length > 0 ? [prevState.phoneList, res.data.data] : res.data.data,
                    page: {
                        current: res.data.current_page,
                        total: res.data.total,
                        next: res.data.current_page + 1,
                        last: res.data.last_page
                    },
                    loading:false
                }
            })
        })
    }

    handlePagination(page){

        PhoneListModel.page(page).then(res=>{
            
            this.setState(prevState => {
                return {
                    phoneList: prevState.phoneList.length > 0 ? [prevState.phoneList, res.data.data] : res.data.data,
                    page: {
                        current: res.data.current_page,
                        total: res.data.total,
                        next: res.data.current_page + 1,
                        last: res.data.last_page
                    },
                    loading:false
                }
            })

        })

    }


    render() {
        return (
            <div>
                <h1>All Phone</h1>
                <NavLink
                    to="/phone/add"
                    className="btn btn-success"
                >
                    Add
            </NavLink>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Brandname</th>
                            <th scope="col">Model</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.phoneList.map((phone,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{phone.brandname}</td>
                                        <td>{phone.modal}</td>
                                        <td>{phone.price}</td>
                                        
                                    </tr>
                                )
                            })
                        }
                        {
                            this.state.loading?
                                <tr>
                                <td colSpan={3}>Loading...</td>
                                </tr>
                            :
                                this.state.phoneList.length===0?
                                    <tr>
                                    <td colSpan={3}>No data found</td>
                                    </tr>
                                :
                                ''
                        }
                    </tbody>
                </table>
                
            </div>
        );
    }
}

export default Cellphonelist;