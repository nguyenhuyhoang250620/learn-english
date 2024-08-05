import { Empty } from "antd";
const CustomEmpty = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Empty
        imageStyle={{
          height: 100,
        }}
        description={
          <span>
            Không có dữ liệu
          </span>
        }
      />
    </div>
  );
};
export default CustomEmpty;
