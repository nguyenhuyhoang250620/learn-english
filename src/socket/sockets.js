import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import audio from '@assets/audios/ting.mp3';
import { selectNotification } from '@redux/slice/socket-slice';
import { domain } from '@redux/services/api-service';
import { SERVICE_PATHS } from '@constants/paths';

const Socket = ({loadData}) => {
	// -----Dispatch
	const dispatch = useDispatch();
	const audioPlay = new Audio(audio);
	// ----Selectors
	const [api, contextHolder] = notification.useNotification();
	const notificationRedux = useSelector(selectNotification);

	useEffect(() => {
		if (!('Notification' in window)) {
			console.log('Trình duyệt không hỗ trợ thông báo.');
		} else {
			Notification.requestPermission();
		}

		// Tạo kết nối HTTP đến máy chủ của bạn
		const httpClient = axios.create({
			baseURL: `ws://${domain}${SERVICE_PATHS.SOCKET.CONNECT_SOCKET}`,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		// Chuyển đổi kết nối HTTP thành kết nối WebSocket
		let socket = new WebSocket(
			`ws://${domain}${SERVICE_PATHS.SOCKET.CONNECT_SOCKET}`,
		);
		// Xử lý sự kiện khi kết nối WebSocket được mở
		socket.onopen = () => {
			console.log('Kết nối đã được mở');
		};

		// Xử lý sự kiện khi kết nối WebSocket nhận được tin nhắn
		socket.onmessage = event => {
			console.log(event);
			loadData();
		};

		socket.onclose = () => {
			console.log('Socket mất kết nối ');
			setTimeout(() => {
				socket = new WebSocket(
					`ws://${domain}${SERVICE_PATHS.SOCKET.CONNECT_SOCKET}`,
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
