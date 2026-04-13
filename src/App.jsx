
import React, { useMemo, useState } from 'react';

const botName = 'PM Onboarding Assistant';
const companyName = 'Innovatech Solutions';

const trainingSchedule = [
  { day: 'Day 1', topic: 'PM Basics & Process Groups', summary: 'Learn what project management is and review the five process groups.' },
  { day: 'Day 2', topic: 'Project Charter', summary: 'Understand how the project charter authorizes a project and defines high-level scope and goals.' },
  { day: 'Day 3', topic: 'Knowledge Areas', summary: 'Explore scope, schedule, cost, quality, risk, communications, resources, and stakeholders.' },
  { day: 'Day 4', topic: 'Project Schedule', summary: 'Review tasks, dependencies, milestones, and timelines.' },
  { day: 'Day 5', topic: 'Waterfall vs Agile', summary: 'Compare sequential and iterative delivery approaches.' },
  { day: 'Day 6', topic: 'RACI & Team Roles', summary: 'Learn how responsibilities are assigned across a project team.' },
  { day: 'Day 7', topic: 'Project Status Reports', summary: 'Practice sharing progress, risks, and next steps with stakeholders.' },
  { day: 'Day 8', topic: 'Risk & Quality Management', summary: 'Identify possible risks and understand how teams maintain quality.' },
  { day: 'Day 9', topic: 'PM Tools & Software', summary: 'Review common tools used to manage schedules, tasks, and collaboration.' },
  { day: 'Day 10', topic: 'Simulation & Review', summary: 'Apply your learning through a quick scenario-based review.' },
];

const knowledge = {
  'project management': 'Project management is the process of planning, organizing, and leading resources to achieve a specific objective within a defined scope, timeline, and budget.',
  'process groups': 'The five process groups are Initiating, Planning, Executing, Monitoring and Controlling, and Closing. They provide the overall structure for managing a project.',
  'knowledge areas': 'Key knowledge areas include scope, schedule, cost, quality, risk, communications, resource, procurement, and stakeholder management.',
  'project charter': 'A project charter is a formal document that authorizes a project. It usually includes the purpose, objectives, high-level scope, key stakeholders, and authority of the project manager.',
  'raci': 'RACI stands for Responsible, Accountable, Consulted, and Informed. It clarifies who does the work, who owns the result, who gives input, and who must be updated.',
  'project status report': 'A project status report is a regular update that communicates progress, risks, major accomplishments, blockers, and next steps to stakeholders.',
  'project schedule': 'A project schedule is a timeline of tasks, deadlines, milestones, and dependencies that helps the team stay organized and on track.',
  'waterfall': 'Waterfall is a sequential project methodology where each phase is completed before the next begins. It works best when requirements are stable.',
  'agile': 'Agile is an iterative project methodology that delivers work in short cycles and allows teams to adapt to change and feedback more easily.',
  'waterfall vs agile': 'Waterfall is more structured and linear, while Agile is more flexible and iterative. In tech environments, Agile is often preferred because requirements can change quickly.',
  'stakeholder': 'A stakeholder is any person or group who can affect the project or is affected by its outcome, such as sponsors, customers, team members, and leadership.',
  'risk management': 'Risk management involves identifying possible problems, assessing their impact, and creating response plans before they affect the project.',
  'quality management': 'Quality management focuses on making sure deliverables meet defined requirements and standards.',
  'example status report': 'Example status report: Overall status is On Track. Completed work includes finalizing requirements. Current risk is a two-day delay in testing. Next step is user acceptance testing.',
};

const quizQuestions = [
  {
    question: 'Which process group focuses on building the roadmap for the project?',
    options: ['Planning', 'Closing', 'Executing'],
    answer: 'Planning',
    explanation: 'Planning is where the project team defines scope, schedule, resources, and the approach for delivery.'
  },
  {
    question: 'What does the A in RACI stand for?',
    options: ['Approved', 'Accountable', 'Assigned'],
    answer: 'Accountable',
    explanation: 'Accountable is the person who is ultimately answerable for the result.'
  },
  {
    question: 'Which document formally authorizes a project?',
    options: ['Status Report', 'Project Charter', 'Risk Register'],
    answer: 'Project Charter',
    explanation: 'The project charter officially authorizes the project and identifies its purpose and high-level scope.'
  },
  {
    question: 'Which methodology is more flexible and iterative?',
    options: ['Agile', 'Waterfall', 'Critical Path'],
    answer: 'Agile',
    explanation: 'Agile supports short cycles, frequent feedback, and easier adaptation to change.'
  }
];

