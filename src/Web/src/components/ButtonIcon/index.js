import './styles.css';
import { ReactComponent as Seta } from '../../assets/images/Seta.svg';

const ButtonIcon = ( { text } ) => {
  return (
    <div className="btn-container">
        <button className="btn btn-primary">
          <h6>{text}</h6>
        </button>
      <div className="btn-icon-container">
        <Seta />
      </div>
    </div>
  );
};

export default ButtonIcon;