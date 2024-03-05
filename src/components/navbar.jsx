import React from 'react';


function Navbar(props) {
    // console.log(props)
    const algorithms = [
        { value: 1, type: 'Bubble Sort' },
        { value: 4, type: 'Merge Sort' },
        { value: 2, type: 'Selection Sort' },
        { value: 5, type: 'Quick Sort' },
        { value: 3, type: 'Insertion Sort' },
        { value: 6, type: 'Heap Sort' },
        { value: 7, type: 'Twist Sort' },
    ];



    // console.log(props)

    return (
        <div className="navbar h-min-[100px] py-2 bg-[#36373a] flex justify-center gap-4 items-center sm:flex-row flex-col" id="navbar">
            <div className='hidden sm:block'>

            <button id="random" onClick={() => props.newList(1)} className="btn">
                <span className="text">Random</span>
            </button>
            </div>
            <span className="options box">
                <select
                    name="Algorithm" id="menu" className="algo-menu rounded-lg text-center"
                    onChange={(e) => props.onChange(e.target.value, "algo")}>
                    {algorithms.map(element => (
                        <option
                            key={element.value}
                            value={element.value}>
                            {element.type}
                        </option>
                    ))}
                </select>
                <div class="down_note"></div>
            </span>
            <span className="options flex flex-col justify-center items-center">
                <span className='text-white'>Size : {props.size}</span>
                <input
                    type="range"
                    min="10"
                    max="80"
                    step="2"
                    value={props.size}
                    onChange={(e) => props.onChange(e.target.value, "size")}
                    className="size-slider w-[200px] range"
                />
            </span>
            <span className="options flex flex-col justify-center items-center">
                <span className='text-white px-2'>Speed : {props.speed}x</span>
                <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={props.speed}
                    onChange={(e) => props.onChange(parseFloat(e.target.value), "speed")}
                    className="speed-slider range"
                />
            </span>
            <div className='flex gap-4'>
                <button className='btn sm:hidden block' id="random" onClick={() => props.newList(1)} >

                    <span class="text">Random</span>
                </button>

                <button id="start" onClick={() => props.start()} className="btn">
                    <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" class="sparkle">
                        <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                    </svg>

                    <span class="text">Start</span>
                </button>
            </div>
        </div>
    );
}

export default Navbar;
