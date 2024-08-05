import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import TYPE_ACTION from '@constants/type-action';
import { notification } from 'antd';
import { baseURL, domain } from '@redux/services/api-service';
import { SERVICE_PATHS } from '@constants/paths';
import { formatDate } from '@utils/format-date';
import colors from '@constants/colors';
import { useTranslation } from 'react-i18next';
import waringaudio from '@assets/audios/notifi.mp3';
import useQueue from 'react-use-queue';
const SocketNotification = () => {
	// -----Dispatch
	const dispatch = useDispatch();
	const audioPlay = new Audio(waringaudio);
	const {t} = useTranslation();
	const [data, setData] = useState();

	const Queue = useQueue();
	const [jobResults, setJobResults] = useState([]);
	const [text, setText] = useState();

	// ----Selectors
	const [api, contextHolder] = notification.useNotification();

	const openNotification = (placement, dataEvent) => {
		// Window.responsiveVoice.speak(`Phát hiện đối tượng ${dataEvent.soCmt} tại ${dataEvent?.camera_model.camera_name}`, "Vietnamese Male", {rate: 1});
		audioPlay.play();
		api.open({
			key: dataEvent.id,
			icon: <div style={{height: '70px', width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'start', marginRight: '10px'}}>
				<img
					style={{height: 'auto', width: '70px', maxHeight: '70px'}}
					src={`${baseURL}${dataEvent?.crop_image}`}
					alt=''
				/>
			</div>,
			description: (<div style={{display: 'flex'}}>
				<div style={{width: '50px'}}></div>
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: '5px'}}>
					<span style={{color: `${colors.textBase}`}}>
						{`${t('name')} : ${dataEvent?.soCmt}`}
					</span>
					<span style={{color: `${colors.textBase}`}}>
						{`${t('time')} : ${formatDate(dataEvent?.thoiGianXuatHien)}`}
					</span>
					<span style={{color: `${colors.textBase}`}}>
						{`${t('camera')} : ${dataEvent?.camera_model.camera_name}`}
					</span>
				</div>
			</div>),
			closeIcon: <div></div>,
			style: {background: colors.background_event, border: `1px solid ${colors.borderColor}`},
			duration: 3,
			placement,
		});
		dispatch({
			type: TYPE_ACTION.PROFILE.GET_PROFILE,
			payload: {},
		});
	};

	const getJob = useCallback(
		value => () =>
			new Promise(res => {
				setTimeout(() => {
					openNotification('bottomLeft', value);
					res();
				}, 1000);
			}),
		[],
	);

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
		let socketNoti = new WebSocket(
			`ws://${domain}${SERVICE_PATHS.SOCKET.CONNECT_SOCKET}`,
		);
		// Xử lý sự kiện khi kết nối WebSocket được mở
		socketNoti.onopen = () => {
			console.log('Kết nối đã được mở');
		};

		// Xử lý sự kiện khi kết nối WebSocket nhận được tin nhắn
		socketNoti.onmessage = event => {
			const dataEvent = JSON.parse(event.data);
			const eventData = dataEvent.data;
			if (dataEvent.event === 'cctv_add_warning') {
				console.log('vaokhong');
				Queue.addJob(getJob(eventData));
			}
			// Dispatch({
			//   type: TYPE_ACTION.SOCKET.GET_SOCKET,
			//   payload: JSON.parse(event.data),
			// });
		};

		socketNoti.onclose = () => {
			console.log('Socket mất kết nối . Tự động kết nối lại sau 1 giây');
			setTimeout(() => {
				socketNoti = new WebSocket(
					`ws://${domain}${SERVICE_PATHS.SOCKET.CONNECT_SOCKET}`,
				);
			}, 3000);
		};

		// Giải phóng kết nối WebSocket khi thành phần bị huỷ
		return () => {
			socketNoti.close();
		};
	}, []);

	return <>{contextHolder}</>;
};

export default SocketNotification;
