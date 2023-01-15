function commonPart({ objData, targetField, error, msg }) {
    const userData = { ...objData };
    if (error) {
      userData[targetField] = {
        ...userData[targetField],
        error: msg ? msg : "This field should not be left blank",
      };
      return userData;
    }
    userData[targetField] = {
      ...userData[targetField],
      error: "",
    };
  
    return userData;
  }


  export default commonPart