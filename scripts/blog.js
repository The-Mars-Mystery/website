// blog.js - Script to dynamically load blog posts and handle category filtering

document.addEventListener("DOMContentLoaded", () => {
    const blogPostsContainer = document.getElementById("blogPosts");
    const categoryFilter = document.getElementById("categoryFilter");

    // Fetch blog posts from a JSON file
    fetch("/data/blog-posts.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load blog posts");
            }
            return response.json();
        })
        .then(posts => {
            // Render all posts initially
            renderPosts(posts);

            // Add event listener for category filter
            categoryFilter.addEventListener("change", () => {
                const selectedCategory = categoryFilter.value;

                // Filter posts based on selected category
                const filteredPosts = selectedCategory === "all"
                    ? posts
                    : posts.filter(post => post.category === selectedCategory);

                // Re-render posts with the filtered data
                renderPosts(filteredPosts);
            });
        })
        .catch(error => {
            console.error("Error loading blog posts:", error);
            blogPostsContainer.innerHTML = `
                <p class="text-red-500 text-center">
                    Oops! Something went wrong while loading the blog posts. Please try again later.
                </p>
            `;
        });

    // Function to render posts in the blogPosts container
    function renderPosts(posts) {
        blogPostsContainer.innerHTML = posts.length
            ? posts.map(post => `
                <div class="bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition">
                    <h3 class="text-xl font-bold text-orange-500 mb-2">${post.title}</h3>
                    <p class="text-sm text-gray-400 mb-4">${post.date}</p>
                    <p class="text-gray-300">${post.description}</p>
                    <a href="${post.link}" class="btn mt-4 block text-center">Read More</a>
                </div>
            `).join("")
            : `
                <p class="text-gray-400 text-center">
                    No posts available in this category.
                </p>
            `;
    }
});