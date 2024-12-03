import React, {createContext, useCallback, useContext, useState} from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [listeners, setListeners] = useState({});

    const emitEvent = (eventName, data) => {
        if (listeners[eventName]) {
            listeners[eventName].forEach((callback) => callback(data));
        }
    };

    const subscribeToEvent = useCallback((eventName, callback) => {
        setListeners((prevListeners) => {
            const newListeners = { ...prevListeners };
            if (!newListeners[eventName]) {
                newListeners[eventName] = [];
            }
            newListeners[eventName].push(callback);
            return newListeners;
        });

    }, []);

    const unsubscribeFromEvent = useCallback((eventName, callback) => {
        setListeners((prevListeners) => {
            const newListeners = { ...prevListeners };
            if (newListeners[eventName]) {
                newListeners[eventName] = newListeners[eventName].filter(
                    (cb) => cb !== callback
                );
            }
            return newListeners;
        });
    }, []);

    return (
        <EventContext.Provider value={{ emitEvent, subscribeToEvent, unsubscribeFromEvent }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvent = () => {
    return useContext(EventContext);
};
