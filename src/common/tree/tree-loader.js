import { ConfigProvider, Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import TYPE_ACTION from "@constants/action";
import colors from "@constants/colors";

const CustomTreeLoad = ({
  initTreeData,
  onSelect,
  data = [],
  titleRender,
  showIcon = true,
}) => {
  const [treeData, setTreeData] = useState(initTreeData);

  const [loadData, setLoadData] = useState(false);
  const dispatch = useDispatch();
  const filterLocationCameraRef = useRef({
    iaddress_ids: null,
    district_ids: null,
    ids: null,
    ips: null,
    page_index: 0,
    page_size: 100,
    province_ids: null,
    status: null,
  });

  useEffect(() => {
    setTreeData(initTreeData);
  }, [initTreeData]);
  const recursiveUpdateData = async (dataTree, keyToFind, TYPE, level = 1) => {
    const updatedDataTree = await Promise.all(
      dataTree.map(async (node) => {
        if (node.key === keyToFind && !node.loaded) {
          const data = await new Promise((resolve) => {
            const callBack = (data) => {
              resolve(data);
            };
            dispatch({
              type: TYPE,
              payload: { body: node.id, callBack },
            });
          });
          const updatedChildren = data.map((e, i) => ({
            title: e.name,
            key: `${node.key}-${i}`,
            id: e.id,
            children: [],
          }));
          return {
            ...node,
            children: updatedChildren,
            loaded: true,
          };
        } 
        else if (node.children && node.children.length > 0) {
          if (level < 2) {
            await Promise.all(
              node.children.map(async (node) => {
                if (node.key === keyToFind && !node.loaded) {
                  const data = await new Promise((resolve) => {
                    const callBack = (data) => {
                      resolve(data);
                    };
                    dispatch({
                      type: TYPE_ACTION.LIVE.GET_WARD_LIVE,
                      payload: { body: node.id, callBack },
                    });
                  });
                  const updatedChildren = data.map((item, i) => ({
                    title: item.name,
                    key: `${node.key}-${i}`,
                    camera: true,
                    isLeaf: true,
                    url: item.urlMainstream,
                    status: item.status,
                    id: item.id,
                  }));
                  if (updatedChildren.length > 0) {
                    node.children = updatedChildren;
                    node.loaded = true;
                  } else {
                    delete node.children;
                  }
                } else if (node.children && node.children.length > 0) {
                  return node;
                }
              })
            );
          }
        }
        return node;
      })
    );

    return updatedDataTree;
  };

  const onLoadData = async (treeNode) => {
    try {
      const updatedTreeData = await recursiveUpdateData(
        treeData,
        treeNode.key,
        TYPE_ACTION.LIVE.GET_DISTRICT_LIVE
      );
      setTreeData(updatedTreeData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "rgba(16, 16, 22, 0)",
          controlItemBgActive: colors.transparent,
          lineHeight: 2,
          colorText: colors.textBase,
          colorPrimary: colors.redGlobal,
          colorBorder: colors.borderColor,
          paddingXS: 5,
        },
      }}
    >
      <Tree
        loadData={onLoadData}
        treeData={treeData}
        showIcon={showIcon}
        switcherIcon={
          <DownOutlined size={24} style={{ height: "24px", width: "24px" }} />
        }
        showLine={true}
        onSelect={onSelect}
        titleRender={titleRender}
      />
    </ConfigProvider>
  );
};
export default CustomTreeLoad;
