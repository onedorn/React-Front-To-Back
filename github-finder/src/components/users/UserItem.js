import React from "react";

const userItem = ({user: {login, avatar_url, html_url}}) => {

  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        className="round-img"
        style={{ width: "60px" }}
        alt="img"
      />
      <h3>{login}</h3>
      <div>
        <a href={html_url} className="btn btn-dark btn-sm">
          More...
        </a>
      </div>
    </div>
  );
};

export default userItem;
