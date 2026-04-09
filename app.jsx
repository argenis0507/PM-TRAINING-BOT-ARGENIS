import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, BookOpen, CalendarDays, HelpCircle, CheckCircle2 } from 'lucide-react';

// PM Training Bot
// Customize the constants below to match your class project, company style, or professor feedback.

const BOT_NAME = 'PM Onboarding Assistant';
const COMPANY_NAME = 'Innovatech Solutions';
const PRIMARY_COLOR = 'text-slate-800';
const BOT_ROLE = `You are a helpful onboarding bot for new project managers in a tech company. Your purpose is to reinforce the foundations of project management during a new employee's first two weeks on the job. You explain concepts clearly, in simple professional language, and you stay focused on project management training topics.`;

const TRAINING_SCHEDULE = [
  { day: 'Day 1', topic: 'PM Basics & Process Groups', summary: 'Introduces what project management is and explains the five process groups: Initiating, Planning, Executing, Monitoring and Controlling, and Closing.' },
  { day: 'Day 2', topic: 'Project Charter', summary: 'Explains how the project charter formally authorizes a project and identifies objectives, scope, and major stakeholders.' },
  { day: 'Day 3', topic: 'Knowledge Areas', summary: 'Covers major knowledge areas such as scope, schedule, cost, risk, quality, communications, resources, and stakeholders.' },
  { day: 'Day 4', topic: 'Project Schedule', summary: 'Introduces timelines, milestones, dependencies, and how project schedules help teams stay on track.' },
  { day: 'Day 5', topic: 'Waterfall vs Agile', summary: 'Compares sequential and iterative delivery approaches and explains when each methodology is useful.' },
  { day: 'Day 6', topic: 'RACI & Team Roles', summary: 'Explains responsibility assignment using Responsible, Accountable, Consulted, and Informed roles.' },
  { day: 'Day 7', topic: 'Project Status Reports', summary: 'Shows how status reports communicate progress, risks, blockers, and next steps to stakeholders.' },
  { day: 'Day 8', topic: 'Risk & Quality Management', summary: 'Teaches how to identify threats, plan responses, and maintain quality standards throughout the project.' },
  { day: 'Day 9', topic: 'PM Tools & Software', summary: 'Introduces common PM tools such as Jira, Trello, Microsoft Project, or Asana.' },
  { day: 'Day 10', topic: 'Simulation & Review', summary: 'Wraps up the training with practice scenarios, review questions, and applied learning.' },
];

const KNOWLEDGE = {
  'what is project management': 'Project management is the practice of planning, organizing, and leading resources to achieve a specific goal within a defined scope, timeline, and budget.',
  'process groups': 'The five process groups are Initiating, Planning, Executing, Monitoring and Controlling, and Closing. They provide the basic structure for managing a project from start to finish.',
  'knowledge areas': 'Key knowledge areas include scope, schedule, cost, quality, risk, communications, resource, procurement, and stakeholder management. These areas help project managers organize and control different parts of a project.',
  'project charter': 'A project charter is a formal document that authorizes a project. It usually includes the purpose, objectives, high-level scope, stakeholders, and authority of the project manager.',
  'raci': 'RACI is a responsibility matrix. Responsible means the person doing the work. Accountable means the person ultimately answerable. Consulted means those asked for input. Informed means those kept updated.',
  'project status report': 'A project status report is a regular update that communicates progress, schedule status, major accomplishments, risks, issues, and next steps to stakeholders.',
  'project schedule': 'A project schedule is a timeline of tasks, milestones, deadlines, and dependencies. It helps the team understand what needs to be done and when.',
  'waterfall': 'Waterfall is a sequential methodology where each phase is completed before the next begins. It works best when requirements are stable and clearly defined.',
  'agile': 'Agile is an iterative methodology that delivers work in short cycles and allows teams to adapt based on feedback and changing requirements.',
  'waterfall vs agile': 'Waterfall is more structured and linear, while Agile is more flexible and iterative. In tech environments, Agile is often preferred because requirements can change quickly.',
  'stakeholder': 'A stakeholder is any person or group affected by the project or able to influence its outcome, such as customers, sponsors, managers, and project team members.',
  'risk management': 'Risk management involves identifying possible problems, analyzing their impact, and planning responses before they affect the project.',
  'quality management': 'Quality management focuses on ensuring that deliverables meet defined requirements and standards.',
};

const QUIZ_QUESTIONS = [
  {
    question: 'Which process group focuses on defining how the project will be carried out?',
    options: ['Closing', 'Planning', 'Executing'],
    answer: 'Planning',
    explanation: 'Planning is where the project team defines scope, schedule, resources, risks, and the overall roadmap.'
  },
  {
    question: 'What does the A in RACI stand for?',
    options: ['Approved', 'Accountable', 'Assigned'],
    answer: 'Accountable',
    explanation: 'Accountable refers to the person who is ultimately answerable for the correct completion of the task.'
  },
  {
    question: 'Which document formally authorizes a project?',
    options: ['Project Charter', 'Status Report', 'Risk Register'],
    answer: 'Project Charter',
    explanation: 'The project charter officially authorizes the project and identifies high-level objectives and stakeholders.'
  },
  {
    question: 'Which methodology is more flexible and iterative?',
    options: ['Waterfall', 'Agile', 'Critical Path'],
    answer: 'Agile',
    explanation: 'Agile allows teams to work in short cycles and adjust based on change and feedback.'
  }
];

function normalize(text) {
  return text.toLowerCase().trim();
}

