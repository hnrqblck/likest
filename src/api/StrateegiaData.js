// import UserSession from "../components/UserSession";
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
















export const fetchProjectsById = async ({ token, project_id }) => {
  return new Promise((resolve, reject) => {

    var myHeaders = new Headers();

    const url = 'https://api.strateegia.digital/projects/v1/project/' + project_id

    myHeaders.set('Authorization', 'Bearer ' + token);
    myHeaders.append('Content-Type', 'application/json')

    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => {
        if (response.ok) {
          // console.log('missions capturadas com sucesso')
          resolve(response.json());
        } else {
          console.log('missions NÂO capturadas:', response)
          reject();
        }
      });
  });
};

export const strateegiaParentComments = async (token, content_id, question_id) => {
  return new Promise((resolve, reject) => {

    var myHeaders = new Headers();

    const url = 'https://api.strateegia.digital/projects/v1/divergence-point/' + content_id + '/question/' + question_id + '/comment'

    myHeaders.set('Authorization', 'Bearer ' + token);
    myHeaders.append('Content-Type', 'application/json')

    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => {
        if (response.ok) {
          // console.log('parent comments capturados com sucesso')
          resolve(response.json());
        } else {
          console.log('parent comments NÂO capturados:', response)
          reject();
        }
      });
  });
};

export const strateegiaHasContribution = async ({ token, content_id }) => {
  return new Promise((resolve, reject) => {

    var myHeaders = new Headers();

    const url = 'https://api.strateegia.digital/projects/v1/divergence-point/' + content_id + '/comment/contribution'

    myHeaders.set('Authorization', 'Bearer ' + token);
    myHeaders.append('Content-Type', 'application/json')

    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => {
        if (response.ok) {
          // console.log('contributions capturadas com sucesso')
          resolve(response.json());
        } else {
          console.log('contributions NÂO capturadas:', response)
          reject();
        }
      });
  });
};

export const strateegiaCommentReplies = async ({ token, question_comment_id }) => {
  return new Promise((resolve, reject) => {

    var myHeaders = new Headers();

    const url = 'https://api.strateegia.digital/projects/v1/question/comment/' + question_comment_id + '/reply'

    myHeaders.set('Authorization', 'Bearer ' + token);
    myHeaders.append('Content-Type', 'application/json')

    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => {
        if (response.ok) {
          // console.log('replies capturadas com sucesso')
          resolve(response.json());
        } else {
          console.log('replies NÂO capturadas:', response)
          reject();
        }
      });
  });
};

export const strateegiaContents = async ({ token, content_id }) => {
  return new Promise((resolve, reject) => {

    var myHeaders = new Headers();

    const url = 'https://api.strateegia.digital:443/projects/v1/divergence-point/' + content_id

    myHeaders.set('Authorization', 'Bearer ' + token);
    myHeaders.append('Content-Type', 'application/json')

    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => {
        if (response.ok) {
          // console.log('content capturado com sucesso')
          resolve(response.json());
        } else {
          console.log('content NÂO capturado:', response)
          reject();
        }
      });
  });
};

export const strateegiaConvergencePoints = async ({ token, mission_id }) => {
  return new Promise((resolve, reject) => {

    var myHeaders = new Headers();

    const url = 'https://api.strateegia.digital:443/projects/v1/mission/' + mission_id + '/convergence-point'

    myHeaders.set('Authorization', 'Bearer ' + token);
    myHeaders.append('Content-Type', 'application/json')

    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => {
        if (response.ok) {
          // console.log('convergence points da missão capturados com sucesso')
          resolve(response.json());
        } else {
          console.log('convergence points da missão NÂO capturados:', response)
          reject();
        }
      });
  });
};

export const strateegiaCheckPoints = async ({ token, mission_id }) => {
  return new Promise((resolve, reject) => {

    var myHeaders = new Headers();

    const url = 'https://api.strateegia.digital:443/projects/v1/mission/' + mission_id + '/checkpoint'

    myHeaders.set('Authorization', 'Bearer ' + token);
    myHeaders.append('Content-Type', 'application/json')

    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => {
        if (response.ok) {
          // console.log('checkpoints da missão capturados com sucesso')
          resolve(response.json());
        } else {
          console.log('checkpoints da missão NÂO capturados:', response)
          reject();
        }
      });
  });
};

export const strateegiaComments = async ({ token, content_id }) => {
  return new Promise((resolve, reject) => {

    var myHeaders = new Headers();

    const url = 'https://api.strateegia.digital:443/projects/v1/content/' + content_id

    myHeaders.set('Authorization', 'Bearer ' + token);
    myHeaders.append('Content-Type', 'application/json')

    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => {
        if (response.ok) {
          // console.log('comentários do conteúdo capturados com sucesso')
          resolve(response.json());
        } else {
          console.log('comentários do conteúdo NÂO capturados:', response)
          reject();
        }
      });
  });
};


