
from langchain_core.prompts import PromptTemplate #type: ignore
from langchain_google_genai import ChatGoogleGenerativeAI #type: ignore
from langgraph.graph import StateGraph, START, END #type: ignore
from langgraph.prebuilt import ToolNode #type: ignore
from shoe_db import shoe_db  # our product database

import os
from dotenv import load_dotenv #type: ignore
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

#setting up the llm
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    temperature = 0.7,
    google_api_key = GOOGLE_API_KEY
)

#function to filter the db according to the brand
def filter_by_brand(brand):
    return [item for item in shoe_db if item["brand"].lower() == brand.lower()]

#prompt template to pass to the model
template = PromptTemplate(
    input_variables = ["brand", "use_case", "db"],
    template = """
    You are an intelligent shopping assistant.

    The user is looking for shoes from **{brand}** for the following use case: **{use_case}**.

    Here are some available shoes from {brand}:

    {db}

    Based on the use case and available products, recommend the most suitable shoe title in bold letters after analyzing the title and category of each footwear from the db and tell in only one line why it's a good fit.
    """
)

#function to attach with the ai tool node that will be used to invoke the llm
def ai_recommendation_node(state):
    brand = state["brand"]
    use_case = state["use_case"]
    
    filtered = filter_by_brand(brand)
    if not filtered:
        return {"response": f"No products found for brand '{brand}'."}
    
    formatted_db = "\n".join(
        f"- {item['title']} | {item['category']}"
        for item in filtered
    )
    
    prompt = template.format(brand=brand, use_case=use_case, db= formatted_db)
    ai_response = llm.invoke(prompt)
    
    return {"response": ai_response.content}

#create the graph wrapper
def get_ai_helper_chain():
    workflow = StateGraph(dict)
    workflow.add_node("AI helper", ai_recommendation_node)
    workflow.add_edge(START, "AI helper")
    workflow.add_edge("AI helper", END)
    
    return workflow.compile()


ai_helper_chain = get_ai_helper_chain() #to be called by flask route