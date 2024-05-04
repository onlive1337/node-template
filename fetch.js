const fetch = require("node-fetch");

async function fetchAndLogPostsFetch() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    const truncatedPosts = posts.slice(0, 10);
    truncatedPosts.forEach((post) => {
      const truncatedText = post.body.split("").slice(0, 20).join("");
      console.log(`Post ${post.id}: ${truncatedText}...`);
    });
  } catch (error) {
    console.error("An error occured", error);
  }
}

module.exports = fetchAndLogPostsFetch;
