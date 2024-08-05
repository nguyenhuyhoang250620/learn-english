import { DownOutlined } from "@ant-design/icons";
import { Tree, ConfigProvider } from "antd";
import colors from "@constants/colors";
import Search from "@common/search/custom-search";
import { FaFile } from "react-icons/fa";
import { imagesGroup } from "@common/images/image";
const listFake = Array(20).fill(null);
const treeData = [];
listFake.map((item, index) => {
  treeData.push({
    title: <div className="flex items-center space-x-1">
      <img src={imagesGroup.camera_connected} alt="camera-connect"/>
      <p>{`rtsp://27.72.111.233:554/${index}`}</p>
    </div>,
    key: index,
  });
});

const TreeGroup = () => {
  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };
  return (
    <div>
      <Search />
      <div
        style={{
          maxHeight: "40vh",
          width: "100%",
        }}
        className="overflow-auto scroll_default"
      >
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: "rgba(16, 16, 22, 0)",
              controlItemBgActive: colors.transparent,
              lineHeight: 2,
              colorText: colors.textBase,
              colorPrimary: colors.redGlobal,
              colorBorder: colors.textPlaceholder,
              paddingXS: 20,
            },
          }}
        >
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={["0-0-0"]}
            onSelect={onSelect}
            treeData={treeData}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};
export default TreeGroup;
