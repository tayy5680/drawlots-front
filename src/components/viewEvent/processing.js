

const activityId = import.meta.env.VITE_ACTIVITY_ID

export const getToken = (userToken) =>{
  let token = ''
  switch(activityId) {
    case '2022Kaohsiunggogo':
      token = userToken ? userToken[0] ?? '' : ''
      break
    case '2022Philippines':
      token = userToken ? userToken['access_token'] ?? '' : ''
      break
  }
  return token
}
