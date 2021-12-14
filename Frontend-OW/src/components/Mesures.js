import React, {useEffect} from "react";
import styled from "styled-components";
import { queryApi } from "../utils/queryApi";
import axios from "axios";


const Mesures = ({
  lefthand,
  leftleg,
  righthand,
  rightleg,
  shoulder,
  volume,
  user
}) => {


  
  const labelmaps = [
    { label: "Left hand length", field: lefthand },
    { label: "Leftleg length", field: leftleg },
    { label: "Right hand length", field: righthand },
    { label: "Right leg length", field: rightleg },
    { label: "Shoulder", field: shoulder },
    { label: "Waist", field: volume },
  ];


  

  

  return (
    <MeasureStyle>
      <div className="content-block" style={{ marginTop: "130px" }}>
        <div className="section-title text-center">
          <h2>Measurment(cm) :</h2>
        </div>
        <div className="content-block-body measurenments-details">
          <div className="tab-content" id="myTabContent">
            <div id="home" role="tabpanel" aria-labelledby="home-tab">
              <div className="row">
                <div className="col-12">
                  <table className="body-model__params-col">
                    <tbody>
                      {labelmaps.map((labelm, i) => {
                        return (
                          <tr key={i} className="body-model__param">
                            <td>
                              <span className="text">{labelm.label}:</span>
                            </td>
                            <td style={{borderWidth:"2px" , marginTop:"2px", marginBottom:"2px"}}>
                              <div
                                className="input body-model__param-input"
                                style={{ paddingTop: "5px" }}
                              >
                                {[labelm.field] === null ? "" : [labelm.field]}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>                
                </div>
              </div>
            </div>
          </div>                 
        </div>
      </div>
    </MeasureStyle>
  );
};

const MeasureStyle = styled.div`
  .content-block .content-block-header {
    background: #fff;
    font-weight: 700;
    line-height: 22px;
    border-top: 2px solid #e7eaec;
    border-bottom: 1px solid #e7eaec;
    padding: 13px 20px;
  }
  .content-block .content-block-header h3 {
    margin: 0;
    font-size: 20px;
    color: #676a6c;
  }
  .content-block-body {
    padding: 20px;
    background: white;
  }
  .content-block-body .form-group label,
  .content-block-body .form-group legend {
    font-weight: 600;
  }
  .measurenments-details .nav-tabs {
    border: none;
    padding: 10px 0 20px;
  }
  .measurenments-details .nav-tabs .nav-link {
    border: none;
    font-size: 16px;
    color: #676a6c;
    font-weight: 600;
  }
  .measurenments-details .nav-tabs .nav-link.active {
    color: #9378ca;
    border-bottom: 2px solid #9378ca;
  }
  .measurenments-details table .text {
    width: 55px;
    margin-bottom: 2px;
    color: #676a6c;
    font-size: 14px;
    font-weight: 600;
    line-height: 19px;
  }
  .body-model__param-input {
    width: 65px;
    margin: 7px 15px 4px;
    float: right;
    cursor: default;
  }
  .measurenments-details {
    height: 605px;
    overflow: auto;
  }
  .body-model__param-input {
    width: 65px;
    margin: 7px 15px 4px;
    float: right;
    cursor: default;
  }
`;

export default Mesures;