import AuthImage from '../../assets/images/people-with-pets.png'
import { Route, Switch } from 'react-router-dom';
import Login from './Login/index.js';
import Register from './Register';

import './styles.css'

const Auth = () => {
    
    return (
        <div className="auth-container">
            <div className="auth-banner-container">
                <h1>Já conhece o PetPass?</h1>
                <p>Com o PetPass você tem a carteira de vacinação do seu Pet sempre a mão.</p>
                <img src={AuthImage} alt="Pet com seus donos" />
                <a href="https://br.freepik.com/vetores-gratis/pessoas-de-ilustracao-plana-com-animais-de-estimacao_15292679.htm#query=ilustra%C3%A7%C3%A3o%20pets&position=0&from_view=search&track=sph">Imagem do Freepik</a> 
            </div>
            <div className="auth-form-container">
                <Switch>
                    <Route path="/auth/login">
                        <Login />
                    </Route>   
                    <Route path="/auth/register">
                        <Register />
                    </Route>  
                </Switch>
            </div>
        </div>
    );
}

export default Auth;
