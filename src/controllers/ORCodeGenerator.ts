require('dotenv').config();
import express from 'express';
import generatePayload from 'promptpay-qr';
import qrcode from 'qrcode';
import fs from 'fs';

export const generator = async (req: express.Request, res: express.Response) => {
    try {
        var mobileNumber:string = req.body.phone || '000-000-0000';
        var IDCardNumber :string = req.body.idcard || '0-0000-00000-00-0';
        var amount:number = req.body.amount || 0;


        const generQRCode = (payload: string) => {
            const options: any = { type: 'svg', color: { dark: '#000', light: '#fff' } };
            qrcode.toString(payload, options, (err, svg) => {
                if (err) return console.log(err)
                fs.writeFileSync(`QRCODE/QRCODE-${Date.now()}.svg`, svg)
            })
        }

        if(mobileNumber != "000-000-0000"){
            console.log(mobileNumber);
            const payload : string = generatePayload(mobileNumber, {amount}) //First parameter : mobileNumber || IDCardNumber
            console.log(payload);
            generQRCode(payload);
            return res.send(payload)
        }else if(IDCardNumber != "0-0000-00000-00-0"){
            console.log(IDCardNumber);
            const payload : string = generatePayload(IDCardNumber, {amount}) //First parameter : mobileNumber || IDCardNumber
            console.log(payload);
            generQRCode(payload);
            return res.send(payload)
        }else{
            return res.send("Please enter mobile number or IDCard number");
        }

    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}