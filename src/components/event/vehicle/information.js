import Item from "@common/item/item";
const InforVehicle = ({ data }) => {
  const minWidth = "150px";
  const fontWeight = 900;
  return (
    <div className="flex space-x-8">
      <img alt="avt" src={data.imageCrop} />
      <div className="space-y-3">
        <Item 
          title="Chủ xe" 
          content="Nguyễn Văn A" 
          minWidth={minWidth} 
          fontWeight={fontWeight}
        />
        <Item
          title="Số CCCD chủ xe"
          content="0123413212313"
          minWidth={minWidth}
          fontWeight={fontWeight}
        />
        <Item
          title="Địa chỉ chủ xe"
          content="Tây Hồ, Hà Nội"
          minWidth={minWidth}
          fontWeight={fontWeight}
        />
        <Item title="Biển số" content="AB11111" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Số đăng ký xe" content="1222121212" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Ngày cấp" content="12/03/2020" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Nơi cấp" content="Hà Nội" minWidth={minWidth} fontWeight={fontWeight}/>
      </div>
      <div className="space-y-3">
        <Item title="Hãng xe" content="Vinfat" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Loại xe" content="ô tô" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Màu sắc" content="Trắng" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Số máy" content="1234" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Năm sản xuất" content="2020" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Loại biển xe" content="Biển vàng" minWidth={minWidth} fontWeight={fontWeight}/>
      </div>
    </div>
  );
};
export default InforVehicle;
