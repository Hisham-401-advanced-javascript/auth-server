'use strict';

module.exports = (capability)=> {
  return (req, res, next) => {
    // Previous Middleware will send us the user Object
    // req.user.capabilites => includes this capability

    // if (indexOf(req.user.capabilites) != -1)
    console.log('req.user.capabilites >>>>>>> ',req.user);
    console.log('req.user.capabilites >>>>>>> ',req.user.capabilities);
    try {
      console.log('req.user.capabilites >>>>>>>> ',req.user.capabilities);
      if (req.user.capabilities.includes(capability)) {
        console.log('truee');
        next();
      } else {
        next('Access Denied');
      }
    } catch(e) {
      // report an error
      next('Invalid Login');
    }
  };

};
