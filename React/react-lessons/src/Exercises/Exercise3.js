"use client";

import React from "react";

export default class Announce extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      batch: "Third Batch for Basic",
      date: new Date(),
    };
  }
  render() {
    return (
      <div>
        <h1>Announcement for Upcoming Class</h1>
        <div>{this.state.batch}</div>
        <diV>{this.state.date.toString()}</diV>
      </div>
    );
  }
} 