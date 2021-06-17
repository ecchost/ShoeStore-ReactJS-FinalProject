import React, { Component, Fragment} from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Modal from 'react-responsive-modal';
import 'react-toastify/dist/ReactToastify.css';
import data from '../../../assets/data/category';
import Datatable from '../../common/datatable';
import {myFirebase} from "../../../utils/configureFireStore";
import firebase from "firebase";
import Row from "./Row"

export class Category extends Component {
    constructor(props) {
        super(props);
        firebase.app();
        this.state = {
            categories:[],
            open: false,
        };
    }
    getFromAPIServer = () => {
        let ref = firebase.database().ref("/");
        ref.on("value", snapshot => {
            const state = snapshot.val();
            this.setState(state);
        })
    }
    componentDidMount() {
        this.getFromAPIServer();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.state) {
            this.handleAddCategory();
        }
    }
    handleDeleteCategory = (idCategory) => {
        const {categories} = this.state;
        const newState = categories.filter(data => {
            return data.idCategory !== idCategory;
        });
        this.setState({categories:newState});
    }
    handleAddCategory = () => {
        firebase.database().ref("/").set(this.state);
    }
    handleSaveButton = (event) => {
        let name = this.refs.name.value;
        let idCategory = this.refs.value;
        if(idCategory && name) {
            const {categories} = this.state;
            const indexCategory = categories.findIndex(data=>{
                return data.idCategory === idCategory;
            });
            categories[indexCategory].name = name;
            this.setState({categories});
        } else if(name){
            const idCategory = new Date().getTime().toString();
            const {categories} = this.state;
            categories.push({idCategory,name});
            this.setState({categories});
        }
        this.refs.name.value = "";
        this.refs.idCategory.value = "";
    }


    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    renderArticles() {
        return this.state.categories.map((category) => {
            return <Row key={category.idCategory}
                        name={category.name}
                        idCategory={category.idCategory}
                        handleDeleteCategory={this.handleDeleteCategory}/>
        })
    }
    render() {
        const { open } = this.state;
        return (
            <Fragment>
                <Breadcrumb title="Category" parent="Physical" />
                {/* <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Products Category</h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-popup pull-right">

                                        <button type="button" className="btn btn-primary" onClick={this.onOpenModal} data-toggle="modal" data-original-title="test" data-target="#exampleModal">Add Category</button>
                                        <Modal open={open} onClose={this.onCloseModal} >
                                            <div className="modal-header">
                                                <h5 className="modal-title f-w-600" id="exampleModalLabel2">Add Physical Product</h5>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >Category Name :</label>
                                                        <input type="text" name="name" id="name" ref="name" className="form-control" />
                                                        <input type="hidden" name="idCategory" id="idCategory" ref="idCategory" className="form-control" />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" onClick={() => this.handleSaveButton()}>Save</button>
                                                <button type="button" className="btn btn-secondary" onClick={() => this.onCloseModal('VaryingMdo')}>Close</button>
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="clearfix"/>
                                    <div id="basicScenario" className="product-physical">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead className="thead-inverse" >
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.renderArticles()}
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Container-fluid Ends--> */}
            </Fragment>
        )
    }
}

export default Category

