import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Validation from "../../../Classes/Validation";
import AddModel from "./AddModel";

class Add extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            brandname:{
                value:'',
                valid:true,

            },
            modal:{
                value:'',
                valid:true,

            },
            platform:{
                value:'',
                valid:true,

            },
            cpu:{
                value:'',
                valid:true,

            },
            simtype:{
                value:'',
                valid:true,

            },
            price:{
                value:'',
                valid:true,

            },
            usb:{
                value:'',
                valid:true,

            },
            status:{
                value:"1",
                valid:true,

            },
            validation:false,
            submit:false,
            added:false,
        }

        this.handleInput    = this.handleInput.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.checkValid     = this.checkValid.bind(this);
    }

    handleInput(e){
        let eleNamwe = e.target.name;
        let eleVal = e.target.value;
        //console.log(e.target);
		this.setState(prevState=>{
			return{
				[eleNamwe]:{
					value:eleVal,
					valid:Validation.isNotEmpty(eleVal),
				},
				validation:this.checkValid(),
			}
		})
    }

    checkValid(){
        return (this.state.brandname.valid &&
                this.state.modal.valid &&
                this.state.platform.valid &&
                this.state.cpu.valid &&
                this.state.simtype.valid &&
                this.state.price.valid &&
                this.state.usb.valid &&
                this.state.status
            )? true:false
            
    }
    showError(elename){
        return `Please enter valid ${elename}`;
    }

    handleSubmit(e){
        e.preventDefault();
        
        if(this.checkValid() && this.state.validation){
            let formdata = {
                brandname:this.state.brandname.value.toString(),
                modal:this.state.modal.value.toString(),
                platform:this.state.platform.value.toString(),
                cpu:this.state.cpu.value.toString(),
                simtype:this.state.simtype.value.toString(),
                price:this.state.price.value.toString(),
                usb:this.state.usb.value.toString(),
                status:this.state.status.value.toString(),
            }

            this.setState(prevState=>{
                return{
                    submit:true
                }
            })

            AddModel.add(formdata).then(res=>{
                
                if(res.data.status && res.data.code===200){
                    this.setState(prevState=>{
                        return{
                            validation:false,
                            submit:false,
                            added:true
                        }
                    })
                    
                }

            }).catch(err=>{
                this.setState(prev=>{
                        return{
                            submit:false,
                            added:false
                        }
                    })
            })
        }
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h2>Add Phone</h2>
                </div>
                <form id="addphoneform" onSubmit={this.handleSubmit}>
                    
                    <div className="row">
                    <div className="form-group col-md-4 col-sm-12">
                        <label htmlFor="brandname">Brand Name</label>
                        <input 
                            name="brandname"
                            className="form-control"
                            placeholder=""
                            onKeyUp={this.handleInput}
                        />
                        <small className="form-text text-red">{!this.state.brandname.valid?this.showError('brandname'):''}</small>    
                    </div>
                    <div className="form-group col-md-4 col-sm-12">
                        <label htmlFor="modal">Modal</label>
                        <input 
                            name="modal"
                            className="form-control"
                            placeholder=""
                            onKeyUp={this.handleInput}
                        />
                        <small className="form-text text-red">{!this.state.modal.valid?this.showError('model'):''}</small>
                    </div>
                    <div className="form-group col-md-4 col-sm-12">
                        <label htmlFor="platform">Platform</label>
                        <input 
                            name="platform"
                            className="form-control"
                            placeholder=""
                            onKeyUp={this.handleInput}
                        />    
                        <small className="form-text text-red">{!this.state.platform.valid?this.showError('Platform'):''}</small>
                    </div>
                    </div>
                    <div className="row">

                    <div className="form-group col-md-4 col-sm-12">
                        <label htmlFor="cpu">CPU</label>
                        <input 
                            name="cpu"
                            className="form-control"
                            placeholder=""
                            onKeyUp={this.handleInput}
                        />
                        <small className="form-text text-red">{!this.state.cpu.valid?this.showError('CPU'):''}</small>
                    </div>
                    <div className="form-group col-md-4 col-sm-12">
                        <label htmlFor="simtype">Sim Type</label>
                        <input 
                            name="simtype"
                            className="form-control"
                            placeholder=""
                            onKeyUp={this.handleInput}
                        />  
                        <small className="form-text text-red">{!this.state.brandname.valid?this.showError('Sim Type'):''}</small>  
                    </div>
                    <div className="form-group col-md-4 col-sm-12">
                        <label htmlFor="price">Price</label>
                        <input 
                            name="price"
                            className="form-control"
                            placeholder=""
                            onKeyUp={this.handleInput}
                            type="number"
                            step={0.1}
                        />
                        <small className="form-text text-red">{!this.state.price.valid?this.showError('price'):''}</small>
                    </div>
                    </div>
                    <div className="row">
                    <div className="form-group col-md-4 col-sm-12">
                        <label htmlFor="usb">USB</label>
                        <input 
                            name="usb"
                            className="form-control"
                            placeholder=""
                            onKeyUp={this.handleInput}
                        />
                        <small className="form-text text-red">{!this.state.usb.valid?this.showError('usb'):''}</small>
                    </div>
                    <div className="form-group col-md-4 col-sm-12">
                        <label htmlFor="exampleInputEmail1">Status</label>
                        <select className="form-control" onChange={this.handleInput}>
                            <option value={1}>Active</option>
                            <option value={0}>Inactive</option>
                        </select> 
                    </div>
                    </div>
                    {
                        this.state.added?
                            <div className="row">
                                <div className="alert alert-success" role="alert">
                                    Phone added successfully. <Link to="/phone" className="btn btn-success">Go to phone list</Link>
                                </div>
                            </div>
                        :
                        <button type={this.state.submit?'button':'submit'} disabled={this.state.submit} className="btn btn-primary">Submit</button>
                    }
                    

                    
                </form>
            </div>
        );
    }
}

export default Add;