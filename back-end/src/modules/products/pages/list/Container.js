import React, {Component, Fragment} from "react";
import Breadcrumb from "../../../../commons/breadcrumb/Breadcrumb";
import {Validator} from "ree-validate";
import Modal from "react-responsive-modal";
import Datatables from "../../../../commons/datatables/Datatables";
import ProductServices from "../../services"
import {myFirebase} from "../../../../utils/configureFireStore";
import storage from "firebase";

class Container extends Component {
    constructor(props) {
        super(props);

        this.validator = new Validator({
            category: 'required',
            description: 'required',
            discount: 'required',
            name: 'required',
            price: 'required',
            rating: 'required',
            sale: 'required',
            salePrice: 'required',
            shortDetails: 'required',
            stock: 'required'
        })

        this.state = {
            open: false,
            pictures : null,
            url: "",
            product: '',
            products: [],
            colors: ['yellow','gray','white','black'],
            size: ['S','M','L','XL'],
            tags: ['nike','caprese'],
            sale:'true',
            new:'true',
            errors: this.validator.errors,
            updater: false,
        }

        this.onProductChange = this.onProductChange.bind(this);
    }

    componentDidMount() {
        this.fetchProducts()
    }

    componentWillUnmount() {
        this.unmountProducts()
    }

    fetchProducts() {
        ProductServices.get().on("value", this.onProductChange);
    }

    unmountProducts(){
        ProductServices.get().off("value", this.onProductChange);
    }

    onProductChange(value){
        let temp = [];

        value.forEach((value) => {
            let key = value.key;
            let data = value.val();

            temp.push({
                key: key,
                category: data.category,
                description: data.description,
                discount: data.discount,
                name: data.name,
                price: data.price,
                rating: data.rating,
                salePrice: data.salePrice,
                shortDetails: data.shortDetails,
                stock: data.stock,
                colors: ['yellow','gray','white','black'],
                size: ['S','M','L','XL'],
                tags: ['nike','caprese'],
                sale:'true',
                new:'true'
            });
        });

        this.setState({
            products: temp
        })
    }

    handleChange(name, value) {
        const {errors} = this.validator

        this.setState({product: {...this.state.product, [name]: value}})

        errors.remove(name)

        this.validator.validate(name, value)
            .then(() => {
                this.setState({errors})
            })
    }

