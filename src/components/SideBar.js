import React from "react";
import { withRouter } from 'react-router-dom';
import {
    Flex,
    Button,
    Image,
    Box
} from '@chakra-ui/react';
import UserSession from './UserSession';
import SideBarCertificate from './SideBarCertificate'
import SideBarLinkedIn from './SideBarLinkedIn'
import SideBarStats from "./SideBarStats";
import SideBarLoader from "./SideBarLoader";
import { TabIndexContext } from "./Context/TabIndexContext";
import { useHistory } from "react-router-dom";

const SideBar = (props) => {
    const full_name = UserSession.getName();
    const tabIndex = React.useContext(TabIndexContext);
    const history = useHistory();

    const handleClickSair = () => {
        UserSession.removeToken();
        UserSession.removeId();
        UserSession.removeName();
        history.push("/login");
    };

  return (
    < Flex textAlign="left" flexDirection="column" alignItems="start" width="16em" height="auto" paddingBottom="0.9vh">

                <Image src="linkest_logo.png" width="12em" marginLeft="-0.7em"/>

                {props.fetching_st_data === true && <SideBarLoader />}

                {(tabIndex.tabInd === 0 && props.fetching_st_data === false) && <SideBarCertificate
                    cert_type={props.cert_type}
                    has_mentorship={props.has_mentorship}
                    handleCertTypeUpdate={props.handleCertTypeUpdate}
                    cert_level={props.cert_level}
                    issue_date={props.issue_date}
                />}

                {tabIndex.tabInd === 1 && <SideBarLinkedIn />}

                {(tabIndex.tabInd === 1 && props.fetching_st_data === false) && <SideBarStats
                    cert_type={props.cert_type}
                    has_mentorship={props.has_mentorship}
                    handleCertTypeUpdate={props.handleCertTypeUpdate}
                    cert_level={props.cert_level}
                    issue_date={props.issue_date}
                />}

                <Box flexGrow="1" />
                <Button
                    // colorScheme="blue"
                    // variant="outline"
                    size="sm"
                    width="12.3em"
                    mt={4}
                    onClick={handleClickSair}
                >
                    Sair
                </Button>
            </Flex>
  )
}

export default SideBar
