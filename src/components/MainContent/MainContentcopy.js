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

const MainContenttt = () => {
    const token = UserSession.getToken();
    const userId = UserSession.getId();
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

    // console.log(stData)

    const getCurrentDate = () => {
        const current_date = new Date().toISOString()
        return {
            date: current_date.split("T")[0],
            year: current_date.substring(0, 4),
            month: current_date.substring(6, 7),
            day: current_date.substring(8, 10)
        }
    };

    // setTimeout(() => {
    //     console.log(cert_levels)
    // }, 3000);
    const cert_levels = rankUserStData({stData: stData});
    const cert_level_participant = cert_levels.achieved_levels_participante;
    const cert_level_mentor = cert_levels.cert_level_mentor;


    
    return (
      
            <Box height='fit-content'>
                 <ContentTabs
                    // fetching_st_data={this.state.fetching_st_data}
                    // fetching_state={this.state.fetching_state}
                    cert_level_participante={cert_level_participant}
                    cert_level_mentor={cert_level_mentor}
                    cert_type='participante'
                    has_mentorship={false}
                    issue_date={getCurrentDate()}
                    number_of_projects={usersProjects.length}
                    number_of_missions={maps.length}
                    number_of_divergence_points={divergencePoints.length}
                    number_of_convergence_points={convergencePoints.length}
                    number_of_conversation_points={conversationPoints.length}
                    number_of_replies_from_user={userReplies.length}
                    number_of_comment_replies_from_user={userComments.length}
                    number_of_mentorships={users.length}
                    handleTabIndexUpdate='0' 
                    // vai ser reaproveitado, precisa de ser refatorado para lidar com progress inicial
                // handleCertTypeUpdate={this.handleCertTypeUpdate}
                />
            </Box>
        // </div>
    )
};

export default MainContenttt;