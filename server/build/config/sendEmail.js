"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendStatusChange = exports.sendConfirmMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendConfirmMail = (to, url, txt, userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tranport = nodemailer_1.default.createTransport({
            service: 'Gmail',
            auth: {
                user: `${process.env.MAIL_USER}`,
                pass: `${process.env.MAIL_PASS}`,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const mailOptions = {
            from: `${process.env.MAIL_USER}`,
            to: to,
            subject: `${txt}`,
            html: ` 
           <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
           <h2 style="text-align: center; text-transform: uppercase;color: black;">Xin Chào ${userName}</h2>
           <p>Nhấn vào nút bên dưới để ${txt} &#9759; của bạn  </p>
           
           <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block; border-radius:3em">${txt}</a>
       
           <p>Nếu nút trên không hoạt động ,vui lòng nhấn vào link bên dưới &#9759;</p>
       
           <a href=${url}>${txt}</a>
           </div>`,
        };
        return yield tranport.sendMail(mailOptions);
    }
    catch (error) {
        throw error;
    }
});
exports.sendConfirmMail = sendConfirmMail;
function sendStatusChange(to, text, content) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tranport = nodemailer_1.default.createTransport({
                service: 'Gmail',
                auth: {
                    user: `${process.env.MAIL_USER}`,
                    pass: `${process.env.MAIL_PASS}`,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
            const mailOptions = {
                from: `${process.env.MAIL_USER}`,
                to: to,
                subject: `${text}`,
                html: ` 
           <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
           <h2 style="text-align: center; text-transform: uppercase;color: black;">Xin Chào ${to}</h2>
           <p>${content}</p>
           </div>`,
            };
            return yield tranport.sendMail(mailOptions);
        }
        catch (error) {
            throw error;
        }
    });
}
exports.sendStatusChange = sendStatusChange;
