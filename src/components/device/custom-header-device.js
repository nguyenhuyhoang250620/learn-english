import Search from "@common/search/custom-search";
import { MdDelete } from "react-icons/md";
import { FaFileExport } from "react-icons/fa6";
import { IoMdRefreshCircle, IoIosCreate } from "react-icons/io";
import { BiSolidFileImport } from "react-icons/bi";
import colors from "@constants/colors";
const CustomHeaderDevice = ({ isShowSearch = true }) => {
  const listAction = [
    {
      id: "delete",
      name: "Xoá",
      icon: <MdDelete style={{ color: colors.textBase, fontSize: "22px" }} />,
    },
    {
      id: "import",
      name: "Nhập",
      icon: (
        <BiSolidFileImport
          style={{ color: colors.textBase, fontSize: "22px" }}
        />
      ),
    },
    {
      id: "export",
      name: "Xuất",
      icon: (
        <FaFileExport style={{ color: colors.textBase, fontSize: "22px" }} />
      ),
    },
    {
      id: "refresh",
      name: "Làm mới",
      icon: (
        <IoMdRefreshCircle
          style={{ color: colors.textBase, fontSize: "22px" }}
        />
      ),
    },
    {
      id: "handmade",
      name: "Nhập thủ công",
      icon: (
        <IoIosCreate style={{ color: colors.textBase, fontSize: "22px" }} />
      ),
    },
  ];
  return (
    <div className="h-[70px] w-full flex items-center justify-between">
      <div className="w-[250px]">{isShowSearch && <Search />}</div>
      <div className="flex items-center space-x-3">
        {listAction.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center space-x-2 py-2 px-4 cursor-pointer"
              style={{
                border: `1px solid ${colors.borderColor}`,
              }}
            >
              {item.icon}
              <p className="text-base" style={{ color: colors.textBase }}>
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CustomHeaderDevice;
