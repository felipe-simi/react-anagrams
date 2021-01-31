import React, { useState } from 'react';

import Anagram from './Anagram';

const handleClick = (index, anagrams, setWordInState) => {
    const updatedAnagrams = [...anagrams];
    updatedAnagrams.splice(index, 1)
    setWordInState({ anagrams: updatedAnagrams });
}

const Anagrams = () => {
    const [anagramState, setWordInState] = useState({
        anagrams: [
        ]
    });

    return (
        <div>
            <h2>Anagrams</h2>
            { anagramState.anagrams.map((anagram, index) => {
                return <Anagram key={anagram.word} click={() => handleClick(index, anagramState.anagrams, setWordInState)} word={anagram.word} count={anagram.count} />
            })}
        </div>
    );
}

export default Anagrams;