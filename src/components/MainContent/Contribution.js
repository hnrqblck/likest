import React from 'react';
import { fetchContributions, fetchDivergenceContents, strateegiaParentComments, fetchParentComments } from "../../api/StrateegiaData";
import UserSession from '../UserSession';

    function useDiPoints(token, dPoints) {
        const userId = UserSession.getId();

        const [contents, setdContents] = React.useState([]);
        const [allReplies, setAllReplies] = React.useState([]);
        const [userReplies, setUserReplies] = React.useState([]);


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
            console.log(allReplies);
        }, [allReplies]);

        return {contents, allReplies, userReplies};

    }

const Contribution = ({token, dPoints}) => {
    

    const {contents, allReplies, userReplies} = useDiPoints(token, dPoints)
    

    
        

    

  return (
    <div>{userReplies.length}</div>
  )
};

export default Contribution;