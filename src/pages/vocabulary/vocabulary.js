import TYPE_ACTION from "@constants/action";
import {
  selectListVocabulary,
  selectTotalVocabulary,
} from "@redux/slice/live-slice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, Table } from "antd";
import colors from "@constants/colors";
import { DeleteFilled } from "@ant-design/icons";
const VocabularyScreen = () => {
  const dispatch = useDispatch();
  const fillterRef = useRef({
    page: 1,
    limit: 10,
  });
  const listDataVocabulary = useSelector(selectListVocabulary);
  const totalVocabulary = useSelector(selectTotalVocabulary);
  const data = [];
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Từ vựng",
      dataIndex: "vocabulary",
      key: "vocabulary",
      width: 200,
    },
    {
      title: "Phiên âm",
      dataIndex: "spelling",
      key: "spelling",
      width: 200,
    },
    {
      title: "Loại từ",
      dataIndex: "type",
      key: "type",
      width: 200,
    },
    {
      title: "Nghĩa tiếng việt",
      dataIndex: "mean",
      key: "mean",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      width: 200,
    },
  ];
  listDataVocabulary.map((user, index) => {
    data.push({
      id: (
        <p className="text-gray-200">
          {(fillterRef.current.page - 1) * fillterRef.current.limit + index + 1}
        </p>
      ),
      vocabulary: <p className="text-gray-200">{user.vocabulary}</p>,
      spelling: <p className="text-gray-200">{user.spelling}</p>,
      type: <p className="text-gray-200">{user.type}</p>,
      mean: <p className="text-gray-200">{user.mean}</p>,
      action: (
        <div>
          <DeleteFilled
            className="cursor-pointer"
            onClick={() => handleDeleteVocabulary(user.id)}
          />
        </div>
      ),
    });
  });
  useEffect(() => {
    getAllDataVocabulary();
  }, []);
  //function
  const getAllDataVocabulary = () => {
    const callBack = () => {};
    dispatch({
      type: TYPE_ACTION.VOCABULARY.GET_ALL_VOCABULARY,
      payload: {
        body: fillterRef.current,
        callBack: callBack,
      },
    });
  };
  const handleChangePage = (page, limit) => {
    fillterRef.current.page = page;
    fillterRef.current.limit = limit;
    getAllDataVocabulary();
  };
  const handleDeleteVocabulary = (id) => {
    // const callBack = () => {
    //     getAllDataVocabulary();
    // };
    // dispatch({
    //   type: TYPE_ACTION.VOCABULARY.DELETE_VOCABULARY,
    //   payload: {
    //     body: { id },
    //     callBack: callBack,
    //   },
    // });
  };
  return (
    <div className="p-2">
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
            colorBorder: "transparent",
            controlOutlineWidth: 0,
            controlOutline: 0,
            rowHoverBg: colors.redGlobal,
          },
          components: {
            Table: {
              rowHoverBg: colors.redGlobal,
            },
            Pagination: {
              borderRadius: 0,
              colorBorder: colors.redGlobal,
              colorPrimary: colors.redGlobal,
              controlOutline: 0,
              controlOutlineWidth: 0,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            total: totalVocabulary,
            onChange: handleChangePage,
          }}
          scroll={{ y: 800, x: 1200, scrollToFirstRowOnChange: true }}
        />
      </ConfigProvider>
    </div>
  );
};
export default VocabularyScreen;
