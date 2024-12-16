//  const getQuestionsFetch = () =>
//   fetch("/api/questions").then((response) => response.json());

// const addQuestionFetch = (answer) => {
//   fetch("/answers", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(answer),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to add question");
//       }
//       return response.json();
//     })
//     .then((result) => {
//       console.log("Question added successfully:", result);
//     })
//     .catch((e) => {
//       console.log(e, "error!");
//     });
// };

// async function getAnswersFetch() {
//   try {
//     const response = await fetch("/answers");

//     const answers = await response.json();
//     return answers;
//   } catch (e) {
//     console.log(e);
//   }
// }

// export default { getQuestionsFetch, addQuestionFetch, getAnswersFetch };
