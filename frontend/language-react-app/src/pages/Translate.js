import InfoArea from "../assets/jss/material-kit-pro-react/components/InfoArea/InfoArea.js";
import TranslateIcon from '@mui/icons-material/Translate';
import TranslateInputArea from '../components/TranslateInputArea'

function Translate() {
    return (
      <div>
            <InfoArea
                title="Translate"
                description="Choose languages to translate to and from. This app uses LibreTranslate API."
                icon={TranslateIcon}
                iconColor="primary"
            />

            <TranslateInputArea />


      </div>
    );
  }
  
  export default Translate;