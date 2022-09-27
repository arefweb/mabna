import React from 'react';
import "./Head.scss";
import searchImg from "../../assets/images/search.png";

interface IHead {
  search: (st: string) => void;
}

const Head = ({search}: IHead) => {
  return (
    <header className="appHeader">
      <div className="appHeader-title">
        <p>لیست دارایی ها</p>
      </div>
      <div className="appHeader-search">
        <img src={searchImg} alt="" className="appHeader-search-img" />
        <input
          type="text"
          placeholder={`جستجو نام نماد، نام شرکت`}
          className="appHeader-search-input"
          onChange={(e) => search(e.target.value)}
        />
      </div>
    </header>
  );
}

export default Head