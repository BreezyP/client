import React from 'react';
import {Button, Toolbar} from "@material-ui/core";
import { connect } from 'react-redux'
import { signIn, signOut } from "../actions";


class GoogleAuth extends React.Component{



    componentDidMount() {
        window.gapi.load('client:auth2', () =>{
            window.gapi.client.init({
                clientId: '696746180596-iqqsjtks2u2tef9uu4e8mph54bf87ffe.apps.googleusercontent.com',
            scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {

        this.auth.signIn();

    };

    onSignOutClick = () => {

        this.auth.signOut();

    };




    renderAuthButton(){



        if(this.props.isSignedIn === null){
            return null;
        } else if(this.props.isSignedIn){
            return(
                    <Button onClick={this.onSignOutClick} color="secondary">Sign Out</Button>
            );
        } else {
            return(
                <Button onClick={this.onSignInClick} color="inherit">Sign In</Button>

            );
        }

    }

    render(){

        return(

            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {

    return { isSignedIn: state.auth.isSignedIn };

};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);