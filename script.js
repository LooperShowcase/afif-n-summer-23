let open_ai_response;

let conversation = [
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hi, how can i help yuo today?" },
];

async function conversationUserAdd(question, sentiment) {
  conversation.push({
    role: "user",
    content:
      "My happiness out of 10:" + sentiment + "my question is:" + question,
  });
  console.log("user:", question);
}

async function conversationHUEAdd(response) {
  conversation.push({
    role: "assistant",
    content: response,
  });
}

async function openai_test() {
  let url = "https://api.openai.com/v1/chat/completions";
  let apikey1 = "sk-";
  let apikey2 = "ARmBYmBgE69LcWHYkngu";
  let apikey3 = "T3BlbkFJIiaAPCEWCdgVyodtMBuc";
  let apikey = apikey1 + apikey2 + apikey3;
  let data = { model: "gpt-3.5-turbo", messages: conversation };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const message = responseData.choices[0].message.content;

      conversationHUEAdd(message);
      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utterance);
      console.log(message);
      return message;
    } else {
      console.log("Request failed with status: ", response.status);
    }
  } catch (error) {
    console.error("There is an error: ", error);
  }
}

// document.getElementById("Enter-Button").addEventListener("click", function () {
//   let input_value = document.getElementById("Input-Text").value;
//   conversationUserAdd(input_value, 10);
//   openai_test();
// });
