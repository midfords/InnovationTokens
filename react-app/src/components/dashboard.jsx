import React, { Component } from "react";
import NavBar from "./common/navbar";

class Tokens extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="padding">
          <h1>Tokens Dashboard</h1>
          <div className="ui column grid">
            <div className="ten wide column">
              <div className="top attached ui segment">
                <h3>Balance</h3>
                13 T
              </div>
              <div className="bottom attached ui segment">
                <h4>Spend Tokens</h4>
                <div className="ui action input fluid">
                  <input type="text" placeholder="Amount" />
                  <button class="ui button">Spend</button>
                </div>
                <br />
                <h4>Send Tokens</h4>
                <div className="ui input fluid">
                  <input placeholder="Amount" style={{ width: 300 }} />
                </div>
                <br />
                <div className="ui input fluid">
                  <input placeholder="Recipient" style={{ width: 300 }} />
                </div>
                <br />
                <button className="ui primary basic button">Send</button>
              </div>
              <div className="ui segment">
                <h3>Weekly Goal</h3>
                <div className="ui indicating blue progress">
                  <div className="bar">
                    <div className="progress" />
                  </div>
                  <div className="label">Progress</div>
                </div>
              </div>
              <div className="ui segment">
                <h3>Leaderboards</h3>
              </div>
            </div>
            <div className="six wide column">
              <div className="ui segment">
                <h3>
                  Blockchain Feed <i className="fa fa-rss" />
                </h3>
                <div className="ui top attached segment">
                  Id: <b>332</b>
                </div>
                <div className="ui attached segment">
                  Hash:
                  <p>
                    <b>
                      NkhMVfmC8bCJM2r4bUkaV1XFN0WCtqhKjaeo6iFzZFvIIlRQeE8rsb2eq1PW
                    </b>
                  </p>
                </div>
                <div className="ui bottom attached segment">
                  Date
                  <p>
                    <b>
                      16/06/2019
                      <br />
                      13:45:42
                    </b>
                  </p>
                </div>
                <div className="ui top attached segment">
                  Id: <b>332</b>
                </div>
                <div className="ui attached segment">
                  Hash:
                  <p>
                    <b>8hnzUbpeHb554OVGjDpuiadmp82jymyoINOfKhr0</b>
                  </p>
                </div>
                <div className="ui bottom attached segment">
                  Date
                  <p>
                    <b>
                      16/06/2019
                      <br />
                      13:45:42
                    </b>
                  </p>
                </div>
                <div className="ui top attached segment">
                  Id: <b>332</b>
                </div>
                <div className="ui attached segment">
                  Hash:
                  <p>
                    <b>2FWTL72UXoccRL0EIYe5eDiMRdBgs7hjCKV6dWP9</b>
                  </p>
                </div>
                <div className="ui bottom attached segment">
                  Date
                  <p>
                    <b>
                      16/06/2019
                      <br />
                      13:45:42
                    </b>
                  </p>
                </div>
                <div className="ui top attached segment">
                  Id: <b>332</b>
                </div>
                <div className="ui attached segment">
                  Hash:
                  <p>
                    <b>aqT1IqZxVsom4EILsWKw108mtQK7j8ai22Eqz4ij</b>
                  </p>
                </div>
                <div className="ui bottom attached segment">
                  Date
                  <p>
                    <b>
                      16/06/2019
                      <br />
                      13:45:42
                    </b>
                  </p>
                </div>
                <div className="ui top attached segment">
                  Id: <b>332</b>
                </div>
                <div className="ui attached segment">
                  Hash:
                  <p>
                    <b>GiJuIYPGCx92knFZ4TbR4bKS3mQBheywrRIaDYsW</b>
                  </p>
                </div>
                <div className="ui bottom attached segment">
                  Date
                  <p>
                    <b>
                      16/06/2019
                      <br />
                      13:45:42
                    </b>
                  </p>
                </div>
                <div className="ui top attached segment">
                  Id: <b>332</b>
                </div>
                <div className="ui attached segment">
                  Hash:
                  <p>
                    <b>PSdi5AndIJ10hjgC6k57KpMjQUhbackGwyq0erp7</b>
                  </p>
                </div>
                <div className="ui bottom attached segment">
                  Date
                  <p>
                    <b>
                      16/06/2019
                      <br />
                      13:45:42
                    </b>
                  </p>
                </div>
                <div className="ui top attached segment">
                  Id: <b>332</b>
                </div>
                <div className="ui attached segment">
                  Hash:
                  <p>
                    <b>wWSxGldN2cwneQFnudDTPzVoB8YIXYHPXsAc5mmn</b>
                  </p>
                </div>
                <div className="ui bottom attached segment">
                  Date
                  <p>
                    <b>
                      16/06/2019
                      <br />
                      13:45:42
                    </b>
                  </p>
                </div>
                <div className="ui top attached segment">
                  Id: <b>332</b>
                </div>
                <div className="ui attached segment">
                  Hash:
                  <p>
                    <b>rjscwvcyfszv2ePHoKLy3YlSqoLcgEstEKYNIgtV</b>
                  </p>
                </div>
                <div className="ui bottom attached segment">
                  Date
                  <p>
                    <b>
                      16/06/2019
                      <br />
                      13:45:42
                    </b>
                  </p>
                </div>
                <div className="ui top attached segment">
                  Id: <b>332</b>
                </div>
                <div className="ui attached segment">
                  Hash:
                  <p>
                    <b>KkAwavg4uRuSqqbqehvBbFYhlZRNTqJwk6REX98u</b>
                  </p>
                </div>
                <div className="ui bottom attached segment">
                  Date
                  <p>
                    <b>
                      16/06/2019
                      <br />
                      13:45:42
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Tokens;
