# CHIMERA – Multimodal Deep-Space AI Assistant

CHIMERA is a full-stack multimodal chat system integrating **Django REST Framework** (backend) and **Next.js** and **TailwindCSS** (frontend).
It supports **authentication**, **text + image inputs**, **GPT-4o reasoning**, and **persistent conversation history** designed for a deep-space mission scenario.

### Backend API Endpoints
| Method   | Endpoint             | Description                                  |
| -------- | -------------------- | -------------------------------------------- |
| **POST** | `/api/auth/signup/`  | Register new user                            |
| **POST** | `/api/auth/login/`   | Login & receive JWT                          |
| **GET**  | `/api/chat/history/` | Get full chat history for authenticated user |
| **POST** | `/api/chat/send/`    | Send text/image & receive LLM response       |

Backend runs at: http://localhost:8000

### Frontend Routes
| Route          | Description                             |
| -------------- | --------------------------------------- |
| **/signup**    | User registration UI                    |
| **/signin**    | User login UI                           |
| **/dashboard** | Main chat interface (text + image chat) |

Frontend runs at: http://localhost:3000

## Run the project
### Run Backend
#### 1. Create virtual environment 
```bash
cd backend
python -m venv venv
source venv/bin/activate
venv\Scripts\activate.bat # if windows
```

#### 2. Install dependencies
```bash
pip install -r requirements.txt
```

#### 3. Configure environment variables (`backend/.env`)
```
OPENAI_API_KEY= 
DB_NAME=
DB_USER=
DB_PASS=
DB_HOST=
DB_PORT=
```

#### 4. Run migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

#### 5. Start backend
```bash
python manage.py runserver
```

---

### Run the Frontend

#### 1. Install dependencies
```bash
cd frontend
npm install
```

#### 2. Start Next.js
```bash
npm run dev
```

## User Interface Screenshots
### Authentication
![signup](https://github.com/user-attachments/assets/7d755eba-24be-4e2a-a91d-8cd32de7c7c5) 

### Chat UI
![chat-ui](https://github.com/user-attachments/assets/eb149ef7-eaa2-42b7-ac65-83fcae59c4b9)

