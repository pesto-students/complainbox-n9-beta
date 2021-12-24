import { Grid, Box } from "@mui/material";
import React from "react";
import PanelHeader from "../../Shared/common/PanelHeader";

function Aboutus(props) {
  return (
    <Grid container display="flex" alignItems="start" borderRadius="20px">
      <Grid container mx={{ xs: 2, sm: 4, md: 8 }} boxShadow={8} my={{ xs: 2, sm: 4, md: 8 }}>
        <PanelHeader title={"About Us "} />
        <Box sx={{ bgcolor: "#ffffff" }}>
          <div style={{ color: "#1F5B88", padding: "10px" }}>
            <p>
              E-complaintBox application is going to be built for simplifying the management of the complaints and to maintain transparency. This application will be working as a bridge between the citizens of the country and the governing body. People will not need to go to the authorities physically, rather they can solve and file their problem from anywhere they want. It is going to save their time and effort.
            </p>

            <p>
              In the global economy, our customers, partners, and colleagues are geographically distributed, while the need for collaboration remains. The lack of common integrated systems creates information flow barriers and makes complaint investigations difficult.
              With disjointed applications and the lack of a defined case process, there is no real-time view into complaint resolution. This usually means that agents and managers only find out about service failures long after they happen.
              Poorly designed systems can cause long lag times for complaint data assembly, and analysis causing case information to lose its relevance and use in identifying issues affecting customers.
            </p>
            <p>
              Create an E-complaintBox management System.
              All Indians can raise irrespective of major or minor their complaints they face every day life here.
              People can assign the problems to the respective departments.
              The departments can also Forward the complaints to the other departments if the problem does not exist in their domain.
              People don't need go to the departments physically, rather they can raise their problem from anywhere they want
              The complainers can keep the track of their problem whenever they want
            </p>
            <p>
              Indian Citizens: All registered Indian citizens can use this to register and track the status of the complaints.
              State level citizen: The resolving service of the complaints will be served by the state level departments.
            </p>
            <p>We will be creating this application for only one state/UT for version 1.
              Only users who want to raise complaints can register on this portal.
              For registration of other user types, super admin has to send invitations.
              We will be adding limits to hierarchy, as we are not very aware of how all departments of the government Work.
              This is just a prototype or suggestion, nothing to do with the current govt. Projects or governance.
            </p>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Aboutus;
