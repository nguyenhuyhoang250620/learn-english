import FormLogin from "./FormLogin";
import styles from "./SignIn.module.scss";
import logo from '../../../assets/images/hawk_sense_logo.png';
const SignIn = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background_image}></div>
      <div className={styles.wrapper}>
        <div className={styles.image_container}>
          <img className={styles.logo} src={logo}></img>
        </div>
        <h3 className={styles.title}>Intelligent Event Management System</h3>
        <div className={styles.form}>
          {
            <FormLogin></FormLogin>
          }
        </div>
      </div>
    </div>
  );
};

export default SignIn;
