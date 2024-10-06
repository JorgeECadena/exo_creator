import React, { createContext, useContext, useState } from 'react';

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
    const [score, setScore] = useState(0);

    const incrementScore = () => {
        setScore((prevScore) => prevScore + 1);
    };

    const resetScore = () => {
        setScore(0);
    };

    return (
        <ScoreContext.Provider value={{ score, incrementScore, resetScore }}>
            {children}
        </ScoreContext.Provider>
    );
};

export const useScore = () => {
    return useContext(ScoreContext);
};