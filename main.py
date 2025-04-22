from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from reportlab.pdfgen import canvas
from PIL import Image, ImageDraw, ImageFont
import json
from fastapi.responses import FileResponse

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    n1: str
    c1: float
    q1: int

class BillRequest(BaseModel):
    items: List[dict]
    choice: int

@app.post("/generate-bill")
async def generate_bill(request: BillRequest):
    if request.choice == 0:
        # Generate PDF
        c = canvas.Canvas("bill.pdf")
        y = 800
        total = 0
        
        c.drawString(100, y, "BILL")
        y -= 30
        
        for item in request.items:
            item_dict = item
            name = list(item_dict.keys())[0][0]  # Get n1, n2, etc.
            index = list(item_dict.keys())[0][1]  # Get the number
            
            item_name = item_dict[f"n{index}"]
            cost = float(item_dict[f"c{index}"])
            quantity = int(item_dict[f"q{index}"])
            subtotal = cost * quantity
            total += subtotal
            
            c.drawString(100, y, f"Item: {item_name}")
            c.drawString(250, y, f"Cost: Rs {cost}")
            c.drawString(350, y, f"Qty: {quantity}")
            c.drawString(450, y, f"Subtotal: Rs {subtotal}")
            y -= 20
        
        c.drawString(100, y-20, f"Total: Rs {total}")
        c.save()
        return FileResponse("bill.pdf", media_type="application/pdf", filename="bill.pdf")
    
    else:
        # Generate JPG
        img = Image.new('RGB', (600, 800), color='white')
        d = ImageDraw.Draw(img)
        font = ImageFont.load_default()
        y = 50
        total = 0
        
        d.text((100, y), "BILL", font=font, fill='black')
        y += 30
        
        for item in request.items:
            item_dict = item
            name = list(item_dict.keys())[0][0]
            index = list(item_dict.keys())[0][1]
            
            item_name = item_dict[f"n{index}"]
            cost = float(item_dict[f"c{index}"])
            quantity = int(item_dict[f"q{index}"])
            subtotal = cost * quantity
            total += subtotal
            
            d.text((100, y), f"Item: {item_name}", font=font, fill='black')
            d.text((250, y), f"Cost: Rs {cost}", font=font, fill='black')
            d.text((350, y), f"Qty: {quantity}", font=font, fill='black')
            d.text((450, y), f"Subtotal: Rs {subtotal}", font=font, fill='black')
            y += 20
        
        d.text((100, y+20), f"Total: Rs {total}", font=font, fill='black')
        img.save("bill.jpg")
        return FileResponse("bill.jpg", media_type="image/jpeg", filename="bill.jpg")
