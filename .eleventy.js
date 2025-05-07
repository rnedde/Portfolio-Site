module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
  
    return {
      dir: {
        input: "src",
        includes: "_includes",
        output: "dist"
      }
      
    };
  };
  module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/images");
    return {
      dir: {
        input: "src",
        output: "dist"
      }
    };
  };
  