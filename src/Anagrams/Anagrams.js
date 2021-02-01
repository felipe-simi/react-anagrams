import React, { useState } from 'react';

import Anagram from './Anagram';

const handleRemoveWordClick = (index, anagrams, setWordInState) => {
    const updatedAnagrams = updateAnagrams(anagrams[index].word, anagrams, false);
    setWordInState({ anagrams: updatedAnagrams });
}

const handleAddWordClick = (newWord, anagrams, setWordInState) => {
    if (newWord && newWord.length && newWord.trim()) {
        const updatedAnagrams = updateAnagrams(newWord, anagrams, true);
        setWordInState({ anagrams: updatedAnagrams });
    }
}

const updateAnagrams = (word, anagrams, addingWord) => {
    let existingWord = false;
    const updatedAnagrams = [...anagrams];
    if (addingWord) {
        updatedAnagrams.forEach(anagram => {
            if (word === anagram.word) {
                existingWord = true;
                return;
            }
        });
    }
    if (!existingWord) {
        let count = 0;
        const newWordWithoutSpaces = word.replaceAll(" ", "");
        updatedAnagrams.forEach(anagram => {
            const anagramWithoutSpaces = anagram.word.replaceAll(" ", "");
            if (newWordWithoutSpaces.length === anagramWithoutSpaces.length) {
                const newWordSorted = newWordWithoutSpaces.split("").sort().join("");
                const wordSorted = anagramWithoutSpaces.toLowerCase().split("").sort().join("");
                if (newWordSorted === wordSorted) {
                    if (addingWord) {
                        anagram.count++;
                        count++;
                    } else {
                        anagram.count--;
                    }
                }
            }
        });
        if (addingWord) {
            updatedAnagrams.push({ word, count });
        } else {
            const index = updatedAnagrams.findIndex((anagram) => anagram.word === word);
            updatedAnagrams.splice(index, 1);
        }
    }
    return updatedAnagrams;
}

const Anagrams = () => {
    const [anagramState, setWordInState] = useState({ anagrams: [] });
    const [newWord, setInput] = useState('');
    return (
        <div>
            <div>
                <h2>New word</h2>
                <input name="newWord" value={newWord} onInput={e => setInput(e.target.value)} />
                <div>
                    <button onClick={() => handleAddWordClick(newWord, anagramState.anagrams, setWordInState)}>Add</button>
                </div>
            </div>
            <div>
                <h2>Anagrams</h2>
                {anagramState.anagrams.map((anagram, index) => {
                    return <Anagram key={anagram.word} click={() => handleRemoveWordClick(index, anagramState.anagrams, setWordInState)} word={anagram.word} count={anagram.count} />
                })}
            </div>
        </div>
    );
}

export default Anagrams;