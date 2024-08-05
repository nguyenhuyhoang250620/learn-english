import TYPE_ACTION from "@constants/action";
import colors from "@constants/colors";
import { clearDataLocation } from "@redux/slice/map-slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BiScan } from "react-icons/bi";
import Search from "@common/search/custom-search";
import { MdFilterList } from "react-icons/md";

const CustomHeaderSearch = ({ handleScan }) => {
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
      className="flex w-full h-[50px] items-center space-x-2"
      style={{ background: colors.background }}
    >
      {/* <div className="w-[250px]">
        <Search />
      </div> */}
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
      <div
        className="flex items-center space-x-2 py-[10px] px-4 cursor-pointer"
        style={{
          border: `1px solid ${colors.borderColor}`,
        }}
        onClick={handleScan}
      >
        <BiScan style={{ color: colors.textBase, fontSize: "22px" }} />
        <p className="text-base" style={{ color: colors.textBase }}>
          Quét
        </p>
      </div>
    </div>
  );
};
export default CustomHeaderSearch;
