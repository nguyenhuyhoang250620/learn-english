import axios from 'axios';
import { useEffect } from 'react';
import { domain } from '@redux/services/api-service';
import { SERVICE_PATHS } from '@constants/paths';
const SocketCount = ({loadDataCount}) => {
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
			const dataEvent = JSON.parse(event.data);
			if (dataEvent.event === 'cctv_add_warning') {
				loadDataCount();
			}
		};

		socket.onclose = () => {
			console.log('Socket mất kết nối . Tự động kết nối lại sau 1 giây');
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
	}, []);
	return <></>;
};

export default SocketCount;
