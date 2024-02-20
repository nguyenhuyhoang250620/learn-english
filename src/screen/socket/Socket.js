import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TYPE_ACTION from "../../constants/TypeAction";
import { Button, notification, Space } from "antd";
import audio from "../../assets/audios/ting.mp3";
import { selectNotification } from "../../redux/slice/SocketSlice";
import { baseURL, domain } from "../../services/ConfigService/ApiService";
import { SERVICE_PATHS } from "../../constants/paths";
import { formatDate } from "../../common/Functions/FomatDate";

const Socket = ({ loadData }) => {
  //-----Dispatch
  const dispatch = useDispatch();
  const audioPlay = new Audio(audio);
  //----Selectors
  const [api, contextHolder] = notification.useNotification();
  const notificationRedux = useSelector(selectNotification);
  const openNotificationWithIcon = (type, event) => {
    if (notificationRedux == true) {
      // audioPlay.play();
    }
    const dataEvent = JSON.parse(event);

    if (document.visibilityState === "hidden") {
      // Hiển thị thông báo
      const notificationOptions = {
        body: `Mã hồ sơ : ${dataEvent?.data?.soCmt}`,
        icon: `${baseURL}${dataEvent?.data?.image}`,
        dir: "ltr",
      };
      const notification = new Notification("Thông báo sự kiện mới.", notificationOptions);
      notification.onclick = () => {
        window.open("http://localhost:3000/event");
      };
    }
  };
  useEffect(() => {
   
    if (!("Notification" in window)) {
      console.log("Trình duyệt không hỗ trợ thông báo.");
    } else {
      Notification.requestPermission();
    }

    // Tạo kết nối HTTP đến máy chủ của bạn
    const httpClient = axios.create({
      baseURL: `ws://${domain}${SERVICE_PATHS.SOCKET.CONNECT_SOCKET}`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Chuyển đổi kết nối HTTP thành kết nối WebSocket
    let socket = new WebSocket(
      `ws://${domain}${SERVICE_PATHS.SOCKET.CONNECT_SOCKET}`
    );
        // Xử lý sự kiện khi kết nối WebSocket được mở
    socket.onopen = () => {
      console.log("Kết nối đã được mở");
    };

    // Xử lý sự kiện khi kết nối WebSocket nhận được tin nhắn
    socket.onmessage = (event) => {
      openNotificationWithIcon("info", event.data);
      dispatch({
        type: TYPE_ACTION.SOCKET.GET_SOCKET,
        payload: JSON.parse(event.data),
      });
      loadData();
    };

    socket.onclose = () => {
      console.log("Socket mất kết nối . Tự động kết nối lại sau 1 giây");
      setTimeout(() => {
        socket = new WebSocket(
          `ws://${domain}${SERVICE_PATHS.SOCKET.CONNECT_SOCKET}`
        );
      }, 1000);
    };
    // Giải phóng kết nối WebSocket khi thành phần bị huỷ
    return () => {
      socket.close();
    };

  
  }, [notificationRedux]);

  return <>{contextHolder}</>;
};
export default Socket;