function getBotReply(input) {
  const msg = input.toLowerCase().trim();

  if (!msg) return 'Please enter a project management question.';
  if (msg.includes('quiz me') || msg.includes('start quiz')) {
    return 'Use the quiz panel on the right to answer a practice question.';
  }
  if (msg.includes('training schedule') || msg.includes('two-week') || msg.includes('timeline')) {
    return 'The training lasts two weeks. Week 1 covers PM basics, process groups, project charter, knowledge areas, schedule, and Waterfall vs Agile. Week 2 covers RACI, status reports, risk and quality, PM tools, and a final simulation.';
  }
  if (msg.includes('personal preference')) {
    return 'For a tech company, Agile is usually the better fit because it supports collaboration, flexibility, and fast response to changing requirements.';
  }
  if (msg.includes('help')) {
    return 'I can explain process groups, knowledge areas, Agile vs Waterfall, project charter, RACI, project status reports, project schedules, risk management, and the two-week training schedule.';
  }

  const matchedKey = Object.keys(knowledge).find((key) => msg.includes(key));
  if (matchedKey) return knowledge[matchedKey];

  return 'I can help with project management topics like process groups, knowledge areas, Agile vs Waterfall, project charter, RACI, project status reports, and project schedules. Try one of the quick questions above the chat box.';
}

function MessageBubble({ role, text }) {
  return (
    <div className={`message-row ${role === 'user' ? 'message-row-user' : ''}`}>
      <div className={`message-bubble ${role === 'user' ? 'message-user' : 'message-bot'}`}>
        <div className="message-label">{role === 'user' ? 'You' : botName}</div>
        <div>{text}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: `Welcome to ${botName} for ${companyName}. I support new project managers during their first two weeks of training. Ask me about process groups, knowledge areas, Agile vs Waterfall, the project charter, RACI, status reports, or the project schedule.`
    }
  ]);
  const [input, setInput] = useState('');
  const [quizIndex, setQuizIndex] = useState(0);

  const currentQuiz = useMemo(
    () => quizQuestions[quizIndex % quizQuestions.length],
    [quizIndex]
  );

  function sendMessage(customText) {
    const text = (customText ?? input).trim();
    if (!text) return;
    const reply = getBotReply(text);
    setMessages((prev) => [...prev, { role: 'user', text }, { role: 'bot', text: reply }]);
    setInput('');
  }

  function handleQuizAnswer(option) {
    const isCorrect = option === currentQuiz.answer;
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: `Quiz answer: ${option}` },
      {
        role: 'bot',
        text: isCorrect
          ? `Correct. ${currentQuiz.explanation}`
          : `Not quite. The correct answer is ${currentQuiz.answer}. ${currentQuiz.explanation}`
      }
    ]);
    setQuizIndex((prev) => prev + 1);
  }

  return (
    <div className="page">
      <div className="hero">
        <div>
          <p className="eyebrow">Class Project Bonus</p>
          <h1>{botName}</h1>
          <p className="hero-text">
            An interactive training aid for new project managers during their first two weeks on the job.
          </p>
        </div>
      </div>

      <div className="layout">
        <aside className="panel sidebar">
          <section>
            <h2>Bot Purpose</h2>
            <p>
              This bot reinforces foundational project management topics for early-career project managers in a tech company.
            </p>
          </section>

          <section>
            <h2>Two-Week Training Plan</h2>
            <div className="schedule-list">
              {trainingSchedule.map((item) => (
                <div key={item.day} className="schedule-card">
                  <div className="schedule-header">
                    <strong>{item.day}</strong>
                    <span>{item.topic}</span>
                  </div>
                  <p>{item.summary}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <main className="panel chat-panel">
          <section className="quick-actions">
            <button onClick={() => sendMessage('What are the process groups?')}>Process Groups</button>
            <button onClick={() => sendMessage('Explain Waterfall vs Agile')}>Agile vs Waterfall</button>
            <button onClick={() => sendMessage('What is a project charter?')}>Project Charter</button>
            <button onClick={() => sendMessage('What is RACI?')}>RACI</button>
            <button onClick={() => sendMessage('Give me the training schedule')}>Training Schedule</button>
            <button onClick={() => sendMessage('Give me an example status report')}>Status Report</button>
          </section>

          <section className="messages">
            {messages.map((message, index) => (
              <MessageBubble key={index} role={message.role} text={message.text} />
            ))}
          </section>

          <section className="composer">
            <input
              type="text"
              value={input}
              placeholder="Ask about Agile, RACI, project charter, status reports, or schedule..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
            />
            <button onClick={() => sendMessage()}>Send</button>
          </section>
        </main>

        <aside className="panel review-panel">
          <section>
            <h2>Quick Review</h2>
            <ul className="review-list">
              <li>Process Groups</li>
              <li>Knowledge Areas</li>
              <li>Agile vs Waterfall</li>
              <li>Project Charter</li>
              <li>RACI</li>
              <li>Project Status Report</li>
              <li>Project Schedule</li>
            </ul>
          </section>

          <section className="tip-box">
            <h2>Recommended Talking Point</h2>
            <p>
              Agile is often preferred in tech environments because it allows teams to adapt quickly and respond to changing requirements.
            </p>
          </section>

          <section className="quiz-box">
            <h2>Practice Quiz</h2>
            <p className="quiz-question">{currentQuiz.question}</p>
            <div className="quiz-options">
              {currentQuiz.options.map((option) => (
                <button key={option} onClick={() => handleQuizAnswer(option)}>
                  {option}
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
