import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState([
    { id: 1, question: 'What is the forgetting curve?', answer: 'A hypothesis that describes the decrease in ability to retain information over time.' },
    { id: 2, question: 'What is spaced repetition?', answer: 'A learning technique that involves reviewing information at increasing intervals.' },
    { id: 3, question: 'What is the Feynman Technique?', answer: 'A learning method where you explain a concept in simple terms as if teaching it to someone else.' },
    { id: 4, question: 'What is chunking in learning?', answer: 'Breaking down large amounts of information into smaller, more manageable units.' },
    { id: 5, question: 'What is a mnemonic device?', answer: 'A memory aid that helps you remember information, like an acronym or rhyme.' },
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
  const [showForm, setShowForm] = useState(false);
  
  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev === flashcards.length - 1 ? 0 : prev + 1));
  };
  
  const handlePrevCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  };
  
  const handleFlip = () => {
    setShowAnswer(!showAnswer);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFlashcard(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCreateFlashcard = (e) => {
    e.preventDefault();
    if (newFlashcard.question.trim() && newFlashcard.answer.trim()) {
      const newCard = {
        id: flashcards.length + 1,
        question: newFlashcard.question,
        answer: newFlashcard.answer
      };
      setFlashcards([...flashcards, newCard]);
      setNewFlashcard({ question: '', answer: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-between items-center"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Flashcards</h1>
              <p className="mt-2 text-xl text-gray-600">Master concepts with spaced repetition</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {showForm ? 'Cancel' : 'Create Flashcard'}
              {!showForm && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </motion.div>
          
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Create New Flashcard</h2>
                  <form onSubmit={handleCreateFlashcard} className="space-y-4">
                    <div>
                      <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                        Question
                      </label>
                      <textarea
                        id="question"
                        name="question"
                        rows={3}
                        value={newFlashcard.question}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter the question or front side of the flashcard"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
                        Answer
                      </label>
                      <textarea
                        id="answer"
                        name="answer"
                        rows={3}
                        value={newFlashcard.answer}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter the answer or back side of the flashcard"
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Save Flashcard
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {flashcards.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Flashcard Display */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Study Flashcards</h2>
                    <div className="text-sm text-gray-500">
                      Card {currentIndex + 1} of {flashcards.length}
                    </div>
                  </div>
                  
                  <div className="flex justify-center my-8">
                    <div
                      className="relative w-full max-w-2xl aspect-[3/2] cursor-pointer"
                      onClick={handleFlip}
                    >
                      <AnimatePresence initial={false} mode="wait">
                        <motion.div
                          key={showAnswer ? 'answer' : 'question' + currentIndex}
                          initial={{ rotateY: showAnswer ? -90 : 90 }}
                          animate={{ rotateY: 0 }}
                          exit={{ rotateY: showAnswer ? 90 : -90 }}
                          transition={{ duration: 0.4 }}
                          className={`absolute inset-0 backface-hidden rounded-xl shadow-md flex items-center justify-center p-8 ${
                            showAnswer ? 'bg-indigo-50' : 'bg-white'
                          } border border-gray-200`}
                        >
                          <div className="text-center">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                              {showAnswer ? 'ANSWER' : 'QUESTION'}
                            </h3>
                            <p className="text-xl">
                              {showAnswer
                                ? flashcards[currentIndex].answer
                                : flashcards[currentIndex].question}
                            </p>
                            <p className="mt-4 text-sm text-gray-500">Click to flip</p>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handlePrevCard}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Previous
                    </button>
                    <button
                      onClick={handleFlip}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                      Flip
                    </button>
                    <button
                      onClick={handleNextCard}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Next
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Flashcard List & Info */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Your Flashcards</h2>
                  <div className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
                    {flashcards.map((card, index) => (
                      <button
                        key={card.id}
                        onClick={() => {
                          setCurrentIndex(index);
                          setShowAnswer(false);
                        }}
                        className={`w-full py-3 px-4 text-left hover:bg-gray-50 rounded-md ${
                          currentIndex === index ? 'bg-indigo-50' : ''
                        }`}
                      >
                        <p className="font-medium truncate">{card.question}</p>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Spaced Repetition</h2>
                  <p className="text-gray-600 mb-4">
                    Flashcards use spaced repetition to help you remember information more effectively. The system schedules reviews at optimal intervals.
                  </p>
                  <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                    <h3 className="font-medium text-blue-800 mb-2">Pro Tip:</h3>
                    <p className="text-sm text-blue-700">
                      After revealing the answer, rate how well you knew it. The system will prioritize cards you find difficult.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h2 className="text-xl font-semibold mb-2">No Flashcards Yet</h2>
              <p className="text-gray-600 mb-6">Create your first flashcard to start learning with spaced repetition.</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create Your First Flashcard
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* <Footer /> */}
    </div>
  );
}

export default FlashcardsPage;