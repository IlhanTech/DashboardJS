import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const ClientID = process.env.REACT_APP_GoogleClientID;

function ButtonGoogleLogout() {
    const navigate = useNavigate();
    const onSuccess = () => {
        navigate('/login');
        console.log('Successfull logout !');

    }

    return (
        <div id="signout-button">
            <GoogleLogout
                clientId={ClientID}
                buttonText='Logout'
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default ButtonGoogleLogout;