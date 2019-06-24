import React, { Component } from "react";
import axios from 'axios';
import slide1 from './img/slide_2.jpg';
import slide2 from './img/slide_3.jpg';
import slide3 from './img/slide_4.jpg';

import './Home_Component.css';


import { Slide } from 'react-slideshow-image';

const slideImages = [
    slide1,
    slide2,
    slide3
];

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    onChange: (oldIndex, newIndex) => {
        console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
}

const Slideshow = () => {
    return (
        <Slide {...properties}>
            <div className="each-slide">
                <div style={{ 'backgroundImage': `url(${slideImages[0]})` }}>
                </div>
            </div>
            <div className="each-slide">
                <div style={{ 'backgroundImage': `url(${slideImages[1]})` }}>
                </div>
            </div>
            <div className="each-slide">
                <div style={{ 'backgroundImage': `url(${slideImages[2]})` }}>
                </div>
            </div>
        </Slide>
    )
}

export default class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div>
                    <Slideshow />
                </div>
            </div>
        )
    }
}