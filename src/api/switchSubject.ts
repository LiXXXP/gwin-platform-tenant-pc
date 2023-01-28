import { Request, Response } from '@gwin/networking'

export class SwitchSubjectApi {
  // 切换企业
  async SubjectDefaultSignInMaintenance(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectDefaultSignInMaintenance',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}

export default new SwitchSubjectApi()
