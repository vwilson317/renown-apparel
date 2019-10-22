import axios from 'axios';

export enum Api {
    Finding,
    Shopping,
    Trading,
}

const findApiUrl = 'api/finding';
const shoppingApiUrl = 'api/shopping'; // "http://open.api.ebay.com/shopping";
const shoppingApiVersion = 1099; // 1085 doesn't work now wtf
const eBayAppId = 'VincentW-renownap-PRD-0b31f104d-07a63429';

export const getListingItemsByStore = async (pageNum: number, keyWords?: string): Promise<any> => {
    let paramsStr = 'pageNum=' + pageNum ;
    if(keyWords){
        paramsStr +=  "&keywords=" + keyWords;
    }
    const result = await get(Api.Finding, paramsStr);// + "&paginationInput.entriesPerPage=2");
    return result;
};

export const getItemDetails = async (itemIds: string): Promise<any> => {
    const result = await get(Api.Shopping, 'callname=GetMultipleItems&ItemId=' + itemIds);
    return result;
};

export const endListing = async (itemId: string): Promise<any> => {
    const result = await get(Api.Trading, itemId);
    return result;
};

export const setCartStatus = async (itemId: number | undefined, status: boolean): Promise<any> => {
    const result = await axios.request({
        url: 'api/listings',
        method: 'POST',
        params: {
            itemId,
            isInCart: status,
        },
    });
    return result;
};

export const getCartStatus = async (itemId: string): Promise<boolean> => {
    const result = await axios.get('api/listings/cartstatus', {
        params: {
            itemId,
        },
    });
    return result.data;
};

export const get = async (apiType: Api, singleParam: string): Promise<any> => {
    // todo add ebay apis to dev server

    let uri = '';
    if (apiType === Api.Finding) {
        return axios.get(findApiUrl + '?' + singleParam);
    } else if (apiType === Api.Shopping) {
        const str = 'version=' + shoppingApiVersion + '&appid=' + eBayAppId + '&responseencoding=JSON';
        uri = shoppingApiUrl + '?' + str + '&' + singleParam;

        return axios.get(uri);
    } else if (apiType === Api.Trading) {
        const params = {
            EndingReason: 'NotAvailable',
            ItemId: singleParam,
        };

        return axios.get('api/trading', {
            params,
        });
    }
};


