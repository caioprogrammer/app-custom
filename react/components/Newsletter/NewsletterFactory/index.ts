// import { slugify } from '../../utils/slugify'
export type newsletterData = {
  name: string
  email: string
  cel: string
}
export const newsletterFactory = function () {
  return {
    send: (data: newsletterData) => {
      if (!data) {
        throw Error('Data not defined to newsletterFactory')
      }
      return new Promise(function () {

        fetch(`/api/dataentities/PH/documents`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            Accept: 'application/vnd.vtex.ds.v10+json',
            'Content-Type': 'application/json',
          },
        })
          .then(function () {
            fetch(`https://api.rd.services/platform/conversions?api_key=08fd99b7cca9605662afaddf473877a1`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(
                {
                  "event_type": "CONVERSION",
                  "event_family": "CDP",
                  "payload": {
                    "conversion_identifier": "assine-newsletter",
                    "name": data.name,
                    "email": data.email,
                    "mobile_phone": data.cel
                  }
                }
              )
            })
          })
      })
    },
  }
}
