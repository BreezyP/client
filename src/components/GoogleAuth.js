import React from 'react';

class GoogleAuth extends React.Component{

    state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load('client:auth2', () =>{
            window.gapi.client.init({
                clientId: '696746180596-iqqsjtks2u2tef9uu4e8mph54bf87ffe.apps.googleusercontent.com',
            scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
            });
        });
    }

    render(){
        return(
            <div>GoogleAuth</div>
        );
    }
}

export default GoogleAuth;