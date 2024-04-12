import React, { useState } from "react";

export default function Menu({ onStart }) {
  const [image, setImage] = useState();
  const [numberPieces, setNumberPieces] = useState({ x: 2, y: 2 });

  /**
   * Validation du formulaire
   */
  const onSubmit = (event) => {
    event.preventDefault();

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const ratio = img.naturalWidth / img.naturalHeight;

        onStart(numberPieces, {
          url: reader.result,
          ratio: ratio,
        });
      };
    };

    reader.readAsDataURL(image);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type={"text"}
        placeholder={"Nombre de pièces : X"}
        value={numberPieces.x}
        onChange={(event) =>
          setNumberPieces({ x: event.target.value, y: numberPieces.y })
        }
      />
      <input
        type={"text"}
        placeholder={"Nombre de pièces : Y"}
        value={numberPieces.y}
        onChange={(event) =>
          setNumberPieces({ x: numberPieces.x, y: event.target.value })
        }
      />
      <input type={"file"} onChange={() => setImage(event.target.files[0])} />
      <input type={"submit"} value={"Commencer"} />
    </form>
  );
}
