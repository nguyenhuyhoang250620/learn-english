import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        event_management: 'Event Management',
        identity_object_managements: 'Identity Object Managements',
        person: 'Person',
        vehicle: 'Vehicle',
        group: 'Group',
        notification:"Notification",
        search:"Search",
        name:"Name",
        license_plate:"License Plate",
        time:"Time",
        camera:"Camera",
        appear:"Appear",
        cancel:"Cancel",
        event:"Event",
        error_img:"Can't load image",
        status:"Status",
        type:"Type",
        brand:"Brand",
        color:"Color",
        username:"Username",
        all:"All",
        face_recognition:"Face Recognition",
        vehicle_recognition:"Vehicle Recognition",
        face_vehicle_access:"Face & Vehicle - Access control",
        crowd_detection:"Crowd Detection",
        ai_flows:"AI Flows",
        from:"From",
        to:"To",
        image:"Image",
        action:"Action",
        info:"Info",
        edit:"Edit",
        person_list:"Person List",
        add:"Add",
        photo:"Photo",
        no_photo:"No photo",
        group_name:"Group name",
        date_of_birth:"Date of Birth",
        gender:"Gender",
        permanent_resident:"Permanent Resident",
        phone_number:"Phone Number",
        male:"Male",
        female:"Female",
        other:"Other",
        save:"Save",
        back:"Back",
        vehicle_list:"Vehicle List",
        delete:"Delete",
        new_profile:"New Profile",
        identity_object_list:"Identity Object List",
        description:"Description",
        group_list:"Group List ",
        object:"Object",
        crowd:"Crowd",
        object_quantity:"Object Quantity",
        license_plate_type:"License Plate Type",
        goverment_agencies:"Goverment Agencies",
        military:"Military",
        service:"Service",
        diplomatic:"Diplomatic",
        dashboard:"Dashboard",
        place_of_origin:"Place of origin",
        nationality:"Nationality",
        misshapen:"Misshapen",
        permanent_resident:"Permanent Resident",
        profile:"Profile",
        update_your_photo:"Update your photo and personal details",
        update:"Update",
        owner:"Owner",
        confirm_delete:"Confirm delete",
        ok:"Ok",
        agree_to_delete_this_list:"Agree to delete this list?",
        this_field_is_required:"This field is required",
        email_format_is_not_correct:"Email format is not correct!",
        delete_profile:"Delete profile",
        no_data:"No data",
        red:"Red",
        green:"Green",
        blue:"Blue",
        black:"Black",
        orange:"Orange",
        yellow:"Yellow",
        white:"White",
        bike:"Bike",
        motor:"Motor",
        car:"Car",
        truck:"Truck",
        bus:"Bus",
        similarity_Face_List:"Similarity Face List",
        identity_face_list:"Identity Face List",
        view_all:"View all",
        object_information:"Object Information",
        identity_history:"Identity History"
      },
    },
    vn: {
      translation: {
        event_management: 'Quản lý sự kiện',
        identity_object_managements: 'Quản lý đối tượng',
        person: 'Người',
        vehicle: 'Phương tiện',
        group: 'Nhóm',
        notification:"Thông báo",
        search:"Tìm kiếm",
        name:"Tên",
        license_plate:"BSX",
        time:"Thời gian",
        camera:"Vị trí",
        appear:"Xuất hiện",
        cancel:"Thoát",
        event:"Sự kiện",
        error_img:"Không thể hiện ảnh",
        status:"Trạng thái",
        type:"Loại",
        brand:"Nhãn hiệu",
        color:"Màu sắc",
        username:"Định danh",
        all:"Tất cả",
        face_recognition:"Nhận dạng khuôn mặt",
        vehicle_recognition:"Nhận dạng phương tiện",
        face_vehicle_access:"Kiểm soát ra vào",
        crowd_detection:"Phát hiện đám đông",
        ai_flows:"Bài toán AI",
        from:"Từ",
        to:"Đến",
        image:"Hình ảnh",
        action:"Hoạt động",
        info:"Thông tin",
        edit:"Chỉnh sửa",
        person_list:"Danh sách người",
        add:"Thêm",
        photo:"Có ảnh",
        no_photo:"Không có ảnh",
        group_name:"Tên nhóm",
        date_of_birth:"Ngày sinh",
        gender:"Giới tính",
        permanent_resident:"Thường trú",
        phone_number:"Số điện thoại",
        male:"Nam",
        female:"Nữ",
        other:"Khác",
        save:"Lưu",
        back:"Quay lại",
        vehicle_list:"Danh sách phương tiện",
        delete:"Xoá",
        new_profile:"Thêm hồ sơ mới ",
        identity_object_list:"Danh sách đối tượng",
        description:"Mô tả",
        group_list:"Danh sách nhóm",
        object:"Đối tượng",
        crowd:"Đám đông",
        object_quantity:"Số lượng",
        license_plate_type :"Loại biển số",
        goverment_agencies:"Cơ quan chính phủ",
        military:"Quân đội",
        service:"Dịch vụ",
        diplomatic:"Ngoại giao",
        dashboard:"Thống kê",
        place_of_origin:"Quê quán",
        nationality:"Quốc tịch",
        misshapen:"Đặc điểm nhận dạng",
        permanent_resident:"Nội trú",
        profile:"Hồ sơ",
        update_your_photo:"Cập nhật ảnh và thông tin cá nhân của bạn",
        update:"Cập nhật",
        owner:"Chủ sở hữu",
        confirm_delete:"Xác nhận xoá",
        ok:"Xác nhận",
        agree_to_delete_this_list:"Đồng ý xóa danh sách này",
        this_field_is_required:"Trường này là bắt buộc",
        email_format_is_not_correct:"Chưa đúng định dạng Email",
        delete_profile:"Xoá hồ sơ",
        no_data:"Không có dữ liệu",
        red:"Đỏ",
        green:"Xanh lá",
        blue:"Xanh dương",
        black:"Đen",
        orange:"Cam",
        yellow:"Vàng",
        white:"Trắng",
        bike:"Xe đạp",
        motor:"Xe máy",
        car:"Ô tô",
        truck:"Xe tải",
        bus:"Xe bus",
        similarity_Face_List:"Danh sách khuôn mặt giống nhau",
        identity_face_list:"Danh sách khuôn mặt nhận dạng",
        view_all:"Xem tất cả",
        object_information:"Thông tin đối tượng",
        identity_history:"Lịch sử nhận dạng"
      },
    },
  },
});

export default i18n;