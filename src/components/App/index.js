import React, { Component } from "react";
import TronWeb from "tronweb";

import Utils from "../../utils";
import HomeBaner from "../HomeBaner";
import Home from "../Home";
import StakingBaner from "../StakingBaner";
import Staking from "../Staking";
import TronLinkGuide from "../TronLinkGuide";


class App extends Component {

  render() {


    var getString = "";
    var loc = document.location.href;
    //console.log(loc);
    if(loc.indexOf('?')>0){
              
      getString = loc.split('?')[1];
      getString = getString.split('#')[0];

    }
    return (<></>);

    switch (getString) {
      case "staking": 
      case "brst":
      case "BRST": 
        if (!this.state.tronWeb.installed) return (
          <>
            <StakingBaner/>
            <div className="container">
              <TronLinkGuide  url={"/?"+getString}/>
            </div>
          </>
          );
    
        if (!this.state.tronWeb.loggedIn) return (
          <>
            <StakingBaner/>
            <div className="container">
              <TronLinkGuide installed url={"/?"+getString}/>
            </div>
          </>
          );
    
        return (
          <>
            <StakingBaner getString={getString}/>
            <Staking />
          </>
        );
      

    
      default:  
        if (!this.state.tronWeb.installed) return (
          <>
            <HomeBaner/>
            <div className="container">
              <TronLinkGuide />
            </div>
          </>
          );
    
        if (!this.state.tronWeb.loggedIn) return (
          <>
            <HomeBaner/>
            <div className="container">
              <TronLinkGuide installed />
            </div>
          </>
          );
    
        return (
          <>
            <HomeBaner/>
            <Home />
          </>
        );
    
        
      
    }


    
  }

  
}
export default App;

// {tWeb()}
