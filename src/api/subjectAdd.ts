import { Request, Response } from '@gwin/networking'

export class SubjectAddApi {
  async SubjectAddition(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectAddition',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}

export default new SubjectAddApi()
