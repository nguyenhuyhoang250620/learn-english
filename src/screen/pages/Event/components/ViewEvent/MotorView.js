import { baseURL } from "../../../../../services/ConfigService/ApiService";
import { formatDate } from "../../../../../common/Functions/FomatDate";
import CustomListContent from "./custom_list_content";
import { useTranslation} from 'react-i18next';
import styles from "./ViewEvent.module.scss";
import React,{useState,useEffect} from "react";
import { Image,Empty} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectProfileData } from "../../../../../redux/slice/ProfileSlice";
import TYPE_ACTION from "../../../../../constants/TypeAction";
import { LoadingOutlined } from '@ant-design/icons';
const MotorView = ({data,image_crop,vehicle_name,group}) =>{
    const [groups,setGroups] = useState([])
    const dispatch = useDispatch();
    const profileData = useSelector(selectProfileData);
    const [owner,setOwner] = useState('')


    useEffect(() => {
      const newGroups = [];
      group.forEach((item) => {
        item?.vehicles.forEach((item_user) => {
          if (item_user.number_plate === data.soCmt) {
            newGroups.push(item.name);
          }
        });
      });
      setGroups(newGroups);
      dispatch({
        type: TYPE_ACTION.PROFILE.GET_PROFILE,
        payload: {},
      });
    }, [data.soCmt, group]);

    useEffect(() => {
        setOwner('')
        profileData?.map((item) => {
          if (item.vehicle?.number_plate === data.soCmt) {
            setOwner(item.soCmt);
          }
        });
      }, [data]);
    const {t} =  useTranslation()
    return(
        <div>
            <div className={styles.header_top}>
                <h4 style={{position:"absolute",top:15,left:10,color:"white"}}>{`${t('event')} ${data.id}`}</h4>
                </div>
                <div className={styles.container_image}>
                <div className={styles.car_img}>
                {data?.image ? (
                    <div style={{height:"310px",width:"auto",overflow:"hidden",justifyContent:"center",display:"flex",alignContent:"center"}}>
                        <Image
                            style={{width:"auto",height:"auto",maxHeight:"310px"}}
                            alt="img"
                            src={`${baseURL}${data.image}`}
                        ></Image>
                    </div>
                ) : (
                <Empty description={<h2>{t('error_img')}</h2>}></Empty>
                )}
                </div>
                <div className={styles.human_bsx_image}>
                        <div style={{margin:"5px",border:"1px solid #ccc",height:"150px",width:"180px",overflow:"hidden",justifyContent:"center",display:"flex",alignItems:"center"}}>
                            {
                                image_crop?<Image
                                    style={{ width: "auto",height:"150px",maxHeight:"150px",maxWidth:"180px",objectFit:"contain"}}
                                    alt="img"
                                    src={image_crop}
                                    ></Image>:<LoadingOutlined
                                    style={{
                                    fontSize: 30,
                                    }}
                                    spin
                                />
                            }
                        </div>
                </div>
                </div>
                <div style={{height:"1px",width:"100%",left:0,position:"absolute",background:"black"}}></div>
                <div className={styles.modalWrapper}>
                    <div className={styles.left_option}>
                    <CustomListContent
                        firstElement={<span className={styles.item_text} style={{fontWeight:"bold"}}>{t('license_plate')}:</span>}
                        secondElement={<span className={styles.item_text}>{data.soCmt}</span>}
                        />
                
                <div>
                    {
                    groups.length ?<CustomListContent
                    firstElement={<span className={styles.item_text}>{t('group')}:</span>}
                    secondElement={
                    <div style={{ width:'max-content',maxWidth:"200px",padding:"5px", background: "#b45053", textAlign: "center", borderRadius: "4px", color: "white" }}>
                        {groups.length>0? groups.join(', '):"-"}
                    </div>
                    }
                    />:<CustomListContent
                    firstElement={<span className={styles.item_text}>{t('group')}:</span>}
                    secondElement={
                    <span>
                        {groups.length>0? groups.join(', '):"-"}
                    </span>
                    }
                    />
                    }
                </div>
                {
                    data.event_type == 'ANPR'?
                    <div>
                    <CustomListContent
                        firstElement={<span className={styles.item_text}>{t('owner')}:</span>}
                        secondElement={<span className={styles.item_text}>{owner?owner:'-'}</span>}
                    />
                    </div>:
                    <div>
                    </div>
                }
                {
                    data.event_type == "HUMAN"?<div></div>:<div>
                    <CustomListContent
                    firstElement={<span className={styles.item_text}>{t('type')}:</span>}
                    secondElement={<span className={styles.item_text}>{t(`${vehicle_name?vehicle_name.toLowerCase():'-'}`)}</span>}
                    />
                </div>
                }
                
                </div>
                <div className={styles.right_option}>
                <div>
                <CustomListContent
                    firstElement={<span className={styles.item_text}>{t('status')}:</span>}
                    secondElement={<div style={{width:"72px",background:"#3ea4fb",textAlign:"center",borderRadius:"4px",color:"white"}}>{t('appear')}</div>}
                />
                </div>
                <div>
                <CustomListContent
                    firstElement={<span className={styles.item_text}>{t('camera')}:</span>}
                    secondElement={<span className={styles.item_text}>{data.camera_model?.camera_name}</span>}
                />
                </div>
                <div>
                <CustomListContent
                    firstElement={<span className={styles.item_text}>{t('time')}:</span>}
                    secondElement={<span className={styles.item_text}>{formatDate(data?.thoiGianXuatHien)}</span>}
                />
                </div>
                </div>
                </div>
        </div>
    )
}
export default MotorView