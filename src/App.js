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



const app = new Clarifai.App({
    apiKey: 'f166d73cae8a4451925a9fe43230ef17'
});



const particlesOptions =  {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800,
            }
        },

        line_linked: {
            shadow: {

                color: "#000000",
                enable: true,
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
            box: {}
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
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition imageUrl = {this.state.imageUrl}/>
            </div>
        )
    }
}

export default App;
