import React from 'react';
import { strateegiaMaps } from "../../api/StrateegiaData";
import Contribution from './Contribution';

function useMapsData(token, maps = []) {
  const [{divergencePoints, convergencePoints, conversationPoints}, setState] = React.useState(
    {
      divergencePoints: [],
      convergencePoints: [],
      conversationPoints: []
    });

    React.useEffect(() => {
      Promise.all(
        maps.map(mp => {
          return strateegiaMaps(token, mp.id)
            .then(data => {
              const { points } = data;
              const dPoints = points.filter(point => point.point_type === 'DIVERGENCE')
              const cgPoints = points.filter(point => point.point_type === 'CONVERGENCE');
              const cvPoints = points.filter(point => point.point_type === 'CONVERSATION');
              // console.log(points);
              return {divergencePoints: dPoints, convergencePoints: cgPoints, conversationPoints: cvPoints};
            })
        })
      )
      .then(data => {
        const points = data.reduce((acc, value) => ({
          divergencePoints: [...acc.divergencePoints, ...value.divergencePoints],
          convergencePoints: [...acc.convergencePoints, ...value.convergencePoints],
          conversationPoints: [...acc.conversationPoints, ...value.conversationPoints],
        }), {divergencePoints : [], convergencePoints: [], conversationPoints: []});
        setState(points);
      })
      .catch(e => console.log(e))

    }, [maps]);

    return {divergencePoints, convergencePoints, conversationPoints};

}

const Points = ({token, maps}) => {

  const {divergencePoints, convergencePoints, conversationPoints} = useMapsData(token, maps);

  return (
    <>
      <p>{divergencePoints.length}</p>
      <p>{convergencePoints.length}</p>
      <p>{conversationPoints.length}</p>
      <Contribution dPoints={divergencePoints} token={token}/>
    </>
  )
};

export default Points;