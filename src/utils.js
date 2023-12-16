import quizApi from "./api/quizApi";

const quizApiUrl = "https://opentdb.com/api.php";
const quizCategoryUrl = "https://opentdb.com/api_category.php";

export const fetchQuiz = (amount, categoryId, difficulty) => {
  return quizApi.get(quizApiUrl, {
    params: { amount, category: categoryId, difficulty },
  });
};

export const fetchCategory = () => {
  return quizApi.get(quizCategoryUrl);
};
