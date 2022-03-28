import React from "react";
import {
    Box
} from '@chakra-ui/react';
import { rankUserStData } from './Calc'
import ContentTabs from "./ContentTabs"
import UserSession from './UserSession';
import {
    strateegiaProjects,
    fetchProjectsById,
    strateegiaMaps,
    strateegiaHasContribution,
    strateegiaContents,
    strateegiaParentComments,
    strateegiaCommentReplies
} from "../api/StrateegiaData";
import MainContenttt from "./MainContent/MainContentcopy";
import { useProjectsData } from './MainContent/Projects'

class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching_st_data: false,
            fetching_state: [0, ''],
            stData: {},
            cert_level_mentor: 0,
            cert_level_participante: 0,
            issue_date: {},
            tabIndex: 0
        };
        this.getStData = this.getStData.bind(this);
        this.rankUserStData = rankUserStData.bind(this);
        this.handleTabIndexUpdate = this.handleTabIndexUpdate.bind(this)
        this.getStraeegiaData = this.getStraeegiaData.bind(this)

    }

    handleTabIndexUpdate(tabIndex) {
        this.setState({ tabIndex: tabIndex }, function () {
            this.props.handleTabIndexUpdate(this.state.tabIndex)
        });
    }
    
    getStraeegiaData = async ({ token }) => {
        const user_id = UserSession.getId();
        let strateegiaData = [];
        let stProjects = [];
        let stMissions = [];
        let stMaps = [];
        let stDivergenceContents = [];
        let stDivergencePoints = [];
        let stConvergencePoints = [];
        let stConversationPoints = [];
        let stReplies = [];
        let userStReplies = [];
        let userCommentReplies = [];
        let userMentorhips = [];
        const ti = performance.now();

        try {
            this.setState({ fetching_state: [10, 'Carregando Jornadas'] })

            try {
                const projects = await strateegiaProjects({ token: token });
                projects.forEach(function (lab) {
                    lab.projects.forEach(function (project) {
                        stProjects.push(project);
                    })
                })
            } catch (e) {
                console.log('catch strateegiaProjects:', e);
            }
            console.log(performance.now() - ti); // 399







            this.setState({ fetching_state: [20, 'Carregando Mapas'] })
            for (const project of stProjects) {

                try {
                    let missions = await fetchProjectsById({ token: token, project_id: project.id });
                    const users = missions.users;
                    users.forEach(function (user) {
                        if (user.id === UserSession.getId() && (user.project_roles.includes('MENTOR') || user.project_roles.includes('ADMIN'))) {
                            userMentorhips.push({ 'project_id': project.id, 'project_title': project.title })
                        }
                    })
                    stMissions.push(missions);
                    
                } catch (e) {
                    console.log('catch strateegiaMissions:', e);
                }
            }
            console.log(performance.now() - ti); // 7597






            this.setState({ fetching_state: [30, 'Carregando Mapas'] })
            for (const mission of stMissions) {
                for (const maps of mission.maps) {
                    try {
                        let map = await strateegiaMaps(token, maps.id);
                        stMaps.push(map);
                    } catch (e) {
                        console.log('catch strateegiaMaps:', e);
                    }
                }                
            }
            console.log(performance.now() - ti); // 20784
            try {
                stMaps.forEach(function (map) {
                    map.points.forEach(function (point) {
                        switch (point.point_type) {
                            case 'DIVERGENCE':
                                stDivergencePoints.push(point);
                                break;
                            case 'CONVERGENCE':
                                stConvergencePoints.push(point);
                                break;
                            case 'CONVERSATION':
                                stConversationPoints.push(point);
                                break;
                            default:
                                console.log('Tipo de ponto não mapeado')
                        }
                    })
                })
            } catch (e) {
                console.log('catch stMaps forEach:', e);
            }
            console.log(performance.now() - ti); // 20784
            this.setState({ fetching_state: [50, 'Verificando contribuições'] })
            for (const point of stDivergencePoints) {
                try {
                    let has_contributed = await strateegiaHasContribution({ token: token, content_id: point.id });
                    if (has_contributed.has_contributed === true) {
                        try {
                            let divergence_content = await strateegiaContents({ token: token, content_id: point.id });
                            stDivergenceContents.push(divergence_content);
                        } catch (e) {
                            console.log('catch strateegiaContents:', e);
                        }
                    }
                }
                catch (e) {
                    console.log('catch strateegiaHasContribution:', e);
                }
            }

            console.log(performance.now() - ti); // 126811
            this.setState({ fetching_state: [60, 'Capturando respostas'] })
            for (const content of stDivergenceContents) {
                // console.log(content)
                for (const question of content.tool.questions) {
                    console.log(question.id)
                    try {
                        let parent_comments = await strateegiaParentComments({ token, content_id: content.id, question_id: question.id });
                        stReplies.push(parent_comments);
                        // console.log('pc', parent_comments)
                        for (const reply of parent_comments.content) {
                            if (reply.author.id === user_id) {
                                // console.log(reply);
                                userStReplies.push(reply);
                            }
                        }
                    } catch (e) {
                        console.log('catch strateegiaParentComments:', e);
                    }
                }
            }
            console.log(performance.now() - ti); // 151751
            this.setState({ fetching_state: [80, 'Capturando comentários'] })
            for (const reply of stReplies) {
                for (const content of reply.content) {
                    try {
                        let question_comment_replies = await strateegiaCommentReplies({ token, question_comment_id: content.id });
                        for (const question_comment_reply of question_comment_replies.content) {
                            if (question_comment_reply.author.id === user_id) {

                                userCommentReplies.push(question_comment_reply)
                            }
                        }
                    } catch (e) {
                        console.log('catch strateegiaParentComments:', e);
                    }
                }
            }
            console.log(performance.now() - ti); // 230068
            strateegiaData.push({
                stProjects,
                stMissions,
                stDivergenceContents,
                stMaps,
                stDivergencePoints,
                stConvergencePoints,
                stConversationPoints,
                userStReplies,
                userCommentReplies,
                userMentorhips
            })
            return strateegiaData;

        } catch (e) {
            return e;
        }
    };

    async getStData(access_token) {
        try {
            const strateegiaData = await this.getStraeegiaData({ token: access_token });
            // const {usersProjects, maps, users} = useProjectsData();
            this.setState({
                stData: {
                    // 'number_of_projects': usersProjects.length,
                    // 'number_of_missions': maps.length,
                    'number_of_divergence_points': strateegiaData[0].stDivergencePoints.length,
                    'number_of_convergence_points': strateegiaData[0].stConvergencePoints.length,
                    'number_of_conversation_points': strateegiaData[0].stConversationPoints.length,
                    'number_of_replies_from_user': strateegiaData[0].userStReplies.length,
                    'number_of_comment_replies_from_user': strateegiaData[0].userCommentReplies.length,
                    // 'number_of_mentorships': users.length,

                    'number_of_projects': 10,
                    'number_of_missions': 20,
                    // 'number_of_divergence_points': 30,
                    // 'number_of_convergence_points': 40,
                    // 'number_of_conversation_points': 50,
                    // 'number_of_replies_from_user': 60,
                    // 'number_of_comment_replies_from_user': 70,
                    'number_of_mentorships': 80,
                }
            }, function () {
                this.setState({ fetching_st_data: false },
                    function () {
                        this.props.handleFetchingStDataUpdate(this.state.fetching_st_data)
                    });

                const cert_levels = this.rankUserStData({ stData: this.state.stData })

                this.setState({
                    cert_level_participante: cert_levels.achieved_levels_participante
                });

                if (this.state.stData.number_of_mentorships > 0) {
                    this.props.handleMentorshipUpdate(true)
                    this.setState({
                        cert_level_mentor: cert_levels.achieved_levels_mentor
                    });
                } else {
                    this.props.handleMentorshipUpdate(false)
                }

                this.props.handleCertLevelUpdate({ 'cert_level_participante': cert_levels.achieved_levels_participante, 'cert_level_mentor': cert_levels.achieved_levels_mentor })
            });
        } catch (error) {
            this.setState({
                fetching_state: [this.state.fetching_state[0], ('Erro em: "' + this.state.fetching_state[1] + '"')],
            })
        }
    }

    getCurrentDate() {
        const current_date = new Date().toISOString()
        return {
            date: current_date.split("T")[0],
            year: current_date.substring(0, 4),
            month: current_date.substring(6, 7),
            day: current_date.substring(8, 10)
        }
    }


    componentDidMount() {
        this.setState({ fetching_st_data: true },
            function () {
                this.props.handleFetchingStDataUpdate(this.state.fetching_st_data)
            }
        );
        this.getStData(UserSession.getToken())
        this.setState({ issue_date: this.getCurrentDate() });
    }

    render() {

        return (
            <Box height="fit-content">
                
                <ContentTabs
                    fetching_st_data={this.state.fetching_st_data}
                    fetching_state={this.state.fetching_state}
                    cert_level_participante={this.state.cert_level_participante}
                    cert_level_mentor={this.state.cert_level_mentor}
                    cert_type={this.props.cert_type}
                    has_mentorship={this.props.has_mentorship}
                    issue_date={this.state.issue_date}
                    number_of_projects={this.state.stData.number_of_projects}
                    number_of_missions={this.state.stData.number_of_missions}
                    number_of_divergence_points={this.state.stData.number_of_divergence_points}
                    number_of_convergence_points={this.state.stData.number_of_convergence_points}
                    number_of_conversation_points={this.state.stData.number_of_conversation_points}
                    number_of_replies_from_user={this.state.stData.number_of_replies_from_user}
                    number_of_comment_replies_from_user={this.state.stData.number_of_comment_replies_from_user}
                    number_of_mentorships={this.state.stData.number_of_mentorships}
                    handleTabIndexUpdate={this.handleTabIndexUpdate} // vai ser reaproveitado, precisa de ser refatorado para lidar com progress inicial
                // handleCertTypeUpdate={this.handleCertTypeUpdate}
                />
            </Box>

        );
    }
}

export default MainContent;