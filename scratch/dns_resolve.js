const dns = require('dns');

console.log("Looking up host...");
dns.lookup('vtuwise.r4r4ppu.mongodb.net', (err, address, family) => {
  if (err) {
    console.error("DNS lookup failed:", err.message);
  } else {
    console.log("DNS lookup succeeded:", address, family);
  }
});

