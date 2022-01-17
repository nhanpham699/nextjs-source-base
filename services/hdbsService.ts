import axios, { AxiosResponse } from "axios";
import {
  ListAccountResponse,
  ListAccountRequest,
} from "interfaces/IListAccount";
import {
  GetMerchantRequest,
  GetMerchantResponse,
} from "interfaces/IGetMerchant";
import {
  CheckUserENCYRequest,
  CheckUserEKYCResponse,
} from "interfaces/ICheckUserEKYS";
import { InquiryEKYCPresentResponse } from "interfaces/IInquiryEKYCPresent";

import { v4 as uuidv4 } from "uuid";
import _get from "lodash/get";
import {
  ConfirmEKYCRequest,
  ConfirmEKYCResponse,
} from "interfaces/IConfirmEKYCPresent";
import {
  UpdateTokenKeyPartnerRequest,
  UpdateTokenKeyPartnerResponse,
} from "interfaces/IUpdateTokenKeyPartner";

function generateBodyRequest<T>(key: string, body: T) {
  return {
    [key]: {
      header: {
        common: {
          serviceVersion: "1",
          messageId: "",
          transactionId: "",
          messageTimestamp: "",
        },
        client: {
          sourceAppID: "IB",
          targetAppIDs: ["ESB"],
          userDetail: {
            userID: "DTC",
            userPassword: "RFRDMTIz",
          },
        },
      },
      bodyReq: {
        functionCode: "HDB2C-INQUIRYEKYCPRESENT-JDBC-ECRM",
        data: body,
      },
    },
  };
}

export const getListAccountApi = async (clientNo: string) => {
  const body: ListAccountRequest = {
    requestId: uuidv4() as string,
    data: {
      clientNo,
    },
  };
  const resp: AxiosResponse<ListAccountResponse> = await axios.post(
    "/api/getAccountByCif",
    body
  );
  return resp;
};

export const getMerchant = async () => {
  const body: GetMerchantRequest = {
    partnerKey: "123",
    partnetId: "hdbs",
  };

  const resp: AxiosResponse<GetMerchantResponse> = await axios.post(
    "/api/getMerchant",
    body,
    generateBodyRequest("getMerchantReq", body)
  );
  return resp.data;
};

export const checkUserEKYC = async () => {
  const body: CheckUserENCYRequest = {
    userId: "userId",
    clientNo: "clientNo",
    partnetId: "hdbs",
  };
  const resp: AxiosResponse<CheckUserEKYCResponse> = await axios.post(
    "/api/checkUserEKYC",
    generateBodyRequest("checkUserEkycReq", body)
  );
  return resp.data;
};

export const inquiryEKYCPresent = async () => {
  const body: any = {};
  const resp: AxiosResponse<InquiryEKYCPresentResponse> = await axios.post(
    "/api/inquiryEKYCPresent",
    generateBodyRequest("inquiryEkycPresentReq", body)
  );
  return resp.data;
};

export const confirmEKYCPresent = async (otp: string) => {
  const body: ConfirmEKYCRequest = {
    requestId: uuidv4() as string,
    accountOtp: otp,
    partnetId: "hdbs",
  };
  const resp: AxiosResponse<ConfirmEKYCResponse> = await axios.post(
    "/api/confirmEKYCPresent",
    generateBodyRequest("checkUserEkycReq", body)
  );
  return resp.data;
};

export const updateTokenKeyPartner = async () => {
  const body: UpdateTokenKeyPartnerRequest = {
    userId: "0915423641",
    clientNo: "02887123",
    token: "token",
    partnerId: "hdbs",
  };
  const resp: AxiosResponse<UpdateTokenKeyPartnerResponse> = await axios.post(
    "/api/updateTokenKeyPartner",
    body
  );
  return resp.data;
};