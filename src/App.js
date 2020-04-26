import React, {Component} from 'react';
import Particles from "react-particles-js";
import './App.css';
import 'tachyons';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import Rank from './components/rank/Rank'
import FaceRecognition from './components/facerecognition/FaceRecognition'
import Signin from './components/signin/Signin'
import Register from './components/register/Register'




const particlesOptions =  {
    particles: {
        number: {
            value: 50
        },
        size: {
            value: 3
        }
    },
    interactivity: {
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            }
        }
    }
};

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined : new Date()
    }
};

class App extends Component
{

    constructor() {
        super();
        this.state = initialState;
    }

    componentDidMount() {
        fetch('http://localhost:3000')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => 'Unable to connect to the Server please try again later')
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    loadUser = (data) =>
    {
        this.setState({
            user: {
                id : data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    onPictureSubmit  = () => {
        this.setState({imageUrl: this.state.input});
        fetch('http://localhost:3000/imageUrl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input,

            })
        }).then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('http://localhost:3000/imageUrl', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id,

                        })
                    }).then(response => response.json())
                        .then(count => {
                            this.setState({
                                user : {
                                    entries: count
                                }
                            })
                        })
                }
                this.displayFaceBox(this.faceDetection(response));
            }).catch(err=> console.log(err));
    }

    displayFaceBox = (box) =>
    {
        this.setState({box: box});
    }

    onRouteChange = (route) =>
    {
        if(route=== 'signout'){
            this.setState(initialState);
        }
        this.setState({route: route});
    };

    faceDetection = (data) =>
    {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width =  Number(image.width);
        const height = Number(image.height);
        // console.log(width, height);
        return{
            leftCol: clarifaiFace.left_col *width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width -  (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        };
    }
    render() {
        return(
            <div className="App">
                <Particles params={particlesOptions} className='particles'/>
                <Navigation onRouteChange = {this.onRouteChange} currentRoute={this.state.route}/>
                {
                    this.state.route === 'home' ?
                        <div>
                            <Logo />
                            <Rank currentRank={this.state.user.entries}/>
                            <ImageLinkForm
                                onInputChange={this.onInputChange}
                                onPictureSubmit={this.onPictureSubmit}
                            />
                            <FaceRecognition box={this.state.box} imageUrl = {this.state.imageUrl}/>
                        </div>
                        :
                        (
                            this.state.route === 'signin' ?
                                <Signin onRouteChange = {this.onRouteChange} loadUser={this.loadUser} />
                                :
                                <Register loadUser={this.loadUser} onRouteChange= {this.onRouteChange}/>
                        )

                }
            </div>
        )
    }
}

export default App;
