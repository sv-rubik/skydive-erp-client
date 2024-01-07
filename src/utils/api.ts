import { Rig, AAD } from './types'

interface ApiOptions {
  baseUrl: string;
  headers: Record<string, string>;
}

class Api {
  private _url: string;
  private _headers: Record<string, string>;

  constructor(options: ApiOptions) {
    this._url = options.baseUrl
    this._headers = options.headers
  }

//to avoid double-coding in methods below // TODO type
  _handleServerResponse(res: Response): Promise<any> {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`There is following server error: ${res.status}`)
    }
  }

  getRigsData(): Promise<Rig[]> {
    return fetch(`${this._url}rigs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${ localStorage.getItem('token') }`,
      }
    })
      .then(res => this._handleServerResponse(res) as Promise<Rig[]>)
  }

  getAADsData(): Promise<AAD[]> {
    return fetch(`${this._url}aads`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${ localStorage.getItem('token') }`,
      }
    })
      .then(res => this._handleServerResponse(res) as Promise<AAD[]>)
  }

  //
  // getUserData() {
  //   return fetch(`${this._url}users/me`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // authorization: `Bearer ${ localStorage.getItem('token') }`,
  //     }
  //   })
  //     .then(res => {return this._handleServerResponse(res)})
  // }
  //
  // sendUserData(profileInputsData) {
  //   return fetch(`${this._url}users/me`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authorization: `Bearer ${ localStorage.getItem('token') }`,
  //     },
  //     body: JSON.stringify({
  //       name: profileInputsData.name,
  //       about: profileInputsData.about })
  //   })
  //     .then(res => {return this._handleServerResponse(res)})
  // }
  //
  createRig(props: Rig){
    const {
      rigNumber,
      rigName,
      rigSize,
      rigType,
      rigSerial,
      rigDOM,
      rigDescription,
      container,
    } = props;

    return fetch(`${this._url}rigs`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({
        rigNumber,
        rigName,
        rigSize,
        rigType,
        rigSerial,
        rigDOM,
        rigDescription,
        container,
      }),
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  createAAD(props: AAD){
    const {
      aadSerial,
      aadManufacturer,
      aadType,
      aadDOM,
      aadDueService,
      aadFinal,
      jumps,
      rig,
    } = props;

    return fetch(`${this._url}aads`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({
        aadSerial,
        aadManufacturer,
        aadType,
        aadDOM,
        aadDueService: aadDueService !== "" ? aadDueService : null,
        aadFinal: aadFinal !== "" ? aadFinal : null,
        jumps,
        rig: rig !== "" ? rig : null,
      }),
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  deleteRig(rigId: string):Promise<any>{
    return fetch(`${this._url}rigs/${rigId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  deleteAAD(aadId: string):Promise<any>{
    return fetch(`${this._url}aads/${aadId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  updateRigData(props: Rig) {
    const {
      rigNumber,
      rigName,
      rigSize,
      rigType,
      rigSerial,
      rigDOM,
      rigDescription,
      container,
    } = props;
    return fetch(`${this._url}rigs/${props._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({
        rigNumber,
        rigName,
        rigSize,
        rigType,
        rigSerial,
        rigDOM,
        rigDescription,
        container,
      }),
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  updateAADData(props: AAD) {
    const {
      aadSerial,
      aadManufacturer,
      aadType,
      aadDOM,
      aadDueService,
      aadFinal,
      jumps,
      rig,
    } = props;
    return fetch(`${this._url}aads/${props._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({
        aadSerial,
        aadManufacturer,
        aadType,
        aadDOM,
        aadDueService: aadDueService !== "" ? aadDueService : null,
        aadFinal: aadFinal !== "" ? aadFinal : null,
        jumps,
        rig: rig !== "" ? rig : null,
      }),
    })
      .then(res => {return this._handleServerResponse(res)})
  }
}

////// TODO
export const api = new Api({
  baseUrl: 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json'
  }
})
