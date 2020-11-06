import React from "react";
import "./NotFoundPage.css";
import ErrorImage from "../../images/error/Error.png";

export default function NotFoundPage() {
  return (
    <div>
      <div>
        <img className="image" src={ErrorImage} alt="Under Construction" />
      </div>
      <h1>Oops, Something went wrong.</h1>
      <h2>We were unable to find that page, try another.</h2>
    </div>
  );
}
