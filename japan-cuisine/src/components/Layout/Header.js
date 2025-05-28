import styles from './Header.module.css';
import sushiImage from '../../assets/sushi.jpg'
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
   return (
      <>
         <header className={styles.header}>
            <h1>Японская Кухня</h1>
            <HeaderCartButton onShowCart={props.onShowCart} />
         </header>
         <div className={styles['main-image']} >
            <img src={sushiImage} alt='Блюда Японской кухни' />
         </div>
      </>
   );
};

export default Header;
