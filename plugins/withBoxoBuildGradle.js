const { withProjectBuildGradle } = require('@expo/config-plugins');

const boxo_allprojects_block = `
allprojects {
    repositories {
        maven { url "https://jitpack.io" }
        maven {
             url "https://maven.pkg.github.com/Appboxo/android-sdk-packages"
             credentials {
                 username = "appboxoandroidsdk"
                 password = "\u0037\u0039\u0064\u0031\u0065\u0064\u0061\u0036\u0030\u0034\u0063\u0061\u0031\u0066\u0030\u0032\u0066\u0031\u0037\u0066\u0032\u0061\u0039\u0033\u0064\u0035\u0039\u0039\u0061\u0035\u0035\u0062\u0066\u0065\u0031\u0064\u0066\u0064\u0038\u0038"
             }
        }
    }
}
`;

module.exports = (config) => {
  return withProjectBuildGradle(config, (config) => {
    config.modResults.contents += boxo_allprojects_block;
    return config;
  });
};