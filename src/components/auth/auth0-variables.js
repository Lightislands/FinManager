export default {
    auth0Data(){
        return (
            {
                domain: 'sonodome.eu.auth0.com',
                clientID: 'yzkaJkUfuDIit756linDnt5cqtHFRY4i',
                // responseType: 'token id_token',
                // audience: 'https://sonodome.eu.auth0.com/userinfo',
                // scope: 'openid',
                // redirectUri: window.location.href,

                options: {
                    // theme: {
                    //     logo: 'https://example.com/logo.png'
                    // primaryColor: '#31324F'
                    //   },
                    passwordlessMethod: "link",
                    auth: {
                        redirectUrl: 'http://localhost:8000/callback',
                        responseType: 'token id_token'
                    }
                }
            }
        )
    }
}