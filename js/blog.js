// Blog post listing and markdown rendering

document.addEventListener('DOMContentLoaded', function() {
  const blogContainer = document.getElementById('blog-container');
  
  if (!blogContainer) return;

  // Check if we're viewing a specific post
  const urlParams = new URLSearchParams(window.location.search);
  const postParam = urlParams.get('post');

  if (postParam) {
    // Load and render individual post
    loadPost(postParam);
  } else {
    // Load and display blog listing
    loadBlogList();
  }

  function loadBlogList() {
    // List of blog posts (you can manually maintain this or fetch from GitHub API)
    // For now, we'll try to fetch from a posts list or use a predefined list
    const posts = [
      // This will be populated by scanning the blog/posts/ directory
      // For GitHub Pages, we can use the GitHub API or maintain a list
    ];

    // Try to get posts from a manifest file or use GitHub API
    fetchBlogPosts()
      .then(posts => {
        if (posts.length === 0) {
          blogContainer.innerHTML = '<p>No blog posts available yet. Check back soon!</p>';
          return;
        }

        renderBlogList(posts);
      })
      .catch(error => {
        console.error('Error loading blog posts:', error);
        blogContainer.innerHTML = '<p>Error loading blog posts. Please try again later.</p>';
      });
  }

  function fetchBlogPosts() {
    // For GitHub Pages, we can use the GitHub API to list files
    // Or maintain a simple JSON manifest
    return fetch('data/blog-manifest.json')
      .then(response => {
        if (!response.ok) {
          // If manifest doesn't exist, return empty array
          return { posts: [] };
        }
        return response.json();
      })
      .then(data => data.posts || [])
      .catch(() => {
        // If fetch fails, return empty array
        return [];
      });
  }

  function renderBlogList(posts) {
    const blogList = document.createElement('div');
    blogList.className = 'blog-list';

    // Sort posts by date (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.date || a.filename);
      const dateB = new Date(b.date || b.filename);
      return dateB - dateA;
    });

    posts.forEach(post => {
      const postPreview = document.createElement('div');
      postPreview.className = 'blog-post-preview';
      postPreview.addEventListener('click', () => {
        window.location.href = `blog.html?post=${encodeURIComponent(post.filename)}`;
      });

      const postTitle = document.createElement('h3');
      postTitle.textContent = post.title || post.filename.replace('.md', '');

      const postDate = document.createElement('div');
      postDate.className = 'date';
      if (post.date) {
        postDate.textContent = new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }

      const postExcerpt = document.createElement('p');
      postExcerpt.textContent = post.excerpt || 'Click to read more...';

      postPreview.appendChild(postTitle);
      if (post.date) {
        postPreview.appendChild(postDate);
      }
      postPreview.appendChild(postExcerpt);

      blogList.appendChild(postPreview);
    });

    blogContainer.appendChild(blogList);
  }

  function loadPost(filename) {
    // Fetch markdown file from blog/posts/ directory
    const markdownUrl = `blog/posts/${filename}`;
    
    fetch(markdownUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Post not found');
        }
        return response.text();
      })
      .then(markdown => {
        renderPost(markdown, filename);
      })
      .catch(error => {
        console.error('Error loading post:', error);
        blogContainer.innerHTML = `
          <div class="blog-content">
            <p>Error loading blog post. Please try again later.</p>
            <a href="blog.html" class="back-link">← Back to Blog</a>
          </div>
        `;
      });
  }

  function renderPost(markdown, filename) {
    // Check if marked.js is loaded
    if (typeof marked === 'undefined') {
      blogContainer.innerHTML = `
        <div class="blog-content">
          <p>Markdown parser not loaded. Please refresh the page.</p>
          <a href="blog.html" class="back-link">← Back to Blog</a>
        </div>
      `;
      return;
    }

    // Parse frontmatter if present
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);
    
    let frontmatter = {};
    let content = markdown;
    
    if (match) {
      const frontmatterText = match[1];
      content = match[2];
      
      // Parse frontmatter (simple key-value parser)
      frontmatterText.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim();
          const value = line.substring(colonIndex + 1).trim();
          frontmatter[key] = value;
        }
      });
    }

    // Convert markdown to HTML
    const html = marked.parse(content);

    // Create blog content container
    const blogContent = document.createElement('div');
    blogContent.className = 'blog-content';

    // Add back link
    const backLink = document.createElement('a');
    backLink.href = 'blog.html';
    backLink.className = 'back-link';
    backLink.textContent = '← Back to Blog';

    // Add title
    const title = document.createElement('h1');
    title.textContent = frontmatter.title || filename.replace('.md', '').replace(/-/g, ' ');

    // Add date if present
    let dateElement = null;
    if (frontmatter.date) {
      dateElement = document.createElement('div');
      dateElement.className = 'date';
      dateElement.textContent = new Date(frontmatter.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    // Add content
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = html;

    blogContent.appendChild(backLink);
    blogContent.appendChild(title);
    if (dateElement) {
      blogContent.appendChild(dateElement);
    }
    blogContent.appendChild(contentDiv);

    blogContainer.appendChild(blogContent);
  }
});

