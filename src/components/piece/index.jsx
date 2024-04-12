import React, {useState} from "react";

import Root, { Image } from "./index.styled.js";

export default function Piece({ id, index, size, image, position, numberPieces , handlePieceExchange}) {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e) => {
    setDragging(true);
    e.dataTransfer.setData("pieceId", id);
    e.dataTransfer.setData("pieceIndex", JSON.stringify(index));
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const pieceId = e.dataTransfer.getData("pieceId");
    const pieceIndex = JSON.parse(e.dataTransfer.getData("pieceIndex"));

    if (pieceId !== id) {
      handlePieceExchange(pieceIndex, index);
    }
  };

  return (
    <Root
        size={size}
        draggable={image && true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
    >
      {image && (
        <Image
          background_image={`url(${image.url})`}
          background_position={`top ${position.y}px left ${position.x}px`}
          background_size={`calc(100% * ${numberPieces.x}) calc(100% * ${numberPieces.y})`}
        />
      )}
    </Root>
  );
}
