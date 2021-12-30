import InfoArea from "../assets/jss/material-kit-pro-react/components/InfoArea/InfoArea.js";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookFinder from "../components/BookFinder"

function Resources() {
    return (
      <div>
        <div>
            <InfoArea
                title="Find a book"
                description="Use our book search tool to find books related to your target language in the Open Library."
                icon={MenuBookIcon}
                iconColor="primary"
            />
            <BookFinder />
        </div>
      </div>
    );
  }
  
  export default Resources;