import { Container } from "react-bootstrap"
import NavHeader from "./navbar"
import { useState } from "react";

function Header() {

   return(
        <div className="bg-header">
        <NavHeader/>
      
        <Container className='d-flex flex-column header-text'>
            <div className='font-title text-center'>
                <h1 className='fw-semibold' style={{fontSize:'40px', color:'#fff'}}>Connect on DumbSound</h1>
                <p className="fs-4 text-weight-italic ">Discovery, Stream, and share a constantly expanding mix of music
                    <br/>from emerging and major artists around the world</p>
            </div>
        </Container> 
        </div>
   )
}

export default Header