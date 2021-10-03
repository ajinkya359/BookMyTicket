import React from "react";
import './HeadBar.css'
import Button from 'react-bootstrap/Button'

function HeadBar() {
    return (
        <div className="bruh">
            <div className="headBar">
                <div className="leftSide">
                    BookMyTicket
                </div>
                <div className="rightSide">
                    <Button variant="primary" className="button">LogIn</Button>
                    <Button variant="light" className="button">SignUp</Button>
                    <Button variant="link" className="button">About Us</Button>
                </div>
            </div>
        </div>
    )
}

export default HeadBar