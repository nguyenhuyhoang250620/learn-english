export const convertISOToDateTime = (isoDateTime) => {
  const date = new Date(isoDateTime);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};

export const getDateTimeToday = () => {
  const today = new Date(); // Tạo đối tượng Date đại diện cho ngày hôm nay
  const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const dayOfWeek = daysOfWeek[today.getDay()];

  const dayOfMonth = today.getDate(); // Lấy ngày trong tháng hiện tại
  const month = today.getMonth() + 1; // Lấy tháng (lưu ý rằng tháng bắt đầu từ 0, nên cần cộng thêm 1)
  const year = today.getFullYear(); // Lấy năm hiện tại
  return `${dayOfWeek},${dayOfMonth}/${month}/${year}`
}

export const formatDataOnlyTime = (time) => {
  const originalTimeString = time;
  const parts = originalTimeString.split(":");
  const hours = parts[0].padStart(2, '0');
  const minutes = parts[1].padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;
  return formattedTime
}