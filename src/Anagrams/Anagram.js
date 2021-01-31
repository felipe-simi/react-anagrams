import React from 'react';

const Anagram = (props) => {
    return (
        <div>
            <input
                disabled={true}
                name="word"
                value={props.word}
            />
            <input
                disabled={true}
                name="anagramCount"
                value={props.count}
            />
            <div>
                <button onClick={props.click}>Remove</button>
            </div>
        </div>
    );
}

export default Anagram;