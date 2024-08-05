import { CloseCircleOutlined } from "@ant-design/icons";
import colors from "@constants/colors";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { ConfigProvider, Spin } from "antd";
import { useEffect, useRef, useState } from "react";

const UploadVideo = ({ title, pick, video, videoPost,sendSizeVideo }) => {;
    const ffmpegRef = useRef(new FFmpeg());
    const messageRef = useRef(null);
    const [videodata, setVideodata] = useState();
    const inputRef = useRef(null);
    const [isPickVideo, setisPickVideo] = useState(false);
    const load = async () => {
      const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
      const ffmpeg = ffmpegRef.current;
      ffmpeg.on("log", ({ message }) => {
        if (messageRef.current) messageRef.current.innerHTML = message;
      });
      await ffmpeg.load({});
    };
  
    useEffect(() => {
      load();
    }, []);
  
    const transcode = async (file) => {
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.writeFile("input.avi", await fetchFile(file));
      await ffmpeg.exec(["-i", "input.avi", "output.mp4"]);
      const fileData = await ffmpeg.readFile("output.mp4");
      const data = new Uint8Array(fileData);
      video(URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" })));
      setVideodata(URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" })))
      pick(true);
    };
  
    const handleButtonClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };
    const handleVideoChange = (e) => {
      setisPickVideo(true);
      const file = e.target.files[0];
      if (file) {
        const videoURL = URL.createObjectURL(file);
        const videoElement = document.createElement('video');
        videoElement.onloadedmetadata = () => {
          const videoWidth = videoElement.videoWidth;
          const videoHeight = videoElement.videoHeight;
          sendSizeVideo(videoWidth,videoHeight)
          URL.revokeObjectURL(videoURL);
        };
        videoElement.src = videoURL;
        videoElement.load();
        const fileName = file.name;
        const fileExtension = fileName.split(".").pop().toLowerCase();
        if (fileExtension === "avi") {
          const reader = new FileReader();
          videoPost(file);
          reader.onload = (e) => {
            const fileDataUrl = e.target.result;
            console.log(fileDataUrl);
  
            transcode(fileDataUrl);
          };
          reader.readAsDataURL(file);
        } else {
          // setisPickVideo(false);
          setVideodata(URL.createObjectURL(file));
          pick(true);
          video(URL.createObjectURL(file));
          videoPost(file);
        }
      }
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
      // Xử lý khi có đối tượng được kéo qua input
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
  
      // Lấy file từ sự kiện kéo thả
      const droppedFile = e.dataTransfer.files[0];
  
      // Gọi hàm onChange để xử lý file
      if (droppedFile) {
        const fakeEvent = { target: { files: [droppedFile] } };
        handleVideoChange(fakeEvent);
      }
    };
  
    const openFileInput = () => {
      // inputRef.current.click();
    };
    return (
      <div
      className="flex flex-col justify-start items-center p-4 space-y-5 mt-10 relative"
      style={{
        background: "#212228",
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={openFileInput}
      >
        <h2 style={{ color: "rgba(255, 255, 255, 0.7)" }}>
          {title}
        </h2>
        {videodata && (
          <div
          className="absolute top-0 right-5 text-white cursor-pointer"
          onClick={() =>{
            setVideodata()
            setisPickVideo(false)
            pick(false);
          }}
          >
            <CloseCircleOutlined style={{ height: "20px" }} />
          </div>
        )}
        {isPickVideo ? (
          <div 
          style={{ height: "320px", width: "450px" }} 
          className="flex justify-center items-center"
          >
            {videodata ? (
              <video
              controls
              style={{ 
                height: "320px", 
                width: "auto", 
                maxWidth: "450px" 
              }}
              >
                <source src={videodata} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <ConfigProvider
                theme={{
                  token:{
                    colorPrimary:colors.redGlobal
                  }
                }}
              >
                <Spin />
              </ConfigProvider>
              
            )}
            <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              cursor: "pointer",
            }}
            onClick={() => {}}
            >
              <img src="" alt=""/>
            </div>
          </div>
        ) : (
          <div className="h-[320px] w-[450px] bg-black flex justify-center items-center cursor-pointer"
          onClick={handleButtonClick}
          >
            <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            style={{ display: "none" }}
            onChange={handleVideoChange}
            />
            <img 
            src="/assets/image/pick-image.png" 
            style={{ paddingRight: "10px",height:"80px" }} 
            alt=""
            />
          </div>
        )}
      </div>
    );
  };
  export default UploadVideo;