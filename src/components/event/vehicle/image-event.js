import colors from "@constants/colors";
import { Image } from "antd";
import Item from "@common/item/item";
import { convertISOToDateTime } from "@utils/format-date";
const ImageEvent = ({ data }) => {
  return (
    <div className="flex justify-center items-center w-full ">
      <div
        className="flex flex-col w-[20%]  h-[396px] p-2 space-y-3"
        style={{ border: `1px solid ${colors.borderColor}` }}
      >
        <p style={{ color: colors.textBase }} className="font-bold">
          Thông tin chi tiết sự kiện
        </p>
        <Item title="Têm" content={data.soCmt} />
        <Item title="Thời gian" content={convertISOToDateTime(data.thoiGianXuatHien)} />
      </div>
      <div
        className="flex justify-center items-center w-[60%]"
        style={{ border: `1px solid ${colors.borderColor}` }}
      >
        <Image
          alt="img-full"
          src={data?.image}
          className="w-auto h-[300px] flex-shrink-0"
        />
      </div>
      <div className="flex justify-center items-center flex-col w-[20%]  h-[395px]">
        <div
          style={{ border: `1px solid ${colors.borderColor}` }}
          className="h-[180px] w-[180px] flex-shrink-0 flex justify-center items-center"
        >
          <Image
            alt="img-full"
            src={data?.crop_image}
            className="w-auto max-h-[180px]"
          />
        </div>
      </div>
    </div>
  );
};
export default ImageEvent;
