import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import Head from "../../globalComponents/Head/Head";
import "./Details.scss";
import callAPI from "../../api";

const Details = () => {
  let { id } = useParams<{ id: string }>();
  const [symbolInfo, setSymbolInfo] = useState<{[key: string]: any}>({});
  const [lastTrades, setLastTrades] = useState<{ [key: string]: any }>({});
  const [supply, setSupply] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    callAPI.getLastTrades(id).then((resp: any) => {
      console.log(resp.data.data);
      setLastTrades(resp.data.data[0]);
    });
    callAPI.getSymbolInfo(id).then((resp: any) => {
      console.log(resp.data.data);
      setSymbolInfo(resp.data.data[0]);
    });
    callAPI.getSupply(id).then((resp: any) => {
      console.log(resp.data.data);
      setSupply(resp.data.data[0]);
    })
  }, [])
  

  return (
    <div className="appDetails">
      <Head search={() => 0} />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 assetNav">
            <Link to={`/`} className="back">
              لیست دارایی ها
            </Link>
            <span className="slash">&nbsp; / &nbsp;</span>
            <span className="symbol">
              &nbsp; {symbolInfo?.value?.trade_symbol} &nbsp;
            </span>
          </div>
          <div className="col-sm-12">
            <div className="assetHeader">
              <div className="assetHeader-top">
                <span>{symbolInfo?.value?.trade_symbol}</span>
                <span>{lastTrades?.value?.open_price}</span>
              </div>
              <div className="assetHeader-bottom">
                {symbolInfo?.value?.title}
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-6 tradesInfo">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "10px" }}></th>
                  <th>اطلاعات معاملات</th>
                  <th></th>
                  <th style={{ width: "10px" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    height: "5px",
                    borderLeft: "1px solid transparent",
                    borderRight: "1px solid transparent",
                  }}
                ></tr>
                <tr>
                  <td style={{ borderBottom: "1px solid #fff" }}></td>
                  <td>پایانی:</td>
                  <td>{lastTrades?.value?.close_price}</td>
                  <td style={{ borderBottom: "1px solid #fff" }}></td>
                </tr>
                <tr>
                  <td style={{ borderBottom: "1px solid #fff" }}></td>
                  <td>بیشترین:</td>
                  <td>{lastTrades?.value?.high_price}</td>
                  <td style={{ borderBottom: "1px solid #fff" }}></td>
                </tr>
                <tr>
                  <td style={{ borderBottom: "1px solid #fff" }}></td>
                  <td>کمترین:</td>
                  <td>{lastTrades?.value?.low_price}</td>
                  <td style={{ borderBottom: "1px solid #fff" }}></td>
                </tr>
                <tr>
                  <td style={{ borderBottom: "1px solid #fff" }}></td>
                  <td>اولین:</td>
                  <td>{lastTrades?.value?.open_price}</td>
                  <td style={{ borderBottom: "1px solid #fff" }}></td>
                </tr>
                <tr>
                  <td style={{ borderBottom: "1px solid #fff" }}></td>
                  <td>آخرین:</td>
                  <td>{lastTrades?.value?.real_close_price}</td>
                  <td style={{ borderBottom: "1px solid #fff" }}></td>
                </tr>
                <tr>
                  <td style={{ borderBottom: "1px solid #fff" }}></td>
                  <td>حجم:</td>
                  <td>{lastTrades?.value?.volume}</td>
                  <td style={{ borderBottom: "1px solid #fff" }}></td>
                </tr>
                <tr>
                  <td></td>
                  <td>ارزش:</td>
                  <td>{lastTrades?.value?.value}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-6 supplyInfo">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "10px" }}></th>
                  <th>دستور</th>
                  <th>تعداد</th>
                  <th>خرید</th>
                  <th style={{ width: "10px" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    height: "5px",
                    borderLeft: "1px solid transparent",
                    borderRight: "1px solid transparent",
                  }}
                ></tr>
                {supply?.value?.orders.map((item: any, i: number) => {
                  return (
                    <tr>
                      <td
                        style={
                          i !== supply?.value?.orders.length - 1
                            ? { borderBottom: "1px solid #fff" }
                            : {}
                        }
                      ></td>
                      <td>{item?.order_rank}</td>
                      <td>{item?.bid_volume}</td>
                      <td>{item?.bid_price}</td>
                      <td
                        style={
                          i !== supply?.value?.orders.length - 1
                            ? { borderBottom: "1px solid #fff" }
                            : {}
                        }
                      ></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
