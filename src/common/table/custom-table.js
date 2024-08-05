import { ConfigProvider, Table } from "antd";
import colors from "@constants/colors";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


const StyledTable = styled(Table)`
  .ant-table-tbody > tr:nth-child(odd){
    background-color: #1D2228;
  }

  .ant-table-tbody {
    max-height: 70px
  }

  .ant-table-tbody > tr:nth-child(even) {
    background-color: #2B2F34;
  }
  .ant-table-body::-webkit-scrollbar {
    // background-color: red;
    width: 8px;
  }
  .ant-table-body::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 4px;
  }

  .ant-table-body::-webkit-scrollbar-track {
    background-color: #212228;
  }
`;
const CustomTable = ({
  columns,
  total,
  data,
  handleRowClick,
  localeValues,
  loading,
  showCheckBox = true,
  getRowClassName,
  scroll,
  onRowClick,
  showTotal=true,
  filterRef,
  defaultCurrent,
  onChange,
  getPage,
  tagCallBack,
  pagination =true,
  bordered = false,
  heightPart=250,
  width = '100%',
  indexRef,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState(0);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const rowProps = (record, index) => ({
    onClick() {
      handleRowClick(record, index);
    },
  });
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const updateScreenHeight = () => {
    setScreenHeight(window.innerHeight);
  };
  useEffect(() => {
    // Lấy chiều cao màn hình ban đầu
    setScreenHeight(window.innerHeight);

    // Thêm sự kiện để theo dõi sự thay đổi chiều cao màn hình
    window.addEventListener("resize", updateScreenHeight);

    // Xóa sự kiện khi component unmount
    return () => {
      window.removeEventListener("resize", updateScreenHeight);
    };
  }, []);
  let arr = [];
  const rowSelection = {
    selectedRowKeys,
    onSelect: (record, selected, selectedRows, nativeEvent) => {
    
    },
    onSelectAll:(selected, selectedRows, changeRows)=>{
      if(changeRows.length > 0){
        changeRows.map((item)=>{
        })
      }
      else{
      }
      
    }
  };
  return (
    <div
      style={{ 
        height: "max-content", 
        overflow: "auto" 
      }}
      className="relative"
      >
      <ConfigProvider
        theme={{
          token: {
            colorBgBase: colors.background,
            borderRadius: 0,
            controlItemBgHover: colors.redGlobal,
            controlItemBgActive: "black",
            colorText: colors.textBase,
            colorPrimary: colors.redGlobal,
            colorLink: colors.redGlobal,
            colorPrimaryBorder: colors.redGlobal,
            colorIcon: colors.redGlobal,
            colorTextPlaceholder: colors.plahacoder,
            colorTextBase: colors.plahacoder,
            colorFillAlter: "#5F5F79",
            colorBorder:"red",
            controlOutlineWidth:0,
            controlOutline:0,
            rowHoverBg: colors.redGlobal,
          },
          components: {
            Table:{
              rowHoverBg: colors.redGlobal,
            },
            Pagination: {
              borderRadius: 0,
              colorBorder: colors.redGlobal,
              colorPrimary:colors.redGlobal,
              controlOutline:0,
              controlOutlineWidth:0
            },
          },
        }}
      >
        <div style={{ width: width }}>
          <StyledTable
            pagination={pagination?{ 
              total: total,
              showSizeChanger: true,
              showQuickJumper: false,
              current: defaultCurrent,
              responsive: true,
              onChange: onChange,
              locale: {
                page: t("page"),
                jump_to: t("go_to"),
                items_per_page: `/ ${t("page")}`,
              },
              }:pagination}
            locale={localeValues}
            scroll={{ y: screenHeight - heightPart, x: 1200,scrollToFirstRowOnChange: true }}
            onRow={onRowClick?onRowClick:rowProps}
            rowSelection={showCheckBox && rowSelection}
            columns={columns}
            dataSource={data}
            loading={loading}
            rowClassName={getRowClassName}
            bordered = {bordered}
          ></StyledTable>
        </div>
      </ConfigProvider>
      {showTotal?(
        <span
          style={{ color: colors.textBase }}
          className="absolute bottom-4 left-2"
        >
          {t("total")}: {total}
        </span>):('')}
    </div>
  );
};

export default CustomTable;
