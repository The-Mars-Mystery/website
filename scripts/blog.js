// Example blog posts in JSON format
const blogPosts = [
    {
        title: "Getting Started with Graphics",
        category: "graphics",
        date: "2024-11-01",
        content: `
### Learn How to Design Like a Pro
Discover the best tools and techniques for creating stunning visuals in no time.
        `
    },
    {
        title: "Top 5 Coding Templates",
        category: "templates",
        date: "2024-10-15",
        content: `
#### Save Time with These Templates
From landing pages to full websites, here are the top 5 templates to boost your project.
        `
    },
    {
        title: "CSS Tips for Beginners",
        category: "guides",
        date: "2024-09-20",
        content: `
#### Enhance Your Web Styling
Start your journey with these essential CSS tips and tricks.
        `
    }
];

const postsContainer = document.getElementById("blog-posts");
const categoryFilter = document.getElementById("category-filter");

// Function to render blog posts
function renderPosts(filter = "all") {
    postsContainer.innerHTML = "";

    const filteredPosts = blogPosts.filter(
        post => filter === "all" || post.category === filter
    );

    filteredPosts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "bg-gray-800 p-6 rounded shadow-lg";

        postElement.innerHTML = `
            <h2 class="text-xl font-bold text-cyan-400">${post.title}</h2>
            <p class="text-gray-400 text-sm">${new Date(post.date).toLocaleDateString()}</p>
            <div class="mt-4 text-gray-300">${marked(post.content)}</div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Event listener for filtering
categoryFilter.addEventListener("change", (e) => {
    renderPosts(e.target.value);
});

// Initial rendering of posts
renderPosts();