"use client";

import {useState} from "react";

function LogInButton({onClickButton}) {
    return (
        <div>
            <button onClick={onClickButton}>LogInButton</button>
        </div>
    );
}

function UsernameInput({ value, onChangeName}) {
    return (
        <div>
            <input value={value} onChange={(e) => onChangeName(e.target.value)}/>
        </div>
    );
}

// Example10: Passing a function as a Prop
function Parent () {
    const [username, setUsername] = useState();
    return (
        <div>
            <UsernameInput
            value={username}
            onChangeName={(changedName) => setUsername(changedName)}
            />
            <LogInButton onClickButton={()=> alert("Clicked LogIn Button.")}/>
        </div>
    );
}

export default Parent;