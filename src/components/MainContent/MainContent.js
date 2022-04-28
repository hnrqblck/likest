import React from 'react';
import Projects from './Projects';
import UserSession from '../UserSession';
import { rankUserStData } from '../Calc'
import { useProjectsData } from './Projects';
import { useMapsData } from './Points';
import { useDiPoints } from './Contribution';
import {
    Box
} from '@chakra-ui/react';
import ContentTabs from "../ContentTabs";
import { i18n } from '../../translate/i18n';

const MainContent = ({cert_type}) => {
    const token = UserSession.getToken();
    const userId = UserSession.getId();
    const [fetchingStData, setFetchingStData] = React.useState(true);
    const [fetchingState, setFetchingState] = React.useState([0, '']);

    const {usersProjects, maps, users} = useProjectsData(token, userId);
    const {divergencePoints, convergencePoints, conversationPoints} = useMapsData(token, maps);
    const { userComments, userReplies } = useDiPoints(token, divergencePoints);


    const stData = {
        'number_of_projects': usersProjects.length,
        'number_of_missions': maps.length,
        'number_of_divergence_points': divergencePoints.length,
        'number_of_convergence_points': convergencePoints.length,
        'number_of_conversation_points': conversationPoints.length,
        'number_of_replies_from_user': userReplies.length,
        'number_of_comment_replies_from_user': userComments.length,
        'number_of_mentorships': users.length,
    };

    const getCurrentDate = () => {
        const current_date = new Date().toISOString()
        return {
            date: current_date.split("T")[0],
            year: current_date.substring(0, 4),
            month: current_date.substring(6, 7),
            day: current_date.substring(8, 10)
        }
    };

    
    const cert_levels = rankUserStData({stData: stData});
    const cert_level_participant = cert_levels.achieved_levels_participante;
    const cert_level_mentor = cert_levels.achieved_levels_mentor;
    
    function handleFetchState(value, time) {
        setTimeout(() => {
            setFetchingState([value, i18n.t('mainContent.data')]);
        }, time);
    };

    
    
    React.useEffect(() => {
        handleFetchState(20, 1000);
        handleFetchState(40, 2000);
        handleFetchState(60, 3000);
        handleFetchState(80, 4000);
    
        setTimeout(() => {
            setFetchingStData(false);

            
        }, 5000);
        
    }, []);

    React.useEffect(() => {
        localStorage.setItem('pLevel', cert_level_participant);
        localStorage.setItem('mLevel', cert_level_mentor);
    }, [cert_levels])


    return (
        <Box height='fit-content'>
                <ContentTabs
                fetching_st_data={fetchingStData}
                fetching_state={fetchingState}
                cert_level_participante={cert_level_participant}
                cert_level_mentor={cert_level_mentor}
                cert_type={cert_type}
                has_mentorship={true}
                issue_date={getCurrentDate()}
                number_of_projects={usersProjects.length}
                number_of_missions={maps.length}
                number_of_divergence_points={divergencePoints.length}
                number_of_convergence_points={convergencePoints.length}
                number_of_conversation_points={conversationPoints.length}
                number_of_replies_from_user={userReplies.length}
                number_of_comment_replies_from_user={userComments.length}
                number_of_mentorships={users.length}
            />
        </Box>
    )
};

export default MainContent;