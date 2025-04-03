import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ModulePage() {
  const { id } = useParams();
  const moduleId = parseInt(id);
  
  // Sample module data - in a real app, this would come from an API
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('content');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  
  useEffect(() => {
    // Simulate fetching module data
    setTimeout(() => {
      const moduleData = {
        id: moduleId,
        title: 'Memory Hacks & Techniques',
        description: 'Learn effective techniques to improve your memory and retention.',
        progress: 30,
        sections: [
          { id: 1, title: 'Introduction to Memory Techniques', completed: true },
          { id: 2, title: 'The Forgetting Curve', completed: true },
          { id: 3, title: 'Spaced Repetition System', completed: false },
          { id: 4, title: 'Memory Palace Technique', completed: false },
          { id: 5, title: 'Mnemonic Devices', completed: false },
        ],
        content: `
          <h1 style="text-align: center; font-size: 2rem; color: #333; margin-bottom: 1rem;">
  Understanding Spaced Repetition
      </h1>

        <p style="font-size: 1.1rem; line-height: 1.6; color: #555; text-align: justify;">
          Spaced repetition is a powerful learning technique that helps you retain information more effectively. 
          Instead of cramming, it utilizes systematic review at increasing intervals, reinforcing long-term memory.
        </p>

        <h2 style="color: #222; margin-top: 2rem;">How Spaced Repetition Works</h2>
        <p style="font-size: 1rem; line-height: 1.6; color: #555;">
          The system is straightforward and follows these principles:
        </p>
        <ol style="font-size: 1rem; color: #444; padding-left: 1.5rem; line-height: 1.6;">
          <li>Review newly learned information within <strong>24 hours</strong>.</li>
          <li>If recalled correctly, extend the interval (e.g., <em>3 days</em>).</li>
          <li>Continue increasing the interval (e.g., <em>7 days → 14 days → 30 days</em>).</li>
          <li>If you forget, restart with a shorter interval.</li>
        </ol>

        <h2 style="color: #222; margin-top: 2rem;">The Science Behind It</h2>
        <p style="font-size: 1rem; line-height: 1.6; color: #555;">
          Studies show that spaced repetition strengthens neural pathways at the perfect moment—just before they weaken.
          This enhances retention and makes recall effortless over time.
        </p>

        <h2 style="color: #222; margin-top: 2rem;">How to Implement Spaced Repetition</h2>
        <p style="font-size: 1rem; line-height: 1.6; color: #555;">
          You can integrate this method into your study routine with:
        </p>
        <ul style="font-size: 1rem; color: #444; padding-left: 1.5rem; line-height: 1.6;">
          <li>Flashcard apps with built-in spaced repetition (e.g., <strong>Anki, Quizlet</strong>).</li>
          <li>Custom study schedules using calendar reminders.</li>
          <li>A physical index card system for hands-on learners.</li>
        </ul>

        <p style="font-size: 1rem; line-height: 1.6; color: #555; margin-top: 1.5rem;">
          In the next section, we'll explore how to build a <strong>custom spaced repetition system</strong> 
          tailored to your personal learning style.
        </p>        
        `,
        quiz: [
          {
            id: 1,
            question: 'What is spaced repetition?',
            options: [
              'Studying for long periods without breaks',
              'Reviewing information at increasing intervals',
              'Memorizing information all at once',
              'A technique to improve typing speed'
            ],
            correctAnswer: 1 // index of correct answer
          },
          {
            id: 2,
            question: 'Why is spaced repetition effective?',
            options: [
              'It requires less total study time',
              'It allows you to study while sleeping',
              'It strengthens neural pathways as they begin to weaken',
              'It\'s easier than traditional study methods'
            ],
            correctAnswer: 2
          },
          {
            id: 3,
            question: 'What happens if you forget information during a spaced repetition review?',
            options: [
              'You should give up on that information',
              'You should reset to a shorter interval',
              'You should double the interval',
              'You should switch to a different study method'
            ],
            correctAnswer: 1
          },
          {
            id: 4,
            question: 'Which of these is a way to implement spaced repetition?',
            options: [
              'Studying everything the night before an exam',
              'Reading your textbook once from cover to cover',
              'Using flashcard apps with spaced repetition algorithms',
              'Highlighting text in different colors'
            ],
            correctAnswer: 2
          },
          {
            id: 5,
            question: 'The spacing effect shows that:',
            options: [
              'Studying in different locations improves memory',
              'Information is better memorized when reviewed over increasing intervals',
              'Studying with friends is more effective than studying alone',
              'Memory capacity increases with age'
            ],
            correctAnswer: 1
          }
        ]
      };
      
      setModule(moduleData);
      setLoading(false);
    }, 800);
  }, [moduleId]);
  
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'quiz' && quizSubmitted) {
      setQuizSubmitted(false);
      setQuizAnswers({});
      setQuizScore(null);
    }
  };
  
  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answerIndex
    });
  };
  
  const handleQuizSubmit = () => {
    if (Object.keys(quizAnswers).length !== module.quiz.length) {
      alert('Please answer all questions before submitting.');
      return;
    }
    
    // Calculate score
    let correctCount = 0;
    module.quiz.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const score = Math.round((correctCount / module.quiz.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (quizSubmitted && quizScore !== null) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow py-12">
          <div className="max-w-3xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm p-8 text-center"
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center bg-indigo-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
              <p className="text-xl text-gray-600 mb-6">
                You scored {quizScore}% on this module quiz.
              </p>
              
              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div 
                    className={`h-4 rounded-full ${
                      quizScore >= 80 ? 'bg-green-500' : quizScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} 
                    style={{ width: `${quizScore}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <Link
                  to={`/modules/${moduleId}`}
                  className="inline-block px-6 py-3 bg-gray-200 rounded-md text-gray-800 font-medium hover:bg-gray-300"
                  onClick={() => handleSectionChange('quiz')}
                >
                  Retake Quiz
                </Link>
                
                <Link
                  to="/quiz-results"
                  className="inline-block px-6 py-3 bg-indigo-600 rounded-md text-white font-medium hover:bg-indigo-700 ml-4"
                >
                  See Detailed Results
                </Link>
                
                <div className="pt-8 border-t border-gray-200 mt-8">
                  <Link
                    to="/dashboard"
                    className="text-indigo-600 hover:text-indigo-800 inline-flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Return to Dashboard
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <Link
                  to="/dashboard"
                  className="text-indigo-600 hover:text-indigo-800 inline-flex items-center mb-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
                <p className="mt-2 text-xl text-gray-600">{module.description}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 w-full md:w-auto">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-medium">Module Progress</h3>
                    <div className="mt-1">
                      <div className="w-48 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-indigo-600 rounded-full" style={{ width: `${module.progress}%` }}></div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{module.progress}% complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                className="bg-white rounded-xl shadow-sm overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="p-4 bg-indigo-50 border-b border-indigo-100">
                  <h2 className="font-semibold text-indigo-900">Module Content</h2>
                </div>
                <div className="p-1">
                  <button
                    className={`w-full text-left px-4 py-3 rounded-md ${
                      activeSection === 'content' ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleSectionChange('content')}
                  >
                    Lesson Content
                  </button>
                  <button
                    className={`w-full text-left px-4 py-3 rounded-md ${
                      activeSection === 'quiz' ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleSectionChange('quiz')}
                  >
                    Knowledge Check
                  </button>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-white rounded-xl shadow-sm overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="p-4 bg-indigo-50 border-b border-indigo-100">
                  <h2 className="font-semibold text-indigo-900">Module Sections</h2>
                </div>
                <div className="p-1">
                  {module.sections.map((section) => (
                    <div key={section.id} className="px-4 py-3 flex items-center">
                      <div className={`mr-3 h-5 w-5 rounded-full flex items-center justify-center ${
                        section.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {section.completed ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : <span className="h-2 w-2 bg-gray-300 rounded-full"></span>}
                      </div>
                      <span className={section.completed ? 'text-gray-700' : 'text-gray-500'}>
                        {section.title}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                className="bg-yellow-50 rounded-xl shadow-sm p-4 border border-yellow-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-yellow-800 mb-1">Learning Tip</h3>
                    <p className="text-sm text-yellow-700">
                      Take brief notes while reading, then try to explain the concepts in your own words. This active recall practice significantly improves retention.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Main Content */}
            <motion.div
              className="lg:col-span-3 bg-white rounded-xl shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {activeSection === 'content' ? (
                <div className="p-6">
                  <div 
                    className="prose max-w-none prose-indigo prose-img:rounded-md prose-headings:font-bold"
                    dangerouslySetInnerHTML={{ __html: module.content }}
                  />
                  
                  <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
                    <button
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Previous Section
                    </button>
                    <button
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => handleSectionChange('quiz')}
                    >
                      Continue to Quiz
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Knowledge Check</h2>
                  <p className="text-gray-600 mb-8">
                    Test your understanding of the key concepts from this module. Complete all questions and submit to see your results.
                  </p>
                  
                  <div className="space-y-8">
                    {module.quiz.map((question, questionIndex) => (
                      <div 
                        key={question.id} 
                        className="bg-gray-50 rounded-lg p-6"
                      >
                        <h3 className="text-lg font-medium mb-4">
                          {questionIndex + 1}. {question.question}
                        </h3>
                        <div className="space-y-3">
                          {question.options.map((option, optionIndex) => (
                            <div 
                              key={optionIndex}
                              className="flex items-center"
                            >
                              <input
                                type="radio"
                                id={`question-${question.id}-option-${optionIndex}`}
                                name={`question-${question.id}`}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                checked={quizAnswers[question.id] === optionIndex}
                                onChange={() => handleQuizAnswer(question.id, optionIndex)}
                              />
                              <label
                                htmlFor={`question-${question.id}-option-${optionIndex}`}
                                className="ml-3 block text-gray-700"
                              >
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
                    <button
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      onClick={() => handleSectionChange('content')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Back to Lesson
                    </button>
                    <button
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      onClick={handleQuizSubmit}
                    >
                      Submit Quiz
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default ModulePage;