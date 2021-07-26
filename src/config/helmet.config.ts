export const helmetConfig = {
   contentSecurityPolicy: {
      directives: {
         defaultSrc: [`'self'`],
         imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
         scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
         styleSrc: [`'self'`, `'unsafe-inline'`],
      },
   },
};
