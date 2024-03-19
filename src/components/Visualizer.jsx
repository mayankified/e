import React, { useEffect, useState } from 'react';

// algorithms
import { bubbleSort } from './algorithms/bubbleSort.js';
import { insertionSort } from './algorithms/insertionSort.js';
import { selectionSort } from './algorithms/selectionSort.js';
import { mergeSort } from './algorithms/mergeSort.js';
import { quickSort } from './algorithms/quickSort.js';
import { heapSort } from './algorithms/heapSort.js';
import { twistSort } from './algorithms/twistSort.js';

// components
import Navbar from './navbar.jsx';
// import Frame from './frame.jsx';
// import Footer from './footer.jsx';

// helpers
import pause from './helper/pause.js';
import generator from './helper/generator.js';
import { ALGORITHM, SPEED, SIZE, SWAP, CURRENT, NORMAL, DONE } from './helper/constants.js';
import { getKeysCopy } from './helper/keys.js';

function Visualizer() {
    const [list, setList] = useState([]);
    const [size, setSize] = useState(10);
    const [speed, setSpeed] = useState(1);
    const [algorithm, setAlgorithm] = useState(1);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        generateList();
    }, []);

    useEffect(() => {
        onChange();
        generateList();
    }, [size, speed, algorithm, running]);

    const onChange = (value, option) => {
        if (option === ALGORITHM && !running) {
            setAlgorithm(Number(value));
        } else if (option === SPEED) {
            setSpeed(Number(value));
            // console.log(speed)
        } else if (option === SIZE && !running) {
            setSize(Number(value));
            generateList();
        }
    };

    const generateList = (value = 0) => {
        if ((list.length !== size && !running) || Number(value) === 1) {
            const newList = generator(size);
            setList(newList);
        }
    };

    const start = async () => {
        lock(true);
        const moves = await getMoves(algorithm);
        await visualizeMoves(moves);
        await done();
        lock(false);
    };

    const getMoves = async (Name) => {
        let moves = [];
        let array = await getKeysCopy(list, size);
        switch (Name) {
            case 1:
                moves = await bubbleSort(array, array.length);
                break;
            case 2:
                moves = await selectionSort(array, array.length);
                break;
            case 3:
                moves = await insertionSort(array, array.length);
                break;
            case 4:
                moves = await mergeSort(array, array.length);
                break;
            case 5:
                moves = await quickSort(array, array.length);
                break;
            case 6:
                moves = await heapSort(array, array.length);
                break;
            case 7:
                moves = await twistSort(array, array.length);
                break;
            default:
                break;
        }
        return moves;
    };

    const visualizeMoves = async (moves) => {
        if (moves.length === 0) {
            return;
        }
        if (moves[0].length === 4) {
            await visualizeMovesInRange(moves);
        } else {
            await visualizeMovesBySwapping(moves);
        }
    };

    const visualizeMovesInRange = async (Moves) => {
        let prevRange = [];
        while (Moves.length > 0 && Moves[0].length === 4) {
            if (prevRange !== Moves[0][3]) {
                await updateElementClass(prevRange, NORMAL);
                prevRange = Moves[0][3];
                await updateElementClass(Moves[0][3], CURRENT);
            }
            await updateElementValue([Moves[0][0], Moves[0][1]]);
            Moves.shift();
        }
        await visualizeMoves(Moves);
    };

    const visualizeMovesBySwapping = async (Moves) => {
        while (Moves.length > 0) {
            let currMove = Moves[0];
            if (currMove.length !== 3) {
                await visualizeMoves(Moves);
                return;
            } else {
                let indexes = [currMove[0], currMove[1]];
                await updateElementClass(indexes, CURRENT);
                if (currMove[2] === SWAP) {
                    await updateList(indexes);
                }
                await updateElementClass(indexes, NORMAL);
            }
            Moves.shift();
        }
    };

    const updateList = async (indexes) => {
        let array = [...list];
        let stored = array[indexes[0]].key;
        array[indexes[0]].key = array[indexes[1]].key;
        array[indexes[1]].key = stored;
        await updateStateChanges(array);
    };

    const updateElementValue = async (indexes) => {
        let array = [...list];
        array[indexes[0]].key = indexes[1];
        await updateStateChanges(array);
    };

    const updateElementClass = async (indexes, classType) => {
        let array = [...list];
        for (let i = 0; i < indexes.length; ++i) {
            array[indexes[i]].classType = classType;
        }
        await updateStateChanges(array);
    };

    const updateStateChanges = async (newList) => {
        setList(newList);
        await pause(speed);
    };

    const lock = (status) => {
        setRunning(Boolean(status));
    };

    const done = async () => {
        let indexes = [];
        for (let i = 0; i < size; ++i) {
            indexes.push(i);
        }
        await updateElementClass(indexes, DONE);
    };


    const getClass = (value) => {
        if (value === 0) return 'cell';
        else if (value === 1) return 'cell current';
        return 'cell done';
    };
    return (
        <div className='flex flex-col sm:h-[100vh] h-full gap-6'>
            
            <Navbar
                start={start}
                // response={response}
                newList={generateList}
                onChange={onChange}
                size={size}
                speed={speed}
            />

            {/* //Framee */}
            <div className="frame items-end flex justify-center">
                <div className="flex items-end sm:h-[70vh] h-[60vh] w-[90vw]">
                    {list.map((element, index) => (
                        <div
                            className={getClass(element.classType)}
                            key={index}
                            style={{ height: `${4 * element.key}px` }}
                            value={element.key}>
                        </div>
                    ))}
                </div>
            </div>
            <footer className='my-6 w-full text-center font-bold text-white' >
                <p className='flex sm:flex-row justify-center flex-col'>
                    
                    <a href="https://github.com/hanushajain66" target="_blank" rel="noopener noreferrer" className="link">
                       Hanusha
                    </a>
                </p>
            </footer>
        </div>
    );
}

export default Visualizer;
