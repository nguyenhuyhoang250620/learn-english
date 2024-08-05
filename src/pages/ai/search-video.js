import CustomButtonCommon from "@common/button/custom-button";
import colors from "@constants/colors";
import { ConfigProvider, Modal, Spin, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import data from "../event/data.json";
import UploadVideo from "@common/upload/upload-video";
import { useDispatch } from "react-redux";

export const domain = window.SystemConfig.REACT_APP_API_Django;
const VideoSearch = () => {
  const dispatch = useDispatch()
  const [img, setimg] = useState(false);
  const [vid, setvid] = useState(false);
  const [senvideo, SetSenvide] = useState("");
  const navigate = useNavigate();
  const [postVideo, setPostVideo] = useState();
  const [postImage, setPostImage] = useState();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    localStorage.setItem("imgz", false);
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const pickVideo = (data) => {
    setvid(data);
  };
  const getDataVideo = (data) => {
    SetSenvide(data);
    localStorage.setItem("video", data);
  };
  const getVideoPost = (data) => {
    setPostVideo(data);
  };
  const goToResultScreen = async () => {
    if(postVideo){
      showModal();
      const formData = new FormData();
      formData.append("video", postVideo);
      formData.append("image", postImage);
      const responsove =   await axios.post(`http://${domain}/ekyc/video_face_scan`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
          },
        })
      localStorage.setItem('request_id',responsove.data.request_id)
      formData.append("image", data.id);
    }
    else{
      message.warning(('require_image'))
    }
  };
  return (
    <div className="w-full h-full flex flex-col">
      <ConfigProvider theme={{
        token:{
          padding:0,
          colorPrimary:colors.redGlobal,
          paddingContentHorizontalLG:0,
          paddingContentHorizontal:0,
          paddingContentHorizontalSM:0,
          paddingContentVertical:0,
          paddingContentVerticalLG:0,
          paddingContentVerticalSM:0,
          paddingLG:0,
          paddingMD:0,
          paddingSM:0,
          paddingXL:0,
          paddingXS:0,
          paddingXXS:0
        }
      }}>
        <Modal
          title=""
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
          closable={false}
          footer={[]}
          width="15%"
        >
          <div className="h-[15vh] w-full bg-black flex flex-col justify-center items-center"
            style={{
              border: `1px solid ${colors.redGlobal}`,
              opacity: 0.9,
            }}
          >
            <span style={{ color: colors.redGlobal, marginBottom: "5px" }}>
              {('Đang lấy dữ liệu')}
            </span>
            <Spin/>
            <div className="loading"></div>
          </div>
        </Modal>
      </ConfigProvider>
      <div className="flex justify-center items-center">
          <UploadVideo
            videoPost={getVideoPost}
            video={getDataVideo}
            title={'TẢI LÊN VIDEO'}
            bottom="Paste image/video link"
            pick={(data) => pickVideo(data)}
            sendSizeVideo={(w,h)=>{
              localStorage.setItem("widthVideo", w);
              localStorage.setItem("HeihtVideo", h);
            }}
          />
        </div>
      <div className="w-full flex justify-center items-center mt-20">
        <CustomButtonCommon
          onClick={()=>{
            showModal()
            }}
          backgroundColor={
            img === true || vid === true ? colors.redGlobal : "#212228"
          }
          height={"40px"} 
          width={"100px"} 
          text={('Tìm Kiếm')}
        />
      </div>
    </div>
  );
};
export default VideoSearch;