
import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "Introduction to Space",
      description: "Learn about planets and our solar system.",
      content:
        "Our solar system contains the Sun and everything that orbits it. There are eight planets, each with different features.",
      cards: [
        { question: "What is the closest planet to the Sun?", answer: "Mercury" },
        { question: "What is the largest planet?", answer: "Jupiter" },
        { question: "Which planet is known as the Red Planet?", answer: "Mars" }
      ]
    },
    {
      id: 2,
      title: "Basic Algebra",
      description: "Learn how to solve simple equations.",
      content:
        "Algebra uses letters to represent unknown numbers. You can solve equations by doing the same operation to both sides.",
      cards: [
        { question: "What is x if x + 3 = 7?", answer: "4" },
        { question: "What is x if 2x = 10?", answer: "5" }
      ]
    }
  ]);

  const [selectedLesson, setSelectedLesson] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [video, setVideo] = useState(null);

  const [cards, setCards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [cardIndex, setCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  function addCard() {
    if (question.trim() === "" || answer.trim() === "") {
      alert("Please enter a question and answer.");
      return;
    }

    setCards([...cards, { question, answer }]);
    setQuestion("");
    setAnswer("");
  }

  function createLesson() {
    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter a title and description.");
      return;
    }

    const newLesson = {
      id: Date.now(),
      title,
      description,
      content,
      video,
      cards
    };

    setLessons([...lessons, newLesson]);

    setTitle("");
    setDescription("");
    setContent("");
    setVideo(null);
    setCards([]);

    setPage("home");
  }

  function openLesson(lesson) {
    setSelectedLesson(lesson);
    setCardIndex(0);
    setShowAnswer(false);
    setPage("lesson");
  }

  return (
    <div className="app">
      <header>
        <h1 onClick={() => setPage("home")}>LearnHub</h1>

        <nav>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("create")}>Create Lesson</button>
        </nav>
      </header>

      {page === "home" && (
        <main>
          <section className="hero">
            <h2>Learn something new.</h2>
            <p>
              Create lessons, share your knowledge, and help
              other people learn.
            </p>

            <button
              className="primary"
              onClick={() => setPage("create")}
            >
              + Create a Lesson
            </button>
          </section>

          <h2>Explore Lessons</h2>

          <div className="lesson-grid">
            {lessons.map((lesson) => (
              <div className="lesson-card" key={lesson.id}>
                <div className="lesson-icon">📚</div>

                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>

                <p className="small">
                  {lesson.cards.length} flashcards
                </p>

                <button onClick={() => openLesson(lesson)}>
                  View Lesson
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {page === "create" && (
        <main>
          <h2>Create a Lesson</h2>
          <p>Share something you know with other people.</p>

          <div className="form-box">
            <label>Lesson Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: Introduction to Biology"
            />

            <label>Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will people learn?"
            />

            <label>Lesson Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your lesson here..."
              rows="6"
            />

            <label>Upload a Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setVideo(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />

            <h3>Flashcards</h3>

            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter a question"
            />

            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the answer"
            />

            <button onClick={addCard}>Add Flashcard</button>

            <p className="small">
              Flashcards added: {cards.length}
            </p>

            {cards.map((card, index) => (
              <div className="added-card" key={index}>
                {card.question}
              </div>
            ))}

            <button className="primary" onClick={createLesson}>
              Publish Lesson
            </button>
          </div>
        </main>
      )}

      {page === "lesson" && selectedLesson && (
        <main>
          <button onClick={() => setPage("home")}>
            ← Back to Lessons
          </button>

          <div className="lesson-view">
            <h2>{selectedLesson.title}</h2>
            <p>{selectedLesson.description}</p>

            <h3>Lesson Material</h3>
            <p>{selectedLesson.content}</p>

            {selectedLesson.video && (
              <video
                controls
                width="100%"
                src={selectedLesson.video}
              />
            )}

            <h3>Flashcards</h3>

            {selectedLesson.cards.length > 0 ? (
              <div className="flashcard">
                <h3>
                  {showAnswer
                    ? selectedLesson.cards[cardIndex].answer
                    : selectedLesson.cards[cardIndex].question}
                </h3>

                <button onClick={() => setShowAnswer(!showAnswer)}>
                  {showAnswer ? "Show Question" : "Show Answer"}
                </button>

                <p>
                  Card {cardIndex + 1} of {selectedLesson.cards.length}
                </p>

                <button
                  onClick={() => {
                    setCardIndex(
                      (cardIndex + 1) % selectedLesson.cards.length
                    );
                    setShowAnswer(false);
                  }}
                >
                  Next Card →
                </button>
              </div>
            ) : (
              <p>No flashcards for this lesson yet.</p>
            )}
          </div>
        </main>
      )}

      <footer>
        <p>LearnHub - Share what you know.</p>
      </footer>
    </div>
  );
}

export default App;
