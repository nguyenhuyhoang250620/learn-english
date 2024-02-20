import { Button, Form, Input, Select, Tag } from "antd";
import { useSelector } from "react-redux";
import { selectIdCardData } from "../../../../redux/slice/IDCardSlice";
import styles from "./SearchComponent.module.scss";
import { useTranslation} from 'react-i18next';

const SearchComponent = ({ form, filterRef, loadBlackListData }) => {
  //----Constants
  const options = [];

  const {t} = useTranslation()

  //---- Selectors
  const idCardData = useSelector(selectIdCardData);
  const onFinish = (values) => {
    const stringFilterUsers = formatStringFilterUsers(values.users);
    filterRef.current.id = values.id;
    filterRef.current.name = values.name;
    filterRef.current.users = stringFilterUsers;
    loadBlackListData();
  };

  //--- Functions
  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={"blue"}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  const formatStringFilterUsers = (users) => {
    if (users) {
      const string = users.join("&users=");
      return string;
    } else {
      return null;
    }
  };

  idCardData?.map((index) => {
    options.push({
      value: index.id,
      label: index.soCmt,
    });
  });

  return (
    <div className={styles.container}>
      <Form form={form} onFinish={onFinish}>
        <div className={styles.selects}>
          <div className={styles.selectWrapper}>
            <h4>ID :</h4>
            <Form.Item name="id">
              <Input placeholder="ID ..." className={styles.select}></Input>
            </Form.Item>
          </div>
          <div className={styles.selectWrapper}>
            <h4>{t('group_name')} :</h4>
            <Form.Item name="name">
              <Input placeholder={t('group_name')} className={styles.select}></Input>
            </Form.Item>
          </div>
          <div className={styles.selectWrapper}>
            <h4>{t('object')} :</h4>
            <Form.Item name="users">
              <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                style={{
                  width: "100%",
                }}
                options={options}
                placeholder={t('object')} 
              />
            </Form.Item>
          </div>
        </div>
        <div className={styles.buttons}>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{background:"red"}}>
            {t('search')}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default SearchComponent;
