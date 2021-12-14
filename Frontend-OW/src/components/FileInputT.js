import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as bodyPix from "@tensorflow-models/body-pix";
import styled from "styled-components";

const bufPreviewInit = (isMale, isFront) => {
  if (isMale && !isFront) return "./images/side-male.svg";
  if (!isMale && !isFront) return "./images/side-female.svg";
};

const FileInputT = ({ isMale, isFront, propChangeFile }) => {
  const [secondSegmentation, setSecondSegmentation] = useState({});
  const [bufPreview, setBufPreview] = useState(bufPreviewInit(isMale, isFront));

  const doImagePreview = (_file) => {
    let reader = new FileReader();
    reader.onloadend = (e) => {
      setBufPreview(e.target.result);
    };
    reader.readAsDataURL(_file);
  };

  const doChangeImage = (files) => {
    if (files.length > 0) {
      doImagePreview(files[0]);
    }
  };

  const [imageT, setImageT] = useState("");

  const onChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageT(URL.createObjectURL(e.target.files[0]));
      doChangeImage(e.target.files);
      loadAndPredictT();
    }
  };

  const onDropImage = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    let files = e.dataTransfer.files;
    doChangeImage(files);
    return false;
  };

  const loadAndPredictT = async () => {
    const nett = await bodyPix.load({
      architecture: "MobileNetV1",
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 4,
    });
    const imgT = document.getElementById("imageT");
    imgT.width = 480;
    imgT.height = 640;

    const segmentationT = await nett.segmentPersonParts(imgT, {
      flipHorizontal: false,
      internalResolution: "medium",
      segmentationThreshold: 0.7,
    });

    console.log("the segt");
    console.log(segmentationT)
    const coloredPartImageT = bodyPix.toColoredPartMask(segmentationT);
    const opacity = 0.7;
    const flipHorizontal = false;
    const maskBlurAmount = 0;
    const canvasT = document.getElementById("canvasT");
    bodyPix.drawMask(
      canvasT,
      imgT,
      coloredPartImageT,
      opacity,
      maskBlurAmount,
      flipHorizontal
    );

    setSecondSegmentation(segmentationT.data);
  };

 
  propChangeFile(secondSegmentation);

  const tagx = ("file_input" + (isMale ? "1" : "0"), +(isFront ? "1" : "0"));

  return (
    <Sd>
      <div className="col-sm-6 front_photo upload-iamges">
        <label
          htmlFor={tagx}
          onDragOver={(e) => {
            e.preventDefault();
            return false;
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            return false;
          }}
          onDrop={onDropImage}
          style={{  width:" 480px"}}

        >
          <div className="body-model__form-file-preview">
            <div className="body-model__form-file-preview">
              <img
                className="body-model__form-file-preview-real"
                src={bufPreview}
                alt={isMale ? "Male" : "Female"}
              />
            </div>
          </div>
          <div className="body-model__form-file-overflow">
            <p className="body-model__form-file-pos">
              {isFront ? "Front" : "Side"} photo
            </p>
            <p className="body-model__form-file-text">
              Drop files to upload
              <br /> or click here
            </p>
            <i
              className="body-model__form-file-icon fa fa-camera"
              aria-hidden="true"
              style={{ display: "none" }}
            ></i>
          </div>
        </label>
        <input
          type="file"
          id={tagx}
          style={{ display: "none", height: 640, width: 480 }}
          onChange={onChangeImage}
        />
        <img
          id="imageT"
          src={imageT}
          alt="imageT"
          style={{ height: 640, width: 480 }}
          hidden
        />
        <canvas id="canvasT" style={{ height: 640, width: 480 }} hidden />
      </div>
    </Sd>
  );
};

const Sd = styled.div`
  display: flew;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  .upload-iamges label {
    border-radius: 30px;

    width: 100%;
    border: 1px dotted;
    position: relative;
    text-align: center;
    height: 320px;
    cursor: pointer;
  }
  .upload-iamges
    label
    .body-model__form-file-overflow
    .body-model__form-file-pos {
    position: absolute;
    left: 0;
    right: 0;
    top: 15px;
  }
  .upload-iamges
    label
    .body-model__form-file-overflow
    p.body-model__form-file-text {
    bottom: 15px;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0;
  }
  .upload-iamges label:hover {
    border: 1px dashed #9378ca;
    background-color: rgba(183, 104, 255, 0.04);
    border-radius: 30px;
  }
  .upload-iamges.real-image .body-model__form-file-overflow {
    border-radius: 30px;
    display: none;
  }
  .upload-iamges.real-image:hover .body-model__form-file-overflow {
    display: block;
    color: white;
  }

  .body-model__form-file-overflow {
    padding: 60px 30px;
  }
  .body-model__form-file-preview {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 325px;
        weight: 480px;
  }

`;

export default FileInputT;