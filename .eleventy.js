module.exports = function(eleventyConfig) {
  // Copy CSS folder to dist
  eleventyConfig.addPassthroughCopy("src/css");

  // Add a passthrough copy for images
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/files");
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "dist"
    }
  };
};
