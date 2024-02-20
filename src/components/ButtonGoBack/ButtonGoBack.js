import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import styles from "./ButtonGoBack.module.scss";
import { useTranslation} from 'react-i18next';

const ButtonGoBack = () => {
    const{t} = useTranslation()
    const navigate = useNavigate();
    return (
        <Button className={styles.button} icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} type="link">{t('back')}</Button>
    )
};

export default ButtonGoBack;