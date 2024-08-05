import { DownOutlined } from "@ant-design/icons";
import colors from "@constants/colors";
import { ConfigProvider, Tree } from "antd";
import { useMemo } from "react";
import { useDrag } from "react-dnd";
import { FaFile } from "react-icons/fa";

const listFake = Array(100).fill({
    name:"Bản ghi"
})
const treeData = [];

const CameraSingle = ({ node }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "GET",
    item: node.item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    }));
    return(
      listFake.map((item,index)=>{
        treeData.push(
            { title:
                <div ref={drag} key={index} className="flex items-center space-x-2 mt-[5px] px-2" >
                    <FaFile style={{color:colors.textBase}} className="text-[16px]"/>
                    <p style={{color:colors.textBase}}>{item.name} {index}</p>
                </div>,
            key: index,
            });
    }))
  }

const TreePlayBack = () => {
    const onSelect = (selectedKeys, info) => {
        console.log("selected", selectedKeys, info);
      };
      const memoizedTitleRender = useMemo(() => {
        return (node) => {
          <CameraSingle node={node} />
        };
      }, []);
    return ( 
        <div>
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
            titleRender={memoizedTitleRender}
          />
        </ConfigProvider>
      </div>
     );
}
 
export default TreePlayBack;