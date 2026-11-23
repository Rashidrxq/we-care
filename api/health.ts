import { bookingEnabled } from './_lib/db'
import { secureResponse, type ApiRequest, type ApiResponse } from './_lib/http'

export default function handler(_request: ApiRequest, response: ApiResponse) {
  secureResponse(response)
  response.status(200).json({
    service: 'we-care-appointments',
    mode: bookingEnabled() ? 'database-enabled-demo' : 'browser-only-demo',
    realPatientsAccepted: false,
    databaseConnected: bookingEnabled(),
  })
}
