"use client";

import React, { useState } from "react";

export default function Person(){
    const [batch, setBatch] = useState("Third Batch for Basic");
    const [date, setDate] = useState(new Date());
    return (
        <div>
            <h1>Announcement for Upcoming Class and Starting Date</h1>
            <div>{batch}</div>
            <div>{date.toString()}</div>
        </div>
    );
    }