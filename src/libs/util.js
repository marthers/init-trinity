
export const getToken = () => {
    const token = localStorage.getItem('Trinity-Token')
    if (token) return token
    else return false
  }