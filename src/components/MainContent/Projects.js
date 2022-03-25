import React from 'react';
import { fetchProjectById } from "../../api/StrateegiaData";
import Points from './Points';

function useProjectsData(token, userId, projects = []) {
    const [{maps, users}, setState] = React.useState({maps: [], users: []});


    React.useEffect(() => {
        Promise.all(
            projects.map(proj => {
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
    }, [projects]);

    return {maps, users};
}

const Projects = ({token, userId, projects = []}) => {

    const {maps, users} = useProjectsData(token, userId, projects);

    return (
        <>
            <p>{projects.length}</p>
            <p>{maps.length}</p>
            <p>{users.length}</p>
            <Points maps={maps} token={token}/>
        </>
    )

};

export default Projects;