import { createContext, useState } from 'react';

export const StoriesContext = createContext({
    storiesList: [],
    setStoriesList: (stories) => { }
});

function StoriesContextProvider({ children }) {
    const [stories, setStories] = useState([]);

    function setStoriesList(storiesList) {
        setStories(storiesList)
    }

    const value = {
        storiesList: stories,
        setStoriesList: setStoriesList
    };

    return <StoriesContext.Provider value={value}>{children}</StoriesContext.Provider>
}

export default StoriesContextProvider;