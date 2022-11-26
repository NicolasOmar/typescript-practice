let logged

const sendAnalytics = (data: string): void => {
  console.log(data)
  logged = true
}

sendAnalytics('Sending to the server...')