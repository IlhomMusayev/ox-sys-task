import Icons from "configs/Icon";
import React, { Component } from "react";

export class Icon extends Component {
  render() {
    const { type, className } = this.props;
    Icons[type] || console.log(type);
    return (
      <>
        {React.createElement(Icons[type] || "div", {
          className: className,
        })}
      </>
    );
  }
}

export default Icon;