function answerUserMessage(input) {
  const msg = normalize(input);

  if (msg.includes('help')) {
    return `I can help with project management concepts, quiz you, explain the two-week training, or review topics like Agile, Waterfall, RACI, project charter, status reports, process groups, and project schedule.`;
  }

  if (msg.includes('schedule') || msg.includes('training timeline') || msg.includes('two-week')) {
    return `The training lasts two weeks. Week 1 covers PM basics, process groups, project charter, knowledge areas, schedule, and Waterfall vs Agile. Week 2 covers RACI, status reports, risk and quality, PM tools, and a final simulation.`;
  }

  const matchedKey = Object.keys(KNOWLEDGE).find((key) => msg.includes(key));
  if (matchedKey) return KNOWLEDGE[matchedKey];

  if (msg.includes('personal preference')) {
    return 'For a tech company, Agile is usually the better fit because it allows teams to adapt quickly, collaborate often, and respond to change without waiting for the entire project cycle to end.';
  }

  if (msg.includes('example status report')) {
    return 'Example Project Status Report: Status: On Track. Completed: Requirements finalized. Current Risk: Testing may be delayed by two days. Next Step: Begin user acceptance testing.';
  }

  return `I can help explain PM topics such as process groups, knowledge areas, project charter, RACI, project status reports, project schedules, and Agile vs Waterfall. You can also click one of the quick actions or ask me to quiz you.`;
}

export default function PMTrainingBot() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: `Welcome to ${BOT_NAME} for ${COMPANY_NAME}. I’m here to support new project managers during their first two weeks of training. Ask me about process groups, knowledge areas, Agile vs Waterfall, the project charter, RACI, status reports, or the project schedule.`
    }
  ]);
  const [input, setInput] = useState('');
  const [quizIndex, setQuizIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const currentQuiz = useMemo(() => QUIZ_QUESTIONS[quizIndex % QUIZ_QUESTIONS.length], [quizIndex]);

  const sendMessage = (customText) => {
    const text = (customText ?? input).trim();
    if (!text) return;
    const reply = answerUserMessage(text);
    setMessages((prev) => [...prev, { role: 'user', text }, { role: 'bot', text: reply }]);
    setInput('');
  };

  const handleQuizAnswer = (option) => {
    const correct = option === currentQuiz.answer;
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: `Quiz answer: ${option}` },
      {
        role: 'bot',
        text: correct
          ? `Correct. ${currentQuiz.explanation}`
          : `Not quite. The correct answer is ${currentQuiz.answer}. ${currentQuiz.explanation}`
      }
    ]);
    setQuizIndex((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[320px_1fr]">
        <Card className="rounded-2xl shadow-sm border-0">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-slate-900 p-3 text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl">{BOT_NAME}</CardTitle>
                <p className="text-sm text-slate-500">PM training support bot</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">Bot Role</p>
              <p className="mt-2 text-sm text-slate-600">{BOT_ROLE}</p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CalendarDays className="h-4 w-4" />
                Training Schedule
              </div>
              <div className="space-y-2">
                {TRAINING_SCHEDULE.map((item) => (
                  <div key={item.day} className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-slate-800">{item.day}</span>
                      <Badge variant="secondary">{item.topic}</Badge>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border-0">
          <CardHeader className="border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="secondary" className="rounded-full" onClick={() => sendMessage('What are the process groups?')}>
                <BookOpen className="mr-2 h-4 w-4" /> Process Groups
              </Button>
              <Button variant="secondary" className="rounded-full" onClick={() => sendMessage('Explain Waterfall vs Agile')}>
                Agile vs Waterfall
              </Button>
              <Button variant="secondary" className="rounded-full" onClick={() => sendMessage('What is a project charter?')}>
                Project Charter
              </Button>
              <Button variant="secondary" className="rounded-full" onClick={() => sendMessage('What is RACI?')}>
                RACI
              </Button>
              <Button variant="secondary" className="rounded-full" onClick={() => sendMessage('Give me the training schedule')}>
                Training Schedule
              </Button>
              <Button className="rounded-full" onClick={() => setShowQuiz((prev) => !prev)}>
                <HelpCircle className="mr-2 h-4 w-4" /> {showQuiz ? 'Hide Quiz' : 'Quiz Me'}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="grid gap-0 lg:grid-cols-[1fr_320px]">
              <div className="border-r border-slate-200">
                <ScrollArea className="h-[620px] p-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[82%] rounded-2xl px-4 py-3 shadow-sm ${message.role === 'user' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'}`}>
                          <div className="mb-1 flex items-center gap-2 text-xs opacity-80">
                            {message.role === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                            <span>{message.role === 'user' ? 'You' : BOT_NAME}</span>
                          </div>
                          <p className="text-sm leading-6">{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="border-t border-slate-200 p-4">
                  <div className="flex items-center gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Ask about Agile, RACI, project charter, status reports, or schedule..."
                      className="rounded-xl"
                    />
                    <Button onClick={() => sendMessage()} className="rounded-xl">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Quick Review
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-medium text-slate-800">Most Important Topics</p>
                    <ul className="mt-2 space-y-1 text-sm text-slate-600">
                      <li>• Process Groups</li>
                      <li>• Knowledge Areas</li>
                      <li>• Agile vs Waterfall</li>
                      <li>• Project Charter</li>
                      <li>• RACI</li>
                      <li>• Status Reports</li>
                      <li>• Project Schedule</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-medium text-slate-800">Recommended Talking Point</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Agile is often preferred in tech environments because it supports collaboration, flexibility, and quick response to changing requirements.
                    </p>
                  </div>

                  {showQuiz && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-sm font-medium text-slate-800">Practice Quiz</p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{currentQuiz.question}</p>
                      <div className="mt-3 grid gap-2">
                        {currentQuiz.options.map((option) => (
                          <Button key={option} variant="outline" className="justify-start rounded-xl" onClick={() => handleQuizAnswer(option)}>
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
