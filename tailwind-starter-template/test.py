import google.generativeai as genai

# Set your Gemini API key
genai.configure(api_key="AIzaSyDRNTTJho5lWLHOdilj0pqby3ydc37pXTo")

# Use the correct model (ensure access to `gemini-pro`)
model = genai.GenerativeModel(model_name="models/chat-bison-001")  # fallback
# model = genai.GenerativeModel(model_name="gemini-pro")  # use this if your API key supports Gemini Pro

# Start chat session
chat = model.start_chat()

# Custom system prompt
initial_prompt = "You are Dhanamitra AI, a friendly and professional assistant designed to help users navigate websites and give academic journal insights."

# Send the first message to initialize
response = chat.send_message(initial_prompt)
print("🤖 Dhanamitra AI:", response.text)

# Chat loop
while True:
    user_input = input("👤 You: ")
    if user_input.lower() in ["exit", "quit"]:
        print("🤖 Dhanamitra AI: Goodbye!")
        break
    response = chat.send_message(user_input)
    print("🤖 Dhanamitra AI:", response.text)
