const nodemailer = require("nodemailer");
const otpvalue = require("./RandomOtpGenerator");

const sendmail = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.sendmail_gmail,
      pass: process.env.sendmailapp_pass,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.sendmail_gmail,
    to: email,
    subject: "verify your email",
    html: ` <div className="flex items-center justify-center flex-col mt-5">
      <section className="max-w-2xl mx-auto bg-white">
        <header className="py-8 flex justify-center w-full">
          <a href="#">
           MyShop Ecommerce
          </a>
        </header>
        <div className="h-[200px] bg-[#365CCE] w-full text-white flex items-center justify-center flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-white"></div>
            <EmailIcon />
            <div className="w-10 h-[1px] bg-white"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-center text-sm sm:text-xl tracking-widest font-normal">
              THANKS FOR SIGNING UP!
            </div>
            <div className="text-xl sm:text-3xl tracking-wider font-bold capitalize">
              Verify your E-mail Address
            </div>
          </div>
        </div>
        <main className="mt-8 px-5 sm:px-10">
          <h2 className="text-gray-700 ">Hello ${name}</h2>
          <p className="mt-2 leading-loose text-gray-600 ">
            Please use the following One Time Password(OTP)
          </p>
          <p className="mt-2 text-gray-600 text-semibold text-3xl">${otpvalue}</p>
          <p className="mt-4 leading-loose text-gray-600">
            This passcode will only be valid for the next
            <span className="font-bold"> 2 minutes</span> 
          </p>
         
          <p className="mt-8 text-gray-600">
            Thank you, <br />
            The MyShop Team
          </p>
        </main>
        
      
      </section>
    </div>`,
  });
};

module.exports = sendmail;
