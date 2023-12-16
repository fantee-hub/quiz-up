import quizApi from "./api/quizApi";

const quizApiUrl = "https://opentdb.com/api.php";
const quizCategoryUrl = "https://opentdb.com/api_category.php";

export const fetchQuiz = async (amount, categoryId, difficulty) => {
  return await quizApi.get(quizApiUrl, {
    params: { amount, category: categoryId, difficulty },
  });
};

export const fetchCategory = () => {
  return quizApi.get(quizCategoryUrl);
};
