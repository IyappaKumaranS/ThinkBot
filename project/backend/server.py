

    #Working code

    import os
    from fastapi import FastAPI, HTTPException, File, UploadFile
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
    from langchain_fireworks import Fireworks
    from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader
    from langchain.prompts import ChatPromptTemplate
    from langchain_core.messages import AIMessage, HumanMessage
    from langchain.chains.combine_documents import create_stuff_documents_chain
    from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder


    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Set Fireworks API key securely
    os.environ["FIREWORKS_API_KEY"] = "fw_3ZJ1V6bTcwmjYi83zkcmxDpG"

    # # Template for generating responses
    # template = """
    # You are a direct and concise AI assistant. Only provide the final answer based on the user's current question.
    # If the question is unrelated to previous conversations, answer very briefly.
    # Here is the conversation history: {context} 
    # Question: {question}
    # Answer (no history, only response, very short if possible):
    # """


    # Initialize Fireworks LLM and Conversation Chain
    llm = Fireworks(
        model="accounts/fireworks/models/llama-v3p1-405b-instruct",
        base_url="https://api.fireworks.ai/inference/v1/completions",
        max_tokens=1000,
        temperature = 0.0
    )
    template = """
    You are a direct and concise AI assistant. Provide only the final answer based on the user's question.  
    If the question is unrelated to previous conversations, keep your response very brief.  

    If the user asks about an idea, product, or project, use the conversation history to provide details on the proposed idea, target audience, financial viability, and profitability.  

    Do not explicitly state "Answer:" before responding. Instead, provide a natural and relevant response.  

    Conversation History: {chat_history}  
    {context}  

    User Question: {question}  

    Final Response: (no history, only response, very short if possible):
    """

    qa_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", template),
            MessagesPlaceholder(variable_name="chat_history"),  
            ("human", "{question}"),
        ]
    )
    question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
    chat_history = []

    # prompt = ChatPromptTemplate.from_template(template)
    # chain = prompt | llm
    # context = ""
    # chat_history = []
# Set upload directory to current working directory
UPLOAD_DIR = os.getcwd()  # This will store files in the current VS Code directory
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Ensure the directory exists

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    # Save file in current directory
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"filename": file.filename, "message": "File uploaded successfully"}

@app.delete("/delete/{filename}")
async def delete_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)

    if os.path.exists(file_path):
        os.remove(file_path)
        return {"message": f"File '{filename}' deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="File not found")

@app.get("/files/")
async def list_files():
    files = os.listdir(UPLOAD_DIR)
    return {"files": files}


    class ProjectData(BaseModel):
        project_description: str
        domain_name: str
        target_audience: str
        financial_viability: str
        profitability: str

    @app.post("/submit")
    async def receive_form_data(data: ProjectData):
        global context
        user_q = "\n".join([i + " " + j for i,j in data.dict().items()])
        PROMPT_TEMPLATE = """
        You are an AI assistant helping evaluate ideas for new products. 

        Given the user-provided idea, your task is to:
        Evaluate the originality, feasibility, and potential of the user's idea based on several factors.Compare the user's idea with similar existing ideas.For each attribute, score the user idea out of 10, where 100 is the final score represents the highest potential.Give only the validation score final validation score is the main and then list any 10 competitors I provided in the context one after one next line
        and also show marks for each attribute.Do not find score for the competitors

        Attributes to evaluate:
        1. Uniqueness (How original is the idea compared to existing products?)
        2. Feasibility (How feasible is it to implement the idea with available resources?)
        3. Market Demand (Is there a demand for this product or service in the target market?)
        4. Innovation (How innovative is the idea in solving the problem?)
        5. Competition (How does the idea compare to competitors in the market?)
        6. Scalability (Can the idea grow and expand in the future?)
        7. Profitability (What is the potential for profitability?)
        8. Technical Feasibility (Is the idea technically feasible with current technologies?)
        9. Social and Environmental Impact (What is the social or environmental impact?)
        10. User Experience (How easy and satisfying is the product to use?)
        11. Financial Viability (Does the idea have financial backing or resources?)

        User Idea:
        {user_idea}
        Similar Existing Ideas:
        {similar_ideas}
        """
        prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
        prompt = prompt_template.format(user_idea=user_q, similar_ideas="1. Amazon Prime Video 2. Netflix 3. Hulu 4. Disney+ 5. HBO Max 6. Apple TV+ 7. YouTube Premium 8. Paramount+ 9. Peacock 10. Discovery+")
        
        response = question_answer_chain.invoke({
            "chat_history": chat_history,
            "context": "",  
            "question": prompt
        })
        chat_history.extend([
            HumanMessage(content=prompt),
            AIMessage(content=response.strip()),
        ])
        final_validation = question_answer_chain.invoke({
            "chat_history": chat_history,
            "context": "",  
            "question": "What is the final validation score for the user idea?"
        })
        uniqueness  = question_answer_chain.invoke({
            "chat_history": chat_history,
            "context": "",  
            "question": "What is the uniqueness score for the user idea?"
        })
        market_trend = question_answer_chain.invoke({
            "chat_history": chat_history,
            "context": "",  
            "question": "What is the market_trend score for the user idea?"
        })
        user_engagement = question_answer_chain.invoke({
            "chat_history": chat_history,
            "context": "",  
            "question": "What is the user_engagement score for the user idea?"
        })
        def check(s):
            import re
            input_string = s
            pattern = r'\d+'
            numbers = re.findall(pattern, input_string)
            return numbers
        final_validation = int("".join(check(final_validation)))
        uniqueness = int("".join(check(uniqueness))) * 10
        market_trend = int("".join(check(market_trend))) * 10
        user_engagement = int("".join(check(user_engagement))) * 10
        print(final_validation, uniqueness, market_trend, user_engagement)
        print("Received Data:", type(response))  # Print the received data in console
        return {
            "message": "Form received successfully",
            "validation_score": final_validation,
            "uniqueness_score": uniqueness,
            "market_trend_score": market_trend,
            "user_engagement_score": user_engagement
        }

    class ChatRequest(BaseModel):
        prompt: str


    @app.post("/chat")
    async def chat_with_ai(request: ChatRequest):
        try:
            # Handle dynamic conversation with context management
            def handle(user):
                global chat_history
                result = question_answer_chain.invoke({
                    "chat_history": chat_history,
                    "context": "",  
                    "question": user
                })
                chat_history.extend([
                    HumanMessage(content=user),
                    AIMessage(content=result.strip()),
                ])
                return result.strip()[3:]
            response = handle(request.prompt)
            return {"response": response}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
