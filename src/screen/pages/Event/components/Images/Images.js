import { Empty, Pagination } from "antd";
import { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Images.module.scss";
import TYPE_ACTION from "../../../../../constants/TypeAction.js";
import { baseURL } from "../../../../../services/ConfigService/ApiService";
import { formatDate } from "../../../../../common/Functions/FomatDate";
import { selectIsDarkMode } from "../../../../../redux/slice/DarkModeSlice";
import ReactImageAppear from "./ReactImage/ReactImageAppear";
import { useTranslation} from 'react-i18next';
import PageLoader from "../../../../../common/component/PageLoader";




const Images = ({ eventData, filterRef, totalRecord,onChange }) => {
  
  //---- Dispatch
  const dispatch = useDispatch();

  const isDarkMode = useSelector(selectIsDarkMode);

  const { t }  = useTranslation();

  const [data,setData] = useState([])


  //----Functions
  const showModal = (data) => {
    dispatch({
      type:TYPE_ACTION.VIEW_EVENT.GET_COLLAPSE,
      payload:true
    });
    dispatch({
      type:TYPE_ACTION.VIEW_EVENT.GET_VIEW_EVENT,
      payload:data
    });
  };
  useEffect(()=>{
      setData(eventData)
  },[eventData])


  
  const color = isDarkMode ? "#DADADA" : "black";
  return (
    Array.isArray(eventData)&&eventData.length>0 ? 
    <>
      <div className={styles.container}>
        {
          eventData.map((index) => {
            return (
              <div
                className={styles.wrapper}
                key={index.id}
                onClick={() => showModal(index)}
              >
                { 
                  <div
                    style={{display:"flex",flexDirection:"column",alignItems:"center",height:"250px",width:"100%",paddingLeft:"5px",paddingRight:"5px"}}
                  >
                    <ReactImageAppear
                    src={`${baseURL}${index.crop_image}`}
                    className={styles.image}
                    />
                  </div>
                }
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {(() => {
                      switch (index.event_type) {
                        case 'HUMAN':
                          return (
                            <span
                              className={styles.title}
                              style={{ color: `${color}`, fontWeight: "600" }}
                            >
                              {`${t('name')} : ${index.user?.hoVaTen?index.user.hoVaTen:index.soCmt}`}
                            </span>
                          );
                          case 'CROWD':
                          return (
                            <span
                              className={styles.title}
                              style={{ color: `${color}`, fontWeight: "600" }}
                            >
                              {`${t('crowd')} : ${index.soCmt}`}
                            </span>
                          );
                        default:
                          return (
                            <span
                              className={styles.title}
                              style={{ color: `${color}`, fontWeight: "600" }}
                            >
                              {`${t('license_plate')}: ${index.soCmt}`}
                            </span>
                          );
                      }
                    })()}
                </div>
                <span className={styles.title} style={{ color: `${color}` }}>
                {`${t('time')} : ${formatDate(index.thoiGianXuatHien)}`}
                 
                </span>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span className={styles.title} style={{ color: `${color}` }}>
                    {`${t('camera')} : ${index.camera_model.camera_name}`}   
                  </span>               
                {
                    (() => {
                      try {
                        const metadata = JSON.parse(index.metadata);
                        return metadata.cameraCheckInApply ? (
                          <div className={styles.status} style={{ background: "#20a321" }}>
                            <span>Checkin</span>
                          </div>
                        ) : metadata.cameraCheckOutApply ? (
                          <div className={styles.status} style={{ background: "#a90c2c" }}>
                            <span>Checkout</span>
                          </div>
                        ) : (
                          <div className={styles.status}>
                            <span>{t('appear')}</span>
                          </div>
                        );
                      } catch (error) {
                        // Xử lý lỗi tại đây (nếu cần)
                        return (
                          <div className={styles.status}>
                            <span>Lỗi dữ liệu</span>
                          </div>
                        );
                      }
                    })()
                  }
                </div>
              </div>
            );
          })
        }
      </div>
      <div className={styles.pagination}>
        <Pagination
          showQuickJumper
          pageSize={filterRef.current.page_size}
          total={totalRecord}
          onChange={onChange}
          showSizeChanger= {false}
          // pageSizeOptions={["8", "12", "16", "20"]}
          defaultCurren={1}
        />
      </div>
    </> :(<Empty
      description={t('no_data')}
    ></Empty> )
  );
};



export default Images;
