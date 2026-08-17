headers: async () => [{
  source: "/(.*)",
  headers: [{
    key: "Content-Security-Policy",
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
  }]
}]