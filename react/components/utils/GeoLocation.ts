/* eslint-disable new-cap */
/* eslint-disable prettier/prettier */

export async function getGeolocationByString(places: string[]) {
  const geocoder = new window.google.maps.Geocoder()

  const geo = await Promise.all(
    places.map(place => {
      return geocoder.geocode({ address: place }, (result: any) => result)
    })
  ).then(results => {
    const geolocation = results.map((result: any) => {
      return {
        lat: result.results[0].geometry.location.lat(),
        lng: result.results[0].geometry.location.lng(),
      }
    })

    return geolocation
  })

  // eslint-disable-next-line no-console
  return geo
}
