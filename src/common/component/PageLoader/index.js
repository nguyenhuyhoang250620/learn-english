import styles from "./PageLoader.module.scss";
import { LoadingOutlined } from '@ant-design/icons';

const PageLoader = () => {
  return (
    <div className={styles.circularProgressRoot}>
      <LoadingOutlined
        style={{
          fontSize: 40,
        }}
        spin
      />
    </div>
  );
};

export default PageLoader;
