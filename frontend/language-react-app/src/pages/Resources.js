import InfoArea from "../assets/jss/material-kit-pro-react/components/InfoArea/InfoArea.js";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookFinder from "../components/BookFinder"

function Resources() {
    return (
      <div>
        <div>
            <InfoArea
                title="Find Resources"
                description="Use our book search tool to find books related to your target language, or see our recommendations for other sites to use for a well-rounded learning experience."
                icon={MenuBookIcon}
                iconColor="primary"
            />
            <BookFinder />
        </div>
      </div>
    );
  }
  
  export default Resources;