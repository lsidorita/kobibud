const reviewBox = document.getElementById("review-area");

const URL_API = "https://6542ab5fad8044116ed3bf21.mockapi.io/review";

const renderReview = (review) => {
  const div = document.createElement("div");
  div.classList.add("review__card");
  div.innerHTML = `
            <img src="${review.avatar}" alt="${review.name}" />
            <div>
                <h3 class="review__card--name">${review.name}</h3>
                <small class="review__card--text--hora">${review.createdAt}</small>
            </div>
            <p class="review__card--text--description">${review.comment}</p>
    `;
  reviewBox.appendChild(div);
};

const getReviews = () => {
  console.log(0);
  fetch(URL_API)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((reviews) => {
      //max 10 reviews
      const reviewsToRender = reviews.slice(0, 10);
      reviewsToRender.forEach((review) => {
        const createdAt = new Date(review.createdAt).toLocaleString();
        review.createdAt = createdAt;
        renderReview(review);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

getReviews();
