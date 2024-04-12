import React, {useState, useEffect} from "react";
import Piece from "../piece/index.jsx";

import Root, {Container, ButtonShuffle} from "./index.styled.js";

const DECK_PIECE_WIDTH = 125;

export default function Deck({id, data, image, numberPieces, handlePieceExchange}) {
    const [pieces, setPieces] = useState(data);
    const [pieceSize, setPieceSize] = useState({});

    const shuffleDeck = (data) => {
        const newDeck = [...data];
        for (let i = newDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = newDeck[i];
            newDeck[i] = newDeck[j];
            newDeck[j] = temp;
        }
        return newDeck;
    };

    useEffect(() => {
        if (!image) return;

        const pieceWidth = DECK_PIECE_WIDTH;
        const pieceHeight = DECK_PIECE_WIDTH / image.ratio;

        setPieceSize({
            width: pieceWidth,
            height: pieceHeight,
        });
        setPieces(data);
    }, [data, image]);

    return (
        <Root>
            {pieces && (
                <>
                    <Container>
                        {pieces.map((row, rowIndex) => (
                            <React.Fragment key={`deck-${id}-row-${rowIndex}`}>
                                {row.map((item, columIndex) => (
                                    <Piece
                                        key={`deck-${id}-row-${rowIndex}-column-${columIndex}`}
                                        id={`deck-${id}-row-${rowIndex}-column-${columIndex}`}
                                        index={{
                                            type: 'deck',
                                            row: rowIndex,
                                            column: columIndex,
                                        }}
                                        position={
                                            item && {
                                                x: item.xPositionBackground * pieceSize.width * -1,
                                                y: item.yPositionBackground * pieceSize.height * -1,
                                            }
                                        }
                                        numberPieces={numberPieces}
                                        image={item ? image : null}
                                        size={pieceSize}
                                        handlePieceExchange={handlePieceExchange}
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                    </Container>
                    <ButtonShuffle onClick={() => setPieces(shuffleDeck(pieces))}>Mélanger</ButtonShuffle>
                </>
            )}
        </Root>
    );
}
