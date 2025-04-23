import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi';

const panelVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
  exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }
};

export default function ChatWidget() {
  const [open, setOpen]         = useState(false);
  const [prompt, setPrompt]     = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(false);
  const messagesEndRef = useRef(null);

  const apiKey = process.env.NEXT_PUBLIC_GENAI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });

  const generate = async (input) => {
    const res = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: input
    });
    return res.text;
  };

  const sendPrompt = async () => {
    if (!prompt.trim()) return;
    setMessages(m => [...m, { from: 'user', text: prompt }]);
    setLoading(true);
    setPrompt('');
    try {
      const botText = await generate(prompt);
      setMessages(m => [...m, { from: 'bot', text: botText }]);
    } catch (err) {
      console.error(err);
      setMessages(m => [...m, { from: 'bot', text: 'Error: ' + err.message }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  return (
    <>
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center z-50 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <FiX size={24}/> : <FiMessageCircle size={24}/>}      
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-4 w-72 md:w-80 lg:w-96 h-[60vh] bg-white rounded-xl shadow-xl flex flex-col z-50 text-black"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.from === 'user' ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className={`p-3 rounded-lg max-w-[80%] ${
                    msg.from === 'user'
                      ? 'bg-blue-100 self-end text-right'
                      : 'bg-gray-100 self-start text-left'
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
              <div ref={messagesEndRef}/>
            </div>
            <div className="p-3 border-t flex items-center space-x-2">
              <textarea
                className="flex-1 border rounded-md px-3 py-2.5 resize-none h-12 focus:outline-none focus:ring focus:border-blue-300"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Tulis pesan…"
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendPrompt()}
              />
              <button
                onClick={sendPrompt}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full disabled:opacity-50 flex items-center justify-center"
                disabled={loading}
                aria-label="Send message"
              >
                {loading ? (
                  '…'
                ) : (
                  <FiSend size={20}/>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
