import React from 'react';
import { fetchUserProjects, fetchProjectById } from "../../api/StrateegiaData";
import UserSession from '../UserSession';
import Points from './Points';

export function useProjectsData(token, userId) {
    // const token = UserSession.getToken();
    // const userId = UserSession.getId();
    const [usersProjects, setUsersProjects] = React.useState([]);
    const [{maps, users}, setState] = React.useState({maps: [], users: []});

    React.useEffect(() => {
        fetchUserProjects(token).then((data) => {
            const journeys = data.map(dt => dt.projects);
            setUsersProjects(...[journeys.flat()]);
        });
    }, []);


    React.useEffect(() => {
        Promise.all(
            usersProjects.map(proj => {
                return fetchProjectById(token, proj.id)
                .then(data => {
                    // console.log('fetch', data)
                    const {maps, users} = data;
                    const usersMentors = users.filter(user => user.id === userId && (user.project_roles.includes('MENTOR') || user.project_roles.includes('ADMIN')));
                    // console.log('maps', maps, 'users', users)
                    return {maps, users: usersMentors}
                })
            })
        )
        .then(data => {
            const state = data.reduce((acc, value) => ({
                maps: [...acc.maps, ...value.maps],
                users: [...acc.users, ...value.users]
            }), {maps : [], users: []});
            // console.log('2', state);
            setState(state)
        })
        .catch(e => console.log({e}));
        // console.log('1', projectsResult)
    }, [usersProjects]);

    return {usersProjects, maps, users};
}

// const Projects = ({token, userId, projects = []}) => {

//     const {maps, users} = useProjectsData(token, userId, projects);

//     return (
//         <>
//             <p> projects {projects.length}</p>
//             <p> maps {maps.length}</p>
//             <p> users {users.length}</p>
//             <Points maps={maps} token={token}/>
//         </>
//     )

// };

// export default Projects;