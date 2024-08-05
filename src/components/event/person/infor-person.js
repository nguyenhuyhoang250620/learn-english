import Item from "@common/item/item";
const InforPerson = ({ data }) => {
  const minWidth = "150px";
  const fontWeight = 900;
  return (
    <div className="flex space-x-8">
      <img alt="avt" src={data.imageCrop} />
      <div className="space-y-3">
        <Item 
          title="Tên trên giấy tờ" 
          content="Nguyễn Văn A" 
          minWidth={minWidth} 
          fontWeight={fontWeight}
        />
        <Item
          title="ngày sinh"
          content="12/12/1964"
          minWidth={minWidth}
          fontWeight={fontWeight}
        />
        <Item
          title="Giới tính"
          content="Nam"
          minWidth={minWidth}
          fontWeight={fontWeight}
        />
        <Item title="số điện thoại" content="13511111" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="email" content="1222@gmail.com" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Nghề nghiệp" content="grap" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Mạng xã hội" content="fb/vanA.com" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Ghi chú" content="13511111" minWidth={minWidth} fontWeight={fontWeight}/>
      </div>
      <div className="space-y-3">
        <Item
          title="Quốc tịch"
          content="Việt Nam"
          minWidth={minWidth}
          fontWeight={fontWeight}
        />
        <Item title="Mã số thuế" content="135111111235" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Mã số BHXH" content="12312C12312" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Loại giấy tờ" content="CCCD" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Số giấy tờ" content="2020" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Ngày cấp" content="17/03/2012" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Nơi cấp" content="Hà Nội" minWidth={minWidth} fontWeight={fontWeight}/>
      </div>
      <div className="space-y-3">
        <Item title="Địa chỉ" content="Thanh Xuân,Hà Nội" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Quốc gia" content="Việt Nam" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Tỉnh/Thành phố" content="Hà Nội" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Quận/Huyện" content="Thanh Xuân" minWidth={minWidth} fontWeight={fontWeight}/>
        <Item title="Phường/Xã" content="Khâm Thiên" minWidth={minWidth} fontWeight={fontWeight}/>
      </div>
    </div>
  );
};
export default InforPerson;