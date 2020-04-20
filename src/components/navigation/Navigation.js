import React from "react";

const Navigation = ({onRouteChange, currentRoute}) =>{

        if(currentRoute === 'home')
        {
            return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')}
                       className='f3 link dim black underline pa3 pointer'>Sign Out</p>
                </nav>
            );

        } else {
            return(
                <div>
                    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <div className="mw9  ph3-ns">
                            <div className="cf ph2-ns">
                                <div className="fl w-100 w-50-ns pa2">
                                    <p onClick={() => onRouteChange('signin')}
                                       className='f3 link dim black underline pa3 pointer'>Sign In</p>
                                </div>
                                <div className="fl w-100 w-50-ns pa2">
                                    <p onClick={() => onRouteChange('register')}
                                       className='f3 link dim black underline pa3 pointer'>Register</p>
                                </div>
                            </div>
                        </div>

                    </nav>




                </div>
                );

        }


}

export default Navigation;