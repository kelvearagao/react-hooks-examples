const proxy = require("http-proxy-middleware")

module.exports = function(app) {
  // redireciona tudo q tiver '/api-proxy' para a propria api do mock-server
  app.use(
    proxy("/api-proxy", {
      target: "http://localhost:3001",
      pathRewrite: {
        "^/api-proxy": ""
      }
    })
  )

  // tudo que passar por '/proxy' é gravado pelo mock-server
}
