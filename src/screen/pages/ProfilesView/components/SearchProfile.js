import { Button, Input, Select, Tag } from "antd";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "../../../../redux/slice/DarkModeSlice";
import { selectIdCardData } from "../../../../redux/slice/IDCardSlice";
import {
  selectProfileData,
  selectTotalProfileData,
} from "../../../../redux/slice/ProfileSlice";
import styles from "./SearchProfile.module.scss";
import { useTranslation} from 'react-i18next';

const { Search } = Input;
const SearchProfile = ({ filterRef, loadData }) => {
  //-- Selectors
  const profileData = useSelector(selectProfileData);
  const idCardData = useSelector(selectIdCardData);
  const isDarkMode = useSelector(selectIsDarkMode);
  const {t} = useTranslation()

  const tagRender = (props) => {
    const { label, closable } = props;
    return (
      <Tag
        color={"blue"}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  //-----Functions
  const addFilterCmts = (value) => {
    filterRef.current.soCmts = value.join(",");
    console.log(filterRef.current);
  };

  const addFilterIdCmts = (value) => {
    filterRef.current.ids = value.join(",");
    console.log(filterRef.current);
  };

  const onSearch = (value) => console.log(value);
  const color = isDarkMode ? "#DADADA" : "black";
  return (
    <>
      <div className={styles.search}>
        <div className={styles.container}>
          <div className={styles.select}>
            <h4 style={{color:`${color}`}}>{t('username')} :</h4>
            <Select
              mode="multiple"
              placeholder={t('username')}
              defaultValue={[]}
              onChange={addFilterCmts}
              tagRender={tagRender}
              style={{
                width: "100%",
              }}
            >
              {idCardData?.map((index) => {
                return (
                  <Option value={index.soCmt} key={index.soCmt}>
                    {index.soCmt}
                  </Option>
                );
              })}
            </Select>
          </div>

          <div className={styles.select}>
            <h4 style={{color:`${color}`}}>ID:</h4>
            <Select
              mode="multiple"
              placeholder="ID."
              defaultValue={[]}
              onChange={addFilterIdCmts}
              tagRender={tagRender}
              style={{
                width: "100%",
              }}
            >
              {idCardData?.map((index) => {
                return (
                  <Option key={index.id} value={index.id}>
                    {index.id}
                  </Option>
                );
              })}
            </Select>
          </div>
          <div className={styles.select}>
            <h4 style={{color:`${color}`}}>{t('status')}</h4>
            <Select
              placeholder={t('status')}
              defaultValue={null}
              style={{
                width: "100%",
              }}
              onChange={(value) => (filterRef.current.statuses = value)}
            >
              <Option value={null}>{t('all')}</Option>
              <Option value="available">{t('photo')}</Option>
              <Option value="unavailable">{t('no_photo')}</Option>
            </Select>
          </div>
        </div>
        <div className={styles.button}>
          <Button type="primary" onClick={() => loadData()} style={{background:"red"}}>
            {t('search')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchProfile;
