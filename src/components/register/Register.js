import React from "react";
import '../signin/Signin.css';

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : '',
            name : ''
        }
    }


    onEmailChange = (event) =>
    {
        this.setState({email : event.target.value})
    };

    onNameChange = (event) =>
    {
        this.setState({name : event.target.value})
    };

    onPasswordChange = (event) =>
    {
        this.setState({password : event.target.value})
    };

    onSubmit = () =>
    {
        // console.log(this.state);
        fetch('http://localhost:3000/register',  {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        }).then(response => response.json())
        .then(user =>
        {

            if(user.id)
            {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        });

    };

    render() {
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5  center">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="white f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 white"  htmlFor="name">Name</label>
                                <input className="white-input pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="text" name="name" id="name" onChange={this.onNameChange}/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 white"  htmlFor="email-address">Email</label>
                                <input className="white-input pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="email" name="email-address" id="email-address" onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6 white" htmlFor="password">Password</label>
                                <input className="white-input pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="password" name="password" id="password" onChange={this.onPasswordChange}/>
                            </div>
                        </fieldset>
                        <div className="lh-copy mt3 tc">
                            <input className="white-input b ph4 pv2 input-reset ba br3  b--black bg-transparent grow pointer f4 dib"
                                   type="submit" value="Submit" onClick={this.onSubmit} />
                        </div>
                    </div>
                </main>
            </article>
        );
    }


}

export default Register;