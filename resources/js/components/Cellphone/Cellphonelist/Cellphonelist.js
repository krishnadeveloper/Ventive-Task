import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import PhoneListModel from "./ListModel";

let typingTimer = null;
let typingInterval = 1000; 

const styles = { 
    marginLeft:{
        marginLeft:20
    }
}

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
            search:{
                brandname:'',
                model:'',
                technology:''
            },
            loading: true,
        }

        this.handlePagination  = this.handlePagination.bind(this);
        this.handleSearch      = this.handleSearch.bind(this);
        this.handleResetSearch = this.handleResetSearch.bind(this);
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
        
        //combine search params with pagination
        const paginationParams = {
            ...this.state.search,
            page:page
        }

        PhoneListModel.search(paginationParams).then(res=>{
            
            this.setState(prevState => {
                return {
                    phoneList: prevState.phoneList.length > 0 ? [...prevState.phoneList, ...res.data.data] : res.data.data,
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

    handleSearch(e){
        let eleName = e.target.name;
        let eleValue = e.target.value;
        this.setState(prevState=>{
            return{
                phoneList:[],
                page: {
                    current: 1,
                    total: 0,
                    next: 0,
                    last: 0,
                },
                search:{
                    ...prevState.search,
                    [eleName]:eleValue
                },
                loading:true
            }
        })

        //Prevent Instant Search on every key press
        clearTimeout(typingTimer);
        typingTimer = setTimeout(()=>{
            
            PhoneListModel.search(this.state.search).then(res=>{
                this.setState(prevState => {
                    return {
                        phoneList: res.data.data,
                        page: {
                            current: res.data.current_page,
                            total: res.data.total,
                            next: res.data.current_page + 1,
                            last: res.data.last_page
                        },
                        loading:false
                    }
                })
            }).catch(err=>{
                console.log(err);
            })
        },typingInterval)
    }

    handleResetSearch(){

        this.setState(prevState=>{
            return{
                phoneList:[],
                page: {
                    current: 1,
                    total: 0,
                    next: 0,
                    last: 0,
                },
                search:{
                    brandname:'',
                    model:'',
                    technology:''
                },
                loading:true
            }
        })

        PhoneListModel.find().then(res=>{
            this.setState(prevState => {
                return {
                    phoneList: res.data.data,
                    page: {
                        current: res.data.current_page,
                        total: res.data.total,
                        next: res.data.current_page + 1,
                        last: res.data.last_page
                    },
                    loading:false
                }
            })
        }).catch(err=>{
            console.log(err);
        })
    }

    handleDelete(id){
        const confirmation  = confirm('Are you sure?');
        if(confirmation){
            PhoneListModel.delete(id).then(res=>{
                if(res.data.status && res.data.code===200)
                {
                    this.handleResetSearch();
                }
                else{
                    console.log(res.data)
                }
            }).catch(err=>{
                console.log(err);
            })

        }
    }

    render() {
        return (
            <div className="container">
                
                <div className="row">
                    <div className="col-md-6 cols-sm-12"><h1>All Phone</h1></div>
                    <div className="col-md-6 col-sm-12"></div>
                </div>

                <div className=" p-1 mb-1 bg-white rounded row col-md-12">
                    <div className="col-md-3 cols-sm-12"><input className="form-control" type="text" defaultValue={this.state.search.brandname} placeholder="Enter brandname to search" name="brandname" onKeyUp={(e)=>{this.handleSearch(e)}}/></div>
                    <div className="col-md-3 cols-sm-12"><input className="form-control" type="text" defaultValue={this.state.search.modal} placeholder="Enter model to search" name="modal" onKeyUp={(e)=>{this.handleSearch(e)}}/></div>
                    <div className="col-md-3 col-sm-12"><input className="form-control" type="text" defaultValue={this.state.search.Platform} placeholder="Enter technology to search" name="Platform" onKeyUp={(e)=>{this.handleSearch(e)}}/></div>
                    <div className="col-md-3 cols-sm-12">
                        <button className="mr-50 btn btn-warning">Reset Search </button> 
                        <NavLink to="/phone/add" className="ml-20 btn btn-success" style={styles.marginLeft}> <i className="fa fa-add"></i>Add phone </NavLink>
                    </div>
                </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Brandname</th>
                            <th scope="col">Model</th>
                            <th scope="col">Platform</th>
                            <th scope="col">Price</th>
                            <th scope="col">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.phoneList.map((phone,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{phone.brandname}</td>
                                        <td>{phone.modal}</td>
                                        <td>{phone.platform}</td>
                                        <td>{phone.price}</td>
                                        <td>
                                            <NavLink className="btn btn-primary" to={`/phone/edit/${phone.id}`}>Edit</NavLink>
                                            <button className="btn btn-danger ml-1" onClick={(e)=>{this.handleDelete(phone.id)}}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        {
                            this.state.loading?
                                <tr>
                                <td colSpan={5}>Loading...</td>
                                </tr>
                            :
                                this.state.phoneList.length===0?
                                    <tr>
                                        <td colSpan={5}>No data found</td>
                                    </tr>
                                :
                                    <tr>
                                        <td colSpan={5}></td>
                                    </tr>
                        }
                    </tbody>
                </table>
                <div className="row align-center">
                    {
                        this.state.page.next<=this.state.page.last?
                            <button 
                                className="btn btn-success" 
                                onClick={()=>{this.handlePagination(this.state.page.next)}}
                            > 
                                Load more 
                            </button>
                            :''
                    }
                    
                </div>
            </div>
        );
    }
}

export default Cellphonelist;