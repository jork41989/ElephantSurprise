import React, { Component } from "react";

class OutsideCloser extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      console.log("outside!");
      this.props.closeMemberOption();
    }
  }

  render() {
    return (
      <div ref={this.setWrapperRef}>
        <button>Click outside me!</button>
      </div>
    )
  }
}

export default OutsideCloser;