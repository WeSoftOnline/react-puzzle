import React from "react";

import Root from "./index.styled.js";

export default function Preview({ image }) {
  return (
    <Root>
      <img src={image.url} alt={"Prévisualisation"} />
    </Root>
  );
}
