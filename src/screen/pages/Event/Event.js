import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TYPE_ACTION from "../../../constants/TypeAction";
import { Form, message, AutoComplete, Input, Modal } from "antd";
import styles from "./Event.module.scss";
import SearchComponent from "./components/SearchComponent";
import Images from "./components/Images/Images";
import axios from "axios";
import { baseURL } from "../../../services/ConfigService/ApiService";
import { SERVICE_PATHS } from "../../../constants/paths";
import Socket from "../../socket/Socket";
import { useTranslation } from "react-i18next";
import {
  selectEventData,
  selectisLoading,
} from "../../../redux/slice/EventSlice";
import { selectEventTotalRecord } from "../../../redux/slice/EventSlice";
import filter_normal from "../../../assets/images/filter_normal.png";
import filter_active from "../../../assets/images/filter_active_new.png";
import iconSearch from "../../../assets/images_new/search.png";
import "./custom-table.css";
import PageLoader from "../../../common/component/PageLoader";
import _ from "lodash";
import adduser from "../../../assets/images_new/test.jpg";
import warning from "../../../assets/icons/warning.png";

const Event = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [isloading, setLoading] = useState(true);

  const eventAll = useSelector(selectEventData);
  const eventAllLoading = useSelector(selectisLoading);
  const total = useSelector(selectEventTotalRecord);

  const [collapsed, setCollapsed] = useState(0);
  const [filter, setFilter] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [options, setOptions] = useState();
  const [isloadingSocket, setIsLoadingSocket] = useState(true);
  const [pickImage, setPickImage] = useState(false);
  const [profile, setProfile] = useState(false);
  const [select, setSelect] = useState(1);
  var searchValue = "";

  const filterRef = useRef({
    soCmts: null,
    camera_ids: null,
    start_time: null,
    end_time: null,
    distinct: null,
    event_type: null,
    page_idx: 1,
    page_size: 12,
    exact: false,
  });
  const filterRefSearch = useRef({
    soCmts: null,
    camera_ids: null,
    start_time: null,
    end_time: null,
    distinct: null,
    event_type: null,
    page_idx: null,
    page_size: null,
    exact: false,
  });

  const onChangeAutoComplete = (value) => {
    const soCmts = [];
    soCmts.push(value);
    filterRefSearch.current.soCmts = soCmts;
    loadDataSearch();
    searchValue = value;
    if (!value) {
      filterDataSearch();
    }
  };
  const handleAutoCompleteSelect = (value) => {
    filterDataSearch(value);
    searchValue = value;
  };
  const filterDataSearch = (value) => {
    const soCmts = [];
    soCmts.push(value);
    filterRef.current.soCmts = soCmts;
    loadData();
  };
  const onEnterSearch = (event) => {
    if (event.key === "Enter") {
      filterDataSearch(searchValue);
    }
  };

  useEffect(() => {
    loadData();
    // loadDataSearch();
    loadBlackListData();
  }, []);

  const loadData = async () => {
    await dispatch({
      type: TYPE_ACTION.EVENT.GET,
      payload: filterRef.current,
    });
  };

  const loadBlackListData = () => {
    dispatch({
      type: TYPE_ACTION.BLACKLIST.GET_BLACKLIST,
      payload: {},
    });
  };

  const loadDataSearch = async () => {
    const arr = [];
    const uniqueSoCmt = {};
    var filterString = "?";
    const body = filterRefSearch.current;
    Object.keys(body).map((index) => {
      if (filterString != "?" && body[index] != null) {
        filterString += `&${index}=${body[index]}`;
      } else if (body[index] != null) {
        filterString += `${index}=${body[index]}`;
      }
    });
    console.log("filterString",filterString)
    await axios
      .get(`${baseURL}${SERVICE_PATHS.EVENT.GET_EVENT}${filterString}`)
      .then(function (response) {
        response.data.results.forEach((index) => {
          if (!uniqueSoCmt[index.soCmt]) {
            uniqueSoCmt[index.soCmt] = true;
            arr.push({
              label: index.soCmt,
              value: `${index.soCmt}`,
            });
          }
        });
      })
      .catch(function (error) {
        console.log(error);
        message.error("Error !");
      });
    setOptions(arr);
  };

  const reloadData = () => {
    setFilter(false);
    setLoading(false);
    setPickImage(false);
    filterRef.current.soCmts = null;
    filterRef.current.camera_ids = null;
    filterRef.current.start_time = null;
    filterRef.current.end_time = null;
    filterRef.current.event_type = null;
    loadData();
  };
  const handledCollapsed = () => {
    setIsModalVisible(true);
    setCollapsed(collapsed == 1 ? 0 : 1);
  };
  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setProfile(false);
  };

  useEffect(() => {
    setLoading(true);
  }, [eventAll]);

  const debouncedLoadData = useRef(_.debounce(loadData, 200));

  const onChange = (page, size) => {
    filterRef.current.page_idx = page;
    filterRef.current.page_size = size;
    debouncedLoadData.current();
  };

  const pickAvatar = () => {
    setPickImage(true);
  };
  const showProfile = () => {
    setProfile(true);
  };

  const test = [1, 2, 3, 4, 5];

  const renderedItems = test.map((item) => (
    <div
      key={item} // Đảm bảo có key unique cho mỗi phần tử trong map
      onClick={() => setSelect(item)}
      style={{
        height: "110px",
        width: "150px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        background: select == item ? "#FFE4E4" : "white",
      }}
    >
      <img
        onClick={showProfile}
        src={warning}
        style={{
          position: "absolute",
          height: "25px",
          width: "25px",
          right: "4px",
          top: "4px",
          cursor: "pointer",
        }}
      />
      <img
        src={adduser}
        style={{
          height: "60px",
          width: "60px",
          marginTop: "5px",
          borderRadius: "50%",
        }}
      />
      <h4 style={{ padding: "3px", borderBottom: "1px solid black" }}>
        Person {item}
      </h4>
      <span style={{ fontSize: "12px", marginTop: "3px" }}>
        Matching Ratio: {item}0%
      </span>
    </div>
  ));
  return (
    <>
      <Modal
        onCancel={handleCancelDelete}
        okText={t("ok")}
        cancelText={t("cancel")}
        open={profile}
        closable={false}
        footer={[]}
        width="70%"
        style={{
          position: "absolute",
          left: "0",
          right: "0",
          top: "30px",
        }}
      >
      </Modal>
      {isloadingSocket && <Socket loadData={() => loadData()}></Socket>}
      <div style={{ position: "relative" }}>
        <h2 className={styles.header}>
          {t("event_management")}
          {/* (<span style={{ color: "red" }}>{`${totalRecord}`}</span>) */}
        </h2>
        {pickImage && (
          <div
            style={{
              height: "140px",
              width: "45%",
              position: "fixed",
              top: "7%",
              zIndex: "999",
              background: "white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
              left: "31%",
            }}
          >
            <h4 style={{ paddingLeft: "10px" }}>{t("similarity_Face_List")}</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              {renderedItems}
            </div>
          </div>
        )}
      </div>
      <div className={styles.filter}>
        <div className={styles.select}>
          <Form ref={formRef}>
            <Form.Item name="soCmt">
              <AutoComplete
                style={{
                  width: "320px",
                  marginLeft: "30px",
                  marginRight: "0px",
                  marginTop: "-10px",
                }}
                onKeyDown={onEnterSearch}
                placeholder={t("search")}
                options={options}
                onChange={(value) => onChangeAutoComplete(value)}
                onSelect={handleAutoCompleteSelect}
              >
                <Input
                  style={{ marginLeft: "-40px", background: "white" }}
                  addonBefore={<img width={25} src={iconSearch} />}
                />
              </AutoComplete>
            </Form.Item>
          </Form>
        </div>
        <div>
          {filter ? (
            <img
              src={filter_active}
              onClick={() => reloadData()}
              className={styles.collapsed}
              style={{ height: "35px", width: "auto", color: "black" }}
            />
          ) : (
            <img
              src={filter_normal}
              onClick={() => {
                setIsLoadingSocket(false);
                handledCollapsed();
              }}
              className={styles.collapsed}
              style={{ height: "35px", width: "auto", color: "black" }}
            />
          )}
          <Modal
            onCancel={handleCancelDelete}
            okText={t("ok")}
            cancelText={t("cancel")}
            width="50%"
            open={isModalVisible}
            closable={false}
            footer={[]}
            style={{
              position: "absolute",
              right: 30,
              top: 150,
            }}
          >
            <SearchComponent
              form={form}
              actionFilter={() => {
                setFilter(true);
              }}
              close={() => {
                setLoading(false);
                setIsModalVisible(false);
                setTimeout(() => {
                  setIsLoadingSocket(true);
                }, 3000);
              }}
              pickAvatar={pickAvatar}
              loadData={loadData}
              filterRef={filterRef}
            ></SearchComponent>
          </Modal>
        </div>
      </div>
      {eventAllLoading && isloading ? (
        <Images
          eventData={eventAll}
          totalRecord={total}
          filterRef={filterRef}
          onChange={(page, size) => onChange(page, size)}
          loadData={() => loadData()}
        ></Images>
      ) : (
        <PageLoader />
      )}
    </>
  );
};

export default Event;
