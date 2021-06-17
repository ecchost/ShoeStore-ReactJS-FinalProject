import React, {Component, Fragment} from "react";
import Breadcrumb from "../../../../commons/breadcrumb/Breadcrumb";
import {Validator} from "ree-validate";
import Modal from "react-responsive-modal";
import Datatables from "../../../../commons/datatables/Datatables";
import CategoriesServices from "../../services"

class Container extends Component {
    constructor(props) {
        super(props);

        this.validator = new Validator({
            name: 'required|min:3',
        })

        this.state = {
            open: false,
            category: '',
            categories: [],
            errors: this.validator.errors,
            updater: false,
        }

        this.onCategoriesChange = this.onCategoriesChange.bind(this);
    }

    componentDidMount() {
        this.fetchCategories()
    }

    componentWillUnmount() {
        this.unmountCategories()
    }

    fetchCategories() {
        CategoriesServices.get().on("value", this.onCategoriesChange);
    }

    unmountCategories(){
        CategoriesServices.get().off("value", this.onCategoriesChange);
    }

    onCategoriesChange(value){
        let temp = [];

        value.forEach((value) => {
            let key = value.key;
            let data = value.val();

            temp.push({
                key: key,
                name: data.name
            });
        });

        this.setState({
            categories: temp
        })
    }

    handleChange(name, value) {
        const {errors} = this.validator

        this.setState({category: {...this.state.category, [name]: value}})

        errors.remove(name)

        this.validator.validate(name, value)
            .then(() => {
                this.setState({errors})
            })
    }

    handleSubmit(e) {
        e.preventDefault()
        const {category, updater} = this.state
        const {errors} = this.validator
        console.log(this.state)

        this.validator.validateAll(category)
            .then((success) => {
                if (success) {
                    if (updater){
                        CategoriesServices.update(category.key, category)
                            .then(() => {
                                console.log('Updated')
                            })
                            .catch((e) => {
                                console.log(e);
                            });

                        this.setState({category: '', categories: '', updater: false});
                    } else {
                        CategoriesServices.create(category)
                            .then(() => {
                                console.log('Submitted')
                            })

                        this.setState({category: '', categories: ''});
                    }

                    this.onCloseModal();
                    this.fetchCategories()
                } else {
                    this.setState({errors})
                }
            })
    }

    handleUpdate = (row) => {
        this.setState({ category: row.original, updater: true })
        this.onOpenModal()
    }

    handleDestroy = (row) => {
        CategoriesServices.destroy(row.original.key)
            .then(() => {
                this.fetchCategories();
                console.log('destroyed')
            })
            .catch((e) => {
                console.log(e);
            });
    }

    onOpenModal = () => {
        this.setState({open: true});
    };

    onCloseModal = () => {
        this.setState({open: false});
    };

    renderDatatables() {
        const { categories } = this.state;

        if(categories.length) {
            return <Datatables
                multiSelectOption={false}
                myData={categories}
                onUpdate={this.handleUpdate}
                onDestroy={this.handleDestroy}
                pageSize={10}
                pagination={true}
                class="-striped -highlight"
            />
        }
    }

    render() {

        const {open, errors, category } = this.state

        return (
            <Fragment>
                <Breadcrumb title="Category" parent="Physical"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Products Category</h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-popup pull-right">
                                        <button type="button" className="btn btn-primary" onClick={this.onOpenModal}
                                                data-toggle="modal" data-original-title="test"
                                                data-target="#exampleModal">Add Category
                                        </button>

                                        <Modal open={open} onClose={this.onCloseModal}>
                                            <form onSubmit={e => this.handleSubmit(e)}>
                                                <div className="modal-header">
                                                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">Add
                                                        Physical Product</h5>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label">Category
                                                            Name :</label>
                                                        <input type="text" name="name" id="name" ref="name"
                                                               className={`form-control ${errors.has('name') && 'is-invalid'}`}
                                                               value={category.name || ''}
                                                               onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                                                        {errors.has('name') &&
                                                        <div className="invalid-feedback">{errors.first('name')}</div>}

                                                        <input type="hidden" name="key" id="key"
                                                               ref="key" value={category.key || ''}
                                                               className="form-control"/>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button disabled={errors.any()} type="submit"
                                                            className="btn btn-primary">
                                                        Save
                                                    </button>
                                                    <button type="button" className="btn btn-secondary"
                                                            onClick={() => this.onCloseModal('VaryingMdo')}>Close
                                                    </button>
                                                </div>
                                            </form>
                                        </Modal>
                                    </div>
                                    <div className="clearfix"/>
                                    <div>
                                        {this.renderDatatables()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Container;