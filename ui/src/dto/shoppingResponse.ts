// To parse this data:
//
//   import { Convert, ShoppingResponse } from "./file";
//
//   const shoppingResponse = Convert.toShoppingResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface ShoppingResponse {
    Timestamp: Date;
    Ack:       string;
    Build:     string;
    Version:   string;
    Item:      Item[];
}

export interface Item {
    ItemID:                      string;
    EndTime:                     Date;
    ViewItemURLForNaturalSearch: string;
    ListingType:                 string;
    Location:                    string;
    GalleryURL:                  string;
    PictureURL:                  string[];
    PrimaryCategoryID:           string;
    PrimaryCategoryName:         string;
    BidCount:                    number;
    ConvertedCurrentPrice:       ConvertedCurrentPrice;
    ListingStatus:               string;
    TimeLeft:                    string;
    Title:                       string;
    HitCount:                    number;
    Country:                     string;
    AutoPay:                     boolean;
    ConditionID:                 number;
    ConditionDisplayName:        string;
    ConditionDescription:        string;
}

export interface ConvertedCurrentPrice {
    Value:      number;
    CurrencyID: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toShoppingResponse(json: string): ShoppingResponse {
        return cast(JSON.parse(json), r("ShoppingResponse"));
    }

    public static shoppingResponseToJson(value: ShoppingResponse): string {
        return JSON.stringify(uncast(value, r("ShoppingResponse")), null, 2);
    }
}

function invalidValue(typ: any, val: any): never {
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        var map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        var map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        var l = typs.length;
        for (var i = 0; i < l; i++) {
            var typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(typ: any, val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        var result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(typ, val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "ShoppingResponse": o([
        { json: "Timestamp", js: "Timestamp", typ: Date },
        { json: "Ack", js: "Ack", typ: "" },
        { json: "Build", js: "Build", typ: "" },
        { json: "Version", js: "Version", typ: "" },
        { json: "Item", js: "Item", typ: a(r("Item")) },
    ], false),
    "Item": o([
        { json: "ItemID", js: "ItemID", typ: "" },
        { json: "EndTime", js: "EndTime", typ: Date },
        { json: "ViewItemURLForNaturalSearch", js: "ViewItemURLForNaturalSearch", typ: "" },
        { json: "ListingType", js: "ListingType", typ: "" },
        { json: "Location", js: "Location", typ: "" },
        { json: "GalleryURL", js: "GalleryURL", typ: "" },
        { json: "PictureURL", js: "PictureURL", typ: a("") },
        { json: "PrimaryCategoryID", js: "PrimaryCategoryID", typ: "" },
        { json: "PrimaryCategoryName", js: "PrimaryCategoryName", typ: "" },
        { json: "BidCount", js: "BidCount", typ: 0 },
        { json: "ConvertedCurrentPrice", js: "ConvertedCurrentPrice", typ: r("ConvertedCurrentPrice") },
        { json: "ListingStatus", js: "ListingStatus", typ: "" },
        { json: "TimeLeft", js: "TimeLeft", typ: "" },
        { json: "Title", js: "Title", typ: "" },
        { json: "HitCount", js: "HitCount", typ: 0 },
        { json: "Country", js: "Country", typ: "" },
        { json: "AutoPay", js: "AutoPay", typ: true },
        { json: "ConditionID", js: "ConditionID", typ: 0 },
        { json: "ConditionDisplayName", js: "ConditionDisplayName", typ: "" },
        { json: "ConditionDescription", js: "ConditionDescription", typ: "" },
    ], false),
    "ConvertedCurrentPrice": o([
        { json: "Value", js: "Value", typ: 3.14 },
        { json: "CurrencyID", js: "CurrencyID", typ: "" },
    ], false),
};
