import axios from 'axios'

const form = document.querySelector('form')! as HTMLFormElement
const addressInput = document.getElementById('address')! as HTMLInputElement
const GOOGLE_API = 'AIzaSyAp3-oczu3FXp0IYmEwPmhNged7_n6shq8'

type GoogleGeoCodeResponse = {
  results: {
    geometry: {
      location: {
        lat: number,
        lng: number
      }
    }
  }[],
  status: 'OK' | 'ZERO_RESULTS'
}

function searchAddressHandler(event: Event) {
  event.preventDefault()
  const enteredAddress = addressInput.value

  axios
    .get<GoogleGeoCodeResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API}`
    ).then(
      response => {
        const coordinates = response.data.results[0].geometry.location
        console.warn(coordinates)
        const map = new google.maps.Map(
          document.getElementById('map') as Element,
          {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
          });

        new google.maps.Marker({ position: coordinates, map })
      }
    ).catch(
      error => console.error(error)
    )
}

form.addEventListener('submit', searchAddressHandler)