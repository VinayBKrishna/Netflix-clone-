import React from 'react' 
import { connect } from 'react-redux'

function Account(props) {
    console.log('account', props)
    return (
        <div>
            <h2>User Account Info</h2>
            <h2>{ props.user.username }</h2>
            <h2>{ props.user.email }</h2>
        </div> 
    )
}

const mapStateToProps = (state) => {
    return { 
        user: state.user 
    }
}
export default connect(mapStateToProps)(Account)