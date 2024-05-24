import React from "react";
import User from "./User";

const Search = ({ filterUser, handleUser }) => {
  return (
    <div className="search-user">
      {filterUser.map((item, index) => {
        return (
          <div key={index}>
            <User item={item} handleUser={handleUser} />
          </div>
        );
      })}
    </div>
  );
};

export default Search;
