import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MindMapPage() {
  const [nodes, setNodes] = useState([
    { id: 1, text: 'Learning Strategies', x: 400, y: 300, primary: true },
    { id: 2, text: 'Active Recall', x: 250, y: 150, primary: false },
    { id: 3, text: 'Spaced Repetition', x: 550, y: 150, primary: false },
    { id: 4, text: 'Feynman Technique', x: 200, y: 400, primary: false },
    { id: 5, text: 'Mind Mapping', x: 600, y: 400, primary: false },
  ]);
  
  const [connections, setConnections] = useState([
    { id: 1, source: 1, target: 2 },
    { id: 2, source: 1, target: 3 },
    { id: 3, source: 1, target: 4 },
    { id: 4, source: 1, target: 5 },
    { id: 5, source: 2, target: 3 },
  ]);
  
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [newNodeText, setNewNodeText] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  
  const handleNodeDragStart = (id) => {
    setDraggingNodeId(id);
  };
  
  const handleNodeDrag = (e, id) => {
    if (draggingNodeId === id) {
      setNodes(
        nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              x: node.x + e.movementX,
              y: node.y + e.movementY,
            };
          }
          return node;
        })
      );
    }
  };
  
  const handleNodeDragEnd = () => {
    setDraggingNodeId(null);
  };
  
  const handleNodeClick = (id) => {
    setSelectedNodeId(id === selectedNodeId ? null : id);
  };
  
  const handleAddNode = () => {
    if (newNodeText.trim() && selectedNodeId) {
      const parentNode = nodes.find(node => node.id === selectedNodeId);
      const offset = Math.random() * 100 + 100;
      const angle = Math.random() * Math.PI * 2;
      
      const newNode = {
        id: nodes.length + 1,
        text: newNodeText,
        x: parentNode.x + offset * Math.cos(angle),
        y: parentNode.y + offset * Math.sin(angle),
        primary: false
      };
      
      const newConnection = {
        id: connections.length + 1,
        source: selectedNodeId,
        target: newNode.id
      };
      
      setNodes([...nodes, newNode]);
      setConnections([...connections, newConnection]);
      setNewNodeText('');
    }
  };
  
  const handleDeleteNode = (id) => {
    // Don't delete the primary node
    if (nodes.find(node => node.id === id)?.primary) {
      return;
    }
    
    setNodes(nodes.filter(node => node.id !== id));
    setConnections(connections.filter(conn => conn.source !== id && conn.target !== id));
    setSelectedNodeId(null);
  };

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
            <h1 className="text-3xl font-bold text-gray-900">Mind Mapping</h1>
            <p className="mt-2 text-xl text-gray-600">Visualize concepts and connections</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div 
                className="bg-white rounded-xl shadow-sm p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-xl font-semibold mb-4">Mind Map Tools</h2>
                
                <div className="space-y-4">
                  {selectedNodeId ? (
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Selected: {nodes.find(n => n.id === selectedNodeId)?.text}</p>
                      <div className="space-y-3">
                        <div>
                          <label htmlFor="newNodeText" className="block text-sm font-medium text-gray-700 mb-1">
                            Add Connected Node
                          </label>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              id="newNodeText"
                              value={newNodeText}
                              onChange={(e) => setNewNodeText(e.target.value)}
                              className="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="Enter node text"
                            />
                            <button
                              onClick={handleAddNode}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                        
                        {!nodes.find(n => n.id === selectedNodeId)?.primary && (
                          <button
                            onClick={() => handleDeleteNode(selectedNodeId)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Delete Selected Node
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">Click on a node to select it and see options</p>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Instructions:</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Click on a node to select it</li>
                      <li>• Drag nodes to reposition them</li>
                      <li>• Add connected nodes to selected node</li>
                      <li>• Delete non-primary nodes</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-sm p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold mb-4">Benefits of Mind Mapping</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Visualizes connections between concepts</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Enhances memory and recall</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Promotes creative thinking</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Helps organize complex information</span>
                  </li>
                </ul>
              </motion.div>
            </div>
            
            {/* Mind Map Canvas */}
            <motion.div
              className="lg:col-span-3 bg-white rounded-xl shadow-sm p-4 h-[600px] relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {connections.map((connection) => {
                  const source = nodes.find((node) => node.id === connection.source);
                  const target = nodes.find((node) => node.id === connection.target);
                  
                  if (!source || !target) return null;
                  
                  return (
                    <line
                      key={connection.id}
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke="#CBD5E0"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
              
              {/* Nodes */}
              {nodes.map((node) => (
                <motion.div
                  key={node.id}
                  className={`absolute p-3 rounded-lg shadow-sm cursor-move text-center min-w-[120px] select-none ${
                    node.primary
                      ? 'bg-indigo-500 text-white'
                      : selectedNodeId === node.id
                      ? 'bg-indigo-100 border-2 border-indigo-500'
                      : 'bg-white border border-gray-200'
                  }`}
                  style={{
                    left: node.x - 60,
                    top: node.y - 25,
                    zIndex: selectedNodeId === node.id || node.primary ? 10 : 1,
                  }}
                  onMouseDown={() => handleNodeDragStart(node.id)}
                  onMouseMove={(e) => handleNodeDrag(e, node.id)}
                  onMouseUp={handleNodeDragEnd}
                  onMouseLeave={handleNodeDragEnd}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeClick(node.id);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {node.text}
                </motion.div>
              ))}
              
              <div 
                className="absolute bottom-4 right-4 text-sm text-gray-400"
                onClick={() => setSelectedNodeId(null)}
              >
                Click empty space to deselect
              </div>
            </motion.div>
          </div>
          
          {/* Mind Map Tips */}
          <motion.section
            className="mt-8 bg-indigo-50 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-indigo-900 mb-4">Mind Mapping Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="font-medium text-indigo-700 mb-2">Start with a Central Idea</div>
                <p className="text-gray-600 text-sm">Begin with your main concept in the center and branch out with related ideas.</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="font-medium text-indigo-700 mb-2">Use Keywords</div>
                <p className="text-gray-600 text-sm">Keep your node text concise - single words or short phrases work best.</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="font-medium text-indigo-700 mb-2">Create Meaningful Connections</div>
                <p className="text-gray-600 text-sm">Connect related concepts to help visualize the relationships between ideas.</p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
      
      {/* <Footer /> */}
    </div>
  );
}

export default MindMapPage;