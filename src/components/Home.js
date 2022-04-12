import React from "react";
import {
    Flex,
} from '@chakra-ui/react';
import UserSession from './UserSession';
// import MainContent from "./MainContent";
import SideBar from "./SideBar";
import MainContent from "./MainContent/MainContent";
import { useHistory } from "react-router-dom";

const Home = (props) => {
    const history = useHistory();
    
    const [tabIndex, setTabIndex] = React.useState(1);
    const [fetchingStData, setFetchingStData] = React.useState(true);
    const [hasMentorship, setHasMentorship] = React.useState(false);
    const [certType, setCertType] = React.useState('participante');
    const [certLevel, setCertLevel] = React.useState({});
    const [issueDate, setIssueDate] = React.useState({});

    function getCurrentDate() {
        const current_date = new Date().toISOString()
        return {
            date: current_date.split("T")[0],
            year: current_date.substring(0, 4),
            month: current_date.substring(6, 7),
            day: current_date.substring(8, 10)
        }
    }


    const handleFetchingStDataUpdate = fetching_st_data => setFetchingStData(fetching_st_data);
    const handleTabIndexUpdate = tab_index => setTabIndex(tab_index);
    const handleMentorshipUpdate = has_mentorship => setHasMentorship(has_mentorship);
    const handleCertLevelUpdate = () => certType === 'participante' ? setCertLevel(localStorage.getItem('pLevel')) : setCertLevel(localStorage.getItem('mLevel'));
    const handleCertTypeUpdate = () => certType === 'participante' ? setCertType('mentor') : setCertType('participante');
    
    setTimeout(() => {
        setFetchingStData(false);
        setIssueDate(getCurrentDate);
    }, 5000);

    return (
        <>
            {!UserSession.getToken() ? (

                history.push("/login")

            ) : (
                <Flex
                    width="full"
                    height="fit-content"
                    alignContent="center"
                    // alignItems="top"
                    justifyContent="center"
                    paddingTop="10vh"
                >
                    {/* <SideBar tabIdenx={props.tabIdenx}/> <MainContent/> */}
                    <SideBar
                        cert_type={certType}
                        fetching_st_data={fetchingStData}
                        tabIndex={tabIndex}
                        has_mentorship={true}
                        cert_level={certLevel}
                        issue_date={issueDate}
                        handleCertTypeUpdate={handleCertTypeUpdate}
                        
                    />
                    {/* <Text>{state.tabIndex}</Text> */}
                    <MainContent
                        cert_type={certType}
                        has_mentorship={hasMentorship}
                        handleTabIndexUpdate={handleTabIndexUpdate}
                        handleMentorshipUpdate={handleMentorshipUpdate}
                        handleCertLevelUpdate={handleCertLevelUpdate}
                        // handleFetchingStDataUpdate={handleFetchingStDataUpdate}
                    />
                    {/* <MainContenttt /> */}
                </Flex>
            )
            }
        </>
    )
}

export default Home;