import React, { useEffect, useState } from "react";
import { Select, Form, Button, Collapse } from "antd";
import {
  TeamOutlined,
  FileSearchOutlined,
  SettingTwoTone,
  SettingFilled,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

//utils
import TYPE_ACTION from "../../../constants/TypeAction";
import {
  selectBlackList,
  selectFilterSearchSelect,
} from "../../../redux/slice/BlackListSlice";

//styles
import styles from "./Styles/index.module.scss";

const { Panel } = Collapse;

function Search({ filterRef }) {
  const [form] = Form.useForm();
  const blackListData = useSelector(selectBlackList);
  const selectFilterSearch = useSelector(selectFilterSearchSelect);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(0);

  const loadData = () => {
    const options = [];
    blackListData?.map((item) => {
      options.push({
        label: item.name,
        value: item.id,
      });
    });
    return options;
  };

  const loadFilter = () => {
    dispatch({
      type: TYPE_ACTION.EVENT.GET,
      payload: {
        body: {
          page_idx: 1,
          page_size: 12,
          soCmts: filterRef.current,
        },
      },
    });
  };

  const handleSearch = (value) => {
    console.log("blackListData",blackListData)
    const trackingList = value.map((item) => {
      return blackListData.find((data) => data.id == item);
    });
    const listData = trackingList.map((itemList) => {
      return itemList.users.map((data) => data.soCmt).toString();
    });
    const listDataCar = trackingList.map((itemList) => {
      return itemList.vehicles.map((data) => data.number_plate).toString();
    });
    dispatch({
      type: TYPE_ACTION.BLACKLIST.SELECT,
      payload: value,
    });
    filterRef.current = listDataCar.toString();
    console.log("filterRef.current",filterRef.current)
    console.log("listData",listData)
    loadFilter();
  };

  const handledCollapsed = () => {
    setCollapsed(collapsed == 1 ? 0 : 1);
    loadFilter();
  };

  useEffect(() => {
    dispatch({
      type: TYPE_ACTION.BLACKLIST.GET_BLACKLIST,
      payload: {},
    });
  }, []);

  useEffect(() => {
    if (selectFilterSearch) {
      if (selectFilterSearch.length) {
        const trackingList = selectFilterSearch.map((item) => {
          return blackListData.find((data) => data.id == item);
        });
        const listData = trackingList.map((itemList) => {
          return itemList.users.map((data) => data.soCmt).toString();
        });
        form.setFieldsValue({
          tag: selectFilterSearch,
        });
        filterRef.current = listData.toString();
        loadFilter();
      }
    }
  }, []);
  return (
    <div>
      {collapsed ? (
        <SettingFilled
          onClick={() => handledCollapsed()}
          className={styles.collapsed}
        />
      ) : (
        <SettingTwoTone
          onClick={() => handledCollapsed()}
          className={styles.collapsed}
        />
      )}
      <Collapse style={{ padding: "0" }} ghost activeKey={[collapsed]}>
        <Panel key="1" showArrow={false}>
          <Form form={form} className={styles.form}>
            <Form.Item className={styles.item} name="tag">
              <Select
                mode="multiple"
                placeholder="Please select"
                options={loadData()}
                size="large"
                onChange={handleSearch}
              />
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
    </div>
  );
}

export default Search;
