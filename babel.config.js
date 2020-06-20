module.exports = {
    presets: [
                // "es2015", "stage-0" 
               '@babel/preset-env'
            ],
    plugins: [
        ["@babel/plugin-proposal-class-properties"],
        ["babel-plugin-module-resolver", {
            "alias": {
            "@": "./"
            }
        }]
    ]
}