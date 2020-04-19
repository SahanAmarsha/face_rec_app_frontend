import React from "react";

const FaceRecognition = ({imageUrl}) =>{
    return(
        <div className='Center ma'>
            <div className='absolute mt Center' >
                <img id='inputImage' src = {imageUrl} alt = '' width='500px' height='auto'/>

            </div>

        </div>
    );
};

export default FaceRecognition;