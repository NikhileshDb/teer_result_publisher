import {useEffect, useState} from "react";
const usePersistedState = (key, deafaultValue) => {
    const [state, setState] = useState(
        () => JSON.parse(localStorage.getItem(key)) || deafaultValue
    );
    useEffect(() => {
        // console.log("Setting key");
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
}

export default usePersistedState;
