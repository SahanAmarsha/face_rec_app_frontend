import React, {Component} from 'react';
import Particles from "react-particles-js";
import './App.css';
import 'tachyons';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import Rank from './components/rank/Rank'
import FaceRecognition from './components/facerecognition/FaceRecognition'
import Signin from './components/signin/Signin'
import Register from './components/register/Register'


const app = new Clarifai.App({
    apiKey: 'f166d73cae8a4451925a9fe43230ef17'
});



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

class App extends Component
{

    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin'
        };
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onButtonSubmit  = () => {
        this.setState({imageUrl: this.state.input});
        console.log('clicked');
        app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
            .then(response => this.displayFaceBox(this.faceDetection(response)))
            .catch(err=> console.log(err));

    }

    displayFaceBox = (box) =>
    {
        this.setState({box: box});
    }

    onRouteChange = (route) =>
    {
        this.setState({route: route});
    }

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
                            <Rank />
                            <ImageLinkForm
                                onInputChange={this.onInputChange}
                                onButtonSubmit={this.onButtonSubmit}
                            />
                            <FaceRecognition box={this.state.box} imageUrl = {this.state.imageUrl}/>
                        </div>
                        :
                        (
                            this.state.route === 'signin' ?
                                <Signin onRouteChange = {this.onRouteChange}/>
                                :
                                <Register onRouteChange= {this.onRouteChange}/>
                        )

                }
            </div>
        )
    }
}

export default App;
