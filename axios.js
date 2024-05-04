const axios = require("axios");

async function fetchAndLogPostsAxios() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts = response.data.slice(0, 10);
    posts.forEach((post) => {
      const truncatedText = post.body.split("").slice(0, 10).join("");
      console.log(`Post ${post.id}: ${truncatedText}...`);
    });
  } catch (error) {
    console.error("An error occurred", error);
  }
}

module.exports = fetchAndLogPostsAxios;
