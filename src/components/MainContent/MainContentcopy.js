import React from 'react';
import Projects from './Projects';
// import {
//     Box
// } from '@chakra-ui/react';
// import { rankUserStData } from '../Calc'
// import ContentTabs from "../ContentTabs"
import UserSession from '../UserSession';
import { fetchUserProjects } from "../../api/StrateegiaData";

const MainContenttt = () => {
    const token = UserSession.getToken();
    const userId = UserSession.getId();
    const [usersProjects, setUsersProjects] = React.useState([]);

    // const [fetchingStData, setFetchingStData] = React.useState(false);
    // const [fetchingState, setFetchingState] = React.useState([0, '']);
    // const [stData, setStData] = React.useState({});
    // const [certLevelMentor, setCertLevelMentor] = React.useState(0);
    // const [certLevelParticipant, setCertLevelParticipant] = React.useState(0);
    // const [issueDate, setIssueDate] = React.useState({});
    // const [tabIndex, setTabIndex] = React.useState(0);

    // const userId = UserSession.getId();
    const ti = performance.now();

    React.useEffect(() => {
        fetchUserProjects(token).then((data) => {
            const journeys = data.map(dt => dt.projects);
            setUsersProjects(...[journeys.flat()]);
        });
    }, []);
    // console.log(usersProjects)
    
    return (
        <div>
            <Projects token={token} userId={userId} projects={usersProjects}/>
        </div>
    )
};

export default MainContenttt;