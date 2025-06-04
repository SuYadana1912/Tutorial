"use client";

// Example14: Using If Statement in Rendering
export default function Greeting({isLoggedIn}) {
    if (isLoggedIn) return <h1>Welcome Back!</h1>;
    if (!isLoggedIn) return <h1>Please Log In</h1>;
}