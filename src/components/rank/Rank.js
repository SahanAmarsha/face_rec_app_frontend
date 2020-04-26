import React from "react";

const Rank = ({currentRank}) =>{
    return(
        <div>
            <div className='white f3'>
                {`Sahan your entry count is...`}
            </div>

            <div className='white f1'>
                {currentRank}
            </div>
        </div>

    );
};

export default Rank;