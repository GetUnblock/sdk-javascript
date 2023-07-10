import { UserSessionData } from '../definitions';
import { Chain } from '../enums/Chain';

/** Request dto */
export type GetUserOfframpAddressRequest = UserSessionData & { chain: Chain };

/** Response dto */
export type GetUserOfframpAddressResponse = { message: string; addresses: string[] };

/** GetUnblock API response data */
export type GetUserOfframpAddressResponseData = { message: string; addresses: string[] };
