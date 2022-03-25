import React from 'react';
import { fetchContributions, fetchDivergenceContents, strateegiaParentComments, fetchParentComments } from "../../api/StrateegiaData";

    function useDiPoints(token, dPoints) {
        const [contents, setdContents] = React.useState([]);

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

        return contents;

    }

const Contribution = ({token, dPoints}) => {

    const contents = useDiPoints(token, dPoints)

    React.useEffect(() => {
        Promise.all(
            contents.map( ct => {
                const {id, tool} = ct;
                tool.questions.map(question => {
                    return fetchParentComments(token, id, question.id)
                    .then(data => console.log(data))
                })     
            })

        )
        // .then(dt => console.log(dt))
    }, [contents]);
    

  return (
    <div>Contribution</div>
  )
};

export default Contribution;