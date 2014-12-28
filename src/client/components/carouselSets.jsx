/** @jsx React.DOM */
'use strict';
var React = require('react');
var Carousel = require('react-bootstrap/Carousel')
var CarouselItem = require('react-bootstrap/CarouselItem')


module.exports = React.createClass({

  render: function() {

    return (
      <Carousel>
        <CarouselItem>
          <img width={1200} height={500} alt="900x500" src="/images/carousel.jpg"/>
          <div className="carousel-caption">
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <img width={1200} height={500} alt="900x500" src="/images/carousel.jpg"/>
          <div className="carousel-caption">
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <img width={1200} height={500} alt="900x500" src="/images/carousel.jpg"/>
          <div className="carousel-caption">
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </div>
        </CarouselItem>
      </Carousel>
    );
  }
});
