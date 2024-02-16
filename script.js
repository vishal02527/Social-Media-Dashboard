//code for home page(index.html)
document.addEventListener("DOMContentLoaded", () => {
  animateText();
});

function animateText() {
  const dynamicTextElement = document.getElementById("dynamicText");
  const texts = [
    "Welcome to Social Media Dashboard",
    "Connect, Explore, Stay Updated",
    "Discover a New Way to Socialize",
    "Elevate Your Social Media Experience",
    "Simplify Your Online Connections",
  ];
  let currentTextIndex = 0;

  setInterval(() => {
    dynamicTextElement.innerHTML = texts[currentTextIndex];
    currentTextIndex = (currentTextIndex + 1) % texts.length;
  }, 3000); // Change text every 3 seconds
}

// Global variables
let editingIndex = -1;

// Initially these six posts are visible on DOM
const samplePosts = [
  {
    title: "Beautiful Sunset",
    username: "user1",
    content: "Enjoying the view! 🌅",
    image:
      "https://media.istockphoto.com/id/1172427455/photo/beautiful-sunset-over-the-tropical-sea.jpg?s=612x612&w=0&k=20&c=i3R3cbE94hdu6PRWT7cQBStY_wknVzl2pFCjQppzTBg=",
  },
  {
    title: "Adventure Time",
    username: "user2",
    content: "Exploring new places! 🏞️",
    image:
      "https://media.istockphoto.com/id/1178785818/photo/man-hiking-on-beautiful-himalayas-mountains-with-backpack-and-filming-travel-lifestyle.jpg?s=612x612&w=0&k=20&c=TIAAzjthh2IokxZgOKZ6lVtKtMILExFv62avXYcki7c=",
  },
  {
    title: "Cozy Moments",
    username: "user3",
    content: "Relaxing with a good book. 📖",
    image:
      "https://media.istockphoto.com/id/1739036693/photo/magic-moments-on-christmas-eve.jpg?s=612x612&w=0&k=20&c=LhKsWbLWzZv5flutDpxzf5I1XfcM7A7ULsDg_SUXrJE=",
  },
  {
    title: "Delicious Treat",
    username: "user4",
    content: "Indulging in sweet delights! 🍰",
    image:
      "https://media.istockphoto.com/id/1147252758/photo/healthy-vegetarian-food-background-vegetables-pesto-and-lentil-curry-with-tofu.jpg?s=612x612&w=0&k=20&c=tfLYLtT-f_I-tnmOdb_6WHRhIQa8jXy7SkFakC-P-LU=",
  },
  {
    title: "Tech Enthusiast",
    username: "user5",
    content: "Enjoying with the latest tech! 🚀",
    image:
      "https://media.istockphoto.com/id/1194430863/photo/smart-female-it-programer-working-on-desktop-computer-in-data-center-system-control-room-team.jpg?s=612x612&w=0&k=20&c=NcS5hItMTiT4_WoL_49WOFc-5gn1k9c-cdPZXegOcNM=",
  },
  {
    title: "Wisdom: The Power",
    username: "user6",
    content: "Knowledge is everything 🧑‍🏫",
    image:
      "https://media.istockphoto.com/id/509620602/photo/be-prepared-message-on-business-note-paper.jpg?s=612x612&w=0&k=20&c=rFj03T2ZUsVsbbRI5bdX0vkEcwQRgRQm0-jslByQTbw=",
  },
];

// Retrieve existing posts from local storage
const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];

// Only add sample posts if there are no existing posts
const allPosts = existingPosts.length > 0 ? existingPosts : samplePosts;

//code for dynamically Post creation
document.addEventListener("DOMContentLoaded", () => {
  loadPosts();
});

function loadPosts() {
  // Render posts on the DOM
  renderPosts();
}

// Function to open the create post dialog on clicking create post button
function openCreatePostDialog() {
  const modal = document.getElementById("create-post-modal");
  modal.style.display = "block";
}

// Function to close the create post dialog
function closeCreatePostDialog() {
  const modal = document.getElementById("create-post-modal");
  modal.style.display = "none";
}

// Function to open the success message dialog after successfully creation of the post
function openSuccessMessageDialog(action) {
  const modal = document.getElementById("success-message-modal");
  const message = getMessageForAction(action);
  const modalContent = modal.querySelector(".modal-content");
  modalContent.querySelector("p").textContent = message;
  modal.style.display = "block";
}

