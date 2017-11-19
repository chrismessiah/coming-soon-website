'use strict';

const fs = require('fs');
let sendgrid = require("sendgrid")(process.env.SENDGRID_KEY);

module.exports = (filepath, data) => {
  if (!data || !data.reciever || !data.subject || !data.subs) {
    console.log(data);
    throw 'Missing stuff in send-mail!';
  }


  let template = fs.readFileSync(filepath, 'utf8');
  for (let key in data.subs) {
    let regex = new RegExp(`{{${key}}}`, 'g');
    template = template.replace(regex, data.subs[key]);
  }


  var request = sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [ { email: data.reciever } ],
          subject: data.subject,
        }
      ],
      from: {email: 'noreply@tindhair-api.com'},
      content: [ { type: 'text/html', value:  template } ],
    }
  });

  sendgrid.API(request, (error, response) => {
    if (error) {
      console.log('Error response received');
      throw err;
    }
  });
}