    handleChangePicture = e => {
        if(e.target.files[0]){
            const picture = e.target.files[0];
            this.setState(() => ({picture}));
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        const {product, updater, picture} = this.state
        const {errors} = this.validator
        const storage = myFirebase.storage()
        console.log(this.state)

        this.validator.validateAll(product)
            .then((success) => {
                if (success) {
                    const uploadTask = storage.ref(`products/${picture.name}`).put(picture);
                    uploadTask.on("state_changed",
                        snapshot => {
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            this.setState({progress})
                        },
                        () => {
                            storage.ref("pictures")
                                .child(picture.name)
                                .getDownloadURL()
                                .then(url => {
                                    this.setState({url})
                                });
                        }
                    );
                    if (updater){
                        ProductServices.update(product.key, product)
                            .then(() => {
                                console.log('Updated')
                            })
                            .catch((e) => {
                                console.log(e);
                            });

                        this.setState({product: '', products: '', updater: false});
                    } else {
                        ProductServices.create(product)
                            .then(() => {
                                console.log('Submitted')
                            })

                        this.setState({product: '', products: ''});
                    }

                    this.onCloseModal();
                    this.fetchProducts()
                } else {
                    this.setState({errors})
                }
            })
    }

    handleUpdate = (row) => {
        this.setState({ product: row.original, updater: true })
        this.onOpenModal()
    }

    handleDestroy = (row) => {
        ProductServices.destroy(row.original.key)
            .then(() => {
                this.fetchProducts();
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
        const { products } = this.state;

        if(products.length) {
            return <Datatables
                multiSelectOption={false}
                myData={products}
                onUpdate={this.handleUpdate}
                onDestroy={this.handleDestroy}
                pageSize={10}
                pagination={true}
                class="-striped -highlight"
            />
        }
    }

    render() {

        const {open, errors, product } = this.state

        return (
            <Fragment>
                <Breadcrumb title="Products" parent="Physical"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Product</h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-popup pull-right">
                                        <button type="button" className="btn btn-primary" onClick={this.onOpenModal}
                                                data-toggle="modal" data-original-title="test"
                                                data-target="#exampleModal">Add Product
                                        </button>

                                        <Modal open={open} onClose={this.onCloseModal}>
                                            <form onSubmit={e => this.handleSubmit(e)}>
                                                <div className="modal-header">
                                                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">Add
                                                        Product</h5>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="form-group">
                                                        <label htmlFor="category" className="col-form-label">Category
                                                            Name :</label>
                                                        <input type="text" name="category" id="category" ref="category"
                                                               className={`form-control ${errors.has('category') && 'is-invalid'}`}
                                                               value={product.category || ''}
                                                               onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                                                        {errors.has('category') &&
                                                        <div className="invalid-feedback">{errors.first('category')}</div>}
                                                        <input type="hidden" name="key" id="key"
                                                               ref="key" value={product.key || ''}
                                                               className="form-control"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="description" className="col-form-label">Description :</label>
                                                        <input type="text" name="description" id="description" ref="description"
                                                               className={`form-control ${errors.has('description') && 'is-invalid'}`}
                                                               value={product.description || ''}
                                                               onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                                                        {errors.has('description') &&
                                                        <div className="invalid-feedback">{errors.first('description')}</div>}
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="discount" className="col-form-label">Discount :</label>
                                                        <input type="number" name="discount" id="discount" ref="discount"
                                                               className={`form-control ${errors.has('discount') && 'is-invalid'}`}
                                                               value={product.discount || ''}
                                                               onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                                                        {errors.has('discount') &&
                                                        <div className="invalid-feedback">{errors.first('discount')}</div>}
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="name" className="col-form-label"> Name :</label>
                                                        <input type="text" name="name" id="name" ref="name"
                                                               className={`form-control ${errors.has('name') && 'is-invalid'}`}
                                                               value={product.name || ''}
                                                               onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                                                        {errors.has('name') &&
                                                        <div className="invalid-feedback">{errors.first('name')}</div>}
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="price" className="col-form-label">Price :</label>
                                                        <input type="number" name="price" id="price" ref="price"
                                                               className={`form-control ${errors.has('price') && 'is-invalid'}`}
                                                               value={product.price || ''}
                                                               onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                                                        {errors.has('price') &&
                                                        <div className="invalid-feedback">{errors.first('price')}</div>}
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="salePrice" className="col-form-label">Sale Price :</label>
                                                        <input type="number" name="salePrice" id="salePrice" ref="salePrice"
                                                               className={`form-control ${errors.has('salePrice') && 'is-invalid'}`}
                                                               value={product.salePrice || ''}
                                                               onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                                                        {errors.has('salePrice') &&
                                                        <div className="invalid-feedback">{errors.first('salePrice')}</div>}
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="rating" className="col-form-label">Rating :</label>
                                                        <input type="number" name="rating" id="rating" ref="rating"
                                                               className={`form-control ${errors.has('rating') && 'is-invalid'}`}
                                                               value={product.rating || ''}
                                                               onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                                                        {errors.has('rating') &&
                                                        <div className="invalid-feedback">{errors.first('rating')}</div>}
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="shortDetails" className="col-form-label">Short Detail :</label>
                                                        <input type="text" name="shortDetails" id="shortDetails" ref="shortDetails"
                                                               className={`form-control ${errors.has('shortDetails') && 'is-invalid'}`}
                                                               value={product.shortDetails || ''}
                                                               onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                                                        {errors.has('shortDetails') &&
                                                        <div className="invalid-feedback">{errors.first('shortDetails')}</div>}
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="stock" className="col-form-label">Stock :</label>
                                                        <input type="number" name="stock" id="stock" ref="stock"
                                                               className={`form-control ${errors.has('stock') && 'is-invalid'}`}
                                                               value={product.stock || ''}
                                                               onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                                                        {errors.has('stock') &&
                                                        <div className="invalid-feedback">{errors.first('stock')}</div>}
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="pictures" className="col-form-label">Pictures :</label>
                                                        <input type="file" name="pictures" id="pictures" ref="pictures"
                                                               value={product.pictures || ''}
                                                               onChange={this.handleChangePicture}/>
                                                        {errors.has('pictures') &&
                                                        <div className="invalid-feedback">{errors.first('pictures')}</div>}
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