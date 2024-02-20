import { Form, Input } from "antd";
import styles from "./FormProfile.module.scss";

const FormProfile = () => {
    const [form] = Form.useForm();
    return (
        <Form form={form}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.inputItem}>
                        <h5>Họ tên: </h5>
                        <Form.Item name="fullname">
                            <Input style={{marginLeft:"1rem",width:"100%"}}></Input>
                        </Form.Item>
                    </div>
                    <div className={styles.inputItem}>
                        <h5>Họ tên: </h5>
                        <Form.Item name="fullname">
                            <Input style={{marginLeft:"1rem",width:"100%"}}></Input>
                        </Form.Item>
                    </div>
                    <div className={styles.inputItem}>
                        <h5>Họ tên: </h5>
                        <Form.Item name="fullname">
                            <Input style={{marginLeft:"1rem",width:"100%"}}></Input>
                        </Form.Item>
                    </div>
                    <div className={styles.inputItem}>
                        <h5>Họ tên: </h5>
                        <Form.Item name="fullname">
                            <Input style={{marginLeft:"1rem",width:"100%"}}></Input>
                        </Form.Item>
                    </div>
                    <div className={styles.inputItem}>
                        <h5>Họ tên: </h5>
                        <Form.Item name="fullname">
                            <Input style={{marginLeft:"1rem",width:"100%"}}></Input>
                        </Form.Item>
                    </div>
                </div>
                <div className={styles.right}></div>
            </div>
        </Form >
    )
};
export default FormProfile;