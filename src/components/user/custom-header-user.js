import Search from "@common/search/custom-search";
import { IoIosCreate } from "react-icons/io";
import colors from "@constants/colors";
const CustomHeaderUser = ({onClick}) => {
  const listAction = [
    {
      id: "handmade",
      name: "Thêm",
      icon: (
        <IoIosCreate style={{ color: colors.textBase, fontSize: "22px" }} />
      ),
    },
  ];
  return (
    <div className="h-[70px] w-full bg-light-700 flex items-center justify-between">
      <div className="w-[250px]">
        <Search />
      </div>
      <div className="flex items-center space-x-3">
        {listAction.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center space-x-2 py-2 px-4 cursor-pointer"
              style={{
                border: `1px solid ${colors.borderColor}`,
              }}
              onClick={onClick}
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
export default CustomHeaderUser;
