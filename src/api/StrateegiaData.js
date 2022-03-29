import api from './api';

export const strateegiaProjects = async ({ token }) => {
  return new Promise((resolve, reject) => {

    var myHeaders = new Headers();

    const url = 'https://api.strateegia.digital/projects/v1/project'

    myHeaders.set('Authorization', 'Bearer ' + token);
    myHeaders.append('Content-Type', 'application/json')

    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => {
        // console.log(response)
        if (response.ok) {
          console.log('projects capturados com sucesso')
          resolve(response.json());
        } else {
          console.log('projects NÂO capturados:', response)
          reject();
        }
      });
  });
};

export const fetchUserProjects = async (token) => {
  const { data } = await api("/projects/v1/project?size=100", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data;
};

export const fetchProjectById = async (token, id) => {
  const {data} = await api(`/projects/v1/project/${id}`,
  {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${token}`,
  },
})
 return data;
};

export const strateegiaMaps = async (token, mission_id) => {

  const { data } = await api(`/projects/v1/map/${mission_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    return data;
}

export const fetchContributions = async (token, content_id) => {
  const { data } = await api(`/projects/v1/divergence-point/${content_id}/comment/contribution`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    return data;
};

export const fetchDivergenceContents = async (token, content_id) => {
  const { data } = await api(`/projects/v1/divergence-point/${content_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    return data;
};

export const fetchParentComments= async (token, content_id, questionId) => {
  const { data } = await api(`/projects/v1/divergence-point/${content_id}/question/${questionId}/comment`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    return data;
};

export const fetchReplyComments= async (token, questionCommentId) => {
  const { data } = await api(`/projects/v1/question/comment/${questionCommentId}/reply`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    return data;
};