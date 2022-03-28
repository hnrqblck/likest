import React from 'react';
import { fetchContributions, fetchDivergenceContents, fetchParentComments, fetchReplyComments } from "../../api/StrateegiaData";
import UserSession from '../UserSession';

    export function useDiPoints(token, dPoints) {
        const userId = UserSession.getId();

        const [contents, setdContents] = React.useState([]);
        const [allReplies, setAllReplies] = React.useState([]);
        const [userReplies, setUserReplies] = React.useState([]);
        const [userComments, setUserComments] = React.useState([]);


        React.useEffect(() => {
            Promise.all(
                dPoints.map(point => {
                    return fetchContributions(token, point.id)
                    .then(data => {
                        const { has_contributed } = data;
                        const divCont = has_contributed === true ? fetchDivergenceContents(token, point.id).then(content => content) : '';
                        return divCont;
                    })      
                })
            )
            .then(data => {
                const filteredData = data.filter(value => value)
                setdContents(filteredData);
            })
        }, [dPoints]);

        React.useEffect(() => {
            const qt = contents.map( ct => {
                const { id, tool } = ct;
                let { questions } = tool;
                let qtArr = [];
                const qtObj = Object.create(null);
                questions.map(question => {
                    const questionId = question.id;
                    qtObj.obj = {id, questionId};
                    qtArr.push('contentId', id, 'questionId', questionId);
                })
                // console.log(qtObj)
                return qtObj;
            });
            
    
            Promise.all(
                qt.map(question =>  {
                    return fetchParentComments(token, question.obj.id, question.obj.questionId)
                    .then(({ content }) => {
                        return content;
                    });
                }))
                .then(data => {
                const stReplies = data.reduce((acc, value) => {return [...acc, ...value]}, []);
                const userStReplies = stReplies.filter(value => value.author.id === userId);
                setAllReplies(stReplies);
                setUserReplies(userStReplies);
            });
        }, [contents]);

        React.useEffect(() => {
            Promise.all(
                allReplies.map(reply => {
                    return fetchReplyComments(token, reply.id)
                    .then(({content}) => {
                        const userQuestionComments = content.filter(ct => ct.author.id === userId);
                        return userQuestionComments;
                    })
                })
            )
            .then(data => {
                const filterData = data.filter(value => value.length > 0);
                const userCommentReplies = filterData.reduce((acc, value) => {return [...acc, ...value]}, []);
                setUserComments(userCommentReplies);
            })
        }, [allReplies]);

        return {userComments, userReplies};

    }

// const Contribution = ({token, dPoints}) => {
    

//     const { userComments, userReplies } = useDiPoints(token, dPoints)
    

    
        

    

//   return (
//     <>
//         <p>replies {userReplies.length}</p>
//         <p>comments {userComments.length}</p>
//     </>
//   )
// };

// export default Contribution;