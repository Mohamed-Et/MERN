import React, { useEffect, useState, Fragment } from "react";
import "./Caroussel.css";
import axios from "axios";
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
} from "mdbreact";

export default function Caroussel() {
  const [data, setData] = useState([]);
  const [nbr, setNbr] = useState(0);
  const loadCAroussel = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}caroussel`, {})
      .then((response) => {
        setData(response.data);
        setNbr(response.data.length);
      });
  };
  useEffect(loadCAroussel, {});

  return (
    <Fragment>
      {nbr > 0 && (
        <MDBCarousel
          activeItem={1}
          length={nbr}
          showControls={true}
          showIndicators={true}
          className=" mb-0"
          style={{ height: "60vh" }}
        >
          <MDBCarouselInner>
            {data.map((item, index) => {
              return (
                <MDBCarouselItem key={index} itemId={index + 1}>
                  <MDBView>
                    <img
                      className="d-block w-100"
                      src={item.img}
                      alt="First slide"
                    />
                    <MDBMask overlay="black-light" />
                  </MDBView>
                  <MDBCarouselCaption>
                    <h3 className="h3-responsive">
                      {data.length} -{item.title}
                    </h3>
                    <p>{item.description}</p>
                  </MDBCarouselCaption>
                </MDBCarouselItem>
              );
            })}
          </MDBCarouselInner>
        </MDBCarousel>
      )}
    </Fragment>
  );
}
