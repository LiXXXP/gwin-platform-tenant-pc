import { Request, Response } from '@gwin/networking'

export class SubjectListApi {
  async UserRelatedSubjectListInquiry(params: object): Promise<Response> {
    // 企业列表
    const request = new Request({
      url: '/cif/v1/UserRelatedSubjectListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}

export default new SubjectListApi()
