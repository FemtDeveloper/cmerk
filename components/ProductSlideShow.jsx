import { Container } from "@mui/material";
import Image from "next/image";
import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";

export const ProductSlideshow = ({ images }) => {
  return (
    // <Slide easing="ease" duration={5000} indicators>
    //   {images.map((image) => {
    //     return (
    <Container
      key={images[0]}
      sx={{ height: { xs: "360px", sm: "540px" } }}
      style={{
        minWidth: "260px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <Image src={images[0]} alt={"imagen del producto"} layout="fill" />
      </div>
    </Container>
    //     );
    //   })}
    // </Slide>
  );
};