// Function to get the message based on the action performed
function getMessageForAction(action) {
  switch (action) {
    case "create":
      return "Your post is successfully created. If you are not able to see the post, please reload the page once.";
    case "edit":
      return "Your post is successfully edited.";
    case "delete":
      return "Your post is successfully deleted.";
    default:
      return "Success!";
  }
}

// Function to close the success message dialog
function closeSuccessMessageDialog() {
  const modal = document.getElementById("success-message-modal");
  modal.style.display = "none";
}

// Function to create a new post
function createPost() {
  const title = document.getElementById("post-title").value;
  const imageUrl = document.getElementById("post-image-url").value;
  const content = document.getElementById("post-content").value;

  // Validate input fields
  if (!title || !imageUrl || !content) {
    alert("Please fill in all fields");
    return;
  }

  const user = document.getElementById("user");

  // Taking username from the local storage.
  const userName = localStorage.getItem("username");

  // Create new post object
  const newPost = {
    title: title,
    username: `${userName}`,
    content: content,
    image: imageUrl,
  };

  // Retrieve existing posts from local storage
  const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];

  // Add new post to the existing posts array
  existingPosts.push(newPost);

  // Save updated posts array back to local storage
  localStorage.setItem("posts", JSON.stringify(existingPosts));
  console.log("Existing Posts:", existingPosts);

  // Add new post to the DOM
  const contentSection = document.getElementById("content");
  const postElement = document.createElement("div");
  postElement.classList.add("post");

  postElement.innerHTML = `
    <h3>${newPost.title}</h3>
    <img src="${newPost.image}" alt="Post Image">
    <p><strong>${newPost.username}</strong>: ${newPost.content}</p>
  `;

  contentSection.appendChild(postElement);

  // Show success message dialog
  openSuccessMessageDialog("create");

  // Close the dialog box
  closeCreatePostDialog();

  // Render updated posts on the DOM
  renderPosts();
}

// Function to open the edit post dialog on clicking the edit icon
function openEditPostDialog(index) {
  const post = allPosts[index];
  document.getElementById("edit-post-title").value = post.title;
  document.getElementById("edit-post-image-url").value = post.image;
  document.getElementById("edit-post-content").value = post.content;
  editingIndex = index; // Store the index of specific post for editing
  document.getElementById("edit-post-modal").style.display = "block";
}

// Function to close the edit post dialog
function closeEditPostDialog() {
  document.getElementById("edit-post-modal").style.display = "none";
}

// Function to edit a post
function editPost() {
  const title = document.getElementById("edit-post-title").value;
  const imageUrl = document.getElementById("edit-post-image-url").value;
  const content = document.getElementById("edit-post-content").value;

  // Validate input fields
  if (!title || !imageUrl || !content) {
    alert("Please fill in all fields");
    return;
  }

  // Update post details
  allPosts[editingIndex].title = title;
  allPosts[editingIndex].image = imageUrl;
  allPosts[editingIndex].content = content;

  // Save updated posts array back to local storage
  localStorage.setItem("posts", JSON.stringify(allPosts));

  // Show success message dialog
  openSuccessMessageDialog("edit");

  // Close the dialog box
  closeEditPostDialog();

  // Render updated posts on the DOM
  renderPosts();
}

// Function to delete a post on clicking the delete icon
function deletePost(index) {
  // Remove the specific post from the allPosts array
  allPosts.splice(index, 1);

  // Save updated posts array back to local storage
  localStorage.setItem("posts", JSON.stringify(allPosts));

  // Show success message dialog
  openSuccessMessageDialog("delete");

  // Render updated posts on the DOM
  renderPosts();
}

// Function to render posts on the DOM
function renderPosts() {
  const contentSection = document.getElementById("content");
  contentSection.innerHTML = "";

  allPosts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <img src="${post.image}" alt="Post Image">
      <p><strong>${post.username}</strong>: ${post.content}</p>
      <div class="post-actions">
        <span class="edit-icon" onclick="openEditPostDialog(${index})"><i class="fa-solid fa-pencil"></i></span>
        <span class="delete-icon" onclick="deletePost(${index})"><i class="fa-solid fa-trash"></i></span>
      </div>
    `;

    contentSection.appendChild(postElement);
  });
}
