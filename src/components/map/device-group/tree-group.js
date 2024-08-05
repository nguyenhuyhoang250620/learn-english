import { ConfigProvider, Tree } from "antd";
import dataFake from "./data-group.json";
import colors from "@constants/colors";
const TreeGroupDevice = () => {
  return (
    <div className="h-[86vh] overflow-auto scroll_default">
      <ConfigProvider theme={{
        token: {
          colorText: colors.textBase,
          colorBorder: colors.borderColor,
          colorPrimary:colors.background
        },
      }}>
        <Tree showLine={true} showIcon={true} treeData={dataFake} />
      </ConfigProvider>
    </div>
  );
};
export default TreeGroupDevice;
