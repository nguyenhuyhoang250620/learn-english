import {
  DownOutlined
} from "@ant-design/icons";
import { ConfigProvider, Tooltip, Tree } from "antd";
import colors from "@constants/colors";
import { imagesGroup } from "@common/images/image";
import { useDrag } from "react-dnd";
import { useMemo } from "react";
const { DirectoryTree } = Tree;
const onSelect = (keys, info) => {};
const onExpand = (keys, info) => {};

const CameraSingle = ({ node }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "GET",
    item: { type: "single", url: node.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !node.status,
  }));
  return (
    <div className="flex" key={node.key} ref={drag}>
      <img
        style={{ marginRight: "5px" }}
        src={
          !node.status
            ? imagesGroup.camera_connected
            : imagesGroup.camera_disconnected
        }
        alt=""
      />
      <span
        className="truncate w-[150px]"
        style={{
          color: `${!node.status ? colors.textBase : colors.redGlobal}`,
        }}
      >
        {node.title}
      </span>
    </div>
  );
};

const CameraGroup = ({ node }) => {
  return (
    <div className="flex" key={node.key}>
      <p className="truncate w-[160px]" style={{ color: colors.textBase }}>
        {node.title}
      </p>
    </div>
  );
};

const CustomTree = () => {
  const memoizedTitleRender = useMemo(() => {
    return (node) => {
      // Kiểm tra xem mục có con hay không
      const hasChildren = node.children && node.children.length >= 0;
      if (hasChildren) {
        return <CameraGroup key={node.key} node={node} />;
      } else {
        return <CameraSingle key={node.key} node={node} />;
      }
    };
  }, []);

  return (
    <div className="h-[86vh] overflow-auto scroll_default">
      <ConfigProvider
        theme={{
          token: {
            colorText: colors.textBase,
            colorBorder: colors.borderColor,
            colorPrimary: colors.background_form,
          },
        }}
      >
        <DirectoryTree
          multiple
          showLine={true}
          showIcon={false}
          onSelect={onSelect}
          onExpand={onExpand}
          titleRender={memoizedTitleRender}
        />
      </ConfigProvider>
    </div>
  );
};

export default CustomTree;
