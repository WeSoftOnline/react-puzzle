import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import Piece from "../piece/index.jsx";

import Root, {Container} from "./index.styled.js";
import Deck from "../deck/index.jsx";
import {DndContext} from "@dnd-kit/core";
import {getCookie, setCookie} from "../../utils/cookies.js";

const Grid = forwardRef(function Grid({id, image, numberPieces, handleGridFinished}, ref) {

    const [grid, setGrid] = useState([]);
    const [deck, setDeck] = useState([]);

    const [pieceSize, setPieceSize] = useState({});

    useImperativeHandle(ref, () => ({
        reset() {

            // Calcule de la taille des pièces
            const pieceWidth = 400 / numberPieces.x;
            const pieceHeight = pieceWidth / image.ratio;

            setPieceSize({
                width: pieceWidth,
                height: pieceHeight,
            });

            // Réinitialisation de la grille
            const newGrid = [];
            for (let row = 0; row < numberPieces.x; row++) {
                const newRow = [];
                for (let column = 0; column < numberPieces.y; column++) {
                    newRow.push(null);
                }
                newGrid.push(newRow);
            }
            setGrid(newGrid);

            // Réinitialisation du deck
            const newDeck = [];
            let counter = 0;
            for (let row = 0; row < numberPieces.x; row++) {
                const newRow = [];
                for (let column = 0; column < numberPieces.y; column++) {
                    newRow.push({
                        index: counter++,
                        xPositionBackground: column,
                        yPositionBackground: row,
                    });
                }
                newDeck.push(newRow);
            }
            setDeck(newDeck);
        },
        save() {
            setCookie("player", JSON.stringify({
                grid, deck, pieceSize
            }));
        },
        load() {
            let values = getCookie("player");
            if(!values) return;

            values = JSON.parse(values);

            setGrid(values.grid);
            setDeck(values.deck);
            setPieceSize(values.pieceSize);
        }
    }));

    const handlePieceExchange = (pieceIndexA, pieceIndexB) => {

        const newDeck = [...deck];
        const newGrid = [...grid];

        if (pieceIndexA.type === 'deck' && pieceIndexB.type === 'grid') {
            const pieceA = newDeck[pieceIndexA.row][pieceIndexA.column];
            const pieceB = newGrid[pieceIndexB.row][pieceIndexB.column];

            newGrid[pieceIndexB.row][pieceIndexB.column] = pieceA;
            newDeck[pieceIndexA.row][pieceIndexA.column] = pieceB;

        } else if (pieceIndexA.type === 'grid' && pieceIndexB.type === 'deck') {
            const pieceA = newGrid[pieceIndexA.row][pieceIndexA.column];
            const pieceB = newDeck[pieceIndexB.row][pieceIndexB.column];

            newDeck[pieceIndexB.row][pieceIndexB.column] = pieceA;
            newGrid[pieceIndexA.row][pieceIndexA.column] = pieceB;

        } else if (pieceIndexA.type === 'deck' && pieceIndexB.type === 'deck') {
            const pieceA = newDeck[pieceIndexA.row][pieceIndexA.column];
            const pieceB = newDeck[pieceIndexB.row][pieceIndexB.column];

            newDeck[pieceIndexA.row][pieceIndexA.column] = pieceB;
            newDeck[pieceIndexB.row][pieceIndexB.column] = pieceA;

        } else if (pieceIndexA.type === 'grid' && pieceIndexB.type === 'grid') {
            const pieceA = newGrid[pieceIndexA.row][pieceIndexA.column];
            const pieceB = newGrid[pieceIndexB.row][pieceIndexB.column];

            newGrid[pieceIndexA.row][pieceIndexA.column] = pieceB;
            newGrid[pieceIndexB.row][pieceIndexB.column] = pieceA;

        } else {
            console.error('Invalid exchange.');
            return;
        }

        setGrid(newGrid);
        setDeck(newDeck);

        checkGrid();
    };

    const checkGrid = () => {
        if (grid.length < 0) return;

        let isGridFinished = true;
        let counter = 0;

        for (let row = 0; row < grid.length; row++) {
            for (let column = 0; column < grid[0].length; column++) {
                if (grid[row][column] === null || grid[row][column].index !== counter++) {
                    isGridFinished = false;
                    break;
                }
            }
        }

        // Grille terminée
        if (isGridFinished) {
            handleGridFinished();
        }
    }

    useEffect(() => {
        if (!ref.current) return;
        ref.current.reset();
        ref.current.load();
    }, [ref]);

    return (
        <Root>
            <Container>
                <DndContext>
                    {grid.map((row, rowIndex) => (
                        <React.Fragment key={`grid-${id}-row-${rowIndex}`}>
                            {row.map((item, columIndex) => (
                                <Piece
                                    key={`grid-${id}-row-${rowIndex}-column-${columIndex}`}
                                    id={`grid-${id}-row-${rowIndex}-column-${columIndex}`}
                                    index={{
                                        type: 'grid',
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

                    <Deck id={id} data={deck} image={image} numberPieces={numberPieces}
                          handlePieceExchange={handlePieceExchange}/>
                </DndContext>
            </Container>
        </Root>
    );
});

export default Grid;
