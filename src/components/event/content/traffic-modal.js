import colors from "@constants/colors";
import { Image, Tag } from "antd";
import { convertISOToDateTime } from "@utils/format-date";
import CustomPopover from "@common/popver/popver";
const TrafficModal = ({ data }) => {
  const Item = ({ label, value }) => {
    return (
      <div className="flex">
        <p className="w-[100px] font-semibold">{label}:</p>
        {(() => {
          if (label === "Nhóm") {
            // eslint-disable-next-line no-lone-blocks
            return (
              <>
              <CustomPopover
                data={value}
                profile={value?.map((profile, profileIndex) => (
                   <Tag
                   key={profileIndex}
                   className="w-max"
                   color={colors.background_event}
                   style={{
                    color: colors.textBase,
                    padding: 4,
                    background: colors.background_tag,
                    borderColor: colors.background_tag,
                   }}
                   >
                     <p className="truncate">{profile}</p>
                   </Tag>
                 ))}
                 profileElements={value?.map(
                  (profile, profileIndex) => {
                    if (profileIndex < 2){
                      return (
                        <Tag
                        key={profileIndex}
                        className="w-max"
                        color={colors.background_event}
                        style={{
                          color: colors.textBase,
                          padding: 4,
                          background: colors.background_tag,
                          borderColor: colors.background_tag,
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          width: "120px",
                        }}
                        >
                          <p className="truncate">{profile}</p>
                        </Tag>
                    )}
                 })}
                >
                </CustomPopover>
              </>
            );
          } else if (label === "Trạng thái") {
            return (
              <Tag
                className="px-2"
                style={{
                  color: colors.textBase,
                  background: colors.redGlobal,
                  borderColor: colors.redGlobal,
                }}
              >
                Xuất hiện
              </Tag>
            );
          } else {
            return <p>{value}</p>;
          }
        })()}
      </div>
    );
  };
  return (
    <div
      style={{ borderBottom: `1px solid ${colors.textBase}` }}
      className="min-h-[320px]"
    >
      <div className="grid grid-cols-3 h-[300px] gap-1 p-2">
        <div className="col-span-2 flex justify-center items-center">
          <Image
            alt="img-full"
            src={data?.image}
            className="w-auto h-[300px] flex-shrink-0"
          />
        </div>
        <div className="col-span-1 flex justify-center items-center flex-col space-y-1">
          <Image
            alt="img-full"
            src={data?.crop_image}
            className="w-auto max-h-[180px] flex-shrink-0"
          />
        </div>
      </div>
      <div
        className="w-full h-[0.5px] my-2"
        style={{ background: colors.textBase }}
      ></div>
      <div className="grid grid-cols-2 p-2">
        <div className="col-span-1 space-y-3">
          <Item label="Tên" value={data.soCmt} />
          <Item label="Nhóm" value={data.profile_list} />
        </div>
        <div className="col-span-1 space-y-3">
          <Item label="Trạng thái" value={"Xuất hiện"} />
          <Item label="Vị trí" value={data?.camera_model?.camera_name} />
          <Item
            label="Thời gian"
            value={convertISOToDateTime(data.thoiGianXuatHien)}
          />
        </div>
      </div>
    </div>
  );
};
export default TrafficModal;
