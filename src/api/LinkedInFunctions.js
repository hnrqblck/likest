import api from './LinkedInApi';

export const fetchUser = async () => {
    const { data } = await api("/me", {
      method: "GET",
      mode: 'no-cors',
      headers: {
        Authorization: `Bearer AQUzj1YWVrwdOmYljQ-Gs1ADSZ-0rcKeW8v9yuQIsDeVsGsp3ETCDbvWek1z6g3lQ97VNTbjOmVzerMMbgbmHak1IlmqPZN2zaLhtVSqCOg4-TpVvRbbwhGKTFVrbrd6qM_5xSeDB3SxPdWpXKoxJiI1ger2KkmE-BkZYWYEKO0cEBrqFszA3LutiKSpytd4jy9SEGaERItyXFuza_5GJ3zS56VywmETatbxp8Q74PNhC0mXqMFNGw7Sb-cvUYDTJOdTA9qRQg3tWRjHs4IuQktNm3m9RVTRPtDygy188Ldyi_zqoxqiekKKngWPsHqrh064SLW_zXnDRvJMAhIPrgg4IQBXoA`,
        'Access-Control-Allow-Origin': 'https://api.linkedin.com/v2/me',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      },
    })
    return data;
  };