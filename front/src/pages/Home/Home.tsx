import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Head from "../../globalComponents/Head/Head";
import "./Home.scss";
import callAPI from "../../api";

interface IRow {
  id: string;
  name: string;
  symbol: string;
  closePrice: string;
  tradesValue: string;
}

const Row = ({id, name, symbol, closePrice, tradesValue}: IRow) => {
  return (
    <tr>
      <td style={{ borderBottom: "1px solid #fff" }}></td>
      <td>
        <Link className="detailsLink" to={`/details/${id}`}>
          {symbol}
        </Link>
      </td>
      <td>{name}</td>
      <td>{closePrice ? closePrice : "-"}</td>
      <td>{tradesValue ? tradesValue : "-"}</td>
      <td style={{ borderBottom: "1px solid #fff" }}></td>
    </tr>
  );
};

const Home = () => {
  const viewPortRef = useRef<any>();
  const [assets, setAssets] = useState<{[key: string]: any}[]>([]);
  const [trades, setTrades] = useState<{[key: string]: any}[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<{ [key: string]: any }[]>([]);
  const numVisibleItems = 10;
  const itemHeight = 32;
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(numVisibleItems);
  const containerStyle = {
    height: (filteredAssets.length !== assets.length ? filteredAssets.length : trades.length) * itemHeight,
  };

  useEffect(() => {
    callAPI.getAssets().then((resp: any) => {
      console.log(resp.data.data);
      setAssets(resp.data.data);
      setFilteredAssets(resp.data.data);
    });
    callAPI.getTrades().then((resp: any) => {
      console.log(resp.data.data);
      setTrades(resp.data.data);
    });
  }, []);
  

  function scrollPos() {
    let currentIndx = Math.trunc((viewPortRef.current.scrollTop ) / itemHeight);
    currentIndx =
      currentIndx - numVisibleItems >= trades.length
        ? currentIndx - numVisibleItems
        : currentIndx;
    if (currentIndx !== start) {
      setStart(currentIndx);
      setEnd(
        currentIndx + numVisibleItems >= trades.length
          ? trades.length - 1
          : currentIndx + numVisibleItems
      );
    }
  }

  function renderRows() {
    let result = [];
    for (let i = start; i <= end; i++) {
      let item = filteredAssets[i];
      let tradesItem = trades.find((trade, i) => trade.entity.id == item?.entity.id);
      result.push(
        <Row
          key={i}
          id={item?.entity.id}
          name={item?.value?.title}
          symbol={item?.value?.trade_symbol}
          closePrice={tradesItem?.value?.close_price}
          tradesValue={tradesItem?.value?.value}
        />
      );
    }
    return result;
  }

  function search(st: string) {
    let modified = assets.filter((item, i) => {
      const title = item?.value?.title;
      const symbol = item?.value?.["trade_symbol"];
      if ((symbol && symbol.includes(st)) || (title && title.includes(st))) {
        return item;
      }
    });
    setFilteredAssets(modified);
  } 
  

  return (
    <div className="appHome">
      <Head search={search} />
      <div className="container">
        <div ref={viewPortRef} className="row viewPort" onScroll={scrollPos}>
          <section
            className="col-md-12 assetsTableContainer"
            style={containerStyle}
          >
            <table>
              <thead>
                <tr>
                  <th style={{ width: "10px" }}></th>
                  <th style={{ width: "150px" }}>نماد</th>
                  <th style={{ width: "400px" }}>نام شرکت</th>
                  <th style={{ width: "150px" }}>آخرین قیمت</th>
                  <th style={{ width: "150px" }}>ارزش معاملات</th>
                  <th style={{ width: "10px" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ height: "5px" }}></tr>
                {renderRows()}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home