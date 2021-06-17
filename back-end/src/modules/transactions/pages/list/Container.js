import React, {Component, Fragment} from "react";
import Breadcrumb from "../../../../commons/breadcrumb/Breadcrumb";
import {Validator} from "ree-validate";
import Modal from "react-responsive-modal";
import Datatables from "../../../../commons/datatables/Datatables";
import TransactionServices from "../../services";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: '',
            transactions: [],
            updater: false,
        }

        this.onTransactionsChange = this.onTransactionsChange.bind(this);
    }

    componentDidMount() {
        this.fetchTransactions()
    }

    componentWillUnmount() {
        this.unmountTransactions()
    }
    unmountTransactions(){
        TransactionServices.get().off("value", this.onTransactionsChange);
    }
    fetchTransactions() {
        TransactionServices.get().on("value", this.onTransactionsChange);
    }

    onTransactionsChange(value){
        let temp = [];

        value.forEach((value) => {
            let key = value.key;
            let data = value.val();

            temp.push({
                key: key,
                address: data.address,
                city : data.city,
                country : data.country,
                email : data.email,
                first_name : data.first_name,
                last_name : data.last_name,
                phone : data.phone,
                pincode : data.pincode,
                state : data.state,
                symbol : data.symbol,
                total : data.total
            });
        });

        this.setState({
            transactions: temp
        })
    }

    handleDestroy = (row) => {
        TransactionServices.destroy(row.original.key)
            .then(() => {
                this.fetchTransactions();
                console.log('destroyed')
            })
            .catch((e) => {
                console.log(e);
            });
    }

    renderDatatables() {
        const { transactions } = this.state;

        if(transactions.length) {
            return <Datatables
                multiSelectOption={false}
                myData={transactions}
                onDestroy={this.handleDestroy}
                pageSize={10}
                pagination={true}
                class="-striped -highlight"
            />
        }
    }

    render() {

        return (
            <Fragment>
                <Breadcrumb title="Transactions" parent="Physical"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Transaction Product</h5>
                                </div>
                                <div className="card-body">
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