import { Avatar, List } from "antd";
import VirtualList from "rc-virtual-list";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { UserOutlined } from "@ant-design/icons";

// Components
import Socket from "../../socket/Socket";

// Slice
import { selectEventData } from "../../../redux/slice/EventSlice";
import { selectCameraData } from "../../../redux/slice/CameraSlice";
import { selectProfileData } from "../../../redux/slice/ProfileSlice";

// Util
import TYPE_ACTION from "../../../constants/TypeAction";
import { baseURL } from "../../../services/ConfigService/ApiService";
// Styles
import styles from "./Styles/index.module.scss";
import Search from "./Search";
import { useTranslation} from 'react-i18next';

const ContainerHeight = 210;


function NotificationThread({filterRef}) {
    const [count, setCount] = useState(2);
    const{t} = useTranslation()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();
    const eventData = useSelector(selectEventData);
    const cameraData = useSelector(selectCameraData);
    const profileData = useSelector(selectProfileData);

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();
        const hour = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");
        const second = date.getSeconds().toString().padStart(2, "0");
        return `${day}/${month}/${year} - ${hour}:${minute}:${second}`;
    }

    const isSuccess = () => {
        setCount(count + 1);
    }


    const loadData = () => {
        dispatch({
            type: TYPE_ACTION.EVENT.GET_PREVIEW,
            payload: {
                body: {
                    page_idx: count,
                    page_size: 12,
                    soCmts: filterRef.current,
                },
                isSuccess,
            },
        });
    }

    const loadDataFirst = () => {
        dispatch({
            type: TYPE_ACTION.EVENT.GET,
            payload: {
                body: {
                    page_idx: 1,
                    page_size: 12,
                    soCmts: filterRef.current,
                },
            },
        });
    };

    const handleClick = (item) => {
        navigate(`/notification/${item.id}`, {state: {info: item}});
    };

    useEffect(() => {
        loadDataFirst();
        dispatch({
            type: TYPE_ACTION.PROFILE.GET_ALL_PROFILE,
            payload: {},
        });
    }, []);

    useEffect(() => {
        if (eventData[0]) {
            handleClick(eventData[0]);
        }
    }, [location.pathname == '/notification', eventData[0]]);

    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop < ContainerHeight + 100) {
            loadData();
        }
    };

    const cameraName = (item) => cameraData.find((camera) => camera?.id === item?.camera_model)?.camera_name;
    const img = (item) => profileData.find((profile) => profile?.soCmt === item?.soCmt)?.image;
   
    return (
        <List>
            <Search filterRef={filterRef} />
            <Socket loadData={loadDataFirst}></Socket>
            <VirtualList
                data={eventData}
                height={ContainerHeight}
                itemHeight={40}
                itemKey="event"
                onScroll={onScroll}
            >
                {(item) => (
                    <List.Item style={{
                        justifyContent: "flex-start",
                        backgroundColor: id == item.id ? "#f5f5f5" : "",
                        border: id == item.id ? "1px solid #4bc0f7" : "unset"
                    }}
                               className={styles.items} key={item?.id}
                               onClick={() => handleClick(item)}>
                        <div className={styles.avatarField}>
                            <Avatar className={styles.avatar} size={60}
                                    src={item.image ? `${baseURL}${img(item)}` : "error"} icon={<UserOutlined/>}/>
                        </div>
                        <div className={styles.textField}>
                            {
                                item.event_type === 'ANPR'?<span>{t('license_plate')}: {item?.soCmt}</span>:<span>{t('username')}: {item?.soCmt}</span>
                            }
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <p style={{fontSize:"13px"}}>{t('time')}: {formatDate(item?.thoiGianXuatHien)}</p>
                                <p style={{fontSize:"13px"}}>{t('camera')}: {item.camera_model?.camera_name}</p>
                            </div>
                        </div>
                    </List.Item>
                )}
            </VirtualList>
        </List>
    );
}

export default NotificationThread;
