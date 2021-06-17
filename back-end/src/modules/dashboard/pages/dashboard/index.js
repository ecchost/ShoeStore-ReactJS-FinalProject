import {connect} from "react-redux"

import Container from "./Container"

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default connect(mapStateToProps)(Container)