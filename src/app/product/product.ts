export class Products {
    _id:string;
    PRODPIC : string;
    PRODCODE: string;
    PRODNAME: string;
    PRODPACK: string;
    CQTY: number;
    BPAK: string;
    COMPANYCODE: string;
    COMPANYNAME: string;
    TAX: number;
    SRATE: number;
    RATE: number;
    PRATE: number;
    MRP: number;
    OFPN: number;
    PEDT: Date;
    fileName : string; // This field is not present in the database. but placed to accomodate filename for storing image into DB

}
