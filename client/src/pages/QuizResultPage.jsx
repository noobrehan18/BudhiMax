import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from "../components/Navbar.jsx";
import Footer from '../components/Footer';

function QuizResultPage() {
  const [quizResults, setQuizResults] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching quiz results
    setTimeout(() => {
      const results = {
        moduleId: 3,
        moduleTitle: 'Memory Hacks & Techniques',
        date: '2023-07-15',
        score: 80,
        totalQuestions: 5,
        correctAnswers: 4,
        timeSpent: '4:23',
        questions: [
          {
            id: 1,
            question: 'What is spaced repetition?',
            yourAnswer: 'Reviewing information at increasing intervals',
            correctAnswer: 'Reviewing information at increasing intervals',
            isCorrect: true
          },
          {
            id: 2,
            question: 'Why is spaced repetition effective?',
            yourAnswer: 'It strengthens neural pathways as they begin to weaken',
            correctAnswer: 'It strengthens neural pathways as they begin to weaken',
            isCorrect: true
          },
          {
            id: 3,
            question: 'What happens if you forget information during a spaced repetition review?',
            yourAnswer: 'You should reset to a shorter interval',
            correctAnswer: 'You should reset to a shorter interval',
            isCorrect: true
          },
          {
            id: 4,
            question: 'Which of these is a way to implement spaced repetition?',
            yourAnswer: 'Studying everything the night before an exam',
            correctAnswer: 'Using flashcard apps with spaced repetition algorithms',
            isCorrect: false
          },
          {
            id: 5,
            question: 'The spacing effect shows that:',
            yourAnswer: 'Information is better memorized when reviewed over increasing intervals',
            correctAnswer: 'Information is better memorized when reviewed over increasing intervals',
            isCorrect: true
          }
        ],
        insights: [
          'Great understanding of spaced repetition basics',
          'Good grasp of the scientific principles behind memory techniques',
          'Consider reviewing implementation methods for spaced repetition'
        ],
        recommendations: [
          'Review the practical applications section',
          'Try creating your own spaced repetition system',
          'Check out the related flashcard module'
        ]
      };
      setQuizResults(results);
      setLoading(false);
    }, 800);
  }, []);

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
            <Link
              to="/dashboard"
              className="text-indigo-600 hover:text-indigo-800 inline-flex items-center mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Quiz Results</h1>
            <p className="mt-2 text-xl text-gray-600">
              {quizResults.moduleTitle} Module
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quiz Summary */}
            <motion.div
              className="lg:col-span-1 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-indigo-600 p-6 text-white">
                  <h2 className="text-xl font-semibold">Quiz Summary</h2>
                  <div className="mt-4 text-center">
                    <div className="text-5xl font-bold">{quizResults.score}%</div>
                    <p className="mt-1 text-indigo-100">Your Score</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date Taken:</span>
                    <span className="font-medium">{quizResults.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Spent:</span>
                    <span className="font-medium">{quizResults.timeSpent} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Correct Answers:</span>
                    <span className="font-medium">{quizResults.correctAnswers} of {quizResults.totalQuestions}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-lg mb-3">Score Breakdown</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${quizResults.score}%` }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Insights & Recommendations</h2>
                
                <div className="mb-6">
                  <h3 className="text-indigo-700 font-medium mb-2">Strengths</h3>
                  <ul className="space-y-2">
                    {quizResults.insights.map((insight, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-indigo-700 font-medium mb-2">Next Steps</h3>
                  <ul className="space-y-2">
                    {quizResults.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
            
            {/* Question Review */}
            <motion.div
              className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Question Review</h2>
                <p className="mt-1 text-gray-600">
                  Review all quiz questions and responses below
                </p>
              </div>
              
              <div className="p-6 space-y-8">
                {quizResults.questions.map((question, index) => (
                  <div 
                    key={question.id} 
                    className={`p-4 rounded-lg ${
                      question.isCorrect ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
                    }`}
                  >
                    <h3 className="font-medium mb-3">
                      {index + 1}. {question.question}
                    </h3>
                    
                    <div className="space-y-2 ml-2">
                      <div className="flex items-start">
                        <span className="text-gray-700 font-medium mr-2">Your answer:</span>
                        <span className={question.isCorrect ? 'text-green-700' : 'text-red-700'}>
                          {question.yourAnswer}
                          {question.isCorrect ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-1 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-1 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                      </div>
                      
                      {!question.isCorrect && (
                        <div className="flex items-start">
                          <span className="text-gray-700 font-medium mr-2">Correct answer:</span>
                          <span className="text-green-700">
                            {question.correctAnswer}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
                <Link
                  to={`/modules/${quizResults.moduleId}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Return to Module
                </Link>
                
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                  </svg>
                  Create Flashcards from Missed Questions
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default QuizResultPage;