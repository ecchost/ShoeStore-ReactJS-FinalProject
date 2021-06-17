import React from 'react'
const Row = (props, index) => {
    return (<tr key={props.idCategory}>
        <td></td>
        <td>{props.name}</td>
        <td>
            <div className="btn-group pull-right" role="group" aria-label="Actions">
                <button className="btn btn-danger" onClick={() => {if(window.confirm('Are you sure wanna delete this row?')) props.handleDeleteCategory(props.idCategory)}}>
                    <i className="fa fa-trash-o" style={{width: 35, fontSize: 20, padding: 11}}/>
                </button>
            </div>
        </td>
    </tr>)
}
export default Row