import PropTypes from "prop-types";

// material-ui
import {CardContent, Grid} from "@mui/material";

// project imports
import BajajAreaChartCard from "./BajajAreaChartCard";
import MainCard from "ui-component/cards/MainCard";
import SkeletonPopularCard from "ui-component/cards/PopularCard";

// assets

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({isLoading}) => {
  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard>
          <CardContent>
            <Grid>
              <BajajAreaChartCard />
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
