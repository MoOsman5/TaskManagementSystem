import styles from './BaseButton.module.css';

export default function BaseButton({name, handelSubmit}) {
  return (
    <>
      <div className={styles.base_button} onClick={handelSubmit}>{name}</div>
    </>
  );
}
