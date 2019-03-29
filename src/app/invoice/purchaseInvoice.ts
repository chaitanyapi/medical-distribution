export class purchaseInvoice{
COMPANYCODE: string;
COMPANYNAME: string;
RECEIPTDATE : Date;
INVOICENUMBER : string;
REFINVOICENUMBER : string;
DETAILS : [{
    PRODUCTCODE: string;
    PRODUCTNAME: string;
    PACK: number;
    BATCHNO: string;
    SRATE: number;
    RATE: number;
    RECEIPT: number;
    FREE: number;
    PRATE: number;
    MRP: number;
    EXPIRYDATE: Date;      
    NOTE: string;
    PCN: number;
    MANUFACTURER: string;
    BPAK: number;
    OFPN: number;
    NRATE: number;
    TAX: number;
    DISCOUNT: number;
    DISCOUNTVALUE: number;
    NET: number;
}]
}