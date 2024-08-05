import TYPE_ACTION from "@constants/action";
import colors from "@constants/colors";
import { clearDataLocation } from "@redux/slice/map-slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BiScan } from "react-icons/bi";
import Search from "@common/search/custom-search";
import { MdFilterList } from "react-icons/md";
import { IoCreate } from "react-icons/io5";

const CustomHeaderEvent = ({ handlCreate,isShowCreate=false }) => {
  const [filter, setFilter] = useState(false);
  const dispatch = useDispatch();
  const handlClickFilter = () => {
    setFilter(!filter);
  };
  useEffect(() => {
    dispatch({
      type: TYPE_ACTION.ACTION.IS_TOGGLE,
      payload: filter,
    });
    if (filter) {
      dispatch(clearDataLocation());
    }
  }, [dispatch, filter]);
  return (
    <div
      className="flex w-full h-[60px] items-center justify-between"
      style={{ background: colors.background }}
    >
      <div className="w-[250px]">
        <Search />
      </div>
      <div className="flex items-center space-x-3">
        <div
          className="flex items-center space-x-2 py-[10px] px-4 cursor-pointer"
          style={{
            border: `1px solid ${colors.borderColor}`,
          }}
          onClick={() => handlClickFilter()}
        >
          <MdFilterList style={{ color: colors.textBase, fontSize: "22px" }} />
          <p className="text-base" style={{ color: colors.textBase }}>
            Bộ lọc
          </p>
        </div>
        {isShowCreate && (
          <div
            className="flex items-center space-x-2 py-[10px] px-4 cursor-pointer"
            style={{
              border: `1px solid ${colors.borderColor}`,
            }}
            onClick={() => handlCreate()}
          >
            <IoCreate style={{ color: colors.textBase, fontSize: "22px" }} />
            <p className="text-base" style={{ color: colors.textBase }}>
              Thêm mới
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default CustomHeaderEvent;
