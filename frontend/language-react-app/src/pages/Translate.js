import InfoArea from "../assets/jss/material-kit-pro-react/components/InfoArea/InfoArea.js";
import TranslateIcon from '@mui/icons-material/Translate';
import TranslateInputArea from '../components/TranslateInputArea'
import GridItem from "../assets/jss/material-kit-pro-react/components/Grid/GridItem.js";
import GridContainer from "../assets/jss/material-kit-pro-react/components/Grid/GridContainer.js";

function Translate() {
    return (
      <div>
            <InfoArea
                title="Translate"
                description="Choose languages to translate to and from. Powered by Google Cloud Translation"
                icon={TranslateIcon}
                iconColor="primary"
            />
            
            <TranslateInputArea />


      </div>
    );
  }
  
  export default Translate;