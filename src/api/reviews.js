// Mock data for restaurant-level reviews
let REVIEWS_DATA = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "The delivery was super fast and the food arrived hot! Definitely ordering again.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    date: "2023-10-15",
    isTrusted: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    comment:
      "Best service in town. The packaging was eco-friendly which I really appreciate.",
    avatar: "https://i.pravatar.cc/150?u=michael",
    date: "2023-10-12",
    isTrusted: true,
  },
  {
    id: 3,
    name: "Emily Davis",
    rating: 4,
    comment: "Great variety of healthy options. The salad was fresh and crisp.",
    avatar: "https://i.pravatar.cc/150?u=emily",
    date: "2023-10-10",
    isTrusted: true,
  },
  {
    id: 4,
    name: "David Wilson",
    rating: 5,
    comment:
      "They handled my allergy requirements perfectly. Safe and delicious!",
    avatar: "https://i.pravatar.cc/150?u=david",
    date: "2023-10-08",
    isTrusted: true,
  },
  {
    id: 5,
    name: "Jessica Taylor",
    rating: 5,
    comment:
      "Love the new menu updates. The vertical scrolling app design is also very smooth.",
    avatar: "https://i.pravatar.cc/150?u=jessica",
    date: "2023-10-05",
    isTrusted: true,
  },
  {
    id: 6,
    name: "Robert Brown",
    rating: 3,
    comment: "Food was good but delivery took a it longer than expected.",
    avatar: "https://i.pravatar.cc/150?u=robert",
    date: "2023-10-01",
    isTrusted: false,
  },
];

export const getReviews = async () => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...REVIEWS_DATA]);
    }, 500);
  });
};

export const deleteReview = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      REVIEWS_DATA = REVIEWS_DATA.filter((r) => r.id !== id);
      resolve(true);
    }, 500);
  });
};

export const toggleTrusted = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      REVIEWS_DATA = REVIEWS_DATA.map((r) =>
        r.id === id ? { ...r, isTrusted: !r.isTrusted } : r,
      );
      resolve(true);
    }, 300);
  });
};

export const addReview = async (review) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReview = {
        id: REVIEWS_DATA.length + 1,
        ...review,
        date: new Date().toISOString().split("T")[0],
        isTrusted: false, // Default to untrusted
        avatar: `https://i.pravatar.cc/150?u=${Math.random()}`, // Random avatar for mock
      };
      REVIEWS_DATA = [newReview, ...REVIEWS_DATA];
      resolve(newReview);
    }, 500);
  });
};
