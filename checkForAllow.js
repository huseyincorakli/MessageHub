require("dotenv").config();
const allowed_domains = process.env.ALLOWED_DOMAINS;
const domains = allowed_domains.split(",");

const CheckForAllow = (url) => {
  for (let i = 0; i < domains.length; i++) {
    if (url == domains[i]) {
      return true;
    }
  }
};
module.exports = CheckForAllow;
